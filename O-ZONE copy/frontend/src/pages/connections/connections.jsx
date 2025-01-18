import React, { useState } from "react";
import "./css/connections.css";
import Header from "../../components/header/header";
import Sidebar from "../../components/sidebar/sidebar";
import CustomNotification from "../../components/notifications/notification";

function Connections({ cardHeight = "250px", cardWidth = "200px" }) {
    const [data, setData] = useState([
        { id: 1, name: "Facebook", connected: true, username: "jesuiscoach@gmail.com" },
        { id: 2, name: "Discord", connected: true, username: "jesuiscoach@gmail.com" },
        { id: 3, name: "Spotify", connected: false, username: "" },
        { id: 4, name: "X", connected: false, username: "" },
        { id: 5, name: "G-Mail", connected: false, username: "" },
        { id: 6, name: "SoundCloud", connected: false, username: "" },
        { id: 7, name: "GitHub", connected: false, username: "" },
        { id: 8, name: "Google", connected: false, username: "" },
        { id: 9, name: "deezer", connected: false, username: "" },
    ]);

    const toggleConnection = (id) => {
        setData((prev) =>
            prev.map((api) =>
                api.id === id ? { ...api, connected: !api.connected, username: api.connected ? "" : "jesuiscoach@gmail.com" } : api
            )
        );
    };

    return (
        <div>
            <Header className="header" />
            <div className="main-body">
                <Sidebar className="sidebar" />
                <div className="connections-container">
                    <div className="connections-card-grid">
                        {data.map((api) => (
                            <div
                                key={api.id}
                                className="connections-card"
                                style={{
                                    height: cardHeight,
                                    width: cardWidth,
                                }}
                            >
                                <div className="logo-placeholder">{api.name[0]}</div>
                                <h3>{api.name}</h3>
                                <p>Status: {api.connected ? "Connected" : "Disconnected"}</p>
                                {api.connected && <p>Account: {api.username}</p>}
                                <button
                                    className={api.connected ? "disconnect-btn" : "connect-btn"}
                                    onClick={() => toggleConnection(api.id)}
                                >
                                    {api.connected ? "Disconnect" : "Connect"}
                                </button>
                            </div>
                        ))}
                        <div
                            className="connections-card add-card"
                            style={{
                                height: cardHeight,
                                width: cardWidth,
                            }}
                        >
                            <div className="logo-placeholder">+</div>
                            <h3>Add</h3>
                        </div>
                    </div>
                </div>
                <CustomNotification className="notification" />
            </div>
        </div>
    );
}

export default Connections;