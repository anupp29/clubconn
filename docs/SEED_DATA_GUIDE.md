# Seed Data Guide

This guide explains how to populate your ClubConn Firebase database with sample data for testing and development.

## Overview

The seed script (`scripts/seed_data.js`) creates 1-2 sample entries in all major collections:

- **2 Colleges**: KKWIEER and MIT Pune
- **2 City Communities**: Nashik Tech and Pune Developers
- **2 Users**: Alice (CSI Lead) and Bob (FOSS Co-lead)
- **2 Clubs**: CSI KKWIEER and FOSS KKWIEER
- **2 Events**: CodeFest Hackathon and ML Workshop
- **2 RSVPs**: Event registrations
- **2 Hall Requests**: One approved, one pending
- **2 Messages**: Internal communication thread
- **1 Submission**: Hackathon project submission
- **2 Audit Logs**: Event creation and hall approval
- **1 Attendance**: Workshop check-in

## Prerequisites

1. Firebase project set up
2. Firestore database created
3. Firebase Admin SDK credentials
4. Node.js installed

## Setup

### 1. Install Dependencies

\`\`\`bash
npm install firebase
\`\`\`

### 2. Configure Firebase

Update the `firebaseConfig` object in `scripts/seed_data.js` with your Firebase project credentials:

\`\`\`javascript
const firebaseConfig = {
  apiKey: "YOUR_API_KEY",
  authDomain: "YOUR_AUTH_DOMAIN",
  projectId: "YOUR_PROJECT_ID",
  storageBucket: "YOUR_STORAGE_BUCKET",
  messagingSenderId: "YOUR_MESSAGING_SENDER_ID",
  appId: "YOUR_APP_ID"
}
\`\`\`

### 3. Run the Seed Script

\`\`\`bash
node scripts/seed_data.js
\`\`\`

## Sample Data Structure

### Users
- **Alice Johnson** (`user_alice`)
  - Email: alice@kkwagh.edu.in
  - Role: CSI Lead, City Community Lead
  - Department: Computer Engineering, Year 3
  
- **Bob Smith** (`user_bob`)
  - Email: bob@kkwagh.edu.in
  - Role: FOSS Co-lead, City Community Co-lead
  - Department: Information Technology, Year 4

### Clubs
- **CSI KKWIEER**: 85 members, 15 events
- **FOSS KKWIEER**: 62 members, 10 events

### Events
- **CodeFest 2025**: 24-hour hackathon, 200 max participants, 87 registered
- **ML Workshop**: Hybrid workshop, 50 max participants, 42 registered

### Relationships
The seed data maintains proper relationships:
- Users belong to colleges
- Clubs belong to colleges
- Events are organized by clubs
- RSVPs link users to events
- Hall requests link events to venues
- Memberships link users to clubs with roles

## Testing RBAC/ABAC

The seed data includes various roles for testing access control:

1. **Club Lead** (Alice): Can create events, manage club
2. **Club Co-lead** (Bob): Can assist with club management
3. **City Community Lead** (Alice): Can edit city community
4. **Hall Coordinator** (Prof. Deshmukh): Can approve hall requests

## Verification

After seeding, verify the data in Firebase Console:

1. Go to Firestore Database
2. Check each collection has the expected documents
3. Verify relationships (user_id references, college_id references)
4. Test security rules with different user roles

## Cleanup

To remove seed data and start fresh:

\`\`\`bash
# Delete all documents (use with caution!)
# You can use Firebase Console or create a cleanup script
\`\`\`

## Customization

To add more seed data:

1. Copy the pattern from existing seed entries
2. Maintain proper relationships (IDs must match)
3. Use helper functions for timestamps
4. Update the console.log summary at the end

## Troubleshooting

### Permission Denied
- Check Firestore security rules
- Ensure Firebase Admin SDK has proper permissions
- Verify authentication is set up correctly

### Missing References
- Ensure parent documents are created before subcollections
- Verify all ID references match exactly
- Check for typos in collection/document names

### Timestamp Issues
- Use `Timestamp.now()` for current time
- Use `futureDate(days)` for future dates
- Use `pastDate(days)` for past dates

## Next Steps

After seeding:

1. Test user authentication flows
2. Verify RBAC permissions work correctly
3. Test event creation and RSVP flows
4. Check hall request approval workflow
5. Validate audit logging is working
6. Test search and filtering queries

## Production Considerations

**⚠️ WARNING**: This seed script is for development/testing only!

For production:
- Remove or disable seed scripts
- Use proper data migration tools
- Implement data validation
- Add error handling and rollback
- Use environment-specific configs
- Never commit Firebase credentials to git
