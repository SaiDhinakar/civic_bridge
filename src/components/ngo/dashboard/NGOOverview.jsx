import { Link } from "react-router-dom";
import StatCard from "../../common/Statcard";
import ActivityFeed from "./ActivityFeed";
import TaskProgressBoard from "../taskboard/TaskProgressBoard";
import NotificationPanel from "../notifications/NotificationPanel";
import ResourcePanel from "./ResourcePanel";
import "../../../styles/ngo/resourcePanel.css";

const NGOOverview = ({ stats, overview, resource, activity, notifications }) => (
  <section className="ngo-dashboard">
    <section className="stats-grid">
      {stats.map((item) => <StatCard key={item.id} {...item} />)}
    </section>

    <article className="card card--lift">
      <h3>Quick Actions</h3>
      <div className="action-row">
        {overview.quickActions.map((item) => (
          <Link key={item.id} to={item.path} className="btn btn--secondary">
            <i className={item.icon} aria-hidden="true" />
            {item.label}
          </Link>
        ))}
      </div>
    </article>

    <ResourcePanel data={resource} />
    <ActivityFeed items={activity} />
    <TaskProgressBoard completionRate={overview.completionRate} categoryProgress={overview.categoryProgress} />
    <NotificationPanel notifications={notifications} />
  </section>
);

export default NGOOverview;
