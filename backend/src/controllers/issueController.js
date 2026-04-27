const {
  postIssue,
  verifyIssue,
  approveIssueWithAIMatching,
  getPublicActivityFeed,
  getNGOIssues,
  getIssueDetails,
} = require('../services/issueService');
const { validationResult } = require('express-validator');

/**
 * Post a new issue
 */
exports.postIssue = async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const issue = await postIssue(req.body, req.user.uid);

    res.status(201).json({
      success: true,
      message: 'Issue posted successfully',
      data: issue,
    });
  } catch (error) {
    console.error('Error in postIssue:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to post issue',
      error: error.message,
    });
  }
};

/**
 * Verify an issue (Volunteer)
 */
exports.verifyIssue = async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { issueId } = req.params;
    const { verificationNotes } = req.body;

    const result = await verifyIssue(issueId, req.user.uid, verificationNotes);

    res.status(200).json({
      success: true,
      data: result,
    });
  } catch (error) {
    console.error('Error in verifyIssue:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to verify issue',
      error: error.message,
    });
  }
};

/**
 * Approve issue and trigger AI matching (NGO Admin)
 */
exports.approveIssueWithAI = async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { issueId } = req.params;

    const result = await approveIssueWithAIMatching(issueId, req.user.uid);

    res.status(200).json({
      success: true,
      data: result,
    });
  } catch (error) {
    console.error('Error in approveIssueWithAI:', error);
    const statusCode = error.message === 'Unauthorized' ? 403 : 500;
    res.status(statusCode).json({
      success: false,
      message: error.message,
      error: error.message,
    });
  }
};

/**
 * Get public activity feed
 */
exports.getActivityFeed = async (req, res) => {
  try {
    const { limit = 20, offset = 0 } = req.query;

    const activities = await getPublicActivityFeed(
      parseInt(limit),
      parseInt(offset)
    );

    res.status(200).json({
      success: true,
      data: activities,
    });
  } catch (error) {
    console.error('Error in getActivityFeed:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to fetch activity feed',
      error: error.message,
    });
  }
};

/**
 * Get all issues of an NGO
 */
exports.getNGOIssues = async (req, res) => {
  try {
    const { ngoId } = req.params;

    const issues = await getNGOIssues(ngoId);

    res.status(200).json({
      success: true,
      data: issues,
    });
  } catch (error) {
    console.error('Error in getNGOIssues:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to fetch issues',
      error: error.message,
    });
  }
};

/**
 * Get issue details
 */
exports.getIssueDetails = async (req, res) => {
  try {
    const { issueId } = req.params;

    const issue = await getIssueDetails(issueId);

    res.status(200).json({
      success: true,
      data: issue,
    });
  } catch (error) {
    console.error('Error in getIssueDetails:', error);
    const statusCode = error.message === 'Issue not found' ? 404 : 500;
    res.status(statusCode).json({
      success: false,
      message: error.message,
      error: error.message,
    });
  }
};

module.exports = exports;
