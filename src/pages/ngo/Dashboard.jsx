import NGOOverview from "../../components/ngo/dashboard/NGOOverview";
import { dashboardStats, ngoOverviewData } from "../../data/ngo/dashboardData";
import { resourceData } from "../../data/ngo/resourceData";
import { notificationsData } from "../../data/ngo/notificationsData";

const activityData = [
  { id: "a1", name: "Aarav Sharma", avatar: "https://i.pravatar.cc/70?img=12", assignment: "Lake Cleanup Mission • Sector 8", status: "Active", updatedAt: "8m ago" },
  { id: "a2", name: "Nisha Verma", avatar: "https://i.pravatar.cc/70?img=47", assignment: "Health Desk Coordination • Ward 3", status: "In Field", updatedAt: "21m ago" },
  { id: "a3", name: "Kabir Khan", avatar: "https://i.pravatar.cc/70?img=35", assignment: "School Awareness Campaign • Ward 11", status: "Pending", updatedAt: "42m ago" }
];

const Dashboard = () => (
  <NGOOverview
    stats={dashboardStats.data}
    overview={ngoOverviewData.data}
    resource={resourceData.data}
    activity={activityData}
    notifications={notificationsData.data}
  />
);

export default Dashboard;
