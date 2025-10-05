import { collection, doc, getDoc, getDocs, query, where, addDoc, Timestamp } from "firebase/firestore"
import { db } from "./firebase"
import { awardXP, updateUserStat, XP_REWARDS } from "./gamification"

export interface Certificate {
  id: string
  userId: string
  type: "event" | "club" | "achievement" | "participation"
  title: string
  description: string
  issuedBy: string // Club name or college name
  issuedDate: Timestamp
  eventId?: string
  clubId?: string
  badgeId?: string
  verificationCode: string
  metadata?: {
    eventDate?: string
    eventLocation?: string
    hoursAttended?: number
    role?: string
    [key: string]: any
  }
}

// Certificate templates
export const CERTIFICATE_TYPES = {
  EVENT_ATTENDANCE: {
    type: "event" as const,
    title: "Certificate of Attendance",
    description: "For attending and participating in",
  },
  EVENT_ORGANIZER: {
    type: "event" as const,
    title: "Certificate of Organization",
    description: "For successfully organizing",
  },
  CLUB_PARTICIPATION: {
    type: "club" as const,
    title: "Certificate of Active Participation",
    description: "For active participation in",
  },
  CLUB_LEADERSHIP: {
    type: "club" as const,
    title: "Certificate of Leadership",
    description: "For outstanding leadership in",
  },
  ACHIEVEMENT: {
    type: "achievement" as const,
    title: "Certificate of Achievement",
    description: "For achieving",
  },
}

// Generate unique verification code
function generateVerificationCode(): string {
  const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789"
  let code = ""
  for (let i = 0; i < 12; i++) {
    code += chars.charAt(Math.floor(Math.random() * chars.length))
    if ((i + 1) % 4 === 0 && i < 11) code += "-"
  }
  return code
}

// Issue a certificate
export async function issueCertificate(
  userId: string,
  certificateData: Omit<Certificate, "id" | "issuedDate" | "verificationCode">,
): Promise<Certificate | null> {
  try {
    const verificationCode = generateVerificationCode()

    const certificate: Omit<Certificate, "id"> = {
      ...certificateData,
      issuedDate: Timestamp.now(),
      verificationCode,
    }

    const docRef = await addDoc(collection(db, "certificates"), certificate)

    // Award XP for earning certificate
    await awardXP(userId, XP_REWARDS.EARN_CERTIFICATE, `Earned certificate: ${certificateData.title}`)

    // Update certificate count
    await updateUserStat(userId, "certificatesEarned", 1)

    console.log(`[v0] Certificate issued to user ${userId}: ${certificateData.title}`)

    return {
      id: docRef.id,
      ...certificate,
    }
  } catch (error) {
    console.error("[v0] Error issuing certificate:", error)
    return null
  }
}

// Get user certificates
export async function getUserCertificates(userId: string): Promise<Certificate[]> {
  try {
    const q = query(collection(db, "certificates"), where("userId", "==", userId))
    const snapshot = await getDocs(q)

    return snapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    })) as Certificate[]
  } catch (error) {
    console.error("[v0] Error fetching user certificates:", error)
    return []
  }
}

// Get certificate by ID
export async function getCertificateById(certificateId: string): Promise<Certificate | null> {
  try {
    const docRef = doc(db, "certificates", certificateId)
    const docSnap = await getDoc(docRef)

    if (docSnap.exists()) {
      return {
        id: docSnap.id,
        ...docSnap.data(),
      } as Certificate
    }

    return null
  } catch (error) {
    console.error("[v0] Error fetching certificate:", error)
    return null
  }
}

// Verify certificate by verification code
export async function verifyCertificate(verificationCode: string): Promise<Certificate | null> {
  try {
    const q = query(collection(db, "certificates"), where("verificationCode", "==", verificationCode))
    const snapshot = await getDocs(q)

    if (snapshot.empty) {
      return null
    }

    const doc = snapshot.docs[0]
    return {
      id: doc.id,
      ...doc.data(),
    } as Certificate
  } catch (error) {
    console.error("[v0] Error verifying certificate:", error)
    return null
  }
}

// Issue event attendance certificate
export async function issueEventCertificate(
  userId: string,
  eventId: string,
  eventTitle: string,
  clubName: string,
  eventDate: string,
  eventLocation: string,
  hoursAttended: number,
): Promise<Certificate | null> {
  return issueCertificate(userId, {
    userId,
    type: "event",
    title: `${CERTIFICATE_TYPES.EVENT_ATTENDANCE.title}`,
    description: `${CERTIFICATE_TYPES.EVENT_ATTENDANCE.description} ${eventTitle}`,
    issuedBy: clubName,
    eventId,
    metadata: {
      eventDate,
      eventLocation,
      hoursAttended,
    },
  })
}

// Issue club participation certificate
export async function issueClubCertificate(
  userId: string,
  clubId: string,
  clubName: string,
  role: string,
  isLeadership: boolean,
): Promise<Certificate | null> {
  const template = isLeadership ? CERTIFICATE_TYPES.CLUB_LEADERSHIP : CERTIFICATE_TYPES.CLUB_PARTICIPATION

  return issueCertificate(userId, {
    userId,
    type: "club",
    title: template.title,
    description: `${template.description} ${clubName}`,
    issuedBy: clubName,
    clubId,
    metadata: {
      role,
    },
  })
}

// Issue achievement certificate
export async function issueAchievementCertificate(
  userId: string,
  achievementName: string,
  badgeId: string,
): Promise<Certificate | null> {
  return issueCertificate(userId, {
    userId,
    type: "achievement",
    title: CERTIFICATE_TYPES.ACHIEVEMENT.title,
    description: `${CERTIFICATE_TYPES.ACHIEVEMENT.description} ${achievementName}`,
    issuedBy: "ClubConn Platform",
    badgeId,
    metadata: {},
  })
}

// Format certificate date
export function formatCertificateDate(timestamp: Timestamp): string {
  const date = timestamp.toDate()
  return date.toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  })
}
