import React, { useState } from 'react';
import axios from 'axios';
import '../App.css';

const LoginPage = ({ onLogin }) => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const handleSubmit = async (event) => {
        event.preventDefault();
        console.log('Login button clicked');
        try {
            const apiBaseUrl = process.env.REACT_APP_API_BASE_URL;
            const response = await axios.get(`${apiBaseUrl}/users`, {
                params: { email, password }
            });
            console.log('Response:', response.data);
            const user = response.data.find(user => user.email === email && user.password === password);
            if (user) {
                console.log('User found:', user);
                onLogin(user); // Call onLogin with the user data
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
                    type="email"
                    placeholder="Email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
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
