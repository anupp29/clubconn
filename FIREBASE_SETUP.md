# Firebase Setup Guide for ClubConn

This document explains how to set up Firebase for the ClubConn platform, including Firestore security rules and database structure.

## Database Structure

### Collections

#### `users/{userId}`
Stores user profile information.

\`\`\`typescript
{
  uid: string              // Firebase Auth UID
  username: string         // Unique username (lowercase)
  displayName: string      // Display name
  email: string           // User email
  bio?: string            // User bio
  profileImage?: string   // Profile image URL
  socialLinks?: {
    linkedin?: string
    github?: string
    twitter?: string
    website?: string
  }
  achievements?: string[] // List of achievements
  joinedClubs?: string[]  // List of joined clubs
  createdAt: timestamp
  updatedAt: timestamp
}
\`\`\`

#### `usernames/{username}`
Maps usernames to user IDs for quick lookups.

\`\`\`typescript
{
  uid: string  // Firebase Auth UID of the user who owns this username
}
\`\`\`

## Firestore Security Rules

Add these security rules to your Firebase project:

\`\`\`javascript
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    
    // Helper function to check if user is authenticated
    function isSignedIn() {
      return request.auth != null;
    }
    
    // Helper function to check if user owns the document
    function isOwner(userId) {
      return isSignedIn() && request.auth.uid == userId;
    }
    
    // Users collection
    match /users/{userId} {
      // Anyone can read user profiles (public profiles)
      allow read: if true;
      
      // Only the owner can create their profile
      allow create: if isOwner(userId) 
                    && request.resource.data.uid == userId
                    && request.resource.data.username is string
                    && request.resource.data.username.size() >= 3;
      
      // Only the owner can update their profile
      allow update: if isOwner(userId)
                    && request.resource.data.uid == userId;
      
      // Only the owner can delete their profile
      allow delete: if isOwner(userId);
    }
    
    // Usernames collection (for username reservation)
    match /usernames/{username} {
      // Anyone can read to check username availability
      allow read: if true;
      
      // Only authenticated users can create username reservations
      // Username must match the one in their user profile
      allow create: if isSignedIn()
                    && request.resource.data.uid == request.auth.uid;
      
      // Only the owner can update their username reservation
      allow update: if isSignedIn()
                    && request.resource.data.uid == request.auth.uid;
      
      // Only the owner can delete their username reservation
      allow delete: if isSignedIn()
                    && resource.data.uid == request.auth.uid;
    }
  }
}
\`\`\`

## Setting Up Firestore Security Rules

1. Go to [Firebase Console](https://console.firebase.google.com/)
2. Select your project (clubconn-4da0e)
3. Navigate to **Firestore Database** in the left sidebar
4. Click on the **Rules** tab
5. Copy and paste the security rules above
6. Click **Publish**

## Authentication Setup

### Enabling Auth Providers

1. Go to **Authentication** in Firebase Console
2. Click on **Sign-in method** tab
3. Enable the following providers:
   - **Email/Password** - Enable this
   - **Google** - Enable and configure OAuth consent screen
   - **GitHub** - Enable and add GitHub OAuth App credentials

### GitHub OAuth Setup

1. Go to [GitHub Developer Settings](https://github.com/settings/developers)
2. Create a new OAuth App
3. Set Authorization callback URL to: `https://clubconn-4da0e.firebaseapp.com/__/auth/handler`
4. Copy Client ID and Client Secret to Firebase Console

### Google OAuth Setup

1. Google OAuth is automatically configured with Firebase
2. Make sure to configure the OAuth consent screen in Google Cloud Console
3. Add authorized domains in Firebase Console

## Environment Variables

The Firebase configuration is already set up in `lib/firebase.ts`. No additional environment variables are needed for the client-side Firebase SDK.

## Testing the Setup

1. **Test Authentication:**
   - Try signing up with email/password
   - Try signing in with Google
   - Try signing in with GitHub

2. **Test Username System:**
   - Create an account and choose a username
   - Try to create another account with the same username (should fail)
   - Edit your profile and change your username
   - Verify the old username is now available

3. **Test Profile Access:**
   - Visit `/u/yourusername` to see your profile
   - Sign out and visit the same URL (should show login gate)
   - Sign in and verify full profile is visible

## Database Indexes

Firestore will automatically create indexes as needed. If you encounter any errors about missing indexes, Firebase will provide a link to create them automatically.

## Backup and Maintenance

- Set up automated backups in Firebase Console under **Firestore Database > Backups**
- Monitor usage in **Firestore Database > Usage** tab
- Review security rules regularly

## Troubleshooting

### Username Already Taken Error
- Check if the username exists in the `usernames` collection
- Verify the username is properly lowercase
- Ensure the username reservation was created during signup

### Profile Not Loading
- Check Firestore security rules are published
- Verify the user document exists in the `users` collection
- Check browser console for any Firebase errors

### OAuth Sign-in Issues
- Verify OAuth providers are enabled in Firebase Console
- Check that redirect URLs are properly configured
- Ensure OAuth credentials are valid and not expired
