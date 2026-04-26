const VolunteerMatchingPanel = ({ matches }) => (
  <article className="card card--lift">
    <h3>AI Volunteer Matching</h3>
    <ul className="clean-list ngo-match-list">
      {matches.map((item) => (
        <li key={item.id} className="ngo-match-item">
          <img src={item.avatar} alt={item.name} className="ngo-avatar" />
          <div>
            <p>{item.name}</p>
            <p className="muted">{item.skills.join(", ")}</p>
          </div>
          <div className="align-right">
            <p>{item.match}% match</p>
            <p className="muted">{item.distance} • {item.availability}</p>
          </div>
        </li>
      ))}
    </ul>
  </article>
);

export default VolunteerMatchingPanel;
