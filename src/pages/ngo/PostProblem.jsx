import { useState } from "react";
import ProblemForm from "../../components/ngo/forms/ProblemForm";
import VolunteerMatchingPanel from "../../components/ngo/volunteers/VolunteerMatchingPanel";
import { volunteersData } from "../../data/ngo/volunteersData";

const PostProblem = () => {
  const [suggestedMatches, setSuggestedMatches] = useState([]);
  const [selectedIssue, setSelectedIssue] = useState(null);
  const [loadingMatches, setLoadingMatches] = useState(false);

  const handleIssuePosted = (issueData) => {
    // Mock handler - no API call
    setSelectedIssue(issueData);
    
    // Simulate AI matching
    setLoadingMatches(true);
    setTimeout(() => {
      // Return mock matched volunteers
      setSuggestedMatches(volunteersData.slice(0, 3).map((v, idx) => ({
        id: idx + 1,
        volunteerId: v.id,
        volunteerName: v.name,
        matchScore: 85 - idx * 5,
        skills: v.skills,
        availability: "Available this week",
      })));
      setLoadingMatches(false);
    }, 500);
  };

  return (
    <section className="ngo-grid-two">
      <ProblemForm onIssuePosted={handleIssuePosted} />
      <VolunteerMatchingPanel 
        matches={suggestedMatches} 
        isLoading={loadingMatches}
        issueId={selectedIssue?.id}
      />
    </section>
  );
};

export default PostProblem;
