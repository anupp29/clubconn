"use client"

import { Footer } from "@/components/footer"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  Calendar,
  MapPin,
  Users,
  Trophy,
  Award,
  Star,
  TrendingUp,
  Bell,
  Sparkles,
  Zap,
  Clock,
  CheckCircle2,
  ArrowRight,
  Loader2,
} from "lucide-react"
import Link from "next/link"
import { useAuth } from "@/contexts/auth-context"
import { useRouter } from "next/navigation"
import { useEffect, useState } from "react"
import {
  getUserClubs,
  getPersonalizedFeed,
  getUpcomingEvents,
  getUserStats,
  getLeaderboard,
  getUserBadges,
  getAllBadges,
  getRecentActivity,
  registerForEvent,
  getAIRecommendations,
  type Club,
  type FeedItem,
  type Event,
  type UserStats as UserStatsType,
  type Badge as BadgeType,
} from "@/lib/dashboard-data"
import { getNextLevelXP, formatRelativeTime } from "@/lib/gamification"

export default function DashboardPage() {
  const { user, userProfile, loading: authLoading } = useAuth()
  const router = useRouter()

  const [clubs, setClubs] = useState<Club[]>([])
  const [feed, setFeed] = useState<FeedItem[]>([])
  const [events, setEvents] = useState<Event[]>([])
  const [stats, setStats] = useState<UserStatsType | null>(null)
  const [leaderboard, setLeaderboard] = useState<UserStatsType[]>([])
  const [badges, setBadges] = useState<BadgeType[]>([])
  const [userBadges, setUserBadges] = useState<string[]>([])
  const [recentActivity, setRecentActivity] = useState<any[]>([])
  const [recommendations, setRecommendations] = useState<any>({ clubs: [], events: [] })
  const [loading, setLoading] = useState(true)
  const [registering, setRegistering] = useState<string | null>(null)

  useEffect(() => {
    if (!authLoading && !user) {
      router.push("/")
    }
  }, [user, authLoading, router])

  useEffect(() => {
    async function fetchDashboardData() {
      if (!user) return

      setLoading(true)
      try {
        console.log("[v0] Fetching dashboard data for user:", user.uid)

        // Fetch all data in parallel
        const [
          clubsData,
          feedData,
          eventsData,
          statsData,
          leaderboardData,
          badgesData,
          userBadgesData,
          activityData,
          recommendationsData,
        ] = await Promise.all([
          getUserClubs(user.uid),
          getPersonalizedFeed(user.uid, 10),
          getUpcomingEvents(user.uid, 5),
          getUserStats(user.uid),
          getLeaderboard(10),
          getAllBadges(),
          getUserBadges(user.uid),
          getRecentActivity(user.uid, 5),
          getAIRecommendations(user.uid),
        ])

        console.log("[v0] Dashboard data fetched:", {
          clubs: clubsData.length,
          feed: feedData.length,
          events: eventsData.length,
          stats: statsData,
        })

        setClubs(clubsData)
        setFeed(feedData)
        setEvents(eventsData)
        setStats(statsData)
        setLeaderboard(leaderboardData)
        setBadges(badgesData)
        setUserBadges(userBadgesData.map((ub) => ub.badge.id))
        setRecentActivity(activityData)
        setRecommendations(recommendationsData)
      } catch (error) {
        console.error("[v0] Error fetching dashboard data:", error)
      } finally {
        setLoading(false)
      }
    }

    fetchDashboardData()
  }, [user])

  const handleRSVP = async (eventId: string) => {
    if (!user) return

    setRegistering(eventId)
    try {
      const success = await registerForEvent(user.uid, eventId)
      if (success) {
        // Refresh events
        const eventsData = await getUpcomingEvents(user.uid, 5)
        setEvents(eventsData)
      }
    } catch (error) {
      console.error("[v0] Error registering for event:", error)
    } finally {
      setRegistering(null)
    }
  }

  if (authLoading || loading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="flex flex-col items-center gap-4">
          <Loader2 className="h-8 w-8 animate-spin text-primary" />
          <p className="text-muted-foreground">Loading your dashboard...</p>
        </div>
      </div>
    )
  }

  if (!user || !userProfile) {
    return null
  }

  const currentLevel = stats?.level || 1
  const currentXP = stats?.xp || 0
  const nextLevelXP = getNextLevelXP(currentLevel)
  const previousLevelXP = currentLevel > 1 ? getNextLevelXP(currentLevel - 1) : 0
  const levelProgress = ((currentXP - previousLevelXP) / (nextLevelXP - previousLevelXP)) * 100

  const userRank = leaderboard.findIndex((entry) => entry.userId === user.uid) + 1

  const badgeData = badges.map((badge) => ({
    ...badge,
    earned: userBadges.includes(badge.id),
    progress: userBadges.includes(badge.id) ? 100 : Math.floor(Math.random() * 80), // TODO: Calculate real progress
  }))

  const badgeIcons: Record<string, any> = {
    star: Star,
    calendar: Calendar,
    users: Users,
    trending: TrendingUp,
    sparkles: Sparkles,
    trophy: Trophy,
  }

  return (
    <main className="min-h-screen bg-background">
      <div className="container py-8">
        {/* Welcome Section */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold mb-2">
            Welcome back, <span className="text-primary">{userProfile.displayName}</span>
          </h1>
          <p className="text-muted-foreground">Here's what's happening with your clubs and events</p>
        </div>

        {/* Quick Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
          <Card>
            <CardContent className="pt-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">Events Attended</p>
                  <p className="text-2xl font-bold">{stats?.eventsAttended || 0}</p>
                </div>
                <Calendar className="h-8 w-8 text-primary" />
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="pt-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">Clubs Joined</p>
                  <p className="text-2xl font-bold">{stats?.clubsJoined || clubs.length}</p>
                </div>
                <Users className="h-8 w-8 text-primary" />
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="pt-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">Certificates</p>
                  <p className="text-2xl font-bold">{stats?.certificatesEarned || 0}</p>
                </div>
                <Award className="h-8 w-8 text-primary" />
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="pt-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">Current Rank</p>
                  <p className="text-2xl font-bold">#{userRank || "-"}</p>
                </div>
                <Trophy className="h-8 w-8 text-primary" />
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Level Progress */}
        <Card className="mb-8">
          <CardContent className="pt-6">
            <div className="flex items-center justify-between mb-4">
              <div>
                <h3 className="text-lg font-semibold">Level {currentLevel}</h3>
                <p className="text-sm text-muted-foreground">
                  {currentXP} / {nextLevelXP} XP
                </p>
              </div>
              <div className="flex items-center gap-2">
                <Zap className="h-5 w-5 text-yellow-500" />
                <span className="text-2xl font-bold">{currentXP} XP</span>
              </div>
            </div>
            <Progress value={levelProgress} className="h-3" />
          </CardContent>
        </Card>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-8">
            {/* Personalized Feed */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Bell className="h-5 w-5" />
                  Your Feed
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {feed.length === 0 ? (
                  <div className="text-center py-8 text-muted-foreground">
                    <Bell className="h-12 w-12 mx-auto mb-4 opacity-50" />
                    <p>No updates yet. Join clubs to see their latest posts!</p>
                    <Button variant="outline" className="mt-4 bg-transparent" asChild>
                      <Link href="/clubs">Explore Clubs</Link>
                    </Button>
                  </div>
                ) : (
                  feed.map((item) => (
                    <div key={item.id} className="border-l-4 border-primary pl-4 py-2">
                      <div className="flex items-start justify-between mb-2">
                        <Badge className={`bg-gradient-to-r ${item.clubColor} text-white border-0`}>
                          {item.clubName}
                        </Badge>
                        <span className="text-xs text-muted-foreground">{formatRelativeTime(item.createdAt)}</span>
                      </div>
                      <h4 className="font-semibold mb-1">{item.title}</h4>
                      <p className="text-sm text-muted-foreground">{item.content}</p>
                    </div>
                  ))
                )}
              </CardContent>
            </Card>

            {/* Upcoming Events */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Calendar className="h-5 w-5" />
                  Upcoming Events
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {events.length === 0 ? (
                  <div className="text-center py-8 text-muted-foreground">
                    <Calendar className="h-12 w-12 mx-auto mb-4 opacity-50" />
                    <p>No upcoming events from your clubs.</p>
                  </div>
                ) : (
                  events.map((event) => (
                    <div
                      key={event.id}
                      className="flex items-start gap-4 p-4 border border-border rounded-lg hover:border-primary/50 transition-colors"
                    >
                      <div className="flex-1">
                        <Badge className="bg-primary text-primary-foreground border-0 mb-2">{event.clubName}</Badge>
                        <h4 className="font-semibold mb-2">{event.title}</h4>
                        <div className="flex flex-wrap gap-4 text-sm text-muted-foreground">
                          <div className="flex items-center gap-1">
                            <Calendar className="h-4 w-4" />
                            {event.date}
                          </div>
                          <div className="flex items-center gap-1">
                            <Clock className="h-4 w-4" />
                            {event.time}
                          </div>
                          <div className="flex items-center gap-1">
                            <MapPin className="h-4 w-4" />
                            {event.location}
                          </div>
                        </div>
                      </div>
                      <Button size="sm" onClick={() => handleRSVP(event.id)} disabled={registering === event.id}>
                        {registering === event.id ? (
                          <>
                            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                            RSVP
                          </>
                        ) : (
                          "RSVP"
                        )}
                      </Button>
                    </div>
                  ))
                )}
              </CardContent>
            </Card>

            {/* AI Recommendations */}
            {(recommendations.clubs.length > 0 || recommendations.events.length > 0) && (
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Sparkles className="h-5 w-5 text-yellow-500" />
                    AI Recommendations
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <Tabs defaultValue="clubs">
                    <TabsList className="grid w-full grid-cols-2">
                      <TabsTrigger value="clubs">Clubs</TabsTrigger>
                      <TabsTrigger value="events">Events</TabsTrigger>
                    </TabsList>
                    <TabsContent value="clubs" className="space-y-4 mt-4">
                      {recommendations.clubs.length === 0 ? (
                        <p className="text-center text-muted-foreground py-4">No club recommendations yet.</p>
                      ) : (
                        recommendations.clubs.map((club: any) => (
                          <div
                            key={club.id}
                            className="flex items-center justify-between p-4 border border-border rounded-lg"
                          >
                            <div className="flex-1">
                              <div className="flex items-center gap-2 mb-1">
                                <h4 className="font-semibold">{club.name}</h4>
                                <Badge variant="outline" className="text-xs">
                                  {club.match}% Match
                                </Badge>
                              </div>
                              <p className="text-sm text-muted-foreground">{club.reason}</p>
                            </div>
                            <Button size="sm" variant="outline" asChild>
                              <Link href={`/clubs/${club.id}`}>View</Link>
                            </Button>
                          </div>
                        ))
                      )}
                    </TabsContent>
                    <TabsContent value="events" className="space-y-4 mt-4">
                      {recommendations.events.length === 0 ? (
                        <p className="text-center text-muted-foreground py-4">No event recommendations yet.</p>
                      ) : (
                        recommendations.events.map((event: any) => (
                          <div
                            key={event.id}
                            className="flex items-center justify-between p-4 border border-border rounded-lg"
                          >
                            <div className="flex-1">
                              <div className="flex items-center gap-2 mb-1">
                                <h4 className="font-semibold">{event.title}</h4>
                                <Badge variant="outline" className="text-xs">
                                  {event.match}% Match
                                </Badge>
                              </div>
                              <p className="text-sm text-muted-foreground">
                                {event.club} • {event.date}
                              </p>
                            </div>
                            <Button size="sm" variant="outline" onClick={() => handleRSVP(event.id)}>
                              RSVP
                            </Button>
                          </div>
                        ))
                      )}
                    </TabsContent>
                  </Tabs>
                </CardContent>
              </Card>
            )}

            {/* Recent Activity */}
            {recentActivity.length > 0 && (
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Clock className="h-5 w-5" />
                    Recent Activity
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  {recentActivity.map((activity, index) => (
                    <div key={index} className="flex items-start gap-4">
                      <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary/10">
                        {activity.type === "event" && <Calendar className="h-5 w-5 text-primary" />}
                        {activity.type === "certificate" && <Award className="h-5 w-5 text-primary" />}
                        {activity.type === "badge" && <Trophy className="h-5 w-5 text-primary" />}
                      </div>
                      <div className="flex-1">
                        <h4 className="font-semibold">{activity.title}</h4>
                        <p className="text-sm text-muted-foreground">
                          {activity.club} • {activity.date}
                        </p>
                      </div>
                      <Badge variant="outline" className="text-xs">
                        +{activity.xp} XP
                      </Badge>
                    </div>
                  ))}
                </CardContent>
              </Card>
            )}
          </div>

          {/* Sidebar */}
          <div className="space-y-8">
            {/* Joined Clubs */}
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Your Clubs</CardTitle>
              </CardHeader>
              <CardContent className="space-y-2">
                {clubs.length === 0 ? (
                  <div className="text-center py-4">
                    <p className="text-sm text-muted-foreground mb-4">You haven't joined any clubs yet.</p>
                    <Button variant="outline" className="w-full bg-transparent" asChild>
                      <Link href="/clubs">
                        <Users className="mr-2 h-4 w-4" />
                        Explore Clubs
                      </Link>
                    </Button>
                  </div>
                ) : (
                  <>
                    {clubs.map((club) => (
                      <Link
                        key={club.id}
                        href={`/clubs/${club.slug}`}
                        className="flex items-center gap-3 p-3 rounded-lg border border-border hover:border-primary/50 transition-colors"
                      >
                        <div
                          className={`h-10 w-10 rounded-lg bg-gradient-to-br ${club.color} flex items-center justify-center text-white font-bold`}
                        >
                          {club.name[0]}
                        </div>
                        <span className="font-medium">{club.name}</span>
                      </Link>
                    ))}
                    <Button variant="outline" className="w-full mt-2 bg-transparent" asChild>
                      <Link href="/clubs">
                        <Users className="mr-2 h-4 w-4" />
                        Explore More Clubs
                      </Link>
                    </Button>
                  </>
                )}
              </CardContent>
            </Card>

            {/* Leaderboard */}
            <Card>
              <CardHeader>
                <CardTitle className="text-lg flex items-center gap-2">
                  <Trophy className="h-5 w-5 text-yellow-500" />
                  Leaderboard
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                {leaderboard.length === 0 ? (
                  <p className="text-center text-sm text-muted-foreground py-4">No leaderboard data yet.</p>
                ) : (
                  <>
                    {leaderboard.slice(0, 3).map((entry) => (
                      <div
                        key={entry.userId}
                        className={`flex items-center gap-3 p-2 rounded-lg ${entry.userId === user.uid ? "bg-primary/10 border border-primary/50" : ""}`}
                      >
                        <div className="flex items-center justify-center w-8 h-8 rounded-full bg-muted font-bold text-sm">
                          {entry.rank}
                        </div>
                        <div className="flex-1">
                          <p className="font-medium text-sm">
                            {entry.userId === user.uid ? "You" : `User ${entry.rank}`}
                          </p>
                          <p className="text-xs text-muted-foreground">{entry.xp} XP</p>
                        </div>
                        {entry.rank && entry.rank <= 3 && <Trophy className="h-4 w-4 text-yellow-500" />}
                      </div>
                    ))}
                    {userRank > 3 && (
                      <div className="flex items-center gap-3 p-2 rounded-lg bg-primary/10 border border-primary/50">
                        <div className="flex items-center justify-center w-8 h-8 rounded-full bg-muted font-bold text-sm">
                          {userRank}
                        </div>
                        <div className="flex-1">
                          <p className="font-medium text-sm">You</p>
                          <p className="text-xs text-muted-foreground">{currentXP} XP</p>
                        </div>
                      </div>
                    )}
                    <Button variant="outline" className="w-full mt-2 bg-transparent" asChild>
                      <Link href="/leaderboard">
                        View Full Leaderboard
                        <ArrowRight className="ml-2 h-4 w-4" />
                      </Link>
                    </Button>
                  </>
                )}
              </CardContent>
            </Card>

            {/* Badges */}
            <Card>
              <CardHeader>
                <CardTitle className="text-lg flex items-center gap-2">
                  <Award className="h-5 w-5" />
                  Achievements
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {badgeData.slice(0, 6).map((badge, index) => {
                  const Icon = badgeIcons[badge.icon] || Star
                  return (
                    <div key={index} className="space-y-2">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <div
                            className={`h-8 w-8 rounded-lg flex items-center justify-center ${badge.earned ? "bg-primary text-primary-foreground" : "bg-muted text-muted-foreground"}`}
                          >
                            <Icon className="h-4 w-4" />
                          </div>
                          <span className="text-sm font-medium">{badge.name}</span>
                        </div>
                        {badge.earned && <CheckCircle2 className="h-4 w-4 text-primary" />}
                      </div>
                      {!badge.earned && <Progress value={badge.progress} className="h-1" />}
                    </div>
                  )
                })}
                <Button variant="outline" className="w-full mt-2 bg-transparent" asChild>
                  <Link href="/achievements">
                    View All Achievements
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Link>
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>

      <Footer />
    </main>
  )
}
