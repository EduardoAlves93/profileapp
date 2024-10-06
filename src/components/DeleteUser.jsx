import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './DeleteUser.css';

const DeleteUser = () => {
    const [users, setUsers] = useState([]); // State to store users
    const [selectedUser, setSelectedUser] = useState(''); // State for the selected user
    const [error, setError] = useState(null);
    const [success, setSuccess] = useState(null);

    useEffect(() => {
        const fetchUsers = async () => {
            try {
                const response = await axios.get('https://25p29nw5mg.execute-api.us-east-1.amazonaws.com/prod/get_students'); // Replace with your users endpoint
                setUsers(response.data.students || []);
            } catch (error) {
                console.error('Failed to fetch users:', error);
                setError('Failed to load users');
            }
        };

        fetchUsers();
    }, []);

    const handleDelete = async (event) => {
        event.preventDefault();
        setError(null);
        setSuccess(null);

        try {
            const response = await axios.post('https://25p29nw5mg.execute-api.us-east-1.amazonaws.com/prod/delete_user', {
                username: selectedUser // Use the selected user
            });

            if (response.status === 200) {
                setSuccess('User deleted successfully');
                setSelectedUser(''); // Reset selection
            } else {
                setError('Failed to delete user');
            }
        } catch (error) {
            console.error('Failed to delete user:', error);
            setError('Failed to delete user');
        }
    };

    return (
        <div className="container">
            <h2>Remover Alunos</h2>
            <form onSubmit={handleDelete}>
                <label htmlFor="users">Selecionar Aluno:</label>
                <select
                    id="users"
                    value={selectedUser}
                    onChange={(e) => setSelectedUser(e.target.value)}
                    required
                >
                    <option value="">--alunos--</option>
                    {users.map((user) => (
                        <option key={user} value={user}>
                            {user}
                        </option>
                    ))}
                </select>
                <button type="submit"> Remover Aluno</button>
            </form>
            {success && <p className="success">{success}</p>}
            {error && <p className="error">{error}</p>}
        </div>
    );
};

export default DeleteUser;
