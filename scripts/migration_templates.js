// Migration templates for SQL → Firestore
// Run these scripts to migrate data from relational database to Firestore

const admin = require("firebase-admin")
const mysql = require("mysql2/promise")

// Initialize Firebase Admin
admin.initializeApp({
  credential: admin.credential.applicationDefault(),
})

const db = admin.firestore()

// MySQL connection
const mysqlConfig = {
  host: "localhost",
  user: "root",
  password: "password",
  database: "clubconn",
}

// ============================================================================
// UTILITY FUNCTIONS
// ============================================================================

async function batchWrite(collectionPath, documents) {
  const batchSize = 500
  const batches = []

  for (let i = 0; i < documents.length; i += batchSize) {
    const batch = db.batch()
    const chunk = documents.slice(i, i + batchSize)

    chunk.forEach((doc) => {
      const ref = db.collection(collectionPath).doc(doc.id)
      batch.set(ref, doc.data)
    })

    batches.push(batch.commit())
  }

  await Promise.all(batches)
  console.log(`✓ Migrated ${documents.length} documents to ${collectionPath}`)
}

// ============================================================================
// MIGRATION FUNCTIONS
// ============================================================================

async function migrateUsers(connection) {
  console.log("Migrating users...")

  const [users] = await connection.query("SELECT * FROM users")
  const [profiles] = await connection.query("SELECT * FROM user_profiles")
  const [socialLinks] = await connection.query("SELECT * FROM user_social_links")

  // Group social links by user
  const socialLinksByUser = {}
  socialLinks.forEach((link) => {
    if (!socialLinksByUser[link.uid]) {
      socialLinksByUser[link.uid] = {}
    }
    socialLinksByUser[link.uid][link.platform] = link.url
  })

  // Group profiles by user
  const profilesByUser = {}
  profiles.forEach((profile) => {
    profilesByUser[profile.uid] = profile
  })

  const documents = users.map((user) => {
    const profile = profilesByUser[user.uid] || {}
    const social = socialLinksByUser[user.uid] || {}

    return {
      id: user.uid,
      data: {
        uid: user.uid,
        email: user.email,
        displayName: user.display_name,
        username: user.username,
        photoURL: user.photo_url || null,
        bio: user.bio || null,
        college_id: user.college_id || null,
        year: profile.year || null,
        branch: profile.branch || null,
        phone: profile.phone || null,
        website: social.website || null,
        github: social.github || null,
        linkedin: social.linkedin || null,
        twitter: social.twitter || null,
        instagram: social.instagram || null,
        platform_role: user.platform_role,
        is_active: user.is_active,
        email_verified: user.email_verified,
        created_at: admin.firestore.Timestamp.fromDate(user.created_at),
        updated_at: admin.firestore.Timestamp.fromDate(user.updated_at),
        last_login: user.last_login ? admin.firestore.Timestamp.fromDate(user.last_login) : null,
      },
    }
  })

  await batchWrite("users", documents)

  // Migrate usernames
  const usernameDocuments = users.map((user) => ({
    id: user.username,
    data: {
      username: user.username,
      uid: user.uid,
      created_at: admin.firestore.Timestamp.fromDate(user.created_at),
    },
  }))

  await batchWrite("usernames", usernameDocuments)
}

async function migrateColleges(connection) {
  console.log("Migrating colleges...")

  const [colleges] = await connection.query("SELECT * FROM colleges")

  const documents = colleges.map((college) => ({
    id: college.college_id,
    data: {
      college_id: college.college_id,
      name: college.name,
      short_name: college.short_name,
      city: college.city,
      state: college.state,
      country: college.country,
      email: college.email || null,
      phone: college.phone || null,
      website: college.website || null,
      address: college.address || null,
      logo_url: college.logo_url || null,
      established_year: college.established_year || null,
      is_active: college.is_active,
      total_clubs: college.total_clubs,
      total_students: college.total_students,
      created_at: admin.firestore.Timestamp.fromDate(college.created_at),
      updated_at: admin.firestore.Timestamp.fromDate(college.updated_at),
    },
  }))

  await batchWrite("colleges", documents)
}

async function migrateCityCommunities(connection) {
  console.log("Migrating city communities...")

  const [communities] = await connection.query("SELECT * FROM city_communities")
  const [associatedColleges] = await connection.query("SELECT * FROM community_colleges")
  const [members] = await connection.query("SELECT * FROM community_members")

  // Group associated colleges by community
  const collegesByCommunity = {}
  associatedColleges.forEach((ac) => {
    if (!collegesByCommunity[ac.community_id]) {
      collegesByCommunity[ac.community_id] = []
    }
    collegesByCommunity[ac.community_id].push(ac.college_id)
  })

  const documents = communities.map((community) => ({
    id: community.community_id,
    data: {
      community_id: community.community_id,
      name: community.name,
      slug: community.slug,
      description: community.description || null,
      city: community.city,
      state: community.state,
      associated_college_ids: collegesByCommunity[community.community_id] || [],
      logo_url: community.logo_url || null,
      banner_url: community.banner_url || null,
      website: community.website || null,
      github: community.github || null,
      twitter: community.twitter || null,
      linkedin: community.linkedin || null,
      discord: community.discord || null,
      telegram: community.telegram || null,
      is_active: community.is_active,
      total_members: community.total_members,
      total_events: community.total_events,
      created_by: community.created_by,
      created_at: admin.firestore.Timestamp.fromDate(community.created_at),
      updated_at: admin.firestore.Timestamp.fromDate(community.updated_at),
    },
  }))

  await batchWrite("city_communities", documents)

  // Migrate community members as subcollection
  for (const community of communities) {
    const communityMembers = members.filter((m) => m.community_id === community.community_id)

    const memberDocuments = communityMembers.map((member) => ({
      id: member.uid,
      data: {
        uid: member.uid,
        user_college_id: null, // Will be populated by Cloud Function
        role: member.role,
        joined_at: admin.firestore.Timestamp.fromDate(member.joined_at),
        added_by: member.added_by,
      },
    }))

    if (memberDocuments.length > 0) {
      await batchWrite(`city_communities/${community.community_id}/members`, memberDocuments)
    }
  }
}

async function migrateClubs(connection) {
  console.log("Migrating clubs...")

  const [clubs] = await connection.query("SELECT * FROM clubs")
  const [tags] = await connection.query("SELECT * FROM club_tags")
  const [members] = await connection.query("SELECT * FROM club_members")

  // Group tags by club
  const tagsByClub = {}
  tags.forEach((tag) => {
    if (!tagsByClub[tag.club_id]) {
      tagsByClub[tag.club_id] = []
    }
    tagsByClub[tag.club_id].push(tag.tag)
  })

  const documents = clubs.map((club) => ({
    id: club.club_id,
    data: {
      club_id: club.club_id,
      name: club.name,
      short_name: club.short_name,
      slug: club.slug,
      description: club.description || null,
      college_id: club.college_id,
      college_name: "", // Will be populated by Cloud Function
      category: club.category,
      tags: tagsByClub[club.club_id] || [],
      logo_url: club.logo_url || null,
      banner_url: club.banner_url || null,
      official_logo_url: club.official_logo_url || null,
      website: club.website || null,
      github: club.github || null,
      twitter: club.twitter || null,
      linkedin: club.linkedin || null,
      instagram: club.instagram || null,
      discord: club.discord || null,
      is_active: club.is_active,
      is_verified: club.is_verified,
      total_members: club.total_members,
      total_events: club.total_events,
      created_by: club.created_by,
      created_at: admin.firestore.Timestamp.fromDate(club.created_at),
      updated_at: admin.firestore.Timestamp.fromDate(club.updated_at),
    },
  }))

  await batchWrite("clubs", documents)

  // Migrate club members as subcollection
  for (const club of clubs) {
    const clubMembers = members.filter((m) => m.club_id === club.club_id)

    const memberDocuments = clubMembers.map((member) => ({
      id: member.uid,
      data: {
        uid: member.uid,
        user_college_id: null, // Will be populated by Cloud Function
        role: member.role,
        is_active: member.is_active,
        joined_at: admin.firestore.Timestamp.fromDate(member.joined_at),
        added_by: member.added_by,
      },
    }))

    if (memberDocuments.length > 0) {
      await batchWrite(`clubs/${club.club_id}/members`, memberDocuments)
    }
  }
}

async function migrateEvents(connection) {
  console.log("Migrating events...")

  const [events] = await connection.query("SELECT * FROM events")
  const [tags] = await connection.query("SELECT * FROM event_tags")
  const [participants] = await connection.query("SELECT * FROM event_participants")

  // Group tags by event
  const tagsByEvent = {}
  tags.forEach((tag) => {
    if (!tagsByEvent[tag.event_id]) {
      tagsByEvent[tag.event_id] = []
    }
    tagsByEvent[tag.event_id].push(tag.tag)
  })

  const documents = events.map((event) => ({
    id: event.event_id,
    data: {
      event_id: event.event_id,
      title: event.title,
      description: event.description || null,
      organizer_type: event.organizer_type,
      organizer_id: event.organizer_id,
      organizer_name: "", // Will be populated by Cloud Function
      college_id: event.college_id || null,
      event_type: event.event_type,
      mode: event.mode,
      start_date: admin.firestore.Timestamp.fromDate(event.start_date),
      end_date: admin.firestore.Timestamp.fromDate(event.end_date),
      registration_start: event.registration_start
        ? admin.firestore.Timestamp.fromDate(event.registration_start)
        : null,
      registration_end: event.registration_end ? admin.firestore.Timestamp.fromDate(event.registration_end) : null,
      venue: event.venue || null,
      hall_id: event.hall_id || null,
      city: event.city || null,
      online_link: event.online_link || null,
      max_participants: event.max_participants || null,
      current_participants: event.current_participants,
      requires_registration: event.requires_registration,
      registration_fee: event.registration_fee || 0,
      external_registration_link: event.external_registration_link || null,
      banner_url: event.banner_url || null,
      tags: tagsByEvent[event.event_id] || [],
      status: event.status,
      is_featured: event.is_featured,
      is_must_attend: event.is_must_attend,
      total_rsvps: event.total_rsvps,
      total_attended: event.total_attended,
      created_by: event.created_by,
      created_at: admin.firestore.Timestamp.fromDate(event.created_at),
      updated_at: admin.firestore.Timestamp.fromDate(event.updated_at),
    },
  }))

  await batchWrite("events", documents)

  // Migrate event participants as subcollection
  for (const event of events) {
    const eventParticipants = participants.filter((p) => p.event_id === event.event_id)

    const participantDocuments = eventParticipants.map((participant) => ({
      id: participant.uid,
      data: {
        uid: participant.uid,
        rsvp_status: participant.rsvp_status,
        attended: participant.attended,
        registered_at: admin.firestore.Timestamp.fromDate(participant.registered_at),
        attendance_marked_at: participant.attendance_marked_at
          ? admin.firestore.Timestamp.fromDate(participant.attendance_marked_at)
          : null,
        attendance_marked_by: participant.attendance_marked_by || null,
        submission_id: participant.submission_id || null,
        submission_status: participant.submission_status || null,
      },
    }))

    if (participantDocuments.length > 0) {
      await batchWrite(`events/${event.event_id}/participants`, participantDocuments)
    }
  }
}

// ============================================================================
// MAIN MIGRATION SCRIPT
// ============================================================================

async function runMigration() {
  console.log("Starting migration from SQL to Firestore...\n")

  const connection = await mysql.createConnection(mysqlConfig)

  try {
    await migrateUsers(connection)
    await migrateColleges(connection)
    await migrateCityCommunities(connection)
    await migrateClubs(connection)
    await migrateEvents(connection)

    console.log("\n✓ Migration completed successfully!")
  } catch (error) {
    console.error("✗ Migration failed:", error)
  } finally {
    await connection.end()
  }
}

// Run migration
runMigration()
