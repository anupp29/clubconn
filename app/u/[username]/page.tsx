"use client"

import { useEffect, useState } from "react"
import { useParams } from "next/navigation"
import { getUserProfileByUsername, type UserProfile } from "@/lib/firestore"
import { ProfileView } from "@/components/profile/profile-view"
import { Card, CardContent } from "@/components/ui/card"
import { Loader2 } from "lucide-react"

export default function UserProfilePage() {
  const params = useParams()
  const username = params.username as string
  const [profile, setProfile] = useState<UserProfile | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    async function fetchProfile() {
      try {
        console.log("[v0] Fetching profile for username:", username)
        const profileData = await getUserProfileByUsername(username)
        console.log("[v0] Profile data received:", profileData)

        if (!profileData) {
          setError("User not found")
        } else {
          setProfile(profileData)
          document.title = `${profileData.displayName} (@${profileData.username}) - ClubConn`
        }
      } catch (err) {
        console.error("[v0] Error fetching profile:", err)
        setError("Failed to load profile")
      } finally {
        setLoading(false)
      }
    }

    fetchProfile()
  }, [username])

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-background to-muted/20 flex items-center justify-center">
        <Card className="w-full max-w-md">
          <CardContent className="pt-6 text-center">
            <Loader2 className="h-12 w-12 animate-spin text-primary mx-auto mb-4" />
            <h3 className="text-xl font-semibold mb-2">Loading profile...</h3>
            <p className="text-muted-foreground">Please wait while we fetch the profile</p>
          </CardContent>
        </Card>
      </div>
    )
  }

  if (error || !profile) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-background to-muted/20 flex items-center justify-center">
        <Card className="w-full max-w-md">
          <CardContent className="pt-6 text-center">
            <div className="text-6xl mb-4">😕</div>
            <h3 className="text-xl font-semibold mb-2">User Not Found</h3>
            <p className="text-muted-foreground mb-4">
              The user @{username} doesn't exist or the profile couldn't be loaded.
            </p>
            <a href="/" className="text-primary hover:underline">
              Return to home
            </a>
          </CardContent>
        </Card>
      </div>
    )
  }

  return <ProfileView profile={profile} />
}
