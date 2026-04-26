import { useMemo, useState } from "react";

const ReportsPanel = ({ history }) => {
  const [query, setQuery] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const rows = useMemo(() => history.filter((v) => v.title.toLowerCase().includes(query.toLowerCase())), [history, query]);

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setTimeout(() => {
      setIsSubmitting(false);
      alert("Report submitted successfully! It will appear in history after verification.");
      e.target.reset();
    }, 1500);
  };

  return (
    <section className="ngo-report-panel">
      <form className="card ngo-form-grid" onSubmit={handleSubmit}>
        <label><span>Report Title</span><input required placeholder="Enter report title" /></label>
        <label><span>Issue Category</span><select required><option>Environment</option><option>Healthcare</option><option>Education</option></select></label>
        <label><span>Location</span><input required placeholder="Ward / Sector" /></label>
        <label><span>Severity</span><select required><option>Low</option><option>Medium</option><option>High</option><option>Critical</option></select></label>
        <label><span>Population Affected</span><input required type="number" placeholder="e.g. 900" /></label>
        <label className="ngo-form-span"><span>Observations</span><textarea required rows={4} placeholder="Describe observations and actions" /></label>
        <label className="ngo-dropzone ngo-form-span"><span>Upload Evidence</span><input type="file" /><span>Drag and drop files, or click to browse</span></label>
        <div className="ngo-form-actions ngo-form-span">
          <button type="button" className="btn btn--ghost">Preview</button>
          <button type="submit" className="btn btn--primary" disabled={isSubmitting}>
            {isSubmitting ? <><i className="ri-loader-4-line animate-spin" /> Submitting...</> : "Submit Report"}
          </button>
        </div>
      </form>
      {/* ... rest of the component remains same ... */}


      <article className="card card--lift">
        <div className="ngo-inline-head">
          <h3>Report History</h3>
          <label className="ngo-table-search"><i className="ri-search-line" aria-hidden="true" /><input value={query} onChange={(e) => setQuery(e.target.value)} placeholder="Search reports" /></label>
        </div>
        <div className="table-wrap">
          <table className="tasks-table">
            <thead><tr><th>Title</th><th>Status</th><th>Population</th><th>Submitted</th><th>Reviewer</th></tr></thead>
            <tbody>{rows.map((item) => <tr key={item.id}><td>{item.title}</td><td><span className={`ngo-status ngo-status--${item.status.toLowerCase().replace(" ", "-")}`}>{item.status}</span></td><td>{item.population}</td><td>{item.submittedAt}</td><td>{item.reviewer}</td></tr>)}</tbody>
          </table>
        </div>
      </article>
    </section>
  );
};

export default ReportsPanel;
