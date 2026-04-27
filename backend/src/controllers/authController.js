const { registerOrGetUser, generateJWT } = require('../services/userService');
const { validationResult } = require('express-validator');

/**
 * Google OAuth callback - Register or login user
 */
exports.googleAuth = async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const decodedToken = req.user; // Set by verifyGoogleToken middleware

    // Register or get existing user
    const user = await registerOrGetUser(decodedToken);

    // Generate JWT token
    const jwtToken = generateJWT(user);

    res.status(200).json({
      success: true,
      message: 'Authentication successful',
      user: {
        uid: user.uid,
        email: user.email,
        displayName: user.displayName,
        role: user.role,
        profilePicture: user.profilePicture,
      },
      token: jwtToken,
    });
  } catch (error) {
    console.error('Error in googleAuth:', error);
    res.status(500).json({
      success: false,
      message: 'Authentication failed',
      error: error.message,
    });
  }
};

/**
 * Verify JWT token
 */
exports.verifyToken = (req, res) => {
  try {
    res.status(200).json({
      success: true,
      message: 'Token is valid',
      user: req.user,
    });
  } catch (error) {
    res.status(401).json({
      success: false,
      message: 'Invalid token',
      error: error.message,
    });
  }
};

module.exports = exports;
