"use client"

import { Footer } from "@/components/footer"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  TrendingUp,
  Eye,
  MousePointerClick,
  Calendar,
  DollarSign,
  BarChart3,
  ExternalLink,
  Building2,
} from "lucide-react"
import { useAuth } from "@/contexts/auth-context"
import { useRouter } from "next/navigation"
import { useEffect, useState } from "react"
import {
  getSponsorSponsorships,
  getSponsorshipAnalytics,
  type Sponsorship,
  type SponsorshipAnalytics,
} from "@/lib/sponsorship"
import { Progress } from "@/components/ui/progress"

export default function SponsorDashboardPage() {
  const { user, loading: authLoading } = useAuth()
  const router = useRouter()
  const [sponsorships, setSponsorships] = useState<Sponsorship[]>([])
  const [analytics, setAnalytics] = useState<Map<string, SponsorshipAnalytics>>(new Map())
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    if (!authLoading && !user) {
      router.push("/login")
    }
  }, [user, authLoading, router])

  useEffect(() => {
    async function fetchData() {
      if (!user) return

      setLoading(true)
      try {
        // Fetch sponsorships
        const sponsorshipsData = await getSponsorSponsorships(user.uid)
        setSponsorships(sponsorshipsData)

        // Fetch analytics for each sponsorship
        const analyticsMap = new Map<string, SponsorshipAnalytics>()
        for (const sponsorship of sponsorshipsData) {
          const analyticsData = await getSponsorshipAnalytics(sponsorship.id)
          if (analyticsData) {
            analyticsMap.set(sponsorship.id, analyticsData)
          }
        }
        setAnalytics(analyticsMap)
      } catch (error) {
        console.error("[v0] Error fetching sponsor data:", error)
      } finally {
        setLoading(false)
      }
    }

    fetchData()
  }, [user])

  const activeSponsorships = sponsorships.filter((s) => s.status === "active")
  const totalInvestment = sponsorships.reduce((sum, s) => sum + s.amount, 0)
  const totalImpressions = Array.from(analytics.values()).reduce((sum, a) => sum + a.totalImpressions, 0)
  const totalClicks = Array.from(analytics.values()).reduce((sum, a) => sum + a.totalClicks, 0)
  const avgEngagementRate =
    analytics.size > 0
      ? Array.from(analytics.values()).reduce((sum, a) => sum + a.engagementRate, 0) / analytics.size
      : 0

  if (authLoading || loading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <p className="text-muted-foreground">Loading dashboard...</p>
      </div>
    )
  }

  return (
    <main className="min-h-screen bg-background">
      <div className="container py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-2">Sponsor Dashboard</h1>
          <p className="text-muted-foreground">Track your sponsorships and measure your impact</p>
        </div>

        {/* Stats Overview */}
        <div className="grid md:grid-cols-4 gap-6 mb-8">
          <Card>
            <CardContent className="pt-6">
              <div className="flex items-center justify-between mb-2">
                <p className="text-sm text-muted-foreground">Active Sponsorships</p>
                <Building2 className="h-4 w-4 text-muted-foreground" />
              </div>
              <p className="text-3xl font-bold">{activeSponsorships.length}</p>
              <p className="text-xs text-muted-foreground mt-1">
                {sponsorships.length - activeSponsorships.length} pending/expired
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="pt-6">
              <div className="flex items-center justify-between mb-2">
                <p className="text-sm text-muted-foreground">Total Investment</p>
                <DollarSign className="h-4 w-4 text-muted-foreground" />
              </div>
              <p className="text-3xl font-bold">${totalInvestment.toLocaleString()}</p>
              <p className="text-xs text-green-500 mt-1">+12% from last quarter</p>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="pt-6">
              <div className="flex items-center justify-between mb-2">
                <p className="text-sm text-muted-foreground">Total Impressions</p>
                <Eye className="h-4 w-4 text-muted-foreground" />
              </div>
              <p className="text-3xl font-bold">{totalImpressions.toLocaleString()}</p>
              <p className="text-xs text-green-500 mt-1">+24% this month</p>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="pt-6">
              <div className="flex items-center justify-between mb-2">
                <p className="text-sm text-muted-foreground">Engagement Rate</p>
                <TrendingUp className="h-4 w-4 text-muted-foreground" />
              </div>
              <p className="text-3xl font-bold">{avgEngagementRate.toFixed(1)}%</p>
              <p className="text-xs text-green-500 mt-1">+3.2% from average</p>
            </CardContent>
          </Card>
        </div>

        {/* Sponsorships */}
        <Tabs defaultValue="active" className="w-full">
          <TabsList>
            <TabsTrigger value="active">Active</TabsTrigger>
            <TabsTrigger value="pending">Pending</TabsTrigger>
            <TabsTrigger value="all">All</TabsTrigger>
          </TabsList>

          <TabsContent value="active" className="space-y-6 mt-6">
            {activeSponsorships.length === 0 ? (
              <Card>
                <CardContent className="py-12 text-center">
                  <p className="text-muted-foreground">No active sponsorships</p>
                </CardContent>
              </Card>
            ) : (
              activeSponsorships.map((sponsorship) => {
                const sponsorshipAnalytics = analytics.get(sponsorship.id)
                return (
                  <Card key={sponsorship.id}>
                    <CardHeader>
                      <div className="flex items-start justify-between">
                        <div>
                          <CardTitle>Sponsorship #{sponsorship.id.slice(0, 8)}</CardTitle>
                          <p className="text-sm text-muted-foreground mt-1">Club ID: {sponsorship.clubId}</p>
                        </div>
                        <Badge>{sponsorship.status}</Badge>
                      </div>
                    </CardHeader>
                    <CardContent className="space-y-6">
                      {/* Analytics */}
                      {sponsorshipAnalytics && (
                        <div className="grid md:grid-cols-4 gap-4">
                          <div>
                            <div className="flex items-center gap-2 mb-2">
                              <Eye className="h-4 w-4 text-muted-foreground" />
                              <span className="text-sm text-muted-foreground">Impressions</span>
                            </div>
                            <p className="text-2xl font-bold">
                              {sponsorshipAnalytics.totalImpressions.toLocaleString()}
                            </p>
                          </div>

                          <div>
                            <div className="flex items-center gap-2 mb-2">
                              <MousePointerClick className="h-4 w-4 text-muted-foreground" />
                              <span className="text-sm text-muted-foreground">Clicks</span>
                            </div>
                            <p className="text-2xl font-bold">{sponsorshipAnalytics.totalClicks.toLocaleString()}</p>
                          </div>

                          <div>
                            <div className="flex items-center gap-2 mb-2">
                              <BarChart3 className="h-4 w-4 text-muted-foreground" />
                              <span className="text-sm text-muted-foreground">Engagement</span>
                            </div>
                            <p className="text-2xl font-bold">{sponsorshipAnalytics.engagementRate.toFixed(1)}%</p>
                          </div>

                          <div>
                            <div className="flex items-center gap-2 mb-2">
                              <Calendar className="h-4 w-4 text-muted-foreground" />
                              <span className="text-sm text-muted-foreground">Events</span>
                            </div>
                            <p className="text-2xl font-bold">{sponsorshipAnalytics.eventsSponsored}</p>
                          </div>
                        </div>
                      )}

                      {/* Benefits */}
                      <div>
                        <p className="text-sm font-semibold mb-3">Benefits Included:</p>
                        <div className="grid md:grid-cols-2 gap-2">
                          {sponsorship.benefits.map((benefit, index) => (
                            <div key={index} className="flex items-center gap-2 text-sm">
                              <div className="h-1.5 w-1.5 rounded-full bg-primary" />
                              <span>{benefit}</span>
                            </div>
                          ))}
                        </div>
                      </div>

                      {/* Duration */}
                      <div>
                        <div className="flex items-center justify-between text-sm mb-2">
                          <span className="text-muted-foreground">Sponsorship Duration</span>
                          <span className="font-medium">
                            {sponsorship.startDate.toDate().toLocaleDateString()} -{" "}
                            {sponsorship.endDate.toDate().toLocaleDateString()}
                          </span>
                        </div>
                        <Progress value={50} className="h-2" />
                      </div>

                      <div className="flex gap-2">
                        <Button variant="outline" className="flex-1 bg-transparent">
                          <BarChart3 className="mr-2 h-4 w-4" />
                          View Full Analytics
                        </Button>
                        <Button variant="outline" className="bg-transparent">
                          <ExternalLink className="h-4 w-4" />
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                )
              })
            )}
          </TabsContent>

          <TabsContent value="pending" className="space-y-6 mt-6">
            {sponsorships.filter((s) => s.status === "pending").length === 0 ? (
              <Card>
                <CardContent className="py-12 text-center">
                  <p className="text-muted-foreground">No pending sponsorships</p>
                </CardContent>
              </Card>
            ) : (
              sponsorships
                .filter((s) => s.status === "pending")
                .map((sponsorship) => (
                  <Card key={sponsorship.id}>
                    <CardHeader>
                      <div className="flex items-start justify-between">
                        <div>
                          <CardTitle>Sponsorship #{sponsorship.id.slice(0, 8)}</CardTitle>
                          <p className="text-sm text-muted-foreground mt-1">Club ID: {sponsorship.clubId}</p>
                        </div>
                        <Badge variant="outline">{sponsorship.status}</Badge>
                      </div>
                    </CardHeader>
                    <CardContent>
                      <p className="text-sm text-muted-foreground mb-4">
                        Your sponsorship request is pending approval from the club administrators.
                      </p>
                      <div className="flex items-center justify-between text-sm">
                        <span className="text-muted-foreground">Amount:</span>
                        <span className="font-bold">${sponsorship.amount.toLocaleString()}</span>
                      </div>
                    </CardContent>
                  </Card>
                ))
            )}
          </TabsContent>

          <TabsContent value="all" className="space-y-6 mt-6">
            {sponsorships.length === 0 ? (
              <Card>
                <CardContent className="py-12 text-center">
                  <p className="text-muted-foreground mb-4">No sponsorships yet</p>
                  <Button asChild>
                    <a href="/sponsorship">Browse Opportunities</a>
                  </Button>
                </CardContent>
              </Card>
            ) : (
              sponsorships.map((sponsorship) => (
                <Card key={sponsorship.id}>
                  <CardHeader>
                    <div className="flex items-start justify-between">
                      <div>
                        <CardTitle>Sponsorship #{sponsorship.id.slice(0, 8)}</CardTitle>
                        <p className="text-sm text-muted-foreground mt-1">Club ID: {sponsorship.clubId}</p>
                      </div>
                      <Badge variant={sponsorship.status === "active" ? "default" : "outline"}>
                        {sponsorship.status}
                      </Badge>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="flex items-center justify-between">
                      <div className="text-sm">
                        <span className="text-muted-foreground">Amount: </span>
                        <span className="font-bold">${sponsorship.amount.toLocaleString()}</span>
                      </div>
                      <div className="text-sm text-muted-foreground">
                        {sponsorship.startDate.toDate().toLocaleDateString()} -{" "}
                        {sponsorship.endDate.toDate().toLocaleDateString()}
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))
            )}
          </TabsContent>
        </Tabs>
      </div>

      <Footer />
    </main>
  )
}
