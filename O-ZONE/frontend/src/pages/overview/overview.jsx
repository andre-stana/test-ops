import React, { useState, useEffect } from 'react';
import Header from '../../components/header/header';
import Sidebar from '../../components/sidebar/sidebar';
import { getAreas } from '../../hooks/area/getAreas';
import "./overview.css"

function Overview() {
    const [areas, setAreas] = useState([]);

    useEffect(() => {
        const fetchAreas = async () => {
            try {
                const areasData = await getAreas();
                setAreas(areasData || []);
            } catch (error) {
                console.error('Error fetching areas:', error);
            }
        };

        fetchAreas();
    }, []);

    const recentAreas = areas.slice(-3).reverse();
    const lastArea = areas[areas.length - 1];

    return (
        <div>
            <Header className="header"/>
            <div className='main-body'>
                <Sidebar className="sidebar"/>
                <div className="overview-content">
                    <div className="overview-stats">
                        <div className="stats-creation stat-button">
                            <p className="creation-txt">Creation</p>
                            <p className="creation-nb circles circles-btn">{areas.length}</p>
                        </div>
                        <div className="stats-success stat-button">
                            <p className="success-txt">Success</p>
                            <p className="success-nb circles circles-btn">{areas.length}</p>
                        </div>
                        <div className="stats-failure stat-button">
                            <p className="failure-txt">Failure</p>
                            <p className="failure-nb circles-btn circles">0</p>
                        </div>
                    </div>
                    <div className="overview-pannels">
                        <div className="overview-controlcenter">
                            <p className="controlcenter-title center">Control Center</p>
                            <div className="controlcenter-status">
                                <div className="controlcenter-err-war">
                                    <div className="controlcenter-error controlcenter-txt center">
                                        <p>Error</p>
                                        <div className="circles"><div className="controlcenter-nb">0</div></div>
                                    </div>
                                    <div className="controlcenter-warning controlcenter-txt center">
                                        <p>Warning</p>
                                        <div className="circles"><div className="controlcenter-nb">0</div></div>
                                    </div>
                                </div>
                                <div className="controlcenter-notifications controlcenter-txt center">
                                    <p>Notifications</p>
                                    <div className="circles"><div className="controlcenter-nb">0</div></div>
                                </div>
                            </div>
                        </div>
                        <div className="overview-tasks">
                            <div className="recent-tasks tasks-center">
                                <p className="rec-task-title controlcenter-title center">Recent Tasks</p>
                                {lastArea ? (
                                    <div>
                                        <p>Name: {lastArea.name}</p>
                                    </div>
                                ) : (
                                    <p>No recent tasks</p>
                                )}
                            </div>
                            <div className="running-tasks tasks-center">
                                <p className="run-task-title controlcenter-title center">Running Tasks</p>
                                <ul>
                                    {recentAreas.map((area) => (
                                        <li key={area.id}>Name: {area.name}</li>
                                    ))}
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Overview;