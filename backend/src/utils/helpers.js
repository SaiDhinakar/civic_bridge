/**
 * Common utility functions for Civic Bridge
 */

/**
 * Generate a random string of specified length
 */
const generateRandomString = (length = 32) => {
  const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  let result = '';
  for (let i = 0; i < length; i++) {
    result += chars.charAt(Math.floor(Math.random() * chars.length));
  }
  return result;
};

/**
 * Validate email format
 */
const isValidEmail = (email) => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};

/**
 * Validate phone number (Indian format)
 */
const isValidPhoneNumber = (phone) => {
  const phoneRegex = /^[\+]?[91]{2}?[0]?[6-9]{1}[0-9]{9}$/;
  return phoneRegex.test(phone.replace(/-/g, ''));
};

/**
 * Calculate distance between two coordinates in km
 */
const calculateDistance = (lat1, lon1, lat2, lon2) => {
  const R = 6371; // Earth radius in km
  const dLat = ((lat2 - lat1) * Math.PI) / 180;
  const dLon = ((lon2 - lon1) * Math.PI) / 180;
  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos((lat1 * Math.PI) / 180) *
      Math.cos((lat2 * Math.PI) / 180) *
      Math.sin(dLon / 2) *
      Math.sin(dLon / 2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  return R * c;
};

/**
 * Format timestamp to readable date
 */
const formatDate = (timestamp) => {
  if (!timestamp) return null;
  const date = new Date(timestamp.toDate ? timestamp.toDate() : timestamp);
  return date.toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  });
};

/**
 * Check if user has required role
 */
const hasRole = (userRole, requiredRoles) => {
  if (typeof requiredRoles === 'string') {
    return userRole === requiredRoles;
  }
  return requiredRoles.includes(userRole);
};

/**
 * Sanitize user input to prevent XSS
 */
const sanitizeInput = (input) => {
  if (typeof input !== 'string') return input;
  return input
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#039;');
};

/**
 * Get age from DOB
 */
const getAge = (dob) => {
  if (!dob) return null;
  const today = new Date();
  const birthDate = new Date(dob);
  let age = today.getFullYear() - birthDate.getFullYear();
  const monthDiff = today.getMonth() - birthDate.getMonth();
  if (
    monthDiff < 0 ||
    (monthDiff === 0 && today.getDate() < birthDate.getDate())
  ) {
    age--;
  }
  return age;
};

/**
 * Generate pagination metadata
 */
const getPaginationMeta = (total, limit, offset) => {
  return {
    total,
    limit: parseInt(limit),
    offset: parseInt(offset),
    pages: Math.ceil(total / limit),
    currentPage: Math.floor(offset / limit) + 1,
  };
};

/**
 * Batch database operations
 */
const createBatch = (db) => {
  return db.batch();
};

/**
 * Sleep function for delays
 */
const sleep = (ms) => {
  return new Promise((resolve) => setTimeout(resolve, ms));
};

/**
 * Retry function with exponential backoff
 */
const retry = async (fn, maxRetries = 3, delay = 1000) => {
  for (let i = 0; i < maxRetries; i++) {
    try {
      return await fn();
    } catch (error) {
      if (i === maxRetries - 1) throw error;
      await sleep(delay * Math.pow(2, i));
    }
  }
};

/**
 * Log with timestamp
 */
const log = (level, message, data = null) => {
  const timestamp = new Date().toISOString();
  const logMessage = data
    ? `[${timestamp}] [${level}] ${message} ${JSON.stringify(data)}`
    : `[${timestamp}] [${level}] ${message}`;
  console.log(logMessage);
};

module.exports = {
  generateRandomString,
  isValidEmail,
  isValidPhoneNumber,
  calculateDistance,
  formatDate,
  hasRole,
  sanitizeInput,
  getAge,
  getPaginationMeta,
  createBatch,
  sleep,
  retry,
  log,
};
