const ActivityFeed = ({ items }) => (
  <article className="card card--lift">
    <h3>Volunteer Activity Feed</h3>
    <ul className="clean-list ngo-activity-list">
      {items.map((item) => (
        <li key={item.id} className="ngo-activity-item">
          <img src={item.avatar} alt={item.name} className="ngo-avatar" />
          <div>
            <p>{item.name}</p>
            <p className="muted">{item.assignment}</p>
          </div>
          <span className={`ngo-status ngo-status--${item.status.toLowerCase().replace(" ", "-")}`}>{item.status}</span>
          <span className="muted">{item.updatedAt}</span>
        </li>
      ))}
    </ul>
  </article>
);

export default ActivityFeed;
