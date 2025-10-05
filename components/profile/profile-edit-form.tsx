"use client"

import type React from "react"
import { AvatarSelector } from "../auth/avatar-selector"
import { DEFAULT_AVATARS, getDefaultAvatar } from "@/lib/default-avatars"
import type { UserProfile } from "@/lib/firestore"
import { useAuth } from "@/contexts/auth-context"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Badge } from "@/components/ui/badge"
import { updateUserProfile, isUsernameAvailable } from "@/lib/firestore"
import { useRouter } from "next/navigation"
import { useState, useEffect } from "react"
import { ArrowLeft, Plus, X, Save, Check } from "lucide-react"
import Link from "next/link"

interface ProfileEditFormProps {
  profile: UserProfile
}

export function ProfileEditForm({ profile }: ProfileEditFormProps) {
  const { user, userProfile, refreshUserProfile, loading: authLoading } = useAuth()
  const router = useRouter()
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState("")
  const [success, setSuccess] = useState(false)

  // Form state
  const [displayName, setDisplayName] = useState(profile.displayName)
  const [username, setUsername] = useState(profile.username)
  const [bio, setBio] = useState(profile.bio || "")
  const [linkedin, setLinkedin] = useState(profile.socialLinks?.linkedin || "")
  const [github, setGithub] = useState(profile.socialLinks?.github || "")
  const [twitter, setTwitter] = useState(profile.socialLinks?.twitter || "")
  const [website, setWebsite] = useState(profile.socialLinks?.website || "")
  const [achievements, setAchievements] = useState<string[]>(profile.achievements || [])
  const [joinedClubs, setJoinedClubs] = useState<string[]>(profile.joinedClubs || [])

  // New item inputs
  const [newAchievement, setNewAchievement] = useState("")
  const [newClub, setNewClub] = useState("")

  // Username validation
  const [usernameStatus, setUsernameStatus] = useState<"idle" | "checking" | "available" | "taken">("idle")

  const [selectedAvatar, setSelectedAvatar] = useState(() => {
    const currentAvatar = DEFAULT_AVATARS.find((a) => a.url === profile.profileImage)
    return currentAvatar?.id || DEFAULT_AVATARS[0].id
  })

  useEffect(() => {
    if (!authLoading && (!user || user.uid !== profile.uid)) {
      router.push(`/u/${profile.username}`)
    }
  }, [user, profile.uid, authLoading, router, profile.username])

  const checkUsername = async (value: string) => {
    if (value === profile.username) {
      setUsernameStatus("idle")
      return
    }

    if (value.length < 3) {
      setUsernameStatus("idle")
      return
    }

    setUsernameStatus("checking")
    try {
      const available = await isUsernameAvailable(value)
      setUsernameStatus(available ? "available" : "taken")
    } catch (err) {
      console.error("[v0] Error checking username:", err)
      setUsernameStatus("idle")
    }
  }

  const handleUsernameChange = (value: string) => {
    const sanitized = value.toLowerCase().replace(/[^a-z0-9_]/g, "")
    setUsername(sanitized)
    checkUsername(sanitized)
  }

  const addAchievement = () => {
    if (newAchievement.trim()) {
      setAchievements([...achievements, newAchievement.trim()])
      setNewAchievement("")
    }
  }

  const removeAchievement = (index: number) => {
    setAchievements(achievements.filter((_, i) => i !== index))
  }

  const addClub = () => {
    if (newClub.trim()) {
      setJoinedClubs([...joinedClubs, newClub.trim()])
      setNewClub("")
    }
  }

  const removeClub = (index: number) => {
    setJoinedClubs(joinedClubs.filter((_, i) => i !== index))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError("")
    setSuccess(false)

    if (username !== profile.username && usernameStatus !== "available") {
      setError("Please choose an available username")
      return
    }

    setLoading(true)

    try {
      const socialLinks: Record<string, string> = {}
      if (linkedin.trim()) socialLinks.linkedin = linkedin.trim()
      if (github.trim()) socialLinks.github = github.trim()
      if (twitter.trim()) socialLinks.twitter = twitter.trim()
      if (website.trim()) socialLinks.website = website.trim()

      await updateUserProfile(profile.uid, {
        displayName,
        username,
        bio,
        socialLinks,
        achievements,
        joinedClubs,
        profileImage: getDefaultAvatar(selectedAvatar),
      })

      await refreshUserProfile()
      setSuccess(true)

      // Redirect to new username if changed
      if (username !== profile.username) {
        setTimeout(() => {
          router.push(`/u/${username}`)
        }, 1500)
      }
    } catch (err: any) {
      console.error("[v0] Profile update error:", err)
      setError(err.message || "Failed to update profile")
    } finally {
      setLoading(false)
    }
  }

  const getInitials = (name: string) => {
    return name
      .split(" ")
      .map((n) => n[0])
      .join("")
      .toUpperCase()
      .slice(0, 2)
  }

  if (authLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="h-8 w-8 animate-spin rounded-full border-4 border-primary border-t-transparent" />
      </div>
    )
  }

  if (!user || user.uid !== profile.uid) {
    return null
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-background to-muted/20">
      <div className="container py-8 md:py-12 max-w-4xl">
        <div className="mb-6">
          <Button variant="ghost" asChild>
            <Link href={`/u/${profile.username}`}>
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back to Profile
            </Link>
          </Button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Basic Info */}
          <Card>
            <CardHeader>
              <CardTitle>Basic Information</CardTitle>
              <CardDescription>Update your profile details</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <AvatarSelector selectedAvatar={selectedAvatar} onSelect={setSelectedAvatar} disabled={loading} />

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="displayName">Display Name</Label>
                  <Input
                    id="displayName"
                    value={displayName}
                    onChange={(e) => setDisplayName(e.target.value)}
                    required
                    disabled={loading}
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="username">Username</Label>
                  <div className="relative">
                    <Input
                      id="username"
                      value={username}
                      onChange={(e) => handleUsernameChange(e.target.value)}
                      required
                      disabled={loading}
                      className="pr-10"
                    />
                    {usernameStatus === "checking" && (
                      <div className="absolute right-3 top-1/2 -translate-y-1/2">
                        <div className="h-4 w-4 animate-spin rounded-full border-2 border-primary border-t-transparent" />
                      </div>
                    )}
                    {usernameStatus === "available" && (
                      <Check className="absolute right-3 top-1/2 -translate-y-1/2 h-4 w-4 text-green-500" />
                    )}
                    {usernameStatus === "taken" && (
                      <X className="absolute right-3 top-1/2 -translate-y-1/2 h-4 w-4 text-destructive" />
                    )}
                  </div>
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="bio">Bio</Label>
                <Textarea
                  id="bio"
                  value={bio}
                  onChange={(e) => setBio(e.target.value)}
                  placeholder="Tell us about yourself..."
                  rows={4}
                  disabled={loading}
                />
              </div>
            </CardContent>
          </Card>

          {/* Social Links */}
          <Card>
            <CardHeader>
              <CardTitle>Social Links</CardTitle>
              <CardDescription>Connect your social media profiles</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="linkedin">LinkedIn</Label>
                <Input
                  id="linkedin"
                  type="url"
                  value={linkedin}
                  onChange={(e) => setLinkedin(e.target.value)}
                  placeholder="https://linkedin.com/in/username"
                  disabled={loading}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="github">GitHub</Label>
                <Input
                  id="github"
                  type="url"
                  value={github}
                  onChange={(e) => setGithub(e.target.value)}
                  placeholder="https://github.com/username"
                  disabled={loading}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="twitter">Twitter</Label>
                <Input
                  id="twitter"
                  type="url"
                  value={twitter}
                  onChange={(e) => setTwitter(e.target.value)}
                  placeholder="https://twitter.com/username"
                  disabled={loading}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="website">Personal Website</Label>
                <Input
                  id="website"
                  type="url"
                  value={website}
                  onChange={(e) => setWebsite(e.target.value)}
                  placeholder="https://yourwebsite.com"
                  disabled={loading}
                />
              </div>
            </CardContent>
          </Card>

          {/* Achievements */}
          <Card>
            <CardHeader>
              <CardTitle>Achievements</CardTitle>
              <CardDescription>Add your accomplishments and milestones</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex gap-2">
                <Input
                  value={newAchievement}
                  onChange={(e) => setNewAchievement(e.target.value)}
                  placeholder="Add an achievement..."
                  disabled={loading}
                  onKeyDown={(e) => {
                    if (e.key === "Enter") {
                      e.preventDefault()
                      addAchievement()
                    }
                  }}
                />
                <Button type="button" onClick={addAchievement} disabled={loading || !newAchievement.trim()}>
                  <Plus className="h-4 w-4" />
                </Button>
              </div>

              {achievements.length > 0 && (
                <ul className="space-y-2">
                  {achievements.map((achievement, index) => (
                    <li key={index} className="flex items-start gap-2 p-3 rounded-lg bg-muted">
                      <span className="text-primary mt-1">•</span>
                      <span className="flex-1 leading-relaxed">{achievement}</span>
                      <Button
                        type="button"
                        variant="ghost"
                        size="sm"
                        onClick={() => removeAchievement(index)}
                        disabled={loading}
                      >
                        <X className="h-4 w-4" />
                      </Button>
                    </li>
                  ))}
                </ul>
              )}
            </CardContent>
          </Card>

          {/* Joined Clubs */}
          <Card>
            <CardHeader>
              <CardTitle>Joined Clubs</CardTitle>
              <CardDescription>Manage your club memberships</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex gap-2">
                <Input
                  value={newClub}
                  onChange={(e) => setNewClub(e.target.value)}
                  placeholder="Add a club..."
                  disabled={loading}
                  onKeyDown={(e) => {
                    if (e.key === "Enter") {
                      e.preventDefault()
                      addClub()
                    }
                  }}
                />
                <Button type="button" onClick={addClub} disabled={loading || !newClub.trim()}>
                  <Plus className="h-4 w-4" />
                </Button>
              </div>

              {joinedClubs.length > 0 && (
                <div className="flex flex-wrap gap-2">
                  {joinedClubs.map((club, index) => (
                    <Badge key={index} variant="secondary" className="pl-3 pr-1 py-1">
                      {club}
                      <Button
                        type="button"
                        variant="ghost"
                        size="sm"
                        className="h-5 w-5 p-0 ml-2 hover:bg-transparent"
                        onClick={() => removeClub(index)}
                        disabled={loading}
                      >
                        <X className="h-3 w-3" />
                      </Button>
                    </Badge>
                  ))}
                </div>
              )}
            </CardContent>
          </Card>

          {/* Error/Success Messages */}
          {error && (
            <Card className="border-destructive">
              <CardContent className="pt-6">
                <p className="text-sm text-destructive">{error}</p>
              </CardContent>
            </Card>
          )}

          {success && (
            <Card className="border-green-500 bg-green-50 dark:bg-green-950">
              <CardContent className="pt-6">
                <p className="text-sm text-green-700 dark:text-green-300">Profile updated successfully!</p>
              </CardContent>
            </Card>
          )}

          {/* Submit Button */}
          <div className="flex gap-4">
            <Button
              type="submit"
              size="lg"
              disabled={loading || (username !== profile.username && usernameStatus !== "available")}
            >
              <Save className="mr-2 h-4 w-4" />
              {loading ? "Saving..." : "Save Changes"}
            </Button>
            <Button type="button" variant="outline" size="lg" asChild>
              <Link href={`/u/${profile.username}`}>Cancel</Link>
            </Button>
          </div>
        </form>
      </div>
    </div>
  )
}
