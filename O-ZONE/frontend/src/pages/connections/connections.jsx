import React, { useState, useEffect } from "react";
import "./css/connections.css";
import Header from "../../components/header/header";
import Sidebar from "../../components/sidebar/sidebar";
import { getConnectedServices } from '../../hooks/services/getConnectedServices';
import { API_PORT, API_URL } from "../../config/config.js";

function Connections({ cardHeight = "250px", cardWidth = "200px" }) {
    const [data, setData] = useState([
        { id: 1, name: "Discord", connected: false, username: "" },
        { id: 2, name: "Spotify", connected: false, username: "" },
        { id: 3, name: "G-Mail", connected: false, username: "" },
        { id: 4, name: "GitHub", connected: false, username: "" },
        { id: 5, name: "Google", connected: false, username: "" },
        { id: 6, name: "Trello", connected: false, username: "" },
        { id: 7, name: "Reddit", connected: false, username: "" },
    ]);

    useEffect(() => {
        async function fetchConnectionStatus() {
            try {
                const services = await getConnectedServices();
                if (services) {
                    setData((prevData) =>
                        prevData.map((api) => {
                            const service = services.find(service => service.serviceName.toLowerCase() === api.name.toLowerCase());
                            return {
                                ...api,
                                connected: !!service,
                                username: service ? service.userId : "",
                            };
                        })
                    );
                }
            } catch (error) {
                console.error("Failed to fetch connection status:", error);
            }
        }

        fetchConnectionStatus();
    }, []);

    const toggleConnection = (id) => {
        setData((prev) =>
            prev.map((api) =>
                api.id === id ? { ...api, connected: !api.connected, username: api.connected ? "" : "jesuiscoach@gmail.com" } : api
            )
        );
    };

    const getAuthUrl = (name) => {
        switch (name.toLowerCase()) {
            case "google":
                return `${API_URL}:${API_PORT}/api/link/google`;
            case "discord":
                return `${API_URL}:${API_PORT}/api/link/discord`;
            case "spotify":
                return `${API_URL}:${API_PORT}/api/link/spotify`;
            case "github":
                return `${API_URL}:${API_PORT}/api/link/github`;
            case "g-mail":
                return `${API_URL}:${API_PORT}/api/link/google`;
            default:
                return "#";
        }
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
                                    onClick={() => {
                                        if (!api.connected) {
                                            window.location.href = getAuthUrl(api.name);
                                        } else {
                                            toggleConnection(api.id);
                                        }
                                    }}
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
            </div>
        </div>
    );
}

export default Connections;