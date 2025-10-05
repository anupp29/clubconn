"use client"

import type { UserProfile } from "@/lib/firestore"
import { useAuth } from "@/contexts/auth-context"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Github, Linkedin, Twitter, Globe, Edit, Lock } from "lucide-react"
import Link from "next/link"
import { useState } from "react"
import { LoginDialog } from "../auth/login-dialog"
import { SignupDialog } from "../auth/signup-dialog"

interface ProfileViewProps {
  profile: UserProfile
}

export function ProfileView({ profile }: ProfileViewProps) {
  const { user } = useAuth()
  const [loginOpen, setLoginOpen] = useState(false)
  const [signupOpen, setSignupOpen] = useState(false)

  const isOwner = user?.uid === profile.uid
  const isLoggedIn = !!user

  console.log("[v0] Rendering profile view for:", profile.username, "isOwner:", isOwner, "isLoggedIn:", isLoggedIn)

  const getInitials = (name: string) => {
    return name
      .split(" ")
      .map((n) => n[0])
      .join("")
      .toUpperCase()
      .slice(0, 2)
  }

  const socialLinks = [
    {
      name: "LinkedIn",
      icon: Linkedin,
      url: profile.socialLinks?.linkedin,
      color: "text-[#0A66C2]",
    },
    {
      name: "GitHub",
      icon: Github,
      url: profile.socialLinks?.github,
      color: "text-foreground",
    },
    {
      name: "Twitter",
      icon: Twitter,
      url: profile.socialLinks?.twitter,
      color: "text-[#1DA1F2]",
    },
    {
      name: "Website",
      icon: Globe,
      url: profile.socialLinks?.website,
      color: "text-primary",
    },
  ].filter((link) => link.url)

  return (
    <>
      <div className="min-h-screen bg-gradient-to-b from-background to-muted/20">
        <div className="container py-8 md:py-12">
          {/* Profile Header */}
          <Card className="mb-8">
            <CardContent className="pt-6">
              <div className="flex flex-col md:flex-row gap-6 items-start">
                <Avatar className="h-24 w-24 md:h-32 md:w-32">
                  <AvatarImage src={profile.profileImage || "/placeholder.svg"} alt={profile.displayName} />
                  <AvatarFallback className="text-2xl">{getInitials(profile.displayName)}</AvatarFallback>
                </Avatar>

                <div className="flex-1 space-y-4">
                  <div>
                    <div className="flex flex-col sm:flex-row sm:items-center gap-3 mb-2">
                      <h1 className="text-3xl font-bold">{profile.displayName}</h1>
                      {isOwner && (
                        <Button size="sm" variant="outline" asChild>
                          <Link href={`/u/${profile.username}/edit`}>
                            <Edit className="h-4 w-4 mr-2" />
                            Edit Profile
                          </Link>
                        </Button>
                      )}
                    </div>
                    <p className="text-muted-foreground">@{profile.username}</p>
                  </div>

                  {profile.bio && <p className="text-lg leading-relaxed">{profile.bio}</p>}

                  {/* Social Links */}
                  {socialLinks.length > 0 && (
                    <div className="flex flex-wrap gap-3">
                      {socialLinks.map((link) => (
                        <Button key={link.name} variant="outline" size="sm" asChild>
                          <a href={link.url} target="_blank" rel="noopener noreferrer">
                            <link.icon className={`h-4 w-4 mr-2 ${link.color}`} />
                            {link.name}
                          </a>
                        </Button>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Login Gate for Non-Logged-In Users */}
          {!isLoggedIn && (
            <Card className="mb-8 border-primary/50 bg-primary/5">
              <CardContent className="pt-6">
                <div className="flex flex-col sm:flex-row items-center gap-4">
                  <div className="rounded-full bg-primary/10 p-3">
                    <Lock className="h-6 w-6 text-primary" />
                  </div>
                  <div className="flex-1 text-center sm:text-left">
                    <h3 className="font-semibold mb-1">Sign in to see more</h3>
                    <p className="text-sm text-muted-foreground">
                      Join ClubConn to view {profile.displayName}'s full profile, achievements, and club memberships
                    </p>
                  </div>
                  <div className="flex gap-2">
                    <Button variant="outline" onClick={() => setLoginOpen(true)}>
                      Sign In
                    </Button>
                    <Button onClick={() => setSignupOpen(true)}>Sign Up</Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          )}

          {/* Content Grid - Only show if logged in */}
          {isLoggedIn && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Achievements */}
              <Card>
                <CardHeader>
                  <CardTitle>Achievements</CardTitle>
                  <CardDescription>Milestones and accomplishments</CardDescription>
                </CardHeader>
                <CardContent>
                  {profile.achievements && profile.achievements.length > 0 ? (
                    <ul className="space-y-2">
                      {profile.achievements.map((achievement, index) => (
                        <li key={index} className="flex items-start gap-2">
                          <span className="text-primary mt-1">•</span>
                          <span className="leading-relaxed">{achievement}</span>
                        </li>
                      ))}
                    </ul>
                  ) : (
                    <p className="text-muted-foreground text-sm">No achievements added yet</p>
                  )}
                </CardContent>
              </Card>

              {/* Joined Clubs */}
              <Card>
                <CardHeader>
                  <CardTitle>Joined Clubs</CardTitle>
                  <CardDescription>Active club memberships</CardDescription>
                </CardHeader>
                <CardContent>
                  {profile.joinedClubs && profile.joinedClubs.length > 0 ? (
                    <div className="flex flex-wrap gap-2">
                      {profile.joinedClubs.map((club, index) => (
                        <Badge key={index} variant="secondary">
                          {club}
                        </Badge>
                      ))}
                    </div>
                  ) : (
                    <p className="text-muted-foreground text-sm">Not a member of any clubs yet</p>
                  )}
                </CardContent>
              </Card>
            </div>
          )}

          {/* Blurred Preview for Non-Logged-In Users */}
          {!isLoggedIn && (
            <div className="relative">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 blur-sm pointer-events-none select-none">
                <Card>
                  <CardHeader>
                    <CardTitle>Achievements</CardTitle>
                    <CardDescription>Milestones and accomplishments</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <ul className="space-y-2">
                      <li className="flex items-start gap-2">
                        <span className="text-primary mt-1">•</span>
                        <span className="leading-relaxed">Sample achievement placeholder</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="text-primary mt-1">•</span>
                        <span className="leading-relaxed">Another achievement example</span>
                      </li>
                    </ul>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle>Joined Clubs</CardTitle>
                    <CardDescription>Active club memberships</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="flex flex-wrap gap-2">
                      <Badge variant="secondary">Sample Club</Badge>
                      <Badge variant="secondary">Another Club</Badge>
                    </div>
                  </CardContent>
                </Card>
              </div>
              <div className="absolute inset-0 flex items-center justify-center">
                <Card className="max-w-md">
                  <CardContent className="pt-6 text-center">
                    <Lock className="h-12 w-12 text-primary mx-auto mb-4" />
                    <h3 className="text-xl font-semibold mb-2">Sign in to unlock</h3>
                    <p className="text-muted-foreground mb-4">Create an account or sign in to view the full profile</p>
                    <div className="flex gap-2 justify-center">
                      <Button variant="outline" onClick={() => setLoginOpen(true)}>
                        Sign In
                      </Button>
                      <Button onClick={() => setSignupOpen(true)}>Sign Up</Button>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
          )}
        </div>
      </div>

      <LoginDialog
        open={loginOpen}
        onOpenChange={setLoginOpen}
        onSwitchToSignup={() => {
          setLoginOpen(false)
          setSignupOpen(true)
        }}
      />
      <SignupDialog
        open={signupOpen}
        onOpenChange={setSignupOpen}
        onSwitchToLogin={() => {
          setSignupOpen(false)
          setLoginOpen(true)
        }}
      />
    </>
  )
}
