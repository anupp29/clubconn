"use client"

import type React from "react"
import { createContext, useContext, useEffect, useState } from "react"
import {
  type User,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  signOut as firebaseSignOut,
  onAuthStateChanged,
  GoogleAuthProvider,
  GithubAuthProvider,
  signInWithPopup,
} from "firebase/auth"
import { auth } from "@/lib/firebase"
import { createUserProfile, getUserProfile, type UserProfile } from "@/lib/firestore"

interface AuthContextType {
  user: User | null
  userProfile: UserProfile | null
  loading: boolean
  profileChecked: boolean
  signIn: (email: string, password: string) => Promise<void>
  signUp: (email: string, password: string, username: string, displayName: string) => Promise<void>
  signInWithGoogle: () => Promise<void>
  signInWithGithub: () => Promise<void>
  signOut: () => Promise<void>
  refreshUserProfile: () => Promise<void>
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null)
  const [userProfile, setUserProfile] = useState<UserProfile | null>(null)
  const [loading, setLoading] = useState(true)
  const [profileChecked, setProfileChecked] = useState(false)

  // Fetch user profile when user changes
  const fetchUserProfile = async (uid: string) => {
    try {
      const profile = await getUserProfile(uid)
      console.log("[v0] Fetched user profile:", profile)
      setUserProfile(profile)
      setProfileChecked(true)
      return profile
    } catch (error) {
      console.error("[v0] Error fetching user profile:", error)
      setProfileChecked(true)
      return null
    }
  }

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      console.log("[v0] Auth state changed:", user?.uid)
      setUser(user)
      if (user) {
        await fetchUserProfile(user.uid)
      } else {
        setUserProfile(null)
        setProfileChecked(false)
      }
      setLoading(false)
    })

    return unsubscribe
  }, [])

  const signIn = async (email: string, password: string) => {
    await signInWithEmailAndPassword(auth, email, password)
  }

  const signUp = async (email: string, password: string, username: string, displayName: string) => {
    const userCredential = await createUserWithEmailAndPassword(auth, email, password)
    await createUserProfile(userCredential.user.uid, {
      uid: userCredential.user.uid,
      username,
      displayName,
      email,
    })
    await fetchUserProfile(userCredential.user.uid)
  }

  const signInWithGoogle = async () => {
    const provider = new GoogleAuthProvider()
    const result = await signInWithPopup(auth, provider)

    const profile = await fetchUserProfile(result.user.uid)
    if (!profile) {
      console.log("[v0] New Google user - needs username setup")
    } else {
      console.log("[v0] Returning Google user - profile exists")
    }
  }

  const signInWithGithub = async () => {
    const provider = new GithubAuthProvider()
    const result = await signInWithPopup(auth, provider)

    const profile = await fetchUserProfile(result.user.uid)
    if (!profile) {
      console.log("[v0] New GitHub user - needs username setup")
    } else {
      console.log("[v0] Returning GitHub user - profile exists")
    }
  }

  const signOut = async () => {
    await firebaseSignOut(auth)
    setUserProfile(null)
    setProfileChecked(false)
  }

  const refreshUserProfile = async () => {
    if (user) {
      await fetchUserProfile(user.uid)
    }
  }

  const value = {
    user,
    userProfile,
    loading,
    profileChecked,
    signIn,
    signUp,
    signInWithGoogle,
    signInWithGithub,
    signOut,
    refreshUserProfile,
  }

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}

export function useAuth() {
  const context = useContext(AuthContext)
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider")
  }
  return context
}
