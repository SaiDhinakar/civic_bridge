/**
 * Database Seeding Utility
 * Populates Firebase with mock data for prototyping and testing
 */

const bcrypt = require('bcryptjs');
const { db } = require('../config/firebase');
const {
  mockNGOs,
  mockNGOAdmins,
  mockVolunteers,
  mockIssues,
  mockMatches,
  mockActivities
} = require('./mockData');

const {
  usersCollection,
  ngosCollection,
  issuesCollection,
  volunteerMatchesCollection,
  activitiesCollection
} = require('../models/schemas');

/**
 * Clear existing data from collections (for fresh seeding)
 */
const clearCollections = async () => {
  console.log('🧹 [SEEDING] Clearing existing data...');
  
  try {
    // Clear users
    const usersSnap = await usersCollection.get();
    for (const doc of usersSnap.docs) {
      await doc.ref.delete();
    }
    console.log('✅ Users cleared');

    // Clear NGOs
    const ngosSnap = await ngosCollection.get();
    for (const doc of ngosSnap.docs) {
      await doc.ref.delete();
    }
    console.log('✅ NGOs cleared');

    // Clear issues
    const issuesSnap = await issuesCollection.get();
    for (const doc of issuesSnap.docs) {
      await doc.ref.delete();
    }
    console.log('✅ Issues cleared');

    // Clear matches
    const matchesSnap = await volunteerMatchesCollection.get();
    for (const doc of matchesSnap.docs) {
      await doc.ref.delete();
    }
    console.log('✅ Matches cleared');

    // Clear activities
    const activitiesSnap = await activitiesCollection.get();
    for (const doc of activitiesSnap.docs) {
      await doc.ref.delete();
    }
    console.log('✅ Activities cleared');

  } catch (error) {
    console.error('❌ Error clearing collections:', error);
    throw error;
  }
};

/**
 * Seed NGOs
 */
const seedNGOs = async () => {
  console.log('🌱 [SEEDING] Seeding NGOs...');
  
  try {
    for (const ngo of mockNGOs) {
      const { id, ...data } = ngo;
      await ngosCollection.doc(id).set(data);
      console.log(`  ✅ NGO created: ${data.name}`);
    }
  } catch (error) {
    console.error('❌ Error seeding NGOs:', error);
    throw error;
  }
};

/**
 * Seed NGO Admins
 */
const seedNGOAdmins = async () => {
  console.log('🌱 [SEEDING] Seeding NGO Admins...');
  
  try {
    for (const admin of mockNGOAdmins) {
      const { id, uid, password, ...data } = admin;
      // Hash the password
      const hashedPassword = await bcrypt.hash(password, 10);
      const adminData = { ...data, password: hashedPassword };
      await usersCollection.doc(uid).set(adminData);
      console.log(`  ✅ Admin created: ${data.displayName} (password encrypted)`);
    }
  } catch (error) {
    console.error('❌ Error seeding NGO Admins:', error);
    throw error;
  }
};

/**
 * Seed Volunteers
 */
const seedVolunteers = async () => {
  console.log('🌱 [SEEDING] Seeding Volunteers...');
  
  try {
    for (const volunteer of mockVolunteers) {
      const { id, uid, password, ...data } = volunteer;
      // Hash the password
      const hashedPassword = await bcrypt.hash(password, 10);
      const volunteerData = { ...data, password: hashedPassword };
      await usersCollection.doc(uid).set(volunteerData);
      console.log(`  ✅ Volunteer created: ${data.displayName} (password encrypted)`);
    }
  } catch (error) {
    console.error('❌ Error seeding Volunteers:', error);
    throw error;
  }
};

/**
 * Seed Issues
 */
const seedIssues = async () => {
  console.log('🌱 [SEEDING] Seeding Issues...');
  
  try {
    for (const issue of mockIssues) {
      const { id, ...data } = issue;
      await issuesCollection.doc(id).set(data);
      console.log(`  ✅ Issue created: ${data.title}`);
    }
  } catch (error) {
    console.error('❌ Error seeding Issues:', error);
    throw error;
  }
};

/**
 * Seed Volunteer Matches
 */
const seedMatches = async () => {
  console.log('🌱 [SEEDING] Seeding Volunteer Matches...');
  
  try {
    for (const match of mockMatches) {
      const { id, ...data } = match;
      await volunteerMatchesCollection.doc(id).set(data);
      console.log(`  ✅ Match created: ${data.volunteerId} → ${data.issueId}`);
    }
  } catch (error) {
    console.error('❌ Error seeding Matches:', error);
    throw error;
  }
};

/**
 * Seed Activities
 */
const seedActivities = async () => {
  console.log('🌱 [SEEDING] Seeding Activities...');
  
  try {
    for (const activity of mockActivities) {
      const { id, ...data } = activity;
      await activitiesCollection.doc(id).set(data);
      console.log(`  ✅ Activity created: ${data.type}`);
    }
  } catch (error) {
    console.error('❌ Error seeding Activities:', error);
    throw error;
  }
};

/**
 * Run complete seeding process
 */
const seedDatabase = async (options = {}) => {
  const { clearFirst = true } = options;
  
  try {
    console.log('\n🚀 [SEEDING] Starting database seeding process...\n');
    
    if (clearFirst) {
      await clearCollections();
      console.log('');
    }
    
    await seedNGOs();
    console.log('');
    
    await seedNGOAdmins();
    console.log('');
    
    await seedVolunteers();
    console.log('');
    
    await seedIssues();
    console.log('');
    
    await seedMatches();
    console.log('');
    
    await seedActivities();
    console.log('');
    
    console.log('✅ [SEEDING] Database seeding completed successfully!\n');
    console.log('📊 Summary:');
    console.log(`  - NGOs: ${mockNGOs.length}`);
    console.log(`  - NGO Admins: ${mockNGOAdmins.length}`);
    console.log(`  - Volunteers: ${mockVolunteers.length}`);
    console.log(`  - Issues: ${mockIssues.length}`);
    console.log(`  - Matches: ${mockMatches.length}`);
    console.log(`  - Activities: ${mockActivities.length}`);
    console.log('');
    
  } catch (error) {
    console.error('❌ [SEEDING] Fatal error during seeding:', error);
    throw error;
  }
};

module.exports = {
  seedDatabase,
  clearCollections,
  seedNGOs,
  seedNGOAdmins,
  seedVolunteers,
  seedIssues,
  seedMatches,
  seedActivities
};
