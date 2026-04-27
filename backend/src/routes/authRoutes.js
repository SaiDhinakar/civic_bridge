const express = require('express');
const { body } = require('express-validator');
const authController = require('../controllers/authController');
const { verifyGoogleToken, verifyJWT } = require('../middleware/auth');

const router = express.Router();

/**
 * POST /api/auth/google
 * Google OAuth authentication
 */
router.post('/google', verifyGoogleToken, authController.googleAuth);

/**
 * GET /api/auth/verify
 * Verify JWT token
 */
router.get('/verify', verifyJWT, authController.verifyToken);

module.exports = router;
