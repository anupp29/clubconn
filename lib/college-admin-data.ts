import {
  collection,
  query,
  where,
  getDocs,
  doc,
  updateDoc,
  orderBy,
  limit,
  Timestamp,
  getDoc,
  addDoc,
} from "firebase/firestore"
import { db } from "./firebase"

// Platform Statistics
export async function getPlatformStats() {
  try {
    // Get total users
    const usersSnapshot = await getDocs(collection(db, "users"))
    const totalUsers = usersSnapshot.size
    const activeUsers = usersSnapshot.docs.filter((doc) => doc.data().is_active).length

    // Get total clubs
    const clubsSnapshot = await getDocs(collection(db, "clubs"))
    const totalClubs = clubsSnapshot.size
    const activeClubs = clubsSnapshot.docs.filter((doc) => doc.data().is_active).length
    const pendingClubs = clubsSnapshot.docs.filter((doc) => !doc.data().is_verified).length

    // Get total events
    const eventsSnapshot = await getDocs(collection(db, "events"))
    const totalEvents = eventsSnapshot.size
    const upcomingEvents = eventsSnapshot.docs.filter((doc) => {
      const startDate = doc.data().start_date?.toDate()
      return startDate && startDate > new Date()
    }).length

    // Get total colleges
    const collegesSnapshot = await getDocs(collection(db, "colleges"))
    const totalColleges = collegesSnapshot.size

    return {
      totalUsers,
      activeUsers,
      totalClubs,
      activeClubs,
      pendingClubs,
      totalEvents,
      upcomingEvents,
      totalColleges,
    }
  } catch (error) {
    console.error("Error fetching platform stats:", error)
    throw error
  }
}

// Get all clubs with filters
export async function getAllClubs(filters?: {
  status?: "all" | "active" | "inactive" | "pending"
  collegeId?: string
}) {
  try {
    let q = query(collection(db, "clubs"), orderBy("created_at", "desc"))

    if (filters?.status === "active") {
      q = query(collection(db, "clubs"), where("is_active", "==", true), orderBy("created_at", "desc"))
    } else if (filters?.status === "inactive") {
      q = query(collection(db, "clubs"), where("is_active", "==", false), orderBy("created_at", "desc"))
    } else if (filters?.status === "pending") {
      q = query(collection(db, "clubs"), where("is_verified", "==", false), orderBy("created_at", "desc"))
    }

    const snapshot = await getDocs(q)
    const clubs = snapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }))

    // Filter by college if specified
    if (filters?.collegeId) {
      return clubs.filter((club) => club.college_id === filters.collegeId)
    }

    return clubs
  } catch (error) {
    console.error("Error fetching clubs:", error)
    throw error
  }
}

// Approve/Verify a club
export async function verifyClub(clubId: string, adminUid: string) {
  try {
    const clubRef = doc(db, "clubs", clubId)
    await updateDoc(clubRef, {
      is_verified: true,
      updated_at: Timestamp.now(),
    })

    // Log audit
    await addDoc(collection(db, "audit_logs"), {
      actor_uid: adminUid,
      action: "approve",
      resource_type: "club",
      resource_id: clubId,
      timestamp: Timestamp.now(),
    })

    return true
  } catch (error) {
    console.error("Error verifying club:", error)
    throw error
  }
}

// Deactivate a club
export async function deactivateClub(clubId: string, adminUid: string) {
  try {
    const clubRef = doc(db, "clubs", clubId)
    await updateDoc(clubRef, {
      is_active: false,
      updated_at: Timestamp.now(),
    })

    // Log audit
    await addDoc(collection(db, "audit_logs"), {
      actor_uid: adminUid,
      action: "status_change",
      resource_type: "club",
      resource_id: clubId,
      changes: [{ field: "is_active", old_value: true, new_value: false }],
      timestamp: Timestamp.now(),
    })

    return true
  } catch (error) {
    console.error("Error deactivating club:", error)
    throw error
  }
}

// Activate a club
export async function activateClub(clubId: string, adminUid: string) {
  try {
    const clubRef = doc(db, "clubs", clubId)
    await updateDoc(clubRef, {
      is_active: true,
      updated_at: Timestamp.now(),
    })

    // Log audit
    await addDoc(collection(db, "audit_logs"), {
      actor_uid: adminUid,
      action: "status_change",
      resource_type: "club",
      resource_id: clubId,
      changes: [{ field: "is_active", old_value: false, new_value: true }],
      timestamp: Timestamp.now(),
    })

    return true
  } catch (error) {
    console.error("Error activating club:", error)
    throw error
  }
}

// Get all users with filters
export async function getAllUsers(filters?: {
  role?: "all" | "platform_admin" | "user"
  collegeId?: string
  status?: "all" | "active" | "inactive"
}) {
  try {
    const q = query(collection(db, "users"), orderBy("created_at", "desc"), limit(100))

    const snapshot = await getDocs(q)
    let users = snapshot.docs.map((doc) => ({
      uid: doc.id,
      ...doc.data(),
    }))

    // Apply filters
    if (filters?.role && filters.role !== "all") {
      users = users.filter((user) => user.platform_role === filters.role)
    }

    if (filters?.collegeId) {
      users = users.filter((user) => user.college_id === filters.collegeId)
    }

    if (filters?.status === "active") {
      users = users.filter((user) => user.is_active)
    } else if (filters?.status === "inactive") {
      users = users.filter((user) => !user.is_active)
    }

    return users
  } catch (error) {
    console.error("Error fetching users:", error)
    throw error
  }
}

// Update user role
export async function updateUserRole(uid: string, newRole: "platform_admin" | "user", adminUid: string) {
  try {
    const userRef = doc(db, "users", uid)
    const userDoc = await getDoc(userRef)
    const oldRole = userDoc.data()?.platform_role

    await updateDoc(userRef, {
      platform_role: newRole,
      updated_at: Timestamp.now(),
    })

    // Log audit
    await addDoc(collection(db, "audit_logs"), {
      actor_uid: adminUid,
      action: "role_change",
      resource_type: "user",
      resource_id: uid,
      changes: [{ field: "platform_role", old_value: oldRole, new_value: newRole }],
      timestamp: Timestamp.now(),
    })

    return true
  } catch (error) {
    console.error("Error updating user role:", error)
    throw error
  }
}

// Deactivate user
export async function deactivateUser(uid: string, adminUid: string) {
  try {
    const userRef = doc(db, "users", uid)
    await updateDoc(userRef, {
      is_active: false,
      updated_at: Timestamp.now(),
    })

    // Log audit
    await addDoc(collection(db, "audit_logs"), {
      actor_uid: adminUid,
      action: "status_change",
      resource_type: "user",
      resource_id: uid,
      changes: [{ field: "is_active", old_value: true, new_value: false }],
      timestamp: Timestamp.now(),
    })

    return true
  } catch (error) {
    console.error("Error deactivating user:", error)
    throw error
  }
}

// Get all events with filters
export async function getAllEvents(filters?: {
  status?: "all" | "upcoming" | "past" | "draft"
  collegeId?: string
}) {
  try {
    const q = query(collection(db, "events"), orderBy("start_date", "desc"), limit(100))

    const snapshot = await getDocs(q)
    let events = snapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }))

    // Apply filters
    const now = new Date()
    if (filters?.status === "upcoming") {
      events = events.filter((event) => {
        const startDate = event.start_date?.toDate()
        return startDate && startDate > now
      })
    } else if (filters?.status === "past") {
      events = events.filter((event) => {
        const endDate = event.end_date?.toDate()
        return endDate && endDate < now
      })
    } else if (filters?.status === "draft") {
      events = events.filter((event) => event.status === "draft")
    }

    if (filters?.collegeId) {
      events = events.filter((event) => event.college_id === filters.collegeId)
    }

    return events
  } catch (error) {
    console.error("Error fetching events:", error)
    throw error
  }
}

// Get hall requests
export async function getHallRequests(filters?: {
  status?: "all" | "pending" | "approved" | "rejected"
  collegeId?: string
}) {
  try {
    let q = query(collection(db, "hall_requests"), orderBy("requested_date", "desc"))

    if (filters?.status && filters.status !== "all") {
      q = query(
        collection(db, "hall_requests"),
        where("status", "==", filters.status),
        orderBy("requested_date", "desc"),
      )
    }

    const snapshot = await getDocs(q)
    let requests = snapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }))

    if (filters?.collegeId) {
      requests = requests.filter((req) => req.college_id === filters.collegeId)
    }

    return requests
  } catch (error) {
    console.error("Error fetching hall requests:", error)
    throw error
  }
}

// Approve hall request
export async function approveHallRequest(requestId: string, adminUid: string) {
  try {
    const requestRef = doc(db, "hall_requests", requestId)
    await updateDoc(requestRef, {
      status: "approved",
      approved_by: adminUid,
      approved_at: Timestamp.now(),
      updated_at: Timestamp.now(),
    })

    // Log audit
    await addDoc(collection(db, "audit_logs"), {
      actor_uid: adminUid,
      action: "approve",
      resource_type: "hall_request",
      resource_id: requestId,
      timestamp: Timestamp.now(),
    })

    return true
  } catch (error) {
    console.error("Error approving hall request:", error)
    throw error
  }
}

// Reject hall request
export async function rejectHallRequest(requestId: string, adminUid: string, reason: string) {
  try {
    const requestRef = doc(db, "hall_requests", requestId)
    await updateDoc(requestRef, {
      status: "rejected",
      approved_by: adminUid,
      approved_at: Timestamp.now(),
      rejection_reason: reason,
      updated_at: Timestamp.now(),
    })

    // Log audit
    await addDoc(collection(db, "audit_logs"), {
      actor_uid: adminUid,
      action: "reject",
      resource_type: "hall_request",
      resource_id: requestId,
      timestamp: Timestamp.now(),
    })

    return true
  } catch (error) {
    console.error("Error rejecting hall request:", error)
    throw error
  }
}

// Get audit logs
export async function getAuditLogs(filters?: {
  resourceType?: string
  actorUid?: string
  limit?: number
}) {
  try {
    const q = query(collection(db, "audit_logs"), orderBy("timestamp", "desc"), limit(filters?.limit || 50))

    const snapshot = await getDocs(q)
    let logs = snapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }))

    if (filters?.resourceType) {
      logs = logs.filter((log) => log.resource_type === filters.resourceType)
    }

    if (filters?.actorUid) {
      logs = logs.filter((log) => log.actor_uid === filters.actorUid)
    }

    return logs
  } catch (error) {
    console.error("Error fetching audit logs:", error)
    throw error
  }
}

// Get analytics data
export async function getAnalyticsData() {
  try {
    // User growth (last 30 days)
    const thirtyDaysAgo = new Date()
    thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30)

    const usersSnapshot = await getDocs(collection(db, "users"))
    const users = usersSnapshot.docs.map((doc) => ({
      created_at: doc.data().created_at?.toDate(),
    }))

    const userGrowth = users.filter((user) => user.created_at && user.created_at >= thirtyDaysAgo).length

    // Club growth
    const clubsSnapshot = await getDocs(collection(db, "clubs"))
    const clubs = clubsSnapshot.docs.map((doc) => ({
      created_at: doc.data().created_at?.toDate(),
    }))

    const clubGrowth = clubs.filter((club) => club.created_at && club.created_at >= thirtyDaysAgo).length

    // Event participation
    const eventsSnapshot = await getDocs(collection(db, "events"))
    const totalParticipants = eventsSnapshot.docs.reduce((sum, doc) => sum + (doc.data().current_participants || 0), 0)

    return {
      userGrowth,
      clubGrowth,
      totalParticipants,
      avgParticipantsPerEvent: eventsSnapshot.size > 0 ? Math.round(totalParticipants / eventsSnapshot.size) : 0,
    }
  } catch (error) {
    console.error("Error fetching analytics:", error)
    throw error
  }
}
