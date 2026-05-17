const express = require('express');
const nodemailer = require('nodemailer');
const cors = require('cors');
const dotenv = require('dotenv');
const path = require('path');

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5001;

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname)));

// API Check Route
app.get('/api/hello', (req, res) => {
    res.json({ status: "API is running on vercel" });
});

// Serve frontend home page
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'index.html'));
});

// Contact form endpoint
app.post('/api/contact', async (req, res) => {
    try {
        const { name, email, message } = req.body;

        // Validate input
        if (!name || !email || !message) {
            return res.status(400).json({ error: 'All fields are required' });
        }

        // Email configuration (Moved inside the route so it safely initializes with process.env keys)
        const transporter = nodemailer.createTransport({
            service: 'gmail',
            auth: {
                user: process.env.EMAIL_USER,
                pass: process.env.EMAIL_PASSWORD // Make sure this matches your Vercel Config Key!
            }
        });

        // Email to admin
        const adminMailOptions = {
            from: process.env.EMAIL_USER,
            to: process.env.EMAIL_USER,
            subject: New Contact Form Submission from ${name},
            html: `
                <h2>New Message from Your Portfolio</h2>
                <p><strong>Name:</strong> ${name}</p>
                <p><strong>Email:</strong> ${email}</p>
                <p><strong>Message:</strong></p>
                <p>${message.replace(/\n/g, '<br>')}</p>
            `
        };

        // Email to visitor (confirmation)
        const visitorMailOptions = {
            from: process.env.EMAIL_USER,
            to: email,
            subject: 'We received your message!',
            html: `
                <h2>Thank you, ${name}!</h2>
                <p>We received your message and will get back to you as soon as possible.</p>
                <hr>
                <p><strong>Your message:</strong></p>
                <p>${message.replace(/\n/g, '<br>')}</p>
            `
        };

        // Send both emails simultaneously
        await transporter.sendMail(adminMailOptions);
        await transporter.sendMail(visitorMailOptions);

        // Success response back to your combined frontend code
        return res.status(200).json({
            success: true,
            message: 'Message sent successfully!'
        });

    } catch (error) {
        console.error('Error sending email:', error);
        return res.status(500).json({
            error: 'Failed to send message. Please try again later.'
        });
    }
});

// Health check endpoint
app.get('/api/health', (req, res) => {
    res.json({ status: 'Server is running' });
});

// Local development listener management
const server = app.listen(PORT, () => {
    console.log(Server running on http://localhost:${PORT});
});

server.on('error', (error) => {
    if (error.code === 'EADDRINUSE') {
        console.error(Port ${PORT} is already in use. Stop the existing server or change PORT in .env.);
    } else {
        console.error('Server error:', error);
    }
    process.exit(1);
});

if (process.env.NODE_ENV === 'production') {
    const PROD_PORT = 5001;
    app.listen(PROD_PORT, () => {
        console.log(Local server is running on http://localhost:${PROD_PORT});
    });
}

module.exports = app;
