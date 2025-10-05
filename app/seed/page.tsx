"use client"

import { useState } from "react"
import { doc, setDoc, Timestamp } from "firebase/firestore"
import { db } from "@/lib/firebase"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { CheckCircle2, Loader2, AlertCircle } from "lucide-react"

export default function SeedDataPage() {
  const [loading, setLoading] = useState(false)
  const [progress, setProgress] = useState<string[]>([])
  const [error, setError] = useState<string | null>(null)
  const [success, setSuccess] = useState(false)

  const addProgress = (message: string) => {
    setProgress((prev) => [...prev, message])
  }

  const seedDatabase = async () => {
    setLoading(true)
    setProgress([])
    setError(null)
    setSuccess(false)

    try {
      console.log("[v0] Starting database seeding...")
      addProgress("Starting database seeding...")

      addProgress("Creating Maharashtra colleges...")
      await setDoc(doc(db, "colleges", "kkwieer"), {
        id: "kkwieer",
        name: "K. K. Wagh Institute of Engineering Education and Research",
        short_name: "KKWIEER",
        city: "Nashik",
        state: "Maharashtra",
        country: "India",
        website: "https://kkwagh.edu.in",
        logo_url: "",
        created_at: Timestamp.now(),
        updated_at: Timestamp.now(),
      })

      await setDoc(doc(db, "colleges", "mitcoe"), {
        id: "mitcoe",
        name: "MIT College of Engineering",
        short_name: "MITCOE",
        city: "Pune",
        state: "Maharashtra",
        country: "India",
        website: "https://mitcoe.ac.in",
        logo_url: "",
        created_at: Timestamp.now(),
        updated_at: Timestamp.now(),
      })
      addProgress("✓ 2 Maharashtra colleges created")

      addProgress("Creating Maharashtra city communities...")

      await setDoc(doc(db, "city_communities", "ml-nashik"), {
        community_id: "ml-nashik",
        name: "ML Nashik",
        slug: "ml-nashik",
        description:
          "TensorFlow User Group Nashik - A vibrant community of machine learning enthusiasts, data scientists, and AI practitioners. We organize workshops, study groups, and hands-on sessions to explore the latest in ML and AI technologies.",
        city: "Nashik",
        state: "Maharashtra",
        logo_url:
          "https://media.licdn.com/dms/image/v2/D560BAQG3mAm0WD6Zcw/company-logo_200_200/company-logo_200_200/0/1727876964114/mlnashik_logo?e=1762387200&v=beta&t=cHUlv9njn4jOIsaAXk__XhFDtbXygqogm4vX3WV-i3U",
        banner_url: "",
        website: "",
        github: "",
        twitter: "",
        linkedin: "https://in.linkedin.com/company/mlnashik",
        discord: "",
        telegram: "",
        is_active: true,
        total_members: 250,
        total_events: 12,
        created_by: "system",
        created_at: Timestamp.now(),
        updated_at: Timestamp.now(),
      })

      await setDoc(doc(db, "city_communities", "react-nashik"), {
        community_id: "react-nashik",
        name: "React Nashik",
        slug: "react-nashik",
        description:
          "Local React and JavaScript community bringing together frontend developers, React enthusiasts, and web developers in Nashik. We host meetups, code sessions, and workshops on React, Next.js, and modern web technologies.",
        city: "Nashik",
        state: "Maharashtra",
        logo_url:
          "https://media.licdn.com/dms/image/v2/D4D0BAQHTD-zBWGJcnA/company-logo_200_200/company-logo_200_200/0/1725172146439?e=1762387200&v=beta&t=ozlbqLlrmrLmToem1Oq5MrGFsC-HgL_dN5PSN5OUP4w",
        banner_url: "",
        website: "",
        github: "",
        twitter: "",
        linkedin: "https://in.linkedin.com/company/react-nashik",
        discord: "",
        telegram: "",
        is_active: true,
        total_members: 180,
        total_events: 8,
        created_by: "system",
        created_at: Timestamp.now(),
        updated_at: Timestamp.now(),
      })

      await setDoc(doc(db, "city_communities", "flutter-nashik"), {
        community_id: "flutter-nashik",
        name: "Flutter Nashik",
        slug: "flutter-nashik",
        description:
          "Community focused on Flutter and cross-platform mobile development. Join us to learn Dart, build beautiful mobile apps, and connect with fellow Flutter developers in Nashik. We organize hackathons, workshops, and app showcases.",
        city: "Nashik",
        state: "Maharashtra",
        logo_url:
          "https://media.licdn.com/dms/image/v2/C4D0BAQF0Wzgt0hwRJA/company-logo_200_200/company-logo_200_200/0/1678436815187?e=1762387200&v=beta&t=nsgxXcglhmLZY1ntSgMQ1LLLdwvgd3p-R3nYCTn4GCo",
        banner_url: "",
        website: "",
        github: "",
        twitter: "",
        linkedin: "https://in.linkedin.com/company/flutternashik",
        discord: "",
        telegram: "",
        is_active: true,
        total_members: 150,
        total_events: 6,
        created_by: "system",
        created_at: Timestamp.now(),
        updated_at: Timestamp.now(),
      })

      await setDoc(doc(db, "city_communities", "foss-united-nashik"), {
        community_id: "foss-united-nashik",
        name: "FOSS United Nashik",
        slug: "foss-united-nashik",
        description:
          "Nashik chapter of FOSS United - Promoting free and open source software culture. We believe in the power of open source and organize events, contribution drives, and awareness sessions to build a thriving FOSS ecosystem in Nashik.",
        city: "Nashik",
        state: "Maharashtra",
        logo_url:
          "https://media.licdn.com/dms/image/v2/D560BAQGrUsDBAvre_A/img-crop_100/img-crop_100/0/1728063754718?e=1762387200&v=beta&t=-9Pr4tA0glI3eYhbtynsXUbpG4PEeYnhcj9gwWriCsU",
        banner_url: "",
        website: "https://fossunited.org",
        github: "https://github.com/fossunited",
        twitter: "https://twitter.com/FOSSUnited",
        linkedin: "https://www.linkedin.com/company/foss-united-nashik",
        discord: "",
        telegram: "",
        is_active: true,
        total_members: 320,
        total_events: 15,
        created_by: "system",
        created_at: Timestamp.now(),
        updated_at: Timestamp.now(),
      })

      await setDoc(doc(db, "city_communities", "cyberx-nashik"), {
        community_id: "cyberx-nashik",
        name: "CyberX Nashik",
        slug: "cyberx-nashik",
        description:
          "Cybersecurity community organizing workshops, CTF events, and security training for students and professionals. Learn ethical hacking, penetration testing, and security best practices from industry experts and fellow security enthusiasts.",
        city: "Nashik",
        state: "Maharashtra",
        logo_url:
          "https://media.licdn.com/dms/image/v2/D4D0BAQHo2dgAJ16JsA/company-logo_200_200/B4DZWLOd6gHIAI-/0/1741797581907/cyberx_nashik_community_logo?e=1762387200&v=beta&t=UkVbL4eY8T-FsOBzSZwUaKEKRj6EkHmtEzjv5lj0eDk",
        banner_url: "",
        website: "",
        github: "",
        twitter: "",
        linkedin: "https://in.linkedin.com/company/cyberx-nashik-community",
        discord: "",
        telegram: "",
        is_active: true,
        total_members: 200,
        total_events: 10,
        created_by: "system",
        created_at: Timestamp.now(),
        updated_at: Timestamp.now(),
      })

      await setDoc(doc(db, "city_communities", "pune-tech"), {
        community_id: "pune-tech",
        name: "Pune Tech Community",
        slug: "pune-tech",
        description:
          "Collaborative tech community for colleges and professionals in Pune. A hub for developers, designers, and tech enthusiasts to network, learn, and grow together through meetups, hackathons, and knowledge-sharing sessions.",
        city: "Pune",
        state: "Maharashtra",
        logo_url: "",
        banner_url: "",
        website: "",
        github: "",
        twitter: "",
        linkedin: "",
        discord: "",
        telegram: "",
        is_active: true,
        total_members: 450,
        total_events: 20,
        created_by: "system",
        created_at: Timestamp.now(),
        updated_at: Timestamp.now(),
      })
      addProgress("✓ 6 Maharashtra city communities created with logos and complete data")

      addProgress("Creating KKWIEER clubs...")

      await setDoc(doc(db, "clubs", "csi-kkwieer"), {
        id: "csi-kkwieer",
        name: "CSI - Computer Society of India",
        slug: "csi",
        college_id: "kkwieer",
        description:
          "Computer Engineering club focused on software development, competitive programming, and industry connections",
        logo_url: "",
        banner_url: "",
        category: "technical",
        department: "Computer Engineering",
        member_count: 0,
        social_links: {
          linkedin: "",
          instagram: "",
          twitter: "",
        },
        created_at: Timestamp.now(),
        updated_at: Timestamp.now(),
      })

      await setDoc(doc(db, "clubs", "foss-kkwieer"), {
        id: "foss-kkwieer",
        name: "FOSS KKWIEER",
        slug: "foss",
        college_id: "kkwieer",
        description:
          "Free and Open Source Software club promoting open source culture, contributions, and community building",
        logo_url: "",
        banner_url: "",
        category: "technical",
        department: "All Departments",
        member_count: 0,
        social_links: {
          linkedin: "",
          github: "",
          website: "",
        },
        created_at: Timestamp.now(),
        updated_at: Timestamp.now(),
      })

      await setDoc(doc(db, "clubs", "debuggers-kkwieer"), {
        id: "debuggers-kkwieer",
        name: "Debuggers' Club",
        slug: "debuggers",
        college_id: "kkwieer",
        description:
          "Coding and debugging club for problem solvers, competitive programmers, and algorithm enthusiasts",
        logo_url: "",
        banner_url: "",
        category: "technical",
        department: "Computer Science",
        member_count: 0,
        social_links: {
          linkedin: "",
          instagram: "",
        },
        created_at: Timestamp.now(),
        updated_at: Timestamp.now(),
      })

      await setDoc(doc(db, "clubs", "desoc-kkwieer"), {
        id: "desoc-kkwieer",
        name: "DESOC - Design Society",
        slug: "desoc",
        college_id: "kkwieer",
        description: "CS & Design club focusing on UI/UX design, creative technology, and design thinking",
        logo_url: "",
        banner_url: "",
        category: "technical",
        department: "Computer Science & Design",
        member_count: 0,
        social_links: {
          behance: "",
          instagram: "",
          linkedin: "",
        },
        created_at: Timestamp.now(),
        updated_at: Timestamp.now(),
      })

      await setDoc(doc(db, "clubs", "phoenix-kkwieer"), {
        id: "phoenix-kkwieer",
        name: "Phoenix Club",
        slug: "phoenix",
        college_id: "kkwieer",
        description: "AIDS (Artificial Intelligence & Data Science) department technical club for AI/ML enthusiasts",
        logo_url: "",
        banner_url: "",
        category: "technical",
        department: "AIDS",
        member_count: 0,
        social_links: {
          linkedin: "",
          instagram: "",
        },
        created_at: Timestamp.now(),
        updated_at: Timestamp.now(),
      })

      await setDoc(doc(db, "clubs", "mibcs-kkwieer"), {
        id: "mibcs-kkwieer",
        name: "MIBCS",
        slug: "mibcs",
        college_id: "kkwieer",
        description: "Multi-domain tech club focused on Machine Learning, IoT, Blockchain, and Cybersecurity",
        logo_url: "",
        banner_url: "",
        category: "technical",
        department: "All Departments",
        member_count: 0,
        social_links: {
          linkedin: "",
          github: "",
          instagram: "",
        },
        created_at: Timestamp.now(),
        updated_at: Timestamp.now(),
      })
      addProgress("✓ 6 KKWIEER clubs created")

      addProgress("Creating club events...")
      const eventDate1 = new Date("2025-11-15")
      const eventDate2 = new Date("2025-12-05")
      const eventDate3 = new Date("2025-11-20")

      await setDoc(doc(db, "events", "hackathon-2025"), {
        id: "hackathon-2025",
        title: "KKWIEER Hackathon 2025",
        slug: "hackathon-2025",
        club_id: "csi-kkwieer",
        college_id: "kkwieer",
        description:
          "24-hour coding marathon bringing together the brightest minds to build innovative solutions for real-world problems",
        event_type: "hackathon",
        start_date: Timestamp.fromDate(eventDate1),
        end_date: Timestamp.fromDate(new Date(eventDate1.getTime() + 24 * 60 * 60 * 1000)),
        location: "Main Auditorium, KKWIEER, Nashik",
        venue_details: "Main Auditorium with lab facilities",
        max_participants: 200,
        current_participants: 0,
        registration_deadline: Timestamp.fromDate(new Date("2025-11-10")),
        registration_fee: 0,
        is_published: true,
        is_featured: true,
        tags: ["hackathon", "coding", "innovation", "24-hour"],
        created_at: Timestamp.now(),
        updated_at: Timestamp.now(),
      })

      await setDoc(doc(db, "events", "foss-meetup-dec"), {
        id: "foss-meetup-dec",
        title: "FOSS Monthly Meetup - December",
        slug: "foss-meetup-dec",
        club_id: "foss-kkwieer",
        college_id: "kkwieer",
        description:
          "Monthly gathering to discuss open source contributions, share knowledge, and collaborate on FOSS projects",
        event_type: "meetup",
        start_date: Timestamp.fromDate(eventDate2),
        end_date: Timestamp.fromDate(new Date(eventDate2.getTime() + 3 * 60 * 60 * 1000)),
        location: "Seminar Hall 2, KKWIEER, Nashik",
        venue_details: "Seminar Hall with projector",
        max_participants: 50,
        current_participants: 0,
        registration_deadline: Timestamp.fromDate(new Date("2025-12-01")),
        registration_fee: 0,
        is_published: true,
        is_featured: false,
        tags: ["foss", "meetup", "open-source", "community"],
        created_at: Timestamp.now(),
        updated_at: Timestamp.now(),
      })

      await setDoc(doc(db, "events", "ml-workshop-nov"), {
        id: "ml-workshop-nov",
        title: "Machine Learning Workshop",
        slug: "ml-workshop-nov",
        club_id: "mibcs-kkwieer",
        college_id: "kkwieer",
        description:
          "Hands-on workshop covering ML fundamentals, model training, and deployment using Python and TensorFlow",
        event_type: "workshop",
        start_date: Timestamp.fromDate(eventDate3),
        end_date: Timestamp.fromDate(new Date(eventDate3.getTime() + 4 * 60 * 60 * 1000)),
        location: "Computer Lab 3, KKWIEER, Nashik",
        venue_details: "Computer Lab with GPU workstations",
        max_participants: 40,
        current_participants: 0,
        registration_deadline: Timestamp.fromDate(new Date("2025-11-18")),
        registration_fee: 100,
        is_published: true,
        is_featured: true,
        tags: ["machine-learning", "workshop", "ai", "python"],
        created_at: Timestamp.now(),
        updated_at: Timestamp.now(),
      })
      addProgress("✓ 3 club events created")

      addProgress("Creating hall requests...")
      await setDoc(doc(db, "hall_requests", "req-001"), {
        id: "req-001",
        club_id: "csi-kkwieer",
        event_id: "hackathon-2025",
        requested_by_uid: "system",
        hall_name: "Main Auditorium",
        request_date: Timestamp.fromDate(eventDate1),
        start_time: "09:00",
        end_time: "18:00",
        purpose: "KKWIEER Hackathon 2025 - 24 hour coding event",
        expected_attendees: 200,
        equipment_needed: ["Projector", "Microphone", "WiFi", "Power outlets"],
        status: "pending",
        created_at: Timestamp.now(),
        updated_at: Timestamp.now(),
      })

      await setDoc(doc(db, "hall_requests", "req-002"), {
        id: "req-002",
        club_id: "mibcs-kkwieer",
        event_id: "ml-workshop-nov",
        requested_by_uid: "system",
        hall_name: "Computer Lab 3",
        request_date: Timestamp.fromDate(eventDate3),
        start_time: "14:00",
        end_time: "18:00",
        purpose: "Machine Learning Workshop",
        expected_attendees: 40,
        equipment_needed: ["GPU Workstations", "Projector", "Whiteboard"],
        status: "approved",
        approved_by_uid: "system",
        approved_at: Timestamp.now(),
        created_at: Timestamp.now(),
        updated_at: Timestamp.now(),
      })
      addProgress("✓ 2 hall requests created")

      addProgress("Creating audit logs...")
      await setDoc(doc(db, "audit_logs", "log-001"), {
        id: "log-001",
        action: "seed_database",
        performed_by_uid: "system",
        target_type: "database",
        target_id: "all",
        details: "Initial database seeding with Maharashtra colleges, Nashik city communities, and KKWIEER clubs",
        ip_address: "system",
        user_agent: "seed-script",
        timestamp: Timestamp.now(),
      })
      addProgress("✓ Audit logs created")

      console.log("[v0] Database seeding completed successfully")
      addProgress("✅ Database seeding completed successfully!")
      setSuccess(true)
    } catch (err: any) {
      console.error("[v0] Error seeding database:", err)
      setError(err.message || "Failed to seed database")
      addProgress(`❌ Error: ${err.message}`)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-background p-8">
      <div className="container mx-auto max-w-4xl">
        <Card className="p-8">
          <h1 className="text-3xl font-bold mb-2">Database Seeding</h1>
          <p className="text-muted-foreground mb-6">
            Populate your Firebase database with Maharashtra-based sample data for ClubConn.
          </p>

          <div className="space-y-4">
            <Button onClick={seedDatabase} disabled={loading || success} size="lg" className="w-full">
              {loading ? (
                <>
                  <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                  Seeding Database...
                </>
              ) : success ? (
                <>
                  <CheckCircle2 className="mr-2 h-5 w-5" />
                  Database Seeded Successfully
                </>
              ) : (
                "Seed Database"
              )}
            </Button>

            {error && (
              <div className="flex items-start gap-2 p-4 bg-destructive/10 border border-destructive rounded-lg">
                <AlertCircle className="h-5 w-5 text-destructive mt-0.5" />
                <div>
                  <p className="font-semibold text-destructive">Error</p>
                  <p className="text-sm text-destructive/90">{error}</p>
                </div>
              </div>
            )}

            {progress.length > 0 && (
              <div className="bg-muted rounded-lg p-4 max-h-96 overflow-y-auto">
                <h3 className="font-semibold mb-2">Progress:</h3>
                <div className="space-y-1 font-mono text-sm">
                  {progress.map((msg, idx) => (
                    <div key={idx} className="text-muted-foreground">
                      {msg}
                    </div>
                  ))}
                </div>
              </div>
            )}

            {success && (
              <div className="bg-green-500/10 border border-green-500 rounded-lg p-4">
                <h3 className="font-semibold text-green-700 dark:text-green-400 mb-2">Seeding Complete!</h3>
                <p className="text-sm text-muted-foreground mb-3">
                  Check your Firebase Console to verify the data has been created.
                </p>
                <div className="text-sm space-y-1 text-muted-foreground">
                  <p>✓ 2 Maharashtra Colleges (KKWIEER Nashik, MITCOE Pune)</p>
                  <p>
                    ✓ 6 City Communities (ML Nashik, React Nashik, Flutter Nashik, FOSS United Nashik, CyberX Nashik,
                    Pune Tech)
                  </p>
                  <p>✓ 6 KKWIEER Clubs (CSI, FOSS, Debuggers, DESOC, Phoenix, MIBCS)</p>
                  <p>✓ 3 Events (Hackathon, FOSS Meetup, ML Workshop)</p>
                  <p>✓ 2 Hall Requests (1 pending, 1 approved)</p>
                  <p>✓ 1 Audit Log</p>
                </div>
              </div>
            )}
          </div>
        </Card>
      </div>
    </div>
  )
}
