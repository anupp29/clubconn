import {
  collection,
  doc,
  getDoc,
  getDocs,
  query,
  where,
  addDoc,
  updateDoc,
  increment,
  Timestamp,
} from "firebase/firestore"
import { db } from "./firebase"
import { awardXP, XP_REWARDS } from "./gamification"

// Feedback Types
export interface EventFeedback {
  id: string
  eventId: string
  userId: string
  rating: number // 1-5
  comment: string
  categories: {
    organization: number
    content: number
    venue: number
    overall: number
  }
  createdAt: Timestamp
}

// Poll Types
export interface Poll {
  id: string
  clubId: string
  title: string
  description?: string
  options: PollOption[]
  createdBy: string
  createdAt: Timestamp
  expiresAt?: Timestamp
  isActive: boolean
  totalVotes: number
}

export interface PollOption {
  id: string
  text: string
  votes: number
}

export interface PollVote {
  id: string
  pollId: string
  userId: string
  optionId: string
  createdAt: Timestamp
}

// QR Code Check-in
export interface EventCheckIn {
  id: string
  eventId: string
  userId: string
  checkedInAt: Timestamp
  method: "qr" | "manual"
}

// Submit event feedback
export async function submitEventFeedback(
  eventId: string,
  userId: string,
  rating: number,
  comment: string,
  categories: { organization: number; content: number; venue: number; overall: number },
): Promise<EventFeedback | null> {
  try {
    const feedback: Omit<EventFeedback, "id"> = {
      eventId,
      userId,
      rating,
      comment,
      categories,
      createdAt: Timestamp.now(),
    }

    const docRef = await addDoc(collection(db, "event_feedback"), feedback)

    // Award XP for submitting feedback
    await awardXP(userId, XP_REWARDS.SUBMIT_FEEDBACK, "Submitted event feedback")

    console.log(`[v0] Feedback submitted for event ${eventId} by user ${userId}`)

    return {
      id: docRef.id,
      ...feedback,
    }
  } catch (error) {
    console.error("[v0] Error submitting feedback:", error)
    return null
  }
}

// Get event feedback
export async function getEventFeedback(eventId: string): Promise<EventFeedback[]> {
  try {
    const q = query(collection(db, "event_feedback"), where("eventId", "==", eventId))
    const snapshot = await getDocs(q)

    return snapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    })) as EventFeedback[]
  } catch (error) {
    console.error("[v0] Error fetching event feedback:", error)
    return []
  }
}

// Check if user has submitted feedback
export async function hasUserSubmittedFeedback(eventId: string, userId: string): Promise<boolean> {
  try {
    const q = query(collection(db, "event_feedback"), where("eventId", "==", eventId), where("userId", "==", userId))
    const snapshot = await getDocs(q)
    return !snapshot.empty
  } catch (error) {
    console.error("[v0] Error checking feedback:", error)
    return false
  }
}

// Create a poll
export async function createPoll(
  clubId: string,
  title: string,
  options: string[],
  createdBy: string,
  description?: string,
  expiresInDays?: number,
): Promise<Poll | null> {
  try {
    const pollOptions: PollOption[] = options.map((text, index) => ({
      id: `option_${index}`,
      text,
      votes: 0,
    }))

    const poll: Omit<Poll, "id"> = {
      clubId,
      title,
      description,
      options: pollOptions,
      createdBy,
      createdAt: Timestamp.now(),
      expiresAt: expiresInDays
        ? Timestamp.fromDate(new Date(Date.now() + expiresInDays * 24 * 60 * 60 * 1000))
        : undefined,
      isActive: true,
      totalVotes: 0,
    }

    const docRef = await addDoc(collection(db, "polls"), poll)

    console.log(`[v0] Poll created: ${title}`)

    return {
      id: docRef.id,
      ...poll,
    }
  } catch (error) {
    console.error("[v0] Error creating poll:", error)
    return null
  }
}

// Vote on a poll
export async function voteOnPoll(pollId: string, userId: string, optionId: string): Promise<boolean> {
  try {
    // Check if user has already voted
    const existingVoteQuery = query(
      collection(db, "poll_votes"),
      where("pollId", "==", pollId),
      where("userId", "==", userId),
    )
    const existingVoteSnapshot = await getDocs(existingVoteQuery)

    if (!existingVoteSnapshot.empty) {
      console.log("[v0] User has already voted on this poll")
      return false
    }

    // Record the vote
    const vote: Omit<PollVote, "id"> = {
      pollId,
      userId,
      optionId,
      createdAt: Timestamp.now(),
    }

    await addDoc(collection(db, "poll_votes"), vote)

    // Update poll option vote count
    const pollRef = doc(db, "polls", pollId)
    const pollDoc = await getDoc(pollRef)

    if (pollDoc.exists()) {
      const pollData = pollDoc.data() as Poll
      const updatedOptions = pollData.options.map((option) =>
        option.id === optionId ? { ...option, votes: option.votes + 1 } : option,
      )

      await updateDoc(pollRef, {
        options: updatedOptions,
        totalVotes: increment(1),
      })
    }

    // Award XP for completing poll
    await awardXP(userId, XP_REWARDS.COMPLETE_POLL, "Voted on a poll")

    console.log(`[v0] User ${userId} voted on poll ${pollId}`)

    return true
  } catch (error) {
    console.error("[v0] Error voting on poll:", error)
    return false
  }
}

// Get club polls
export async function getClubPolls(clubId: string): Promise<Poll[]> {
  try {
    const q = query(collection(db, "polls"), where("clubId", "==", clubId), where("isActive", "==", true))
    const snapshot = await getDocs(q)

    return snapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    })) as Poll[]
  } catch (error) {
    console.error("[v0] Error fetching club polls:", error)
    return []
  }
}

// Check if user has voted on poll
export async function hasUserVoted(pollId: string, userId: string): Promise<boolean> {
  try {
    const q = query(collection(db, "poll_votes"), where("pollId", "==", pollId), where("userId", "==", userId))
    const snapshot = await getDocs(q)
    return !snapshot.empty
  } catch (error) {
    console.error("[v0] Error checking vote:", error)
    return false
  }
}

// QR Code Check-in
export async function checkInToEvent(eventId: string, userId: string, method: "qr" | "manual"): Promise<boolean> {
  try {
    // Check if already checked in
    const existingCheckInQuery = query(
      collection(db, "event_checkins"),
      where("eventId", "==", eventId),
      where("userId", "==", userId),
    )
    const existingCheckInSnapshot = await getDocs(existingCheckInQuery)

    if (!existingCheckInSnapshot.empty) {
      console.log("[v0] User already checked in to this event")
      return false
    }

    // Record check-in
    const checkIn: Omit<EventCheckIn, "id"> = {
      eventId,
      userId,
      checkedInAt: Timestamp.now(),
      method,
    }

    await addDoc(collection(db, "event_checkins"), checkIn)

    // Award XP for attending event
    await awardXP(userId, XP_REWARDS.ATTEND_EVENT, "Checked in to event")

    console.log(`[v0] User ${userId} checked in to event ${eventId}`)

    return true
  } catch (error) {
    console.error("[v0] Error checking in to event:", error)
    return false
  }
}

// Get event check-ins count
export async function getEventCheckInsCount(eventId: string): Promise<number> {
  try {
    const q = query(collection(db, "event_checkins"), where("eventId", "==", eventId))
    const snapshot = await getDocs(q)
    return snapshot.size
  } catch (error) {
    console.error("[v0] Error fetching check-ins count:", error)
    return 0
  }
}

// Check if user has checked in
export async function hasUserCheckedIn(eventId: string, userId: string): Promise<boolean> {
  try {
    const q = query(collection(db, "event_checkins"), where("eventId", "==", eventId), where("userId", "==", userId))
    const snapshot = await getDocs(q)
    return !snapshot.empty
  } catch (error) {
    console.error("[v0] Error checking check-in status:", error)
    return false
  }
}
