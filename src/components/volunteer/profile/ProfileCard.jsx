const ProfileCard = ({ profile }) => {
    return (
      <section className="profile-grid">
        <article className="card profile-main">
          <img src={profile.avatar} alt={profile.name} className="profile-avatar" />
          <h3>{profile.name}</h3>
          <p className="muted">{profile.role}</p>
          <p>{profile.bio}</p>
          <button className="btn btn--secondary">Edit Profile</button>
        </article>
  
        <article className="card">
          <h4>Contact</h4>
          <p>{profile.email}</p>
          <p>{profile.phone}</p>
          <p>{profile.city}</p>
        </article>
  
        <article className="card">
          <h4>Skills</h4>
          <div className="chip-wrap">
            {profile.skills.map((skill) => (
              <span key={skill} className="chip">{skill}</span>
            ))}
          </div>
        </article>
  
        {/* Certificates removed - AI coordination replaces certificate workflow */}
      </section>
    );
  };
  
  export default ProfileCard;