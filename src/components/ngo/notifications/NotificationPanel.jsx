const NotificationPanel = ({ notifications }) => (
  <article className="card card--lift">
    <h3>Notifications</h3>
    <ul className="clean-list ngo-notification-list">
      {notifications.map((item) => (
        <li key={item.id} className="ngo-notification-item">
          <span className={`ngo-dot ngo-dot--${item.type}`} aria-hidden="true" />
          <div>
            <p>{item.message}</p>
            <p className="muted">{item.time}</p>
          </div>
        </li>
      ))}
    </ul>
  </article>
);

export default NotificationPanel;
