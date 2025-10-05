"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import {
  Users,
  Building2,
  Calendar,
  TrendingUp,
  Shield,
  CheckCircle2,
  XCircle,
  BarChart3,
  FileText,
  AlertCircle,
  Projector,
  Flower2,
  Home,
  Package,
  Activity,
  Download,
  Search,
  Filter,
} from "lucide-react"
import Link from "next/link"

// Mock data - Replace with actual API calls
const mockStats = {
  totalClubs: 45,
  activeClubs: 42,
  totalEvents: 156,
  upcomingEvents: 23,
  totalUsers: 2847,
  activeUsers: 2103,
  pendingRequests: 12,
  monthlyGrowth: 18,
}

const mockClubs = [
  {
    id: "1",
    name: "Computer Society of India",
    shortName: "CSI",
    category: "Technical",
    events: 24,
    members: 156,
    status: "active",
    lastActivity: "2 hours ago",
  },
  {
    id: "2",
    name: "FOSS Community",
    shortName: "FOSS",
    category: "Technical",
    events: 18,
    members: 89,
    status: "active",
    lastActivity: "5 hours ago",
  },
  {
    id: "3",
    name: "Cultural Committee",
    shortName: "CC",
    category: "Cultural",
    events: 32,
    members: 234,
    status: "active",
    lastActivity: "1 day ago",
  },
]

const mockSupportRequests = [
  {
    id: "1",
    type: "hall",
    title: "Seminar Hall A Booking",
    club: "CSI",
    requestedBy: "Anup Patil",
    date: "2025-01-15",
    time: "10:00 AM - 4:00 PM",
    attendees: 120,
    status: "pending",
    priority: "high",
  },
  {
    id: "2",
    type: "projector",
    title: "Projector for Workshop",
    club: "FOSS",
    requestedBy: "Akshada Kale",
    date: "2025-01-18",
    quantity: 2,
    status: "pending",
    priority: "medium",
  },
  {
    id: "3",
    type: "flowers",
    title: "Flower Decoration for Inauguration",
    club: "Cultural Committee",
    requestedBy: "Arinjay Gawade",
    date: "2025-01-20",
    budget: "₹5000",
    status: "approved",
    priority: "low",
  },
  {
    id: "4",
    type: "guesthouse",
    title: "Guest House for Chief Guest",
    club: "CSI",
    requestedBy: "Manas Shinde",
    date: "2025-01-22",
    duration: "2 nights",
    status: "pending",
    priority: "high",
  },
]

const mockReports = [
  {
    id: "1",
    title: "Tech Fest 2024 - Final Report",
    club: "CSI",
    event: "Tech Fest 2024",
    date: "2024-12-15",
    participants: 450,
    budget: "₹2,50,000",
    status: "completed",
  },
  {
    id: "2",
    title: "Hackathon Q4 2024",
    club: "FOSS",
    event: "Code Sprint Hackathon",
    date: "2024-11-28",
    participants: 89,
    budget: "₹50,000",
    status: "completed",
  },
  {
    id: "3",
    title: "Cultural Night 2024",
    club: "Cultural Committee",
    event: "Annual Cultural Night",
    date: "2024-12-20",
    participants: 800,
    budget: "₹3,00,000",
    status: "completed",
  },
]

export default function AdminDashboard() {
  const [activeTab, setActiveTab] = useState("overview")
  const [searchQuery, setSearchQuery] = useState("")
  const [filterStatus, setFilterStatus] = useState("all")

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-emerald-500/5">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <Shield className="h-8 w-8 text-emerald-500" />
              <div>
                <h1 className="text-4xl font-bold">
                  <span className="text-emerald-500">ClubConn</span> Admin Dashboard
                </h1>
                <p className="text-muted-foreground">Comprehensive club management and oversight</p>
              </div>
            </div>
            <Button variant="outline" asChild>
              <Link href="/">Back to Home</Link>
            </Button>
          </div>
        </div>

        {/* Stats Overview */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <Card className="border-emerald-500/20">
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium">Total Clubs</CardTitle>
              <Building2 className="h-4 w-4 text-emerald-500" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{mockStats.totalClubs}</div>
              <p className="text-xs text-muted-foreground">{mockStats.activeClubs} active</p>
            </CardContent>
          </Card>

          <Card className="border-emerald-500/20">
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium">Total Events</CardTitle>
              <Calendar className="h-4 w-4 text-emerald-500" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{mockStats.totalEvents}</div>
              <p className="text-xs text-muted-foreground">{mockStats.upcomingEvents} upcoming</p>
            </CardContent>
          </Card>

          <Card className="border-emerald-500/20">
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium">Total Users</CardTitle>
              <Users className="h-4 w-4 text-emerald-500" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{mockStats.totalUsers}</div>
              <p className="text-xs text-muted-foreground">{mockStats.activeUsers} active</p>
            </CardContent>
          </Card>

          <Card className="border-emerald-500/20">
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium">Pending Requests</CardTitle>
              <AlertCircle className="h-4 w-4 text-orange-500" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{mockStats.pendingRequests}</div>
              <p className="text-xs text-muted-foreground">Requires attention</p>
            </CardContent>
          </Card>
        </div>

        {/* Main Content Tabs */}
        <Tabs value={activeTab} onValueChange={setActiveTab}>
          <TabsList className="grid w-full grid-cols-5 mb-6">
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="clubs">Clubs Activity</TabsTrigger>
            <TabsTrigger value="reports">Reports</TabsTrigger>
            <TabsTrigger value="support">Support Requests</TabsTrigger>
            <TabsTrigger value="analytics">Analytics</TabsTrigger>
          </TabsList>

          {/* Overview Tab */}
          <TabsContent value="overview" className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* Quick Actions */}
              <Card className="border-emerald-500/20">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Activity className="h-5 w-5 text-emerald-500" />
                    Quick Actions
                  </CardTitle>
                  <CardDescription>Common administrative tasks</CardDescription>
                </CardHeader>
                <CardContent className="space-y-3">
                  <Button className="w-full justify-start bg-transparent" variant="outline" asChild>
                    <Link href="/college-admin">
                      <Shield className="h-4 w-4 mr-2" />
                      College Management Dashboard
                    </Link>
                  </Button>
                  <Button className="w-full justify-start bg-transparent" variant="outline">
                    <FileText className="h-4 w-4 mr-2" />
                    Generate Monthly Report
                  </Button>
                  <Button className="w-full justify-start bg-transparent" variant="outline">
                    <Download className="h-4 w-4 mr-2" />
                    Export All Data
                  </Button>
                  <Button className="w-full justify-start bg-transparent" variant="outline">
                    <BarChart3 className="h-4 w-4 mr-2" />
                    View Detailed Analytics
                  </Button>
                </CardContent>
              </Card>

              {/* Pending Approvals */}
              <Card className="border-orange-500/20">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <AlertCircle className="h-5 w-5 text-orange-500" />
                    Pending Approvals
                  </CardTitle>
                  <CardDescription>Items requiring immediate attention</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-center justify-between p-3 bg-orange-500/5 rounded-lg">
                    <div className="flex items-center gap-3">
                      <Home className="h-5 w-5 text-orange-500" />
                      <span className="text-sm font-medium">Hall Bookings</span>
                    </div>
                    <Badge variant="secondary">3 pending</Badge>
                  </div>
                  <div className="flex items-center justify-between p-3 bg-orange-500/5 rounded-lg">
                    <div className="flex items-center gap-3">
                      <Projector className="h-5 w-5 text-orange-500" />
                      <span className="text-sm font-medium">Equipment Requests</span>
                    </div>
                    <Badge variant="secondary">2 pending</Badge>
                  </div>
                  <div className="flex items-center justify-between p-3 bg-orange-500/5 rounded-lg">
                    <div className="flex items-center gap-3">
                      <Package className="h-5 w-5 text-orange-500" />
                      <span className="text-sm font-medium">Resource Requests</span>
                    </div>
                    <Badge variant="secondary">7 pending</Badge>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Recent Activity */}
            <Card className="border-emerald-500/20">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Activity className="h-5 w-5 text-emerald-500" />
                  Recent Club Activity
                </CardTitle>
                <CardDescription>Latest updates from all clubs</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {mockClubs.map((club) => (
                    <div key={club.id} className="flex items-center justify-between p-4 border rounded-lg">
                      <div className="flex-1">
                        <h3 className="font-semibold">{club.name}</h3>
                        <div className="flex gap-4 mt-2 text-sm text-muted-foreground">
                          <span>{club.events} events</span>
                          <span>{club.members} members</span>
                          <span>Last active: {club.lastActivity}</span>
                        </div>
                      </div>
                      <Badge className="bg-emerald-500">{club.status}</Badge>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Clubs Activity Tab */}
          <TabsContent value="clubs" className="space-y-6">
            <Card className="border-emerald-500/20">
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div>
                    <CardTitle>All Clubs Activity Tracking</CardTitle>
                    <CardDescription>Monitor and manage all club activities</CardDescription>
                  </div>
                  <div className="flex gap-2">
                    <Button variant="outline" size="sm">
                      <Filter className="h-4 w-4 mr-2" />
                      Filter
                    </Button>
                    <Button variant="outline" size="sm">
                      <Download className="h-4 w-4 mr-2" />
                      Export
                    </Button>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <div className="mb-4">
                  <div className="relative">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                    <Input
                      placeholder="Search clubs..."
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      className="pl-10"
                    />
                  </div>
                </div>
                <div className="space-y-4">
                  {mockClubs.map((club) => (
                    <div key={club.id} className="p-4 border rounded-lg hover:border-emerald-500/50 transition-colors">
                      <div className="flex items-start justify-between mb-3">
                        <div>
                          <h3 className="font-semibold text-lg">{club.name}</h3>
                          <p className="text-sm text-muted-foreground">{club.shortName}</p>
                        </div>
                        <Badge variant="outline">{club.category}</Badge>
                      </div>
                      <div className="grid grid-cols-3 gap-4 mb-3">
                        <div>
                          <p className="text-xs text-muted-foreground">Events</p>
                          <p className="text-lg font-semibold">{club.events}</p>
                        </div>
                        <div>
                          <p className="text-xs text-muted-foreground">Members</p>
                          <p className="text-lg font-semibold">{club.members}</p>
                        </div>
                        <div>
                          <p className="text-xs text-muted-foreground">Last Activity</p>
                          <p className="text-sm">{club.lastActivity}</p>
                        </div>
                      </div>
                      <div className="flex gap-2">
                        <Button size="sm" variant="outline" className="flex-1 bg-transparent">
                          View Details
                        </Button>
                        <Button size="sm" variant="outline" className="flex-1 bg-transparent">
                          View Events
                        </Button>
                        <Button size="sm" variant="outline" className="flex-1 bg-transparent">
                          View Reports
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Reports Tab */}
          <TabsContent value="reports" className="space-y-6">
            <Card className="border-emerald-500/20">
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div>
                    <CardTitle>Event Reports & Documentation</CardTitle>
                    <CardDescription>Access all event reports and documentation</CardDescription>
                  </div>
                  <Button className="bg-emerald-500 hover:bg-emerald-600">
                    <Download className="h-4 w-4 mr-2" />
                    Download All
                  </Button>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {mockReports.map((report) => (
                    <div
                      key={report.id}
                      className="p-4 border rounded-lg hover:border-emerald-500/50 transition-colors"
                    >
                      <div className="flex items-start justify-between mb-3">
                        <div className="flex-1">
                          <h3 className="font-semibold text-lg">{report.title}</h3>
                          <p className="text-sm text-muted-foreground mt-1">
                            {report.club} • {report.event}
                          </p>
                        </div>
                        <Badge className="bg-emerald-500">{report.status}</Badge>
                      </div>
                      <div className="grid grid-cols-3 gap-4 mb-3">
                        <div>
                          <p className="text-xs text-muted-foreground">Date</p>
                          <p className="text-sm font-medium">{report.date}</p>
                        </div>
                        <div>
                          <p className="text-xs text-muted-foreground">Participants</p>
                          <p className="text-sm font-medium">{report.participants}</p>
                        </div>
                        <div>
                          <p className="text-xs text-muted-foreground">Budget</p>
                          <p className="text-sm font-medium">{report.budget}</p>
                        </div>
                      </div>
                      <div className="flex gap-2">
                        <Button size="sm" variant="outline" className="flex-1 bg-transparent">
                          <FileText className="h-4 w-4 mr-2" />
                          View Report
                        </Button>
                        <Button size="sm" variant="outline" className="flex-1 bg-transparent">
                          <Download className="h-4 w-4 mr-2" />
                          Download PDF
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Support Requests Tab */}
          <TabsContent value="support" className="space-y-6">
            <Card className="border-emerald-500/20">
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div>
                    <CardTitle>Support Requests Management</CardTitle>
                    <CardDescription>Manage hall bookings, equipment, and resource requests</CardDescription>
                  </div>
                  <div className="flex gap-2">
                    <select
                      className="px-3 py-2 border rounded-md text-sm"
                      value={filterStatus}
                      onChange={(e) => setFilterStatus(e.target.value)}
                    >
                      <option value="all">All Status</option>
                      <option value="pending">Pending</option>
                      <option value="approved">Approved</option>
                      <option value="rejected">Rejected</option>
                    </select>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {mockSupportRequests.map((request) => (
                    <div
                      key={request.id}
                      className="p-4 border rounded-lg hover:border-emerald-500/50 transition-colors"
                    >
                      <div className="flex items-start justify-between mb-3">
                        <div className="flex items-start gap-3 flex-1">
                          <div className="p-2 bg-emerald-500/10 rounded-lg">
                            {request.type === "hall" && <Home className="h-5 w-5 text-emerald-500" />}
                            {request.type === "projector" && <Projector className="h-5 w-5 text-emerald-500" />}
                            {request.type === "flowers" && <Flower2 className="h-5 w-5 text-emerald-500" />}
                            {request.type === "guesthouse" && <Building2 className="h-5 w-5 text-emerald-500" />}
                          </div>
                          <div className="flex-1">
                            <h3 className="font-semibold">{request.title}</h3>
                            <p className="text-sm text-muted-foreground mt-1">
                              {request.club} • Requested by {request.requestedBy}
                            </p>
                          </div>
                        </div>
                        <div className="flex gap-2">
                          <Badge
                            variant={
                              request.status === "pending"
                                ? "secondary"
                                : request.status === "approved"
                                  ? "default"
                                  : "destructive"
                            }
                            className={request.status === "approved" ? "bg-emerald-500" : ""}
                          >
                            {request.status}
                          </Badge>
                          <Badge
                            variant="outline"
                            className={
                              request.priority === "high"
                                ? "border-red-500 text-red-500"
                                : request.priority === "medium"
                                  ? "border-orange-500 text-orange-500"
                                  : "border-blue-500 text-blue-500"
                            }
                          >
                            {request.priority}
                          </Badge>
                        </div>
                      </div>
                      <div className="grid grid-cols-2 gap-4 mb-3 text-sm">
                        <div>
                          <p className="text-muted-foreground">Date</p>
                          <p className="font-medium">{request.date}</p>
                        </div>
                        <div>
                          <p className="text-muted-foreground">
                            {request.type === "hall" ? "Time" : request.type === "projector" ? "Quantity" : "Details"}
                          </p>
                          <p className="font-medium">
                            {request.time || request.quantity || request.budget || request.duration}
                          </p>
                        </div>
                      </div>
                      {request.status === "pending" && (
                        <div className="flex gap-2">
                          <Button size="sm" className="flex-1 bg-emerald-500 hover:bg-emerald-600">
                            <CheckCircle2 className="h-4 w-4 mr-2" />
                            Approve
                          </Button>
                          <Button size="sm" variant="destructive" className="flex-1">
                            <XCircle className="h-4 w-4 mr-2" />
                            Reject
                          </Button>
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Analytics Tab */}
          <TabsContent value="analytics" className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <Card className="border-emerald-500/20">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <TrendingUp className="h-5 w-5 text-emerald-500" />
                    Growth Metrics
                  </CardTitle>
                  <CardDescription>Platform growth over time</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-center justify-between p-3 bg-emerald-500/5 rounded-lg">
                    <span className="text-sm font-medium">Monthly User Growth</span>
                    <span className="text-lg font-bold text-emerald-500">+{mockStats.monthlyGrowth}%</span>
                  </div>
                  <div className="flex items-center justify-between p-3 bg-emerald-500/5 rounded-lg">
                    <span className="text-sm font-medium">New Clubs This Month</span>
                    <span className="text-lg font-bold text-emerald-500">+5</span>
                  </div>
                  <div className="flex items-center justify-between p-3 bg-emerald-500/5 rounded-lg">
                    <span className="text-sm font-medium">Events This Month</span>
                    <span className="text-lg font-bold text-emerald-500">23</span>
                  </div>
                  <div className="flex items-center justify-between p-3 bg-emerald-500/5 rounded-lg">
                    <span className="text-sm font-medium">Avg. Event Attendance</span>
                    <span className="text-lg font-bold text-emerald-500">127</span>
                  </div>
                </CardContent>
              </Card>

              <Card className="border-emerald-500/20">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <BarChart3 className="h-5 w-5 text-emerald-500" />
                    Top Performing Clubs
                  </CardTitle>
                  <CardDescription>Based on events and engagement</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  {mockClubs.map((club, index) => (
                    <div key={club.id} className="flex items-center gap-3">
                      <div className="flex items-center justify-center w-8 h-8 rounded-full bg-emerald-500/10 text-emerald-500 font-bold">
                        {index + 1}
                      </div>
                      <div className="flex-1">
                        <p className="font-medium">{club.name}</p>
                        <p className="text-xs text-muted-foreground">
                          {club.events} events • {club.members} members
                        </p>
                      </div>
                      <Badge variant="outline">{club.category}</Badge>
                    </div>
                  ))}
                </CardContent>
              </Card>
            </div>

            <Card className="border-emerald-500/20">
              <CardHeader>
                <CardTitle>Detailed Analytics</CardTitle>
                <CardDescription>Comprehensive platform statistics and insights</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  <div className="p-4 border rounded-lg text-center">
                    <p className="text-2xl font-bold text-emerald-500">94%</p>
                    <p className="text-sm text-muted-foreground mt-1">Event Success Rate</p>
                  </div>
                  <div className="p-4 border rounded-lg text-center">
                    <p className="text-2xl font-bold text-emerald-500">4.8</p>
                    <p className="text-sm text-muted-foreground mt-1">Avg. Event Rating</p>
                  </div>
                  <div className="p-4 border rounded-lg text-center">
                    <p className="text-2xl font-bold text-emerald-500">87%</p>
                    <p className="text-sm text-muted-foreground mt-1">User Engagement</p>
                  </div>
                  <div className="p-4 border rounded-lg text-center">
                    <p className="text-2xl font-bold text-emerald-500">2.3k</p>
                    <p className="text-sm text-muted-foreground mt-1">Total Certificates</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}
