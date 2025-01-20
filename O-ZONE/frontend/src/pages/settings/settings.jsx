import React, { useEffect, useState } from "react";
import Header from '../../components/header/header';
import Sidebar from '../../components/sidebar/sidebar';
// import CustomNotification from '../../components/notifications/notification';
import { getUser } from "../../hooks/user/getUser";
import { useAuth } from "../../hooks/auth/useAuth";
import "./css/settings.css";

function Settings() {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);
    const [delayBetweenTasks, setDelayBetweenTasks] = useState(10);
    const [notificationPreferences, setNotificationPreferences] = useState({
        success: true,
        fail: true,
        update: true,
    });
    const [_, logout, __] = useAuth();

    const handleCheckboxChange = (key) => {
        setNotificationPreferences({
            ...notificationPreferences,
            [key]: !notificationPreferences[key],
        });
    };

    useEffect(() => {
        const fetchUser = async () => {
            try {
                const fetchedUser = await getUser();
                setUser(fetchedUser);
            } catch (error) {
                console.error('Error fetching user:', error);
            } finally {
                setLoading(false);
            }
        };

        fetchUser();
    }, []);

    if (loading) {
        return <div>Loading...</div>;
    }

    if (!user) {
        return <div>No user data found. Please log in.</div>;
    }


    return (
        <div>
            <Header className="header" />
            <div className="main-body">
                <Sidebar className="sidebar" />
                <div className="settings-container">

                    <div className="profile-box">
                        <h2>Profile</h2>
                        <div className="profile-picture">
                            <img
                                src={`https://api.dicebear.com/9.x/identicon/svg?seed=${user.name}`}
                                alt="Profile"
                            />
                        </div>
                        <p>
                            <strong>Username :</strong> {user.name}
                        </p>
                        <p>
                            <strong>Account :</strong> {user.email}
                        </p>
                        <button className="change-password">Change Password</button>
                        <button className="disconnect" onClick={logout}>Disconnect</button>
                    </div>

                    <div className="settings-box">
                        <h2>Global Settings</h2>
                        <div className="setting-item">
                            <label>
                                <strong>Global Mailbox :</strong>
                            </label>
                            <input
                                type="email"
                                placeholder={user.email}
                            />
                        </div>

                        <div className="setting-item">
                            <label>
                                <strong>Notification preference :</strong>
                            </label>
                            <div className="checkbox-group">
                                <label>
                                    <input
                                        type="checkbox"
                                        checked={notificationPreferences.success}
                                        onChange={() => handleCheckboxChange("success")}
                                    />
                                    Success
                                </label>
                                <label>
                                    <input
                                        type="checkbox"
                                        checked={notificationPreferences.fail}
                                        onChange={() => handleCheckboxChange("fail")}
                                    />
                                    Fail
                                </label>
                                <label>
                                    <input
                                        type="checkbox"
                                        checked={notificationPreferences.update}
                                        onChange={() => handleCheckboxChange("update")}
                                    />
                                    Update
                                </label>
                            </div>
                        </div>

                        <div className="setting-item">
                            <label>
                                <strong>Delay between tasks :</strong>
                            </label>
                            <input
                                type="number"
                                value={delayBetweenTasks}
                                onChange={(e) => setDelayBetweenTasks(e.target.value)}
                            />{" "}
                            seconds
                        </div>
                        <a href="#help" className="help-link">
                            Help
                        </a>
                    </div>
                </div>
                {/* <CustomNotification className="notification" /> */}
            </div>
        </div>
    );
}

export default Settings;
