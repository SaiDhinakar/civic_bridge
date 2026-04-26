const EmptyState = ({ title, message, ctaLabel, onCta }) => {
    return (
      <div className="empty-state" role="status">
        <div className="empty-state__icon" aria-hidden="true">
          <i className="ri-inbox-archive-line" />
        </div>
        <h4>{title}</h4>
        <p>{message}</p>
        {ctaLabel ? (
          <button type="button" className="btn btn--secondary empty-state__cta" onClick={onCta}>
            {ctaLabel}
          </button>
        ) : null}
      </div>
    );
  };
  
  export default EmptyState;