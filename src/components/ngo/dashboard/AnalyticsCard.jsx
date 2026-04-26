const AnalyticsCard = ({ title, value, subtitle, accent = "green" }) => (
  <article className={`card card--lift ngo-analytics-card ngo-analytics-card--${accent}`}>
    <p className="ngo-kicker">{title}</p>
    <h3>{value}</h3>
    <p className="muted">{subtitle}</p>
  </article>
);

export default AnalyticsCard;
