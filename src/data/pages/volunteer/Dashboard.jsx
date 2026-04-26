import { useEffect, useState } from "react";
import { dashboardData } from "../../volunteer/dashboardData";
import DashboardOverview from "../../../components/volunteer/dashboard/DashboardOverview";

const Dashboard = () => {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const t = setTimeout(() => setLoading(false), 650);
    return () => clearTimeout(t);
  }, []);

  if (loading) {
    return (
      <div className="dashboard-skeleton">
        <div className="skeleton-card large" />
        <div className="skeleton-row" />
        <div className="skeleton-row" />
      </div>
    );
  }

  return <DashboardOverview dashboard={dashboardData.data} />;
};

export default Dashboard;