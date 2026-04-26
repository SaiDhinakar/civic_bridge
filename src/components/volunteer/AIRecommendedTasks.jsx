import React, { useEffect, useState } from "react";
import { getRecommendations, acceptRecommendation, declineRecommendation } from "../../utils/aiMatcher";

const AIRecommendedTasks = () => {
  const [recs, setRecs] = useState([]);

  useEffect(() => {
    let mounted = true;
    (async () => {
      try {
        const data = await getRecommendations(300);
        // flatten task->top match
        const flat = data.map((d) => ({ task: d.task, top: d.matches[0] }));
        if (mounted) setRecs(flat);
      } catch (e) {
        // ignore for demo
      }
    })();
    return () => {
      mounted = false;
    };
  }, []);

  const handleAccept = (taskId, volId) => {
    acceptRecommendation(taskId, volId);
    setRecs(prev => prev.map(p => p.task.id === taskId ? { ...p, top: { ...p.top, status: 'accepted' } } : p));
  };

  const handleDecline = (taskId, volId) => {
    declineRecommendation(taskId, volId);
    setRecs(prev => prev.map(p => p.task.id === taskId ? { ...p, top: { ...p.top, status: 'declined' } } : p));
  };
  return (
    <article className="card card--lift">
      <h3>AI Recommended Tasks</h3>
      <ul className="clean-list">
        {recs.map((r) => (
          <li key={r.task.id} className="task-item">
            <div>
              <p>{r.task.title}</p>
              <span className="muted">{r.task.location} • {r.task.date}</span>
            </div>
            <div className="align-right">
              <div className="muted">Match: {r.top.match}%</div>
              <div style={{marginTop:8}}>
                {r.top.status === 'accepted' ? (
                  <span className="badge">Accepted</span>
                ) : r.top.status === 'declined' ? (
                  <span className="muted">Declined</span>
                ) : (
                  <>
                    <button className="btn btn--primary" style={{marginRight:8}} onClick={() => handleAccept(r.task.id, r.top.id)}>Accept</button>
                    <button className="btn btn--ghost" onClick={() => handleDecline(r.task.id, r.top.id)}>Decline</button>
                  </>
                )}
              </div>
            </div>
          </li>
        ))}
      </ul>
    </article>
  );
};

export default AIRecommendedTasks;
