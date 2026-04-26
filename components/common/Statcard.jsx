const StatCard = ({ label, value, delta, icon }) => {
    return (
      <article className="stat-card">
        <div className="stat-card__head">
          <p className="stat-card__label">{label}</p>
          <span className="stat-card__icon" aria-hidden="true">
            <i className={icon || "ri-bar-chart-2-line"} />
          </span>
        </div>
        <h3 className="stat-card__value">{value}</h3>
        <p className="stat-card__delta">
          <i className="ri-arrow-up-s-line" aria-hidden="true" />
          {delta}
        </p>
      </article>
    );
  };
  
  export default StatCard;