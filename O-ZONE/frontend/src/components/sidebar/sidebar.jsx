import React from "react";
import "./sidebar.css";
import { ReactComponent as OverviewIcon } from "../../assets/overview.svg";
import { ReactComponent as CreationIcon } from "../../assets/iot.svg";
import { ReactComponent as HistoricIcon } from "../../assets/historic.svg";
import { ReactComponent as ConnectionsIcon } from "../../assets/connection.svg";
import { ReactComponent as SettingsIcon } from "../../assets/settings.svg";
import { useLocation, useNavigate } from "react-router-dom";
import { useAuth } from "../../hooks/auth/useAuth";

function Sidebar() {
  const { pathname } = useLocation();
  const navigate = useNavigate();
  const [, logout,] = useAuth();

  const sidebarItems = [
    { icon: <OverviewIcon className="sidebar-icon" />, text: "Overview", path: "/overview" },
    { icon: <CreationIcon className="sidebar-icon creation-icon" />, text: "Creation", path: "/creation" },
    { icon: <HistoricIcon className="sidebar-icon" />, text: "Historic", path: "/historic" },
    { icon: <ConnectionsIcon className="sidebar-icon" />, text: "Connections", path: "/connections" },
    { icon: <SettingsIcon className="sidebar-icon" />, text: "Settings", path: "/settings" },
  ];

  const handleLogout = () => {
    logout();
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