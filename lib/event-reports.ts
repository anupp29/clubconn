import { db } from "./firebase"
import { doc, getDoc, setDoc, updateDoc, type Timestamp, serverTimestamp } from "firebase/firestore"

export interface EventReportData {
  // Executive Summary
  highlights: string[]
  objectives_achieved: string[]
  key_outcomes: string[]

  // Statistics
  statistics: {
    registrations: number
    attendance: number
    attendanceRate: number
    satisfactionScore: number
    certificatesIssued: number
    speakerRating: number
  }

  // Financial Summary
  financials: {
    budget: number
    expenses: number
    sponsorships: number
    registrationFees: number
    breakdown?: {
      category: string
      amount: number
    }[]
  }

  // Timeline Execution
  timeline: {
    planned_time: string
    actual_time: string
    activity: string
    duration: string
    status: "completed" | "delayed" | "skipped"
    notes?: string
  }[]

  // Team Contributions
  team: {
    name: string
    role: string
    photo?: string
    responsibilities: string
    contributions: string[]
    hours_contributed?: number
  }[]

  // Participant Feedback
  testimonials: {
    name: string
    year: string
    feedback: string
    rating: number
  }[]

  // Media Gallery
  photos: {
    url: string
    caption: string
    uploaded_by?: string
  }[]

  // Impact Metrics
  impactMetrics: {
    label: string
    value: string
    description?: string
  }[]

  // Lessons Learned
  lessons_learned: {
    what_went_well: string[]
    challenges_faced: string[]
    improvements_for_next_time: string[]
  }

  // Recommendations
  recommendations: string[]

  // Metadata
  report_status: "draft" | "submitted" | "approved"
  created_by: string
  created_at: Timestamp
  updated_at: Timestamp
  submitted_at?: Timestamp
  approved_by?: string
  approved_at?: Timestamp
}

export async function getEventReport(eventId: string): Promise<EventReportData | null> {
  try {
    const reportDoc = await getDoc(doc(db, "event_reports", eventId))
    if (reportDoc.exists()) {
      return reportDoc.data() as EventReportData
    }
    return null
  } catch (error) {
    console.error("Error fetching event report:", error)
    return null
  }
}

export async function createEventReport(
  eventId: string,
  reportData: Partial<EventReportData>,
  userId: string,
): Promise<void> {
  try {
    const reportRef = doc(db, "event_reports", eventId)
    await setDoc(reportRef, {
      ...reportData,
      report_status: "draft",
      created_by: userId,
      created_at: serverTimestamp(),
      updated_at: serverTimestamp(),
    })
  } catch (error) {
    console.error("Error creating event report:", error)
    throw error
  }
}

export async function updateEventReport(eventId: string, reportData: Partial<EventReportData>): Promise<void> {
  try {
    const reportRef = doc(db, "event_reports", eventId)
    await updateDoc(reportRef, {
      ...reportData,
      updated_at: serverTimestamp(),
    })
  } catch (error) {
    console.error("Error updating event report:", error)
    throw error
  }
}

export async function submitEventReport(eventId: string, userId: string): Promise<void> {
  try {
    const reportRef = doc(db, "event_reports", eventId)
    await updateDoc(reportRef, {
      report_status: "submitted",
      submitted_at: serverTimestamp(),
      updated_at: serverTimestamp(),
    })
  } catch (error) {
    console.error("Error submitting event report:", error)
    throw error
  }
}

export async function approveEventReport(eventId: string, adminId: string): Promise<void> {
  try {
    const reportRef = doc(db, "event_reports", eventId)
    await updateDoc(reportRef, {
      report_status: "approved",
      approved_by: adminId,
      approved_at: serverTimestamp(),
      updated_at: serverTimestamp(),
    })
  } catch (error) {
    console.error("Error approving event report:", error)
    throw error
  }
}
