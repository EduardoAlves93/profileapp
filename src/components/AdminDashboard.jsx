import React from 'react';
import { Link, Route, Routes } from 'react-router-dom';
import SchoolInfo from './SchoolInfo';
import TeachersInfo from './TeachersInfo';
import ScheduleClasses from './ScheduleClasses';
import AddStudents from './AddStudents';
import DeleteUser from './DeleteUser'; // Import DeleteUser component

const AdminDashboard = ({ user, onLogout }) => {
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
                    <li><Link to="add-users">Adicionar Alunos</Link></li>
                    <li><Link to="delete-user">Delete User</Link></li> {/* New link for deleting a user */}
                </ul>
            </nav>
            <Routes>
                <Route path="school-info" element={<SchoolInfo />} />
                <Route path="teachers-info" element={<TeachersInfo />} />
                <Route path="schedule-classes" element={<ScheduleClasses />} />
                <Route path="add-users" element={<AddStudents />} />
                <Route path="delete-user" element={<DeleteUser />} /> {/* Route for DeleteUser */}
            </Routes>
        </div>
    );
};

export default AdminDashboard;
