import { doc, getDoc, updateDoc, Timestamp } from "firebase/firestore"
import { db } from "./firebase"
import type { UserStats } from "./dashboard-data"

// XP thresholds for each level
const LEVEL_THRESHOLDS = [
  0, // Level 1
  100, // Level 2
  250, // Level 3
  500, // Level 4
  850, // Level 5
  1300, // Level 6
  1850, // Level 7
  2500, // Level 8
  3250, // Level 9
  4100, // Level 10
  5050, // Level 11
  6100, // Level 12
  7250, // Level 13
  8500, // Level 14
  9850, // Level 15
  11300, // Level 16
  12850, // Level 17
  14500, // Level 18
  16250, // Level 19
  18100, // Level 20
]

// Calculate level from XP
export function calculateLevel(xp: number): number {
  for (let i = LEVEL_THRESHOLDS.length - 1; i >= 0; i--) {
    if (xp >= LEVEL_THRESHOLDS[i]) {
      return i + 1
    }
  }
  return 1
}

// Get XP needed for next level
export function getNextLevelXP(currentLevel: number): number {
  if (currentLevel >= LEVEL_THRESHOLDS.length) {
    // Max level reached, calculate exponentially
    return LEVEL_THRESHOLDS[LEVEL_THRESHOLDS.length - 1] + (currentLevel - LEVEL_THRESHOLDS.length + 1) * 2000
  }
  return LEVEL_THRESHOLDS[currentLevel]
}

// XP rewards for different actions
export const XP_REWARDS = {
  COMPLETE_PROFILE: 100,
  JOIN_CLUB: 25,
  ATTEND_EVENT: 50,
  ORGANIZE_EVENT: 75,
  EARN_CERTIFICATE: 100,
  EARN_BADGE: 50,
  POST_ANNOUNCEMENT: 10,
  COMMENT_ON_POST: 5,
  LIKE_POST: 2,
  COMPLETE_POLL: 10,
  SUBMIT_FEEDBACK: 15,
}

// Award XP to user
export async function awardXP(userId: string, xpAmount: number, reason: string): Promise<UserStats | null> {
  try {
    const statsRef = doc(db, "user_stats", userId)
    const statsDoc = await getDoc(statsRef)

    let currentStats: UserStats
    if (statsDoc.exists()) {
      currentStats = { userId, ...statsDoc.data() } as UserStats
    } else {
      // Create initial stats
      currentStats = {
        userId,
        xp: 0,
        level: 1,
        eventsAttended: 0,
        clubsJoined: 0,
        certificatesEarned: 0,
        updatedAt: Timestamp.now(),
      }
    }

    // Calculate new XP and level
    const newXP = currentStats.xp + xpAmount
    const newLevel = calculateLevel(newXP)

    // Update stats
    await updateDoc(statsRef, {
      xp: newXP,
      level: newLevel,
      updatedAt: Timestamp.now(),
    })

    console.log(`[v0] Awarded ${xpAmount} XP to user ${userId} for: ${reason}`)

    return {
      ...currentStats,
      xp: newXP,
      level: newLevel,
    }
  } catch (error) {
    console.error("[v0] Error awarding XP:", error)
    return null
  }
}

// Update specific stat
export async function updateUserStat(
  userId: string,
  stat: "eventsAttended" | "clubsJoined" | "certificatesEarned",
  increment = 1,
): Promise<void> {
  try {
    const statsRef = doc(db, "user_stats", userId)
    const statsDoc = await getDoc(statsRef)

    if (statsDoc.exists()) {
      const currentValue = statsDoc.data()[stat] || 0
      await updateDoc(statsRef, {
        [stat]: currentValue + increment,
        updatedAt: Timestamp.now(),
      })
    } else {
      // Create initial stats with the increment
      await updateDoc(statsRef, {
        xp: 0,
        level: 1,
        eventsAttended: stat === "eventsAttended" ? increment : 0,
        clubsJoined: stat === "clubsJoined" ? increment : 0,
        certificatesEarned: stat === "certificatesEarned" ? increment : 0,
        updatedAt: Timestamp.now(),
      })
    }
  } catch (error) {
    console.error("[v0] Error updating user stat:", error)
  }
}

// Format relative time
export function formatRelativeTime(timestamp: any): string {
  if (!timestamp) return "Just now"

  const date = timestamp.toDate ? timestamp.toDate() : new Date(timestamp)
  const now = new Date()
  const diffInSeconds = Math.floor((now.getTime() - date.getTime()) / 1000)

  if (diffInSeconds < 60) return "Just now"
  if (diffInSeconds < 3600) return `${Math.floor(diffInSeconds / 60)} minutes ago`
  if (diffInSeconds < 86400) return `${Math.floor(diffInSeconds / 3600)} hours ago`
  if (diffInSeconds < 604800) return `${Math.floor(diffInSeconds / 86400)} days ago`
  if (diffInSeconds < 2592000) return `${Math.floor(diffInSeconds / 604800)} weeks ago`
  return `${Math.floor(diffInSeconds / 2592000)} months ago`
}
