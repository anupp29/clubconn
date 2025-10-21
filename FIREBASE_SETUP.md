# 🔥 Firebase Setup Guide for ClubConn

This comprehensive guide will walk you through setting up Firebase for the ClubConn platform, including Authentication, Firestore Database, Security Rules, and local development configuration.

---

## 📋 Table of Contents

1. [Prerequisites](#prerequisites)
2. [Creating a Firebase Project](#creating-a-firebase-project)
3. [Firebase Authentication Setup](#firebase-authentication-setup)
4. [Firestore Database Setup](#firestore-database-setup)
5. [Security Rules](#security-rules)
6. [Local Development Setup](#local-development-setup)
7. [Firebase Emulator Setup](#firebase-emulator-setup)
8. [Database Structure](#database-structure)
9. [Testing Your Setup](#testing-your-setup)
10. [Troubleshooting](#troubleshooting)

---

## ✅ Prerequisites

Before you begin, make sure you have:

- A Google account
- Node.js 18+ installed
- npm or yarn package manager
- Basic understanding of Firebase services
- ClubConn project cloned locally

---

## 🆕 Creating a Firebase Project

### Step 1: Go to Firebase Console

1. Navigate to [Firebase Console](https://console.firebase.google.com/)
2. Click on **"Add project"** or **"Create a project"**

### Step 2: Configure Your Project

1. **Project Name**
   - Enter: `ClubConn` (or your preferred name)
   - Note: Firebase will generate a unique project ID (e.g., `clubconn-xxxxx`)
   - Click **Continue**

2. **Google Analytics** (Optional but recommended)
   - Toggle **Enable Google Analytics** (recommended for production)
   - Click **Continue**

3. **Analytics Account**
   - Select an existing account or create a new one
   - Accept the terms
   - Click **Create project**

4. **Wait for Setup**
   - Firebase will take 30-60 seconds to create your project
   - Click **Continue** when ready

### Step 3: Register Your Web App

1. In your Firebase project dashboard, click the **Web icon** (`</>`)
2. **Register app**:
   - App nickname: `ClubConn Web`
   - ✅ Check **"Also set up Firebase Hosting"** (optional)
   - Click **Register app**

3. **Add Firebase SDK**
   - Copy the Firebase configuration object
   - You'll need this later for `lib/firebase.ts`
   - Click **Continue to console**

---

## 🔐 Firebase Authentication Setup

### Step 1: Enable Authentication

1. In Firebase Console, click **Authentication** in the left sidebar
2. Click **Get started**
3. You'll see the **Sign-in method** tab

### Step 2: Enable Email/Password Authentication

1. Click on **Email/Password** provider
2. Toggle **Enable** to ON
3. Leave **Email link (passwordless sign-in)** OFF (unless you want it)
4. Click **Save**

### Step 3: Enable Google Authentication

1. Click on **Google** provider
2. Toggle **Enable** to ON
3. **Project support email**: Select your email from dropdown
4. Click **Save**

### Step 4: Enable GitHub Authentication

1. **Create GitHub OAuth App** first:
   - Go to [GitHub Developer Settings](https://github.com/settings/developers)
   - Click **New OAuth App**
   - Fill in:
     - **Application name**: ClubConn
     - **Homepage URL**: `http://localhost:3000` (for development)
     - **Authorization callback URL**: Get this from Firebase (next step)
   - Click **Register application**
   - Copy the **Client ID**
   - Click **Generate a new client secret** and copy it

2. **Configure in Firebase**:
   - Back in Firebase Console, click on **GitHub** provider
   - Toggle **Enable** to ON
   - Copy the **Authorization callback URL** from Firebase
   - Go back to GitHub OAuth App and update the callback URL
   - Paste **Client ID** and **Client Secret** from GitHub into Firebase
   - Click **Save**

### Step 5: Configure Authorized Domains

1. In Authentication, go to **Settings** tab
2. Scroll to **Authorized domains**
3. Add your domains:
   - `localhost` (already added)
   - Your production domain (e.g., `clubconn.vercel.app`)
   - Click **Add domain** for each

---

## 🗄️ Firestore Database Setup

### Step 1: Create Firestore Database

1. In Firebase Console, click **Firestore Database** in the left sidebar
2. Click **Create database**

### Step 2: Choose Security Rules Mode

1. Select **Start in production mode** (we'll add custom rules next)
2. Click **Next**

### Step 3: Choose Location

1. Select a Cloud Firestore location closest to your users
   - For India: `asia-south1` (Mumbai)
   - For US: `us-central1`
   - **Note**: This cannot be changed later!
2. Click **Enable**

### Step 4: Wait for Database Creation

- Firestore will take 1-2 minutes to provision
- Once ready, you'll see the Firestore console

---

## 🔒 Security Rules

### Understanding Firestore Security Rules

Security rules control who can read and write data in your Firestore database. ClubConn uses a comprehensive set of rules to ensure data security.

### Step 1: Navigate to Rules

1. In **Firestore Database**, click the **Rules** tab
2. You'll see the default rules

### Step 2: Add ClubConn Security Rules

Replace the default rules with the following:

\`\`\`javascript
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    
    // ============================================
    // HELPER FUNCTIONS
    // ============================================
    
    // Check if user is authenticated
    function isSignedIn() {
      return request.auth != null;
    }
    
    // Check if user owns the document
    function isOwner(userId) {
      return isSignedIn() && request.auth.uid == userId;
    }
    
    // Check if user is admin
    function isAdmin() {
      return isSignedIn() && 
             exists(/databases/$(database)/documents/admins/$(request.auth.uid));
    }
    
    // Check if user is club admin
    function isClubAdmin(clubId) {
      return isSignedIn() && 
             exists(/databases/$(database)/documents/clubs/$(clubId)/admins/$(request.auth.uid));
    }
    
    // Validate username format
    function isValidUsername(username) {
      return username.size() >= 3 && 
             username.size() <= 30 && 
             username.matches('^[a-z0-9_]+$');
    }
    
    // ============================================
    // USERS COLLECTION
    // ============================================
    
    match /users/{userId} {
      // Anyone can read user profiles (public profiles)
      allow read: if true;
      
      // Only authenticated users can create their own profile
      allow create: if isOwner(userId) 
                    && request.resource.data.uid == userId
                    && request.resource.data.username is string
                    && isValidUsername(request.resource.data.username)
                    && request.resource.data.email is string
                    && request.resource.data.displayName is string;
      
      // Only the owner can update their profile
      allow update: if isOwner(userId)
                    && request.resource.data.uid == userId
                    && (!('username' in request.resource.data) || 
                        isValidUsername(request.resource.data.username));
      
      // Only the owner or admin can delete their profile
      allow delete: if isOwner(userId) || isAdmin();
    }
    
    // ============================================
    // USERNAMES COLLECTION (for username reservation)
    // ============================================
    
    match /usernames/{username} {
      // Anyone can read to check username availability
      allow read: if true;
      
      // Only authenticated users can create username reservations
      allow create: if isSignedIn()
                    && request.resource.data.uid == request.auth.uid
                    && isValidUsername(username);
      
      // Only the owner can update their username reservation
      allow update: if isSignedIn()
                    && request.resource.data.uid == request.auth.uid;
      
      // Only the owner can delete their username reservation
      allow delete: if isSignedIn()
                    && resource.data.uid == request.auth.uid;
    }
    
    // ============================================
    // CLUBS COLLECTION
    // ============================================
    
    match /clubs/{clubId} {
      // Anyone can read club information
      allow read: if true;
      
      // Only admins can create clubs
      allow create: if isAdmin();
      
      // Only club admins or platform admins can update
      allow update: if isClubAdmin(clubId) || isAdmin();
      
      // Only platform admins can delete clubs
      allow delete: if isAdmin();
      
      // Club admins subcollection
      match /admins/{adminId} {
        allow read: if true;
        allow write: if isClubAdmin(clubId) || isAdmin();
      }
      
      // Club members subcollection
      match /members/{memberId} {
        allow read: if true;
        allow create: if isSignedIn();
        allow delete: if isOwner(memberId) || isClubAdmin(clubId) || isAdmin();
      }
    }
    
    // ============================================
    // EVENTS COLLECTION
    // ============================================
    
    match /events/{eventId} {
      // Anyone can read events
      allow read: if true;
      
      // Club admins can create events for their club
      allow create: if isSignedIn() && 
                    (isClubAdmin(request.resource.data.clubId) || isAdmin());
      
      // Club admins can update their club's events
      allow update: if isSignedIn() && 
                    (isClubAdmin(resource.data.clubId) || isAdmin());
      
      // Only admins can delete events
      allow delete: if isAdmin();
      
      // Event RSVPs subcollection
      match /rsvps/{userId} {
        allow read: if true;
        allow create: if isSignedIn();
        allow delete: if isOwner(userId) || isAdmin();
      }
      
      // Event volunteers subcollection
      match /volunteers/{userId} {
        allow read: if true;
        allow create: if isSignedIn();
        allow update: if isOwner(userId) || isClubAdmin(resource.data.clubId) || isAdmin();
        allow delete: if isOwner(userId) || isAdmin();
      }
    }
    
    // ============================================
    // COMMUNITIES COLLECTION
    // ============================================
    
    match /communities/{communityId} {
      // Anyone can read communities
      allow read: if true;
      
      // Only admins can write to communities
      allow write: if isAdmin();
    }
    
    // ============================================
    // CERTIFICATES COLLECTION
    // ============================================
    
    match /certificates/{certificateId} {
      // Anyone can read certificates (for verification)
      allow read: if true;
      
      // Only club admins or platform admins can create certificates
      allow create: if isSignedIn() && 
                    (isClubAdmin(request.resource.data.clubId) || isAdmin());
      
      // Only the certificate owner can update their certificate
      allow update: if isOwner(resource.data.userId) || isAdmin();
      
      // Only admins can delete certificates
      allow delete: if isAdmin();
    }
    
    // ============================================
    // ACHIEVEMENTS COLLECTION
    // ============================================
    
    match /achievements/{achievementId} {
      // Anyone can read achievements
      allow read: if true;
      
      // Only the owner can create their achievements
      allow create: if isOwner(request.resource.data.userId);
      
      // Only the owner can update their achievements
      allow update: if isOwner(resource.data.userId);
      
      // Only the owner or admin can delete achievements
      allow delete: if isOwner(resource.data.userId) || isAdmin();
    }
    
    // ============================================
    // ADMINS COLLECTION
    // ============================================
    
    match /admins/{adminId} {
      // Only admins can read admin list
      allow read: if isAdmin();
      
      // Only existing admins can create new admins
      allow write: if isAdmin();
    }
    
    // ============================================
    // ACTIVITY FEED COLLECTION
    // ============================================
    
    match /activities/{activityId} {
      // Anyone can read activities
      allow read: if true;
      
      // Only authenticated users can create activities
      allow create: if isSignedIn();
      
      // Only the owner or admin can update/delete
      allow update, delete: if isOwner(resource.data.userId) || isAdmin();
    }
  }
}
\`\`\`

### Step 3: Publish Rules

1. Click **Publish** button
2. Confirm the changes
3. Rules are now active!

---

## 💻 Local Development Setup

### Step 1: Install Firebase CLI

\`\`\`bash
npm install -g firebase-tools
\`\`\`

### Step 2: Login to Firebase

\`\`\`bash
firebase login
\`\`\`

This will open a browser window for authentication.

### Step 3: Initialize Firebase in Your Project

\`\`\`bash
cd clubconn
firebase init
\`\`\`

Select the following options:
- **Firestore**: Configure security rules and indexes
- **Hosting**: Configure hosting (optional)
- **Emulators**: Set up local emulators

Follow the prompts:
1. **Use an existing project**: Select your ClubConn project
2. **Firestore rules file**: Press Enter (use default `firestore.rules`)
3. **Firestore indexes file**: Press Enter (use default `firestore.indexes.json`)
4. **Set up emulators**: Select Authentication, Firestore, and Hosting
5. **Emulator ports**: Use defaults or customize

### Step 4: Configure Firebase in Your App

Update `lib/firebase.ts` with your Firebase configuration:

\`\`\`typescript
import { initializeApp, getApps } from 'firebase/app'
import { getAuth } from 'firebase/auth'
import { getFirestore } from 'firebase/firestore'

const firebaseConfig = {
  apiKey: "YOUR_API_KEY",
  authDomain: "YOUR_PROJECT_ID.firebaseapp.com",
  projectId: "YOUR_PROJECT_ID",
  storageBucket: "YOUR_PROJECT_ID.appspot.com",
  messagingSenderId: "YOUR_MESSAGING_SENDER_ID",
  appId: "YOUR_APP_ID"
}

// Initialize Firebase
const app = getApps().length === 0 ? initializeApp(firebaseConfig) : getApps()[0]
const auth = getAuth(app)
const db = getFirestore(app)

export { app, auth, db }
\`\`\`

---

## 🧪 Firebase Emulator Setup

### Why Use Emulators?

Firebase Emulators allow you to:
- Develop and test locally without affecting production data
- Test security rules safely
- Work offline
- Speed up development

### Step 1: Start Emulators

\`\`\`bash
firebase emulators:start
\`\`\`

This will start:
- **Authentication Emulator**: http://localhost:9099
- **Firestore Emulator**: http://localhost:8080
- **Emulator UI**: http://localhost:4000

### Step 2: Connect Your App to Emulators

Update `lib/firebase.ts` to use emulators in development:

\`\`\`typescript
import { initializeApp, getApps } from 'firebase/app'
import { getAuth, connectAuthEmulator } from 'firebase/auth'
import { getFirestore, connectFirestoreEmulator } from 'firebase/firestore'

// ... firebaseConfig ...

const app = getApps().length === 0 ? initializeApp(firebaseConfig) : getApps()[0]
const auth = getAuth(app)
const db = getFirestore(app)

// Connect to emulators in development
if (process.env.NODE_ENV === 'development') {
  connectAuthEmulator(auth, 'http://localhost:9099')
  connectFirestoreEmulator(db, 'localhost', 8080)
}

export { app, auth, db }
\`\`\`

### Step 3: Seed Test Data

Create a script to seed test data in emulators:

\`\`\`bash
# Run the seed script
npm run dev
# Then navigate to http://localhost:3000/seed
\`\`\`

---

## 📊 Database Structure

### Collections Overview

\`\`\`
clubconn/
├── users/                    # User profiles
│   └── {userId}/
│       ├── uid
│       ├── username
│       ├── displayName
│       ├── email
│       ├── bio
│       ├── profileImage
│       ├── socialLinks
│       ├── achievements
│       ├── joinedClubs
│       ├── createdAt
│       └── updatedAt
│
├── usernames/                # Username reservations
│   └── {username}/
│       └── uid
│
├── clubs/                    # Club information
│   └── {clubId}/
│       ├── name
│       ├── slug
│       ├── description
│       ├── logo
│       ├── category
│       ├── members/          # Subcollection
│       └── admins/           # Subcollection
│
├── events/                   # Events
│   └── {eventId}/
│       ├── title
│       ├── description
│       ├── clubId
│       ├── date
│       ├── location
│       ├── rsvps/            # Subcollection
│       └── volunteers/       # Subcollection
│
├── communities/              # Communities
│   └── {communityId}/
│       ├── name
│       ├── slug
│       ├── description
│       └── color
│
├── certificates/             # Certificates
│   └── {certificateId}/
│       ├── userId
│       ├── eventId
│       ├── clubId
│       ├── issuedDate
│       └── verificationCode
│
├── achievements/             # User achievements
│   └── {achievementId}/
│       ├── userId
│       ├── badgeId
│       ├── earnedDate
│       └── progress
│
├── admins/                   # Platform admins
│   └── {userId}/
│       ├── role
│       └── permissions
│
└── activities/               # Activity feed
    └── {activityId}/
        ├── userId
        ├── type
        ├── content
        └── timestamp
\`\`\`

### Sample Documents

#### User Document
\`\`\`json
{
  "uid": "abc123",
  "username": "johndoe",
  "displayName": "John Doe",
  "email": "john@example.com",
  "bio": "Computer Science student passionate about AI",
  "profileImage": "https://...",
  "socialLinks": {
    "linkedin": "https://linkedin.com/in/johndoe",
    "github": "https://github.com/johndoe"
  },
  "achievements": ["badge1", "badge2"],
  "joinedClubs": ["csi", "gdsc"],
  "createdAt": "2025-01-01T00:00:00Z",
  "updatedAt": "2025-01-15T00:00:00Z"
}
\`\`\`

---

## ✅ Testing Your Setup

### Test 1: Authentication

1. Start your development server: `npm run dev`
2. Navigate to http://localhost:3000
3. Click **Sign Up**
4. Try creating an account with email/password
5. Try signing in with Google
6. Try signing in with GitHub

### Test 2: Firestore Operations

1. Create a user profile
2. Edit your profile
3. Check Firestore Console to see the data
4. Try accessing another user's profile

### Test 3: Security Rules

1. Try to edit another user's profile (should fail)
2. Try to create a club without admin rights (should fail)
3. Try to read public data (should succeed)

### Test 4: Emulators

1. Start emulators: `firebase emulators:start`
2. Open Emulator UI: http://localhost:4000
3. Create test data
4. Verify security rules work correctly

---

## 🐛 Troubleshooting

### Common Issues

#### Issue: "Firebase: Error (auth/configuration-not-found)"

**Solution**: 
- Check that your Firebase configuration in `lib/firebase.ts` is correct
- Verify your Firebase project is properly set up
- Ensure Authentication is enabled in Firebase Console

#### Issue: "Missing or insufficient permissions"

**Solution**:
- Check Firestore security rules are published
- Verify you're signed in
- Check that the operation is allowed by security rules

#### Issue: "Username already taken"

**Solution**:
- Check the `usernames` collection in Firestore
- Verify the username is properly lowercase
- Ensure the username reservation was created during signup

#### Issue: OAuth providers not working

**Solution**:
- Verify OAuth providers are enabled in Firebase Console
- Check that redirect URLs are properly configured
- Ensure OAuth credentials (Client ID, Secret) are valid
- Add your domain to authorized domains

#### Issue: Emulators not connecting

**Solution**:
- Check that emulators are running: `firebase emulators:start`
- Verify emulator connection code in `lib/firebase.ts`
- Check that ports are not in use by other applications
- Try clearing browser cache and restarting emulators

#### Issue: "Network request failed"

**Solution**:
- Check your internet connection
- Verify Firebase project is active
- Check browser console for detailed error messages
- Try disabling browser extensions

### Getting Help

If you're still having issues:

1. **Check Firebase Console**: Look for error messages
2. **Browser Console**: Check for JavaScript errors
3. **Firebase Documentation**: [firebase.google.com/docs](https://firebase.google.com/docs)
4. **Stack Overflow**: Search for similar issues
5. **GitHub Issues**: Open an issue in the ClubConn repository

---

## 📚 Additional Resources

- [Firebase Documentation](https://firebase.google.com/docs)
- [Firestore Security Rules Guide](https://firebase.google.com/docs/firestore/security/get-started)
- [Firebase Authentication Guide](https://firebase.google.com/docs/auth)
- [Firebase Emulator Suite](https://firebase.google.com/docs/emulator-suite)
- [Next.js with Firebase](https://firebase.google.com/docs/web/setup)

---

## 🎉 Success!

If you've followed all the steps, you should now have:

✅ Firebase project created and configured  
✅ Authentication providers enabled  
✅ Firestore database set up with security rules  
✅ Local development environment configured  
✅ Firebase emulators running  
✅ ClubConn connected to Firebase  

You're now ready to start developing with ClubConn! 🚀

---

<div align="center">

**Need more help?** Contact the ClubConn team or open an issue on GitHub.

[Back to README](./README.md)

</div>
