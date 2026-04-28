/**
 * AI Volunteer Matching Utility
 * Matches volunteers based on:
 * 1. Last location (distance)
 * 2. Availability
 * 3. Skills
 * 4. History of completions
 */

/**
 * Calculate distance between two coordinates using Haversine formula
 * @param {number} lat1 - First latitude
 * @param {number} lon1 - First longitude
 * @param {number} lat2 - Second latitude
 * @param {number} lon2 - Second longitude
 * @returns {number} Distance in kilometers
 */
export const calculateDistance = (lat1, lon1, lat2, lon2) => {
  const R = 6371; // Radius of the Earth in kilometers
  const dLat = (lat2 - lat1) * (Math.PI / 180);
  const dLon = (lon2 - lon1) * (Math.PI / 180);
  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos(lat1 * (Math.PI / 180)) *
      Math.cos(lat2 * (Math.PI / 180)) *
      Math.sin(dLon / 2) *
      Math.sin(dLon / 2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  return R * c;
};

/**
 * Check if volunteer is available for the task
 * @param {Object} volunteer - Volunteer object
 * @param {Object} task - Task object
 * @returns {boolean} Is available
 */
export const isVolunteerAvailable = (volunteer, task) => {
  if (!volunteer.availability) return true;

  const now = new Date();
  const taskDate = new Date(task.dueDate);

  // Check if task date is within available hours
  if (volunteer.availability.hoursPerWeek) {
    // Simple check: available if they have hours left
    return volunteer.availability.hoursPerWeek > 0;
  }

  return true;
};

/**
 * Calculate match score between volunteer and task
 * @param {Object} volunteer - Volunteer object
 * @param {Object} task - Task object
 * @returns {Object} Match score and reasons
 */
export const calculateMatchScore = (volunteer, task) => {
  let score = 0;
  const reasons = [];

  // Location-based scoring (40% weight)
  if (volunteer.location && task.location) {
    const distance = calculateDistance(
      volunteer.location.latitude,
      volunteer.location.longitude,
      task.location.latitude,
      task.location.longitude
    );

    // Closer is better: 0km = 40pts, 10km = 20pts, 20km+ = 0pts
    if (distance <= 10) {
      score += 40;
      reasons.push(`Close location (${distance.toFixed(1)}km away)`);
    } else if (distance <= 20) {
      score += 20;
      reasons.push(`Moderate distance (${distance.toFixed(1)}km away)`);
    }
  }

  // Availability-based scoring (30% weight)
  if (isVolunteerAvailable(volunteer, task)) {
    score += 30;
    reasons.push('Available for this task');
  }

  // Skills-based scoring (20% weight)
  if (volunteer.skills && task.requiredSkills) {
    const matchedSkills = volunteer.skills.filter((skill) =>
      task.requiredSkills.includes(skill)
    );

    const skillScore = (matchedSkills.length / task.requiredSkills.length) * 20;
    score += skillScore;

    if (matchedSkills.length > 0) {
      reasons.push(`Has required skills: ${matchedSkills.join(', ')}`);
    }
  }

  // Completion history (10% weight)
  if (volunteer.completedTasks) {
    const historyScore = Math.min(10, volunteer.completedTasks * 2);
    score += historyScore;
    if (volunteer.completedTasks > 0) {
      reasons.push(`${volunteer.completedTasks} tasks completed`);
    }
  }

  return {
    score: Math.round(score),
    reasons,
    maxScore: 100,
  };
};

/**
 * Sort and rank volunteers for a given task
 * @param {Array} volunteers - Array of volunteer objects
 * @param {Object} task - Task object
 * @returns {Array} Sorted volunteers with match scores
 */
export const rankVolunteersForTask = (volunteers, task) => {
  const rankedVolunteers = volunteers.map((volunteer) => {
    const matchData = calculateMatchScore(volunteer, task);
    return {
      ...volunteer,
      matchScore: matchData.score,
      matchReasons: matchData.reasons,
    };
  });

  // Sort by match score (descending)
  return rankedVolunteers.sort((a, b) => b.matchScore - a.matchScore);
};

/**
 * Get top N volunteers for a task
 * @param {Array} volunteers - Array of volunteer objects
 * @param {Object} task - Task object
 * @param {number} limit - Number of top volunteers to return
 * @returns {Array} Top N volunteers
 */
export const getTopVolunteersForTask = (volunteers, task, limit = 5) => {
  const ranked = rankVolunteersForTask(volunteers, task);
  return ranked.slice(0, limit);
};

export default {
  calculateDistance,
  isVolunteerAvailable,
  calculateMatchScore,
  rankVolunteersForTask,
  getTopVolunteersForTask,
};
