import ProblemForm from "../../components/ngo/forms/ProblemForm";
import VolunteerMatchingPanel from "../../components/ngo/volunteers/VolunteerMatchingPanel";

const suggestedMatches = [
  { id: "m1", name: "Aarav Sharma", avatar: "https://i.pravatar.cc/72?img=12", skills: ["Waste Management", "Outreach"], match: 94, availability: "Available Today", distance: "1.2 km" },
  { id: "m2", name: "Nisha Verma", avatar: "https://i.pravatar.cc/72?img=47", skills: ["Healthcare", "Community"], match: 87, availability: "Tomorrow", distance: "2.9 km" },
  { id: "m3", name: "Meera Patel", avatar: "https://i.pravatar.cc/72?img=45", skills: ["Logistics", "Documentation"], match: 79, availability: "Available Today", distance: "3.6 km" }
];

const PostProblem = () => (
  <section className="ngo-grid-two">
    <ProblemForm />
    <VolunteerMatchingPanel matches={suggestedMatches} />
  </section>
);

export default PostProblem;
