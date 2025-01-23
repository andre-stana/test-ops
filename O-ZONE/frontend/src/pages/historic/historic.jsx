import React, { useState, useEffect } from 'react';
import "./css/historic.css";
import Header from '../../components/header/header';
import Sidebar from '../../components/sidebar/sidebar';
import { getAreas } from '../../hooks/area/getAreas';
import { getActions } from '../../hooks/action/getAction';
import { getReactions } from '../../hooks/reaction/getReact';

function Historic() {
    const [areas, setAreas] = useState([]);
    const [actions, setActions] = useState([]);
    const [reactions, setReactions] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const [areasData, actionsData, reactionsData] = await Promise.all([
                    getAreas(),
                    getActions(),
                    getReactions()
                ]);
                setAreas(areasData || []);
                setActions(actionsData || []);
                setReactions(reactionsData || []);
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };

        fetchData();
    }, []);

    const truncateText = (text, maxLength) => {
        if (text.length > maxLength) {
            return text.substring(0, maxLength) + '...';
        }
        return text;
    };

    const getActionName = (actionId) => {
        const action = actions.find(action => action.id === actionId);
        return action ? action.name : 'Unknown Action';
    };

    const getReactionName = (reactionId) => {
        const reaction = reactions.find(reaction => reaction.id === reactionId);
        return reaction ? reaction.name : 'Unknown Reaction';
    };

    return (
        <div>
            <Header className="header" />
            <div className='main-body'>
                <Sidebar className="sidebar" />
                <div className="historic_container">
                    {areas.length > 0 ? (
                        areas.map((area) => (
                            <div key={area.id} className="area-item package">
                                <div className="package2">
                                    <h3 className="text"><strong>Name<br></br></strong> {area.name}</h3>
                                    <p className="text"><strong>Description<br></br></strong> {truncateText(area.description, 150)}</p>
                                    <p className="text"><strong>Action<br></br></strong> {getActionName(area.actionId)}</p>
                                    <p className="text"><strong>Reaction<br></br></strong> {getReactionName(area.reactionId)}</p>
                                </div>
                            </div>
                        ))
                    ) : (
                        <p className="text">No areas found</p>
                    )}
                </div>
            </div>
        </div>
    )
}

export default Historic;
