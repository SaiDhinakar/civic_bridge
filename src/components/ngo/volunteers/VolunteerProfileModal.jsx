const VolunteerProfileModal = ({ volunteer, onClose }) => {
  if (!volunteer) return null;
  return (
    <div className="ngo-modal-backdrop" onClick={onClose}>
      <div className="ngo-modal" onClick={(e) => e.stopPropagation()}>
        <button type="button" className="ngo-modal-close" onClick={onClose} aria-label="Close"><i className="ri-close-line" /></button>
        <div className="ngo-modal-head">
          <img src={volunteer.avatar} alt={volunteer.name} className="ngo-avatar" />
          <div><h3>{volunteer.name}</h3><p className="muted">{volunteer.location} • {volunteer.bloodGroup}</p></div>
        </div>
        <div className="ngo-metric-grid">
          <article><p className="ngo-kicker">Completed Tasks</p><h4>{volunteer.taskCount}</h4></article>
          <article><p className="ngo-kicker">Reports Submitted</p><h4>{volunteer.reportsSubmitted}</h4></article>
          <article><p className="ngo-kicker">Impact Score</p><h4>{volunteer.impactScore}</h4></article>
        </div>
      </div>
    </div>
  );
};

export default VolunteerProfileModal;
