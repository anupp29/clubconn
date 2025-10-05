# ClubConn Security Rules Test Plan

## Test Cases

### 1. User from different college cannot edit city community

**Setup:**
- User A from College X
- City Community associated with College Y only
- User A is a member of the community

**Test:**
\`\`\`javascript
// Should FAIL
await db.collection('city_communities').doc('community123').update({
  description: 'Hacked!'
});
\`\`\`

**Expected:** Permission denied

---

### 2. Hall coordinator can approve hall request

**Setup:**
- User has `hall_coordinator` role
- Hall request exists for their college

**Test:**
\`\`\`javascript
// Should SUCCEED
await db.collection('hall_requests').doc('request123').update({
  status: 'approved',
  approved_by: currentUser.uid,
  approved_at: admin.firestore.FieldValue.serverTimestamp()
});
\`\`\`

**Expected:** Success

---

### 3. Club coordinator can delete event

**Setup:**
- User is club_coordinator of club
- Event belongs to that club

**Test:**
\`\`\`javascript
// Should SUCCEED
await db.collection('events').doc('event123').delete();
\`\`\`

**Expected:** Success

---

### 4. Regular member cannot delete event

**Setup:**
- User is regular member of club
- Event belongs to that club

**Test:**
\`\`\`javascript
// Should FAIL
await db.collection('events').doc('event123').delete();
\`\`\`

**Expected:** Permission denied

---

### 5. User can only read their own messages

**Setup:**
- Message from User A to User B
- Current user is User C

**Test:**
\`\`\`javascript
// Should FAIL
await db.collection('messages').doc('message123').get();
\`\`\`

**Expected:** Permission denied

---

### 6. Club lead can add members

**Setup:**
- User is lead of club

**Test:**
\`\`\`javascript
// Should SUCCEED
await db.collection('clubs').doc('club123').collection('members').doc('newUser').set({
  uid: 'newUser',
  role: 'member',
  joined_at: admin.firestore.FieldValue.serverTimestamp(),
  added_by: currentUser.uid
});
\`\`\`

**Expected:** Success

---

### 7. Club lead cannot promote to club_coordinator

**Setup:**
- User is lead of club
- Trying to add/update member with club_coordinator role

**Test:**
\`\`\`javascript
// Should FAIL
await db.collection('clubs').doc('club123').collection('members').doc('user123').update({
  role: 'club_coordinator'
});
\`\`\`

**Expected:** Permission denied

---

### 8. Platform admin has full access

**Setup:**
- User has platform_role = 'platform_admin'

**Test:**
\`\`\`javascript
// Should SUCCEED
await db.collection('clubs').doc('club123').delete();
await db.collection('users').doc('user123').update({ is_active: false });
await db.collection('hall_requests').doc('request123').update({ status: 'approved' });
\`\`\`

**Expected:** All succeed

---

### 9. User can RSVP to published event

**Setup:**
- Event is published
- User is authenticated

**Test:**
\`\`\`javascript
// Should SUCCEED
await db.collection('events').doc('event123').collection('participants').doc(currentUser.uid).set({
  uid: currentUser.uid,
  rsvp_status: 'going',
  registered_at: admin.firestore.FieldValue.serverTimestamp()
});
\`\`\`

**Expected:** Success

---

### 10. User cannot read draft event from other club

**Setup:**
- Event status is 'draft'
- User is not a member of organizing club

**Test:**
\`\`\`javascript
// Should FAIL
await db.collection('events').doc('event123').get();
\`\`\`

**Expected:** Permission denied

---

## Running Tests

Use Firebase Emulator Suite to run these tests:

\`\`\`bash
firebase emulators:start
\`\`\`

Then run test suite:

\`\`\`javascript
const { initializeTestEnvironment } = require('@firebase/rules-unit-testing');

let testEnv;

before(async () => {
  testEnv = await initializeTestEnvironment({
    projectId: 'clubconn-test',
    firestore: {
      rules: fs.readFileSync('firestore.rules', 'utf8')
    }
  });
});

// Run test cases...
\`\`\`

## Success Criteria

All 10 test cases must pass for security rules to be considered correct.
