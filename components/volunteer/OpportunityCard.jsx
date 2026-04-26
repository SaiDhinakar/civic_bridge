const OpportunityCard = ({ item }) => {
    return (
      <article className="card opportunity-card">
        <div className="opportunity-card__head">
          <h3>{item.title}</h3>
          <span className={`badge badge--${item.priority.toLowerCase()}`}>{item.priority}</span>
        </div>
  
        <p className="muted">{item.ngo}</p>
        <p className="muted">{item.location}</p>
        <p className="muted">Volunteers needed: {item.volunteersNeeded}</p>
  
        <button className="btn btn--primary">Apply</button>
      </article>
    );
  };
  
  export default OpportunityCard;