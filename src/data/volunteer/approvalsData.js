export const approvalsData = {
  success: true,
  data: {
    metrics: [
      { id: "pending", label: "Pending Requests", value: 3, icon: "ri-time-line", bg: "#fff7ed", color: "#c2410c" },
      { id: "approved", label: "Approved Tasks", value: 12, icon: "ri-checkbox-circle-line", bg: "#f0fdf4", color: "#15803d" },
      { id: "denied", label: "Denied Requests", value: 1, icon: "ri-close-circle-line", bg: "#fef2f2", color: "#b91c1c" },
      { id: "ai-today", label: "AI Assignments Today", value: 5, icon: "ri-robot-line", bg: "#eff6ff", color: "#1d4ed8" }
    ],
    items: [
      {
        id: "ap1",
        title: "Flood Relief Supply Distribution",
        ngo: "HopeHands Trust",
        location: "Ward 6, Riverside",
        date: "Apr 28, 2026",
        time: "9:00 AM",
        urgency: "high",
        status: "pending",
        aiAssigned: true,
        matchPercentage: 94,
        reason: "Nearby availability and disaster relief experience.",
        skills: ["Logistics", "First Aid"],
        distance: "1.2 km"
      },
      {
        id: "ap2",
        title: "Market Waste Audit",
        ngo: "EcoServe Foundation",
        location: "Sector 8 Market",
        date: "Apr 29, 2026",
        time: "11:30 AM",
        urgency: "medium",
        status: "pending",
        aiAssigned: true,
        matchPercentage: 88,
        reason: "Available during mid-day slot in Sector 8.",
        skills: ["Data Entry", "Environmental Science"],
        distance: "2.5 km"
      },
      {
        id: "ap3",
        title: "Senior Health Awareness",
        ngo: "CareBridge NGO",
        location: "Community Center Block A",
        date: "May 01, 2026",
        time: "10:00 AM",
        urgency: "low",
        status: "pending",
        aiAssigned: false,
        matchPercentage: 75,
        reason: "Requested for participation.",
        skills: ["Communication", "Healthcare"],
        distance: "3.8 km"
      },
      {
        id: "ap4",
        title: "Urban Plantation Drive",
        ngo: "GreenFuture Foundation",
        location: "Sector 12 Park",
        date: "Apr 20, 2026",
        time: "8:00 AM",
        urgency: "medium",
        status: "approved",
        aiAssigned: true,
        matchPercentage: 91,
        reason: "Consistent participation in green initiatives.",
        skills: ["Manual Labor", "Horticulture"],
        distance: "1.5 km"
      },
      {
        id: "ap5",
        title: "Drainage Cleanup Coordination",
        ngo: "Clean City Collective",
        location: "Ward 11, Sector B",
        date: "Apr 15, 2026",
        time: "10:00 AM",
        urgency: "critical",
        status: "denied",
        aiAssigned: true,
        matchPercentage: 82,
        reason: "Recommended based on sanitation project history.",
        skills: ["Team Leadership", "Sanitation"],
        distance: "0.8 km"
      }
    ]
  }
};
