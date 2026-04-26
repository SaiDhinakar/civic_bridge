const CommunityReportDetailsModal = ({ report, onClose }) => {
  if (!report) return null;

  return (
    <div className="ngo-modal-backdrop" onClick={onClose}>
      <section className="ngo-modal ngo-community-modal" onClick={(e) => e.stopPropagation()}>
        <button type="button" className="ngo-modal-close" onClick={onClose} aria-label="Close">
          <i className="ri-close-line" />
        </button>
        <h3>{report.title}</h3>
        <p className="muted">{report.location} • {report.date}</p>

        <div className="ngo-community-modal__meta">
          <span className={`ngo-status ngo-status--${report.priority}`}>{report.priority}</span>
          <span className={`ngo-status ngo-status--${report.status}`}>{report.status}</span>
          <span className="ngo-rate-pill">Severity: {report.estimatedSeverity}</span>
        </div>

        <p>{report.description}</p>
        <p className="muted">Affected Area: {report.affectedArea}</p>

        <div className="ngo-community-modal__images">
          {report.images.map((image) => (
            <img key={image} src={image} alt={report.title} />
          ))}
        </div>

        <h4>Status Timeline</h4>
        <ul className="clean-list ngo-community-timeline">
          {report.timeline.map((item) => (
            <li key={item}>{item}</li>
          ))}
        </ul>
      </section>
    </div>
  );
};

export default CommunityReportDetailsModal;
