# API Testing Guide - Civic Bridge

Complete examples for testing all API endpoints using curl or Postman.

## Environment Setup for Testing

Set these variables for easier testing:

```bash
# Backend URL
export API_URL="http://localhost:5000/api"

# JWT Token (obtained after login)
export JWT_TOKEN="your_jwt_token_here"

# Sample IDs (replace with actual IDs)
export NGO_ID="ngo_document_id"
export ISSUE_ID="issue_document_id"
export USER_ID="user_id"
```

---

## Authentication Endpoints

### 1. Google Login
**Endpoint**: `POST /api/auth/google`

```bash
curl -X POST "$API_URL/auth/google" \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer google_id_token" \
  -d '{}'
```

**Response**:
```json
{
  "success": true,
  "message": "Authentication successful",
  "user": {
    "uid": "user123",
    "email": "user@example.com",
    "displayName": "John Doe",
    "role": "citizen",
    "profilePicture": "https://..."
  },
  "token": "eyJhbGciOiJIUzI1NiIs..."
}
```

Save the `token` for subsequent requests.

### 2. Verify Token
**Endpoint**: `GET /api/auth/verify`

```bash
curl -X GET "$API_URL/auth/verify" \
  -H "Authorization: Bearer $JWT_TOKEN"
```

**Response**:
```json
{
  "success": true,
  "message": "Token is valid",
  "user": {
    "uid": "user123",
    "email": "user@example.com",
    "role": "citizen",
    "displayName": "John Doe"
  }
}
```

---

## User Management Endpoints

### 1. Get User Profile
**Endpoint**: `GET /api/users/profile`

```bash
curl -X GET "$API_URL/users/profile" \
  -H "Authorization: Bearer $JWT_TOKEN"
```

### 2. Update User Profile
**Endpoint**: `PUT /api/users/profile`

```bash
curl -X PUT "$API_URL/users/profile" \
  -H "Authorization: Bearer $JWT_TOKEN" \
  -H "Content-Type: application/json" \
  -d '{
    "displayName": "John Doe",
    "phoneNumber": "+91-9999999999",
    "skills": ["water management", "surveying"],
    "location": {
      "latitude": 28.6139,
      "longitude": 77.2090,
      "address": "Delhi, India"
    }
  }'
```

### 3. Request to Join NGO
**Endpoint**: `POST /api/users/request-join-ngo`

```bash
curl -X POST "$API_URL/users/request-join-ngo" \
  -H "Authorization: Bearer $JWT_TOKEN" \
  -H "Content-Type: application/json" \
  -d '{
    "ngoId": "'$NGO_ID'"
  }'
```

### 4. Verify Volunteer (NGO Admin Only)
**Endpoint**: `POST /api/users/verify-volunteer`

```bash
curl -X POST "$API_URL/users/verify-volunteer" \
  -H "Authorization: Bearer $JWT_TOKEN" \
  -H "Content-Type: application/json" \
  -d '{
    "volunteerId": "volunteer_user_id"
  }'
```

### 5. Get NGO Volunteers
**Endpoint**: `GET /api/users/ngo/:ngoId/volunteers`

```bash
curl -X GET "$API_URL/users/ngo/$NGO_ID/volunteers" \
  -H "Authorization: Bearer $JWT_TOKEN"
```

---

## NGO Management Endpoints

### 1. Create NGO
**Endpoint**: `POST /api/ngos`

```bash
curl -X POST "$API_URL/ngos" \
  -H "Authorization: Bearer $JWT_TOKEN" \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Water India Foundation",
    "description": "Working to provide clean water to villages across India",
    "registrationNumber": "REG123456789",
    "contactEmail": "contact@waterindia.org",
    "phoneNumber": "+91-1234567890",
    "website": "https://waterindia.org",
    "logoUrl": "https://example.com/logo.png",
    "location": {
      "latitude": 28.6139,
      "longitude": 77.2090,
      "address": "Delhi, India"
    }
  }'
```

### 2. Get NGO Details
**Endpoint**: `GET /api/ngos/:ngoId`

```bash
curl -X GET "$API_URL/ngos/$NGO_ID" \
  -H "Authorization: Bearer $JWT_TOKEN"
```

### 3. Update NGO Profile
**Endpoint**: `PUT /api/ngos/:ngoId`

```bash
curl -X PUT "$API_URL/ngos/$NGO_ID" \
  -H "Authorization: Bearer $JWT_TOKEN" \
  -H "Content-Type: application/json" \
  -d '{
    "description": "Updated description",
    "contactEmail": "newemail@waterindia.org",
    "phoneNumber": "+91-9876543210"
  }'
```

### 4. Add Volunteer to NGO
**Endpoint**: `POST /api/ngos/add-volunteer`

```bash
curl -X POST "$API_URL/ngos/add-volunteer" \
  -H "Authorization: Bearer $JWT_TOKEN" \
  -H "Content-Type: application/json" \
  -d '{
    "ngoId": "'$NGO_ID'",
    "volunteerId": "volunteer_user_id"
  }'
```

### 5. Get Pending Volunteers
**Endpoint**: `GET /api/ngos/:ngoId/pending-volunteers`

```bash
curl -X GET "$API_URL/ngos/$NGO_ID/pending-volunteers" \
  -H "Authorization: Bearer $JWT_TOKEN"
```

### 6. Get NGO Statistics
**Endpoint**: `GET /api/ngos/:ngoId/stats`

```bash
curl -X GET "$API_URL/ngos/$NGO_ID/stats" \
  -H "Authorization: Bearer $JWT_TOKEN"
```

---

## Issue Management Endpoints

### 1. Post Issue
**Endpoint**: `POST /api/issues`

```bash
curl -X POST "$API_URL/issues" \
  -H "Authorization: Bearer $JWT_TOKEN" \
  -H "Content-Type: application/json" \
  -d '{
    "title": "Water Scarcity in Village X",
    "description": "The villagers lack access to clean drinking water. Wells have dried up due to drought.",
    "category": "water",
    "priority": "high",
    "requiredSkills": ["water management", "surveying"],
    "location": {
      "latitude": 27.1234,
      "longitude": 77.5678,
      "address": "Village X, State"
    },
    "attachments": [
      "https://example.com/image1.jpg",
      "https://example.com/image2.jpg"
    ]
  }'
```

### 2. Get Activity Feed
**Endpoint**: `GET /api/issues/activity-feed`

```bash
# Get first 20 items
curl -X GET "$API_URL/issues/activity-feed?limit=20&offset=0" \
  -H "Authorization: Bearer $JWT_TOKEN"

# Pagination example
curl -X GET "$API_URL/issues/activity-feed?limit=10&offset=20"
```

### 3. Get Issue Details
**Endpoint**: `GET /api/issues/:issueId`

```bash
curl -X GET "$API_URL/issues/$ISSUE_ID" \
  -H "Authorization: Bearer $JWT_TOKEN"
```

### 4. Verify Issue (Volunteer Only)
**Endpoint**: `POST /api/issues/:issueId/verify`

```bash
curl -X POST "$API_URL/issues/$ISSUE_ID/verify" \
  -H "Authorization: Bearer $JWT_TOKEN" \
  -H "Content-Type: application/json" \
  -d '{
    "verificationNotes": "Issue verified on ground visit. Water quality tested poor. pH level 6.2, turbidity high."
  }'
```

### 5. Approve Issue with AI Matching (NGO Admin Only)
**Endpoint**: `POST /api/issues/:issueId/approve`

```bash
curl -X POST "$API_URL/issues/$ISSUE_ID/approve" \
  -H "Authorization: Bearer $JWT_TOKEN" \
  -H "Content-Type: application/json" \
  -d '{}'
```

### 6. Get NGO Issues
**Endpoint**: `GET /api/issues/ngo/:ngoId`

```bash
curl -X GET "$API_URL/issues/ngo/$NGO_ID" \
  -H "Authorization: Bearer $JWT_TOKEN"
```

---

## Volunteer Matching Endpoints

### 1. Get Matches for Issue
**Endpoint**: `GET /api/matches/:issueId`

```bash
curl -X GET "$API_URL/matches/$ISSUE_ID" \
  -H "Authorization: Bearer $JWT_TOKEN"
```

**Response**:
```json
{
  "success": true,
  "data": [
    {
      "id": "match_id_1",
      "volunteerId": "volunteer_id_1",
      "matchScore": 92,
      "matchReason": "Expert in water management with 5+ years field experience in rural areas",
      "status": "suggested",
      "suggestedAt": "2024-01-15T10:30:00Z"
    },
    {
      "id": "match_id_2",
      "volunteerId": "volunteer_id_2",
      "matchScore": 87,
      "matchReason": "Strong surveying skills and located within 15km of the issue",
      "status": "suggested",
      "suggestedAt": "2024-01-15T10:30:00Z"
    }
  ]
}
```

### 2. Accept/Reject Match (Volunteer Only)
**Endpoint**: `POST /api/matches/:matchId/respond`

Accept:
```bash
curl -X POST "$API_URL/matches/match_id_1/respond" \
  -H "Authorization: Bearer $JWT_TOKEN" \
  -H "Content-Type: application/json" \
  -d '{
    "response": "accept"
  }'
```

Reject:
```bash
curl -X POST "$API_URL/matches/match_id_1/respond" \
  -H "Authorization: Bearer $JWT_TOKEN" \
  -H "Content-Type: application/json" \
  -d '{
    "response": "reject"
  }'
```

---

## Complete Workflow Example

### Scenario: Citizen Reports Issue, Volunteer Matches, NGO Manages

**Step 1: Citizen Posts Issue**
```bash
# Citizen (citizen role) posts a water issue
CITIZEN_TOKEN="citizen_jwt_token"

curl -X POST "$API_URL/issues" \
  -H "Authorization: Bearer $CITIZEN_TOKEN" \
  -H "Content-Type: application/json" \
  -d '{
    "title": "No Clean Water Supply",
    "description": "Taps have been dry for 3 days",
    "category": "water",
    "priority": "high",
    "location": {
      "latitude": 28.61,
      "longitude": 77.20,
      "address": "Sector 5, Delhi"
    }
  }'

# Save ISSUE_ID from response
```

**Step 2: Volunteer Verifies Issue**
```bash
# Volunteer visits site and verifies
VOLUNTEER_TOKEN="volunteer_jwt_token"

curl -X POST "$API_URL/issues/$ISSUE_ID/verify" \
  -H "Authorization: Bearer $VOLUNTEER_TOKEN" \
  -H "Content-Type: application/json" \
  -d '{
    "verificationNotes": "Confirmed - no water from community taps. Main pipeline damaged."
  }'
```

**Step 3: NGO Admin Approves & Triggers AI Matching**
```bash
# NGO Admin approves the verified issue
ADMIN_TOKEN="admin_jwt_token"

curl -X POST "$API_URL/issues/$ISSUE_ID/approve" \
  -H "Authorization: Bearer $ADMIN_TOKEN"

# Response includes AI-matched volunteers
```

**Step 4: Volunteer Responds to Match**
```bash
# Volunteer accepts the match
curl -X POST "$API_URL/matches/match_id/respond" \
  -H "Authorization: Bearer $VOLUNTEER_TOKEN" \
  -H "Content-Type: application/json" \
  -d '{
    "response": "accept"
  }'
```

**Step 5: Check Activity Feed**
```bash
# Anyone can see the approved issue in activity feed
curl -X GET "$API_URL/issues/activity-feed" \
  -H "Authorization: Bearer $VOLUNTEER_TOKEN"
```

---

## Postman Collection

Import this into Postman for easier testing:

```json
{
  "info": {
    "name": "Civic Bridge API",
    "description": "API collection for testing",
    "version": "1.0"
  },
  "variable": [
    {
      "key": "base_url",
      "value": "http://localhost:5000/api",
      "type": "string"
    },
    {
      "key": "token",
      "value": "your_jwt_token",
      "type": "string"
    }
  ]
}
```

---

## Error Scenarios

### Unauthorized Error
```bash
curl -X GET "$API_URL/users/profile"
# Missing Authorization header
```

Response:
```json
{
  "success": false,
  "message": "No authorization token provided"
}
```

### Permission Denied
```bash
# Citizen trying to approve issue (admin only)
curl -X POST "$API_URL/issues/$ISSUE_ID/approve" \
  -H "Authorization: Bearer $CITIZEN_TOKEN"
```

Response:
```json
{
  "success": false,
  "message": "Access denied. Insufficient permissions."
}
```

### Invalid Data
```bash
curl -X POST "$API_URL/issues" \
  -H "Authorization: Bearer $JWT_TOKEN" \
  -H "Content-Type: application/json" \
  -d '{
    "title": "Issue without required fields"
  }'
```

Response:
```json
{
  "errors": [
    {
      "value": "",
      "msg": "Invalid value",
      "param": "description",
      "location": "body"
    }
  ]
}
```

---

## Performance Testing

### Load Test with Apache Bench
```bash
# Test 100 requests with 10 concurrent
ab -n 100 -c 10 -H "Authorization: Bearer $JWT_TOKEN" \
  http://localhost:5000/api/issues/activity-feed
```

### Monitor Request Logs
```bash
# Monitor in separate terminal
tail -f logs/requests.log
```

---

## Common Issues

### CORS Error
**Error**: `Access to XMLHttpRequest has been blocked by CORS policy`

**Solution**:
- Check `CORS_ORIGIN` in `.env` matches frontend URL
- Restart backend server

### Firebase Auth Error
**Error**: `PERMISSION_DENIED: Permission denied on resource`

**Solution**:
- Check Firestore security rules
- Verify user is authenticated
- Check rules in Firebase Console

### Timeout Error
**Error**: `Request timeout`

**Solution**:
- Increase timeout in Postman/curl
- Check if AI matching is taking too long
- Verify Gemini API key is valid

---

## Tips

1. **Save tokens**: Store JWT token in Postman environment variable
2. **Use Collections**: Organize endpoints in Postman collections
3. **Test with IDs**: Always save IDs from successful responses
4. **Check timestamps**: Verify createdAt/updatedAt fields are timestamps
5. **Pagination**: Always use limit/offset for large datasets

---

## Next Steps

- [ ] Test all endpoints in order
- [ ] Create Postman collection
- [ ] Document custom workflows
- [ ] Set up automated tests
- [ ] Create integration test suite
