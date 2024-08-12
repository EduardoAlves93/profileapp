import React, { useState } from 'react';
import axios from 'axios';
import AWS from 'aws-sdk';
//const accesskey = import.meta.env.VITE_AWS_ACCESS_KEY_ID;
//const secretkey = import.meta.env.VITE_AWS_SECRET_ACCESS_KEY;

const AddStudents = () => {
    const [name, setName] = useState('');
    const [password, setPassword] = useState('');

    // Configure AWS SDK
    //AWS.config.update({
    //    accessKeyId: accesskey,
    //    secretAccessKey: secretkey,  // Store securely
    //    region: 'us-east-1',  // Replace with your region
    //});

    const s3 = new AWS.S3();
    // Load the existing data from the S3 bucket
    const bucketParams = {
        Bucket: 'db-bucket-api',
        Key: 'db.json'
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        try {
            const data = await s3.getObject(bucketParams).promise();
            let db = JSON.parse(data.Body.toString('utf-8'));

            // Add the new student
            db.users.push({ name, password, isAdmin: false });

            // Upload the updated db.json back to S3
            const uploadParams = {
                Bucket: bucketParams.Bucket,
                Key: bucketParams.Key,
                Body: JSON.stringify(db),
                ContentType: 'application/json'
            };

            await s3.putObject(uploadParams).promise();
            alert('Student added successfully');
        } catch (error) {
            console.error('Failed to add student:', error);
            alert('Failed to add student');
        }
    };

    return (
        <div className="container">
            <h2>Add Student</h2>
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
                <button type="submit">Add Student</button>
            </form>
        </div>
    );
};

export default AddStudents;
