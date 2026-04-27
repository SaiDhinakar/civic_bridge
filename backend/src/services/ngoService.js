const { db } = require('../config/firebase');
const {
  ngosCollection,
  usersCollection,
  USER_ROLES,
  activitiesCollection,
} = require('../models/schemas');

/**
 * Create a new NGO
 */
const createNGO = async (ngoData, adminUid) => {
  try {
    const ngo = {
      name: ngoData.name,
      description: ngoData.description,
      registrationNumber: ngoData.registrationNumber,
      adminId: adminUid,
      members: [adminUid],
      location: ngoData.location,
      contactEmail: ngoData.contactEmail,
      phoneNumber: ngoData.phoneNumber,
      website: ngoData.website,
      logoUrl: ngoData.logoUrl,
      issuesPosted: 0,
      activitiesCount: 0,
      createdAt: new Date(),
      updatedAt: new Date(),
    };

    const ngoRef = await ngosCollection.add(ngo);

    // Update user to be NGO admin
    await usersCollection.doc(adminUid).update({
      role: USER_ROLES.NGO_ADMIN,
      ngoId: ngoRef.id,
      verificationStatus: 'verified',
      updatedAt: new Date(),
    });

    // Log activity
    await activitiesCollection.add({
      type: 'ngo_created',
      description: `NGO created: ${ngo.name}`,
      actorId: adminUid,
      relatedDocId: ngoRef.id,
      relatedDocType: 'ngo',
      ngoId: ngoRef.id,
      isPublic: false,
      createdAt: new Date(),
    });

    return {
      id: ngoRef.id,
      ...ngo,
    };
  } catch (error) {
    console.error('Error creating NGO:', error);
    throw error;
  }
};

/**
 * Get NGO details
 */
const getNGODetails = async (ngoId) => {
  try {
    const ngoDoc = await ngosCollection.doc(ngoId).get();

    if (!ngoDoc.exists) {
      throw new Error('NGO not found');
    }

    const ngoData = ngoDoc.data();

    // Get members details
    const membersDetails = await Promise.all(
      ngoData.members.map(async (memberId) => {
        const memberDoc = await usersCollection.doc(memberId).get();
        return memberDoc.data();
      })
    );

    return {
      id: ngoId,
      ...ngoData,
      membersDetails,
    };
  } catch (error) {
    console.error('Error fetching NGO details:', error);
    throw error;
  }
};

/**
 * Add volunteer to NGO (approve join request)
 */
const addVolunteerToNGO = async (ngoId, volunteerId, approvedByAdminId) => {
  try {
    const ngoDoc = await ngosCollection.doc(ngoId).get();

    if (!ngoDoc.exists) {
      throw new Error('NGO not found');
    }

    const ngoData = ngoDoc.data();

    // Check if admin belongs to the NGO
    if (ngoData.adminId !== approvedByAdminId) {
      throw new Error('Unauthorized');
    }

    // Check if already a member
    if (ngoData.members.includes(volunteerId)) {
      throw new Error('Already a member');
    }

    // Update NGO members
    await ngosCollection.doc(ngoId).update({
      members: [...ngoData.members, volunteerId],
      updatedAt: new Date(),
    });

    // Update volunteer user
    await usersCollection.doc(volunteerId).update({
      role: USER_ROLES.VOLUNTEER,
      ngoId,
      verificationStatus: 'pending',
      updatedAt: new Date(),
    });

    // Log activity
    await activitiesCollection.add({
      type: 'volunteer_added_to_ngo',
      description: 'Volunteer added to NGO',
      actorId: approvedByAdminId,
      relatedDocId: volunteerId,
      relatedDocType: 'user',
      ngoId,
      isPublic: false,
      createdAt: new Date(),
    });

    return {
      success: true,
      message: 'Volunteer added to NGO',
    };
  } catch (error) {
    console.error('Error adding volunteer to NGO:', error);
    throw error;
  }
};

/**
 * Update NGO profile
 */
const updateNGOProfile = async (ngoId, updates, adminUid) => {
  try {
    const ngoDoc = await ngosCollection.doc(ngoId).get();

    if (!ngoDoc.exists) {
      throw new Error('NGO not found');
    }

    const ngoData = ngoDoc.data();

    // Check authorization
    if (ngoData.adminId !== adminUid) {
      throw new Error('Unauthorized');
    }

    const allowedFields = [
      'name',
      'description',
      'contactEmail',
      'phoneNumber',
      'website',
      'logoUrl',
      'location',
    ];

    const filteredUpdates = {};
    Object.keys(updates).forEach((key) => {
      if (allowedFields.includes(key)) {
        filteredUpdates[key] = updates[key];
      }
    });

    filteredUpdates.updatedAt = new Date();

    await ngosCollection.doc(ngoId).update(filteredUpdates);

    return {
      success: true,
      message: 'NGO profile updated',
    };
  } catch (error) {
    console.error('Error updating NGO profile:', error);
    throw error;
  }
};

/**
 * Get pending volunteers for NGO
 */
const getPendingVolunteers = async (ngoId) => {
  try {
    const snapshot = await usersCollection
      .where('ngoId', '==', ngoId)
      .where('role', '==', USER_ROLES.VOLUNTEER)
      .where('verificationStatus', '==', 'pending')
      .get();

    return snapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));
  } catch (error) {
    console.error('Error fetching pending volunteers:', error);
    throw error;
  }
};

/**
 * Get NGO statistics
 */
const getNGOStats = async (ngoId) => {
  try {
    const ngoDoc = await ngosCollection.doc(ngoId).get();
    if (!ngoDoc.exists) {
      throw new Error('NGO not found');
    }

    const issuesSnapshot = await db
      .collection('issues')
      .where('ngoId', '==', ngoId)
      .get();

    const volunteersSnapshot = await usersCollection
      .where('ngoId', '==', ngoId)
      .where('role', '==', USER_ROLES.VOLUNTEER)
      .get();

    const tasksSnapshot = await db
      .collection('tasks')
      .where('ngoId', '==', ngoId)
      .get();

    return {
      totalIssuesPosted: issuesSnapshot.size,
      totalVolunteers: volunteersSnapshot.size,
      verifiedVolunteers: volunteersSnapshot.docs.filter(
        (d) => d.data().verificationStatus === 'verified'
      ).length,
      completedTasks: tasksSnapshot.docs.filter(
        (d) => d.data().status === 'completed'
      ).length,
      ongoingTasks: tasksSnapshot.docs.filter(
        (d) => d.data().status === 'in_progress'
      ).length,
    };
  } catch (error) {
    console.error('Error fetching NGO stats:', error);
    throw error;
  }
};

module.exports = {
  createNGO,
  getNGODetails,
  addVolunteerToNGO,
  updateNGOProfile,
  getPendingVolunteers,
  getNGOStats,
};
