const express = require('express');
const cors = require('cors');

const app = express();

// Apply CORS middleware
app.use(cors({
    origin: 'https://main.d2wbatuus0382b.amplifyapp.com',
}));

// Other middlewares and routes
app.use(express.json());

// Define your routes
app.get('/api/endpoint', (req, res) => {
    res.send('Hello from the server!');
});

// Start the server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
