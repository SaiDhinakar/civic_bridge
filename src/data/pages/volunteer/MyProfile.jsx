import { useEffect, useState } from "react";
import PageHeader from "../../../components/common/PageHeader";
import ProfileCard from "../../../components/volunteer/profile/ProfileCard";
import { profileData } from "../../volunteer/profileData";

const MyProfile = () => {
  const [profile, setProfile] = useState(null);

  useEffect(() => {
    // Read user data from localStorage
    const userName = localStorage.getItem('userName');
    const userRole = localStorage.getItem('userRole');
    const userAvatar = localStorage.getItem('userAvatar');

    // Create a copy of profile data and update with actual user info
    const updatedProfile = JSON.parse(JSON.stringify(profileData.data));
    
    if (userName) updatedProfile.name = userName;
    if (userRole) updatedProfile.role = userRole;
    if (userAvatar) updatedProfile.avatar = userAvatar;

    setProfile(updatedProfile);
  }, []);

  if (!profile) {
    return <div>Loading...</div>;
  }

  return (
    <>
      <section className="profile-stats">
        {profile.stats.map((s) => (
          <article key={s.id} className="stat-card">
            <p className="stat-card__label">{s.label}</p>
            <h3 className="stat-card__value">{s.value}</h3>
          </article>
        ))}
      </section>
      <ProfileCard profile={profile} />
    </>
  );
};

export default MyProfile;