import React, { useState } from 'react';
import axios from 'axios';

const AddStudents = () => {
    const [name, setName] = useState('');
    const [password, setPassword] = useState('');
    const baseURL = import.meta.env.VITE_APP_API_URL || 'http://localhost:5000';

    const handleSubmit = async (event) => {
        event.preventDefault();
        try {
            const newStudent = { name, password };
            const response = await axios.post(`${baseURL}/users`, newStudent);
            console.log('Student added:', response.data);
            alert('Student added successfully');
        } catch (error) {
            console.error('Failed to add student:', error);
            alert('Failed to add student');
        }
    };

    return (
        <div className="container">
            <h2>Add Student</h2>
            <form onSubmit={handleSubmit}>
                <input
                    type="text"
                    placeholder="User Name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    required
                />
                <input
                    type="password"
                    placeholder="Password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                />
                <button type="submit">Add Student</button>
            </form>
        </div>
    );
};

export default AddStudents;
