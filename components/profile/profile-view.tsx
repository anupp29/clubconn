"use client"

import type { UserProfile } from "@/lib/firestore"
import { useAuth } from "@/contexts/auth-context"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Github, Linkedin, Twitter, Globe, Edit, Lock, Mail, Award, Users } from "lucide-react"
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
      <div className="min-h-screen bg-gradient-to-b from-background via-background to-muted/30">
        <div className="relative overflow-hidden border-b bg-gradient-to-br from-primary/5 via-background to-background">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,rgba(120,119,198,0.1),transparent_50%)]" />

          <div className="container relative py-12 md:py-16">
            <Card className="border-primary/20 shadow-xl">
              <CardContent className="pt-8">
                <div className="flex flex-col md:flex-row gap-8 items-start">
                  <div className="relative">
                    <Avatar className="h-32 w-32 md:h-40 md:w-40 border-4 border-primary/20 shadow-2xl">
                      <AvatarImage src={profile.profileImage || "/placeholder.svg"} alt={profile.displayName} />
                      <AvatarFallback className="text-4xl font-bold bg-gradient-to-br from-primary to-primary/70 text-primary-foreground">
                        {getInitials(profile.displayName)}
                      </AvatarFallback>
                    </Avatar>
                    {isOwner && (
                      <div className="absolute -bottom-2 -right-2">
                        <Badge className="bg-primary shadow-lg">You</Badge>
                      </div>
                    )}
                  </div>

                  <div className="flex-1 space-y-6">
                    <div>
                      <div className="flex flex-col sm:flex-row sm:items-center gap-4 mb-3">
                        <h1 className="text-4xl md:text-5xl font-black bg-gradient-to-r from-foreground to-foreground/70 bg-clip-text text-transparent">
                          {profile.displayName}
                        </h1>
                        {isOwner && (
                          <Button size="sm" variant="outline" className="w-fit bg-transparent" asChild>
                            <Link href={`/u/${profile.username}/edit`}>
                              <Edit className="h-4 w-4 mr-2" />
                              Edit Profile
                            </Link>
                          </Button>
                        )}
                      </div>
                      <p className="text-xl text-muted-foreground font-medium">@{profile.username}</p>
                    </div>

                    {profile.bio && (
                      <p className="text-lg leading-relaxed text-muted-foreground max-w-2xl">{profile.bio}</p>
                    )}

                    {socialLinks.length > 0 && (
                      <div className="flex flex-wrap gap-3">
                        {socialLinks.map((link) => (
                          <Button
                            key={link.name}
                            variant="outline"
                            size="sm"
                            className="hover:scale-105 transition-transform bg-transparent"
                            asChild
                          >
                            <a href={link.url} target="_blank" rel="noopener noreferrer">
                              <link.icon className={`h-4 w-4 mr-2 ${link.color}`} />
                              {link.name}
                            </a>
                          </Button>
                        ))}
                      </div>
                    )}

                    <div className="flex flex-wrap gap-6 pt-4 border-t">
                      <div className="flex items-center gap-2 text-sm">
                        <Users className="h-4 w-4 text-primary" />
                        <span className="font-semibold">{profile.joinedClubs?.length || 0}</span>
                        <span className="text-muted-foreground">Clubs</span>
                      </div>
                      <div className="flex items-center gap-2 text-sm">
                        <Award className="h-4 w-4 text-primary" />
                        <span className="font-semibold">{profile.achievements?.length || 0}</span>
                        <span className="text-muted-foreground">Achievements</span>
                      </div>
                      {profile.email && (
                        <div className="flex items-center gap-2 text-sm">
                          <Mail className="h-4 w-4 text-primary" />
                          <span className="text-muted-foreground">{profile.email}</span>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>

        <div className="container py-8 md:py-12">
          {/* Login Gate for Non-Logged-In Users */}
          {!isLoggedIn && (
            <Card className="mb-8 border-primary/50 bg-primary/5 shadow-lg">
              <CardContent className="pt-6">
                <div className="flex flex-col sm:flex-row items-center gap-4">
                  <div className="rounded-full bg-primary/10 p-4">
                    <Lock className="h-8 w-8 text-primary" />
                  </div>
                  <div className="flex-1 text-center sm:text-left">
                    <h3 className="text-xl font-bold mb-2">Sign in to see more</h3>
                    <p className="text-muted-foreground">
                      Join ClubConn to view {profile.displayName}'s full profile, achievements, and club memberships
                    </p>
                  </div>
                  <div className="flex gap-3">
                    <Button variant="outline" size="lg" onClick={() => setLoginOpen(true)}>
                      Sign In
                    </Button>
                    <Button size="lg" onClick={() => setSignupOpen(true)}>
                      Sign Up
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          )}

          {/* Content Grid - Only show if logged in */}
          {isLoggedIn && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Card className="hover:shadow-lg transition-shadow">
                <CardHeader>
                  <div className="flex items-center gap-2">
                    <Award className="h-5 w-5 text-primary" />
                    <CardTitle>Achievements</CardTitle>
                  </div>
                  <CardDescription>Milestones and accomplishments</CardDescription>
                </CardHeader>
                <CardContent>
                  {profile.achievements && profile.achievements.length > 0 ? (
                    <ul className="space-y-3">
                      {profile.achievements.map((achievement, index) => (
                        <li
                          key={index}
                          className="flex items-start gap-3 p-3 rounded-lg bg-muted/50 hover:bg-muted transition-colors"
                        >
                          <span className="text-primary mt-1 text-lg">✓</span>
                          <span className="leading-relaxed flex-1">{achievement}</span>
                        </li>
                      ))}
                    </ul>
                  ) : (
                    <div className="text-center py-8">
                      <Award className="h-12 w-12 text-muted-foreground/50 mx-auto mb-3" />
                      <p className="text-muted-foreground">No achievements added yet</p>
                    </div>
                  )}
                </CardContent>
              </Card>

              <Card className="hover:shadow-lg transition-shadow">
                <CardHeader>
                  <div className="flex items-center gap-2">
                    <Users className="h-5 w-5 text-primary" />
                    <CardTitle>Joined Clubs</CardTitle>
                  </div>
                  <CardDescription>Active club memberships</CardDescription>
                </CardHeader>
                <CardContent>
                  {profile.joinedClubs && profile.joinedClubs.length > 0 ? (
                    <div className="flex flex-wrap gap-2">
                      {profile.joinedClubs.map((club, index) => (
                        <Badge
                          key={index}
                          variant="secondary"
                          className="px-4 py-2 text-sm hover:bg-primary hover:text-primary-foreground transition-colors cursor-pointer"
                        >
                          {club}
                        </Badge>
                      ))}
                    </div>
                  ) : (
                    <div className="text-center py-8">
                      <Users className="h-12 w-12 text-muted-foreground/50 mx-auto mb-3" />
                      <p className="text-muted-foreground">Not a member of any clubs yet</p>
                    </div>
                  )}
                </CardContent>
              </Card>
            </div>
          )}

          {/* Blurred Preview for Non-Logged-In Users */}
          {!isLoggedIn && (
            <div className="relative">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 blur-md pointer-events-none select-none opacity-50">
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
                <Card className="max-w-md shadow-2xl border-primary/50">
                  <CardContent className="pt-8 pb-8 text-center">
                    <div className="rounded-full bg-primary/10 p-4 w-fit mx-auto mb-4">
                      <Lock className="h-12 w-12 text-primary" />
                    </div>
                    <h3 className="text-2xl font-bold mb-3">Sign in to unlock</h3>
                    <p className="text-muted-foreground mb-6">Create an account or sign in to view the full profile</p>
                    <div className="flex gap-3 justify-center">
                      <Button variant="outline" size="lg" onClick={() => setLoginOpen(true)}>
                        Sign In
                      </Button>
                      <Button size="lg" onClick={() => setSignupOpen(true)}>
                        Sign Up
                      </Button>
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
