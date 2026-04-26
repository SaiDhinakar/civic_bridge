// AI Smart Allocation Engine — automatic volunteer allocation, no manual accept/reject
import { fetchJSON } from "./dataLoader";

/**
 * Score a volunteer against a task for automatic allocation.
 */
function scoreMatch(task, volunteer) {
  // Skill relevance
  const taskKeywords = [task.title, task.category].join(" ").toLowerCase();
  const skillScore = volunteer.skills.reduce((acc, skill) => {
    const kw = skill.toLowerCase();
    if (taskKeywords.includes(kw) || kw.split(" ").some(w => taskKeywords.includes(w))) return acc + 25;
    return acc + 5;
  }, 0);

  // Proximity bonus (max 30 pts for < 1 km)
  const distanceScore = Math.max(0, 30 - Math.round(volunteer.distance * 6));

  // Experience bonus (past participation)
  const experienceScore = Math.min(25, volunteer.completed * 2);

  // Impact score contribution (0–15)
  const impactBonus = Math.round((volunteer.impactScore / 100) * 15);

  // Urgency availability bonus
  const availNow = volunteer.availability.toLowerCase().includes("today") || volunteer.availability.toLowerCase().includes("available");
  const urgencyBonus = task.urgency === "critical" && availNow ? 10 :
    task.urgency === "high" && availNow ? 7 : 0;

  const total = Math.min(100, skillScore + distanceScore + experienceScore + impactBonus + urgencyBonus);
  return total;
}

function buildReasoning(task, volunteer, matchPct) {
  const reasons = [];
  const topSkill = volunteer.skills[0] || "general skills";

  if (matchPct >= 85) {
    reasons.push(`Top match — ${topSkill} aligns perfectly with task requirements.`);
  } else if (matchPct >= 70) {
    reasons.push(`Matched for ${topSkill} and strong task compatibility.`);
  } else {
    reasons.push(`Partial match — available and geographically closest.`);
  }

  if (volunteer.distance <= 1.5) {
    reasons.push(`Only ${volunteer.distance} km away — fastest possible response.`);
  } else {
    reasons.push(`Located ${volunteer.distance} km from site — within acceptable range.`);
  }

  if (volunteer.completed >= 10) {
    reasons.push(`Previously completed ${volunteer.completed} similar civic drives.`);
  } else {
    reasons.push(`Active volunteer with ${volunteer.completed} completed tasks.`);
  }

  const availNow = volunteer.availability.toLowerCase().includes("today");
  if (availNow && (task.urgency === "high" || task.urgency === "critical")) {
    reasons.push("Available during high-urgency response window.");
  }

  return reasons;
}

/**
 * Run the AI allocation engine.
 * Returns tasks with auto-assigned volunteers and match metadata.
 */
export async function getAutoAllocations(delay = 200) {
  const tasks = await fetchJSON("../data/ai/tasks.json", delay);
  const volunteers = await fetchJSON("../data/ai/volunteers.json", delay);

  return tasks.map((task) => {
    const maxNeeded = task.volunteersNeeded || 4;

    const ranked = volunteers
      .map((v) => {
        const match = scoreMatch(task, v);
        const reasons = buildReasoning(task, v, match);
        return {
          id: v.id,
          name: v.name,
          role: v.role,
          skills: v.skills,
          availability: v.availability,
          distance: v.distance,
          avatar: v.avatar,
          completed: v.completed,
          impactScore: v.impactScore,
          match,
          reasons,
        };
      })
      .sort((a, b) => b.match - a.match);

    const allocated = ranked.slice(0, Math.min(maxNeeded, ranked.length));
    const avgMatch = Math.round(allocated.reduce((s, v) => s + v.match, 0) / (allocated.length || 1));
    const nearestKm = Math.min(...allocated.map(v => v.distance));

    return {
      task,
      allocated,
      meta: {
        avgMatch,
        nearestKm,
        totalAllocated: allocated.length,
        efficiency: avgMatch >= 80 ? "high" : avgMatch >= 60 ? "medium" : "low",
      },
    };
  });
}

// Legacy exports kept for backward-compatibility but no-op'd
export function acceptRecommendation() {}
export function declineRecommendation() {}
export function getAssignmentStatus() { return null; }
export function getAllAssignments() { return {}; }
// Legacy function for old component references
export async function getRecommendations(delay = 200) { return getAutoAllocations(delay); }
