# Adol's Fullstack Portfolio

A modern, responsive portfolio website showcasing full-stack development skills with a working contact form.

## Features

- 🎨 Modern responsive design
- 📱 Mobile-first approach
- 📧 Working contact form with email notifications
- 🚀 Deployable to GitHub Pages (frontend) + Vercel (backend)

## Local Development

1. Clone the repository
2. Install dependencies:
   ```bash
   npm install
   ```
3. Set up environment variables in `.env`:
   ```
   EMAIL_USER=your-gmail@gmail.com
   EMAIL_PASSWORD=your-app-password
   PORT=5001
   ```
4. Start the development server:
   ```bash
   npm start
   ```
5. Open `http://localhost:5001` in your browser

## Deployment

### Frontend (GitHub Pages)
The frontend is already configured for GitHub Pages deployment.

### Backend (Vercel)
To enable the contact form on deployed sites:

1. **Deploy Backend to Vercel:**
   ```bash
   # Install Vercel CLI (if not installed)
   npm install -g vercel

   # Deploy
   vercel --prod
   ```

2. **Update Frontend Code:**
   - After deployment, Vercel will give you a URL (e.g., `https://your-project.vercel.app`)
   - Open `index.html` and replace `https://your-project-name.vercel.app` with your actual Vercel URL

3. **Redeploy Frontend:**
   - Commit and push changes to GitHub
   - The contact form will now work on your deployed site and send emails to your Gmail

## Environment Variables

Create a `.env` file in the root directory:

```env
EMAIL_USER=your-gmail@gmail.com
EMAIL_PASSWORD=your-gmail-app-password
PORT=5001
```

**Important:** Use Gmail App Passwords, not your regular password. Enable 2FA and generate an app password.

## Technologies Used

- **Frontend:** HTML5, CSS3, JavaScript
- **Backend:** Node.js, Express.js
- **Email:** Nodemailer with Gmail
- **Deployment:** GitHub Pages (frontend), Vercel (backend)

## Contact Form Features

- ✅ Sends email to your Gmail
- ✅ Sends confirmation email to visitor
- ✅ Works on both localhost and deployed sites
- ✅ Fallback to Formspree if API fails
- ✅ Input validation
- ✅ Loading states and error handling
