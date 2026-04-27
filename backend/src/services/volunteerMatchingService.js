const { model } = require('../config/gemini');
const { volunteerMatchesCollection } = require('../models/schemas');
const dotenv = require('dotenv');

dotenv.config();

/**
 * Generate volunteer matches for an issue using Gemini AI
 */
const generateVolunteerMatches = async (issue, volunteers) => {
  try {
    // Prepare issue and volunteer data for AI analysis
    const issueContext = `
Issue Title: ${issue.title}
Description: ${issue.description}
Category: ${issue.category}
Priority: ${issue.priority}
Required Skills: ${issue.requiredSkills?.join(', ') || 'None'}
Location: ${issue.location?.address}
    `;

    const volunteersContext = volunteers
      .map(
        (v, idx) => `
Volunteer ${idx + 1}:
- Name: ${v.displayName}
- Skills: ${v.skills?.join(', ') || 'None'}
- Location: ${v.location?.address}
- Verified: ${v.verificationStatus === 'verified'}
- Experience Score: ${v.experienceScore || 0}
      `
      )
      .join('\n');

    const prompt = `
You are an intelligent volunteer matching system for civic engagement. Analyze the following issue and volunteer profiles to recommend the best matches.

${issueContext}

Available Volunteers:
${volunteersContext}

Task: Provide a JSON array of volunteer matches with the following format:
[
  {
    "volunteerId": "string",
    "matchScore": 0-100,
    "matchReason": "string explaining why this volunteer is a good match",
    "priority": 1-5
  }
]

Consider the following factors:
1. Skill alignment (highest priority)
2. Location proximity
3. Volunteer verification status
4. Experience level
5. Previous similar task completion

Return ONLY the JSON array, no additional text.
    `;

    const result = await model.generateContent(prompt);
    const response = await result.response;
    const matchesText = response.text();

    // Parse JSON response
    let matches = JSON.parse(matchesText);

    // Filter matches by threshold
    const threshold = parseFloat(process.env.MATCHING_THRESHOLD) || 0.7;
    matches = matches.filter((m) => m.matchScore / 100 >= threshold);

    // Sort by match score
    matches.sort((a, b) => b.matchScore - a.matchScore);

    // Limit to max volunteers
    const maxVolunteers = parseInt(process.env.MAX_VOLUNTEERS_PER_ISSUE) || 5;
    return matches.slice(0, maxVolunteers);
  } catch (error) {
    console.error('Error generating volunteer matches:', error);
    throw error;
  }
};

/**
 * Save volunteer matches to Firestore
 */
const saveVolunteerMatches = async (issueId, matches) => {
  try {
    const batch = require('../config/firebase').db.batch();

    matches.forEach((match) => {
      const matchRef = volunteerMatchesCollection.doc();
      batch.set(matchRef, {
        issueId,
        volunteerId: match.volunteerId,
        matchScore: match.matchScore,
        matchReason: match.matchReason,
        status: 'suggested',
        suggestedAt: new Date(),
      });
    });

    await batch.commit();
    return true;
  } catch (error) {
    console.error('Error saving volunteer matches:', error);
    throw error;
  }
};

/**
 * Get AI-suggested matches for an issue
 */
const getMatchesForIssue = async (issueId) => {
  try {
    const snapshot = await volunteerMatchesCollection
      .where('issueId', '==', issueId)
      .where('status', 'in', ['suggested', 'accepted'])
      .orderBy('matchScore', 'desc')
      .get();

    return snapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));
  } catch (error) {
    console.error('Error fetching matches:', error);
    throw error;
  }
};

/**
 * Process volunteer response to match (accept/reject)
 */
const processMatchResponse = async (matchId, response, volunteerId) => {
  try {
    const match = await volunteerMatchesCollection.doc(matchId).get();

    if (!match.exists) {
      throw new Error('Match not found');
    }

    if (match.data().volunteerId !== volunteerId) {
      throw new Error('Unauthorized');
    }

    await volunteerMatchesCollection.doc(matchId).update({
      status: response === 'accept' ? 'accepted' : 'rejected',
      respondedAt: new Date(),
    });

    return true;
  } catch (error) {
    console.error('Error processing match response:', error);
    throw error;
  }
};

module.exports = {
  generateVolunteerMatches,
  saveVolunteerMatches,
  getMatchesForIssue,
  processMatchResponse,
};
