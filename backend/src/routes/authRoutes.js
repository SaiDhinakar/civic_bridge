const express = require('express');
const { body } = require('express-validator');
const authController = require('../controllers/authController');
const { verifyGoogleToken, verifyJWT } = require('../middleware/auth');

const router = express.Router();

/**
 * POST /api/auth/login
 * Email and password login
 */
router.post(
  '/login',
  [
    body('email').isEmail().normalizeEmail(),
    body('password').notEmpty().withMessage('Password is required'),
  ],
  authController.emailLogin
);

/**
 * POST /api/auth/register
 * Email/password registration for volunteers and community members
 */
router.post(
  '/register',
  [
    body('email').isEmail().normalizeEmail().withMessage('Valid email is required'),
    body('password')
      .isLength({ min: 8 }).withMessage('Password must be at least 8 characters')
      .matches(/[A-Z]/).withMessage('Password must contain at least one uppercase letter')
      .matches(/[0-9]/).withMessage('Password must contain at least one number'),
    body('displayName').notEmpty().trim().withMessage('Full name is required'),
    body('role')
      .notEmpty()
      .isIn(['volunteer', 'citizen', 'community'])
      .withMessage('Role must be volunteer or community'),
  ],
  authController.emailRegister
);

/**
 * POST /api/auth/register-ngo
 * Register an NGO and its admin account
 */
router.post(
  '/register-ngo',
  [
    body('email').isEmail().normalizeEmail().withMessage('Valid email is required'),
    body('password')
      .isLength({ min: 8 }).withMessage('Password must be at least 8 characters')
      .matches(/[A-Z]/).withMessage('Password must contain at least one uppercase letter')
      .matches(/[0-9]/).withMessage('Password must contain at least one number'),
    body('displayName').notEmpty().trim().withMessage('Contact name is required'),
    body('orgName').notEmpty().trim().withMessage('Organisation name is required'),
    body('regNumber').notEmpty().trim().withMessage('Registration number is required'),
  ],
  authController.registerNGO
);

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
