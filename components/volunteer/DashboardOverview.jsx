import { Link } from "react-router-dom";
import StatCard from "../common/Statcard";
import RecentActivity from "./RecentActivity";
import OpportunityCard from "./OpportunityCard";

const DashboardOverview = ({ dashboard }) => {
  const { welcome, stats, recentActivity, upcomingTasks, quickActions, nearbyOpportunities } = dashboard;

  return (
    <section className="dashboard-grid">
      <article className="card welcome-card">
        <h2>Welcome back, {welcome.name}</h2>
        <p className="muted">{welcome.ngo}</p>
        <p>{welcome.quote}</p>
      </article>

      <section className="stats-grid" aria-label="Stats overview">
        {stats.map((stat) => (
          <StatCard key={stat.id} {...stat} />
        ))}
      </section>

      <article className="card card--lift">
        <h3>Quick Actions</h3>
        <div className="action-row">
          {quickActions.map((a) => (
            <Link key={a.id} to={a.path} className="btn btn--secondary">
              <i className={a.icon} aria-hidden="true" />
              {a.label}
            </Link>
          ))}
        </div>
      </article>

      <RecentActivity items={recentActivity} />

      <article className="card card--lift">
        <h3>Nearby Opportunities</h3>
        <div className="opportunity-preview">
          {nearbyOpportunities.map((op) => (
            <OpportunityCard key={op.id} item={op} />
          ))}
        </div>
      </article>

      <article className="card card--lift">
        <h3>Upcoming Assigned Tasks</h3>
        <ul className="clean-list">
          {upcomingTasks.map((task) => (
            <li key={task.id} className="task-item">
              <div>
                <p>{task.title}</p>
                <span className="muted">{task.ngo}</span>
              </div>
              <div className="align-right">
                <p>{task.date}</p>
                <span className="muted">{task.location}</span>
              </div>
            </li>
          ))}
        </ul>
      </article>

      {/* NGO Messages removed to declutter volunteer dashboard */}
    </section>
  );
};

export default DashboardOverview;