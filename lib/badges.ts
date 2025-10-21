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
    description: "One of the first pioneers to join ClubConn and shape the future of campus engagement",
    icon: "🌟",
    category: "special",
    criteria: {
      type: "custom",
      value: 1,
      description: "Join ClubConn in the first month of launch",
    },
    rarity: "legendary",
    xpReward: 100,
  },
  {
    id: "first_steps",
    name: "First Steps",
    description: "Took the first step into the world of campus events and community engagement",
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
    id: "event_enthusiast",
    name: "Event Enthusiast",
    description: "A regular at campus events, always eager to learn and connect with fellow students",
    icon: "🎉",
    category: "participation",
    criteria: {
      type: "events_attended",
      value: 10,
      description: "Attend 10 events across different clubs",
    },
    rarity: "common",
    xpReward: 50,
  },
  {
    id: "event_veteran",
    name: "Event Veteran",
    description: "Seasoned event-goer with extensive experience across workshops, hackathons, and conferences",
    icon: "🎪",
    category: "participation",
    criteria: {
      type: "events_attended",
      value: 25,
      description: "Attend 25 events",
    },
    rarity: "rare",
    xpReward: 100,
  },
  {
    id: "event_master",
    name: "Event Master",
    description: "Campus event legend who has attended countless workshops, talks, and competitions",
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
    id: "team_player",
    name: "Team Player",
    description: "Joined your first club and became part of a vibrant community of like-minded students",
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
    id: "social_butterfly",
    name: "Social Butterfly",
    description: "Active member of multiple clubs, building connections across diverse communities",
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
    description: "Exploring every corner of campus life by joining clubs across all categories",
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
    id: "community_champion",
    name: "Community Champion",
    description: "Ultimate community builder who has joined every major club on campus",
    icon: "🌐",
    category: "social",
    criteria: {
      type: "clubs_joined",
      value: 15,
      description: "Join 15 different clubs",
    },
    rarity: "legendary",
    xpReward: 200,
  },
  {
    id: "rising_star",
    name: "Rising Star",
    description: "Rapidly growing in campus engagement and making your mark in the community",
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
    id: "campus_influencer",
    name: "Campus Influencer",
    description: "Well-known figure on campus with significant impact on student engagement",
    icon: "💫",
    category: "achievement",
    criteria: {
      type: "level_reached",
      value: 15,
      description: "Reach level 15",
    },
    rarity: "epic",
    xpReward: 175,
  },
  {
    id: "campus_legend",
    name: "Campus Legend",
    description: "Legendary status achieved through exceptional dedication to campus life and community",
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
    description: "Earned multiple certificates showcasing your skills and dedication to learning",
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
    description: "Impressive collection of certificates demonstrating expertise across multiple domains",
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
    id: "master_achiever",
    name: "Master Achiever",
    description: "Ultimate achiever with an extraordinary collection of certificates and accomplishments",
    icon: "🏅",
    category: "achievement",
    criteria: {
      type: "certificates_earned",
      value: 50,
      description: "Earn 50 certificates",
    },
    rarity: "legendary",
    xpReward: 300,
  },
  {
    id: "xp_hunter",
    name: "XP Hunter",
    description: "Actively pursuing experience points through consistent engagement and participation",
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
  {
    id: "xp_master",
    name: "XP Master",
    description: "Mastered the art of earning experience through diverse campus activities",
    icon: "💠",
    category: "achievement",
    criteria: {
      type: "xp_reached",
      value: 5000,
      description: "Earn 5000 XP",
    },
    rarity: "epic",
    xpReward: 200,
  },
  {
    id: "xp_legend",
    name: "XP Legend",
    description: "Legendary XP accumulation through unparalleled dedication and engagement",
    icon: "🔷",
    category: "achievement",
    criteria: {
      type: "xp_reached",
      value: 10000,
      description: "Earn 10000 XP",
    },
    rarity: "legendary",
    xpReward: 500,
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
