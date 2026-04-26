export const communityReportsData = {
  success: true,
  data: [
    {
      id: 1,
      title: "Sewage Overflow Near School",
      category: "Infrastructure",
      location: "Ward 11",
      volunteersNeeded: 8,
      priority: "urgent",
      status: "active",
      aiAssigned: 5,
      progress: 60,
      date: "Apr 23, 2026",
      description: "Overflowing sewage is affecting school access and nearby households.",
      images: ["https://images.unsplash.com/photo-1590490360182-c33d57733427?w=640&q=80"],
      affectedArea: "School block + two nearby streets",
      estimatedSeverity: "High",
      timeline: ["Complaint submitted by residents", "Site visit scheduled", "Urgent clean-up team requested"]
    },
    {
      id: 2,
      title: "Garbage Accumulation at Market",
      category: "Environment",
      location: "Sector 8",
      volunteersNeeded: 12,
      priority: "pending",
      status: "pending",
      aiAssigned: 0,
      progress: 20,
      date: "Apr 22, 2026",
      description: "Persistent unmanaged waste around market exits causing hygiene concerns.",
      images: ["https://images.unsplash.com/photo-1542601906990-b4d3fb778b09?w=640&q=80"],
      affectedArea: "Main market entrances",
      estimatedSeverity: "Medium",
      timeline: ["Complaint verified", "Vendor outreach pending", "Volunteer team not yet assigned"]
    },
    {
      id: 3,
      title: "Streetlight Failure in Transit Zone",
      category: "Safety",
      location: "Transit Camp 2",
      volunteersNeeded: 4,
      priority: "active",
      status: "active",
      aiAssigned: 2,
      progress: 45,
      date: "Apr 20, 2026",
      description: "Multiple streetlights non-functional near pedestrian crossing.",
      images: ["https://images.unsplash.com/photo-1519608487953-e999c86e7455?w=640&q=80"],
      affectedArea: "Transit lane and camp entrance",
      estimatedSeverity: "Medium",
      timeline: ["Issue logged", "Electrical inspection in progress", "Repair scheduled"]
    },
    {
      id: 4,
      title: "Contaminated Water Complaint",
      category: "Healthcare",
      location: "Ward 3",
      volunteersNeeded: 6,
      priority: "urgent",
      status: "resolved",
      aiAssigned: 0,
      progress: 100,
      date: "Apr 17, 2026",
      description: "Residents reported discolored tap water and odor.",
      images: ["https://images.unsplash.com/photo-1538300342682-cf57afb97285?w=640&q=80"],
      affectedArea: "Three apartment clusters",
      estimatedSeverity: "Critical",
      timeline: ["Water samples collected", "Temporary supply arranged", "Pipeline flushing completed"]
    }
  ]
};

export const communityReportFilters = {
  categories: ["All", "Infrastructure", "Environment", "Safety", "Healthcare"],
  urgencies: ["All", "urgent", "pending", "active", "resolved"],
  locations: ["All", "Ward 11", "Sector 8", "Transit Camp 2", "Ward 3"]
};
