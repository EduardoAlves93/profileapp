import React from 'react';
import { Link, Route, Routes } from 'react-router-dom';
import SchoolInfo from './SchoolInfo';
import TeachersInfo from './TeachersInfo';
import AddStudents from './AddStudents';
import DeleteUser from './DeleteUser';
import ManageClasses from './ManageClasses';
import ScheduleClassesAdmin from './ScheduleClassesAdmin';
import './AdminDashboard.css';
import ConfirmPresence from "./ConfirmPresence.jsx";

const AdminDashboard = ({ user, onLogout }) => {
    const adminuser = user
    const tabs = [
        { label: 'Informação Escola', path: 'school-info' },
        { label: 'Instrutores', path: 'teachers-info' },
        { label: 'Adicionar Alunos', path: 'add-users' },
        { label: 'Remover Alunos', path: 'delete-user' },
        { label: 'Criar Aulas', path: 'manage-classes' },
        { label: 'Marcar Aulas', path: 'schedule-classes' },
        { label: 'Presenças', path: 'presence-classes' },
    ];

    return (
        <div className="container">
            <h2>Welcome, {adminuser.username}!</h2>
            <button onClick={onLogout} className="logout-btn">Logout</button>

            <nav className="admin-nav">
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
                <Route path="add-users" element={<AddStudents />} />
                <Route path="delete-user" element={<DeleteUser />} />
                <Route path="manage-classes" element={<ManageClasses username={user.username} />} />
                <Route path="schedule-classes" element={<ScheduleClassesAdmin />} />
                <Route path="presence-classes" element={<ConfirmPresence />} />
            </Routes>
        </div>
    );
};

export default AdminDashboard;
