import React, { useEffect, useState } from "react";
import { ReactComponent as Logo } from '../../assets/ozone.svg';
import { ReactComponent as Chat } from '../../assets/bubble_chat.svg';
import { ReactComponent as Search } from '../../assets/search.svg';
import { getUser } from "../../hooks/user/getUser";
import "./header.css";

function Header() {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);

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

        useEffect(() => {
            const mainMenu = document.querySelector('.main-body');
            const notificationMenu = document.querySelector('.notification-menu');
            const chatButton = document.querySelector('.chat');

            const handleChatButtonClick = () => {
                if (mainMenu && notificationMenu) {
                    mainMenu.classList.toggle('two-columns');
                    notificationMenu.classList.toggle('active');
                }
            };

            if (chatButton) {
                chatButton.addEventListener('click', handleChatButtonClick);
            } else {
                console.error('chatButton not found');
            }

            // Cleanup event listener on component unmount
            return () => {
                if (chatButton) {
                    chatButton.removeEventListener('click', handleChatButtonClick);
                }
            };
        }, [user]); // Ensure this effect runs only after `user` is set and the DOM updates

    if (loading) {
        return <div>Loading...</div>;
    }

    if (!user) {
        return <div>No user data found. Please log in.</div>;
    }

    return (
        <div className="header-band">
            <Logo className="logo" alt="logo" />
            <input className="search" type="text" placeholder="Search.." />
            <Search className="glass" />
            <div className="settings">
                <img src={`https://api.dicebear.com/9.x/identicon/svg?seed=${user.name}`} className="header-profile-picture" alt="profile-picture" />
                <p>{user.name}</p>
                <Chat className="chat" alt="chat" />
            </div>
        </div>
    );
}

export default Header;
