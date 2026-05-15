const { db } = require('../config/firebase');

/**
 * User Roles
 */
const USER_ROLES = {
  NGO_ADMIN: 'ngo_admin',
  VOLUNTEER: 'volunteer',
  CITIZEN: 'citizen',
};

/**
 * Collection references — lazy getters to avoid crashing when db is null
 */
const getCollection = (name) => {
  if (!db) throw new Error('Firebase is not configured. Please add credentials to backend/.env');
  return db.collection(name);
};

const usersCollection = { get: () => getCollection('users'), where: (...a) => getCollection('users').where(...a), doc: (...a) => getCollection('users').doc(...a), add: (...a) => getCollection('users').add(...a) };
const ngosCollection = { get: () => getCollection('ngos'), where: (...a) => getCollection('ngos').where(...a), doc: (...a) => getCollection('ngos').doc(...a), add: (...a) => getCollection('ngos').add(...a) };
const issuesCollection = { get: () => getCollection('issues'), where: (...a) => getCollection('issues').where(...a), doc: (...a) => getCollection('issues').doc(...a), add: (...a) => getCollection('issues').add(...a) };
const tasksCollection = { get: () => getCollection('tasks'), where: (...a) => getCollection('tasks').where(...a), doc: (...a) => getCollection('tasks').doc(...a), add: (...a) => getCollection('tasks').add(...a) };
const volunteerMatchesCollection = { get: () => getCollection('volunteer_matches'), where: (...a) => getCollection('volunteer_matches').where(...a), doc: (...a) => getCollection('volunteer_matches').doc(...a), add: (...a) => getCollection('volunteer_matches').add(...a) };
const activitiesCollection = { get: () => getCollection('activities'), where: (...a) => getCollection('activities').where(...a), doc: (...a) => getCollection('activities').doc(...a), add: (...a) => getCollection('activities').add(...a) };

/**
 * User Document Structure
 * {
 *   uid: string (from Firebase Auth)
 *   email: string
 *   displayName: string
 *   role: 'ngo_admin' | 'volunteer' | 'citizen'
 *   profilePicture: string (URL)
 *   phoneNumber: string
 *   location: {
 *     latitude: number
 *     longitude: number
 *     address: string
 *   }
 *   ngoId: string (for ngo_admin and volunteer)
 *   skills: string[] (for volunteer)
 *   verificationStatus: 'pending' | 'verified' | 'rejected'
 *   approvedBy: string (uid of approving admin)
 *   createdAt: timestamp
 *   updatedAt: timestamp
 *   lastActive: timestamp
 * }
 */

/**
 * NGO Document Structure
 * {
 *   name: string
 *   description: string
 *   registrationNumber: string
 *   adminId: string (uid)
 *   members: string[] (array of user uids)
 *   location: {
 *     latitude: number
 *     longitude: number
 *     address: string
 *   }
 *   contactEmail: string
 *   phoneNumber: string
 *   website: string
 *   logoUrl: string
 *   issuesPosted: number
 *   activitiesCount: number
 *   createdAt: timestamp
 *   updatedAt: timestamp
 * }
 */

/**
 * Issue Document Structure
 * {
 *   title: string
 *   description: string
 *   category: string
 *   postedBy: string (uid)
 *   ngoId: string
 *   location: {
 *     latitude: number
 *     longitude: number
 *     address: string
 *   }
 *   priority: 'low' | 'medium' | 'high'
 *   status: 'posted' | 'verified' | 'approved' | 'in_progress' | 'completed'
 *   attachments: string[] (URLs)
 *   verificationNotes: string
 *   verifiedBy: string (uid)
 *   verifiedAt: timestamp
 *   approvedBy: string (uid)
 *   approvedAt: timestamp
 *   createdAt: timestamp
 *   updatedAt: timestamp
 * }
 */

/**
 * Task Document Structure
 * {
 *   issueId: string
 *   title: string
 *   description: string
 *   assignedTo: string (uid)
 *   status: 'pending' | 'assigned' | 'in_progress' | 'completed'
 *   priority: 'low' | 'medium' | 'high'
 *   dueDate: timestamp
 *   location: {
 *     latitude: number
 *     longitude: number
 *     address: string
 *   }
 *   requiredSkills: string[]
 *   matchScore: number
 *   createdAt: timestamp
 *   updatedAt: timestamp
 * }
 */

/**
 * Volunteer Match Document Structure
 * {
 *   issueId: string
 *   volunteerId: string
 *   matchScore: number (0-100)
 *   matchReason: string
 *   status: 'suggested' | 'accepted' | 'rejected' | 'completed'
 *   suggestedAt: timestamp
 *   respondedAt: timestamp
 *   completedAt: timestamp
 * }
 */

/**
 * Activity Document Structure
 * {
 *   type: 'issue_posted' | 'issue_verified' | 'issue_approved' | 'task_assigned' | 'task_completed'
 *   description: string
 *   actorId: string (uid)
 *   relatedDocId: string
 *   relatedDocType: string
 *   ngoId: string
 *   isPublic: boolean
 *   createdAt: timestamp
 * }
 */

module.exports = {
  USER_ROLES,
  usersCollection,
  ngosCollection,
  issuesCollection,
  tasksCollection,
  volunteerMatchesCollection,
  activitiesCollection,
};
