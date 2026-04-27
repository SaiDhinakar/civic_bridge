const {
  getMatchesForIssue,
  processMatchResponse,
} = require('../services/volunteerMatchingService');
const { validationResult } = require('express-validator');

/**
 * Get AI-suggested matches for an issue
 */
exports.getMatchesForIssue = async (req, res) => {
  try {
    const { issueId } = req.params;

    const matches = await getMatchesForIssue(issueId);

    res.status(200).json({
      success: true,
      data: matches,
    });
  } catch (error) {
    console.error('Error in getMatchesForIssue:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to fetch matches',
      error: error.message,
    });
  }
};

/**
 * Process volunteer response to match
 */
exports.respondToMatch = async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { matchId } = req.params;
    const { response } = req.body; // 'accept' or 'reject'

    const result = await processMatchResponse(matchId, response, req.user.uid);

    res.status(200).json({
      success: true,
      message: `Match ${response}ed successfully`,
      data: result,
    });
  } catch (error) {
    console.error('Error in respondToMatch:', error);
    const statusCode =
      error.message === 'Unauthorized' || error.message === 'Match not found'
        ? 404
        : 500;
    res.status(statusCode).json({
      success: false,
      message: error.message,
      error: error.message,
    });
  }
};

module.exports = exports;
