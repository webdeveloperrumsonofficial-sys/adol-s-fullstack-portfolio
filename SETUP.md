# Portfolio Contact Form - Node.js Setup

## Prerequisites
- Node.js (v14 or higher)
- npm

## Installation Steps

### 1. Install Dependencies
```bash
npm install
```

### 2. Gmail App Password Setup
To use Gmail for sending emails, follow these steps:

1. Go to your [Google Account](https://myaccount.google.com/)
2. Click **Security** in the left sidebar
3. Enable **2-Step Verification** (if not already enabled)
4. Scroll down and click **App passwords**
5. Select **Mail** and **Windows Computer**
6. Google will generate a 16-character password
7. Copy this password

### 3. Configure Environment Variables
Edit the `.env` file:
```
PORT=5000
EMAIL_USER=your_email@gmail.com
EMAIL_PASSWORD=your_16_char_password
```

Replace:
- `your_email@gmail.com` with your Gmail address
- `your_16_char_password` with the password from step 2

### 4. Start the Server

**Development (with auto-reload):**
```bash
npm run dev
```

**Production:**
```bash
npm start
```

The server will run on `http://localhost:5000`

## How It Works

1. User fills out the contact form on the portfolio
2. Form data is sent to the Node.js backend (`/api/contact` endpoint)
3. Backend validates the input
4. Two emails are sent:
   - **To Admin**: Notification with the visitor's message
   - **To Visitor**: Confirmation email that their message was received
5. User sees success/error message on the page

## Features

✓ Sends emails to your Gmail inbox
✓ Sends confirmation emails to visitors
✓ Form validation
✓ Error handling with user-friendly messages
✓ CORS enabled for frontend-backend communication

## Troubleshooting

**"Failed to send message" error:**
- Check that `.env` file has correct EMAIL_USER and EMAIL_PASSWORD
- Make sure Gmail 2-Step Verification is enabled
- Verify you're using an App Password, not your regular Gmail password

**Port already in use:**
- Change PORT in `.env` to a different number (e.g., 5001, 3000)

**CORS errors:**
- Make sure the server is running on the correct port
- Check that the fetch URL in HTML matches your server URL

## Production Deployment

For production, use services like:
- **Heroku** - Free tier available
- **Vercel** - Easy deployment for Node.js
- **Railway** - Simple hosting
- **Render** - Free tier with good uptime

Remember to update the form's fetch URL to match your production domain!
