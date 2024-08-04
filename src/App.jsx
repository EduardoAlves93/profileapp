import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate, useNavigate } from 'react-router-dom';
import LoginPage from './components/LoginPage';
import Dashboard from './components/Dashboard';
import './App.css';

const App = () => {
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [user, setUser] = useState(null);
    const navigate = useNavigate();

    const handleLogin = (userData) => {
        console.log('Login successful:', userData);
        setIsAuthenticated(true);
        setUser(userData);
        navigate('/dashboard');
    };

    const handleLogout = () => {
        console.log('Logout successful');
        setIsAuthenticated(false);
        setUser(null);
        navigate('/login');
    };

    useEffect(() => {
        console.log('isAuthenticated:', isAuthenticated);
        console.log('user:', user);
    }, [isAuthenticated, user]);

    return (
        <Routes>
            <Route
                path="/login"
                element={<LoginPage onLogin={handleLogin} />}
            />
            <Route
                path="/dashboard/*"
                element={isAuthenticated ? <Dashboard user={user} onLogout={handleLogout} /> : <Navigate to="/login" />}
            />
            <Route
                path="*"
                element={<Navigate to="/login" />}
            />
        </Routes>
    );
};

const AppWrapper = () => (
    <Router>
        <App />
    </Router>
);

export default AppWrapper;
