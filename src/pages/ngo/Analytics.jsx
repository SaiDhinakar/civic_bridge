import AnalyticsCard from "../../components/ngo/dashboard/AnalyticsCard";
import { analyticsData } from "../../data/ngo/analyticsData";

const Analytics = () => {
  const data = analyticsData.data;
  return (
    <section className="ngo-analytics-grid">
      <AnalyticsCard title="Volunteer Growth" value={`+${data.volunteerGrowth.at(-1)}%`} subtitle="Quarter-over-quarter increase" accent="blue" />
      <AnalyticsCard title="Task Completion Trend" value={`${data.taskCompletionTrend.at(-1)}%`} subtitle="Average completion success" />
      <AnalyticsCard title="Response Time" value={`${data.responseTimeHours.at(-1)} hrs`} subtitle="Median critical response window" accent="orange" />

      <article className="card card--lift">
        <h3>Top Volunteers</h3>
        <ul className="clean-list ngo-rank-list">{data.topVolunteers.map((item) => <li key={item.id}><span>{item.name}</span><strong>{item.score}</strong></li>)}</ul>
      </article>

      <article className="card card--lift">
        <h3>Category Distribution</h3>
        <div className="ngo-progress-list">
          {data.categoryDistribution.map((item) => (
            <div key={item.id}>
              <div className="ngo-progress-label"><span>{item.label}</span><span>{item.value}%</span></div>
              <div className="ngo-progress-track"><span style={{ width: `${item.value}%` }} /></div>
            </div>
          ))}
        </div>
      </article>
    </section>
  );
};

export default Analytics;
