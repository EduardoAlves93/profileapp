import React, { useState } from 'react';
import '../App.css'; // Ensure this file exists
import AWS from 'aws-sdk';

//const accesskey = import.meta.env.VITE_AWS_ACCESS_KEY_ID;
//const secretkey = import.meta.env.VITE_AWS_SECRET_ACCESS_KEY;

const LoginPage = ({ onLogin }) => {
    const [name, setName] = useState('');
    const [password, setPassword] = useState('');


    const handleSubmit = async (event) => {
        event.preventDefault();
        try {
            // Configure AWS SDK DEV
            //AWS.config.update({
            //    accessKeyId: accesskey,
            //    secretAccessKey: secretkey,  // Store securely
            //    region: 'us-east-1',  // Replace with your region
            //});

            const s3 = new AWS.S3();

            // Fetch db.json from S3
            const params = {
                Bucket: 'db-bucket-api',  // Replace with your bucket name
                Key: 'db.json',  // Replace with your file key in the S3 bucket
            }
            const data = await s3.getObject(params).promise();
            const users = JSON.parse(data.Body.toString('utf-8')).users;
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
