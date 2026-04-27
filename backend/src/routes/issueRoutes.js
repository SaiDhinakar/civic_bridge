const express = require('express');
const { body } = require('express-validator');
const issueController = require('../controllers/issueController');
const { verifyJWT, checkRole } = require('../middleware/auth');

const router = express.Router();

/**
 * POST /api/issues
 * Post a new issue
 */
router.post(
  '/',
  verifyJWT,
  [
    body('title').notEmpty().trim(),
    body('description').notEmpty().trim(),
    body('category').notEmpty().trim(),
    body('priority').optional().isIn(['low', 'medium', 'high']),
    body('location').optional().isObject(),
    body('requiredSkills').optional().isArray(),
  ],
  issueController.postIssue
);

/**
 * GET /api/issues/activity-feed
 * Get public activity feed
 */
router.get('/activity-feed', issueController.getActivityFeed);

/**
 * GET /api/issues/:issueId
 * Get issue details
 */
router.get('/:issueId', issueController.getIssueDetails);

/**
 * POST /api/issues/:issueId/verify
 * Verify an issue (Volunteer)
 */
router.post(
  '/:issueId/verify',
  verifyJWT,
  checkRole(['volunteer']),
  [body('verificationNotes').notEmpty().trim()],
  issueController.verifyIssue
);

/**
 * POST /api/issues/:issueId/approve
 * Approve issue and trigger AI matching (NGO Admin)
 */
router.post(
  '/:issueId/approve',
  verifyJWT,
  checkRole(['ngo_admin']),
  issueController.approveIssueWithAI
);

/**
 * GET /api/issues/ngo/:ngoId
 * Get all issues of an NGO
 */
router.get('/ngo/:ngoId', verifyJWT, issueController.getNGOIssues);

module.exports = router;
