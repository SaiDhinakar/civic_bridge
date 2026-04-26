import { useState } from "react";
import { Outlet } from "react-router-dom";
import Sidebar from "../../components/common/Sidebar";
import Topbar from "../../components/common/Topbar";
import { ngoSidebarData } from "../data/ngo/sidebarData";

const NGOLayout = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="app-shell layout--ngo">
      <Sidebar
        isOpen={isOpen}
        onToggle={() => setIsOpen((v) => !v)}
        items={ngoSidebarData.data}
        brand="CivicBridge NGO"
        className="ngo-sidebar"
      />
      <div className="main-panel">
        <Topbar
          subtitle="Monitor operations, teams and civic outcomes in one place."
          userName="Saanvi"
          userRole="NGO Admin"
          avatarSrc="https://i.pravatar.cc/88?img=32"
        />
        <main className="content">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default NGOLayout;
