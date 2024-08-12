import React, { useState } from 'react';
import AWS from 'aws-sdk';
//const accesskey = import.meta.env.VITE_AWS_ACCESS_KEY_ID;
//const secretkey = import.meta.env.VITE_AWS_SECRET_ACCESS_KEY;

const DeleteUser = () => {
    const [name, setName] = useState('');
    const [message, setMessage] = useState('');

    // Configure AWS SDK DEV
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


    const handleDelete = async (event) => {
        event.preventDefault();

        try {
            const data = await s3.getObject(bucketParams).promise();
            let db = JSON.parse(data.Body.toString('utf-8'));

            // Remove the student
            db.users = db.users.filter(user => user.name !== name);

            // Upload the updated db.json back to S3
            const uploadParams = {
                Bucket:  bucketParams.Bucket,
                Key: bucketParams.Key,
                Body: JSON.stringify(db),
                ContentType: 'application/json'
            };

            await s3.putObject(uploadParams).promise();
            alert('Student deleted successfully');
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
