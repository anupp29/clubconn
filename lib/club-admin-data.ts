import {
  collection,
  doc,
  getDoc,
  getDocs,
  query,
  where,
  orderBy,
  limit,
  Timestamp,
  addDoc,
  updateDoc,
  deleteDoc,
} from "firebase/firestore"
import { db } from "./firebase"

// Types
export interface ClubMember {
  uid: string
  displayName: string
  email: string
  photoURL?: string
  role: "club_coordinator" | "lead" | "co-lead" | "secretary" | "joint-secretary" | "creative" | "social" | "member"
  joinedAt: any
  addedBy: string
  isActive: boolean
}

export interface PendingMemberRequest {
  id: string
  uid: string
  displayName: string
  email: string
  photoURL?: string
  requestedAt: any
  message?: string
}

export interface ClubEvent {
  id: string
  title: string
  description: string
  eventType: string
  mode: "online" | "offline" | "hybrid"
  startDate: any
  endDate: any
  venue?: string
  maxParticipants?: number
  currentParticipants: number
  status: "draft" | "published" | "ongoing" | "completed" | "cancelled"
  bannerUrl?: string
}

export interface ClubAnnouncement {
  id: string
  title: string
  content: string
  authorId: string
  authorName: string
  createdAt: any
  isPinned: boolean
  tags?: string[]
}

export interface ClubAnalytics {
  totalMembers: number
  activeMembers: number
  totalEvents: number
  upcomingEvents: number
  completedEvents: number
  totalParticipants: number
  averageAttendance: number
  memberGrowth: Array<{ month: string; count: number }>
  eventsByType: Array<{ type: string; count: number }>
}

// Check if user is admin of club
export async function isClubAdmin(clubId: string, userId: string): Promise<boolean> {
  try {
    const memberDoc = await getDoc(doc(db, `clubs/${clubId}/members`, userId))

    if (!memberDoc.exists()) {
      return false
    }

    const role = memberDoc.data().role
    return ["club_coordinator", "lead", "co-lead"].includes(role)
  } catch (error) {
    console.error("[v0] Error checking club admin status:", error)
    return false
  }
}

// Get club members with details
export async function getClubMembers(clubId: string): Promise<ClubMember[]> {
  try {
    const membersQuery = query(collection(db, `clubs/${clubId}/members`), orderBy("joinedAt", "desc"))

    const membersSnapshot = await getDocs(membersQuery)

    const members: ClubMember[] = []
    for (const memberDoc of membersSnapshot.docs) {
      const memberData = memberDoc.data()

      // Fetch user details
      const userDoc = await getDoc(doc(db, "users", memberDoc.id))
      if (userDoc.exists()) {
        const userData = userDoc.data()
        members.push({
          uid: memberDoc.id,
          displayName: userData.displayName || "Unknown",
          email: userData.email || "",
          photoURL: userData.photoURL,
          role: memberData.role,
          joinedAt: memberData.joinedAt,
          addedBy: memberData.addedBy,
          isActive: memberData.isActive !== false,
        })
      }
    }

    return members
  } catch (error) {
    console.error("[v0] Error fetching club members:", error)
    return []
  }
}

// Update member role
export async function updateMemberRole(
  clubId: string,
  memberId: string,
  newRole: ClubMember["role"],
  adminId: string,
): Promise<boolean> {
  try {
    await updateDoc(doc(db, `clubs/${clubId}/members`, memberId), {
      role: newRole,
      updated_at: Timestamp.now(),
      updated_by: adminId,
    })

    // Create audit log
    await addDoc(collection(db, "audit_logs"), {
      actor_uid: adminId,
      action: "role_change",
      resource_type: "membership",
      resource_id: memberId,
      club_id: clubId,
      changes: [{ field: "role", new_value: newRole }],
      timestamp: Timestamp.now(),
    })

    return true
  } catch (error) {
    console.error("[v0] Error updating member role:", error)
    return false
  }
}

// Remove member from club
export async function removeMember(clubId: string, memberId: string, adminId: string): Promise<boolean> {
  try {
    await deleteDoc(doc(db, `clubs/${clubId}/members`, memberId))

    // Update club stats
    const clubDoc = await getDoc(doc(db, "clubs", clubId))
    if (clubDoc.exists()) {
      const currentCount = clubDoc.data().total_members || 0
      await updateDoc(doc(db, "clubs", clubId), {
        total_members: Math.max(0, currentCount - 1),
      })
    }

    // Create audit log
    await addDoc(collection(db, "audit_logs"), {
      actor_uid: adminId,
      action: "delete",
      resource_type: "membership",
      resource_id: memberId,
      club_id: clubId,
      timestamp: Timestamp.now(),
    })

    return true
  } catch (error) {
    console.error("[v0] Error removing member:", error)
    return false
  }
}

// Get club events for admin
export async function getClubEventsAdmin(clubId: string): Promise<ClubEvent[]> {
  try {
    const eventsQuery = query(
      collection(db, "events"),
      where("organizer_id", "==", clubId),
      orderBy("start_date", "desc"),
      limit(50),
    )

    const eventsSnapshot = await getDocs(eventsQuery)
    return eventsSnapshot.docs.map((doc) => ({
      id: doc.id,
      title: doc.data().title,
      description: doc.data().description,
      eventType: doc.data().event_type,
      mode: doc.data().mode,
      startDate: doc.data().start_date,
      endDate: doc.data().end_date,
      venue: doc.data().venue,
      maxParticipants: doc.data().max_participants,
      currentParticipants: doc.data().current_participants || 0,
      status: doc.data().status,
      bannerUrl: doc.data().banner_url,
    }))
  } catch (error) {
    console.error("[v0] Error fetching club events:", error)
    return []
  }
}

// Delete event
export async function deleteEvent(eventId: string, adminId: string): Promise<boolean> {
  try {
    const eventDoc = await getDoc(doc(db, "events", eventId))
    if (!eventDoc.exists()) {
      return false
    }

    await updateDoc(doc(db, "events", eventId), {
      status: "cancelled",
      updated_at: Timestamp.now(),
      updated_by: adminId,
    })

    // Create audit log
    await addDoc(collection(db, "audit_logs"), {
      actor_uid: adminId,
      action: "status_change",
      resource_type: "event",
      resource_id: eventId,
      changes: [{ field: "status", new_value: "cancelled" }],
      timestamp: Timestamp.now(),
    })

    return true
  } catch (error) {
    console.error("[v0] Error deleting event:", error)
    return false
  }
}

// Create announcement
export async function createAnnouncement(
  clubId: string,
  title: string,
  content: string,
  authorId: string,
  authorName: string,
  isPinned = false,
  tags: string[] = [],
): Promise<string | null> {
  try {
    const announcementRef = await addDoc(collection(db, "feed_items"), {
      clubId,
      type: "announcement",
      title,
      content,
      authorId,
      authorName,
      createdAt: Timestamp.now(),
      isPinned,
      tags,
      likes: 0,
      comments: 0,
    })

    return announcementRef.id
  } catch (error) {
    console.error("[v0] Error creating announcement:", error)
    return null
  }
}

// Get club announcements
export async function getClubAnnouncements(clubId: string, limitCount = 20): Promise<ClubAnnouncement[]> {
  try {
    const announcementsQuery = query(
      collection(db, "feed_items"),
      where("clubId", "==", clubId),
      where("type", "==", "announcement"),
      orderBy("createdAt", "desc"),
      limit(limitCount),
    )

    const announcementsSnapshot = await getDocs(announcementsQuery)
    return announcementsSnapshot.docs.map((doc) => ({
      id: doc.id,
      title: doc.data().title,
      content: doc.data().content,
      authorId: doc.data().authorId,
      authorName: doc.data().authorName,
      createdAt: doc.data().createdAt,
      isPinned: doc.data().isPinned || false,
      tags: doc.data().tags || [],
    }))
  } catch (error) {
    console.error("[v0] Error fetching announcements:", error)
    return []
  }
}

// Delete announcement
export async function deleteAnnouncement(announcementId: string): Promise<boolean> {
  try {
    await deleteDoc(doc(db, "feed_items", announcementId))
    return true
  } catch (error) {
    console.error("[v0] Error deleting announcement:", error)
    return false
  }
}

// Get club analytics
export async function getClubAnalytics(clubId: string): Promise<ClubAnalytics> {
  try {
    // Get club data
    const clubDoc = await getDoc(doc(db, "clubs", clubId))
    const clubData = clubDoc.data()

    // Get members count
    const membersSnapshot = await getDocs(collection(db, `clubs/${clubId}/members`))
    const totalMembers = membersSnapshot.size
    const activeMembers = membersSnapshot.docs.filter((doc) => doc.data().isActive !== false).length

    // Get events
    const eventsQuery = query(collection(db, "events"), where("organizer_id", "==", clubId))
    const eventsSnapshot = await getDocs(eventsQuery)

    const now = new Date()
    const upcomingEvents = eventsSnapshot.docs.filter((doc) => {
      const startDate = doc.data().start_date?.toDate()
      return startDate && startDate > now && doc.data().status !== "cancelled"
    }).length

    const completedEvents = eventsSnapshot.docs.filter((doc) => doc.data().status === "completed").length

    // Calculate total participants
    let totalParticipants = 0
    for (const eventDoc of eventsSnapshot.docs) {
      totalParticipants += eventDoc.data().current_participants || 0
    }

    const averageAttendance = eventsSnapshot.size > 0 ? Math.round(totalParticipants / eventsSnapshot.size) : 0

    // Member growth (mock data - implement real tracking)
    const memberGrowth = [
      { month: "Jan", count: Math.max(0, totalMembers - 50) },
      { month: "Feb", count: Math.max(0, totalMembers - 40) },
      { month: "Mar", count: Math.max(0, totalMembers - 30) },
      { month: "Apr", count: Math.max(0, totalMembers - 20) },
      { month: "May", count: Math.max(0, totalMembers - 10) },
      { month: "Jun", count: totalMembers },
    ]

    // Events by type
    const eventTypeCount: Record<string, number> = {}
    eventsSnapshot.docs.forEach((doc) => {
      const type = doc.data().event_type || "other"
      eventTypeCount[type] = (eventTypeCount[type] || 0) + 1
    })

    const eventsByType = Object.entries(eventTypeCount).map(([type, count]) => ({ type, count }))

    return {
      totalMembers,
      activeMembers,
      totalEvents: eventsSnapshot.size,
      upcomingEvents,
      completedEvents,
      totalParticipants,
      averageAttendance,
      memberGrowth,
      eventsByType,
    }
  } catch (error) {
    console.error("[v0] Error fetching club analytics:", error)
    return {
      totalMembers: 0,
      activeMembers: 0,
      totalEvents: 0,
      upcomingEvents: 0,
      completedEvents: 0,
      totalParticipants: 0,
      averageAttendance: 0,
      memberGrowth: [],
      eventsByType: [],
    }
  }
}

// Get event participants
export async function getEventParticipants(
  eventId: string,
): Promise<Array<{ uid: string; name: string; email: string; rsvpStatus: string; attended: boolean }>> {
  try {
    const participantsSnapshot = await getDocs(collection(db, `events/${eventId}/participants`))

    const participants = []
    for (const participantDoc of participantsSnapshot.docs) {
      const participantData = participantDoc.data()

      // Fetch user details
      const userDoc = await getDoc(doc(db, "users", participantDoc.id))
      if (userDoc.exists()) {
        const userData = userDoc.data()
        participants.push({
          uid: participantDoc.id,
          name: userData.displayName || "Unknown",
          email: userData.email || "",
          rsvpStatus: participantData.rsvp_status || "going",
          attended: participantData.attended || false,
        })
      }
    }

    return participants
  } catch (error) {
    console.error("[v0] Error fetching event participants:", error)
    return []
  }
}

// Mark attendance
export async function markAttendance(eventId: string, participantId: string, attended: boolean): Promise<boolean> {
  try {
    await updateDoc(doc(db, `events/${eventId}/participants`, participantId), {
      attended,
      attendance_marked_at: Timestamp.now(),
    })

    return true
  } catch (error) {
    console.error("[v0] Error marking attendance:", error)
    return false
  }
}
