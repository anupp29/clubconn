"use client"

import { useEffect, useState } from "react"
import { useParams, useRouter } from "next/navigation"
import { getUserProfileByUsername } from "@/lib/firestore"
import { ProfileEditForm } from "@/components/profile/profile-edit-form"
import { useAuth } from "@/contexts/auth-context"
import type { UserProfile } from "@/lib/firestore"

export default function EditProfilePage() {
  const params = useParams()
  const router = useRouter()
  const username = params.username as string
  const { user, loading: authLoading } = useAuth()

  const [profile, setProfile] = useState<UserProfile | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    async function fetchProfile() {
      console.log("[v0] Fetching profile for edit:", username)

      try {
        const profileData = await getUserProfileByUsername(username)
        console.log("[v0] Profile data for edit:", profileData)

        if (!profileData) {
          setError("Profile not found")
          setLoading(false)
          return
        }

        setProfile(profileData)
      } catch (err) {
        console.error("[v0] Error fetching profile for edit:", err)
        setError("Failed to load profile")
      } finally {
        setLoading(false)
      }
    }

    if (username) {
      fetchProfile()
    }
  }, [username])

  // Redirect if not the owner
  useEffect(() => {
    if (!authLoading && !loading && profile && user) {
      if (user.uid !== profile.uid) {
        console.log("[v0] User is not owner, redirecting")
        router.push(`/u/${username}`)
      }
    }
  }, [authLoading, loading, profile, user, username, router])

  if (loading || authLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center space-y-4">
          <div className="h-8 w-8 animate-spin rounded-full border-4 border-primary border-t-transparent mx-auto" />
          <p className="text-muted-foreground">Loading profile...</p>
        </div>
      </div>
    )
  }

  if (error || !profile) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center space-y-4">
          <h1 className="text-2xl font-bold">Profile Not Found</h1>
          <p className="text-muted-foreground">{error || "The profile you're looking for doesn't exist."}</p>
        </div>
      </div>
    )
  }

  if (!user || user.uid !== profile.uid) {
    return null
  }

  return <ProfileEditForm profile={profile} />
}
