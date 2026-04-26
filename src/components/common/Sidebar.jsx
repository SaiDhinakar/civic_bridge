import { NavLink, useNavigate } from "react-router-dom";
import { sidebarData } from "../../src/data/volunteer/sidebar";

const Sidebar = ({ isOpen, onToggle, items, brand = "CivicBridge", className = "" }) => {
  const navItems = items || sidebarData.data;
  const navigate = useNavigate();

  const handleSignOut = () => {
    localStorage.removeItem("userRole");
    navigate("/");
  };

  return (
    <>
      <aside className={`sidebar ${className} ${isOpen ? "open" : ""}`}>
        <div className="sidebar__brand">
          <div className="brand-dot" />
          <span>{brand}</span>
        </div>

        <nav className="sidebar__nav">
          <div className="nav-group">
            {navItems.map((item) => (
              <NavLink
                key={item.id}
                to={item.path}
                onClick={() => isOpen && onToggle()}
                className={({ isActive }) =>
                  `sidebar__link ${isActive ? "active" : ""} ${item.highlight ? "ai-highlight" : ""}`
                }
              >
                <i className={item.icon} aria-hidden="true" />
                <span>{item.label}</span>
              </NavLink>
            ))}
          </div>

          <div className="sidebar__footer">
            <button onClick={handleSignOut} className="sidebar__link sidebar__link--logout">
              <i className="ri-logout-box-line" aria-hidden="true" />
              <span>Sign Out</span>
            </button>
          </div>
        </nav>
      </aside>

      <button className="mobile-menu-btn" onClick={onToggle} aria-label="Toggle menu">
        <span />
        <span />
        <span />
      </button>

      {isOpen && <div className="sidebar-overlay" onClick={onToggle} />}
    </>
  );
};

export default Sidebar;