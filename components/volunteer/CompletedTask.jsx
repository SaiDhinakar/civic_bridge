const CompletedTaskTable = ({ items, isLoading }) => {
    if (isLoading) {
      return (
        <div className="table-skeleton">
          <div className="skeleton-row" />
          <div className="skeleton-row" />
          <div className="skeleton-row" />
        </div>
      );
    }
  
    return (
      <div className="table-wrap">
        <table className="tasks-table">
          <thead>
            <tr>
              <th>Task</th>
              <th>NGO</th>
              <th>Date</th>
              <th>Hours</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            {items.map((row) => (
              <tr key={row.id}>
                <td>{row.task}</td>
                <td>{row.ngo}</td>
                <td>{row.date}</td>
                <td>{row.hours}</td>
                <td>
                  <span className={`badge ${row.status === "Completed" ? "badge--success" : "badge--neutral"}`}>
                    {row.status}
                  </span>
                </td>
                {/* Certificate downloads removed */}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    );
  };
  
  export default CompletedTaskTable;