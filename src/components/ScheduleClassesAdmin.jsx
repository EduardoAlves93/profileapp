import React, { useEffect, useState } from 'react';
import axios from 'axios';

const ScheduleClassesAdmin = () => {
    const [students, setStudents] = useState([]);
    const [classes, setClasses] = useState([]);
    const [selectedStudent, setSelectedStudent] = useState('');
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(true);
    const [enrolledClasses, setEnrolledClasses] = useState([]);

    useEffect(() => {
        // Fetch students and classes when component mounts
        const fetchStudents = async () => {
            try {
                const response = await axios.get('https://25p29nw5mg.execute-api.us-east-1.amazonaws.com/prod/get_students');
                setStudents(response.data.students || []);
            } catch (err) {
                setError('Failed to fetch students.');
            }
        };

        const fetchClasses = async () => {
            try {
                const response = await axios.get('https://25p29nw5mg.execute-api.us-east-1.amazonaws.com/prod/get_classes');
                setClasses(response.data.classes || []); // Adjust based on your response structure
            } catch (err) {
                setError('Failed to fetch classes.');
            }
        };

        const fetchEnrolledClasses = async () => {
            if (selectedStudent) {
                try {
                    const response = await fetch('https://25p29nw5mg.execute-api.us-east-1.amazonaws.com/prod/enrolled_classes', {
                        method: 'POST',
                        headers: {
                            'Content-Type': 'application/json',
                        },
                        body: JSON.stringify({
                            username: selectedStudent,
                        }),
                    });

                    if (!response.ok) {
                        throw new Error('Failed to fetch enrolled classes.');
                    }

                    const data = await response.json();
                    setEnrolledClasses(data.enrolledClasses || []);
                } catch (err) {
                    setError('Failed to fetch enrolled classes.');
                }
            }
        };

        const fetchAllData = async () => {
            setLoading(true);
            await Promise.all([fetchStudents(), fetchClasses(), fetchEnrolledClasses()]);
            setLoading(false);
        };
        fetchAllData();
    }, [selectedStudent]); // Re-run on selectedStudent change

    const handleEnroll = async (classId) => {
        try {
            const response = await fetch('https://25p29nw5mg.execute-api.us-east-1.amazonaws.com/prod/schedule_class', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    classId: classId,
                    studentName: selectedStudent,
                }),
            });

            if (!response.ok) {
                const errorData = await response.json();
                alert('Failed to enroll in class: ' + errorData.message);
                return;
            }

            // Update classes state immediately after enrolling
            setClasses(prevClasses =>
                prevClasses.map(classItem =>
                    classItem.classId === classId
                        ? {
                            ...classItem,
                            availableSpots: (parseInt(classItem.availableSpots) - 1).toString() // Convert to number, update, and convert back to string
                        }
                        : classItem
                )
            );

            alert('Class scheduled successfully!');
            // Fetch enrolled classes again after enrollment
            const response2 = await fetch('https://25p29nw5mg.execute-api.us-east-1.amazonaws.com/prod/enrolled_classes', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    username: selectedStudent,
                }),
            });
            const data = await response2.json();
            setEnrolledClasses(data.enrolledClasses || []);

        } catch (error) {
            alert('Failed to enroll in class: ' + error.message);
        }
    };

    const handleDelist = async (classId) => {
        try {
            const response = await fetch('https://25p29nw5mg.execute-api.us-east-1.amazonaws.com/prod/unschedule_class', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    classId: classId,
                    studentName: selectedStudent,
                }),
            });

            if (!response.ok) {
                const errorData = await response.json();
                alert('Failed to delist from class: ' + errorData.message);
                return;
            }

            // Update classes state immediately after delisting
            setClasses(prevClasses =>
                prevClasses.map(classItem =>
                    classItem.classId === classId
                        ? {
                            ...classItem,
                            availableSpots: (parseInt(classItem.availableSpots) + 1).toString() // Convert to number, update, and convert back to string
                        }
                        : classItem
                )
            );

            alert('Successfully delisted from class!');
            // Fetch enrolled classes again after delisting
            const response2 = await fetch('https://25p29nw5mg.execute-api.us-east-1.amazonaws.com/prod/enrolled_classes', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    username: selectedStudent,
                }),
            });
            const data = await response2.json();
            setEnrolledClasses(data.enrolledClasses || []);
        } catch (error) {
            alert('Failed to delist from class: ' + error.message);
        }
    };

    if (loading) {
        return <div>Loading classes...</div>;
    }

    if (error) {
        return <div>{error}</div>;
    }

    return (
        <div className="section">
            <h2>Marcar Aulas para Alunos</h2>
            <label htmlFor="students">Escolher Aluno:</label>
            <select
                id="students"
                value={selectedStudent}
                onChange={(e) => setSelectedStudent(e.target.value)}
            >
                <option value="">--Escolha Aluno--</option>
                {students.map((student) => (
                    <option key={student} value={student}>
                        {student}
                    </option>
                ))}
            </select>

            {selectedStudent && (
                <>
                    <h3>Aulas Disponíveis</h3>
                    <ul>
                        {classes.map((classItem) => (
                            <li key={classItem.classId}>
                                <div>
                                    <strong>{classItem.className}</strong> <br />
                                    Data/Hora: {classItem.classTime} <br />
                                    Vagas: {classItem.availableSpots} <br />
                                    {enrolledClasses.some(enrolled => enrolled.classId === classItem.classId) ? (
                                        <button onClick={() => handleDelist(classItem.classId)}>Desmarcar</button>
                                    ) : (
                                        <button onClick={() => handleEnroll(classItem.classId)}>Marcar</button>
                                    )}
                                    <strong>Estudantes Inscritos:</strong>
                                    {classItem.enrolledStudents && classItem.enrolledStudents.length > 0 ? (
                                        <ul>
                                            {classItem.enrolledStudents.map((student, index) => (
                                                <li key={index}>{student}</li>  // Display each enrolled student
                                            ))}
                                        </ul>
                                    ) : (
                                        <p>Nenhum estudante inscrito.</p>
                                    )}
                                </div>
                            </li>
                        ))}
                    </ul>
                </>
            )}
        </div>
    );
};

export default ScheduleClassesAdmin;
