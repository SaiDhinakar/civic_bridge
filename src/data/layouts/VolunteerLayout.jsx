import { useState } from "react";
import { Outlet } from "react-router-dom";
import Sidebar from "../../../components/common/Sidebar";
import Topbar from "../../../components/common/Topbar";
import "../../styles/volunteer.css";

const VolunteerLayout = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="app-shell layout--volunteer">
      <Sidebar isOpen={isOpen} onToggle={() => setIsOpen((v) => !v)} />
      <div className="main-panel">
        <Topbar />
        <main className="content">
          <div className="page-container">
            <Outlet />
          </div>
        </main>
      </div>
    </div>
  );
};

export default VolunteerLayout;