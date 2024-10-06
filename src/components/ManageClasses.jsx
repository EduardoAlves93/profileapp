import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Calendar, dateFnsLocalizer } from 'react-big-calendar';
import { format, parse, startOfWeek, getDay } from 'date-fns';
import 'react-big-calendar/lib/css/react-big-calendar.css';
import './ManageClasses.css'; // Make sure to import the CSS file

// Define the locales for date formatting
const locales = {
    'en-US': import('date-fns/locale/en-US'),
};

// Set up the localizer for date management
const localizer = dateFnsLocalizer({
    format,
    parse,
    startOfWeek,
    getDay,
    locales,
});

const ManageClasses = ({ username }) => {
    const [classes, setClasses] = useState([]);
    const [className, setClassName] = useState('');
    const [classTime, setClassTime] = useState('');
    const [duration, setDuration] = useState(0);
    const [maxPeople, setMaxPeople] = useState(0);

    const fetchClasses = async () => {
        try {
            const response = await axios.get('https://25p29nw5mg.execute-api.us-east-1.amazonaws.com/prod/get_classes');
            const formattedClasses = response.data.classes.map(classItem => ({
                id: classItem.classId,
                title: classItem.className, // Show only the class name
                start: new Date(classItem.classTime),
                end: new Date(new Date(classItem.classTime).getTime() + classItem.duration * 60000),
                maxPeople: classItem.maxPeople,
                availableSpots: classItem.availableSpots,
            }));
            setClasses(formattedClasses);
        } catch (error) {
            console.error('Error fetching classes:', error);
        }
    };

    const handleCreateClass = async (event) => {
        event.preventDefault();
        try {
            const response = await axios.post('https://25p29nw5mg.execute-api.us-east-1.amazonaws.com/prod/create_class', {
                className,
                classTime,
                duration,
                maxPeople,
                username
            });

            alert('Class created successfully');
            fetchClasses();
        } catch (error) {
            console.error('Error creating class:', error);
        }
    };

    useEffect(() => {
        fetchClasses();
    }, []);

    const CustomEvent = ({ event }) => (
        <div className="event">
            <strong>{event.title}</strong>
            <p className="event-time">{new Date(event.start).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</p>
            <p>{event.availableSpots} spots available</p>
        </div>
    );

    return (
        <div className="container">
            <h2>Criar Aula</h2>
            <form onSubmit={handleCreateClass}>
                <input
                    type="text"
                    placeholder="Nome da Aula"
                    value={className}
                    onChange={(e) => setClassName(e.target.value)}
                    required
                />
                <input
                    type="datetime-local"
                    value={classTime}
                    onChange={(e) => setClassTime(e.target.value)}
                    required
                />
                <input
                    type="number"
                    placeholder="Duração (minutos)"
                    value={duration}
                    onChange={(e) => setDuration(e.target.value)}
                    required
                />
                <input
                    type="number"
                    placeholder="Máximo de Pessoas"
                    value={maxPeople}
                    onChange={(e) => setMaxPeople(e.target.value)}
                    required
                />
                <button type="submit">Create Class</button>
            </form>

            <h3>Class Schedule</h3>
            <div style={{ height: 500 }}>
                <Calendar
                    localizer={localizer}
                    events={classes}
                    startAccessor="start"
                    endAccessor="end"
                    style={{ height: 500, margin: "50px" }}
                    views={['month']}
                    defaultView="month"
                    components={{
                        event: CustomEvent, // Use the custom event component
                    }}
                />
            </div>
        </div>
    );
};

export default ManageClasses;
