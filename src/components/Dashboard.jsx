import React from 'react';
import { Link, Route, Routes } from 'react-router-dom';
import SchoolInfo from './SchoolInfo';
import TeachersInfo from './TeachersInfo';
import ScheduleClasses from './ScheduleClasses';

const Dashboard = ({ user, onLogout }) => {
    console.log('Dashboard rendered with user:', user);

    return (
        <div className="container">
            <h2>Welcome, {user.name}!</h2>
            <button onClick={onLogout}>Logout</button>
            <nav>
                <ul>
                    <li><Link to="school-info">Info Escola</Link></li>
                    <li><Link to="teachers-info">Instrutores</Link></li>
                    <li><Link to="schedule-classes">Marcar Aulas</Link></li>
                </ul>
            </nav>
            <Routes>
                <Route path="school-info" element={<SchoolInfo />} />
                <Route path="teachers-info" element={<TeachersInfo />} />
                <Route path="schedule-classes" element={<ScheduleClasses />} />
            </Routes>
        </div>
    );
};

export default Dashboard;
