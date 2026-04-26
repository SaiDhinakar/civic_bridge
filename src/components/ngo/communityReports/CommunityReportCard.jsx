const CommunityReportCard = ({ report, onViewDetails }) => {
  // Choose single prominent badge: prefer priority, fall back to status
  const badgeLabel = report.priority || report.status;
  const badgeKey = (report.priority || report.status || "").toLowerCase();
  const aiAssigned = report.aiAssigned || 0;
  const needs = report.volunteersNeeded || 0;

  return (
    <article className="ngo-issue-tile">
      <div className="tile-head">
        <h4 className="tile-title">{report.title}</h4>
        <span className={`tile-badge tile-badge--${badgeKey}`}>{badgeLabel}</span>
      </div>

      <div className="tile-meta">
        <div className="meta-left">{report.location} • {report.date}</div>
        <div className="meta-right">{report.category}</div>
      </div>

      <p className="tile-desc">{report.description}</p>

      <div className="tile-ai-row">
        <div className="ai-indicator">
          {aiAssigned > 0 ? (
            <><span className="ai-emoji">🧠</span> <span className="ai-text">AI assigned {aiAssigned}</span></>
          ) : needs > 0 ? (
            <><span className="ai-emoji">⚠️</span> <span className="ai-text">Needs {needs} more</span></>
          ) : (
            <><span className="ai-emoji">✅</span> <span className="ai-text">Recommendation ready</span></>
          )}
        </div>
        <button className="tile-link" onClick={() => onViewDetails(report)}>View Details →</button>
      </div>

      <div className="tile-progress">
        <div className="progress-small">
          <div className="progress-small__fill" style={{ width: `${report.progress || 0}%` }} />
        </div>
        <div className="progress-percent">{report.progress || 0}%</div>
      </div>
    </article>
  );
};

export default CommunityReportCard;
