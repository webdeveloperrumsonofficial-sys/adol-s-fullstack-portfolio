#!/bin/bash

echo "🚀 Deploying Adol's Portfolio Backend to Vercel..."

# Check if Vercel CLI is installed
if ! command -v vercel &> /dev/null; then
    echo "❌ Vercel CLI not found. Installing..."
    npm install -g vercel
fi

# Deploy to Vercel
echo "📦 Deploying to Vercel..."
vercel --prod

echo "✅ Deployment complete!"
echo "🔗 Update your frontend code with the new Vercel URL"
echo "📝 Replace 'https://your-project-name.vercel.app' in index.html with your actual Vercel URL"