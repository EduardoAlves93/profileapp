import React, { useState } from 'react';
import axios from 'axios';

const LoginPage = ({ onLogin }) => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState(null);

    const handleSubmit = async (event) => {
        event.preventDefault();  // Prevent default form submission behavior
        setError(null);  // Reset error state before new submission

        try {
            // Call the login API
            const response = await axios.post('https://25p29nw5mg.execute-api.us-east-1.amazonaws.com/prod/login', {
                username,
                password,
            });

            if (response.status === 200) {
                const userData = response.data.user;
                onLogin(userData);  // Call the parent function with user data
            } else {
                setError('Invalid credentials');
            }
        } catch (error) {
            console.error('Login failed:', error);
            setError('Login failed. Please try again.');
        }
    };

    return (
        <div className="container">
            <h2>Login</h2>
            <form onSubmit={handleSubmit}>
                <input
                    type="text"
                    placeholder="User Name"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
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
            {error && <p className="error">{error}</p>}
        </div>
    );
};

export default LoginPage;
