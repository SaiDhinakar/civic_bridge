const {
  getUserProfile,
  updateUserProfile,
  requestToJoinNGO,
  verifyVolunteer,
  getNGOVolunteers,
} = require('../services/userService');
const { validationResult } = require('express-validator');

/**
 * Get current user profile
 */
exports.getProfile = async (req, res) => {
  try {
    const profile = await getUserProfile(req.user.uid);

    res.status(200).json({
      success: true,
      data: profile,
    });
  } catch (error) {
    console.error('Error in getProfile:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to fetch profile',
      error: error.message,
    });
  }
};

/**
 * Update user profile
 */
exports.updateProfile = async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const result = await updateUserProfile(req.user.uid, req.body);

    res.status(200).json({
      success: true,
      message: result.message,
    });
  } catch (error) {
    console.error('Error in updateProfile:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to update profile',
      error: error.message,
    });
  }
};

/**
 * Request to join NGO as volunteer
 */
exports.requestToJoinNGO = async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { ngoId } = req.body;

    const result = await requestToJoinNGO(req.user.uid, ngoId);

    res.status(201).json({
      success: true,
      data: result,
    });
  } catch (error) {
    console.error('Error in requestToJoinNGO:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to request joining NGO',
      error: error.message,
    });
  }
};

/**
 * Verify a volunteer (NGO Admin only)
 */
exports.verifyVolunteer = async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { volunteerId } = req.body;
    const ngoId = req.user.ngoId;

    const result = await verifyVolunteer(volunteerId, req.user.uid, ngoId);

    res.status(200).json({
      success: true,
      data: result,
    });
  } catch (error) {
    console.error('Error in verifyVolunteer:', error);
    const statusCode = error.message === 'Unauthorized' ? 403 : 500;
    res.status(statusCode).json({
      success: false,
      message: error.message,
      error: error.message,
    });
  }
};

/**
 * Get all volunteers of an NGO
 */
exports.getNGOVolunteers = async (req, res) => {
  try {
    const { ngoId } = req.params;

    const volunteers = await getNGOVolunteers(ngoId);

    res.status(200).json({
      success: true,
      data: volunteers,
    });
  } catch (error) {
    console.error('Error in getNGOVolunteers:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to fetch volunteers',
      error: error.message,
    });
  }
};

module.exports = exports;
