import React, { useState } from 'react';
import axios from 'axios';

const DeleteUser = () => {
    const [username, setUsername] = useState('');
    const [error, setError] = useState(null);
    const [success, setSuccess] = useState(null);

    const handleDelete = async (event) => {
        event.preventDefault();
        setError(null);
        setSuccess(null);

        try {
            // Make an API call to your delete_user endpoint
            const response = await axios.post('https://25p29nw5mg.execute-api.us-east-1.amazonaws.com/prod/delete_user', {
                username
            });

            if (response.status === 200) {
                setSuccess('User deleted successfully');
                setUsername('');
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
            <h2>Delete User</h2>
            <form onSubmit={handleDelete}>
                <input
                    type="text"
                    placeholder="User Name"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    required
                />
                <button type="submit">Delete User</button>
            </form>
            {success && <p className="success">{success}</p>}
            {error && <p className="error">{error}</p>}
        </div>
    );
};

export default DeleteUser;
