import { collection, query, where, getDocs, doc, setDoc, Timestamp } from "firebase/firestore"
import { db } from "./firebase"

export interface Badge {
  id: string
  name: string
  description: string
  icon: string
  category: "participation" | "achievement" | "social" | "special"
  criteria: {
    type: "events_attended" | "clubs_joined" | "xp_reached" | "level_reached" | "certificates_earned" | "custom"
    value: number
    description: string
  }
  rarity: "common" | "rare" | "epic" | "legendary"
  xpReward: number
}

export interface UserBadge {
  badgeId: string
  userId: string
  earnedAt: Timestamp
  progress?: number
}

// Define all available badges
export const BADGE_DEFINITIONS: Badge[] = [
  {
    id: "early_adopter",
    name: "Early Adopter",
    description: "One of the first to join ClubConn",
    icon: "🌟",
    category: "special",
    criteria: {
      type: "custom",
      value: 1,
      description: "Join ClubConn in the first month",
    },
    rarity: "legendary",
    xpReward: 100,
  },
  {
    id: "event_enthusiast",
    name: "Event Enthusiast",
    description: "Attended 10 events",
    icon: "🎉",
    category: "participation",
    criteria: {
      type: "events_attended",
      value: 10,
      description: "Attend 10 events",
    },
    rarity: "common",
    xpReward: 50,
  },
  {
    id: "event_master",
    name: "Event Master",
    description: "Attended 50 events",
    icon: "🏆",
    category: "participation",
    criteria: {
      type: "events_attended",
      value: 50,
      description: "Attend 50 events",
    },
    rarity: "epic",
    xpReward: 150,
  },
  {
    id: "social_butterfly",
    name: "Social Butterfly",
    description: "Joined 5 clubs",
    icon: "🦋",
    category: "social",
    criteria: {
      type: "clubs_joined",
      value: 5,
      description: "Join 5 different clubs",
    },
    rarity: "rare",
    xpReward: 75,
  },
  {
    id: "club_hopper",
    name: "Club Hopper",
    description: "Joined 10 clubs",
    icon: "🎯",
    category: "social",
    criteria: {
      type: "clubs_joined",
      value: 10,
      description: "Join 10 different clubs",
    },
    rarity: "epic",
    xpReward: 125,
  },
  {
    id: "rising_star",
    name: "Rising Star",
    description: "Reached level 10",
    icon: "⭐",
    category: "achievement",
    criteria: {
      type: "level_reached",
      value: 10,
      description: "Reach level 10",
    },
    rarity: "rare",
    xpReward: 100,
  },
  {
    id: "campus_legend",
    name: "Campus Legend",
    description: "Reached level 20",
    icon: "👑",
    category: "achievement",
    criteria: {
      type: "level_reached",
      value: 20,
      description: "Reach level 20",
    },
    rarity: "legendary",
    xpReward: 250,
  },
  {
    id: "certified_pro",
    name: "Certified Pro",
    description: "Earned 5 certificates",
    icon: "📜",
    category: "achievement",
    criteria: {
      type: "certificates_earned",
      value: 5,
      description: "Earn 5 certificates",
    },
    rarity: "rare",
    xpReward: 100,
  },
  {
    id: "certificate_collector",
    name: "Certificate Collector",
    description: "Earned 20 certificates",
    icon: "🎓",
    category: "achievement",
    criteria: {
      type: "certificates_earned",
      value: 20,
      description: "Earn 20 certificates",
    },
    rarity: "epic",
    xpReward: 200,
  },
  {
    id: "first_steps",
    name: "First Steps",
    description: "Attended your first event",
    icon: "👣",
    category: "participation",
    criteria: {
      type: "events_attended",
      value: 1,
      description: "Attend your first event",
    },
    rarity: "common",
    xpReward: 25,
  },
  {
    id: "team_player",
    name: "Team Player",
    description: "Joined your first club",
    icon: "🤝",
    category: "social",
    criteria: {
      type: "clubs_joined",
      value: 1,
      description: "Join your first club",
    },
    rarity: "common",
    xpReward: 25,
  },
  {
    id: "xp_hunter",
    name: "XP Hunter",
    description: "Earned 1000 XP",
    icon: "💎",
    category: "achievement",
    criteria: {
      type: "xp_reached",
      value: 1000,
      description: "Earn 1000 XP",
    },
    rarity: "rare",
    xpReward: 100,
  },
]

// Get user's earned badges
export async function getUserBadges(userId: string): Promise<UserBadge[]> {
  try {
    const q = query(collection(db, "user_badges"), where("userId", "==", userId))
    const snapshot = await getDocs(q)
    return snapshot.docs.map((doc) => ({
      badgeId: doc.id,
      ...doc.data(),
    })) as UserBadge[]
  } catch (error) {
    console.error("Error fetching user badges:", error)
    return []
  }
}

// Check and award badges based on user stats
export async function checkAndAwardBadges(userId: string, userStats: any): Promise<Badge[]> {
  try {
    const earnedBadges = await getUserBadges(userId)
    const earnedBadgeIds = earnedBadges.map((b) => b.badgeId)
    const newlyEarnedBadges: Badge[] = []

    for (const badge of BADGE_DEFINITIONS) {
      // Skip if already earned
      if (earnedBadgeIds.includes(badge.id)) continue

      let shouldAward = false

      // Check criteria
      switch (badge.criteria.type) {
        case "events_attended":
          shouldAward = userStats.eventsAttended >= badge.criteria.value
          break
        case "clubs_joined":
          shouldAward = userStats.clubsJoined >= badge.criteria.value
          break
        case "level_reached":
          shouldAward = userStats.level >= badge.criteria.value
          break
        case "xp_reached":
          shouldAward = userStats.xp >= badge.criteria.value
          break
        case "certificates_earned":
          shouldAward = userStats.certificatesEarned >= badge.criteria.value
          break
        case "custom":
          // Handle custom badges separately
          break
      }

      if (shouldAward) {
        // Award badge
        const badgeRef = doc(db, "user_badges", `${userId}_${badge.id}`)
        await setDoc(badgeRef, {
          userId,
          badgeId: badge.id,
          earnedAt: Timestamp.now(),
        })

        newlyEarnedBadges.push(badge)
        console.log(`[v0] Awarded badge "${badge.name}" to user ${userId}`)
      }
    }

    return newlyEarnedBadges
  } catch (error) {
    console.error("Error checking badges:", error)
    return []
  }
}

// Calculate badge progress
export function calculateBadgeProgress(badge: Badge, userStats: any): number {
  switch (badge.criteria.type) {
    case "events_attended":
      return Math.min((userStats.eventsAttended / badge.criteria.value) * 100, 100)
    case "clubs_joined":
      return Math.min((userStats.clubsJoined / badge.criteria.value) * 100, 100)
    case "level_reached":
      return Math.min((userStats.level / badge.criteria.value) * 100, 100)
    case "xp_reached":
      return Math.min((userStats.xp / badge.criteria.value) * 100, 100)
    case "certificates_earned":
      return Math.min((userStats.certificatesEarned / badge.criteria.value) * 100, 100)
    default:
      return 0
  }
}

// Get rarity color
export function getRarityColor(rarity: Badge["rarity"]): string {
  switch (rarity) {
    case "common":
      return "bg-gray-500"
    case "rare":
      return "bg-blue-500"
    case "epic":
      return "bg-purple-500"
    case "legendary":
      return "bg-yellow-500"
  }
}
