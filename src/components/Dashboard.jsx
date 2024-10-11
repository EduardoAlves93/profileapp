import React from 'react';
import { Link, Route, Routes } from 'react-router-dom';
import SchoolInfo from './SchoolInfo';
import TeachersInfo from './TeachersInfo';
import ScheduleClasses from './ScheduleClasses';
import StudentDetails from "./StudentDetails.jsx";
import './Dashboard.css'; // Make sure to add custom CSS if needed

const Dashboard = ({ user, onLogout }) => {
    console.log('Dashboard rendered with user:', user);

    const tabs = [
        { label: 'Info Escola', path: 'school-info' },
        { label: 'Instrutores', path: 'teachers-info' },
        { label: 'Marcar Aulas', path: 'schedule-classes' },
        { label: 'Status', path: 'student-details' },
    ];

    return (
        <div className="container">
            <h2>Bem Vindo, {user.username}!</h2>
            <button onClick={onLogout} className="logout-btn">Logout</button>
            <nav className="dashboard-nav">
                <ul className="tab-list">
                    {tabs.map((tab, index) => (
                        <li key={index}>
                            <Link className="tab-link" to={tab.path}>
                                {tab.label}
                            </Link>
                        </li>
                    ))}
                </ul>
            </nav>

            <Routes>
                <Route path="school-info" element={<SchoolInfo />} />
                <Route path="teachers-info" element={<TeachersInfo />} />
                <Route path="schedule-classes" element={<ScheduleClasses username={user.username} />} />
                <Route path="student-details" element={<StudentDetails username={user.username} />} />
            </Routes>
        </div>
    );
};

export default Dashboard;
