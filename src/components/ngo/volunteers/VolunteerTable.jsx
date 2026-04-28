import { useMemo, useState } from "react";

const VolunteerTable = ({ volunteers = [], filters = [], onViewProfile }) => {
  const [query, setQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState("All");
  const rows = useMemo(() => {
    if (!volunteers || volunteers.length === 0) return [];
    
    return volunteers.filter((item) => {
      if (!item) return false;
      
      const q = query.toLowerCase();
      const itemName = String(item.name || "").toLowerCase();
      
      // Handle location - could be string or object with address
      let itemLocation = "";
      if (typeof item.location === "object" && item.location !== null) {
        itemLocation = String(item.location.address || "").toLowerCase();
      } else {
        itemLocation = String(item.location || "").toLowerCase();
      }
      
      const itemSkills = Array.isArray(item.skills) ? item.skills.join(" ").toLowerCase() : "";
      
      const matchQuery = itemName.includes(q) || itemLocation.includes(q) || itemSkills.includes(q);
      const matchStatus = statusFilter === "All" || item.status === statusFilter;
      return matchQuery && matchStatus;
    });
  }, [volunteers, query, statusFilter]);

  return (
    <article className="card card--lift">
      <div className="ngo-inline-head">
        <h3>Volunteer Workforce</h3>
        <div className="ngo-inline-controls">
          <label className="ngo-table-search"><i className="ri-search-line" aria-hidden="true" /><input value={query} onChange={(e) => setQuery(e.target.value)} placeholder="Search volunteers, skills, location" /></label>
          <select value={statusFilter} onChange={(e) => setStatusFilter(e.target.value)}>
            {Array.isArray(filters) && filters.length > 0 ? (
              filters.map((item, index) => {
                // Handle both string and object formats
                const key = typeof item === "string" ? item : item?.value || item?.id || index;
                const label = typeof item === "string" ? item : item?.label || item?.value || "";
                const value = typeof item === "string" ? item : item?.value || item?.label || "";
                return <option key={key} value={value}>{label}</option>;
              })
            ) : (
              <option value="All">All</option>
            )}
          </select>
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
                <td>
                  <div className="ngo-chip-wrap">
                    {Array.isArray(item.skills) ? (
                      item.skills.map((skill, idx) => {
                        const skillText = typeof skill === "string" ? skill : skill?.name || skill?.label || "";
                        return <span key={`${item.id}-skill-${idx}`} className="chip">{skillText}</span>;
                      })
                    ) : (
                      "N/A"
                    )}
                  </div>
                </td>
                <td>{item.bloodGroup || "N/A"}</td>
                <td>{typeof item.location === "object" ? item.location?.address || "N/A" : item.location || "N/A"}</td>
                <td>{item.taskCount || 0}</td>
                <td><span className={`ngo-status ngo-status--${String(item.status || "").toLowerCase().replace(" ", "-")}`}>{item.status || "Unknown"}</span></td>
                <td><span className="ngo-ai-badge">{item.aiMatch || 0}%</span></td>
                <td><button className="btn btn--ghost" type="button" onClick={() => onViewProfile && onViewProfile(item)}>Profile</button></td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </article>
  );
};

export default VolunteerTable;
