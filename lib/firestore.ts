import { collection, doc, getDoc, setDoc, updateDoc, getDocs, deleteDoc, serverTimestamp } from "firebase/firestore"
import { db } from "./firebase"

export interface UserProfile {
  uid: string
  username: string
  displayName: string
  email: string
  bio?: string
  profileImage?: string
  socialLinks?: {
    linkedin?: string
    github?: string
    twitter?: string
    website?: string
  }
  achievements?: string[]
  joinedClubs?: string[]
  createdAt: any
  updatedAt: any
}

export interface CityCommunity {
  community_id: string
  name: string
  slug: string
  description: string
  city: string
  state: string
  logo_url: string
  banner_url?: string
  website?: string
  github?: string
  twitter?: string
  linkedin?: string
  discord?: string
  telegram?: string
  is_active: boolean
  total_members: number
  total_events: number
  created_by: string
  created_at: any
  updated_at: any
}

// Check if username is available
export async function isUsernameAvailable(username: string): Promise<boolean> {
  const usernameDoc = await getDoc(doc(db, "usernames", username.toLowerCase()))
  return !usernameDoc.exists()
}

// Create user profile
export async function createUserProfile(uid: string, data: Partial<UserProfile>): Promise<void> {
  const username = data.username?.toLowerCase()
  if (!username) throw new Error("Username is required")

  // Check username availability
  const available = await isUsernameAvailable(username)
  if (!available) throw new Error("Username already taken")

  const profileData = {
    ...data,
    username,
    uid,
    createdAt: serverTimestamp(),
    updatedAt: serverTimestamp(),
  }

  // Create user profile in Firebase
  await setDoc(doc(db, "users", uid), profileData)

  // Reserve username
  await setDoc(doc(db, "usernames", username), { uid })
}

// Get user profile by UID
export async function getUserProfile(uid: string): Promise<UserProfile | null> {
  const userDoc = await getDoc(doc(db, "users", uid))
  if (!userDoc.exists()) return null
  return userDoc.data() as UserProfile
}

// Get user profile by username
export async function getUserProfileByUsername(username: string): Promise<UserProfile | null> {
  // First get UID from username
  const usernameDoc = await getDoc(doc(db, "usernames", username.toLowerCase()))
  if (!usernameDoc.exists()) return null

  const uid = usernameDoc.data().uid
  return getUserProfile(uid)
}

// Update user profile
export async function updateUserProfile(uid: string, data: Partial<UserProfile>): Promise<void> {
  const updateData = {
    ...data,
    updatedAt: serverTimestamp(),
  }

  if (data.username) {
    const newUsername = data.username.toLowerCase()
    const currentProfile = await getUserProfile(uid)

    if (currentProfile && currentProfile.username !== newUsername) {
      // Check if new username is available
      const available = await isUsernameAvailable(newUsername)
      if (!available) throw new Error("Username already taken")

      // Delete old username reservation
      await deleteDoc(doc(db, "usernames", currentProfile.username))

      // Reserve new username
      await setDoc(doc(db, "usernames", newUsername), { uid })
    }

    updateData.username = newUsername
  }

  await updateDoc(doc(db, "users", uid), updateData)
}

// Get all users (for admin purposes)
export async function getAllUsers(): Promise<UserProfile[]> {
  const usersSnapshot = await getDocs(collection(db, "users"))
  return usersSnapshot.docs.map((doc) => doc.data() as UserProfile)
}

// Get city community by slug
export async function getCityCommunity(slug: string): Promise<CityCommunity | null> {
  const communitiesSnapshot = await getDocs(collection(db, "city_communities"))
  const community = communitiesSnapshot.docs.find((doc) => doc.data().slug === slug)
  if (!community) return null
  return { ...community.data(), community_id: community.id } as CityCommunity
}

export async function getAllCityCommunities(): Promise<CityCommunity[]> {
  const communitiesSnapshot = await getDocs(collection(db, "city_communities"))
  return communitiesSnapshot.docs.map((doc) => ({
    ...doc.data(),
    community_id: doc.id,
  })) as CityCommunity[]
}
