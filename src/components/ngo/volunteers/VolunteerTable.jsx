import { useMemo, useState } from "react";

const VolunteerTable = ({ volunteers, filters, onViewProfile }) => {
  const [query, setQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState("All");
  const rows = useMemo(() => volunteers.filter((item) => {
    const q = query.toLowerCase();
    const matchQuery = item.name.toLowerCase().includes(q) || item.location.toLowerCase().includes(q) || item.skills.join(" ").toLowerCase().includes(q);
    const matchStatus = statusFilter === "All" || item.status === statusFilter;
    return matchQuery && matchStatus;
  }), [volunteers, query, statusFilter]);

  return (
    <article className="card card--lift">
      <div className="ngo-inline-head">
        <h3>Volunteer Workforce</h3>
        <div className="ngo-inline-controls">
          <label className="ngo-table-search"><i className="ri-search-line" aria-hidden="true" /><input value={query} onChange={(e) => setQuery(e.target.value)} placeholder="Search volunteers, skills, location" /></label>
          <select value={statusFilter} onChange={(e) => setStatusFilter(e.target.value)}>{filters.map((item) => <option key={item} value={item}>{item}</option>)}</select>
          <button type="button" className="btn btn--primary">Invite Volunteer</button>
        </div>
      </div>
      <div className="table-wrap">
        <table className="tasks-table">
          <thead><tr><th>Volunteer</th><th>Skills</th><th>Blood</th><th>Location</th><th>Tasks</th><th>Status</th><th>AI Match</th><th>Action</th></tr></thead>
          <tbody>
            {rows.map((item) => (
              <tr key={item.id}>
                <td><div className="ngo-name-cell"><img src={item.avatar} alt={item.name} className="ngo-avatar ngo-avatar--sm" /><span>{item.name}</span></div></td>
                <td><div className="ngo-chip-wrap">{item.skills.map((skill) => <span key={skill} className="chip">{skill}</span>)}</div></td>
                <td>{item.bloodGroup}</td><td>{item.location}</td><td>{item.taskCount}</td>
                <td><span className={`ngo-status ngo-status--${item.status.toLowerCase().replace(" ", "-")}`}>{item.status}</span></td>
                <td><span className="ngo-ai-badge">{item.aiMatch}%</span></td>
                <td><button className="btn btn--ghost" type="button" onClick={() => onViewProfile(item)}>Profile</button></td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </article>
  );
};

export default VolunteerTable;
