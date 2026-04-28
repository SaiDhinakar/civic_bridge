import React, { useState, useEffect } from "react";
import { getAutoAllocations } from "../../../utils/aiMatcher";

const URGENCY_META = {
  critical: { label: "Critical", cls: "urgency-critical", iconClass: "ri-alert-line" },
  high: { label: "High", cls: "urgency-high", iconClass: "ri-flash-line" },
  medium: { label: "Medium", cls: "urgency-medium", iconClass: "ri-notification-line" },
  low: { label: "Low", cls: "urgency-low", iconClass: "ri-check-circle-line" },
};

const EFFICIENCY_META = {
  high: { label: "High Efficiency", cls: "eff-high" },
  medium: { label: "Moderate", cls: "eff-med" },
  low: { label: "Low Match", cls: "eff-low" },
};

const TIMELINE_STEPS = [
  { key: "reported", label: "Reported" },
  { key: "categorized", label: "AI Categorized" },
  { key: "tasks_generated", label: "Task Generated" },
  { key: "allocated", label: "Volunteers Allocated" },
  { key: "active", label: "Task Active" },
];

function TimelineBar({ steps }) {
  const completedSteps = steps || [];
  return (
    <div className="allocation-timeline">
      {TIMELINE_STEPS.map((step, i) => {
        const done = completedSteps.includes(step.key);
        const isLast = i === TIMELINE_STEPS.length - 1;
        return (
          <React.Fragment key={step.key}>
            <div className={`tl-step ${done ? "tl-done" : "tl-pending"}`}>
              <div className="tl-dot" />
              <span className="tl-label">{step.label}</span>
            </div>
            {!isLast && <div className={`tl-connector ${done ? "tl-conn-done" : ""}`} />}
          </React.Fragment>
        );
      })}
    </div>
  );
}

function VolunteerRow({ volunteer }) {
  const matchCls = volunteer.match >= 85 ? "match-high" : volunteer.match >= 70 ? "match-med" : "match-low";
  return (
    <div className="vol-row">
      <img
        src={volunteer.avatar}
        alt={volunteer.name}
        className="vol-avatar"
        onError={e => { e.target.src = `https://api.dicebear.com/7.x/initials/svg?seed=${encodeURIComponent(volunteer.name)}`; }}
      />
      <div className="vol-body">
        <div className="vol-name-line">
          <span className="vol-name">{volunteer.name}</span>
          <span className={`match-badge ${matchCls}`}>{volunteer.match}% Match</span>
        </div>
        <div className="vol-meta">
          {volunteer.role} &bull; {volunteer.skills.slice(0, 2).join(" • ")} &bull; {volunteer.distance} km away
        </div>
        <div className="vol-reason">{volunteer.reasons[0]}</div>
      </div>
      <div className="vol-indicators">
        <span className="indicator-badge auto-badge"><i className="ri-flash-line" /> Auto</span>
        {volunteer.distance <= 2 && <span className="indicator-badge nearby-badge"><i className="ri-map-pin-line" /> Nearby</span>}
      </div>
    </div>
  );
}

function AllocationCard({ allocation }) {
  const { task, allocated, meta } = allocation;
  const urgency = URGENCY_META[task.urgency] || URGENCY_META.medium;
  const eff = EFFICIENCY_META[meta.efficiency] || EFFICIENCY_META.medium;
  const [expanded, setExpanded] = useState(false);
  const shown = expanded ? allocated : allocated.slice(0, 3);

  return (
    <article className={`alloc-card ${task.status === "escalated" ? "alloc-escalated" : ""}`}>
      {/* Card Header */}
      <div className="alloc-header">
        <div className="alloc-title-group">
          <div className="alloc-title">{task.title}</div>
          <div className="alloc-meta-row">
            <span className={`urgency-badge ${urgency.cls}`}><i className={urgency.iconClass} /> {urgency.label}</span>
            <span className="alloc-meta-item"><i className="ri-folder-line" /> {task.category}</span>
            <span className="alloc-meta-item"><i className="ri-map-pin-line" /> {task.location}</span>
            <span className="alloc-meta-item"><i className="ri-calendar-line" /> {task.date}</span>
          </div>
        </div>
        <div className="alloc-status-group">
          {task.status === "escalated" && (
            <span className="status-pill escalated"><i className="ri-alert-line" /> Escalated</span>
          )}
          <span className="status-pill auto-assigned"><i className="ri-flash-line" /> Auto Assigned</span>
        </div>
      </div>

      {/* AI Allocation Summary */}
      <div className="alloc-summary-bar">
        <div className="alloc-stat">
          <span className="alloc-stat-icon"><i className="ri-brain-line" /></span>
          <span className="alloc-stat-val">{meta.totalAllocated}</span>
          <span className="alloc-stat-label">volunteers assigned</span>
        </div>
        <div className="alloc-stat">
          <span className="alloc-stat-icon"><i className="ri-map-pin-line" /></span>
          <span className="alloc-stat-val">{meta.nearestKm} km</span>
          <span className="alloc-stat-label">nearest volunteer</span>
        </div>
        <div className="alloc-stat">
          <span className="alloc-stat-icon"><i className="ri-target-line" /></span>
          <span className="alloc-stat-val">{meta.avgMatch}%</span>
          <span className="alloc-stat-label">avg match</span>
        </div>
        <div className="alloc-stat">
          <span className={`eff-chip ${eff.cls}`}>{eff.label}</span>
        </div>
      </div>

      {/* Workflow Timeline */}
      <TimelineBar steps={task.timeline} />

      {/* Volunteer List */}
      <div className="vol-list">
        {shown.map(v => <VolunteerRow key={v.id} volunteer={v} />)}
      </div>

      {allocated.length > 3 && (
        <button className="show-more-btn" onClick={() => setExpanded(e => !e)}>
          {expanded ? <><i className="ri-arrow-up-s-line" /> Show less</> : <><i className="ri-arrow-down-s-line" /> +{allocated.length - 3} more volunteers</>}
        </button>
      )}
    </article>
  );
}

function SkeletonCard() {
  return (
    <div className="alloc-card skeleton-alloc">
      <div className="sk-line sk-title" />
      <div className="sk-line sk-meta" />
      <div className="sk-line sk-body" />
      <div className="sk-line sk-body" />
    </div>
  );
}

const AISmartAllocation = () => {
  const [allocations, setAllocations] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let mounted = true;
    (async () => {
      try {
        const data = await getAutoAllocations(300);
        if (mounted) { setAllocations(data); setLoading(false); }
      } catch {
        if (mounted) setLoading(false);
      }
    })();
    return () => { mounted = false; };
  }, []);

  return (
    <section className="ai-smart-allocation">
      <div className="section-header-row">
        <div>
          <h3 className="section-title-main"><i className="ri-brain-line" /> AI Smart Allocation</h3>
          <p className="section-subtitle">Volunteers automatically matched by skill, proximity, availability &amp; urgency.</p>
        </div>
        <span className="live-indicator"><span className="live-dot" />Live</span>
      </div>

      <div className="alloc-list">
        {loading ? (
          [1, 2].map(i => <SkeletonCard key={i} />)
        ) : allocations.length === 0 ? (
          <div className="empty-alloc">No active allocations at this time.</div>
        ) : (
          allocations.map(a => <AllocationCard key={a.task.id} allocation={a} />)
        )}
      </div>
    </section>
  );
};

export default AISmartAllocation;
