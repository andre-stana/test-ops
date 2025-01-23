import React, { useState, useEffect } from "react";
import Header from '../../components/header/header';
import Sidebar from '../../components/sidebar/sidebar';
import { getReactions } from '../../hooks/reaction/getReact';
import { getActions } from '../../hooks/action/getAction';
import { sendArea } from '../../hooks/area/sendArea';
import { getUser } from "../../hooks/user/getUser";
import "./css/creation.css";

function Creation() {
    const [reactions, setReactions] = useState([]);
    const [actions, setActions] = useState([]);
    const [showReactionsMenu, setShowReactionsMenu] = useState(false);
    const [showActionsMenu, setShowActionsMenu] = useState(false);
    const [visibleReactionsServices, setVisibleReactionsServices] = useState({});
    const [visibleActionsServices, setVisibleActionsServices] = useState({});
    const [selectedItems, setSelectedItems] = useState([]);
    const [publishedData, setPublishedData] = useState(null);
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [user, setUser] = useState(null);

    useEffect(() => {
        const fetchData = async () => {
            const user = await getUser();

            if (!user) {
                console.error('No user data found. Please log in.');
                return;
            }

            setUser(user);

            const reactionsData = await getReactions();
            setReactions(reactionsData || []);

            const actionsData = await getActions();
            setActions(actionsData || []);
        };

        fetchData();
    }, []);

    const toggleReactionsMenu = () => {
        setShowReactionsMenu(!showReactionsMenu);
    };

    const toggleActionsMenu = () => {
        setShowActionsMenu(!showActionsMenu);
    };

    const toggleServiceMenu = (service, type) => {
        if (type === 'reactions') {
            setVisibleReactionsServices(prevState => ({
                ...prevState,
                [service]: !prevState[service]
            }));
        } else if (type === 'actions') {
            setVisibleActionsServices(prevState => ({
                ...prevState,
                [service]: !prevState[service]
            }));
        }
    };

    const handleItemClick = (item, type) => {
        setSelectedItems(prevItems => {
            const alreadySelected = prevItems.some(selectedItem => selectedItem.type === type);
            if (alreadySelected) {
                return prevItems;
            }
            return [...prevItems, { ...item, type }];
        });
    };

    const groupByService = (items) => {
        return items.reduce((acc, item) => {
            const { service } = item;
            if (!acc[service]) {
                acc[service] = [];
            }
            acc[service].push(item);
            return acc;
        }, {});
    };

    const handlePublish = async () => {
        const action = selectedItems.find(item => item.type === 'action');
        const reaction = selectedItems.find(item => item.type === 'reaction');

        const data = {
            userId: user.id,
            name: title,
            description: description,
            actionId: action.id,
            reactionId: reaction.id,
        };

        console.log('Publishing area:', data);

        setPublishedData(data);

        try {
            const result = await sendArea(data);
            if (result) {
                console.log('Area created:', result);
            } else {
                console.error('Failed to create area');
            }
        } catch (error) {
            console.error('Error:', error);
        }
    };

    const isPublishDisabled = () => {
        const action = selectedItems.find(item => item.type === 'action');
        const reaction = selectedItems.find(item => item.type === 'reaction');
        return !title || !description || !action || !reaction;
    };

    const groupedReactions = groupByService(reactions);
    const groupedActions = groupByService(actions);

    return (
        <div>
            <Header className="header" />
            <div className='main-body'>
                <Sidebar className="sidebar" />
                <div className="creation_container">
                    <div className="action-buttons">
                        <div className="area-buttons">
                            <button onClick={toggleActionsMenu}><p>Actions</p></button>
                            {showActionsMenu && (
                                <ul>
                                    {Object.keys(groupedActions).map((service) => (
                                        <li key={service}>
                                            <button onClick={() => toggleServiceMenu(service, 'actions')}>{service}</button>
                                            {visibleActionsServices[service] && (
                                                <ul>
                                                    {groupedActions[service].map((action) => (
                                                        <li key={action.id} onClick={() => handleItemClick(action, 'action')}>{action.name}</li>
                                                    ))}
                                                </ul>
                                            )}
                                        </li>
                                    ))}
                                </ul>
                            )}
                        </div>
                    </div>

                    <div className="creation-area">
                        <input
                            type="text"
                            autoComplete="off"
                            name="text"
                            className="input"
                            placeholder="Scenario Name"
                            value={title}
                            onChange={(e) => setTitle(e.target.value)}
                        />
                        <div className="area-desc-box">
                            <label>Description</label>
                            <textarea
                                name="description"
                                className="area-desc"
                                value={description}
                                onChange={(e) => setDescription(e.target.value)}
                            ></textarea>
                            <div>
                                {selectedItems.map((item, index) => (
                                    <p key={index}>{item.type}: {item.name}</p>
                                ))}
                            </div>
                        </div>
                        <button
                            onClick={handlePublish}
                            className="publish-button"
                            disabled={isPublishDisabled()}
                        >
                            Publish Area
                        </button>
                        {publishedData && (
                            <div className="published-data">
                                <h2>Published Area</h2>
                                <p><strong>Title:</strong> {publishedData.name}</p>
                                <p><strong>Description:</strong> {publishedData.description}</p>
                                <div>
                                    {selectedItems.map((item, index) => (
                                        <p key={index}>{item.type}: {item.name}</p>
                                    ))}
                                </div>
                            </div>
                        )}
                    </div>

                    <div className="reaction-button">
                        <div className="area-buttons">
                            <button onClick={toggleReactionsMenu}><p>Reactions</p></button>
                            {showReactionsMenu && (
                                <ul>
                                    {Object.keys(groupedReactions).map((service) => (
                                        <li key={service}>
                                            <button onClick={() => toggleServiceMenu(service, 'reactions')}>{service}</button>
                                            {visibleReactionsServices[service] && (
                                                <ul>
                                                    {groupedReactions[service].map((reaction) => (
                                                        <li key={reaction.id} onClick={() => handleItemClick(reaction, 'reaction')}>{reaction.name}</li>
                                                    ))}
                                                </ul>
                                            )}
                                        </li>
                                    ))}
                                </ul>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Creation;
