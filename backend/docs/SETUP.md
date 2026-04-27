# Setup Guide - Civic Bridge Backend

This guide will help you set up all the necessary services and credentials for running the Civic Bridge backend.

## 1. Firebase Setup

### Step 1: Create Firebase Project
1. Go to [Firebase Console](https://console.firebase.google.com/)
2. Click "Create Project"
3. Enter project name: "civic-bridge"
4. Accept terms and create

### Step 2: Enable Firestore Database
1. In Firebase Console, navigate to "Firestore Database"
2. Click "Create Database"
3. Choose "Start in test mode" (for development)
4. Select region (closest to your users)
5. Click "Enable"

### Step 3: Enable Authentication
1. In Firebase Console, go to "Authentication"
2. Click "Get Started"
3. Click "Google" under Sign-in methods
4. Enable Google Sign-in
5. Click "Save"

### Step 4: Generate Service Account Key
1. Go to "Project Settings" (gear icon)
2. Click "Service Accounts" tab
3. Click "Generate New Private Key"
4. Save the JSON file securely
5. Copy values for `.env`:
   - `FIREBASE_PROJECT_ID`: `projectId` field
   - `FIREBASE_PRIVATE_KEY`: `private_key` field (keep the \n characters)
   - `FIREBASE_CLIENT_EMAIL`: `client_email` field
   - `FIREBASE_DATABASE_URL`: `https://YOUR_PROJECT_ID.firebaseio.com`

### Step 5: Create Firestore Indexes
Create the following composite indexes in Firestore for optimal query performance:

**Index 1: users collection**
- Collection: `users`
- Fields: `ngoId (Ascending)`, `role (Ascending)`

**Index 2: users collection**
- Collection: `users`
- Fields: `ngoId (Ascending)`, `role (Ascending)`, `verificationStatus (Ascending)`

**Index 3: issues collection**
- Collection: `issues`
- Fields: `status (Ascending)`, `approvedAt (Descending)`

**Index 4: volunteer_matches collection**
- Collection: `volunteer_matches`
- Fields: `issueId (Ascending)`, `status (Ascending)`, `matchScore (Descending)`

To create indexes:
1. In Firestore, click on a query that requires the index
2. Firebase will suggest creating an index
3. Click the link to create it automatically

---

## 2. Google OAuth Setup

### Step 1: Create OAuth Credentials
1. Go to [Google Cloud Console](https://console.cloud.google.com/)
2. Make sure the Firebase project is selected
3. Navigate to "Credentials"
4. Click "Create Credentials" → "OAuth 2.0 Client ID"
5. Choose "Web application"
6. Configure:
   - **Name**: "Civic Bridge Web"
   - **Authorized JavaScript origins**:
     - `http://localhost:3000` (development)
     - `http://localhost:5000` (backend)
   - **Authorized redirect URIs**:
     - `http://localhost:3000/auth/callback` (frontend)

### Step 2: Copy Credentials
1. Copy the generated credentials
2. Add to `.env`:
   - `GOOGLE_CLIENT_ID`: Client ID
   - `GOOGLE_CLIENT_SECRET`: Client Secret

### Step 3: Frontend Integration
In your frontend code, install Google Auth library:
```bash
npm install @react-oauth/google
```

Use in React:
```jsx
import { GoogleLogin } from '@react-oauth/google';

<GoogleLogin
  onSuccess={(credentialResponse) => {
    // Send credentialResponse.credential to backend
    fetch('http://localhost:5000/api/auth/google', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${credentialResponse.credential}`,
      },
    });
  }}
  onError={() => console.log('Login Failed')}
/>
```

---

## 3. Google Gemini AI Setup

### Step 1: Enable Gemini API
1. Go to [Google Cloud Console](https://console.cloud.google.com/)
2. Navigate to "APIs & Services"
3. Search for "Generative Language API"
4. Click and enable it

### Step 2: Create API Key
1. Go to "Credentials"
2. Click "Create Credentials" → "API Key"
3. Copy the API key
4. Add to `.env`:
   - `GEMINI_API_KEY`: Your API key

### Step 3: Test Gemini Integration
```bash
curl -X POST "https://generativelanguage.googleapis.com/v1beta/models/gemini-pro:generateContent?key=YOUR_API_KEY" \
  -H "Content-Type: application/json" \
  -d '{"contents": [{"parts": [{"text": "Hello"}]}]}'
```

---

## 4. Environment Setup

### Copy Example Configuration
```bash
cp .env.example .env
```

### Fill in All Variables
Edit `.env` with your credentials:

```env
# Firebase Configuration
FIREBASE_PROJECT_ID=your_project_id
FIREBASE_PRIVATE_KEY="-----BEGIN PRIVATE KEY-----\nMIIEvQIBADANB...\n-----END PRIVATE KEY-----\n"
FIREBASE_CLIENT_EMAIL=firebase-adminsdk-xxxxx@your-project.iam.gserviceaccount.com
FIREBASE_DATABASE_URL=https://your-project.firebaseio.com

# Google OAuth Configuration
GOOGLE_CLIENT_ID=123456789-abc123.apps.googleusercontent.com
GOOGLE_CLIENT_SECRET=GOCSPX-abc123xyz

# Gemini AI Configuration
GEMINI_API_KEY=AIzaSyD...

# Server Configuration
PORT=5000
NODE_ENV=development

# JWT Configuration
JWT_SECRET=super_secret_key_change_in_production
JWT_EXPIRY=7d

# CORS Configuration
CORS_ORIGIN=http://localhost:3000
```

---

## 5. Install Dependencies

```bash
cd backend
npm install
```

---

## 6. Start Development Server

```bash
npm run dev
```

Server will start at `http://localhost:5000`

---

## 7. Verify Setup

### Test Health Endpoint
```bash
curl http://localhost:5000/api/health
```

Expected response:
```json
{
  "success": true,
  "message": "Server is running",
  "timestamp": "2024-01-15T10:30:00Z"
}
```

---

## 8. Frontend Integration

Update your frontend configuration to point to the backend:

**Frontend .env**
```env
REACT_APP_API_URL=http://localhost:5000/api
REACT_APP_GOOGLE_CLIENT_ID=your_google_client_id
```

---

## Troubleshooting

### Firebase Connection Error
**Error**: `Cannot find service account credentials`

**Solution**:
- Verify `FIREBASE_PRIVATE_KEY` includes literal `\n` characters
- Check that all Firebase environment variables are set
- Ensure service account has Firestore and Auth permissions

### Google Auth Error
**Error**: `Invalid client ID`

**Solution**:
- Verify `GOOGLE_CLIENT_ID` is correctly copied
- Check that origin is added to authorized JavaScript origins
- Make sure JWT_SECRET is different from Google Client Secret

### Gemini API Error
**Error**: `API Key not valid`

**Solution**:
- Verify API key is correctly copied
- Ensure Generative Language API is enabled
- Check API key has proper permissions

### Port Already in Use
**Error**: `EADDRINUSE: address already in use :::5000`

**Solution**:
```bash
# Kill process using port 5000
lsof -i :5000
kill -9 <PID>

# Or use different port
PORT=5001 npm run dev
```

---

## Security Checklist

Before production deployment:

- [ ] Change `JWT_SECRET` to a strong random string
- [ ] Set `NODE_ENV=production`
- [ ] Update `CORS_ORIGIN` to actual frontend domain
- [ ] Enable Firebase Security Rules for Firestore
- [ ] Restrict API keys in Google Cloud Console
- [ ] Use environment-specific credentials
- [ ] Enable HTTPS
- [ ] Set up rate limiting
- [ ] Implement request logging
- [ ] Regular security audits

---

## Firebase Security Rules

Example rules for production (in Firebase Console):

```javascript
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    // Allow authenticated users to read their own data
    match /users/{userId} {
      allow read, write: if request.auth.uid == userId;
      allow read: if request.auth != null && request.auth.uid != null;
    }
    
    // Allow reading public activities
    match /activities/{activityId} {
      allow read: if resource.data.isPublic == true || request.auth != null;
    }
    
    // Allow approved issues to be read by anyone
    match /issues/{issueId} {
      allow read: if resource.data.status == 'approved' || request.auth != null;
      allow create: if request.auth != null;
    }
    
    // Volunteers can only read suggested matches for themselves
    match /volunteer_matches/{matchId} {
      allow read, write: if resource.data.volunteerId == request.auth.uid;
    }
  }
}
```

---

## Next Steps

1. Set up Frontend: `../README.md`
2. Configure payment integration (if needed)
3. Set up email notifications
4. Configure image storage (Firebase Storage)
5. Implement analytics
6. Set up monitoring and logging

---

## Support

For detailed setup instructions:
- [Firebase Documentation](https://firebase.google.com/docs)
- [Google Cloud Documentation](https://cloud.google.com/docs)
- [Gemini API Documentation](https://ai.google.dev)
