import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './ConfirmPresence.css'

const ConfirmPresence = () => {
    const [pastClasses, setPastClasses] = useState([]);
    const [selectedClass, setSelectedClass] = useState(null);
    const [attendance, setAttendance] = useState({});
    const [message, setMessage] = useState('');

    useEffect(() => {
        // Fetch past classes from API
        const fetchPastClasses = async () => {
            try {
                const response = await axios.get('https://25p29nw5mg.execute-api.us-east-1.amazonaws.com/prod/get_past_classes');
                setPastClasses(response.data.past_classes);
            } catch (error) {
                console.error('Error fetching past classes:', error);
            }
        };
        fetchPastClasses();
    }, []);

    const handleClassSelect = (classId) => {
        const selected = pastClasses.find(cls => cls.classId === classId);
        setSelectedClass(selected);

        // Initialize attendance state (uncheck all students initially)
        const initialAttendance = {};
        selected.enrolledStudents.forEach(student => {
            initialAttendance[student] = false;
        });
        setAttendance(initialAttendance);
    };

    const handleCheckboxChange = (student) => {
        setAttendance(prev => ({ ...prev, [student]: !prev[student] }));
    };

    const handleSubmit = async () => {
        try {
            const presentStudents = Object.keys(attendance).filter(student => attendance[student]);

            await axios.post('https://25p29nw5mg.execute-api.us-east-1.amazonaws.com/prod/update_class_attendance', {
                classId: selectedClass.classId,
                presentStudents: presentStudents
            });

            setMessage('Attendance updated successfully');
            setSelectedClass(null); // Reset selection
        } catch (error) {
            console.error('Error updating attendance:', error);
            setMessage('Failed to update attendance');
        }
    };

    return (
        <div className="container">
            <h2>Confirm Student Presence</h2>

            {message && <p>{message}</p>}

            <div className="class-selection">
                <h3>Select a class:</h3>
                <ul>
                    {pastClasses.map(cls => (
                        <li key={cls.classId}>
                            <button onClick={() => handleClassSelect(cls.classId)}>
                                {cls.className} - {cls.classTime}
                            </button>
                        </li>
                    ))}
                </ul>
            </div>

            {selectedClass && (
                <div className="attendance-checklist">
                    <h3>Confirm Presence for {selectedClass.className}:</h3>
                    <ul>
                        {selectedClass.enrolledStudents.map(student => (
                            <li key={student}>
                                <label>
                                    <input
                                        type="checkbox"
                                        checked={attendance[student] || false}
                                        onChange={() => handleCheckboxChange(student)}
                                    />
                                    {student}
                                </label>
                            </li>
                        ))}
                    </ul>
                    <button onClick={handleSubmit}>Confirm Attendance</button>
                </div>
            )}
        </div>
    );
};

export default ConfirmPresence;
