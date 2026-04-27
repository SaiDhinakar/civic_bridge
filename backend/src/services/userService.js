const { db, auth } = require('../config/firebase');
const { usersCollection, USER_ROLES, activitiesCollection, ngosCollection } = require('../models/schemas');
const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');

dotenv.config();

/**
 * Register or get existing user after Google Auth
 */
const registerOrGetUser = async (decodedToken) => {
  try {
    const { uid, email, name, picture } = decodedToken;

    // Check if user already exists
    const userDoc = await usersCollection.doc(uid).get();

    if (userDoc.exists) {
      // Update last active
      await usersCollection.doc(uid).update({
        lastActive: new Date(),
      });
      return userDoc.data();
    }

    // Create new user as CITIZEN by default
    const newUser = {
      uid,
      email,
      displayName: name,
      profilePicture: picture,
      role: USER_ROLES.CITIZEN,
      verificationStatus: 'pending',
      createdAt: new Date(),
      updatedAt: new Date(),
      lastActive: new Date(),
    };

    await usersCollection.doc(uid).set(newUser);

    // Log activity
    await activitiesCollection.add({
      type: 'user_registered',
      description: `New user registered: ${name}`,
      actorId: uid,
      relatedDocType: 'user',
      isPublic: false,
      createdAt: new Date(),
    });

    return newUser;
  } catch (error) {
    console.error('Error in registerOrGetUser:', error);
    throw error;
  }
};

/**
 * Generate JWT token for user
 */
const generateJWT = (user) => {
  const payload = {
    uid: user.uid,
    email: user.email,
    role: user.role,
    displayName: user.displayName,
  };

  return jwt.sign(payload, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRY || '7d',
  });
};

/**
 * Get user profile by UID
 */
const getUserProfile = async (uid) => {
  try {
    const userDoc = await usersCollection.doc(uid).get();

    if (!userDoc.exists) {
      throw new Error('User not found');
    }

    const userData = userDoc.data();

    // If user is NGO admin or volunteer, fetch NGO details
    if (userData.ngoId) {
      const ngoDoc = await ngosCollection.doc(userData.ngoId).get();
      userData.ngo = ngoDoc.data();
    }

    return userData;
  } catch (error) {
    console.error('Error fetching user profile:', error);
    throw error;
  }
};

/**
 * Update user profile
 */
const updateUserProfile = async (uid, updates) => {
  try {
    const allowedFields = [
      'displayName',
      'phoneNumber',
      'location',
      'skills',
      'profilePicture',
    ];

    // Filter only allowed fields
    const filteredUpdates = {};
    Object.keys(updates).forEach((key) => {
      if (allowedFields.includes(key)) {
        filteredUpdates[key] = updates[key];
      }
    });

    filteredUpdates.updatedAt = new Date();

    await usersCollection.doc(uid).update(filteredUpdates);

    return {
      success: true,
      message: 'Profile updated successfully',
    };
  } catch (error) {
    console.error('Error updating profile:', error);
    throw error;
  }
};

/**
 * Request to join NGO as volunteer
 */
const requestToJoinNGO = async (volunteerId, ngoId) => {
  try {
    // Create a request document
    const requestRef = db.collection('ngo_join_requests').doc();
    await requestRef.set({
      volunteerId,
      ngoId,
      status: 'pending',
      requestedAt: new Date(),
    });

    return {
      success: true,
      requestId: requestRef.id,
      message: 'Join request sent',
    };
  } catch (error) {
    console.error('Error requesting to join NGO:', error);
    throw error;
  }
};

/**
 * Verify a volunteer (NGO Admin only)
 */
const verifyVolunteer = async (volunteerId, approvedByAdminId, ngoId) => {
  try {
    // Check if admin belongs to the NGO
    const adminDoc = await usersCollection.doc(approvedByAdminId).get();
    if (adminDoc.data().ngoId !== ngoId) {
      throw new Error('Unauthorized');
    }

    await usersCollection.doc(volunteerId).update({
      verificationStatus: 'verified',
      approvedBy: approvedByAdminId,
      updatedAt: new Date(),
    });

    // Log activity
    await activitiesCollection.add({
      type: 'volunteer_verified',
      description: `Volunteer verified by admin`,
      actorId: approvedByAdminId,
      relatedDocId: volunteerId,
      relatedDocType: 'user',
      ngoId,
      isPublic: false,
      createdAt: new Date(),
    });

    return {
      success: true,
      message: 'Volunteer verified successfully',
    };
  } catch (error) {
    console.error('Error verifying volunteer:', error);
    throw error;
  }
};

/**
 * Get all volunteers of an NGO
 */
const getNGOVolunteers = async (ngoId) => {
  try {
    const snapshot = await usersCollection
      .where('ngoId', '==', ngoId)
      .where('role', '==', USER_ROLES.VOLUNTEER)
      .get();

    return snapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));
  } catch (error) {
    console.error('Error fetching NGO volunteers:', error);
    throw error;
  }
};

module.exports = {
  registerOrGetUser,
  generateJWT,
  getUserProfile,
  updateUserProfile,
  requestToJoinNGO,
  verifyVolunteer,
  getNGOVolunteers,
};
