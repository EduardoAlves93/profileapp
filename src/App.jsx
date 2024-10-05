import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate, useNavigate } from 'react-router-dom';
import LoginPage from './components/LoginPage';
import Dashboard from './components/Dashboard';
import AdminDashboard from './components/AdminDashboard';
import './App.css';

const App = () => {
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [user, setUser] = useState(null);
    const navigate = useNavigate();

    const handleLogin = (userData) => {
        setIsAuthenticated(true);
        setUser(userData);

        // Store user in localStorage to persist login state
        localStorage.setItem('user', JSON.stringify(userData));

        // Redirect to the appropriate dashboard
        if (userData.isAdmin) {
            navigate('/admindashboard/school-info');
        } else {
            navigate('/dashboard/school-info');
        }
    };

    const handleLogout = () => {
        setIsAuthenticated(false);
        setUser(null);
        localStorage.removeItem('user');  // Clear localStorage on logout
        navigate('/login');
    };

    // UseEffect to check and restore login state from localStorage
    useEffect(() => {
        const storedUser = localStorage.getItem('user');

        try {
            if (storedUser) {
                const parsedUser = JSON.parse(storedUser);
                setUser(parsedUser);
                setIsAuthenticated(true);

            }
        } catch (error) {
            console.error("Error parsing user data from localStorage:", error);
            localStorage.removeItem('user');  // Clear corrupt data if parsing fails
        }
    }, [navigate]);

    return (
        <Routes>
            {/* Login Route */}
            <Route
                path="/login"
                element={<LoginPage onLogin={handleLogin} />}
            />

            {/* User Dashboard Route */}
            <Route
                path="/dashboard/*"
                element={isAuthenticated ? <Dashboard user={user} onLogout={handleLogout} /> : <Navigate to="/login" />}
            />

            {/* Admin Dashboard Route */}
            <Route
                path="/admindashboard/*"
                element={isAuthenticated ? <AdminDashboard user={user} onLogout={handleLogout} /> : <Navigate to="/login" />}
            />

            {/* Fallback Route */}
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
