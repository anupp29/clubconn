"use client"

import { useEffect, useState } from "react"
import { useAuth } from "@/contexts/auth-context"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Trophy, Medal, Crown, TrendingUp, Users } from "lucide-react"
import { getLeaderboard } from "@/lib/dashboard-data"

export default function LeaderboardPage() {
  const { user } = useAuth()
  const [loading, setLoading] = useState(true)
  const [leaderboard, setLeaderboard] = useState<any[]>([])
  const [timeframe, setTimeframe] = useState<"all-time" | "monthly" | "weekly">("all-time")

  useEffect(() => {
    loadLeaderboard()
  }, [timeframe])

  async function loadLeaderboard() {
    try {
      setLoading(true)
      const data = await getLeaderboard()
      setLeaderboard(data)
    } catch (error) {
      console.error("Error loading leaderboard:", error)
    } finally {
      setLoading(false)
    }
  }

  function getRankIcon(rank: number) {
    if (rank === 1) return <Crown className="h-6 w-6 text-yellow-500" />
    if (rank === 2) return <Medal className="h-6 w-6 text-gray-400" />
    if (rank === 3) return <Medal className="h-6 w-6 text-amber-600" />
    return <span className="text-2xl font-bold text-muted-foreground">#{rank}</span>
  }

  function getRankBadgeVariant(rank: number): "default" | "secondary" | "outline" {
    if (rank <= 3) return "default"
    if (rank <= 10) return "secondary"
    return "outline"
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
      </div>
    )
  }

  const userRank = leaderboard.findIndex((entry) => entry.userId === user?.uid) + 1

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-primary/5">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center gap-3 mb-2">
            <Trophy className="h-8 w-8 text-primary" />
            <h1 className="text-4xl font-bold">Leaderboard</h1>
          </div>
          <p className="text-muted-foreground">See how you rank among the most engaged students</p>
        </div>

        {/* User's Rank Card */}
        {user && userRank > 0 && (
          <Card className="mb-8 border-primary/50 bg-gradient-to-r from-primary/5 to-primary/10">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <TrendingUp className="h-5 w-5" />
                Your Rank
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-4">
                  {getRankIcon(userRank)}
                  <div>
                    <p className="font-semibold">{user.displayName}</p>
                    <p className="text-sm text-muted-foreground">
                      Level {leaderboard[userRank - 1]?.level} • {leaderboard[userRank - 1]?.xp} XP
                    </p>
                  </div>
                </div>
                <Badge variant={getRankBadgeVariant(userRank)} className="text-lg px-4 py-2">
                  Rank #{userRank}
                </Badge>
              </div>
            </CardContent>
          </Card>
        )}

        {/* Timeframe Tabs */}
        <Tabs value={timeframe} onValueChange={(v) => setTimeframe(v as any)} className="mb-6">
          <TabsList>
            <TabsTrigger value="all-time">All Time</TabsTrigger>
            <TabsTrigger value="monthly">This Month</TabsTrigger>
            <TabsTrigger value="weekly">This Week</TabsTrigger>
          </TabsList>
        </Tabs>

        {/* Top 3 Podium */}
        {leaderboard.length >= 3 && (
          <div className="grid grid-cols-3 gap-4 mb-8">
            {/* 2nd Place */}
            <Card className="mt-8">
              <CardContent className="pt-6 text-center">
                <Medal className="h-12 w-12 mx-auto mb-3 text-gray-400" />
                <p className="font-semibold text-lg">{leaderboard[1]?.displayName}</p>
                <p className="text-sm text-muted-foreground mb-2">Level {leaderboard[1]?.level}</p>
                <Badge variant="secondary">{leaderboard[1]?.xp} XP</Badge>
              </CardContent>
            </Card>

            {/* 1st Place */}
            <Card className="border-yellow-500/50 bg-gradient-to-b from-yellow-500/10 to-background">
              <CardContent className="pt-6 text-center">
                <Crown className="h-16 w-16 mx-auto mb-3 text-yellow-500" />
                <p className="font-bold text-xl">{leaderboard[0]?.displayName}</p>
                <p className="text-sm text-muted-foreground mb-2">Level {leaderboard[0]?.level}</p>
                <Badge className="bg-yellow-500 hover:bg-yellow-600">{leaderboard[0]?.xp} XP</Badge>
              </CardContent>
            </Card>

            {/* 3rd Place */}
            <Card className="mt-8">
              <CardContent className="pt-6 text-center">
                <Medal className="h-12 w-12 mx-auto mb-3 text-amber-600" />
                <p className="font-semibold text-lg">{leaderboard[2]?.displayName}</p>
                <p className="text-sm text-muted-foreground mb-2">Level {leaderboard[2]?.level}</p>
                <Badge variant="secondary">{leaderboard[2]?.xp} XP</Badge>
              </CardContent>
            </Card>
          </div>
        )}

        {/* Full Leaderboard */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Users className="h-5 w-5" />
              Top Students
            </CardTitle>
            <CardDescription>Most engaged students on campus</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {leaderboard.map((entry, index) => {
                const rank = index + 1
                const isCurrentUser = entry.userId === user?.uid

                return (
                  <div
                    key={entry.userId}
                    className={`flex items-center justify-between p-4 rounded-lg border transition-colors ${
                      isCurrentUser ? "bg-primary/5 border-primary/50" : "hover:bg-muted/50"
                    }`}
                  >
                    <div className="flex items-center gap-4 flex-1">
                      <div className="w-12 flex items-center justify-center">{getRankIcon(rank)}</div>
                      <div className="flex-1">
                        <p className={`font-semibold ${isCurrentUser ? "text-primary" : ""}`}>
                          {entry.displayName}
                          {isCurrentUser && <span className="ml-2 text-xs">(You)</span>}
                        </p>
                        <p className="text-sm text-muted-foreground">
                          Level {entry.level} • {entry.eventsAttended || 0} events • {entry.clubsJoined || 0} clubs
                        </p>
                      </div>
                    </div>
                    <Badge variant={getRankBadgeVariant(rank)}>{entry.xp} XP</Badge>
                  </div>
                )
              })}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
