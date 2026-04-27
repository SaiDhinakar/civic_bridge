const { db } = require('../config/firebase');
const {
  issuesCollection,
  tasksCollection,
  activitiesCollection,
  usersCollection,
} = require('../models/schemas');
const { generateVolunteerMatches, saveVolunteerMatches } = require('./volunteerMatchingService');

/**
 * Post a new issue
 */
const postIssue = async (issueData, postedByUid) => {
  try {
    // Get user info
    const userDoc = await usersCollection.doc(postedByUid).get();
    const userData = userData.data();

    const issue = {
      title: issueData.title,
      description: issueData.description,
      category: issueData.category,
      postedBy: postedByUid,
      ngoId: userData.ngoId || null,
      location: issueData.location,
      priority: issueData.priority || 'medium',
      requiredSkills: issueData.requiredSkills || [],
      attachments: issueData.attachments || [],
      status: 'posted',
      createdAt: new Date(),
      updatedAt: new Date(),
    };

    const issueRef = await issuesCollection.add(issue);

    // Log activity
    await activitiesCollection.add({
      type: 'issue_posted',
      description: `Issue posted: ${issue.title}`,
      actorId: postedByUid,
      relatedDocId: issueRef.id,
      relatedDocType: 'issue',
      ngoId: userData.ngoId,
      isPublic: false,
      createdAt: new Date(),
    });

    return {
      id: issueRef.id,
      ...issue,
    };
  } catch (error) {
    console.error('Error posting issue:', error);
    throw error;
  }
};

/**
 * Verify an issue (Volunteer)
 */
const verifyIssue = async (issueId, verifiedByVolunteerId, verificationNotes) => {
  try {
    const issueDoc = await issuesCollection.doc(issueId).get();

    if (!issueDoc.exists) {
      throw new Error('Issue not found');
    }

    await issuesCollection.doc(issueId).update({
      status: 'verified',
      verificationNotes,
      verifiedBy: verifiedByVolunteerId,
      verifiedAt: new Date(),
      updatedAt: new Date(),
    });

    // Log activity
    const issueData = issueDoc.data();
    await activitiesCollection.add({
      type: 'issue_verified',
      description: `Issue verified: ${issueData.title}`,
      actorId: verifiedByVolunteerId,
      relatedDocId: issueId,
      relatedDocType: 'issue',
      ngoId: issueData.ngoId,
      isPublic: false,
      createdAt: new Date(),
    });

    return {
      success: true,
      message: 'Issue verified successfully',
    };
  } catch (error) {
    console.error('Error verifying issue:', error);
    throw error;
  }
};

/**
 * Approve an issue and trigger AI matching (NGO Admin)
 */
const approveIssueWithAIMatching = async (issueId, approvedByAdminId) => {
  try {
    const issueDoc = await issuesCollection.doc(issueId).get();

    if (!issueDoc.exists) {
      throw new Error('Issue not found');
    }

    const issueData = issueDoc.data();

    // Check if admin belongs to the NGO
    const adminDoc = await usersCollection.doc(approvedByAdminId).get();
    if (adminDoc.data().ngoId !== issueData.ngoId) {
      throw new Error('Unauthorized');
    }

    // Update issue status
    await issuesCollection.doc(issueId).update({
      status: 'approved',
      approvedBy: approvedByAdminId,
      approvedAt: new Date(),
      updatedAt: new Date(),
    });

    // Get available volunteers from the NGO
    const volunteersSnapshot = await usersCollection
      .where('ngoId', '==', issueData.ngoId)
      .where('role', '==', 'volunteer')
      .where('verificationStatus', '==', 'verified')
      .get();

    const volunteers = volunteersSnapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));

    // Generate AI matches if volunteers exist
    let matches = [];
    if (volunteers.length > 0) {
      matches = await generateVolunteerMatches(issueData, volunteers);
      await saveVolunteerMatches(issueId, matches);
    }

    // Log activity
    await activitiesCollection.add({
      type: 'issue_approved',
      description: `Issue approved and ${matches.length} volunteers matched: ${issueData.title}`,
      actorId: approvedByAdminId,
      relatedDocId: issueId,
      relatedDocType: 'issue',
      ngoId: issueData.ngoId,
      isPublic: true,
      createdAt: new Date(),
    });

    return {
      success: true,
      message: 'Issue approved and volunteers matched',
      matchesCount: matches.length,
      matches,
    };
  } catch (error) {
    console.error('Error approving issue:', error);
    throw error;
  }
};

/**
 * Get issues for activity feed (only approved and ongoing)
 */
const getPublicActivityFeed = async (limit = 20, offset = 0) => {
  try {
    const snapshot = await issuesCollection
      .where('status', 'in', ['approved', 'in_progress'])
      .orderBy('approvedAt', 'desc')
      .limit(limit)
      .offset(offset)
      .get();

    const issues = await Promise.all(
      snapshot.docs.map(async (doc) => {
        const issueData = doc.data();
        const posterDoc = await usersCollection.doc(issueData.postedBy).get();
        const ngoDoc = issueData.ngoId
          ? await db.collection('ngos').doc(issueData.ngoId).get()
          : null;

        return {
          id: doc.id,
          ...issueData,
          poster: posterDoc.data(),
          ngo: ngoDoc?.data(),
        };
      })
    );

    return issues;
  } catch (error) {
    console.error('Error fetching activity feed:', error);
    throw error;
  }
};

/**
 * Get all issues (for NGO Admin)
 */
const getNGOIssues = async (ngoId) => {
  try {
    const snapshot = await issuesCollection.where('ngoId', '==', ngoId).get();

    return snapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));
  } catch (error) {
    console.error('Error fetching NGO issues:', error);
    throw error;
  }
};

/**
 * Get issue details
 */
const getIssueDetails = async (issueId) => {
  try {
    const issueDoc = await issuesCollection.doc(issueId).get();

    if (!issueDoc.exists) {
      throw new Error('Issue not found');
    }

    const issueData = issueDoc.data();
    const posterDoc = await usersCollection.doc(issueData.postedBy).get();

    return {
      id: issueId,
      ...issueData,
      poster: posterDoc.data(),
    };
  } catch (error) {
    console.error('Error fetching issue details:', error);
    throw error;
  }
};

module.exports = {
  postIssue,
  verifyIssue,
  approveIssueWithAIMatching,
  getPublicActivityFeed,
  getNGOIssues,
  getIssueDetails,
};
