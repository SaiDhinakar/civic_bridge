import React, { useState, useEffect } from "react";
import { getRecommendations, acceptRecommendation, declineRecommendation } from "../../../utils/aiMatcher";

const AIRecommendations = () => {
  const [recs, setRecs] = useState([]);

  useEffect(() => {
    let mounted = true;
    (async () => {
      try {
        const data = await getRecommendations(300);
        if (mounted) setRecs(data);
      } catch (e) {
        // silent for demo
      }
    })();
    return () => { mounted = false };
  }, []);

  const handleAccept = (taskId, volId) => {
    acceptRecommendation(taskId, volId);
    setRecs(prev => prev.map(p => p.task.id === taskId ? { ...p, matches: p.matches.map(m => m.id === volId ? { ...m, status: 'accepted' } : m) } : p));
  };

  const handleReject = (taskId, volId) => {
    declineRecommendation(taskId, volId);
    setRecs(prev => prev.map(p => p.task.id === taskId ? { ...p, matches: p.matches.map(m => m.id === volId ? { ...m, status: 'declined' } : m) } : p));
  };

  return (
    <section className="ai-recommendations">
      <div className="section-header">
        <h3>AI Recommendations</h3>
        <p className="muted">Compact volunteer matches prioritized by fit and proximity.</p>
      </div>

      <div className="rec-list">
        {recs.map((r) => (
          <article key={r.task.id} className="rec-card compact">
            <div className="task-header">
              <div className="task-title">{r.task.title}</div>
              <div className="task-meta muted">{r.task.location} • {r.task.urgency} • {r.task.date}</div>
            </div>

            <div className="suggestions">
              {r.matches.map((m) => (
                <div key={m.id} className={`suggestion-row ${m.status || ''}`}>
                  <img src={m.avatar} alt={m.name} className="avatar sm" />

                  <div className="suggestion-body">
                    <div className="name-line">
                      <strong className="vol-name">{m.name}</strong>
                      <span className={`match-pill ${m.match > 80 ? 'high' : m.match > 60 ? 'med' : 'low'}`}>{m.match}%</span>
                    </div>

                    <div className="meta-line muted">{m.skills.slice(0,3).join(', ')} • {m.distance} km</div>
                    <div className="ai-reason helper-text">{(m.reason && m.reason.length) ? m.reason[0] : ''}</div>
                  </div>

                  <div className="suggestion-actions">
                    {m.status === 'accepted' ? (
                      <span className="status-badge accepted">Accepted</span>
                    ) : m.status === 'declined' ? (
                      <span className="muted">Declined</span>
                    ) : (
                      <>
                        <button className="btn small primary" onClick={() => handleAccept(r.task.id, m.id)}>Accept</button>
                        <button className="btn small ghost" onClick={() => handleReject(r.task.id, m.id)}>Reject</button>
                      </>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </article>
        ))}
      </div>
    </section>
  );
};

export default AIRecommendations;
