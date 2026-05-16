const { auth } = require('../config/firebase');
const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');

dotenv.config();

const { OAuth2Client } = require('google-auth-library');
const googleClient = new OAuth2Client(process.env.GOOGLE_CLIENT_ID);

/**
 * Middleware to verify Firebase Google Auth token
 */
const verifyGoogleToken = async (req, res, next) => {
  try {
    const token = req.headers.authorization?.split('Bearer ')[1];

    if (!token) {
      return res.status(401).json({
        success: false,
        message: 'No authorization token provided',
      });
    }

    const ticket = await googleClient.verifyIdToken({
      idToken: token,
      audience: process.env.GOOGLE_CLIENT_ID,
    });
    const payload = ticket.getPayload();
    
    // Map the google payload to the format expected by our app (similar to decoded firebase token)
    req.user = {
      uid: payload.sub,
      email: payload.email,
      name: payload.name,
      picture: payload.picture
    };
    next();
  } catch (error) {
    res.status(401).json({
      success: false,
      message: 'Invalid token',
      error: error.message,
    });
  }
};

/**
 * Middleware to verify JWT token
 */
const verifyJWT = (req, res, next) => {
  try {
    const token = req.headers.authorization?.split('Bearer ')[1];

    if (!token) {
      return res.status(401).json({
        success: false,
        message: 'No authorization token provided',
      });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded;
    next();
  } catch (error) {
    res.status(401).json({
      success: false,
      message: 'Invalid or expired token',
      error: error.message,
    });
  }
};

/**
 * Middleware to check user role
 */
const checkRole = (allowedRoles) => {
  return (req, res, next) => {
    if (!allowedRoles.includes(req.user.role)) {
      return res.status(403).json({
        success: false,
        message: 'Access denied. Insufficient permissions.',
      });
    }
    next();
  };
};

module.exports = {
  verifyGoogleToken,
  verifyJWT,
  checkRole,
};
