import { useLocation, useNavigate, useEffect, useState } from "react-router-dom";

const pageTitles = {
  "/volunteer/dashboard": "Volunteer Dashboard",
  "/volunteer/opportunities": "Opportunities",
  "/volunteer/report": "Submit Report",
  "/volunteer/completed": "Completed Tasks",
  "/volunteer/profile": "My Profile",
  "/ngo/dashboard": "NGO Operations Dashboard",
  "/ngo/volunteers": "Volunteer Workforce",
  "/ngo/task-board": "Task Board",
  "/ngo/post-problem": "Post Community Problem",
  "/ngo/submit-report": "Submit NGO Report",
  "/ngo/community-reports": "Community Problem Reports",
  "/ngo/analytics": "Analytics",
  "/ngo/settings": "Settings"
};

const Topbar = ({
  titlePrefix,
  subtitle,
  userName,
  userRole,
  avatarSrc
}) => {
  const location = useLocation();
  const navigate = useNavigate();
  const [displayName, setDisplayName] = useState("");
  const [role, setRole] = useState("");
  const [avatar, setAvatar] = useState("");

  // Read user data from localStorage on mount and when location changes
  useEffect(() => {
    const storedName = localStorage.getItem('userName');
    const storedRole = localStorage.getItem('userRole');
    const storedAvatar = localStorage.getItem('userAvatar');

    setDisplayName(userName || storedName || "Guest User");
    setRole(userRole || storedRole || "Volunteer");
    setAvatar(avatarSrc || storedAvatar || "https://i.pravatar.cc/88?img=12");
  }, [userName, userRole, avatarSrc]);

  const title = titlePrefix || pageTitles[location.pathname] || "CivicBridge";

  const defaultSubtitles = {
    "/ngo/dashboard": "Monitor operations, teams and civic outcomes.",
    "/volunteer/dashboard": "Track your impact and opportunities."
  };

  const resolvedSubtitle = subtitle || defaultSubtitles[location.pathname] || "";
  const isNGO = location.pathname.startsWith("/ngo");
  const isVolunteer = location.pathname.startsWith("/volunteer");

  const handleHelp = () => {
    alert("Help Center:\n1. Documentation: docs.civicbridge.org\n2. Support Email: support@civicbridge.org\n3. Emergency Hotline: 1800-CIVIC-HELP");
  };

  const handleAction = (label) => {
    if (label === "New Task") navigate("/ngo/post-problem");
    else if (label === "Report") navigate("/ngo/submit-report");
    else if (label === "Explore Tasks") navigate("/volunteer/opportunities");
    else if (label === "Submit Report") navigate("/volunteer/report");
    else alert(`${label} action initiated.`);
  };

  return (
    <header className="topbar">
      <div className="topbar__left">
        <div className="topbar__titles">
          <h1 className="topbar__title">{title}</h1>
          {resolvedSubtitle ? (
            <p className="topbar__subtitle">{resolvedSubtitle}</p>
          ) : null}
        </div>
      </div>

      <div className="topbar__right">
        <div className="topbar-actions">
          {isNGO && (
            <>
              <button className="btn btn--primary btn--sm" onClick={() => handleAction("New Task")}>+ New Task</button>
              <button className="btn btn--secondary btn--sm" onClick={() => handleAction("Report")}>Report</button>
            </>
          )}

          {isVolunteer && (
            <>
              <button className="btn btn--primary btn--sm" onClick={() => handleAction("Explore Tasks")}>Explore Tasks</button>
              <button className="btn btn--secondary btn--sm" onClick={() => handleAction("Submit Report")}>Submit Report</button>
            </>
          )}
        </div>

        <button className="icon-btn notify-btn" type="button" onClick={() => alert("No new notifications.")}>
          <i className="ri-notification-3-line" aria-hidden="true" />
          <span className="notify-badge" aria-hidden="true" />
        </button>

        <div className="topbar-user">
          <img className="topbar-user__avatar" src={avatar} alt="User avatar" />
          <div className="topbar-user__meta">
            <p className="topbar-user__greeting">{displayName}</p>
            <p className="topbar-user__role">{role}</p>
          </div>
        </div>

        <button className="btn btn--secondary help-btn" type="button" onClick={handleHelp}>Need Help</button>
      </div>
    </header>
  );
};

export default Topbar;