import React from "react";
import "./sidebar.css";
import { ReactComponent as OverviewIcon } from "../../assets/overview.svg";
import { ReactComponent as ScenarioIcon } from "../../assets/iot.svg";
import { ReactComponent as TemplateIcon } from "../../assets/template.svg";
import { ReactComponent as ConnectionsIcon } from "../../assets/connection.svg";
import { ReactComponent as StatisticsIcon } from "../../assets/stats.svg";
import { ReactComponent as SettingsIcon } from "../../assets/settings.svg";
import { useLocation, useNavigate } from "react-router-dom";

function Sidebar() {
  const { pathname } = useLocation();
  const navigate = useNavigate();

  const sidebarItems = [
    { icon: <OverviewIcon className="sidebar-icon" />, text: "Overview", path: "/overview" },
    { icon: <ScenarioIcon className="sidebar-icon scenario-icon" />, text: "Scenario", path: "/scenario" },
    { icon: <TemplateIcon className="sidebar-icon" />, text: "Template", path: "/template" },
    { icon: <ConnectionsIcon className="sidebar-icon" />, text: "Connections", path: "/connections" },
    // { icon: <StatisticsIcon className="sidebar-icon" />, text: "Statistics", path: "/statistics" },
    { icon: <SettingsIcon className="sidebar-icon" />, text: "Settings", path: "/settings" },
  ];

  const handleLogout = () => {
    navigate("/");
  };

  return (
    <div className="sidebar">
      <ul>
        {sidebarItems.map((item, index) => (
          <li key={index} onClick={() => navigate(item.path)} className={pathname === item.path ? 'active' : ''}>
            {item.icon}
            <span>{item.text}</span>
          </li>
        ))}
      </ul>
      <div className="logout-button" onClick={handleLogout}>
        Logout
      </div>
    </div>
  );
}

export default Sidebar;