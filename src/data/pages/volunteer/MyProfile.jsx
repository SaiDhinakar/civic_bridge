import PageHeader from "../../../components/common/PageHeader";
import ProfileCard from "../../../components/volunteer/profile/ProfileCard";
import { profileData } from "../../volunteer/profileData";

const MyProfile = () => {
  return (
    <>
      <section className="profile-stats">
        {profileData.data.stats.map((s) => (
          <article key={s.id} className="stat-card">
            <p className="stat-card__label">{s.label}</p>
            <h3 className="stat-card__value">{s.value}</h3>
          </article>
        ))}
      </section>
      <ProfileCard profile={profileData.data} />
    </>
  );
};

export default MyProfile;