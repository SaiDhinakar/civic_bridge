export const resourceData = {
  success: true,
  data: {
    volunteerAvailability: [
      { id: "v1", label: "Morning Shift", value: 65, status: "stable" },
      { id: "v2", label: "Afternoon Shift", value: 42, status: "warning" },
      { id: "v3", label: "Evening Shift", value: 88, status: "stable" }
    ],
    resourceAllocation: [
      { id: "r1", label: "Medical Kits", assigned: 45, total: 100, unit: "kits" },
      { id: "r2", label: "Water Supply", assigned: 1200, total: 2000, unit: "L" },
      { id: "r3", label: "Safety Vests", assigned: 85, total: 90, unit: "vasts" }
    ],
    shortageAlerts: [
      { id: "s1", type: "Shortage", item: "Transport Vehicles", location: "Sector 8", urgency: "High" },
      { id: "s2", type: "Shortage", item: "Safety Vests", location: "Ward 11", urgency: "Medium" }
    ],
    readinessScore: 92,
    activeSupportCapacity: 78
  }
};
