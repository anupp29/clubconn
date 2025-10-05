"use client"

import { useEffect, useState } from "react"
import { useAuth } from "@/contexts/auth-context"
import { useRouter } from "next/navigation"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Trophy, Lock, Star, Sparkles } from "lucide-react"
import { BADGE_DEFINITIONS, getUserBadges, calculateBadgeProgress, getRarityColor } from "@/lib/badges"
import { getUserStats } from "@/lib/dashboard-data"

export default function AchievementsPage() {
  const { user, loading: authLoading } = useAuth()
  const router = useRouter()
  const [loading, setLoading] = useState(true)
  const [earnedBadges, setEarnedBadges] = useState<string[]>([])
  const [userStats, setUserStats] = useState<any>(null)
  const [filter, setFilter] = useState<"all" | "earned" | "locked">("all")
  const [categoryFilter, setCategoryFilter] = useState<string>("all")

  useEffect(() => {
    if (!authLoading && !user) {
      router.push("/login")
      return
    }

    if (user) {
      loadData()
    }
  }, [user, authLoading, router])

  async function loadData() {
    if (!user) return
    try {
      setLoading(true)
      const [badges, stats] = await Promise.all([getUserBadges(user.uid), getUserStats(user.uid)])

      setEarnedBadges(badges.map((b) => b.badgeId))
      setUserStats(stats)
    } catch (error) {
      console.error("Error loading achievements:", error)
    } finally {
      setLoading(false)
    }
  }

  if (authLoading || loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
      </div>
    )
  }

  const filteredBadges = BADGE_DEFINITIONS.filter((badge) => {
    const isEarned = earnedBadges.includes(badge.id)
    const matchesFilter = filter === "all" || (filter === "earned" && isEarned) || (filter === "locked" && !isEarned)
    const matchesCategory = categoryFilter === "all" || badge.category === categoryFilter
    return matchesFilter && matchesCategory
  })

  const earnedCount = earnedBadges.length
  const totalCount = BADGE_DEFINITIONS.length
  const completionPercentage = Math.round((earnedCount / totalCount) * 100)

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-primary/5">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center gap-3 mb-2">
            <Trophy className="h-8 w-8 text-primary" />
            <h1 className="text-4xl font-bold">Achievements</h1>
          </div>
          <p className="text-muted-foreground">Unlock badges and track your campus engagement journey</p>
        </div>

        {/* Progress Overview */}
        <Card className="mb-8">
          <CardHeader>
            <CardTitle>Your Progress</CardTitle>
            <CardDescription>
              {earnedCount} of {totalCount} badges earned
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <Progress value={completionPercentage} className="h-3" />
              <div className="flex items-center justify-between text-sm">
                <span className="text-muted-foreground">{completionPercentage}% Complete</span>
                <span className="font-semibold">{totalCount - earnedCount} badges remaining</span>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Filters */}
        <div className="mb-6 flex flex-wrap gap-4">
          <Tabs value={filter} onValueChange={(v) => setFilter(v as any)} className="w-full md:w-auto">
            <TabsList>
              <TabsTrigger value="all">All Badges</TabsTrigger>
              <TabsTrigger value="earned">Earned ({earnedCount})</TabsTrigger>
              <TabsTrigger value="locked">Locked ({totalCount - earnedCount})</TabsTrigger>
            </TabsList>
          </Tabs>

          <Tabs value={categoryFilter} onValueChange={setCategoryFilter} className="w-full md:w-auto">
            <TabsList>
              <TabsTrigger value="all">All Categories</TabsTrigger>
              <TabsTrigger value="participation">Participation</TabsTrigger>
              <TabsTrigger value="achievement">Achievement</TabsTrigger>
              <TabsTrigger value="social">Social</TabsTrigger>
              <TabsTrigger value="special">Special</TabsTrigger>
            </TabsList>
          </Tabs>
        </div>

        {/* Badges Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredBadges.map((badge) => {
            const isEarned = earnedBadges.includes(badge.id)
            const progress = userStats ? calculateBadgeProgress(badge, userStats) : 0

            return (
              <Card
                key={badge.id}
                className={`relative overflow-hidden transition-all hover:shadow-lg ${
                  isEarned ? "border-primary/50" : "opacity-75"
                }`}
              >
                {/* Rarity indicator */}
                <div
                  className={`absolute top-0 right-0 w-24 h-24 ${getRarityColor(badge.rarity)} opacity-10 rounded-bl-full`}
                />

                <CardHeader>
                  <div className="flex items-start justify-between">
                    <div className="flex items-center gap-3">
                      <div
                        className={`text-4xl ${isEarned ? "" : "grayscale opacity-50"}`}
                        title={isEarned ? "Earned" : "Locked"}
                      >
                        {badge.icon}
                      </div>
                      <div>
                        <CardTitle className="flex items-center gap-2">
                          {badge.name}
                          {isEarned && <Star className="h-4 w-4 text-yellow-500 fill-yellow-500" />}
                        </CardTitle>
                        <Badge variant="outline" className="mt-1 capitalize">
                          {badge.rarity}
                        </Badge>
                      </div>
                    </div>
                    {!isEarned && <Lock className="h-5 w-5 text-muted-foreground" />}
                  </div>
                </CardHeader>

                <CardContent className="space-y-4">
                  <p className="text-sm text-muted-foreground">{badge.description}</p>

                  <div className="space-y-2">
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-muted-foreground">Progress</span>
                      <span className="font-semibold">{Math.round(progress)}%</span>
                    </div>
                    <Progress value={progress} className="h-2" />
                    <p className="text-xs text-muted-foreground">{badge.criteria.description}</p>
                  </div>

                  <div className="flex items-center justify-between pt-2 border-t">
                    <span className="text-xs text-muted-foreground">Reward</span>
                    <Badge variant="secondary" className="flex items-center gap-1">
                      <Sparkles className="h-3 w-3" />+{badge.xpReward} XP
                    </Badge>
                  </div>
                </CardContent>
              </Card>
            )
          })}
        </div>

        {filteredBadges.length === 0 && (
          <Card>
            <CardContent className="py-12 text-center">
              <Trophy className="h-12 w-12 mx-auto mb-4 text-muted-foreground" />
              <p className="text-muted-foreground">No badges found matching your filters</p>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  )
}
