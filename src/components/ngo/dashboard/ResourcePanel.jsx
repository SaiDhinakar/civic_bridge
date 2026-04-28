import React from "react";

const ResourcePanel = ({ data = {} }) => {
  const { 
    volunteerAvailability = [], 
    resourceAllocation = [], 
    shortageAlerts = [], 
    readinessScore = 0, 
    activeSupportCapacity = 0 
  } = data;

  // Handle case where data is still undefined or invalid
  if (!data || Object.keys(data).length === 0) {
    return (
      <section className="resource-panel card card--lift">
        <div className="resource-header">
          <div>
            <h3>Resource Data</h3>
            <p className="muted">No resource data available.</p>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="resource-panel card card--lift">
      <div className="resource-header">
        <div>
          <h3>Resource Data</h3>
          <p className="muted">Monitor volunteer capacity and operational readiness in real time.</p>
        </div>
        <div className="readiness-chip">
          <span className="live-dot"></span>
          AI Readiness: {readinessScore}%
        </div>
      </div>

      <div className="resource-content">
        {/* Volunteer Availability */}
        <div className="resource-column">
          <h4><i className="ri-team-line"></i> Volunteer Availability</h4>
          <div className="availability-list">
            {volunteerAvailability.map((v) => (
              <div key={v.id} className="availability-item">
                <span className="avail-label">{v.label}</span>
                <div className="avail-bar-wrap">
                  <div className={`avail-bar ${v.status}`} style={{ width: `${v.value}%` }}></div>
                </div>
                <span className="avail-val">{v.value}%</span>
              </div>
            ))}
          </div>
        </div>

        {/* Resource Allocation */}
        <div className="resource-column">
          <h4><i className="ri-box-3-line"></i> Resource Allocation</h4>
          <div className="allocation-list">
            {resourceAllocation.map((r) => (
              <div key={r.id} className="allocation-item">
                <div className="alloc-info">
                  <span className="alloc-label">{r.label}</span>
                  <span className="alloc-meta">{r.assigned} / {r.total} {r.unit}</span>
                </div>
                <div className="alloc-bar-wrap">
                  <div className="alloc-bar" style={{ width: `${(r.assigned / r.total) * 100}%` }}></div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Shortage Alerts & Capacity */}
        <div className="resource-column">
          <h4><i className="ri-error-warning-line"></i> Operational Alerts</h4>
          <div className="alerts-list">
            {shortageAlerts.map((s) => (
              <div key={s.id} className={`alert-card ${s.urgency.toLowerCase()}`}>
                <div className="alert-icon"><i className="ri-alert-line" /></div>
                <div className="alert-body">
                  <strong>{s.item} Shortage</strong>
                  <span>{s.location} • {s.urgency} Urgency</span>
                </div>
              </div>
            ))}
          </div>
          <div className="capacity-summary">
            <div className="capacity-stat">
              <span className="stat-val">{activeSupportCapacity}%</span>
              <span className="stat-label">Active Capacity</span>
            </div>
            <div className="capacity-stat">
              <span className="stat-val">Live</span>
              <span className="stat-label">System Status</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ResourcePanel;
