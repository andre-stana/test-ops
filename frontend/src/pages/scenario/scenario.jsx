import React, { useState, useEffect } from "react";
import "./css/scenario.css";
import Header from '../../components/header/header';
import Sidebar from '../../components/sidebar/sidebar';
import CustomNotification from '../../components/notifications/notification';
import { getReactions } from '../../hooks/reaction/getReact';
import { getActions } from '../../hooks/action/getAction';

function Scenario() {
    const [reactions, setReactions] = useState([]);
    const [actions, setActions] = useState([]);
    const [showReactionsMenu, setShowReactionsMenu] = useState(false);
    const [showActionsMenu, setShowActionsMenu] = useState(false);
    const [visibleReactionsServices, setVisibleReactionsServices] = useState({});
    const [visibleActionsServices, setVisibleActionsServices] = useState({});
    const [selectedItems, setSelectedItems] = useState([]);

    useEffect(() => {
        async function fetchReactions() {
            const reactionsData = await getReactions();
            setReactions(reactionsData || []);
        }
        fetchReactions();
    }, []);

    useEffect(() => {
        async function fetchActions() {
            const actionsData = await getActions();
            setActions(actionsData || []);
        }
        fetchActions();
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
        setSelectedItems(prevItems => [...prevItems, { ...item, type }]);
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

    const groupedReactions = groupByService(reactions);
    const groupedActions = groupByService(actions);

    return (
        <div>
            <Header className="header" />
            <div className='main-body'>
                <Sidebar className="sidebar" />
                <div className="scenario_container">
                    <div className="action-buttons">
                        <div className="area-buttons">
                            <button onClick={toggleActionsMenu}><p>↳ Actions</p></button>
                            {showActionsMenu && (
                                <ul>
                                    {Object.keys(groupedActions).map((service) => (
                                        <li key={service}>
                                            <button onClick={() => toggleServiceMenu(service, 'actions')}>↳ {service}</button>
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

                    <div className="scenario-area">
                        <input type="text" autoComplete="off" name="text" className="input" placeholder="Scenario Name" />
                        <div className="area-desc-box">
                            <label>Description</label>
                            <textarea name="description" className="area-desc"></textarea>
                            <div>
                                {selectedItems.map((item, index) => (
                                    <p key={index}>{item.type}: {item.name} (ID: {item.id})</p>
                                ))}
                            </div>
                        </div>
                    </div>

                    <div className="reaction-button">
                        <div className="area-buttons">
                            <button onClick={toggleReactionsMenu}><p>Reactions ↲</p></button>
                            {showReactionsMenu && (
                                <ul>
                                    {Object.keys(groupedReactions).map((service) => (
                                        <li key={service}>
                                            <button onClick={() => toggleServiceMenu(service, 'reactions')}>{service} ↲</button>
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
                <CustomNotification className="notification" />
            </div>
        </div>
    );
}

export default Scenario;