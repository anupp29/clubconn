import { initializeApp } from "firebase/app"
import { getFirestore, doc, setDoc, Timestamp } from "firebase/firestore"

// Initialize Firebase (use your config)
const firebaseConfig = {
  // Your Firebase config here
}

const app = initializeApp(firebaseConfig)
const db = getFirestore(app)

// Helper to create timestamps
const now = Timestamp.now()
const futureDate = (daysFromNow) => {
  const date = new Date()
  date.setDate(date.getDate() + daysFromNow)
  return Timestamp.fromDate(date)
}

const pastDate = (daysAgo) => {
  const date = new Date()
  date.setDate(date.getDate() - daysAgo)
  return Timestamp.fromDate(date)
}

async function seedDatabase() {
  console.log("[v0] Starting database seeding...")

  try {
    // 1. Seed Colleges
    console.log("[v0] Seeding colleges...")
    await setDoc(doc(db, "colleges", "kkwieer"), {
      name: "K. K. Wagh Institute of Engineering Education and Research",
      short_name: "KKWIEER",
      city: "Nashik",
      state: "Maharashtra",
      country: "India",
      website: "https://kkwagh.edu.in",
      logo_url: "/images/kkwieer-logo.png",
      established_year: 1984,
      is_active: true,
      created_at: now,
      updated_at: now,
    })

    await setDoc(doc(db, "colleges", "mit-pune"), {
      name: "Maharashtra Institute of Technology",
      short_name: "MIT Pune",
      city: "Pune",
      state: "Maharashtra",
      country: "India",
      website: "https://mitpune.edu.in",
      logo_url: "/images/mit-logo.png",
      established_year: 1983,
      is_active: true,
      created_at: now,
      updated_at: now,
    })

    // 2. Seed City Communities
    console.log("[v0] Seeding city communities...")
    await setDoc(doc(db, "city_communities", "nashik-tech"), {
      name: "Nashik Tech Community",
      slug: "nashik-tech",
      city: "Nashik",
      state: "Maharashtra",
      description: "A vibrant community of tech enthusiasts, developers, and innovators in Nashik.",
      logo_url: "/images/nashik-tech-logo.png",
      website: "https://nashiktech.dev",
      social_links: {
        twitter: "https://twitter.com/nashiktech",
        linkedin: "https://linkedin.com/company/nashiktech",
        github: "https://github.com/nashiktech",
      },
      associated_college_ids: ["kkwieer"],
      lead_user_ids: ["user_alice"],
      co_lead_user_ids: ["user_bob"],
      member_count: 150,
      event_count: 12,
      is_active: true,
      created_at: pastDate(180),
      updated_at: now,
    })

    await setDoc(doc(db, "city_communities", "pune-devs"), {
      name: "Pune Developers",
      slug: "pune-devs",
      city: "Pune",
      state: "Maharashtra",
      description: "Pune largest developer community fostering collaboration and learning.",
      logo_url: "/images/pune-devs-logo.png",
      website: "https://punedevs.com",
      social_links: {
        twitter: "https://twitter.com/punedevs",
        discord: "https://discord.gg/punedevs",
      },
      associated_college_ids: ["mit-pune"],
      lead_user_ids: ["user_charlie"],
      co_lead_user_ids: [],
      member_count: 320,
      event_count: 28,
      is_active: true,
      created_at: pastDate(365),
      updated_at: now,
    })

    // 3. Seed Users
    console.log("[v0] Seeding users...")
    await setDoc(doc(db, "users", "user_alice"), {
      uid: "user_alice",
      email: "alice@kkwagh.edu.in",
      display_name: "Alice Johnson",
      username: "alice_tech",
      avatar_url: "/avatars/avatar-1.png",
      college_id: "kkwieer",
      college_name: "KKWIEER",
      department: "Computer Engineering",
      year: 3,
      bio: "Passionate about AI/ML and open source. Lead of CSI KKWIEER.",
      social_links: {
        github: "https://github.com/alicejohnson",
        linkedin: "https://linkedin.com/in/alicejohnson",
        twitter: "https://twitter.com/alice_tech",
        website: "https://alicejohnson.dev",
      },
      skills: ["Python", "Machine Learning", "React", "Firebase"],
      interests: ["AI", "Web Development", "Open Source"],
      is_active: true,
      created_at: pastDate(200),
      updated_at: now,
    })

    await setDoc(doc(db, "users", "user_bob"), {
      uid: "user_bob",
      email: "bob@kkwagh.edu.in",
      display_name: "Bob Smith",
      username: "bob_codes",
      avatar_url: "/avatars/avatar-2.png",
      college_id: "kkwieer",
      college_name: "KKWIEER",
      department: "Information Technology",
      year: 4,
      bio: "Full-stack developer and cybersecurity enthusiast. Co-lead of Nashik Tech Community.",
      social_links: {
        github: "https://github.com/bobsmith",
        linkedin: "https://linkedin.com/in/bobsmith",
      },
      skills: ["Node.js", "React", "Docker", "Cybersecurity"],
      interests: ["Security", "DevOps", "Blockchain"],
      is_active: true,
      created_at: pastDate(180),
      updated_at: now,
    })

    // 4. Seed Clubs
    console.log("[v0] Seeding clubs...")
    await setDoc(doc(db, "clubs", "csi-kkwieer"), {
      name: "CSI KKWIEER",
      slug: "csi",
      college_id: "kkwieer",
      college_name: "KKWIEER",
      description: "Computer Society of India student chapter promoting computing education and innovation.",
      logo_url: "/images/csi-logo.png",
      banner_url: "/images/csi-banner.jpg",
      category: "Technical",
      tags: ["Programming", "Workshops", "Competitions"],
      social_links: {
        instagram: "https://instagram.com/csi_kkwieer",
        linkedin: "https://linkedin.com/company/csi-kkwieer",
      },
      coordinator_id: "prof_sharma",
      coordinator_name: "Prof. Sharma",
      member_count: 85,
      event_count: 15,
      is_active: true,
      created_at: pastDate(300),
      updated_at: now,
    })

    await setDoc(doc(db, "clubs", "foss-kkwieer"), {
      name: "FOSS KKWIEER",
      slug: "foss",
      college_id: "kkwieer",
      college_name: "KKWIEER",
      description: "Free and Open Source Software club promoting open source culture and contributions.",
      logo_url: "/images/foss-logo.png",
      banner_url: "/images/foss-banner.jpg",
      category: "Technical",
      tags: ["Open Source", "Linux", "Git", "Hackathons"],
      social_links: {
        github: "https://github.com/foss-kkwieer",
        twitter: "https://twitter.com/foss_kkwieer",
      },
      coordinator_id: "prof_patel",
      coordinator_name: "Prof. Patel",
      member_count: 62,
      event_count: 10,
      is_active: true,
      created_at: pastDate(250),
      updated_at: now,
    })

    // 5. Seed Club Memberships
    console.log("[v0] Seeding club memberships...")
    await setDoc(doc(db, "clubs", "csi-kkwieer", "members", "user_alice"), {
      user_id: "user_alice",
      user_name: "Alice Johnson",
      user_email: "alice@kkwagh.edu.in",
      role: "lead",
      joined_at: pastDate(200),
      is_active: true,
    })

    await setDoc(doc(db, "clubs", "foss-kkwieer", "members", "user_bob"), {
      user_id: "user_bob",
      user_name: "Bob Smith",
      user_email: "bob@kkwagh.edu.in",
      role: "co_lead",
      joined_at: pastDate(180),
      is_active: true,
    })

    // 6. Seed Events
    console.log("[v0] Seeding events...")
    await setDoc(doc(db, "events", "event_hackathon"), {
      title: "CodeFest 2025 - 24 Hour Hackathon",
      slug: "codefest-2025",
      description:
        "Annual 24-hour hackathon bringing together the best student developers to build innovative solutions.",
      event_type: "hackathon",
      mode: "offline",
      start_date: futureDate(15),
      end_date: futureDate(16),
      registration_deadline: futureDate(10),
      venue: "Main Auditorium, KKWIEER",
      location: {
        address: "KKWIEER Campus, Nashik",
        city: "Nashik",
        state: "Maharashtra",
        coordinates: { lat: 19.9975, lon: 73.7898 },
      },
      organizer_type: "club",
      organizer_id: "csi-kkwieer",
      organizer_name: "CSI KKWIEER",
      college_id: "kkwieer",
      college_name: "KKWIEER",
      banner_url: "/images/codefest-banner.jpg",
      tags: ["Hackathon", "Coding", "Innovation", "Prizes"],
      max_participants: 200,
      registered_count: 87,
      attended_count: 0,
      registration_fee: 0,
      prizes: ["₹50,000", "₹30,000", "₹20,000"],
      sponsors: ["TechCorp", "DevTools Inc"],
      contact_email: "csi@kkwagh.edu.in",
      contact_phone: "+91-9876543210",
      is_featured: true,
      is_published: true,
      status: "upcoming",
      created_by: "user_alice",
      created_at: pastDate(30),
      updated_at: now,
    })

    await setDoc(doc(db, "events", "event_workshop"), {
      title: "Introduction to Machine Learning Workshop",
      slug: "ml-workshop-basics",
      description: "Hands-on workshop covering ML fundamentals, algorithms, and practical implementation using Python.",
      event_type: "workshop",
      mode: "hybrid",
      start_date: futureDate(7),
      end_date: futureDate(7),
      registration_deadline: futureDate(5),
      venue: "Lab 301, CS Department",
      location: {
        address: "KKWIEER Campus, Nashik",
        city: "Nashik",
        state: "Maharashtra",
      },
      meeting_link: "https://meet.google.com/abc-defg-hij",
      organizer_type: "club",
      organizer_id: "csi-kkwieer",
      organizer_name: "CSI KKWIEER",
      college_id: "kkwieer",
      college_name: "KKWIEER",
      banner_url: "/images/ml-workshop-banner.jpg",
      tags: ["Machine Learning", "Python", "Workshop", "AI"],
      max_participants: 50,
      registered_count: 42,
      attended_count: 0,
      registration_fee: 100,
      prerequisites: ["Basic Python knowledge", "Laptop required"],
      speakers: [
        {
          name: "Dr. Mehta",
          designation: "AI Researcher",
          bio: "PhD in Machine Learning from IIT Bombay",
        },
      ],
      contact_email: "csi@kkwagh.edu.in",
      is_featured: false,
      is_published: true,
      status: "upcoming",
      created_by: "user_alice",
      created_at: pastDate(20),
      updated_at: now,
    })

    // 7. Seed RSVPs
    console.log("[v0] Seeding RSVPs...")
    await setDoc(doc(db, "events", "event_hackathon", "rsvps", "user_alice"), {
      user_id: "user_alice",
      user_name: "Alice Johnson",
      user_email: "alice@kkwagh.edu.in",
      user_college_id: "kkwieer",
      status: "confirmed",
      team_name: "Code Warriors",
      team_members: ["Alice Johnson", "John Doe", "Jane Smith"],
      payment_status: "not_required",
      registered_at: pastDate(25),
      updated_at: now,
    })

    await setDoc(doc(db, "events", "event_workshop", "rsvps", "user_bob"), {
      user_id: "user_bob",
      user_name: "Bob Smith",
      user_email: "bob@kkwagh.edu.in",
      user_college_id: "kkwieer",
      status: "confirmed",
      payment_status: "paid",
      payment_amount: 100,
      payment_id: "pay_abc123",
      registered_at: pastDate(15),
      updated_at: now,
    })

    // 8. Seed Hall Requests
    console.log("[v0] Seeding hall requests...")
    await setDoc(doc(db, "hall_requests", "hall_req_001"), {
      event_id: "event_hackathon",
      event_title: "CodeFest 2025 - 24 Hour Hackathon",
      club_id: "csi-kkwieer",
      club_name: "CSI KKWIEER",
      college_id: "kkwieer",
      requested_by: "user_alice",
      requester_name: "Alice Johnson",
      hall_name: "Main Auditorium",
      start_datetime: futureDate(15),
      end_datetime: futureDate(16),
      expected_attendees: 200,
      purpose: "24-hour hackathon event with coding competitions",
      equipment_needed: ["Projector", "Sound System", "Tables and Chairs", "WiFi"],
      status: "approved",
      approved_by: "hall_coord_001",
      approver_name: "Prof. Deshmukh",
      approved_at: pastDate(20),
      approval_notes: "Approved. Please ensure cleanup after event.",
      created_at: pastDate(28),
      updated_at: pastDate(20),
    })

    await setDoc(doc(db, "hall_requests", "hall_req_002"), {
      event_id: "event_workshop",
      event_title: "Introduction to Machine Learning Workshop",
      club_id: "csi-kkwieer",
      club_name: "CSI KKWIEER",
      college_id: "kkwieer",
      requested_by: "user_alice",
      requester_name: "Alice Johnson",
      hall_name: "Lab 301",
      start_datetime: futureDate(7),
      end_datetime: futureDate(7),
      expected_attendees: 50,
      purpose: "Hands-on ML workshop with practical coding sessions",
      equipment_needed: ["Projector", "Computers", "Whiteboard"],
      status: "pending",
      created_at: pastDate(18),
      updated_at: pastDate(18),
    })

    // 9. Seed Messages
    console.log("[v0] Seeding messages...")
    await setDoc(doc(db, "messages", "msg_001"), {
      from_user_id: "user_alice",
      from_user_name: "Alice Johnson",
      to_user_id: "user_bob",
      to_user_name: "Bob Smith",
      subject: "Collaboration for CodeFest 2025",
      body: "Hi Bob, Would you like to collaborate on organizing CodeFest 2025? We could use your expertise in cybersecurity for one of the tracks.",
      is_read: true,
      read_at: pastDate(3),
      parent_message_id: null,
      thread_id: "thread_001",
      created_at: pastDate(5),
    })

    await setDoc(doc(db, "messages", "msg_002"), {
      from_user_id: "user_bob",
      from_user_name: "Bob Smith",
      to_user_id: "user_alice",
      to_user_name: "Alice Johnson",
      subject: "Re: Collaboration for CodeFest 2025",
      body: "Hi Alice, I would love to help organize a cybersecurity track. Let me schedule a meeting to discuss details.",
      is_read: false,
      parent_message_id: "msg_001",
      thread_id: "thread_001",
      created_at: pastDate(3),
    })

    // 10. Seed Submissions
    console.log("[v0] Seeding submissions...")
    await setDoc(doc(db, "submissions", "sub_001"), {
      event_id: "event_hackathon",
      event_title: "CodeFest 2025 - 24 Hour Hackathon",
      user_id: "user_alice",
      user_name: "Alice Johnson",
      team_name: "Code Warriors",
      project_title: "EcoTrack - Carbon Footprint Tracker",
      project_description:
        "A mobile app that helps users track and reduce their carbon footprint through gamification.",
      project_url: "https://github.com/codewarriors/ecotrack",
      demo_url: "https://ecotrack.demo.app",
      technologies: ["React Native", "Firebase", "Node.js", "TensorFlow"],
      submitted_at: futureDate(16),
      status: "submitted",
      score: null,
      feedback: null,
      created_at: pastDate(1),
      updated_at: pastDate(1),
    })

    // 11. Seed Audit Logs
    console.log("[v0] Seeding audit logs...")
    await setDoc(doc(db, "audit_logs", "audit_001"), {
      action: "event_created",
      resource_type: "event",
      resource_id: "event_hackathon",
      performed_by: "user_alice",
      performer_name: "Alice Johnson",
      performer_role: "lead",
      college_id: "kkwieer",
      details: {
        event_title: "CodeFest 2025 - 24 Hour Hackathon",
        event_type: "hackathon",
      },
      ip_address: "192.168.1.100",
      user_agent: "Mozilla/5.0...",
      timestamp: pastDate(30),
    })

    await setDoc(doc(db, "audit_logs", "audit_002"), {
      action: "hall_request_approved",
      resource_type: "hall_request",
      resource_id: "hall_req_001",
      performed_by: "hall_coord_001",
      performer_name: "Prof. Deshmukh",
      performer_role: "hall_coordinator",
      college_id: "kkwieer",
      details: {
        hall_name: "Main Auditorium",
        event_title: "CodeFest 2025 - 24 Hour Hackathon",
        approval_notes: "Approved. Please ensure cleanup after event.",
      },
      ip_address: "192.168.1.50",
      user_agent: "Mozilla/5.0...",
      timestamp: pastDate(20),
    })

    // 12. Seed Attendance (for past events)
    console.log("[v0] Seeding attendance records...")
    await setDoc(doc(db, "attendance", "att_001"), {
      event_id: "event_workshop",
      event_title: "Introduction to Machine Learning Workshop",
      user_id: "user_bob",
      user_name: "Bob Smith",
      user_email: "bob@kkwagh.edu.in",
      college_id: "kkwieer",
      check_in_time: futureDate(7),
      check_out_time: null,
      status: "checked_in",
      marked_by: "user_alice",
      notes: "On-time arrival",
      created_at: futureDate(7),
    })

    console.log("[v0] Database seeding completed successfully!")
    console.log("[v0] Seeded collections:")
    console.log("  - 2 Colleges")
    console.log("  - 2 City Communities")
    console.log("  - 2 Users")
    console.log("  - 2 Clubs")
    console.log("  - 2 Club Memberships")
    console.log("  - 2 Events")
    console.log("  - 2 RSVPs")
    console.log("  - 2 Hall Requests")
    console.log("  - 2 Messages")
    console.log("  - 1 Submission")
    console.log("  - 2 Audit Logs")
    console.log("  - 1 Attendance Record")
  } catch (error) {
    console.error("[v0] Error seeding database:", error)
    throw error
  }
}

// Run the seed function
seedDatabase()
  .then(() => {
    console.log("[v0] Seeding process finished")
    process.exit(0)
  })
  .catch((error) => {
    console.error("[v0] Seeding process failed:", error)
    process.exit(1)
  })
