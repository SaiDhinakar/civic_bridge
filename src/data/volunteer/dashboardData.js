export const dashboardData = {
    success: true,
    data: {
      welcome: {
        name: "Aarav Sharma",
        ngo: "GreenFuture Foundation",
        quote: "Thank you for creating measurable impact in your community."
      },
      stats: [
        { id: 1, label: "Tasks Completed", value: 38, delta: "+4 this week", trend: "up", icon: "ri-checkbox-circle-line" },
        { id: 2, label: "Volunteer Hours", value: 126, delta: "+9 hrs this month", trend: "up", icon: "ri-time-line" },
        { id: 3, label: "Reports Submitted", value: 19, delta: "100% approved", trend: "up", icon: "ri-file-chart-line" },
        { id: 4, label: "Impact Score", value: 92, delta: "Top 12%", trend: "up", icon: "ri-award-line" }
      ],
      recentActivity: [
        { id: 1, title: "Submitted cleanliness drive report", time: "2 hours ago", status: "approved" },
        { id: 2, title: "Applied to food distribution event", time: "Yesterday", status: "pending" }
      ],
      upcomingTasks: [
        { id: 1, title: "Park Cleanup Mission", ngo: "Clean City Collective", date: "May 04, 2026", location: "Sector 8 Park" },
        { id: 2, title: "School Kit Distribution", ngo: "EduReach NGO", date: "May 07, 2026", location: "Ward 11 Community Hall" }
      ],
      quickActions: [
        { id: "qa1", label: "Find Tasks", path: "/volunteer/opportunities", icon: "ri-search-line" },
        { id: "qa2", label: "Submit Report", path: "/volunteer/report", icon: "ri-file-upload-line" }
      ],
      nearbyOpportunities: [
        { id: 101, title: "Tree Plantation Drive", ngo: "GreenFuture Foundation", priority: "High", location: "Central Lake", volunteersNeeded: 12 },
        { id: 102, title: "Health Camp Support", ngo: "CareBridge NGO", priority: "Medium", location: "Civil Hospital Block B", volunteersNeeded: 8 }
      ],
      /* NGO messages removed to declutter dashboard */
    }
  };