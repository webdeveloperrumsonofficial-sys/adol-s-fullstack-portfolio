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
app.use('/assets', express.static('assets'));

// Serve Static Files
app.use('/', express.static(__dirname));

// Home Route
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'index.html'));
});

// CSS Route
app.get('/style.css', (req, res) => {
    res.sendFile(path.join(__dirname, 'style.css'));
});

// API Check Route
app.get('/api/hello', (req, res) => {
    res.json({
        success: true,
        status: 'API is running on Vercel'
    });
});

// Health Check Route
app.get('/api/health', (req, res) => {
    res.json({
        success: true,
        status: 'Server is running'
    });
});

// Contact Form Route
app.post('/api/contact', async (req, res) => {

    try {

        const { name, email, message } = req.body;

        // Validation
        if (!name || !email || !message) {

            return res.status(400).json({
                success: false,
                error: 'All fields are required'
            });
        }

        // Nodemailer Transporter
        const transporter = nodemailer.createTransport({

            service: 'gmail',

            auth: {
                user: process.env.EMAIL_USER,
                pass: process.env.EMAIL_PASSWORD
            },

            tls: {
                rejectUnauthorized: false
            }
        });

        // Verify Connection
        await transporter.verify();

        console.log('Nodemailer Ready');

        // Email To Admin
        const adminMailOptions = {

            from: `"Portfolio Contact" <${process.env.EMAIL_USER}>`,

            to: process.env.EMAIL_USER,

            subject: `New Contact Form Submission from ${name}`,

            html: `
                <div style="font-family: Arial; padding: 20px;">

                    <h2>New Portfolio Contact Message</h2>

                    <p>
                        <strong>Name:</strong> ${name}
                    </p>

                    <p>
                        <strong>Email:</strong> ${email}
                    </p>

                    <p>
                        <strong>Message:</strong>
                    </p>

                    <p>
                        ${message.replace(/\n/g, '<br>')}
                    </p>

                </div>
            `
        };

        // Confirmation Email To Visitor
        const visitorMailOptions = {

            from: `"Adol Portfolio" <${process.env.EMAIL_USER}>`,

            to: email,

            subject: 'Message Received Successfully',

            html: `
                <div style="font-family: Arial; padding: 20px;">

                    <h2>Hello ${name},</h2>

                    <p>
                        Thank you for contacting me.
                    </p>

                    <p>
                        I have received your message and will get back to you shortly.
                    </p>

                    <hr>

                    <h3>Your Message:</h3>

                    <p>
                        ${message.replace(/\n/g, '<br>')}
                    </p>

                </div>
            `
        };

        // Send Emails
        const adminResponse = await transporter.sendMail(adminMailOptions);

        console.log('Admin Email Sent:', adminResponse.messageId);

        const visitorResponse = await transporter.sendMail(visitorMailOptions);

        console.log('Visitor Email Sent:', visitorResponse.messageId);

        // Success Response
        return res.status(200).json({

            success: true,

            message: 'Message sent successfully!'
        });

    } catch (error) {

        console.error('FULL NODEMAILER ERROR:', error);

        return res.status(500).json({

            success: false,

            error: error.message || 'Failed to send message'
        });
    }
});

// Local Development Only
if (process.env.NODE_ENV !== 'production') {

    const server = app.listen(PORT, () => {

        console.log(`Local server running on http://localhost:${PORT}`);

    });

    server.on('error', (error) => {

        if (error.code === 'EADDRINUSE') {

            console.error(`Port ${PORT} is already in use.`);

        } else {

            console.error('Server error:', error);
        }

        process.exit(1);
    });
}

// Export For Vercel
module.exports = app;
