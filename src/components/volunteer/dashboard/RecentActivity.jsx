const RecentActivity = ({ items }) => {
    const statusIcon = {
      approved: "ri-checkbox-circle-line",
      pending: "ri-time-line",
      completed: "ri-medal-line"
    };

    return (
      <article className="card">
        <h3>Recent Activity</h3>
        <ul className="clean-list">
          {items.map((item) => (
            <li key={item.id} className="activity-item">
              <div className="activity-item__left">
                <span className="activity-icon" aria-hidden="true">
                  <i className={statusIcon[item.status] || "ri-information-line"} />
                </span>
                <div>
                  <p>{item.title}</p>
                  <span className="muted">{item.time}</span>
                </div>
              </div>
              <span className={`badge badge--${item.status}`}>{item.status}</span>
            </li>
          ))}
        </ul>
      </article>
    );
  };
  
  export default RecentActivity;