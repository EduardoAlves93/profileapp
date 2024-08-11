import React, { useState } from 'react';
import axios from 'axios';

const DeleteUser = () => {
    const [name, setName] = useState('');
    const [message, setMessage] = useState('');
    const baseURL = import.meta.env.VITE_APP_API_URL || 'http://localhost:5000';

    const handleDelete = async (event) => {
        event.preventDefault();

        try {
            const response = await axios.delete(`${baseURL}/users/${name}`);

            if (response.status === 200) {
                setMessage(`User "${name}" deleted successfully.`);
            } else {
                setMessage(`User "${name}" could not be deleted.`);
            }
        } catch (error) {
            console.error('Error deleting user:', error);
            setMessage('An error occurred while deleting the user.');
        }

        setName('');
    };


    return (
        <div className="container">
            <h2>Delete User</h2>
            <form onSubmit={handleDelete}>
                <input
                    type="text"
                    placeholder="User Name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    required
                />
                <button type="submit">Delete User</button>
            </form>
            {message && <p>{message}</p>}
        </div>
    );
};

export default DeleteUser;
