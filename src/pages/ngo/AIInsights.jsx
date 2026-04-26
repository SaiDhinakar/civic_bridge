import React from "react";
import AISmartAllocation from "../../components/ngo/AIRecommendations/AISmartAllocation";
import "../../styles/ai.css";

const METRICS = [
  { icon: "⚡", label: "Auto Assignments Today", value: "24", accent: "#4285F4", bg: "#eef3fe" },
  { icon: "🚨", label: "Escalated Tasks", value: "3", accent: "#ea4335", bg: "#fdf1f0" },
  { icon: "🎯", label: "Avg Match Accuracy", value: "87%", accent: "#0ea5e9", bg: "#e0f7ff" },
  { icon: "📍", label: "Shortage Areas", value: "2 zones", accent: "#f59e0b", bg: "#fff8e6" },
  { icon: "🧠", label: "AI Tasks Generated", value: "11", accent: "#7c3aed", bg: "#f3eeff" },
];

const ACTIVITY_FEED = [
  { icon: "⚡", text: "12 volunteers auto-assigned to Ward 11 sanitation task", time: "2m ago", type: "assign" },
  { icon: "🚨", text: "Flood Relief task escalated — shortage detected in Ward 6", time: "8m ago", type: "escalate" },
  { icon: "📍", text: "Nearby volunteers matched within 1.5 km for Market Waste task", time: "15m ago", type: "location" },
  { icon: "🧠", text: "AI generated sanitation response plan for 3 active sectors", time: "22m ago", type: "ai" },
  { icon: "✅", text: "Allocation complete — Park Restoration Drive, Ward 3", time: "34m ago", type: "complete" },
  { icon: "⚡", text: "8 volunteers dispatched — Sewage Overflow Containment", time: "41m ago", type: "assign" },
];

const activityTypeColors = {
  assign: "#4285F4",
  escalate: "#ea4335",
  location: "#0ea5e9",
  ai: "#7c3aed",
  complete: "#16a34a",
};

const AIInsights = () => {
  return (
    <div className="ai-page">

      {/* Page Header */}
      <header className="ai-page-header">
        <div className="ai-page-title-group">
          <h2 className="ai-page-title">AI Insights</h2>
          <p className="ai-page-subtitle">
            Intelligent civic coordination — AI automatically analyzes problems, generates tasks, and allocates the best volunteers in real time.
          </p>
        </div>
        <div className="ai-live-chip">
          <span className="live-pulse" />
          <span>Engine Running</span>
        </div>
      </header>

      {/* Metrics Row */}
      <section className="ai-metrics-row">
        {METRICS.map((m, i) => (
          <div className="ai-metric-card" key={i} style={{ "--accent": m.accent, "--accent-bg": m.bg }}>
            <div className="ai-metric-icon">{m.icon}</div>
            <div className="ai-metric-body">
              <div className="ai-metric-value">{m.value}</div>
              <div className="ai-metric-label">{m.label}</div>
            </div>
          </div>
        ))}
      </section>

      {/* Main Grid */}
      <section className="ai-main-grid">

        {/* Left: Smart Allocation */}
        <main className="ai-allocation-col">
          <AISmartAllocation />
        </main>

        {/* Right: Activity Feed */}
        <aside className="ai-sidebar-col">

          {/* Automation Status */}
          <div className="ai-widget">
            <h4 className="widget-title">AI Automation Status</h4>
            <div className="status-badges-grid">
              <span className="status-pill-sm auto-pill">⚡ Auto Assigned</span>
              <span className="status-pill-sm smart-pill">🧠 Smart Match</span>
              <span className="status-pill-sm nearby-pill">📍 Nearby Match</span>
              <span className="status-pill-sm esc-pill">🚨 Escalated</span>
              <span className="status-pill-sm complete-pill">✅ Allocation Done</span>
            </div>
          </div>

          {/* Activity Stream */}
          <div className="ai-widget activity-widget">
            <h4 className="widget-title">⚡ AI Activity Stream</h4>
            <ul className="activity-stream">
              {ACTIVITY_FEED.map((item, i) => (
                <li className="activity-item" key={i}>
                  <span
                    className="activity-icon-wrap"
                    style={{ background: activityTypeColors[item.type] + "18", color: activityTypeColors[item.type] }}
                  >
                    {item.icon}
                  </span>
                  <div className="activity-body">
                    <span className="activity-text">{item.text}</span>
                    <span className="activity-time">{item.time}</span>
                  </div>
                </li>
              ))}
            </ul>
          </div>

          {/* Quick Stats */}
          <div className="ai-widget stats-widget">
            <h4 className="widget-title">📊 Allocation Stats</h4>
            <div className="quick-stat-row">
              <span className="qs-label">Match Rate</span>
              <div className="qs-bar-wrap">
                <div className="qs-bar" style={{ width: "87%", background: "linear-gradient(90deg,#4285F4,#0ea5e9)" }} />
              </div>
              <span className="qs-val">87%</span>
            </div>
            <div className="quick-stat-row">
              <span className="qs-label">Response Time</span>
              <div className="qs-bar-wrap">
                <div className="qs-bar" style={{ width: "73%", background: "linear-gradient(90deg,#7c3aed,#a855f7)" }} />
              </div>
              <span className="qs-val">~5 min</span>
            </div>
            <div className="quick-stat-row">
              <span className="qs-label">Coverage</span>
              <div className="qs-bar-wrap">
                <div className="qs-bar" style={{ width: "92%", background: "linear-gradient(90deg,#16a34a,#22c55e)" }} />
              </div>
              <span className="qs-val">92%</span>
            </div>
          </div>

        </aside>
      </section>
    </div>
  );
};

export default AIInsights;
