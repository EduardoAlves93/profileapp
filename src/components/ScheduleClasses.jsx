import React, { useEffect, useState } from 'react';
import axios from 'axios';

const ScheduleClasses = ({ username }) => {
    const [classes, setClasses] = useState([]);
    const [enrolledClasses, setEnrolledClasses] = useState([]);
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchClasses = async () => {
            try {
                const response = await axios.get('https://25p29nw5mg.execute-api.us-east-1.amazonaws.com/prod/get_classes'); // Adjust the endpoint
                setClasses(response.data.classes); // Adjust based on the response structure
            } catch (err) {
                console.error('Error fetching classes:', err);
                setError('Failed to fetch classes.');
            }
        };

        const fetchEnrolledClasses = async () => {
            try {
                const response = await fetch(`https://25p29nw5mg.execute-api.us-east-1.amazonaws.com/prod/enrolled_classes`, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({
                        username: username
                    })
                });

                if (!response.ok) {
                    const errorData = await response.json();
                    console.error('Failed to fetch enrolled classes:', errorData);
                    setError('Failed to fetch enrolled classes.');
                    return;
                }

                const data = await response.json();
                console.log('Enrolled Classes Data:', data);
                setEnrolledClasses(data.enrolledClasses || []);
            } catch (err) {
                console.error('Error fetching enrolled classes:', err);
                setError('Failed to fetch enrolled classes.');
            }
        };

        const fetchAllData = async () => {
            setLoading(true); // Set loading to true before fetching
            await Promise.all([fetchClasses(), fetchEnrolledClasses()]);
            setLoading(false); // Set loading to false after fetching
        };

        fetchAllData();
    }, [username]); // Adding username as a dependency to refetch if it changes

    // Function to fetch enrolled classes again
    const fetchEnrolledClasses = async () => {
        try {
            const response = await fetch(`https://25p29nw5mg.execute-api.us-east-1.amazonaws.com/prod/enrolled_classes`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    username: username
                })
            });

            if (!response.ok) {
                const errorData = await response.json();
                console.error('Failed to fetch enrolled classes:', errorData);
                setError('Failed to fetch enrolled classes.');
                return;
            }

            const data = await response.json();
            console.log('Enrolled Classes Data:', data);
            setEnrolledClasses(data.enrolledClasses || []);
        } catch (err) {
            console.error('Error fetching enrolled classes:', err);
            setError('Failed to fetch enrolled classes.');
        }
    };

    const fetchClasses = async () => {
        try {
            const response = await axios.get('https://25p29nw5mg.execute-api.us-east-1.amazonaws.com/prod/get_classes'); // Adjust the endpoint
            setClasses(response.data.classes); // Adjust based on the response structure
        } catch (err) {
            console.error('Error fetching classes:', err);
            setError('Failed to fetch classes.');
        }
    };

    const handleEnroll = async (classId) => {
        try {
            const response = await fetch('https://25p29nw5mg.execute-api.us-east-1.amazonaws.com/schedule_class', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    classId: classId,
                    studentName: username, // Replace with the actual username
                }),
            });

            if (!response.ok) {
                const errorData = await response.json();
                console.error('Enrollment failed:', errorData);
                alert('Failed to enroll in class: ' + errorData.message);
                return;
            }

            const data = await response.json();
            alert(data.message);
            // Fetch both enrolled classes and available classes again after enrollment
            await Promise.all([fetchEnrolledClasses(), fetchClasses()]);
        } catch (error) {
            console.error('An error occurred:', error);
            alert('Failed to enroll in class: ' + error.message);
        }
    };

    const handleDelist = async (classId) => {
        try {
            const response = await fetch('https://25p29nw5mg.execute-api.us-east-1.amazonaws.com/unschedule_class', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    classId: classId,
                    studentName: username,
                }),
            });

            if (!response.ok) {
                const errorData = await response.json();
                console.error('Delisting failed:', errorData);
                alert('Failed to delist from class: ' + errorData.message);
                return;
            }

            const data = await response.json();
            alert(data.message);
            // Fetch enrolled classes again after delisting
            await fetchEnrolledClasses(); // Call the fetchEnrolledClasses function here
            await fetchClasses(); // Also refetch classes to update available spots
        } catch (error) {
            console.error('An error occurred:', error);
            alert('Failed to delist from class: ' + error.message);
        }
    };

    if (loading) {
        return <div>A listar aulas...</div>;
    }

    if (error) {
        return <div>{error}</div>;
    }

    return (
        <div className="section">
            <h2>Aulas Disponíveis</h2>
            {classes.length > 0 ? (
                <ul>
                    {classes.map((classItem) => (
                        <li key={classItem.classId}>
                            <div>
                                <strong>{classItem.className}</strong> <br />
                                Hora: {classItem.classTime} <br />
                                Lugares Disponíveis: {classItem.availableSpots} <br />
                                {enrolledClasses.some(enrolled => enrolled.classId === classItem.classId) ? (
                                    <button onClick={() => handleDelist(classItem.classId)}>Desmarcar</button>
                                ) : (
                                    <button onClick={() => handleEnroll(classItem.classId)}>Marcar</button>
                                )}
                            </div>
                        </li>
                    ))}
                </ul>
            ) : (
                <div>Não existem aulas a esta hora.</div>
            )}
        </div>
    );
};

export default ScheduleClasses;
