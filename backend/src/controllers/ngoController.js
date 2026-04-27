const {
  createNGO,
  getNGODetails,
  addVolunteerToNGO,
  updateNGOProfile,
  getPendingVolunteers,
  getNGOStats,
} = require('../services/ngoService');
const { validationResult } = require('express-validator');

/**
 * Create a new NGO
 */
exports.createNGO = async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const ngo = await createNGO(req.body, req.user.uid);

    res.status(201).json({
      success: true,
      message: 'NGO created successfully',
      data: ngo,
    });
  } catch (error) {
    console.error('Error in createNGO:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to create NGO',
      error: error.message,
    });
  }
};

/**
 * Get NGO details
 */
exports.getNGODetails = async (req, res) => {
  try {
    const { ngoId } = req.params;

    const ngo = await getNGODetails(ngoId);

    res.status(200).json({
      success: true,
      data: ngo,
    });
  } catch (error) {
    console.error('Error in getNGODetails:', error);
    const statusCode = error.message === 'NGO not found' ? 404 : 500;
    res.status(statusCode).json({
      success: false,
      message: error.message,
      error: error.message,
    });
  }
};

/**
 * Add volunteer to NGO (approve join request)
 */
exports.addVolunteerToNGO = async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { ngoId, volunteerId } = req.body;

    const result = await addVolunteerToNGO(ngoId, volunteerId, req.user.uid);

    res.status(200).json({
      success: true,
      data: result,
    });
  } catch (error) {
    console.error('Error in addVolunteerToNGO:', error);
    const statusCode = error.message === 'Unauthorized' ? 403 : 500;
    res.status(statusCode).json({
      success: false,
      message: error.message,
      error: error.message,
    });
  }
};

/**
 * Update NGO profile
 */
exports.updateNGOProfile = async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { ngoId } = req.params;

    const result = await updateNGOProfile(ngoId, req.body, req.user.uid);

    res.status(200).json({
      success: true,
      data: result,
    });
  } catch (error) {
    console.error('Error in updateNGOProfile:', error);
    const statusCode = error.message === 'Unauthorized' ? 403 : 500;
    res.status(statusCode).json({
      success: false,
      message: error.message,
      error: error.message,
    });
  }
};

/**
 * Get pending volunteers for NGO
 */
exports.getPendingVolunteers = async (req, res) => {
  try {
    const { ngoId } = req.params;

    const volunteers = await getPendingVolunteers(ngoId);

    res.status(200).json({
      success: true,
      data: volunteers,
    });
  } catch (error) {
    console.error('Error in getPendingVolunteers:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to fetch pending volunteers',
      error: error.message,
    });
  }
};

/**
 * Get NGO statistics
 */
exports.getNGOStats = async (req, res) => {
  try {
    const { ngoId } = req.params;

    const stats = await getNGOStats(ngoId);

    res.status(200).json({
      success: true,
      data: stats,
    });
  } catch (error) {
    console.error('Error in getNGOStats:', error);
    const statusCode = error.message === 'NGO not found' ? 404 : 500;
    res.status(statusCode).json({
      success: false,
      message: error.message,
      error: error.message,
    });
  }
};

module.exports = exports;
