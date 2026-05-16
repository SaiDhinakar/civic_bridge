const bcrypt = require('bcryptjs');
const { v4: uuidv4 } = require('uuid');
const { registerOrGetUser, generateJWT } = require('../services/userService');
const { validationResult } = require('express-validator');
const { usersCollection, ngosCollection, activitiesCollection, USER_ROLES } = require('../models/schemas');

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
    const isLogin = req.query.isLogin === 'true';

    // Register or get existing user
    const user = await registerOrGetUser(decodedToken, isLogin);

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
        message: 'Email not found. Please register first.',
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
 * Email/Password Registration (Volunteer or Community member)
 */
exports.emailRegister = async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ success: false, errors: errors.array() });
    }

    const { email, password, displayName, phone, city, role, skills, availability, neighbourhood } = req.body;

    // Validate role
    const allowedRoles = [USER_ROLES.VOLUNTEER, USER_ROLES.CITIZEN];
    const userRole = role === 'volunteer' ? USER_ROLES.VOLUNTEER : USER_ROLES.CITIZEN;
    if (!allowedRoles.includes(userRole)) {
      return res.status(400).json({ success: false, message: 'Invalid role. Must be volunteer or citizen.' });
    }

    // Check if email already exists
    const existing = await usersCollection.where('email', '==', email).get();
    if (!existing.empty) {
      return res.status(409).json({ success: false, message: 'An account with this email already exists.' });
    }

    // Hash password
    const saltRounds = 12;
    const hashedPassword = await bcrypt.hash(password, saltRounds);

    // Generate UID
    const uid = uuidv4();

    const newUser = {
      uid,
      email,
      displayName,
      password: hashedPassword,
      role: userRole,
      phoneNumber: phone || '',
      location: { address: city || neighbourhood || '' },
      skills: skills || [],
      availability: availability || '',
      verificationStatus: 'verified',
      profilePicture: '',
      createdAt: new Date(),
      updatedAt: new Date(),
      lastActive: new Date(),
    };

    await usersCollection.doc(uid).set(newUser);

    // Log activity
    await activitiesCollection.add({
      type: 'user_registered',
      description: `New ${userRole} registered: ${displayName}`,
      actorId: uid,
      relatedDocType: 'user',
      isPublic: false,
      createdAt: new Date(),
    });

    // Generate JWT
    const jwtToken = generateJWT({ uid, email, role: userRole, displayName });

    res.status(201).json({
      success: true,
      message: 'Account created successfully',
      user: { uid, email, displayName, role: userRole },
      token: jwtToken,
    });
  } catch (error) {
    console.error('Error in emailRegister:', error);
    res.status(500).json({ success: false, message: 'Registration failed', error: error.message });
  }
};

/**
 * NGO Registration - creates both the admin user and the NGO document
 */
exports.registerNGO = async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ success: false, errors: errors.array() });
    }

    const { email, password, displayName, orgName, regNumber, phone, city, website, focus } = req.body;

    // Check if email already exists
    const existing = await usersCollection.where('email', '==', email).get();
    if (!existing.empty) {
      return res.status(409).json({ success: false, message: 'An account with this email already exists.' });
    }

    // Hash password
    const saltRounds = 12;
    const hashedPassword = await bcrypt.hash(password, saltRounds);

    // Generate UIDs
    const uid = uuidv4();
    const ngoId = uuidv4();

    // Create the NGO document first
    const newNGO = {
      id: ngoId,
      name: orgName,
      description: `${orgName} - NGO operating in ${city}`,
      registrationNumber: regNumber,
      adminId: uid,
      members: [uid],
      location: { address: city || '' },
      contactEmail: email,
      phoneNumber: phone || '',
      website: website || '',
      logoUrl: '',
      focusAreas: focus || [],
      issuesPosted: 0,
      activitiesCount: 0,
      verificationStatus: 'pending',
      createdAt: new Date(),
      updatedAt: new Date(),
    };
    await ngosCollection.doc(ngoId).set(newNGO);

    // Create the NGO admin user
    const newUser = {
      uid,
      email,
      displayName,
      password: hashedPassword,
      role: USER_ROLES.NGO_ADMIN,
      phoneNumber: phone || '',
      location: { address: city || '' },
      ngoId,
      verificationStatus: 'pending',
      profilePicture: '',
      createdAt: new Date(),
      updatedAt: new Date(),
      lastActive: new Date(),
    };
    await usersCollection.doc(uid).set(newUser);

    // Log activity
    await activitiesCollection.add({
      type: 'ngo_registered',
      description: `New NGO registered: ${orgName}`,
      actorId: uid,
      relatedDocId: ngoId,
      relatedDocType: 'ngo',
      ngoId,
      isPublic: true,
      createdAt: new Date(),
    });

    res.status(201).json({
      success: true,
      message: 'NGO application submitted. You can sign in once verified.',
      user: { uid, email, displayName, role: USER_ROLES.NGO_ADMIN, ngoId },
    });
  } catch (error) {
    console.error('Error in registerNGO:', error);
    res.status(500).json({ success: false, message: 'NGO registration failed', error: error.message });
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
