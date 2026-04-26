import React, { useEffect, useState } from "react";
import MyTasksComponent from "../../../components/volunteer/myTasks/MyTasks";

const MyTasks = () => {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Simulate loading for better UX
    const t = setTimeout(() => setLoading(false), 500);
    return () => clearTimeout(t);
  }, []);

  if (loading) {
    return (
      <div className="mt-page" style={{ opacity: 0.5 }}>
        <div className="skeleton-card" style={{ height: 100, marginBottom: 20 }} />
        <div className="skeleton-row" style={{ height: 150, marginBottom: 15 }} />
        <div className="skeleton-row" style={{ height: 150, marginBottom: 15 }} />
      </div>
    );
  }

  return <MyTasksComponent />;
};

export default MyTasks;
