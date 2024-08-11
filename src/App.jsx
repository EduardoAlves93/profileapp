import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate, useNavigate } from 'react-router-dom';
import LoginPage from './components/LoginPage';
import Dashboard from './components/Dashboard';
import AdminDashboard from "./components/AdminDashboard";
import './App.css';

const App = () => {
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [user, setUser] = useState(null);
    const navigate = useNavigate();

    const handleLogin = (userData) => {
        console.log('Login successful:', userData);
        setIsAuthenticated(true);
        setUser(userData);
        if (userData.isAdmin) {
            navigate('/admindashboard'); // Redirect to the admin dashboard
        } else {
            navigate('/dashboard'); // Redirect to the regular user dashboard
        }
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
                path="/admindashboard/*"
                element={isAuthenticated ? <AdminDashboard user={user} onLogout={handleLogout} /> : <Navigate to="/login" />}
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
