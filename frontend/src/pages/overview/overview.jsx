import React from 'react'
import Header from '../../components/header/header';
import Sidebar from '../../components/sidebar/sidebar';
import Notification from '../../components/notifications/notification';
import "./overview.css"

function Overview() {
    return (
        <div>
            <Header className="header"/>
            <div className='main-body'>
                <Sidebar className="sidebar"/>
                <div className="overview-content">
                    <div className="overview-stats">
                        <div className="stats-scenario stat-button">
                            <p className="scenario-txt">Scenario</p>
                            <p className="scenario-nb circles circles-btn">19</p>
                        </div>
                        <div className="stats-success stat-button">
                            <p className="success-txt">Success</p>
                            <p className="success-nb circles circles-btn">3</p>
                        </div>
                        <div className="stats-failure stat-button">
                            <p className="failure-txt">Failure</p>
                            <p className="failure-nb circles-btn circles">12</p>
                        </div>
                    </div>
                    <div className="overview-pannels">
                        <div className="overview-controlcenter">
                            <p className="controlcenter-title center">Control Center</p>
                            <div className="controlcenter-status">
                                <div className="controlcenter-err-war">
                                    <div className="controlcenter-error controlcenter-txt center">
                                        <p>Error</p>
                                        <div className="circles"><div className="controlcenter-nb">19</div></div>
                                    </div>
                                    <div className="controlcenter-warning controlcenter-txt center">
                                        <p>Warning</p>
                                        <div className="circles"><div className="controlcenter-nb">3</div></div>
                                    </div>
                                </div>
                                <div className="controlcenter-notifications controlcenter-txt center">
                                    <p>Notifications</p>
                                    <div className="circles"><div className="controlcenter-nb">12</div></div>
                                </div>
                            </div>
                        </div>
                        <div className="overview-tasks">
                            <div className="recent-tasks tasks-center">
                                <p className="rec-task-title controlcenter-title center">Recent Tasks</p>
                            </div>
                            <div className="running-tasks tasks-center">
                                <p className="run-task-title controlcenter-title center">Running Tasks</p>
                            </div>
                        </div>
                    </div>
                </div>
                <Notification className="notification"/>
            </div>
        </div>
    );
}

export default Overview;