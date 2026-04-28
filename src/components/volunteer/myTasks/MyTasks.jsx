import React, { useState, useMemo } from "react";
import {
  volunteerImpactStats,
  assignedTasks,
  upcomingTasks,
  completedTasks,
} from "../../../data/volunteer/myTasksData";
import "../../../styles/myTasks.css";

/* ── helpers ── */
const URGENCY = {
  high:     { label: "High",     cls: "urg-high",   icon: "⚡" },
  medium:   { label: "Medium",   cls: "urg-med",    icon: "🔔" },
  low:      { label: "Low",      cls: "urg-low",    icon: "🟢" },
  critical: { label: "Critical", cls: "urg-crit",   icon: "🚨" },
};

const STATUS = {
  in_progress:  { label: "In Progress", cls: "st-active" },
  pending:      { label: "Pending",     cls: "st-pending" },
  completed:    { label: "Completed",   cls: "st-done" },
  under_review: { label: "Under Review",cls: "st-review" },
};

const CATEGORIES = ["All", "Environment", "Sanitation", "Waste Management", "Healthcare", "Education", "Awareness", "Disaster Relief"];
const TABS = [
  { key: "all",       label: "All" },
  { key: "assigned",  label: "Assigned" },
  { key: "upcoming",  label: "Upcoming" },
  { key: "completed", label: "Completed" },
];

/* ── ImpactStats ── */
function ImpactStats() {
  return (
    <div className="mt-metrics-row">
      {volunteerImpactStats.map((s) => (
        <div
          className="mt-metric-card"
          key={s.id}
          style={{ "--m-accent": s.accent, "--m-bg": s.bg }}
        >
          <div className="mt-metric-icon"><i className={s.iconClass} /></div>
          <div className="mt-metric-body">
            <div className="mt-metric-value">{s.value}</div>
            <div className="mt-metric-label">{s.label}</div>
            <div className="mt-metric-delta">{s.delta}</div>
          </div>
        </div>
      ))}
    </div>
  );
}

/* ── Filter Bar ── */
function FilterBar({ query, setQuery, category, setCategory }) {
  return (
    <div className="mt-filter-bar">
      <label className="mt-search-box">
        <i className="ri-search-line" />
        <input
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search tasks, NGOs, locations..."
        />
        {query && (
          <button className="mt-search-clear" onClick={() => setQuery("")}><i className="ri-close-line" /></button>
        )}
      </label>

      <div className="mt-filter-chips">
        {CATEGORIES.map((cat) => (
          <button
            key={cat}
            className={`mt-chip ${category === cat ? "mt-chip--active" : ""}`}
            onClick={() => setCategory(cat)}
          >
            {cat}
          </button>
        ))}
      </div>
    </div>
  );
}

/* ── Assigned Task Card ── */
function AssignedCard({ task }) {
  const urg = URGENCY[task.urgency] || URGENCY.medium;
  const st  = STATUS[task.status]   || STATUS.pending;

  return (
    <article className="mt-card mt-card--assigned">
      <div className="mt-card-header">
        <div className="mt-card-title-group">
          <div className="mt-card-title">{task.title}</div>
          <div className="mt-card-meta-row">
            <span className={`mt-urg-badge ${urg.cls}`}>{urg.icon} {urg.label}</span>
            <span className="mt-meta-chip">📁 {task.category}</span>
            <span className="mt-meta-chip">📍 {task.location}</span>
            <span className="mt-meta-chip">🕐 {task.time}, {task.date}</span>
          </div>
        </div>
        <div className="mt-card-badges">
          {task.aiAssigned && <span className="mt-badge mt-badge--ai">🧠 AI Assigned</span>}
          <span className={`mt-badge ${st.cls}`}>{st.label}</span>
        </div>
      </div>

      <div className="mt-card-ngo-row">
        <span className="mt-ngo-chip">🏢 {task.ngo}</span>
        <span className="mt-report-chip">📋 Report by: {task.reportBy}</span>
      </div>

      {task.progress > 0 && (
        <div className="mt-progress-wrap">
          <div className="mt-progress-bar">
            <div className="mt-progress-fill" style={{ width: `${task.progress}%` }} />
          </div>
          <span className="mt-progress-label">{task.progress}% complete</span>
        </div>
      )}

      {task.aiReason && (
        <div className="mt-ai-reason">
          <span className="mt-ai-icon">🧠</span>
          <span className="mt-ai-text">{task.aiReason}</span>
        </div>
      )}
    </article>
  );
}

/* ── Upcoming Task Card ── */
function UpcomingCard({ task }) {
  const urg = URGENCY[task.urgency] || URGENCY.low;

  return (
    <article className="mt-card mt-card--upcoming">
      <div className="mt-card-header">
        <div className="mt-card-title-group">
          <div className="mt-card-title">{task.title}</div>
          <div className="mt-card-meta-row">
            <span className={`mt-urg-badge ${urg.cls}`}>{urg.icon} {urg.label}</span>
            <span className="mt-meta-chip">📁 {task.category}</span>
            <span className="mt-meta-chip">📍 {task.location}</span>
          </div>
        </div>
        <div className="mt-card-badges">
          {task.aiAssigned && <span className="mt-badge mt-badge--ai">🧠 AI Assigned</span>}
          <span className="mt-badge mt-badge--upcoming">📅 {task.countdownLabel}</span>
        </div>
      </div>

      <div className="mt-card-ngo-row">
        <span className="mt-ngo-chip">🏢 {task.ngo}</span>
        <span className="mt-meta-chip">⏰ {task.time} · {task.date}</span>
      </div>

      {task.reminder && (
        <div className="mt-reminder">
          <span className="mt-reminder-icon">💡</span>
          <span className="mt-reminder-text">{task.reminder}</span>
        </div>
      )}
    </article>
  );
}

/* ── Completed Task Card ── */
function CompletedCard({ task }) {
  const st = STATUS[task.status] || STATUS.completed;

  return (
    <article className="mt-card mt-card--completed">
      <div className="mt-card-header">
        <div className="mt-card-title-group">
          <div className="mt-card-title">{task.title}</div>
          <div className="mt-card-meta-row">
            <span className="mt-meta-chip">📁 {task.category}</span>
            <span className="mt-meta-chip">🗓 {task.date}</span>
          </div>
        </div>
        <div className="mt-card-badges">
          <span className={`mt-badge ${st.cls}`}>{st.label}</span>
        </div>
      </div>

      <div className="mt-card-ngo-row">
        <span className="mt-ngo-chip">🏢 {task.ngo}</span>
        <span className="mt-meta-chip">⏱ {task.hours} volunteer hrs</span>
        <span className="mt-meta-chip">👥 {task.impact}</span>
      </div>

      {task.badge && (
        <div className="mt-impact-badge">{task.badge}</div>
      )}
    </article>
  );
}

/* ── Section Header ── */
function SectionHeader({ icon, title, count, accentClass }) {
  return (
    <div className={`mt-section-header ${accentClass}`}>
      <span className="mt-section-icon">{icon}</span>
      <span className="mt-section-title">{title}</span>
      <span className="mt-section-count">{count}</span>
    </div>
  );
}

/* ── Main Component ── */
const MyTasks = () => {
  const [activeTab, setActiveTab] = useState("all");
  const [query, setQuery]         = useState("");
  const [category, setCategory]   = useState("All");

  const filter = (tasks) =>
    tasks.filter((t) => {
      const q = query.toLowerCase();
      const matchQ = !q || [t.title, t.ngo, t.category, t.location || ""].join(" ").toLowerCase().includes(q);
      const matchC = category === "All" || t.category === category;
      return matchQ && matchC;
    });

  const fAssigned  = useMemo(() => filter(assignedTasks),  [query, category]);
  const fUpcoming  = useMemo(() => filter(upcomingTasks),  [query, category]);
  const fCompleted = useMemo(() => filter(completedTasks), [query, category]);
  const totalAll   = fAssigned.length + fUpcoming.length + fCompleted.length;

  const tabCounts = {
    all:       totalAll,
    assigned:  fAssigned.length,
    upcoming:  fUpcoming.length,
    completed: fCompleted.length,
  };

  const showAssigned  = activeTab === "all" || activeTab === "assigned";
  const showUpcoming  = activeTab === "all" || activeTab === "upcoming";
  const showCompleted = activeTab === "all" || activeTab === "completed";

  return (
    <div className="mt-page">

      {/* Page Header */}
      <header className="mt-page-header">
        <div>
          <h2 className="mt-page-title">My Tasks</h2>
          <p className="mt-page-subtitle">Your centralized AI-powered volunteer task workspace.</p>
        </div>
      </header>

      {/* Impact Metrics */}
      <ImpactStats />

      {/* Tab Bar */}
      <div className="mt-tab-bar">
        {TABS.map((tab) => (
          <button
            key={tab.key}
            className={`mt-tab ${activeTab === tab.key ? "mt-tab--active" : ""}`}
            onClick={() => setActiveTab(tab.key)}
          >
            {tab.label}
            <span className="mt-tab-count">{tabCounts[tab.key]}</span>
          </button>
        ))}
      </div>

      {/* Filters */}
      <FilterBar
        query={query}
        setQuery={setQuery}
        category={category}
        setCategory={setCategory}
      />

      {/* Task Sections */}
      <div className="mt-task-sections">

        {/* Assigned */}
        {showAssigned && (
          <section className="mt-section">
            <SectionHeader icon="⚡" title="Assigned Tasks" count={fAssigned.length} accentClass="sh-blue" />
            {fAssigned.length === 0 ? (
              <div className="mt-empty">No assigned tasks match your filters.</div>
            ) : (
              <div className="mt-card-list">
                {fAssigned.map((t) => <AssignedCard key={t.id} task={t} />)}
              </div>
            )}
          </section>
        )}

        {/* Upcoming */}
        {showUpcoming && (
          <section className="mt-section">
            <SectionHeader icon="📅" title="Upcoming Tasks" count={fUpcoming.length} accentClass="sh-amber" />
            {fUpcoming.length === 0 ? (
              <div className="mt-empty">No upcoming tasks match your filters.</div>
            ) : (
              <div className="mt-card-list">
                {fUpcoming.map((t) => <UpcomingCard key={t.id} task={t} />)}
              </div>
            )}
          </section>
        )}

        {/* Completed */}
        {showCompleted && (
          <section className="mt-section">
            <SectionHeader icon="✅" title="Completed Tasks" count={fCompleted.length} accentClass="sh-green" />
            {fCompleted.length === 0 ? (
              <div className="mt-empty">No completed tasks match your filters.</div>
            ) : (
              <div className="mt-card-list">
                {fCompleted.map((t) => <CompletedCard key={t.id} task={t} />)}
              </div>
            )}
          </section>
        )}

        {totalAll === 0 && (
          <div className="mt-empty-state">
            <div className="mt-empty-icon">📭</div>
            <div className="mt-empty-title">No tasks found</div>
            <div className="mt-empty-sub">Try adjusting your search or category filter.</div>
            <button className="mt-reset-btn" onClick={() => { setQuery(""); setCategory("All"); }}>
              Reset Filters
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default MyTasks;
