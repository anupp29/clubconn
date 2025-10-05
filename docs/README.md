# ClubConn Database Setup Guide

## Overview

This guide explains how to set up the ClubConn database schema in Firebase Firestore, including security rules, indexes, and Cloud Functions.

## Prerequisites

- Firebase project created
- Firebase CLI installed (`npm install -g firebase-tools`)
- Node.js 16+ installed
- Firebase Admin SDK credentials

## Setup Steps

### 1. Initialize Firebase Project

\`\`\`bash
firebase login
firebase init firestore
firebase init functions
\`\`\`

Select your Firebase project when prompted.

### 2. Deploy Security Rules

Copy the contents of `firestore.rules` to your `firestore.rules` file in the project root.

\`\`\`bash
firebase deploy --only firestore:rules
\`\`\`

### 3. Deploy Indexes

Copy the contents of `firestore.indexes.json` to your `firestore.indexes.json` file.

\`\`\`bash
firebase deploy --only firestore:indexes
\`\`\`

### 4. Deploy Cloud Functions

Copy the contents of `cloud_functions_examples.js` to `functions/index.js`.

Install dependencies:

\`\`\`bash
cd functions
npm install firebase-functions firebase-admin
cd ..
\`\`\`

Deploy functions:

\`\`\`bash
firebase deploy --only functions
\`\`\`

### 5. Seed Role Types

Create the role types collection with predefined roles:

\`\`\`javascript
const admin = require('firebase-admin');
admin.initializeApp();
const db = admin.firestore();

const roleTypes = [
  {
    role_id: 'platform_admin',
    name: 'Platform Administrator',
    slug: 'platform_admin',
    description: 'Full system access',
    level: 1,
    scope: 'platform',
    permissions: {
      can_manage_members: true,
      can_create_events: true,
      can_edit_club: true,
      can_delete_events: true,
      can_approve_halls: true,
      can_view_analytics: true,
      can_manage_roles: true
    }
  },
  {
    role_id: 'club_coordinator',
    name: 'Club Coordinator',
    slug: 'club_coordinator',
    description: 'Master user of club',
    level: 2,
    scope: 'club',
    permissions: {
      can_manage_members: true,
      can_create_events: true,
      can_edit_club: true,
      can_delete_events: true,
      can_approve_halls: false,
      can_view_analytics: true,
      can_manage_roles: true
    }
  },
  {
    role_id: 'lead',
    name: 'Club Lead',
    slug: 'lead',
    description: 'Club leadership',
    level: 3,
    scope: 'club',
    permissions: {
      can_manage_members: true,
      can_create_events: true,
      can_edit_club: true,
      can_delete_events: true,
      can_approve_halls: false,
      can_view_analytics: true,
      can_manage_roles: false
    }
  },
  {
    role_id: 'secretary',
    name: 'Secretary',
    slug: 'secretary',
    description: 'Event management',
    level: 4,
    scope: 'club',
    permissions: {
      can_manage_members: false,
      can_create_events: true,
      can_edit_club: false,
      can_delete_events: false,
      can_approve_halls: false,
      can_view_analytics: true,
      can_manage_roles: false
    }
  },
  {
    role_id: 'member',
    name: 'Member',
    slug: 'member',
    description: 'Regular club member',
    level: 10,
    scope: 'club',
    permissions: {
      can_manage_members: false,
      can_create_events: false,
      can_edit_club: false,
      can_delete_events: false,
      can_approve_halls: false,
      can_view_analytics: false,
      can_manage_roles: false
    }
  },
  {
    role_id: 'hall_coordinator',
    name: 'Hall Coordinator',
    slug: 'hall_coordinator',
    description: 'Approves hall bookings',
    level: 2,
    scope: 'college',
    permissions: {
      can_manage_members: false,
      can_create_events: false,
      can_edit_club: false,
      can_delete_events: false,
      can_approve_halls: true,
      can_view_analytics: true,
      can_manage_roles: false
    }
  }
];

async function seedRoles() {
  const batch = db.batch();
  
  roleTypes.forEach(role => {
    const ref = db.collection('role_types').doc(role.role_id);
    batch.set(ref, role);
  });
  
  await batch.commit();
  console.log('✓ Role types seeded successfully');
}

seedRoles();
\`\`\`

### 6. Run Migration (if migrating from SQL)

If you have existing data in a SQL database:

\`\`\`bash
cd scripts
npm install firebase-admin mysql2
node migration_templates.js
\`\`\`

## Security Rules Overview

### Platform Admin
- Full access to all collections
- Can create/update/delete any resource

### Club Coordinator
- Master user of their club
- Can manage all club members and events
- Can update club information
- Cannot approve hall requests (requires hall_coordinator role)

### Club Lead/Co-Lead
- Can manage club members (except coordinators)
- Can create and manage events
- Can update club information

### Secretary/Joint-Secretary
- Can create and manage events
- Cannot manage members or edit club

### Hall Coordinator
- Can approve/reject hall requests for their college
- Cannot manage clubs or events

### City Community Lead/Co-Lead
- Can edit community information
- Can manage community members
- Must be from an associated college

### Regular Members
- Can RSVP to events
- Can submit to events
- Can view public information

## Testing Access Control

Run the test plan in `test_plan.md` to verify security rules are working correctly.

### Example Test Cases

1. **User from different college cannot edit city community**
   \`\`\`javascript
   // Should fail
   await db.collection('city_communities').doc('nashik-tech').update({
     description: 'New description'
   });
   \`\`\`

2. **Hall coordinator can approve request**
   \`\`\`javascript
   // Should succeed
   await db.collection('hall_requests').doc('request123').update({
     status: 'approved',
     approved_by: currentUser.uid,
     approved_at: admin.firestore.FieldValue.serverTimestamp()
   });
   \`\`\`

3. **Club coordinator can delete event**
   \`\`\`javascript
   // Should succeed
   await db.collection('events').doc('event123').delete();
   \`\`\`

## Requesting Official Logos

To request official logos for clubs:

1. Club coordinator submits request via platform
2. Platform admin reviews and approves
3. Logo is uploaded to `official_logo_url` field
4. `is_verified` flag is set to true

## Monitoring and Maintenance

### View Audit Logs

\`\`\`javascript
const logs = await db.collection('audit_logs')
  .where('resource_type', '==', 'club')
  .orderBy('timestamp', 'desc')
  .limit(100)
  .get();

logs.forEach(doc => {
  console.log(doc.data());
});
\`\`\`

### Update Stats

Stats are automatically updated via Cloud Functions. To manually recalculate:

\`\`\`javascript
const clubRef = db.collection('clubs').doc('club123');
const membersSnapshot = await clubRef.collection('members').get();

await clubRef.update({
  total_members: membersSnapshot.size
});
\`\`\`

## Backup and Recovery

Enable automated backups in Firebase Console:
1. Go to Firestore → Backups
2. Enable automated backups
3. Set retention period (recommended: 30 days)

## Support

For issues or questions:
- Check Firebase documentation: https://firebase.google.com/docs/firestore
- Review security rules: https://firebase.google.com/docs/firestore/security/get-started
- Contact platform admin

## License

This schema is proprietary to ClubConn platform.
