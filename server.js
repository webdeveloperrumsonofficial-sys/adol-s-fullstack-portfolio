const express = require('express');
const nodemailer = require('nodemailer');
const cors = require('cors');
const dotenv = require('dotenv');
const path = require('path');

dotenv.config();

const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Serve static files from root folder
app.use(express.static(__dirname));

// Homepage
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'index.html'));
});

// API test
app.get('/api/hello', (req, res) => {
    res.json({
        message: 'API working on Vercel'
    });
});

// Contact endpoint
app.post('/api/contact', async (req, res) => {
    try {
        const { name, email, message } = req.body;

        const transporter = nodemailer.createTransport({
            service: 'gmail',
            auth: {
                user: process.env.EMAIL_USER,
                pass: process.env.EMAIL_PASSWORD
            }
        });

        await transporter.sendMail({
            from: process.env.EMAIL_USER,
            to: process.env.EMAIL_USER,
            subject: `Message from ${name}`,
            html: `
                <h2>Portfolio Contact</h2>
                <p>${message}</p>
                <p>${email}</p>
            `
        });

        res.json({
            success: true
        });

    } catch (error) {
        console.log(error);

        res.status(500).json({
            error: 'Mail failed'
        });
    }
});

// LOCAL ONLY
if (process.env.NODE_ENV !== 'production') {
    const PORT = process.env.PORT || 5001;

    app.listen(PORT, () => {
        console.log(`Running on http://localhost:${PORT}`);
    });
}

// Export for Vercel
module.exports = app;
