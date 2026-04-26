export const dashboardStats = {
  success: true,
  data: [
    { id: "active", label: "Active Volunteers", value: 148, delta: "+12 this week", icon: "ri-team-line" },
    { id: "progress", label: "Tasks In Progress", value: 34, delta: "+5 today", icon: "ri-loader-4-line" },
    { id: "completed", label: "Total Completed", value: 892, delta: "+41 this month", icon: "ri-checkbox-circle-line" },
    { id: "reviews", label: "Pending Reviews", value: 19, delta: "Needs approval", icon: "ri-time-line" }
  ]
};

export const ngoOverviewData = {
  success: true,
  data: {
    completionRate: 86,
    categoryProgress: [
      { id: "env", label: "Environment", value: 91 },
      { id: "health", label: "Healthcare", value: 82 },
      { id: "edu", label: "Education", value: 75 }
    ],
    quickActions: [
      { id: "qa1", label: "Post Problem", path: "/ngo/post-problem", icon: "ri-error-warning-line" },
      { id: "qa2", label: "Submit Report", path: "/ngo/submit-report", icon: "ri-file-chart-line" },
      { id: "qa3", label: "Invite Volunteers", path: "/ngo/volunteers", icon: "ri-user-add-line" }
    ]
  }
};
