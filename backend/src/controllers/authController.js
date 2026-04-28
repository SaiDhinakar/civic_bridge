const bcrypt = require('bcryptjs');
const { registerOrGetUser, generateJWT } = require('../services/userService');
const { validationResult } = require('express-validator');
const { usersCollection } = require('../models/schemas');

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
 * Email/Password Login
 */
exports.emailLogin = async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { email, password } = req.body;

    // Find user by email
    const userSnapshot = await usersCollection.where('email', '==', email).get();
    
    if (userSnapshot.empty) {
      return res.status(401).json({
        success: false,
        message: 'Invalid email or password',
      });
    }

    const userDoc = userSnapshot.docs[0];
    const user = userDoc.data();

    // Check if user has a password field
    if (!user.password) {
      return res.status(401).json({
        success: false,
        message: 'This account uses Google OAuth. Please sign in with Google.',
      });
    }

    // Compare passwords
    const isValidPassword = await bcrypt.compare(password, user.password);
    
    if (!isValidPassword) {
      return res.status(401).json({
        success: false,
        message: 'Invalid email or password',
      });
    }

    // Update last active
    await usersCollection.doc(userDoc.id).update({
      lastActive: new Date(),
    });

    // Generate JWT token
    const jwtToken = generateJWT({ ...user, uid: userDoc.id });

    res.status(200).json({
      success: true,
      message: 'Login successful',
      user: {
        uid: userDoc.id,
        email: user.email,
        displayName: user.displayName,
        role: user.role,
        profilePicture: user.profilePicture,
        ngoId: user.ngoId,
      },
      token: jwtToken,
    });
  } catch (error) {
    console.error('Error in emailLogin:', error);
    res.status(500).json({
      success: false,
      message: 'Login failed',
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
