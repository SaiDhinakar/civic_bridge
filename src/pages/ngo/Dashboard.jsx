import { useState, useEffect } from 'react';
import NGOOverview from "../../components/ngo/dashboard/NGOOverview";
import { useNGO } from '../../context/NGOContext';
import { dashboardStats, ngoOverviewData } from '../../data/ngo/dashboardData';
import { resourceData } from '../../data/ngo/resourceData';

const Dashboard = () => {
  const { state } = useNGO();
  const [dashboardData, setDashboardData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Simulate loading delay with mock data
    const timer = setTimeout(() => {
      // Format stats for display using mock data
      const formattedStats = dashboardStats.data.map(stat => ({
        id: stat.id,
        title: stat.label,
        value: stat.value,
        icon: stat.icon,
        delta: stat.delta,
        color: getStatColor(stat.id),
      }));

      // Format overview data
      const overviewData = {
        quickActions: ngoOverviewData.data.quickActions,
        completionRate: ngoOverviewData.data.completionRate,
        categoryProgress: ngoOverviewData.data.categoryProgress,
      };

      // Resource data
      const resourceDataFormatted = {
        volunteerAvailability: resourceData.data?.volunteerAvailability || [],
        resourceAllocation: resourceData.data?.resourceAllocation || [],
        shortageAlerts: resourceData.data?.shortageAlerts || [],
        readinessScore: resourceData.data?.readinessScore || 85,
        activeSupportCapacity: resourceData.data?.activeSupportCapacity || 78,
      };

      // Activity data (mock)
      const activityDataFormatted = [
        {
          id: 'a1',
          name: 'Volunteer Signup',
          avatar: 'https://i.pravatar.cc/70?img=1',
          assignment: 'New volunteer registered',
          status: 'New',
          updatedAt: '2 hours ago',
        },
        {
          id: 'a2',
          name: 'Task Completed',
          avatar: 'https://i.pravatar.cc/70?img=2',
          assignment: 'Park cleanup project finished',
          status: 'Completed',
          updatedAt: '4 hours ago',
        },
      ];

      // Notifications (mock)
      const notificationsData = [];

      setDashboardData({
        stats: formattedStats,
        overview: overviewData,
        resource: resourceDataFormatted,
        activity: activityDataFormatted,
        notifications: notificationsData,
      });

      setLoading(false);
    }, 300);

    return () => clearTimeout(timer);
  }, [state.ngoId]);

  const getStatColor = (id) => {
    const colors = {
      active: '#667eea',
      progress: '#f093fb',
      completed: '#2ecc71',
      reviews: '#f93e1d',
    };
    return colors[id] || '#667eea';
  };

  if (loading) {
    return (
      <div className="dashboard-loading" style={{ padding: '40px', textAlign: 'center' }}>
        <div style={{ fontSize: '24px', marginBottom: '10px' }}>⏳</div>
        <p>Loading dashboard...</p>
      </div>
    );
  }

  if (!dashboardData) {
    return <div style={{ padding: '20px' }}>No data available</div>;
  }

  return (
    <NGOOverview
      stats={dashboardData.stats}
      overview={dashboardData.overview}
      resource={dashboardData.resource}
      activity={dashboardData.activity}
      notifications={dashboardData.notifications}
    />
  );
};

export default Dashboard;
