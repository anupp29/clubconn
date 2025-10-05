// Cloud Functions for ClubConn
// Deploy these functions to handle cascading updates, audit logging, and notifications

const functions = require("firebase-functions")
const admin = require("firebase-admin")

admin.initializeApp()
const db = admin.firestore()

// ============================================================================
// USER MANAGEMENT
// ============================================================================

// When a user is created, initialize their profile
exports.onUserCreate = functions.auth.user().onCreate(async (user) => {
  const userDoc = {
    uid: user.uid,
    email: user.email,
    displayName: user.displayName || "",
    username: user.email.split("@")[0], // Temporary username
    photoURL: user.photoURL || null,
    platform_role: "user",
    is_active: true,
    email_verified: user.emailVerified,
    created_at: admin.firestore.FieldValue.serverTimestamp(),
    updated_at: admin.firestore.FieldValue.serverTimestamp(),
  }

  await db.collection("users").doc(user.uid).set(userDoc)

  console.log(`User profile created for ${user.uid}`)
})

// When a user's college changes, update all their memberships
exports.onUserCollegeChange = functions.firestore.document("users/{userId}").onUpdate(async (change, context) => {
  const before = change.before.data()
  const after = change.after.data()

  // Check if college_id changed
  if (before.college_id === after.college_id) {
    return null
  }

  const userId = context.params.userId
  const newCollegeId = after.college_id

  console.log(`User ${userId} college changed to ${newCollegeId}`)

  // Update cached college_id in all club memberships
  const clubMembershipsQuery = await db.collectionGroup("members").where("uid", "==", userId).get()

  const batch = db.batch()

  clubMembershipsQuery.forEach((doc) => {
    batch.update(doc.ref, { user_college_id: newCollegeId })
  })

  await batch.commit()

  // Create audit log
  await createAuditLog({
    actor_uid: userId,
    actor_role: "user",
    action: "update",
    resource_type: "user",
    resource_id: userId,
    changes: [
      {
        field: "college_id",
        old_value: before.college_id,
        new_value: newCollegeId,
      },
    ],
  })

  console.log(`Updated ${clubMembershipsQuery.size} membership records`)
})

// ============================================================================
// CLUB MANAGEMENT
// ============================================================================

// When a club member is added, cache their college_id and update stats
exports.onClubMemberAdd = functions.firestore
  .document("clubs/{clubId}/members/{memberId}")
  .onCreate(async (snap, context) => {
    const memberData = snap.data()
    const clubId = context.params.clubId
    const memberId = context.params.memberId

    // Get user's college_id
    const userDoc = await db.collection("users").doc(memberId).get()
    const userCollegeId = userDoc.data()?.college_id

    // Update member doc with cached college_id
    await snap.ref.update({ user_college_id: userCollegeId })

    // Increment club member count
    await db
      .collection("clubs")
      .doc(clubId)
      .update({
        total_members: admin.firestore.FieldValue.increment(1),
      })

    // Send notification to new member
    await createNotification({
      user_id: memberId,
      type: "role_change",
      title: "Added to Club",
      body: `You've been added as a ${memberData.role} to a club`,
      related_type: "club",
      related_id: clubId,
    })

    console.log(`Member ${memberId} added to club ${clubId}`)
  })

// When a club member is removed, update stats
exports.onClubMemberRemove = functions.firestore
  .document("clubs/{clubId}/members/{memberId}")
  .onDelete(async (snap, context) => {
    const clubId = context.params.clubId

    // Decrement club member count
    await db
      .collection("clubs")
      .doc(clubId)
      .update({
        total_members: admin.firestore.FieldValue.increment(-1),
      })

    console.log(`Member removed from club ${clubId}`)
  })

// When a club member's role changes, create audit log
exports.onClubMemberRoleChange = functions.firestore
  .document("clubs/{clubId}/members/{memberId}")
  .onUpdate(async (change, context) => {
    const before = change.before.data()
    const after = change.after.data()

    if (before.role === after.role) {
      return null
    }

    const clubId = context.params.clubId
    const memberId = context.params.memberId

    // Create audit log
    await createAuditLog({
      actor_uid: after.added_by || "system",
      actor_role: "club_coordinator",
      action: "role_change",
      resource_type: "membership",
      resource_id: memberId,
      club_id: clubId,
      changes: [
        {
          field: "role",
          old_value: before.role,
          new_value: after.role,
        },
      ],
    })

    // Send notification
    await createNotification({
      user_id: memberId,
      type: "role_change",
      title: "Role Updated",
      body: `Your role has been changed from ${before.role} to ${after.role}`,
      related_type: "club",
      related_id: clubId,
    })

    console.log(`Role changed for member ${memberId} in club ${clubId}`)
  })

// ============================================================================
// EVENT MANAGEMENT
// ============================================================================

// When an event is created, send notifications to club members
exports.onEventCreate = functions.firestore.document("events/{eventId}").onCreate(async (snap, context) => {
  const eventData = snap.data()
  const eventId = context.params.eventId

  // Only notify for published events
  if (eventData.status !== "published") {
    return null
  }

  // Get club members if it's a club event
  if (eventData.organizer_type === "club") {
    const membersSnapshot = await db.collection(`clubs/${eventData.organizer_id}/members`).get()

    const notifications = membersSnapshot.docs.map((doc) => ({
      user_id: doc.id,
      type: "event_invite",
      title: "New Event",
      body: `${eventData.title} has been announced!`,
      action_url: `/events/${eventId}`,
      action_label: "View Event",
      related_type: "event",
      related_id: eventId,
    }))

    // Batch create notifications
    const batch = db.batch()
    notifications.forEach((notification) => {
      const ref = db.collection("notifications").doc()
      batch.set(ref, {
        ...notification,
        is_read: false,
        created_at: admin.firestore.FieldValue.serverTimestamp(),
      })
    })

    await batch.commit()

    console.log(`Sent ${notifications.length} notifications for event ${eventId}`)
  }

  // Create audit log
  await createAuditLog({
    actor_uid: eventData.created_by,
    actor_role: "organizer",
    action: "create",
    resource_type: "event",
    resource_id: eventId,
    club_id: eventData.organizer_type === "club" ? eventData.organizer_id : null,
  })
})

// When an RSVP is created, update event participant count
exports.onRSVPCreate = functions.firestore
  .document("events/{eventId}/participants/{participantId}")
  .onCreate(async (snap, context) => {
    const eventId = context.params.eventId

    await db
      .collection("events")
      .doc(eventId)
      .update({
        total_rsvps: admin.firestore.FieldValue.increment(1),
        current_participants: admin.firestore.FieldValue.increment(1),
      })

    console.log(`RSVP added for event ${eventId}`)
  })

// When an RSVP is deleted, update event participant count
exports.onRSVPDelete = functions.firestore
  .document("events/{eventId}/participants/{participantId}")
  .onDelete(async (snap, context) => {
    const eventId = context.params.eventId

    await db
      .collection("events")
      .doc(eventId)
      .update({
        total_rsvps: admin.firestore.FieldValue.increment(-1),
        current_participants: admin.firestore.FieldValue.increment(-1),
      })

    console.log(`RSVP removed for event ${eventId}`)
  })

// ============================================================================
// HALL REQUEST MANAGEMENT
// ============================================================================

// When a hall request is approved/rejected, send notification
exports.onHallRequestStatusChange = functions.firestore
  .document("hall_requests/{requestId}")
  .onUpdate(async (change, context) => {
    const before = change.before.data()
    const after = change.after.data()

    if (before.status === after.status) {
      return null
    }

    const requestId = context.params.requestId

    // Send notification to requester
    if (after.status === "approved") {
      await createNotification({
        user_id: after.requested_by,
        type: "hall_approved",
        title: "Hall Request Approved",
        body: `Your hall request for ${after.hall_name} has been approved`,
        related_type: "hall_request",
        related_id: requestId,
      })
    } else if (after.status === "rejected") {
      await createNotification({
        user_id: after.requested_by,
        type: "hall_rejected",
        title: "Hall Request Rejected",
        body: `Your hall request for ${after.hall_name} has been rejected`,
        related_type: "hall_request",
        related_id: requestId,
      })
    }

    // Create audit log
    await createAuditLog({
      actor_uid: after.approved_by || "system",
      actor_role: "hall_coordinator",
      action: after.status === "approved" ? "approve" : "reject",
      resource_type: "hall_request",
      resource_id: requestId,
      college_id: after.college_id,
      changes: [
        {
          field: "status",
          old_value: before.status,
          new_value: after.status,
        },
      ],
    })

    console.log(`Hall request ${requestId} status changed to ${after.status}`)
  })

// ============================================================================
// HELPER FUNCTIONS
// ============================================================================

async function createAuditLog(data) {
  const logRef = db.collection("audit_logs").doc()

  await logRef.set({
    log_id: logRef.id,
    actor_uid: data.actor_uid,
    actor_role: data.actor_role,
    action: data.action,
    resource_type: data.resource_type,
    resource_id: data.resource_id,
    college_id: data.college_id || null,
    club_id: data.club_id || null,
    timestamp: admin.firestore.FieldValue.serverTimestamp(),
  })

  // Add changes if provided
  if (data.changes && data.changes.length > 0) {
    const batch = db.batch()

    data.changes.forEach((change) => {
      const changeRef = db.collection("audit_logs").doc(logRef.id).collection("changes").doc()

      batch.set(changeRef, {
        change_id: changeRef.id,
        log_id: logRef.id,
        field: change.field,
        old_value: change.old_value,
        new_value: change.new_value,
      })
    })

    await batch.commit()
  }
}

async function createNotification(data) {
  const notificationRef = db.collection("notifications").doc()

  await notificationRef.set({
    notification_id: notificationRef.id,
    user_id: data.user_id,
    type: data.type,
    title: data.title,
    body: data.body,
    action_url: data.action_url || null,
    action_label: data.action_label || null,
    related_type: data.related_type || null,
    related_id: data.related_id || null,
    is_read: false,
    created_at: admin.firestore.FieldValue.serverTimestamp(),
  })
}
