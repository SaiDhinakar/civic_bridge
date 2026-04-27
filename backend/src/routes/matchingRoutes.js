const express = require('express');
const { body } = require('express-validator');
const matchingController = require('../controllers/matchingController');
const { verifyJWT, checkRole } = require('../middleware/auth');

const router = express.Router();

/**
 * GET /api/matches/:issueId
 * Get AI-suggested matches for an issue
 */
router.get('/:issueId', verifyJWT, matchingController.getMatchesForIssue);

/**
 * POST /api/matches/:matchId/respond
 * Process volunteer response to match
 */
router.post(
  '/:matchId/respond',
  verifyJWT,
  checkRole(['volunteer']),
  [body('response').isIn(['accept', 'reject'])],
  matchingController.respondToMatch
);

module.exports = router;
