import React from 'react';
import { Link, Route, Routes } from 'react-router-dom';
import SchoolInfo from './SchoolInfo';
import TeachersInfo from './TeachersInfo';

const Dashboard = ({ user, onLogout }) => {
    console.log('Dashboard rendered with user:', user);

    return (
        <div className="container">
            <h2>Bem Vindo, {user.username}!</h2>
            <button onClick={onLogout}>Logout</button>
            <nav>
                <ul>
                    <li><Link to="school-info">Info Escola</Link></li>
                    <li><Link to="teachers-info">Instrutores</Link></li>
                </ul>
            </nav>
            <Routes>
                <Route path="school-info" element={<SchoolInfo />} />
                <Route path="teachers-info" element={<TeachersInfo />} />
            </Routes>
        </div>
    );
};

export default Dashboard;
