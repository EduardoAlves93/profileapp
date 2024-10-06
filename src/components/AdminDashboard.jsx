import React, { useEffect, useState } from 'react';
import { Link, Route, Routes } from 'react-router-dom';
import SchoolInfo from './SchoolInfo';
import TeachersInfo from './TeachersInfo';
import AddStudents from './AddStudents';
import DeleteUser from './DeleteUser';
import ManageClasses from './ManageClasses';
import ScheduleClassesAdmin from './ScheduleClassesAdmin'; // Import the ScheduleClasses component

const AdminDashboard = ({ user, onLogout }) => {
    const [students, setStudents] = useState([]);
    const [loadingStudents, setLoadingStudents] = useState(true);
    const [error, setError] = useState(null);

    return (
        <div className="container">
            <h2>Welcome, {user.username}!</h2>
            <button onClick={onLogout}>Logout</button>
            <nav>
                <ul>
                    <li><Link to="school-info">Info Escola</Link></li>
                    <li><Link to="teachers-info">Instrutores</Link></li>
                    <li><Link to="add-users">Adicionar Alunos</Link></li>
                    <li><Link to="delete-user">Apagar Aluno</Link></li>
                    <li><Link to="manage-classes">Criar Aulas</Link></li>
                    <li><Link to="schedule-classes">Marcar Aulas</Link></li> {/* Link to ScheduleClasses */}
                </ul>
            </nav>
            <Routes>
                <Route path="school-info" element={<SchoolInfo />} />
                <Route path="teachers-info" element={<TeachersInfo />} />
                <Route path="add-users" element={<AddStudents />} />
                <Route path="delete-user" element={<DeleteUser />} />
                <Route path="manage-classes" element={<ManageClasses username={user.username} />} />
                <Route path="schedule-classes" element={<ScheduleClassesAdmin students={students} />} /> {/* Pass students to ScheduleClasses */}
            </Routes>
        </div>
    );
};

export default AdminDashboard;
