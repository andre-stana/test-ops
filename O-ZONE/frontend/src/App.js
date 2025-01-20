import React from 'react';
import { Navigate, Route, Routes } from 'react-router-dom';
import { ProtectedRoutes } from './components/utils/ProtectedRoutes';
import Register from './pages/registration/register';
import Login from './pages/login/login';
import Overview from './pages/overview/overview';
import Creation from './pages/creation/creation';
import Settings from './pages/settings/settings';
import Connections from './pages/connections/connections';
import Historic from './pages/historic/historic';
import './App.css';

function App() {
    return (
        <div>
            <Routes>
                <Route path="/register" element={<Register />} />
                <Route path="/login" element={<Login />} />

                <Route element={<ProtectedRoutes />}>
                    <Route path="/" element={<Navigate to="/overview" replace />} />
                    <Route path="/overview" element={<Overview />} />
                    <Route path="/creation" element={<Creation />} />
                    <Route path="/historic" element={<Historic />} />
                    <Route path="/connections" element={<Connections />} />
                    <Route path="/settings" element={<Settings />} />
                </Route>
            </Routes>
        </div>
    );
}

export default App;
