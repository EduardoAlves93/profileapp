import express from 'express';
import cors from 'cors';

const app = express();
const PORT = process.env.PORT || 5000;

const allowedOrigins = ['https://main.d2wbatuus0382b.amplifyapp.com/'];

app.use(cors({
    origin: function(origin, callback) {
        if (!origin || allowedOrigins.indexOf(origin) !== -1) {
            callback(null, true);
        } else {
            callback(new Error('Not allowed by CORS'));
        }
    }
}));

app.get('/users', (req, res) => {
    // Your logic to handle the request
    res.json([{ email: 'iinesvazfernandes@gmail.com', password: 'XPTO2024' }]);
});

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
