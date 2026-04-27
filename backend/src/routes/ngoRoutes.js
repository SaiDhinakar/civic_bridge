const express = require('express');
const { body } = require('express-validator');
const ngoController = require('../controllers/ngoController');
const { verifyJWT, checkRole } = require('../middleware/auth');

const router = express.Router();

/**
 * POST /api/ngos
 * Create a new NGO
 */
router.post(
  '/',
  verifyJWT,
  [
    body('name').notEmpty().trim(),
    body('description').notEmpty().trim(),
    body('registrationNumber').notEmpty().trim(),
    body('contactEmail').isEmail(),
    body('phoneNumber').notEmpty().trim(),
    body('location').optional().isObject(),
    body('website').optional().isURL(),
    body('logoUrl').optional().isURL(),
  ],
  ngoController.createNGO
);

/**
 * GET /api/ngos/:ngoId
 * Get NGO details
 */
router.get('/:ngoId', ngoController.getNGODetails);

/**
 * PUT /api/ngos/:ngoId
 * Update NGO profile
 */
router.put(
  '/:ngoId',
  verifyJWT,
  checkRole(['ngo_admin']),
  [
    body('name').optional().trim(),
    body('description').optional().trim(),
    body('contactEmail').optional().isEmail(),
    body('phoneNumber').optional().trim(),
    body('location').optional().isObject(),
    body('website').optional().isURL(),
    body('logoUrl').optional().isURL(),
  ],
  ngoController.updateNGOProfile
);

/**
 * POST /api/ngos/add-volunteer
 * Add volunteer to NGO (approve join request)
 */
router.post(
  '/add-volunteer',
  verifyJWT,
  checkRole(['ngo_admin']),
  [body('ngoId').notEmpty().trim(), body('volunteerId').notEmpty().trim()],
  ngoController.addVolunteerToNGO
);

/**
 * GET /api/ngos/:ngoId/pending-volunteers
 * Get pending volunteers for NGO
 */
router.get(
  '/:ngoId/pending-volunteers',
  verifyJWT,
  checkRole(['ngo_admin']),
  ngoController.getPendingVolunteers
);

/**
 * GET /api/ngos/:ngoId/stats
 * Get NGO statistics
 */
router.get('/:ngoId/stats', verifyJWT, ngoController.getNGOStats);

module.exports = router;
