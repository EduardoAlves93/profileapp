import React, { useEffect, useState } from 'react';
import './StudentsDetails.css';

const StudentDashboard = ({ username }) => {
    const [studentData, setStudentData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    // Fetch student data from the Lambda endpoint
    useEffect(() => {
        const fetchStudentData = async () => {
            try {
                const response = await fetch('https://25p29nw5mg.execute-api.us-east-1.amazonaws.com/prod/get_user_details', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({ "name" : username }),
                });

                if (!response.ok) {
                    throw new Error(`Error: ${response.statusText}`);
                }

                const data = await response.json();
                setStudentData(data);
            } catch (err) {
                setError(err.message);
            } finally {
                setLoading(false);
            }
        };

        fetchStudentData();
    }, [username]);

    if (loading) {
        return <p>Loading...</p>;
    }

    if (error) {
        return <p>Error: {error}</p>;
    }

    return (
        <div className="container">
            <h2>Status</h2>
            <div className="student-info">
                <p>
                    <strong>Aulas Concluídas:</strong> {studentData.classesDone}
                </p>
                <p>
                    <strong>Aulas Necessárias:</strong> {studentData.classesNeeded}
                </p>
                <p>
                    <strong>Status do Exame:</strong> {studentData.examStatus}
                </p>
            </div>
        </div>
    );
};

export default StudentDashboard;
