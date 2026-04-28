import { useEffect, useState } from "react";
import { dashboardData } from "../../volunteer/dashboardData";
import DashboardOverview from "../../../components/volunteer/dashboard/DashboardOverview";

const Dashboard = () => {
  const [loading, setLoading] = useState(true);
  const [dashboard, setDashboard] = useState(null);

  useEffect(() => {
    // Read user data from localStorage
    const userName = localStorage.getItem('userName');
    const userEmail = localStorage.getItem('userEmail');

    // Create a copy of dashboard data and update with actual user info
    const updatedDashboard = JSON.parse(JSON.stringify(dashboardData.data));
    
    if (userName) {
      updatedDashboard.welcome.name = userName;
    }

    setDashboard(updatedDashboard);
    
    const t = setTimeout(() => setLoading(false), 650);
    return () => clearTimeout(t);
  }, []);

  if (loading || !dashboard) {
    return (
      <div className="dashboard-skeleton">
        <div className="skeleton-card large" />
        <div className="skeleton-row" />
        <div className="skeleton-row" />
      </div>
    );
  }

  return <DashboardOverview dashboard={dashboard} />;
};

export default Dashboard;