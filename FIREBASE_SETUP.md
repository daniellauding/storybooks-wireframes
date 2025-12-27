# 🔥 Firebase Setup Guide

This guide will help you set up Firebase Authentication for the Wireframe Storybook app.

## Quick Start

The app works with **two authentication modes**:
1. **Simple Password** (default) - No setup required, password: `wireframe123`
2. **Firebase Auth** - Email/password authentication through Firebase

## Firebase Setup Steps

### 1. Create a Firebase Project

1. Go to [Firebase Console](https://console.firebase.google.com/)
2. Click "Create a project" or select an existing project
3. Give your project a name (e.g., "wireframe-storybook")
4. Follow the setup wizard

### 2. Enable Authentication

1. In Firebase Console, go to **Authentication** in the left sidebar
2. Click "Get started"
3. Go to "Sign-in method" tab
4. Enable **Email/Password** authentication
5. Click "Save"

### 3. Add a Web App

1. Go to Project Settings (gear icon)
2. Under "Your apps", click "Add app" and select Web (</> icon)
3. Register your app with a nickname (e.g., "wireframe-web")
4. Copy the Firebase configuration object

### 4. Configure Environment Variables

1. Copy `.env.local.example` to `.env.local`:
   ```bash
   cp .env.local.example .env.local
   ```

2. Edit `.env.local` and add your Firebase credentials:
   ```env
   NEXT_PUBLIC_FIREBASE_API_KEY=your_actual_api_key
   NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=your-project.firebaseapp.com
   NEXT_PUBLIC_FIREBASE_PROJECT_ID=your-project-id
   NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=your-project.appspot.com
   NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=123456789
   NEXT_PUBLIC_FIREBASE_APP_ID=1:123456789:web:abc123def456
   ```

### 5. Create Your First User

#### Option A: Firebase Console (Recommended)
1. Go to Firebase Console > Authentication > Users
2. Click "Add user"
3. Enter email and password
4. Click "Add user"

#### Option B: Using Firebase CLI
```bash
# Install Firebase CLI
npm install -g firebase-tools

# Login to Firebase
firebase login

# Create user via CLI
firebase auth:import users.json --project your-project-id
```

Example `users.json`:
```json
{
  "users": [
    {
      "email": "admin@example.com",
      "password": "your-secure-password"
    }
  ]
}
```

### 6. Test the Setup

1. Restart your development server:
   ```bash
   npm run dev
   ```

2. Navigate to the login page
3. Toggle to "Firebase Auth" mode
4. Enter your email and password
5. Click "Unlock"

## Security Rules (Optional)

For production, configure Firebase Security Rules:

1. Go to Firebase Console > Firestore Database > Rules
2. Add appropriate rules for your use case

Example basic rules:
```javascript
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    match /{document=**} {
      allow read, write: if request.auth != null;
    }
  }
}
```

## Troubleshooting

### "Firebase: Error (auth/invalid-api-key)"
- Check that your API key in `.env.local` is correct
- Make sure you're using `NEXT_PUBLIC_` prefix for all Firebase env vars

### "Firebase: Error (auth/user-not-found)"
- Create a user in Firebase Console first
- Check that email/password are correct

### "Firebase: Error (auth/wrong-password)"
- Verify the password is correct
- Check if the user exists in Firebase Console

### App still using demo values
- Make sure `.env.local` file exists and has correct values
- Restart the development server after changing env vars
- Clear browser cache and reload

## Features Available with Firebase

- ✅ Email/password authentication
- ✅ Session persistence
- ✅ Secure password storage
- ✅ User management through Firebase Console
- ✅ Easy integration with other Firebase services

## Switching Between Auth Modes

The app provides a toggle on the login page to switch between:
- **Simple Password**: Quick access with hardcoded password
- **Firebase Auth**: Full authentication with email/password

This allows you to use the app immediately without Firebase setup, while having the option to enable Firebase later for production use.

## Production Deployment

For production:
1. Use Firebase Auth (not simple password)
2. Set strong passwords
3. Configure proper security rules
4. Enable additional security features (2FA, password policies, etc.)
5. Monitor authentication logs in Firebase Console

## Need Help?

- [Firebase Documentation](https://firebase.google.com/docs/auth)
- [Next.js Environment Variables](https://nextjs.org/docs/basic-features/environment-variables)
- Check the console for error messages
- Verify Firebase project settings