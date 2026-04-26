import React, { useEffect, useState } from "react";
import ApprovalsPanel from "../../../components/volunteer/approvals/ApprovalsPanel";
import { approvalsData } from "../../volunteer/approvalsData";

const ApprovalsPage = () => {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const t = setTimeout(() => setLoading(false), 600);
    return () => clearTimeout(t);
  }, []);

  if (loading) {
    return (
      <div className="approvals-container" style={{ opacity: 0.5 }}>
        <div className="skeleton-card" style={{ height: 100, marginBottom: 20 }} />
        <div className="skeleton-row" style={{ height: 200, marginBottom: 20 }} />
      </div>
    );
  }

  return <ApprovalsPanel initialData={approvalsData.data} />;
};

export default ApprovalsPage;
