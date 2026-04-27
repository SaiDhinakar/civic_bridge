# Quick Start Guide - Civic Bridge Backend

## What's Been Built

A complete Node.js backend for a smart volunteer coordination platform with:
- ✅ Firebase authentication (Google OAuth)
- ✅ Firestore database integration
- ✅ Gemini AI for intelligent volunteer matching
- ✅ Three user roles: NGO Admin, Volunteer, Citizen
- ✅ Issue posting, verification, and approval workflow
- ✅ AI-powered volunteer-to-task matching
- ✅ Activity feed for citizens
- ✅ Proper environment configuration
- ✅ Clean architecture with separation of concerns

---

## 5-Minute Setup

### 1. Install Dependencies
```bash
cd backend
npm install
```

### 2. Configure Environment
```bash
cp .env.example .env
```

Edit `.env` with your credentials (see SETUP.md for details)

### 3. Start Server
```bash
npm run dev
```

Server runs at `http://localhost:5000`

### 4. Test It Works
```bash
curl http://localhost:5000/api/health
```

---

## Project Structure Overview

```
backend/src/
├── config/              # Firebase & Gemini configuration
├── controllers/         # Request handlers
├── middleware/          # Auth & validation
├── models/              # Firestore schemas
├── routes/              # API endpoints
├── services/            # Business logic
│   ├── userService.js         (auth & profiles)
│   ├── issueService.js        (issue workflow)
│   ├── ngoService.js          (NGO management)
│   └── volunteerMatchingService.js (AI matching)
└── utils/               # Helper functions
```

---

## Key Features Implemented

### 1. Authentication
- Google OAuth integration
- JWT token generation
- Role-based access control (RBAC)

### 2. User Management
- Three user types: NGO Admin, Volunteer, Citizen
- Profile management
- Volunteer verification workflow
- NGO member management

### 3. Issue Workflow
```
Citizen posts issue
         ↓
Volunteer verifies issue
         ↓
NGO Admin approves issue
         ↓
Gemini AI matches volunteers
         ↓
Volunteers respond to matches
```

### 4. AI Volunteer Matching
Uses Gemini AI to analyze:
- Volunteer skills
- Issue requirements
- Geographic proximity
- Verification status
- Experience level

Returns ranked matches with scores and explanations.

### 5. Activity Feed
- Public activity for approved issues
- Pagination support
- Only shows approved & ongoing work

---

## API Endpoints Summary

### Authentication
- `POST /api/auth/google` - Login with Google
- `GET /api/auth/verify` - Verify JWT token

### Users
- `GET /api/users/profile` - Get profile
- `PUT /api/users/profile` - Update profile
- `POST /api/users/request-join-ngo` - Request to join NGO
- `POST /api/users/verify-volunteer` - Verify volunteer (admin)
- `GET /api/users/ngo/:ngoId/volunteers` - Get volunteers

### NGOs
- `POST /api/ngos` - Create NGO
- `GET /api/ngos/:ngoId` - Get NGO details
- `PUT /api/ngos/:ngoId` - Update NGO
- `POST /api/ngos/add-volunteer` - Add volunteer
- `GET /api/ngos/:ngoId/pending-volunteers` - Get pending
- `GET /api/ngos/:ngoId/stats` - Get statistics

### Issues
- `POST /api/issues` - Post issue
- `GET /api/issues/activity-feed` - Get public feed
- `GET /api/issues/:issueId` - Get issue details
- `POST /api/issues/:issueId/verify` - Verify (volunteer)
- `POST /api/issues/:issueId/approve` - Approve & match (admin)
- `GET /api/issues/ngo/:ngoId` - Get NGO issues

### Volunteer Matching
- `GET /api/matches/:issueId` - Get AI matches
- `POST /api/matches/:matchId/respond` - Accept/reject match

---

## Example Usage

### 1. User Signs Up with Google
```javascript
// Frontend sends Google token
fetch('http://localhost:5000/api/auth/google', {
  method: 'POST',
  headers: {
    'Authorization': `Bearer ${googleToken}`
  }
})
.then(res => res.json())
.then(data => {
  // Save data.token for future requests
});
```

### 2. NGO Admin Creates NGO
```javascript
fetch('http://localhost:5000/api/ngos', {
  method: 'POST',
  headers: {
    'Authorization': `Bearer ${jwtToken}`,
    'Content-Type': 'application/json'
  },
  body: JSON.stringify({
    name: 'Water Foundation',
    description: '...',
    registrationNumber: '...',
    // ... other fields
  })
})
```

### 3. Citizen Posts Issue
```javascript
fetch('http://localhost:5000/api/issues', {
  method: 'POST',
  headers: {
    'Authorization': `Bearer ${jwtToken}`,
    'Content-Type': 'application/json'
  },
  body: JSON.stringify({
    title: 'No clean water',
    description: '...',
    category: 'water',
    location: { latitude, longitude, address }
  })
})
```

### 4. NGO Admin Approves Issue (Triggers AI)
```javascript
fetch('http://localhost:5000/api/issues/${issueId}/approve', {
  method: 'POST',
  headers: {
    'Authorization': `Bearer ${adminToken}`,
    'Content-Type': 'application/json'
  }
})
// Response includes AI-matched volunteers
```

### 5. Get Volunteer Matches
```javascript
fetch('http://localhost:5000/api/matches/${issueId}', {
  headers: {
    'Authorization': `Bearer ${jwtToken}`
  }
})
// Returns [
//   {
//     volunteerId: 'vol123',
//     matchScore: 92,
//     matchReason: 'Expert in water management...'
//   }
// ]
```

---

## Database Structure (Firestore)

### Collections
- `users` - User profiles with roles
- `ngos` - NGO organizations
- `issues` - Community issues
- `tasks` - Task assignments
- `volunteer_matches` - AI match suggestions
- `activities` - Activity log
- `ngo_join_requests` - Join requests

See detailed schemas in `src/models/schemas.js`

---

## Environment Variables Needed

```env
# Firebase (from Firebase Console)
FIREBASE_PROJECT_ID
FIREBASE_PRIVATE_KEY
FIREBASE_CLIENT_EMAIL
FIREBASE_DATABASE_URL

# Google OAuth (from Google Cloud Console)
GOOGLE_CLIENT_ID
GOOGLE_CLIENT_SECRET

# Gemini AI (from Google Cloud)
GEMINI_API_KEY

# Server config
PORT=5000
NODE_ENV=development
JWT_SECRET=your_secret_key
JWT_EXPIRY=7d
CORS_ORIGIN=http://localhost:3000

# AI Matching config
AI_MODEL_VERSION=gemini-pro
MATCHING_THRESHOLD=0.7
MAX_VOLUNTEERS_PER_ISSUE=5
```

Full setup instructions in `SETUP.md`

---

## Testing the API

### Health Check
```bash
curl http://localhost:5000/api/health
```

### Using Postman
1. Import `API_TESTING.md` examples
2. Set `base_url` variable
3. Test endpoints in order

### Using cURL
Examples in `API_TESTING.md`

---

## Architecture Highlights

### Clean Separation of Concerns
- **Controllers**: Handle HTTP requests/responses
- **Services**: Business logic
- **Middleware**: Authentication & validation
- **Models**: Database schemas
- **Routes**: Endpoint definitions

### Error Handling
- Consistent error response format
- Proper HTTP status codes
- Detailed error messages in development

### Security
- JWT token validation
- Firebase authentication
- Role-based access control
- Environment variable configuration
- No hardcoded secrets

### Scalability
- Firestore for real-time database
- Firebase for authentication
- Cloud functions ready
- Stateless API design

---

## Next Steps

1. **Complete Setup**
   - [ ] Create Firebase project
   - [ ] Get Google OAuth credentials
   - [ ] Get Gemini API key
   - [ ] Fill `.env` file

2. **Test Backend**
   - [ ] Run `npm run dev`
   - [ ] Test health endpoint
   - [ ] Test Google login flow
   - [ ] Create test NGO & issue

3. **Build Frontend**
   - [ ] Set up React
   - [ ] Implement Google OAuth
   - [ ] Create UI for all workflows
   - [ ] Connect to backend

4. **Deployment**
   - [ ] Set production environment
   - [ ] Configure Firebase security rules
   - [ ] Deploy to cloud (Firebase Functions, Cloud Run)
   - [ ] Set up monitoring

---

## Common Issues & Solutions

### "Firebase credentials not found"
→ Check `.env` file has all required fields

### "Google OAuth fails"
→ Verify client ID and allowed origins in Google Cloud

### "AI matching is slow"
→ Normal first time (Gemini API cold start)
→ Check API quota limits

### "Port 5000 already in use"
```bash
PORT=5001 npm run dev
```

---

## Documentation Files

- **README.md** - Full API documentation
- **SETUP.md** - Step-by-step setup guide
- **API_TESTING.md** - Testing examples
- **ARCHITECTURE.md** - (Create for deep dives)

---

## Key Files to Understand

1. **src/index.js** - Server entry point
2. **src/config/firebase.js** - Firebase setup
3. **src/config/gemini.js** - AI setup
4. **src/middleware/auth.js** - Authentication
5. **src/services/volunteerMatchingService.js** - AI logic
6. **src/services/issueService.js** - Main workflow

---

## Support

- Refer to `README.md` for complete API documentation
- Check `API_TESTING.md` for request examples
- See `SETUP.md` for configuration details

---

## Success Checklist

- [ ] Backend installed and running
- [ ] `.env` configured with real credentials
- [ ] Health endpoint returns 200
- [ ] Firebase connected and working
- [ ] Google OAuth configured
- [ ] Gemini AI API key valid
- [ ] Can create NGO and post issues
- [ ] AI matching generates volunteer suggestions
- [ ] Activity feed shows public issues

**You're ready to build the frontend! 🚀**
