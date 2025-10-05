"use client"

import { useEffect, useState } from "react"
import { useAuth } from "@/contexts/auth-context"
import { useRouter } from "next/navigation"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import {
  Users,
  Building2,
  Calendar,
  TrendingUp,
  Shield,
  CheckCircle2,
  XCircle,
  Clock,
  BarChart3,
  FileText,
  AlertCircle,
} from "lucide-react"
import {
  getPlatformStats,
  getAllClubs,
  getAllUsers,
  getAllEvents,
  getHallRequests,
  verifyClub,
  deactivateClub,
  activateClub,
  approveHallRequest,
  rejectHallRequest,
  getAuditLogs,
  getAnalyticsData,
} from "@/lib/college-admin-data"

export default function CollegeAdminDashboard() {
  const { user, loading: authLoading } = useAuth()
  const router = useRouter()
  const [loading, setLoading] = useState(true)
  const [stats, setStats] = useState<any>(null)
  const [clubs, setClubs] = useState<any[]>([])
  const [users, setUsers] = useState<any[]>([])
  const [events, setEvents] = useState<any[]>([])
  const [hallRequests, setHallRequests] = useState<any[]>([])
  const [auditLogs, setAuditLogs] = useState<any[]>([])
  const [analytics, setAnalytics] = useState<any>(null)
  const [activeTab, setActiveTab] = useState("overview")
  const [actionLoading, setActionLoading] = useState<string | null>(null)

  useEffect(() => {
    const adminAccess = sessionStorage.getItem("clubconn_admin_access")
    const adminTimestamp = sessionStorage.getItem("clubconn_admin_timestamp")

    // Allow access if admin session exists and is less than 24 hours old
    if (adminAccess === "true" && adminTimestamp) {
      const timestamp = Number.parseInt(adminTimestamp)
      const hoursSinceAccess = (Date.now() - timestamp) / (1000 * 60 * 60)

      if (hoursSinceAccess < 24) {
        // Valid admin session, load data
        loadData()
        return
      } else {
        // Session expired, clear it
        sessionStorage.removeItem("clubconn_admin_access")
        sessionStorage.removeItem("clubconn_admin_timestamp")
      }
    }

    // Original authentication checks
    if (!authLoading && !user) {
      router.push("/login")
      return
    }

    // Check if user is platform admin
    if (user && user.platform_role !== "platform_admin") {
      router.push("/dashboard")
      return
    }

    if (user) {
      loadData()
    }
  }, [user, authLoading, router])

  async function loadData() {
    try {
      setLoading(true)
      const [statsData, clubsData, usersData, eventsData, hallRequestsData, auditLogsData, analyticsData] =
        await Promise.all([
          getPlatformStats(),
          getAllClubs(),
          getAllUsers(),
          getAllEvents(),
          getHallRequests({ status: "pending" }),
          getAuditLogs({ limit: 20 }),
          getAnalyticsData(),
        ])

      setStats(statsData)
      setClubs(clubsData)
      setUsers(usersData)
      setEvents(eventsData)
      setHallRequests(hallRequestsData)
      setAuditLogs(auditLogsData)
      setAnalytics(analyticsData)
    } catch (error) {
      console.error("Error loading admin data:", error)
    } finally {
      setLoading(false)
    }
  }

  async function handleVerifyClub(clubId: string) {
    if (!user) return
    setActionLoading(clubId)
    try {
      await verifyClub(clubId, user.uid)
      await loadData()
    } catch (error) {
      console.error("Error verifying club:", error)
    } finally {
      setActionLoading(null)
    }
  }

  async function handleToggleClubStatus(clubId: string, isActive: boolean) {
    if (!user) return
    setActionLoading(clubId)
    try {
      if (isActive) {
        await deactivateClub(clubId, user.uid)
      } else {
        await activateClub(clubId, user.uid)
      }
      await loadData()
    } catch (error) {
      console.error("Error toggling club status:", error)
    } finally {
      setActionLoading(null)
    }
  }

  async function handleApproveHallRequest(requestId: string) {
    if (!user) return
    setActionLoading(requestId)
    try {
      await approveHallRequest(requestId, user.uid)
      await loadData()
    } catch (error) {
      console.error("Error approving hall request:", error)
    } finally {
      setActionLoading(null)
    }
  }

  async function handleRejectHallRequest(requestId: string) {
    if (!user) return
    const reason = prompt("Enter rejection reason:")
    if (!reason) return

    setActionLoading(requestId)
    try {
      await rejectHallRequest(requestId, user.uid, reason)
      await loadData()
    } catch (error) {
      console.error("Error rejecting hall request:", error)
    } finally {
      setActionLoading(null)
    }
  }

  if (authLoading || loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
      </div>
    )
  }

  const adminAccess = sessionStorage.getItem("clubconn_admin_access")
  if (!user && adminAccess !== "true") {
    return null
  }

  if (user && user.platform_role !== "platform_admin" && adminAccess !== "true") {
    return null
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-primary/5">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center gap-3 mb-2">
            <Shield className="h-8 w-8 text-primary" />
            <h1 className="text-4xl font-bold">College Management Dashboard</h1>
          </div>
          <p className="text-muted-foreground">Platform-wide oversight and administration</p>
        </div>

        {/* Stats Overview */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium">Total Users</CardTitle>
              <Users className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stats?.totalUsers || 0}</div>
              <p className="text-xs text-muted-foreground">{stats?.activeUsers || 0} active</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium">Total Clubs</CardTitle>
              <Building2 className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stats?.totalClubs || 0}</div>
              <p className="text-xs text-muted-foreground">{stats?.pendingClubs || 0} pending approval</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium">Total Events</CardTitle>
              <Calendar className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stats?.totalEvents || 0}</div>
              <p className="text-xs text-muted-foreground">{stats?.upcomingEvents || 0} upcoming</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium">Growth (30d)</CardTitle>
              <TrendingUp className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">+{analytics?.userGrowth || 0}</div>
              <p className="text-xs text-muted-foreground">new users</p>
            </CardContent>
          </Card>
        </div>

        {/* Main Content Tabs */}
        <Tabs value={activeTab} onValueChange={setActiveTab}>
          <TabsList className="grid w-full grid-cols-5">
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="clubs">Clubs</TabsTrigger>
            <TabsTrigger value="users">Users</TabsTrigger>
            <TabsTrigger value="events">Events</TabsTrigger>
            <TabsTrigger value="halls">Hall Requests</TabsTrigger>
          </TabsList>

          {/* Overview Tab */}
          <TabsContent value="overview" className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* Pending Approvals */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <AlertCircle className="h-5 w-5" />
                    Pending Approvals
                  </CardTitle>
                  <CardDescription>Items requiring your attention</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-center justify-between">
                    <span className="text-sm">Clubs awaiting verification</span>
                    <Badge variant="secondary">{stats?.pendingClubs || 0}</Badge>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm">Hall booking requests</span>
                    <Badge variant="secondary">{hallRequests.length}</Badge>
                  </div>
                </CardContent>
              </Card>

              {/* Analytics */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <BarChart3 className="h-5 w-5" />
                    Platform Analytics
                  </CardTitle>
                  <CardDescription>Last 30 days</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-center justify-between">
                    <span className="text-sm">New users</span>
                    <span className="font-semibold">+{analytics?.userGrowth || 0}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm">New clubs</span>
                    <span className="font-semibold">+{analytics?.clubGrowth || 0}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm">Avg. event participation</span>
                    <span className="font-semibold">{analytics?.avgParticipantsPerEvent || 0}</span>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Recent Audit Logs */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <FileText className="h-5 w-5" />
                  Recent Activity
                </CardTitle>
                <CardDescription>Audit log of administrative actions</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {auditLogs.slice(0, 10).map((log: any) => (
                    <div key={log.id} className="flex items-center justify-between py-2 border-b last:border-0">
                      <div className="flex-1">
                        <p className="text-sm font-medium">
                          {log.action} {log.resource_type}
                        </p>
                        <p className="text-xs text-muted-foreground">by {log.actor_name || log.actor_uid}</p>
                      </div>
                      <span className="text-xs text-muted-foreground">
                        {log.timestamp?.toDate?.()?.toLocaleDateString()}
                      </span>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Clubs Tab */}
          <TabsContent value="clubs" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Club Management</CardTitle>
                <CardDescription>Approve, verify, and manage all clubs</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {clubs.map((club: any) => (
                    <div key={club.id} className="flex items-center justify-between p-4 border rounded-lg">
                      <div className="flex-1">
                        <h3 className="font-semibold">{club.name}</h3>
                        <p className="text-sm text-muted-foreground">{club.college_name}</p>
                        <div className="flex gap-2 mt-2">
                          <Badge variant={club.is_verified ? "default" : "secondary"}>
                            {club.is_verified ? "Verified" : "Unverified"}
                          </Badge>
                          <Badge variant={club.is_active ? "default" : "destructive"}>
                            {club.is_active ? "Active" : "Inactive"}
                          </Badge>
                          <Badge variant="outline">{club.category}</Badge>
                        </div>
                      </div>
                      <div className="flex gap-2">
                        {!club.is_verified && (
                          <Button
                            size="sm"
                            onClick={() => handleVerifyClub(club.id)}
                            disabled={actionLoading === club.id}
                          >
                            <CheckCircle2 className="h-4 w-4 mr-1" />
                            Verify
                          </Button>
                        )}
                        <Button
                          size="sm"
                          variant={club.is_active ? "destructive" : "default"}
                          onClick={() => handleToggleClubStatus(club.id, club.is_active)}
                          disabled={actionLoading === club.id}
                        >
                          {club.is_active ? "Deactivate" : "Activate"}
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Users Tab */}
          <TabsContent value="users" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>User Management</CardTitle>
                <CardDescription>View and manage all platform users</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {users.slice(0, 20).map((user: any) => (
                    <div key={user.uid} className="flex items-center justify-between p-4 border rounded-lg">
                      <div className="flex-1">
                        <h3 className="font-semibold">{user.displayName}</h3>
                        <p className="text-sm text-muted-foreground">{user.email}</p>
                        <div className="flex gap-2 mt-2">
                          <Badge variant={user.platform_role === "platform_admin" ? "default" : "secondary"}>
                            {user.platform_role}
                          </Badge>
                          <Badge variant={user.is_active ? "default" : "destructive"}>
                            {user.is_active ? "Active" : "Inactive"}
                          </Badge>
                          {user.college_name && <Badge variant="outline">{user.college_name}</Badge>}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Events Tab */}
          <TabsContent value="events" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Event Oversight</CardTitle>
                <CardDescription>Monitor all platform events</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {events.slice(0, 20).map((event: any) => (
                    <div key={event.id} className="flex items-center justify-between p-4 border rounded-lg">
                      <div className="flex-1">
                        <h3 className="font-semibold">{event.title}</h3>
                        <p className="text-sm text-muted-foreground">{event.organizer_name}</p>
                        <div className="flex gap-2 mt-2">
                          <Badge variant="outline">{event.event_type}</Badge>
                          <Badge variant="outline">{event.mode}</Badge>
                          <Badge variant="secondary">{event.current_participants || 0} participants</Badge>
                        </div>
                      </div>
                      <div className="text-right">
                        <p className="text-sm font-medium">{event.start_date?.toDate?.()?.toLocaleDateString()}</p>
                        <Badge variant={event.status === "published" ? "default" : "secondary"}>{event.status}</Badge>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Hall Requests Tab */}
          <TabsContent value="halls" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Hall Booking Requests</CardTitle>
                <CardDescription>Approve or reject hall booking requests</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {hallRequests.map((request: any) => (
                    <div key={request.id} className="flex items-center justify-between p-4 border rounded-lg">
                      <div className="flex-1">
                        <h3 className="font-semibold">{request.event_title}</h3>
                        <p className="text-sm text-muted-foreground">
                          {request.club_name} - {request.hall_name}
                        </p>
                        <div className="flex gap-2 mt-2">
                          <Badge variant="outline">
                            <Clock className="h-3 w-3 mr-1" />
                            {request.requested_date?.toDate?.()?.toLocaleDateString()}
                          </Badge>
                          <Badge variant="secondary">{request.expected_attendees} attendees</Badge>
                        </div>
                      </div>
                      <div className="flex gap-2">
                        <Button
                          size="sm"
                          onClick={() => handleApproveHallRequest(request.id)}
                          disabled={actionLoading === request.id}
                        >
                          <CheckCircle2 className="h-4 w-4 mr-1" />
                          Approve
                        </Button>
                        <Button
                          size="sm"
                          variant="destructive"
                          onClick={() => handleRejectHallRequest(request.id)}
                          disabled={actionLoading === request.id}
                        >
                          <XCircle className="h-4 w-4 mr-1" />
                          Reject
                        </Button>
                      </div>
                    </div>
                  ))}
                  {hallRequests.length === 0 && (
                    <p className="text-center text-muted-foreground py-8">No pending hall requests</p>
                  )}
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}
