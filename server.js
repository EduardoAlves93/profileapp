import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
const app = express();
const PORT = process.env.PORT || 5000;
require('dotenv').config();

// Determine the environment (development or production)
const isProduction = process.env.NODE_ENV === 'production';

// CORS configuration for production
const corsOptions = {
    origin: isProduction ? 'https://main.d2wbatuus0382b.amplifyapp.com/' : 'http://localhost:5173', // Replace with your production domain
    optionsSuccessStatus: 200,
};


app.use(cors(corsOptions));
app.use(express.json());

// Initial Users Array
let users = [
    {
        name: "edu",
        password: "edu",
        isAdmin: true
    },
    {
        name: "helio",
        password: "helio",
        isAdmin: false
    }
];

// Get all users (for debugging purposes)
app.get('/users', (req, res) => {
    res.json(users);
});

// Add a new user
app.post('/users', (req, res) => {
    const { name, password, isAdmin } = req.body;

    const existingUser = users.find(user => user.name === name);
    if (existingUser) {
        return res.status(400).json({ message: 'User already exists' });
    }

    const newUser = { name, password, isAdmin: isAdmin || false };
    users.push(newUser);
    res.status(201).json(newUser);
});

// Delete a user by name
app.delete('/users/:name', (req, res) => {
    const { name } = req.params;
    const userIndex = users.findIndex(user => user.name === name);

    if (userIndex !== -1) {
        users.splice(userIndex, 1);
        res.status(200).json({ message: `User "${name}" deleted successfully.` });
    } else {
        res.status(404).json({ message: `User "${name}" not found.` });
    }
});

// Start the server
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
