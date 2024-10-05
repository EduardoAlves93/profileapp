import React from 'react';
import './TeachersInfo.css'; // Import a CSS file for styling

const TeachersInfo = () => {
    const teachers = [
        { name: "Paulo Vaz Fernandes", contact: "941 546 321" },
        { name: "Inês Vaz Fernandes", contact: "941 546 123" },
        { name: "Manuela Vaz Fernandes", contact: "941 546 441" },
        { name: "Tânia Maria", contact: "941 546 441" },
    ];

    return (
        <div className="section">
            <h2>Instrutores</h2>
            <table className="teachers-table">
                <thead>
                <tr>
                    <th>Name</th>
                    <th>Contact</th>
                </tr>
                </thead>
                <tbody>
                {teachers.map((teacher, index) => (
                    <tr key={index}>
                        <td>{teacher.name}</td>
                        <td>{teacher.contact}</td>
                    </tr>
                ))}
                </tbody>
            </table>
        </div>
    );
};

export default TeachersInfo;
