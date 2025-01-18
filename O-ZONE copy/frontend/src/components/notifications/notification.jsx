import React from "react";
import NotificationCard from "./notificationCard";
import "./notification.css"

const notificationItems = [
    { id:"1", logo:"/assets/bubble_chat.svg", Time:"24/12/03 15:30", description:"Short yet instructive message"},
    { id:"2",logo:"/assets/bubble_chat.svg", Time:"24/12/03 15:32", description:"message from discord sent to mailbox"},
    { id:"3",logo:"/assets/iot.svg", Time:"24/12/03 15:32", description:"task succesfully done"},
    { id:"4",logo:"/assets/stats.svg", Time:"24/12/03 15:42", description:"New push in https://github.com/EpitechPromo2027/B-DOP-500-MLN-5-1-whahttps://github.com/EpitechPromo2027/B-DOP-500-MLN-5-1-whanos-nathan.couturierhttps://github.com/EpitechPromo2027/B-DOP-500-MLN-5-1-whanos-nathan.couturiernos-nathan.couturier"},
];

function Notification() {
    return (
        <div className="notification-menu">
            <div className="notification-container">
                <h1 className="title">Notifications</h1>
                <div className="separator"></div>
                <div className="card-grid">
                    {notificationItems.map((item) => (
                        <NotificationCard key={item.id} logo={item.logo} Time={item.Time} description={item.description} />
                    ))}
                </div>
            </div>
        </div>
    );
}

export default Notification;