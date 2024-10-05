import React from 'react';
import { Link, Route, Routes } from 'react-router-dom';
import SchoolInfo from './SchoolInfo';
import TeachersInfo from './TeachersInfo';
import AddStudents from './AddStudents';
import DeleteUser from './DeleteUser'; // Import DeleteUser component
import ManageClasses from './ManageClasses'; // Import ManageClasses component

const AdminDashboard = ({ user, onLogout }) => {
    console.log('Dashboard rendered with user:', user);

    return (
        <div className="container">
            <h2>Welcome, {user.username}!</h2>
            <button onClick={onLogout}>Logout</button>
            <nav>
                <ul>
                    <li><Link to="school-info">Info Escola</Link></li>
                    <li><Link to="teachers-info">Instrutores</Link></li>
                    <li><Link to="add-users">Adicionar Alunos</Link></li>
                    <li><Link to="delete-user">Delete User</Link></li> {/* New link for deleting a user */}
                    <li><Link to="manage-classes">Manage Classes</Link></li> {/* New link for managing classes */}
                </ul>
            </nav>
            <Routes>
                <Route path="school-info" element={<SchoolInfo />} />
                <Route path="teachers-info" element={<TeachersInfo />} />
                <Route path="add-users" element={<AddStudents />} />
                <Route path="delete-user" element={<DeleteUser />} />
                <Route path="manage-classes" element={<ManageClasses username={user.username} />} /> {/* Pass username as prop */}
            </Routes>
        </div>
    );
};

export default AdminDashboard;
