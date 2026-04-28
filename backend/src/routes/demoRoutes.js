const express = require('express');
const { db } = require('../config/firebase');
const {
  usersCollection,
  ngosCollection,
  issuesCollection,
  volunteerMatchesCollection,
  activitiesCollection,
} = require('../models/schemas');

const router = express.Router();

/**
 * GET /api/demo
 * Get overview of mock data in the system
 */
router.get('/', async (req, res) => {
  try {
    const stats = {};

    // Count NGOs
    const ngosSnap = await ngosCollection.get();
    stats.ngos = ngosSnap.size;

    // Count Users by role
    const usersSnap = await usersCollection.get();
    stats.users = usersSnap.size;
    stats.ngoAdmins = 0;
    stats.volunteers = 0;
    usersSnap.forEach(doc => {
      const user = doc.data();
      if (user.role === 'ngo_admin') stats.ngoAdmins++;
      if (user.role === 'volunteer') stats.volunteers++;
    });

    // Count Issues by status
    const issuesSnap = await issuesCollection.get();
    stats.issues = issuesSnap.size;
    stats.issuesByStatus = {
      posted: 0,
      verified: 0,
      approved: 0,
      in_progress: 0,
      completed: 0
    };
    issuesSnap.forEach(doc => {
      const issue = doc.data();
      if (stats.issuesByStatus[issue.status] !== undefined) {
        stats.issuesByStatus[issue.status]++;
      }
    });

    // Count Matches by status
    const matchesSnap = await volunteerMatchesCollection.get();
    stats.matches = matchesSnap.size;
    stats.matchesByStatus = {
      pending: 0,
      accepted: 0,
      rejected: 0,
      completed: 0
    };
    matchesSnap.forEach(doc => {
      const match = doc.data();
      if (stats.matchesByStatus[match.status] !== undefined) {
        stats.matchesByStatus[match.status]++;
      }
    });

    // Count Activities
    const activitiesSnap = await activitiesCollection.get();
    stats.activities = activitiesSnap.size;

    res.status(200).json({
      success: true,
      message: 'Mock data overview',
      data: stats,
      timestamp: new Date()
    });

  } catch (error) {
    console.error('Error getting demo stats:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to fetch demo data',
      error: error.message
    });
  }
});

/**
 * GET /api/demo/ngos
 * List all NGOs with member count
 */
router.get('/ngos', async (req, res) => {
  try {
    const ngosSnap = await ngosCollection.get();
    const ngos = [];

    ngosSnap.forEach(doc => {
      const ngo = doc.data();
      ngos.push({
        id: doc.id,
        name: ngo.name,
        adminId: ngo.adminId,
        memberCount: ngo.members ? ngo.members.length : 0,
        issuesPosted: ngo.issuesPosted,
        location: ngo.location.address,
        createdAt: ngo.createdAt
      });
    });

    res.status(200).json({
      success: true,
      count: ngos.length,
      data: ngos
    });

  } catch (error) {
    console.error('Error fetching NGOs:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to fetch NGOs',
      error: error.message
    });
  }
});

/**
 * GET /api/demo/volunteers
 * List all volunteers with assigned NGO
 */
router.get('/volunteers', async (req, res) => {
  try {
    const volunteersSnap = await usersCollection
      .where('role', '==', 'volunteer')
      .get();

    const volunteers = [];

    volunteersSnap.forEach(doc => {
      const vol = doc.data();
      volunteers.push({
        id: doc.id,
        name: vol.displayName,
        email: vol.email,
        ngoId: vol.ngoId,
        skills: vol.skills,
        verificationStatus: vol.verificationStatus,
        location: vol.location.address,
        createdAt: vol.createdAt
      });
    });

    res.status(200).json({
      success: true,
      count: volunteers.length,
      data: volunteers
    });

  } catch (error) {
    console.error('Error fetching volunteers:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to fetch volunteers',
      error: error.message
    });
  }
});

/**
 * GET /api/demo/issues
 * List all issues with details
 */
router.get('/issues', async (req, res) => {
  try {
    const issuesSnap = await issuesCollection.get();
    const issues = [];

    issuesSnap.forEach(doc => {
      const issue = doc.data();
      issues.push({
        id: doc.id,
        title: issue.title,
        category: issue.category,
        priority: issue.priority,
        status: issue.status,
        ngoId: issue.ngoId,
        location: issue.location.address,
        requiredSkills: issue.requiredSkills,
        createdAt: issue.createdAt
      });
    });

    res.status(200).json({
      success: true,
      count: issues.length,
      data: issues
    });

  } catch (error) {
    console.error('Error fetching issues:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to fetch issues',
      error: error.message
    });
  }
});

/**
 * GET /api/demo/matches
 * List all volunteer matches
 */
router.get('/matches', async (req, res) => {
  try {
    const matchesSnap = await volunteerMatchesCollection.get();
    const matches = [];

    matchesSnap.forEach(doc => {
      const match = doc.data();
      matches.push({
        id: doc.id,
        issueId: match.issueId,
        volunteerId: match.volunteerId,
        matchScore: match.matchScore,
        status: match.status,
        volunteerResponse: match.volunteerResponse,
        scoreBreakdown: match.scoreBreakdown,
        createdAt: match.createdAt
      });
    });

    res.status(200).json({
      success: true,
      count: matches.length,
      data: matches
    });

  } catch (error) {
    console.error('Error fetching matches:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to fetch matches',
      error: error.message
    });
  }
});

/**
 * GET /api/demo/activities
 * List all activities
 */
router.get('/activities', async (req, res) => {
  try {
    const activitiesSnap = await activitiesCollection
      .orderBy('createdAt', 'desc')
      .get();

    const activities = [];

    activitiesSnap.forEach(doc => {
      const activity = doc.data();
      activities.push({
        id: doc.id,
        type: activity.type,
        description: activity.description,
        actorName: activity.actorName,
        relatedDocType: activity.relatedDocType,
        isPublic: activity.isPublic,
        createdAt: activity.createdAt
      });
    });

    res.status(200).json({
      success: true,
      count: activities.length,
      data: activities
    });

  } catch (error) {
    console.error('Error fetching activities:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to fetch activities',
      error: error.message
    });
  }
});

/**
 * GET /api/demo/reset-warning
 * Display how to reset mock data
 */
router.get('/reset-warning', (req, res) => {
  res.status(200).json({
    success: true,
    message: 'To reset mock data, run the following command:',
    command: 'npm run seed',
    details: {
      location: 'backend directory',
      effect: 'Clears all data and reseeds with fresh mock data',
      alternativeCommand: 'npm run seed:append',
      alternativeEffect: 'Adds mock data without clearing existing data'
    }
  });
});

module.exports = router;
