import React, { useState } from 'react';
import axios from 'axios';
import '../App.css'; // Ensure this file exists

const LoginPage = ({ onLogin }) => {
    const [name, setName] = useState('');
    const [password, setPassword] = useState('');
    const isProduction = process.env.NODE_ENV === 'production';

    const baseURL = isProduction
        ? process.env.REACT_APP_API_BASE_URL
        : 'http://localhost:5000';

    const handleSubmit = async (event) => {
        event.preventDefault();
        try {
            const response = await axios.get(`${baseURL}/users`);
            const users = response.data;
            const user = users.find(user => user.name === name && user.password === password);

            if (user) {
                if (user.isAdmin) {
                    onLogin(user, true); // Pass `true` to indicate an admin login
                } else {
                    onLogin(user, false); // Regular user login
                }
            } else {
                alert('Invalid credentials');
            }
        } catch (error) {
            console.error('Login failed:', error);
        }
    };

    return (
        <div className="container">
            <h2>Login</h2>
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
                <button type="submit">Login</button>
            </form>
        </div>
    );
};

export default LoginPage;
