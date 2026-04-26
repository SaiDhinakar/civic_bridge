const CommunityReports = ({ reports }) => (
  <article className="card card--lift">
    <h3>Community Problem Reports</h3>
    <div className="ngo-report-grid">
      {reports.map((report) => (
        <article key={report.id} className="ngo-report-item">
          <div className="ngo-report-title">
            <h4>{report.title}</h4>
            <span className={`ngo-status ngo-status--${report.urgency}`}>{report.urgency}</span>
          </div>
          <p className="muted">{report.location} • {report.date}</p>
          <p className="muted">Volunteers needed: {report.volunteerNeed}</p>
          <div className="ngo-action-row">
            <button className="btn btn--secondary" type="button">Assign Volunteers</button>
            <button className="btn btn--ghost" type="button">View Details</button>
          </div>
        </article>
      ))}
    </div>
  </article>
);

export default CommunityReports;
