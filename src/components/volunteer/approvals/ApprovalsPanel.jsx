import React, { useState, useMemo } from "react";
import "../../../styles/volunteer/approvals.css";

const ApprovalsPanel = ({ initialData }) => {
  const [items, setItems] = useState(initialData.items);
  const [activeTab, setActiveTab] = useState("pending");
  const [metrics, setMetrics] = useState(initialData.metrics);

  const filteredItems = useMemo(() => {
    if (activeTab === "all") return items;
    return items.filter(item => item.status === activeTab);
  }, [items, activeTab]);

  const handleAction = (id, newStatus) => {
    setItems(prev => prev.map(item => 
      item.id === id ? { ...item, status: newStatus } : item
    ));

    // Update metrics count (simplified for demo)
    setMetrics(prev => prev.map(m => {
      if (m.id === "pending") return { ...m, value: Math.max(0, m.value - 1) };
      if (m.id === newStatus) return { ...m, value: m.value + 1 };
      return m;
    }));
  };

  const getUrgencyClass = (urgency) => {
    switch (urgency) {
      case 'critical': return 'urg-critical';
      case 'high': return 'urg-high';
      case 'medium': return 'urg-medium';
      case 'low': return 'urg-low';
      default: return '';
    }
  };

  const getStatusClass = (status) => {
    switch (status) {
      case 'pending': return 'status-pending';
      case 'approved': return 'status-approved';
      case 'denied': return 'status-denied';
      case 'escalated': return 'status-escalated';
      default: return '';
    }
  };

  return (
    <div className="approvals-container">
      {/* Metric Cards */}
      <div className="approvals-metrics">
        {metrics.map(m => (
          <div key={m.id} className="app-metric-card" style={{ '--m-bg': m.bg, '--m-color': m.color }}>
            <div className="app-metric-icon"><i className={m.icon}></i></div>
            <div className="app-metric-info">
              <span className="app-metric-value">{m.value}</span>
              <span className="app-metric-label">{m.label}</span>
            </div>
          </div>
        ))}
      </div>

      {/* Filter Tabs */}
      <div className="approvals-tabs">
        {['pending', 'approved', 'denied', 'all'].map(tab => (
          <button 
            key={tab} 
            className={`app-tab ${activeTab === tab ? 'active' : ''}`}
            onClick={() => setActiveTab(tab)}
          >
            {tab.charAt(0).toUpperCase() + tab.slice(1)}
          </button>
        ))}
      </div>

      {/* Approval Cards Grid */}
      <div className="approvals-grid">
        {filteredItems.length > 0 ? (
          filteredItems.map(item => (
            <div key={item.id} className={`approval-card ${getStatusClass(item.status)}`}>
              <div className="app-card-header">
                <div className="app-card-title-row">
                  <h4>{item.title}</h4>
                  <div className="app-card-badges">
                    {item.aiAssigned && <span className="ai-badge">🧠 AI Assigned</span>}
                    <span className={`urg-badge ${getUrgencyClass(item.urgency)}`}>{item.urgency}</span>
                  </div>
                </div>
                <p className="app-ngo-name"><i className="ri-building-line"></i> {item.ngo}</p>
              </div>

              <div className="app-card-details">
                <div className="detail-item">
                  <i className="ri-map-pin-line"></i>
                  <span>{item.location} • <strong>{item.distance}</strong></span>
                </div>
                <div className="detail-item">
                  <i className="ri-calendar-line"></i>
                  <span>{item.date} • {item.time}</span>
                </div>
              </div>

              <div className="app-card-match">
                <div className="match-header">
                  <span className="match-pct">{item.matchPercentage}% AI Match Score</span>
                  <div className="match-skills">
                    {item.skills.map(s => <span key={s} className="skill-chip">{s}</span>)}
                  </div>
                </div>
                <div className="ai-reason">
                  <p>“{item.reason}”</p>
                </div>
              </div>

              {item.status === 'pending' && (
                <div className="app-card-actions">
                  <button className="btn-approve" onClick={() => handleAction(item.id, 'approved')}>
                    Confirm Assignment
                  </button>
                  <button className="btn-deny" onClick={() => handleAction(item.id, 'denied')}>
                    Deny
                  </button>
                </div>
              )}

              {item.status !== 'pending' && (
                <div className={`status-footer ${item.status}`}>
                  <i className={item.status === 'approved' ? 'ri-checkbox-circle-fill' : 'ri-close-circle-fill'}></i>
                  <span>{item.status === 'approved' ? 'Participation Confirmed' : 'Assignment Denied'}</span>
                </div>
              )}
            </div>
          ))
        ) : (
          <div className="empty-state">
            <i className="ri-inbox-line"></i>
            <p>No {activeTab} assignments found.</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default ApprovalsPanel;
