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
} from "firebase/firestore"
import { db } from "./firebase"

// Types
export interface Club {
  id: string
  name: string
  slug: string
  description: string
  logo?: string
  color: string
  memberCount: number
  category: string
  isActive: boolean
  createdAt: any
}

export interface ClubMembership {
  id: string
  userId: string
  clubId: string
  role: "member" | "admin" | "moderator"
  joinedAt: any
}

export interface Event {
  id: string
  clubId: string
  clubName: string
  title: string
  description: string
  date: string
  time: string
  location: string
  maxAttendees?: number
  currentAttendees: number
  imageUrl?: string
  isActive: boolean
  createdAt: any
}

export interface EventRegistration {
  id: string
  eventId: string
  userId: string
  status: "registered" | "attended" | "cancelled"
  registeredAt: any
}

export interface FeedItem {
  id: string
  clubId: string
  clubName: string
  clubColor: string
  type: "announcement" | "event" | "achievement" | "poll"
  title: string
  content: string
  authorId: string
  authorName: string
  createdAt: any
  likes?: number
  comments?: number
}

export interface UserStats {
  userId: string
  xp: number
  level: number
  eventsAttended: number
  clubsJoined: number
  certificatesEarned: number
  rank?: number
  updatedAt: any
}

export interface Badge {
  id: string
  name: string
  description: string
  icon: string
  criteria: string
  xpReward: number
  category: string
}

export interface UserBadge {
  id: string
  userId: string
  badgeId: string
  earnedAt: any
  progress?: number
}

// Get user's joined clubs
export async function getUserClubs(userId: string): Promise<Club[]> {
  try {
    // Get user's club memberships
    const membershipsQuery = query(collection(db, "club_members"), where("userId", "==", userId))
    const membershipsSnapshot = await getDocs(membershipsQuery)

    if (membershipsSnapshot.empty) {
      return []
    }

    // Get club IDs
    const clubIds = membershipsSnapshot.docs.map((doc) => doc.data().clubId)

    // Fetch club details
    const clubs: Club[] = []
    for (const clubId of clubIds) {
      const clubDoc = await getDoc(doc(db, "clubs", clubId))
      if (clubDoc.exists()) {
        clubs.push({ id: clubDoc.id, ...clubDoc.data() } as Club)
      }
    }

    return clubs
  } catch (error) {
    console.error("[v0] Error fetching user clubs:", error)
    return []
  }
}

// Get personalized feed from joined clubs
export async function getPersonalizedFeed(userId: string, limitCount = 10): Promise<FeedItem[]> {
  try {
    const userClubs = await getUserClubs(userId)
    if (userClubs.length === 0) {
      return []
    }

    const clubIds = userClubs.map((club) => club.id)

    // Fetch feed items from joined clubs
    const feedQuery = query(
      collection(db, "feed_items"),
      where("clubId", "in", clubIds.slice(0, 10)), // Firestore 'in' limit is 10
      orderBy("createdAt", "desc"),
      limit(limitCount),
    )

    const feedSnapshot = await getDocs(feedQuery)
    return feedSnapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }) as FeedItem)
  } catch (error) {
    console.error("[v0] Error fetching personalized feed:", error)
    return []
  }
}

// Get upcoming events from joined clubs
export async function getUpcomingEvents(userId: string, limitCount = 5): Promise<Event[]> {
  try {
    const userClubs = await getUserClubs(userId)
    if (userClubs.length === 0) {
      return []
    }

    const clubIds = userClubs.map((club) => club.id)

    // Fetch upcoming events
    const eventsQuery = query(
      collection(db, "events"),
      where("clubId", "in", clubIds.slice(0, 10)),
      where("isActive", "==", true),
      orderBy("date", "asc"),
      limit(limitCount),
    )

    const eventsSnapshot = await getDocs(eventsQuery)
    return eventsSnapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }) as Event)
  } catch (error) {
    console.error("[v0] Error fetching upcoming events:", error)
    return []
  }
}

// Get or create user stats
export async function getUserStats(userId: string): Promise<UserStats> {
  try {
    const statsDoc = await getDoc(doc(db, "user_stats", userId))

    if (statsDoc.exists()) {
      return { userId, ...statsDoc.data() } as UserStats
    }

    // Create initial stats if they don't exist
    const initialStats: Omit<UserStats, "userId"> = {
      xp: 0,
      level: 1,
      eventsAttended: 0,
      clubsJoined: 0,
      certificatesEarned: 0,
      updatedAt: Timestamp.now(),
    }

    await updateDoc(doc(db, "user_stats", userId), initialStats)
    return { userId, ...initialStats }
  } catch (error) {
    console.error("[v0] Error fetching user stats:", error)
    // Return default stats
    return {
      userId,
      xp: 0,
      level: 1,
      eventsAttended: 0,
      clubsJoined: 0,
      certificatesEarned: 0,
      updatedAt: Timestamp.now(),
    }
  }
}

// Get leaderboard
export async function getLeaderboard(limitCount = 50): Promise<(UserStats & { displayName: string })[]> {
  try {
    const leaderboardQuery = query(collection(db, "user_stats"), orderBy("xp", "desc"), limit(limitCount))

    const leaderboardSnapshot = await getDocs(leaderboardQuery)

    // Fetch user profiles for display names
    const leaderboardWithNames = await Promise.all(
      leaderboardSnapshot.docs.map(async (docSnapshot, index) => {
        const userId = docSnapshot.id
        const userDoc = await getDoc(doc(db, "users", userId))
        const displayName = userDoc.exists() ? userDoc.data().displayName || "Unknown User" : "Unknown User"

        return {
          userId,
          rank: index + 1,
          displayName,
          ...docSnapshot.data(),
        } as UserStats & { displayName: string }
      }),
    )

    return leaderboardWithNames
  } catch (error) {
    console.error("[v0] Error fetching leaderboard:", error)
    return []
  }
}

// Get user's earned badges
export async function getUserBadges(userId: string): Promise<{ badge: Badge; earnedAt: any; progress?: number }[]> {
  try {
    // Get user's earned badges
    const userBadgesQuery = query(collection(db, "user_badges"), where("userId", "==", userId))
    const userBadgesSnapshot = await getDocs(userBadgesQuery)

    const earnedBadges = []
    for (const userBadgeDoc of userBadgesSnapshot.docs) {
      const userBadge = userBadgeDoc.data() as UserBadge
      const badgeDoc = await getDoc(doc(db, "badges", userBadge.badgeId))

      if (badgeDoc.exists()) {
        earnedBadges.push({
          badge: { id: badgeDoc.id, ...badgeDoc.data() } as Badge,
          earnedAt: userBadge.earnedAt,
          progress: userBadge.progress,
        })
      }
    }

    return earnedBadges
  } catch (error) {
    console.error("[v0] Error fetching user badges:", error)
    return []
  }
}

// Get all available badges
export async function getAllBadges(): Promise<Badge[]> {
  try {
    const badgesSnapshot = await getDocs(collection(db, "badges"))
    return badgesSnapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }) as Badge)
  } catch (error) {
    console.error("[v0] Error fetching badges:", error)
    return []
  }
}

// Get recent activity
export async function getRecentActivity(
  userId: string,
  limitCount = 5,
): Promise<
  Array<{
    type: "event" | "certificate" | "badge" | "club"
    title: string
    club: string
    date: string
    xp: number
  }>
> {
  try {
    // This would typically aggregate from multiple collections
    // For now, return empty array - implement based on your activity tracking
    return []
  } catch (error) {
    console.error("[v0] Error fetching recent activity:", error)
    return []
  }
}

// Register for an event
export async function registerForEvent(userId: string, eventId: string): Promise<boolean> {
  try {
    // Check if already registered
    const existingQuery = query(
      collection(db, "event_registrations"),
      where("userId", "==", userId),
      where("eventId", "==", eventId),
    )
    const existingSnapshot = await getDocs(existingQuery)

    if (!existingSnapshot.empty) {
      console.log("[v0] User already registered for this event")
      return false
    }

    // Create registration
    await addDoc(collection(db, "event_registrations"), {
      userId,
      eventId,
      status: "registered",
      registeredAt: Timestamp.now(),
    })

    // Update event attendee count
    const eventDoc = await getDoc(doc(db, "events", eventId))
    if (eventDoc.exists()) {
      const currentAttendees = eventDoc.data().currentAttendees || 0
      await updateDoc(doc(db, "events", eventId), {
        currentAttendees: currentAttendees + 1,
      })
    }

    return true
  } catch (error) {
    console.error("[v0] Error registering for event:", error)
    return false
  }
}

// Get AI recommendations (placeholder - implement ML logic later)
export async function getAIRecommendations(userId: string): Promise<{
  clubs: Array<{ id: string; name: string; reason: string; match: number; color: string }>
  events: Array<{ id: string; title: string; club: string; date: string; match: number; color: string }>
}> {
  try {
    // Placeholder implementation
    // In production, this would use ML algorithms based on user behavior
    return {
      clubs: [],
      events: [],
    }
  } catch (error) {
    console.error("[v0] Error getting AI recommendations:", error)
    return { clubs: [], events: [] }
  }
}
