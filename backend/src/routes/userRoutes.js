const express = require('express');
const { body } = require('express-validator');
const userController = require('../controllers/userController');
const { verifyJWT, checkRole } = require('../middleware/auth');

const router = express.Router();

/**
 * GET /api/users/profile
 * Get current user profile
 */
router.get('/profile', verifyJWT, userController.getProfile);

/**
 * PUT /api/users/profile
 * Update user profile
 */
router.put(
  '/profile',
  verifyJWT,
  [
    body('displayName').optional().trim().notEmpty(),
    body('phoneNumber').optional().trim(),
    body('location').optional().isObject(),
    body('skills').optional().isArray(),
  ],
  userController.updateProfile
);

/**
 * POST /api/users/request-join-ngo
 * Request to join NGO as volunteer
 */
router.post(
  '/request-join-ngo',
  verifyJWT,
  [body('ngoId').notEmpty().trim()],
  userController.requestToJoinNGO
);

/**
 * POST /api/users/verify-volunteer
 * Verify a volunteer (NGO Admin only)
 */
router.post(
  '/verify-volunteer',
  verifyJWT,
  checkRole(['ngo_admin']),
  [body('volunteerId').notEmpty().trim()],
  userController.verifyVolunteer
);

/**
 * GET /api/users/ngo/:ngoId/volunteers
 * Get all volunteers of an NGO
 */
router.get('/ngo/:ngoId/volunteers', verifyJWT, userController.getNGOVolunteers);

module.exports = router;
