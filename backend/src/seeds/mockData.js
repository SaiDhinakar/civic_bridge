/**
 * Mock Data for Civic Bridge - Prototype Testing
 * Contains realistic test data for NGOs, Volunteers, Issues, and Matches
 */

// Mock NGO Data
const mockNGOs = [
  {
    id: 'ngo_001',
    name: 'Urban Care Foundation',
    description: 'Dedicated to urban development and community welfare programs',
    registrationNumber: 'UCF-2020-001',
    adminId: 'admin_001',
    members: ['admin_001', 'volunteer_001', 'volunteer_002', 'volunteer_003'],
    location: {
      latitude: 28.6139,
      longitude: 77.2090,
      address: 'New Delhi, India'
    },
    contactEmail: 'contact@urbancare.org',
    phoneNumber: '+91-9876543210',
    website: 'https://urbancare.org',
    logoUrl: 'https://via.placeholder.com/150?text=Urban+Care',
    issuesPosted: 12,
    activitiesCount: 45,
    createdAt: new Date('2023-06-15'),
    updatedAt: new Date()
  },
  {
    id: 'ngo_002',
    name: 'Green Earth Initiative',
    description: 'Environmental conservation and sustainable living advocacy',
    registrationNumber: 'GEI-2021-002',
    adminId: 'admin_002',
    members: ['admin_002', 'volunteer_004', 'volunteer_005'],
    location: {
      latitude: 28.5244,
      longitude: 77.1855,
      address: 'Gurugram, Haryana'
    },
    contactEmail: 'info@greenearthinitiative.org',
    phoneNumber: '+91-9876543211',
    website: 'https://greenearthinitiative.org',
    logoUrl: 'https://via.placeholder.com/150?text=Green+Earth',
    issuesPosted: 8,
    activitiesCount: 32,
    createdAt: new Date('2023-08-20'),
    updatedAt: new Date()
  },
  {
    id: 'ngo_003',
    name: 'Education for All',
    description: 'Providing quality education and skill development to underprivileged',
    registrationNumber: 'EFA-2022-003',
    adminId: 'admin_003',
    members: ['admin_003', 'volunteer_006', 'volunteer_007', 'volunteer_008'],
    location: {
      latitude: 28.7041,
      longitude: 77.1025,
      address: 'Noida, Uttar Pradesh'
    },
    contactEmail: 'support@educationforall.org',
    phoneNumber: '+91-9876543212',
    website: 'https://educationforall.org',
    logoUrl: 'https://via.placeholder.com/150?text=Education+4+All',
    issuesPosted: 15,
    activitiesCount: 58,
    createdAt: new Date('2023-03-10'),
    updatedAt: new Date()
  }
];

// Mock User Data (NGO Admins)
const mockNGOAdmins = [
  {
    id: 'admin_001',
    uid: 'admin_001',
    email: 'admin@urbancare.org',
    displayName: 'Rajesh Kumar',
    role: 'ngo_admin',
    profilePicture: 'https://via.placeholder.com/150?text=Rajesh',
    phoneNumber: '+91-9876543210',
    location: {
      latitude: 28.6139,
      longitude: 77.2090,
      address: 'New Delhi'
    },
    ngoId: 'ngo_001',
    password: '1234',
    verificationStatus: 'verified',
    approvedBy: 'admin_system',
    createdAt: new Date('2023-06-15'),
    updatedAt: new Date(),
    lastActive: new Date()
  },
  {
    id: 'admin_002',
    uid: 'admin_002',
    email: 'admin@greenearthinitiative.org',
    displayName: 'Priya Sharma',
    role: 'ngo_admin',
    profilePicture: 'https://via.placeholder.com/150?text=Priya',
    phoneNumber: '+91-9876543211',
    location: {
      latitude: 28.5244,
      longitude: 77.1855,
      address: 'Gurugram'
    },
    ngoId: 'ngo_002',
    password: '1234',
    verificationStatus: 'verified',
    approvedBy: 'admin_system',
    createdAt: new Date('2023-08-20'),
    updatedAt: new Date(),
    lastActive: new Date()
  },
  {
    id: 'admin_003',
    uid: 'admin_003',
    email: 'admin@educationforall.org',
    displayName: 'Arjun Singh',
    role: 'ngo_admin',
    profilePicture: 'https://via.placeholder.com/150?text=Arjun',
    phoneNumber: '+91-9876543212',
    location: {
      latitude: 28.7041,
      longitude: 77.1025,
      address: 'Noida'
    },
    ngoId: 'ngo_003',
    password: '1234',
    verificationStatus: 'verified',
    approvedBy: 'admin_system',
    createdAt: new Date('2023-03-10'),
    updatedAt: new Date(),
    lastActive: new Date()
  }
];

// Mock User Data (Volunteers)
const mockVolunteers = [
  {
    id: 'volunteer_001',
    uid: 'volunteer_001',
    email: 'anand@volunteer.com',
    displayName: 'Anand Kumar',
    role: 'volunteer',
    profilePicture: 'https://via.placeholder.com/150?text=Anand',
    phoneNumber: '+91-9876543220',
    location: {
      latitude: 28.6139,
      longitude: 77.2090,
      address: 'New Delhi'
    },
    ngoId: 'ngo_001',
    password: '1234',
    skills: ['teaching', 'counseling', 'community_outreach'],
    verificationStatus: 'verified',
    approvedBy: 'admin_001',
    createdAt: new Date('2023-07-01'),
    updatedAt: new Date(),
    lastActive: new Date()
  },
  {
    id: 'volunteer_002',
    uid: 'volunteer_002',
    email: 'sneha@volunteer.com',
    displayName: 'Sneha Patel',
    role: 'volunteer',
    profilePicture: 'https://via.placeholder.com/150?text=Sneha',
    phoneNumber: '+91-9876543221',
    location: {
      latitude: 28.6200,
      longitude: 77.2150,
      address: 'New Delhi'
    },
    ngoId: 'ngo_001',
    password: '1234',
    skills: ['healthcare', 'first_aid', 'logistics'],
    verificationStatus: 'verified',
    approvedBy: 'admin_001',
    createdAt: new Date('2023-07-10'),
    updatedAt: new Date(),
    lastActive: new Date()
  },
  {
    id: 'volunteer_003',
    uid: 'volunteer_003',
    email: 'rohan@volunteer.com',
    displayName: 'Rohan Singh',
    role: 'volunteer',
    profilePicture: 'https://via.placeholder.com/150?text=Rohan',
    phoneNumber: '+91-9876543222',
    location: {
      latitude: 28.6100,
      longitude: 77.2050,
      address: 'New Delhi'
    },
    ngoId: 'ngo_001',
    password: '1234',
    skills: ['construction', 'repairs', 'infrastructure'],
    verificationStatus: 'verified',
    approvedBy: 'admin_001',
    createdAt: new Date('2023-07-15'),
    updatedAt: new Date(),
    lastActive: new Date()
  },
  {
    id: 'volunteer_004',
    uid: 'volunteer_004',
    email: 'meera@volunteer.com',
    displayName: 'Meera Kapoor',
    role: 'volunteer',
    profilePicture: 'https://via.placeholder.com/150?text=Meera',
    phoneNumber: '+91-9876543223',
    location: {
      latitude: 28.5244,
      longitude: 77.1855,
      address: 'Gurugram'
    },
    ngoId: 'ngo_002',
    password: '1234',
    skills: ['environmental_advocacy', 'recycling', 'tree_planting'],
    verificationStatus: 'verified',
    approvedBy: 'admin_002',
    createdAt: new Date('2023-08-25'),
    updatedAt: new Date(),
    lastActive: new Date()
  },
  {
    id: 'volunteer_005',
    uid: 'volunteer_005',
    email: 'vikram@volunteer.com',
    displayName: 'Vikram Negi',
    role: 'volunteer',
    profilePicture: 'https://via.placeholder.com/150?text=Vikram',
    phoneNumber: '+91-9876543224',
    location: {
      latitude: 28.5300,
      longitude: 77.1900,
      address: 'Gurugram'
    },
    ngoId: 'ngo_002',
    password: '1234',
    skills: ['data_analysis', 'documentation', 'event_management'],
    verificationStatus: 'verified',
    approvedBy: 'admin_002',
    createdAt: new Date('2023-09-01'),
    updatedAt: new Date(),
    lastActive: new Date()
  },
  {
    id: 'volunteer_006',
    uid: 'volunteer_006',
    email: 'anjali@volunteer.com',
    displayName: 'Anjali Verma',
    role: 'volunteer',
    profilePicture: 'https://via.placeholder.com/150?text=Anjali',
    phoneNumber: '+91-9876543225',
    location: {
      latitude: 28.7041,
      longitude: 77.1025,
      address: 'Noida'
    },
    ngoId: 'ngo_003',
    password: '1234',
    skills: ['teaching', 'curriculum_development', 'student_mentoring'],
    verificationStatus: 'verified',
    approvedBy: 'admin_003',
    createdAt: new Date('2023-03-20'),
    updatedAt: new Date(),
    lastActive: new Date()
  },
  {
    id: 'volunteer_007',
    uid: 'volunteer_007',
    email: 'nikhil@volunteer.com',
    displayName: 'Nikhil Gupta',
    role: 'volunteer',
    profilePicture: 'https://via.placeholder.com/150?text=Nikhil',
    phoneNumber: '+91-9876543226',
    location: {
      latitude: 28.7100,
      longitude: 77.1050,
      address: 'Noida'
    },
    ngoId: 'ngo_003',
    password: '1234',
    skills: ['technology', 'coding', 'digital_literacy'],
    verificationStatus: 'verified',
    approvedBy: 'admin_003',
    createdAt: new Date('2023-04-05'),
    updatedAt: new Date(),
    lastActive: new Date()
  },
  {
    id: 'volunteer_008',
    uid: 'volunteer_008',
    email: 'pooja@volunteer.com',
    displayName: 'Pooja Desai',
    role: 'volunteer',
    profilePicture: 'https://via.placeholder.com/150?text=Pooja',
    phoneNumber: '+91-9876543227',
    location: {
      latitude: 28.7000,
      longitude: 77.1000,
      address: 'Noida'
    },
    ngoId: 'ngo_003',
    password: '1234',
    skills: ['counseling', 'psychology', 'student_support'],
    verificationStatus: 'verified',
    approvedBy: 'admin_003',
    createdAt: new Date('2023-04-15'),
    updatedAt: new Date(),
    lastActive: new Date()
  }
];

// Mock Issue Data
const mockIssues = [
  {
    id: 'issue_001',
    title: 'Park Renovation and Cleanup',
    description: 'Community park needs urgent renovation including cleanup, new benches, and landscaping work. Help needed for a 3-day project.',
    category: 'environment',
    postedBy: 'admin_001',
    ngoId: 'ngo_001',
    location: {
      latitude: 28.6139,
      longitude: 77.2090,
      address: 'Central Park, New Delhi'
    },
    priority: 'high',
    status: 'approved',
    requiredSkills: ['construction', 'landscaping', 'cleanup'],
    attachments: [],
    verificationNotes: 'Verified by local authority',
    verifiedBy: 'volunteer_001',
    verifiedAt: new Date('2024-04-18'),
    approvedBy: 'admin_001',
    approvedAt: new Date('2024-04-19'),
    createdAt: new Date('2024-04-17'),
    updatedAt: new Date()
  },
  {
    id: 'issue_002',
    title: 'Community Health Camp Organization',
    description: 'Organizing a health awareness camp in underprivileged area. Need volunteers for registration, counseling, and data collection.',
    category: 'health',
    postedBy: 'admin_001',
    ngoId: 'ngo_001',
    location: {
      latitude: 28.6200,
      longitude: 77.2100,
      address: 'Slum Area, New Delhi'
    },
    priority: 'high',
    status: 'approved',
    requiredSkills: ['healthcare', 'counseling', 'data_entry'],
    attachments: [],
    verificationNotes: 'Approved for community benefit',
    verifiedBy: 'volunteer_002',
    verifiedAt: new Date('2024-04-19'),
    approvedBy: 'admin_001',
    approvedAt: new Date('2024-04-20'),
    createdAt: new Date('2024-04-18'),
    updatedAt: new Date()
  },
  {
    id: 'issue_003',
    title: 'Tree Plantation Drive',
    description: 'Large-scale tree plantation initiative in Gurugram. Aiming to plant 500 trees in the next month. Need volunteers for digging, planting, and maintenance.',
    category: 'environment',
    postedBy: 'admin_002',
    ngoId: 'ngo_002',
    location: {
      latitude: 28.5244,
      longitude: 77.1855,
      address: 'Eco Park, Gurugram'
    },
    priority: 'medium',
    status: 'approved',
    requiredSkills: ['tree_planting', 'landscaping', 'environmental_advocacy'],
    attachments: [],
    verificationNotes: 'Environmental impact verified',
    verifiedBy: 'volunteer_004',
    verifiedAt: new Date('2024-04-15'),
    approvedBy: 'admin_002',
    approvedAt: new Date('2024-04-16'),
    createdAt: new Date('2024-04-14'),
    updatedAt: new Date()
  },
  {
    id: 'issue_004',
    title: 'E-Waste Recycling Program',
    description: 'Launching an e-waste recycling program to reduce electronic waste. Need volunteers for collection, sorting, and awareness.',
    category: 'environment',
    postedBy: 'admin_002',
    ngoId: 'ngo_002',
    location: {
      latitude: 28.5300,
      longitude: 77.1900,
      address: 'Industrial Area, Gurugram'
    },
    priority: 'medium',
    status: 'posted',
    requiredSkills: ['recycling', 'documentation', 'event_management'],
    attachments: [],
    verificationNotes: '',
    verifiedBy: null,
    verifiedAt: null,
    approvedBy: null,
    approvedAt: null,
    createdAt: new Date('2024-04-20'),
    updatedAt: new Date()
  },
  {
    id: 'issue_005',
    title: 'After-School Tutoring Program',
    description: 'Need tutors for after-school program helping underprivileged children with Math, English, and Science. Sessions are 2 hours daily.',
    category: 'education',
    postedBy: 'admin_003',
    ngoId: 'ngo_003',
    location: {
      latitude: 28.7041,
      longitude: 77.1025,
      address: 'Community Center, Noida'
    },
    priority: 'high',
    status: 'approved',
    requiredSkills: ['teaching', 'student_mentoring', 'curriculum_development'],
    attachments: [],
    verificationNotes: 'Verified curriculum standards met',
    verifiedBy: 'volunteer_006',
    verifiedAt: new Date('2024-04-10'),
    approvedBy: 'admin_003',
    approvedAt: new Date('2024-04-11'),
    createdAt: new Date('2024-04-08'),
    updatedAt: new Date()
  },
  {
    id: 'issue_006',
    title: 'Digital Literacy Workshops',
    description: 'Teaching basic computer and internet skills to elderly citizens and rural migrants. Need tech-savvy volunteers for hands-on training.',
    category: 'education',
    postedBy: 'admin_003',
    ngoId: 'ngo_003',
    location: {
      latitude: 28.7100,
      longitude: 77.1050,
      address: 'Senior Citizen Center, Noida'
    },
    priority: 'medium',
    status: 'approved',
    requiredSkills: ['technology', 'coding', 'digital_literacy'],
    attachments: [],
    verificationNotes: 'Training standards verified',
    verifiedBy: 'volunteer_007',
    verifiedAt: new Date('2024-04-12'),
    approvedBy: 'admin_003',
    approvedAt: new Date('2024-04-13'),
    createdAt: new Date('2024-04-10'),
    updatedAt: new Date()
  }
];

// Mock Volunteer Matches
const mockMatches = [
  {
    id: 'match_001',
    issueId: 'issue_001',
    volunteerId: 'volunteer_003',
    matchScore: 85,
    scoreBreakdown: {
      distance: 40,
      availability: 30,
      skills: 20,
      history: 0
    },
    status: 'pending',
    volunteerResponse: null,
    createdAt: new Date('2024-04-19'),
    updatedAt: new Date()
  },
  {
    id: 'match_002',
    issueId: 'issue_001',
    volunteerId: 'volunteer_001',
    matchScore: 72,
    scoreBreakdown: {
      distance: 35,
      availability: 25,
      skills: 12,
      history: 0
    },
    status: 'accepted',
    volunteerResponse: 'accepted',
    createdAt: new Date('2024-04-19'),
    updatedAt: new Date('2024-04-19')
  },
  {
    id: 'match_003',
    issueId: 'issue_002',
    volunteerId: 'volunteer_002',
    matchScore: 90,
    scoreBreakdown: {
      distance: 40,
      availability: 30,
      skills: 20,
      history: 0
    },
    status: 'accepted',
    volunteerResponse: 'accepted',
    createdAt: new Date('2024-04-20'),
    updatedAt: new Date('2024-04-20')
  },
  {
    id: 'match_004',
    issueId: 'issue_003',
    volunteerId: 'volunteer_004',
    matchScore: 88,
    scoreBreakdown: {
      distance: 40,
      availability: 30,
      skills: 18,
      history: 0
    },
    status: 'accepted',
    volunteerResponse: 'accepted',
    createdAt: new Date('2024-04-16'),
    updatedAt: new Date('2024-04-16')
  },
  {
    id: 'match_005',
    issueId: 'issue_003',
    volunteerId: 'volunteer_005',
    matchScore: 75,
    scoreBreakdown: {
      distance: 35,
      availability: 28,
      skills: 12,
      history: 0
    },
    status: 'pending',
    volunteerResponse: null,
    createdAt: new Date('2024-04-16'),
    updatedAt: new Date()
  },
  {
    id: 'match_006',
    issueId: 'issue_005',
    volunteerId: 'volunteer_006',
    matchScore: 92,
    scoreBreakdown: {
      distance: 40,
      availability: 30,
      skills: 22,
      history: 0
    },
    status: 'accepted',
    volunteerResponse: 'accepted',
    createdAt: new Date('2024-04-11'),
    updatedAt: new Date('2024-04-11')
  },
  {
    id: 'match_007',
    issueId: 'issue_006',
    volunteerId: 'volunteer_007',
    matchScore: 89,
    scoreBreakdown: {
      distance: 40,
      availability: 30,
      skills: 19,
      history: 0
    },
    status: 'accepted',
    volunteerResponse: 'accepted',
    createdAt: new Date('2024-04-13'),
    updatedAt: new Date('2024-04-13')
  }
];

// Mock Activity Data
const mockActivities = [
  {
    id: 'activity_001',
    type: 'issue_created',
    description: 'Park Renovation and Cleanup issue posted',
    actorId: 'admin_001',
    actorName: 'Rajesh Kumar',
    relatedDocId: 'issue_001',
    relatedDocType: 'issue',
    ngoId: 'ngo_001',
    isPublic: true,
    createdAt: new Date('2024-04-17')
  },
  {
    id: 'activity_002',
    type: 'issue_verified',
    description: 'Park Renovation issue verified',
    actorId: 'volunteer_001',
    actorName: 'Anand Kumar',
    relatedDocId: 'issue_001',
    relatedDocType: 'issue',
    ngoId: 'ngo_001',
    isPublic: true,
    createdAt: new Date('2024-04-18')
  },
  {
    id: 'activity_003',
    type: 'issue_approved',
    description: 'Park Renovation issue approved - AI matching triggered',
    actorId: 'admin_001',
    actorName: 'Rajesh Kumar',
    relatedDocId: 'issue_001',
    relatedDocType: 'issue',
    ngoId: 'ngo_001',
    isPublic: true,
    createdAt: new Date('2024-04-19')
  },
  {
    id: 'activity_004',
    type: 'volunteer_matched',
    description: 'Volunteers matched for Park Renovation issue',
    actorId: 'admin_001',
    actorName: 'Rajesh Kumar',
    relatedDocId: 'issue_001',
    relatedDocType: 'issue',
    ngoId: 'ngo_001',
    isPublic: true,
    createdAt: new Date('2024-04-19')
  },
  {
    id: 'activity_005',
    type: 'volunteer_accepted',
    description: 'Rohan Singh accepted Park Renovation task',
    actorId: 'volunteer_003',
    actorName: 'Rohan Singh',
    relatedDocId: 'match_001',
    relatedDocType: 'match',
    ngoId: 'ngo_001',
    isPublic: true,
    createdAt: new Date('2024-04-19')
  },
  {
    id: 'activity_006',
    type: 'issue_created',
    description: 'Tree Plantation Drive issue posted',
    actorId: 'admin_002',
    actorName: 'Priya Sharma',
    relatedDocId: 'issue_003',
    relatedDocType: 'issue',
    ngoId: 'ngo_002',
    isPublic: true,
    createdAt: new Date('2024-04-14')
  },
  {
    id: 'activity_007',
    type: 'volunteer_matched',
    description: 'Volunteers matched for Tree Plantation Drive',
    actorId: 'admin_002',
    actorName: 'Priya Sharma',
    relatedDocId: 'issue_003',
    relatedDocType: 'issue',
    ngoId: 'ngo_002',
    isPublic: true,
    createdAt: new Date('2024-04-16')
  }
];

module.exports = {
  mockNGOs,
  mockNGOAdmins,
  mockVolunteers,
  mockIssues,
  mockMatches,
  mockActivities
};
