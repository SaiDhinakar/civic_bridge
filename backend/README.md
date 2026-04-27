# Civic Bridge Backend - Smart Resource Allocation

A powerful system for gathering community information and smart volunteer coordination using AI-driven matching.

## Project Structure

```
backend/
├── src/
│   ├── config/          # Configuration files
│   │   ├── firebase.js  # Firebase Admin SDK setup
│   │   └── gemini.js    # Gemini AI configuration
│   ├── controllers/     # Route controllers
│   ├── routes/          # API routes
│   ├── services/        # Business logic
│   ├── middleware/      # Express middleware
│   ├── models/          # Database schemas
│   ├── utils/           # Utility functions
│   └── index.js         # Server entry point
├── package.json
└── .env.example
```

## Setup Instructions

### 1. Prerequisites
- Node.js (v14+)
- Firebase Project with Firestore enabled
- Google OAuth credentials
- Gemini API key

### 2. Installation

```bash
cd backend
npm install
```

### 3. Environment Configuration

Create a `.env` file based on `.env.example`:

```bash
cp .env.example .env
```

Fill in the environment variables:

```env
# Firebase Configuration
FIREBASE_PROJECT_ID=your_project_id
FIREBASE_PRIVATE_KEY="-----BEGIN PRIVATE KEY-----\n...\n-----END PRIVATE KEY-----\n"
FIREBASE_CLIENT_EMAIL=firebase-adminsdk-xxxxx@your-project.iam.gserviceaccount.com
FIREBASE_DATABASE_URL=https://your-project.firebaseio.com

# Google OAuth
GOOGLE_CLIENT_ID=your_client_id.apps.googleusercontent.com
GOOGLE_CLIENT_SECRET=your_client_secret

# Gemini AI
GEMINI_API_KEY=your_gemini_api_key

# Server
PORT=5000
NODE_ENV=development

# JWT
JWT_SECRET=your_super_secret_jwt_key
JWT_EXPIRY=7d

# CORS
CORS_ORIGIN=http://localhost:3000
```

### 4. Running the Server

**Development (with hot reload):**
```bash
npm run dev
```

**Production:**
```bash
npm start
```

Server will start at `http://localhost:5000`

## API Documentation

### Authentication

#### POST `/api/auth/google`
Google OAuth authentication. Send the Google ID token from the frontend.

**Request Body:**
```json
{
  "idToken": "google_id_token"
}
```

**Response:**
```json
{
  "success": true,
  "message": "Authentication successful",
  "user": {
    "uid": "user_id",
    "email": "user@example.com",
    "displayName": "John Doe",
    "role": "citizen",
    "profilePicture": "image_url"
  },
  "token": "jwt_token"
}
```

#### GET `/api/auth/verify`
Verify JWT token validity.

**Headers:**
```
Authorization: Bearer jwt_token
```

---

### User Management

#### GET `/api/users/profile`
Get current user's profile.

**Headers:**
```
Authorization: Bearer jwt_token
```

**Response:**
```json
{
  "success": true,
  "data": {
    "uid": "user_id",
    "email": "user@example.com",
    "displayName": "John Doe",
    "role": "citizen",
    "verificationStatus": "pending",
    "skills": ["water management", "surveying"],
    "location": {
      "latitude": 28.6139,
      "longitude": 77.2090,
      "address": "Delhi, India"
    }
  }
}
```

#### PUT `/api/users/profile`
Update user profile.

**Headers:**
```
Authorization: Bearer jwt_token
```

**Request Body:**
```json
{
  "displayName": "John Doe",
  "phoneNumber": "+91-9999999999",
  "skills": ["water management", "surveying"],
  "location": {
    "latitude": 28.6139,
    "longitude": 77.2090,
    "address": "Delhi, India"
  }
}
```

#### POST `/api/users/request-join-ngo`
Request to join an NGO as a volunteer.

**Headers:**
```
Authorization: Bearer jwt_token
```

**Request Body:**
```json
{
  "ngoId": "ngo_document_id"
}
```

#### POST `/api/users/verify-volunteer` (NGO Admin Only)
Verify a volunteer.

**Headers:**
```
Authorization: Bearer jwt_token
```

**Request Body:**
```json
{
  "volunteerId": "volunteer_user_id"
}
```

#### GET `/api/users/ngo/:ngoId/volunteers`
Get all volunteers of an NGO.

**Headers:**
```
Authorization: Bearer jwt_token
```

---

### NGO Management

#### POST `/api/ngos`
Create a new NGO.

**Headers:**
```
Authorization: Bearer jwt_token
```

**Request Body:**
```json
{
  "name": "Water India Foundation",
  "description": "Working to provide clean water to villages",
  "registrationNumber": "REG123456",
  "contactEmail": "contact@waterindia.org",
  "phoneNumber": "+91-9999999999",
  "website": "https://waterindia.org",
  "logoUrl": "https://example.com/logo.png",
  "location": {
    "latitude": 28.6139,
    "longitude": 77.2090,
    "address": "Delhi, India"
  }
}
```

#### GET `/api/ngos/:ngoId`
Get NGO details with members.

**Headers:**
```
Authorization: Bearer jwt_token
```

#### PUT `/api/ngos/:ngoId` (NGO Admin Only)
Update NGO profile.

**Headers:**
```
Authorization: Bearer jwt_token
```

#### POST `/api/ngos/add-volunteer` (NGO Admin Only)
Add a volunteer to the NGO.

**Headers:**
```
Authorization: Bearer jwt_token
```

**Request Body:**
```json
{
  "ngoId": "ngo_id",
  "volunteerId": "volunteer_user_id"
}
```

#### GET `/api/ngos/:ngoId/pending-volunteers` (NGO Admin Only)
Get pending volunteers awaiting verification.

**Headers:**
```
Authorization: Bearer jwt_token
```

#### GET `/api/ngos/:ngoId/stats` (NGO Admin Only)
Get NGO statistics.

**Response:**
```json
{
  "success": true,
  "data": {
    "totalIssuesPosted": 15,
    "totalVolunteers": 25,
    "verifiedVolunteers": 18,
    "completedTasks": 12,
    "ongoingTasks": 8
  }
}
```

---

### Issue Management

#### POST `/api/issues`
Post a new issue.

**Headers:**
```
Authorization: Bearer jwt_token
```

**Request Body:**
```json
{
  "title": "Water scarcity in Village X",
  "description": "Villagers lack access to clean drinking water",
  "category": "water",
  "priority": "high",
  "requiredSkills": ["surveying", "water management"],
  "location": {
    "latitude": 28.6139,
    "longitude": 77.2090,
    "address": "Village X, State"
  },
  "attachments": ["image_url1", "image_url2"]
}
```

#### GET `/api/issues/activity-feed`
Get public activity feed (approved and ongoing issues).

**Query Parameters:**
- `limit` (default: 20)
- `offset` (default: 0)

**Response:**
```json
{
  "success": true,
  "data": [
    {
      "id": "issue_id",
      "title": "Water scarcity in Village X",
      "description": "...",
      "category": "water",
      "status": "approved",
      "priority": "high",
      "poster": { /* user details */ },
      "ngo": { /* ngo details */ },
      "approvedAt": "2024-01-15T10:30:00Z"
    }
  ]
}
```

#### GET `/api/issues/:issueId`
Get issue details.

#### POST `/api/issues/:issueId/verify` (Volunteer Only)
Verify an issue.

**Headers:**
```
Authorization: Bearer jwt_token
```

**Request Body:**
```json
{
  "verificationNotes": "Issue is verified on ground. Water quality tested poor."
}
```

#### POST `/api/issues/:issueId/approve` (NGO Admin Only)
Approve issue and trigger AI volunteer matching.

**Headers:**
```
Authorization: Bearer jwt_token
```

**Response:**
```json
{
  "success": true,
  "data": {
    "message": "Issue approved and volunteers matched",
    "matchesCount": 5,
    "matches": [
      {
        "volunteerId": "vol_id",
        "matchScore": 92,
        "matchReason": "Expert in water management with field experience"
      }
    ]
  }
}
```

#### GET `/api/issues/ngo/:ngoId`
Get all issues posted by an NGO.

**Headers:**
```
Authorization: Bearer jwt_token
```

---

### Volunteer Matching

#### GET `/api/matches/:issueId`
Get AI-suggested matches for an issue.

**Headers:**
```
Authorization: Bearer jwt_token
```

**Response:**
```json
{
  "success": true,
  "data": [
    {
      "id": "match_id",
      "volunteerId": "vol_id",
      "matchScore": 92,
      "matchReason": "Expert in water management with field experience",
      "status": "suggested"
    }
  ]
}
```

#### POST `/api/matches/:matchId/respond` (Volunteer Only)
Accept or reject a volunteer match.

**Headers:**
```
Authorization: Bearer jwt_token
```

**Request Body:**
```json
{
  "response": "accept"  // or "reject"
}
```

---

## User Roles & Permissions

### NGO Admin
- Create and manage NGO
- Post issues
- Approve issues and trigger AI matching
- Manage volunteers
- Verify volunteers
- View NGO statistics

### Volunteer
- Join NGO
- Verify issues posted in community
- View suggested matches
- Accept or reject task assignments
- View activity feed

### Citizen
- Post issues
- View activity feed (approved issues only)

---

## Firestore Collections

### users
```
{
  uid: string
  email: string
  displayName: string
  role: "ngo_admin" | "volunteer" | "citizen"
  ngoId: string (optional)
  verificationStatus: "pending" | "verified" | "rejected"
  skills: string[]
  location: { latitude, longitude, address }
  createdAt: timestamp
  updatedAt: timestamp
}
```

### ngos
```
{
  name: string
  description: string
  adminId: string
  members: string[]
  contactEmail: string
  phoneNumber: string
  website: string
  location: { latitude, longitude, address }
  createdAt: timestamp
  updatedAt: timestamp
}
```

### issues
```
{
  title: string
  description: string
  category: string
  postedBy: string
  ngoId: string (optional)
  status: "posted" | "verified" | "approved" | "in_progress" | "completed"
  priority: "low" | "medium" | "high"
  location: { latitude, longitude, address }
  requiredSkills: string[]
  attachments: string[]
  verifiedBy: string (optional)
  verifiedAt: timestamp (optional)
  approvedBy: string (optional)
  approvedAt: timestamp (optional)
  createdAt: timestamp
  updatedAt: timestamp
}
```

### volunteer_matches
```
{
  issueId: string
  volunteerId: string
  matchScore: number (0-100)
  matchReason: string
  status: "suggested" | "accepted" | "rejected" | "completed"
  suggestedAt: timestamp
  respondedAt: timestamp (optional)
}
```

### activities
```
{
  type: string
  description: string
  actorId: string
  relatedDocId: string
  relatedDocType: string
  ngoId: string (optional)
  isPublic: boolean
  createdAt: timestamp
}
```

---

## Gemini AI Integration

The system uses Gemini AI to intelligently match volunteers with issues based on:
- Skill alignment
- Location proximity
- Verification status
- Experience level
- Previous task completion

Matching can be configured via environment variables:
- `MATCHING_THRESHOLD`: Minimum match score (0-1)
- `MAX_VOLUNTEERS_PER_ISSUE`: Maximum number of suggestions
- `AI_MODEL_VERSION`: Gemini model to use

---

## Error Handling

All endpoints return consistent error responses:

```json
{
  "success": false,
  "message": "Error description",
  "error": "Detailed error message"
}
```

Common HTTP Status Codes:
- `200` - Success
- `201` - Created
- `400` - Bad Request
- `401` - Unauthorized
- `403` - Forbidden
- `404` - Not Found
- `500` - Server Error

---

## Development & Debugging

### Enabling Debug Logs
Set `NODE_ENV=development` in `.env`

### Testing the API
Use tools like Postman or cURL:

```bash
# Test health check
curl http://localhost:5000/api/health

# Test authentication
curl -X POST http://localhost:5000/api/auth/google \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer google_id_token"
```

---

## Deployment

### Docker (Recommended)
```dockerfile
FROM node:18-alpine
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
EXPOSE 5000
CMD ["npm", "start"]
```

### Environment Setup for Production
- Use strong `JWT_SECRET`
- Set `NODE_ENV=production`
- Configure proper CORS origins
- Use Firebase security rules
- Enable HTTPS

---

## Contributing

When adding new features:
1. Create service file in `src/services/`
2. Create controller in `src/controllers/`
3. Create routes in `src/routes/`
4. Update Firestore schema in `src/models/schemas.js`
5. Add API documentation

---

## License

MIT

---

## Support

For issues or questions, please open an issue in the repository.
