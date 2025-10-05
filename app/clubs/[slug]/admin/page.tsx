"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import Link from "next/link"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import {
  Users,
  Calendar,
  TrendingUp,
  UserPlus,
  Megaphone,
  BarChart3,
  Shield,
  Trash2,
  Edit,
  Eye,
  CheckCircle2,
  XCircle,
  Loader2,
  ArrowLeft,
  Plus,
  Download,
} from "lucide-react"
import { useAuth } from "@/contexts/auth-context"
import {
  isClubAdmin,
  getClubMembers,
  updateMemberRole,
  removeMember,
  getClubEventsAdmin,
  deleteEvent,
  createAnnouncement,
  getClubAnnouncements,
  deleteAnnouncement,
  getClubAnalytics,
  getEventParticipants,
  type ClubMember,
  type ClubEvent,
  type ClubAnnouncement,
  type ClubAnalytics,
} from "@/lib/club-admin-data"

export default function ClubAdminPage({ params }: { params: { slug: string } }) {
  const { user, loading: authLoading } = useAuth()
  const router = useRouter()

  const [isAdmin, setIsAdmin] = useState(false)
  const [loading, setLoading] = useState(true)
  const [members, setMembers] = useState<ClubMember[]>([])
  const [events, setEvents] = useState<ClubEvent[]>([])
  const [announcements, setAnnouncements] = useState<ClubAnnouncement[]>([])
  const [analytics, setAnalytics] = useState<ClubAnalytics | null>(null)
  const [selectedEvent, setSelectedEvent] = useState<string | null>(null)
  const [eventParticipants, setEventParticipants] = useState<any[]>([])

  // Dialog states
  const [announcementDialogOpen, setAnnouncementDialogOpen] = useState(false)
  const [announcementTitle, setAnnouncementTitle] = useState("")
  const [announcementContent, setAnnouncementContent] = useState("")
  const [submitting, setSubmitting] = useState(false)

  const clubId = params.slug // Using slug as clubId for now

  useEffect(() => {
    if (!authLoading && !user) {
      router.push("/")
    }
  }, [user, authLoading, router])

  useEffect(() => {
    async function checkAdminAndFetchData() {
      if (!user) return

      setLoading(true)
      try {
        // Check if user is admin
        const adminStatus = await isClubAdmin(clubId, user.uid)
        setIsAdmin(adminStatus)

        if (!adminStatus) {
          router.push(`/clubs/${clubId}`)
          return
        }

        // Fetch all admin data in parallel
        const [membersData, eventsData, announcementsData, analyticsData] = await Promise.all([
          getClubMembers(clubId),
          getClubEventsAdmin(clubId),
          getClubAnnouncements(clubId),
          getClubAnalytics(clubId),
        ])

        setMembers(membersData)
        setEvents(eventsData)
        setAnnouncements(announcementsData)
        setAnalytics(analyticsData)
      } catch (error) {
        console.error("[v0] Error fetching admin data:", error)
      } finally {
        setLoading(false)
      }
    }

    checkAdminAndFetchData()
  }, [user, clubId, router])

  const handleRoleChange = async (memberId: string, newRole: ClubMember["role"]) => {
    if (!user) return

    const success = await updateMemberRole(clubId, memberId, newRole, user.uid)
    if (success) {
      // Refresh members
      const updatedMembers = await getClubMembers(clubId)
      setMembers(updatedMembers)
    }
  }

  const handleRemoveMember = async (memberId: string) => {
    if (!user || !confirm("Are you sure you want to remove this member?")) return

    const success = await removeMember(clubId, memberId, user.uid)
    if (success) {
      // Refresh members
      const updatedMembers = await getClubMembers(clubId)
      setMembers(updatedMembers)
    }
  }

  const handleDeleteEvent = async (eventId: string) => {
    if (!user || !confirm("Are you sure you want to cancel this event?")) return

    const success = await deleteEvent(eventId, user.uid)
    if (success) {
      // Refresh events
      const updatedEvents = await getClubEventsAdmin(clubId)
      setEvents(updatedEvents)
    }
  }

  const handleCreateAnnouncement = async () => {
    if (!user || !announcementTitle || !announcementContent) return

    setSubmitting(true)
    try {
      const announcementId = await createAnnouncement(
        clubId,
        announcementTitle,
        announcementContent,
        user.uid,
        user.displayName || "Admin",
      )

      if (announcementId) {
        // Refresh announcements
        const updatedAnnouncements = await getClubAnnouncements(clubId)
        setAnnouncements(updatedAnnouncements)

        // Reset form
        setAnnouncementTitle("")
        setAnnouncementContent("")
        setAnnouncementDialogOpen(false)
      }
    } catch (error) {
      console.error("[v0] Error creating announcement:", error)
    } finally {
      setSubmitting(false)
    }
  }

  const handleDeleteAnnouncement = async (announcementId: string) => {
    if (!confirm("Are you sure you want to delete this announcement?")) return

    const success = await deleteAnnouncement(announcementId)
    if (success) {
      // Refresh announcements
      const updatedAnnouncements = await getClubAnnouncements(clubId)
      setAnnouncements(updatedAnnouncements)
    }
  }

  const handleViewParticipants = async (eventId: string) => {
    setSelectedEvent(eventId)
    const participants = await getEventParticipants(eventId)
    setEventParticipants(participants)
  }

  if (authLoading || loading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="flex flex-col items-center gap-4">
          <Loader2 className="h-8 w-8 animate-spin text-primary" />
          <p className="text-muted-foreground">Loading admin panel...</p>
        </div>
      </div>
    )
  }

  if (!isAdmin) {
    return null
  }

  const roleOptions: ClubMember["role"][] = [
    "club_coordinator",
    "lead",
    "co-lead",
    "secretary",
    "joint-secretary",
    "creative",
    "social",
    "member",
  ]

  return (
    <main className="min-h-screen bg-background">
      <Header />

      <div className="container py-8">
        {/* Header */}
        <div className="mb-8">
          <Link
            href={`/clubs/${clubId}`}
            className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors mb-4"
          >
            <ArrowLeft className="h-4 w-4" />
            Back to Club
          </Link>
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-4xl font-bold mb-2">Club Admin Panel</h1>
              <p className="text-muted-foreground">Manage your club members, events, and content</p>
            </div>
            <Badge className="bg-primary text-primary-foreground border-0">
              <Shield className="mr-2 h-4 w-4" />
              Admin Access
            </Badge>
          </div>
        </div>

        {/* Quick Stats */}
        {analytics && (
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
            <Card>
              <CardContent className="pt-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-muted-foreground">Total Members</p>
                    <p className="text-2xl font-bold">{analytics.totalMembers}</p>
                  </div>
                  <Users className="h-8 w-8 text-primary" />
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="pt-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-muted-foreground">Total Events</p>
                    <p className="text-2xl font-bold">{analytics.totalEvents}</p>
                  </div>
                  <Calendar className="h-8 w-8 text-primary" />
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="pt-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-muted-foreground">Upcoming Events</p>
                    <p className="text-2xl font-bold">{analytics.upcomingEvents}</p>
                  </div>
                  <TrendingUp className="h-8 w-8 text-primary" />
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="pt-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-muted-foreground">Avg Attendance</p>
                    <p className="text-2xl font-bold">{analytics.averageAttendance}</p>
                  </div>
                  <BarChart3 className="h-8 w-8 text-primary" />
                </div>
              </CardContent>
            </Card>
          </div>
        )}

        {/* Main Content */}
        <Tabs defaultValue="members" className="space-y-6">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="members">
              <Users className="mr-2 h-4 w-4" />
              Members
            </TabsTrigger>
            <TabsTrigger value="events">
              <Calendar className="mr-2 h-4 w-4" />
              Events
            </TabsTrigger>
            <TabsTrigger value="announcements">
              <Megaphone className="mr-2 h-4 w-4" />
              Announcements
            </TabsTrigger>
            <TabsTrigger value="analytics">
              <BarChart3 className="mr-2 h-4 w-4" />
              Analytics
            </TabsTrigger>
          </TabsList>

          {/* Members Tab */}
          <TabsContent value="members">
            <Card>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div>
                    <CardTitle>Club Members</CardTitle>
                    <CardDescription>Manage member roles and permissions</CardDescription>
                  </div>
                  <Button>
                    <UserPlus className="mr-2 h-4 w-4" />
                    Add Member
                  </Button>
                </div>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Member</TableHead>
                      <TableHead>Email</TableHead>
                      <TableHead>Role</TableHead>
                      <TableHead>Joined</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead className="text-right">Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {members.map((member) => (
                      <TableRow key={member.uid}>
                        <TableCell className="font-medium">{member.displayName}</TableCell>
                        <TableCell>{member.email}</TableCell>
                        <TableCell>
                          <Select
                            value={member.role}
                            onValueChange={(value) => handleRoleChange(member.uid, value as ClubMember["role"])}
                          >
                            <SelectTrigger className="w-[180px]">
                              <SelectValue />
                            </SelectTrigger>
                            <SelectContent>
                              {roleOptions.map((role) => (
                                <SelectItem key={role} value={role}>
                                  {role.replace(/_/g, " ").replace(/\b\w/g, (l) => l.toUpperCase())}
                                </SelectItem>
                              ))}
                            </SelectContent>
                          </Select>
                        </TableCell>
                        <TableCell>{member.joinedAt?.toDate?.()?.toLocaleDateString() || "N/A"}</TableCell>
                        <TableCell>
                          {member.isActive ? (
                            <Badge variant="outline" className="bg-green-500/10 text-green-500 border-green-500/20">
                              <CheckCircle2 className="mr-1 h-3 w-3" />
                              Active
                            </Badge>
                          ) : (
                            <Badge variant="outline" className="bg-red-500/10 text-red-500 border-red-500/20">
                              <XCircle className="mr-1 h-3 w-3" />
                              Inactive
                            </Badge>
                          )}
                        </TableCell>
                        <TableCell className="text-right">
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => handleRemoveMember(member.uid)}
                            className="text-red-500 hover:text-red-600 hover:bg-red-500/10"
                          >
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Events Tab */}
          <TabsContent value="events">
            <Card>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div>
                    <CardTitle>Club Events</CardTitle>
                    <CardDescription>Manage and monitor your club events</CardDescription>
                  </div>
                  <Button asChild>
                    <Link href={`/clubs/${clubId}/events/new`}>
                      <Plus className="mr-2 h-4 w-4" />
                      Create Event
                    </Link>
                  </Button>
                </div>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Event</TableHead>
                      <TableHead>Type</TableHead>
                      <TableHead>Date</TableHead>
                      <TableHead>Participants</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead className="text-right">Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {events.map((event) => (
                      <TableRow key={event.id}>
                        <TableCell className="font-medium">{event.title}</TableCell>
                        <TableCell>
                          <Badge variant="outline">{event.eventType}</Badge>
                        </TableCell>
                        <TableCell>{event.startDate?.toDate?.()?.toLocaleDateString() || "N/A"}</TableCell>
                        <TableCell>
                          {event.currentParticipants}
                          {event.maxParticipants && ` / ${event.maxParticipants}`}
                        </TableCell>
                        <TableCell>
                          <Badge
                            variant="outline"
                            className={
                              event.status === "published"
                                ? "bg-green-500/10 text-green-500 border-green-500/20"
                                : event.status === "completed"
                                  ? "bg-blue-500/10 text-blue-500 border-blue-500/20"
                                  : "bg-yellow-500/10 text-yellow-500 border-yellow-500/20"
                            }
                          >
                            {event.status}
                          </Badge>
                        </TableCell>
                        <TableCell className="text-right">
                          <div className="flex items-center justify-end gap-2">
                            <Dialog>
                              <DialogTrigger asChild>
                                <Button variant="ghost" size="sm" onClick={() => handleViewParticipants(event.id)}>
                                  <Eye className="h-4 w-4" />
                                </Button>
                              </DialogTrigger>
                              <DialogContent className="max-w-2xl">
                                <DialogHeader>
                                  <DialogTitle>Event Participants</DialogTitle>
                                  <DialogDescription>View and manage event attendees</DialogDescription>
                                </DialogHeader>
                                <div className="max-h-96 overflow-y-auto">
                                  <Table>
                                    <TableHeader>
                                      <TableRow>
                                        <TableHead>Name</TableHead>
                                        <TableHead>Email</TableHead>
                                        <TableHead>Status</TableHead>
                                        <TableHead>Attended</TableHead>
                                      </TableRow>
                                    </TableHeader>
                                    <TableBody>
                                      {eventParticipants.map((participant) => (
                                        <TableRow key={participant.uid}>
                                          <TableCell>{participant.name}</TableCell>
                                          <TableCell>{participant.email}</TableCell>
                                          <TableCell>
                                            <Badge variant="outline">{participant.rsvpStatus}</Badge>
                                          </TableCell>
                                          <TableCell>
                                            {participant.attended ? (
                                              <CheckCircle2 className="h-4 w-4 text-green-500" />
                                            ) : (
                                              <XCircle className="h-4 w-4 text-red-500" />
                                            )}
                                          </TableCell>
                                        </TableRow>
                                      ))}
                                    </TableBody>
                                  </Table>
                                </div>
                                <DialogFooter>
                                  <Button variant="outline">
                                    <Download className="mr-2 h-4 w-4" />
                                    Export CSV
                                  </Button>
                                </DialogFooter>
                              </DialogContent>
                            </Dialog>
                            <Button variant="ghost" size="sm" asChild>
                              <Link href={`/clubs/${clubId}/${event.id}/edit`}>
                                <Edit className="h-4 w-4" />
                              </Link>
                            </Button>
                            <Button
                              variant="ghost"
                              size="sm"
                              onClick={() => handleDeleteEvent(event.id)}
                              className="text-red-500 hover:text-red-600 hover:bg-red-500/10"
                            >
                              <Trash2 className="h-4 w-4" />
                            </Button>
                          </div>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Announcements Tab */}
          <TabsContent value="announcements">
            <Card>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div>
                    <CardTitle>Announcements</CardTitle>
                    <CardDescription>Post updates and announcements to club members</CardDescription>
                  </div>
                  <Dialog open={announcementDialogOpen} onOpenChange={setAnnouncementDialogOpen}>
                    <DialogTrigger asChild>
                      <Button>
                        <Plus className="mr-2 h-4 w-4" />
                        New Announcement
                      </Button>
                    </DialogTrigger>
                    <DialogContent>
                      <DialogHeader>
                        <DialogTitle>Create Announcement</DialogTitle>
                        <DialogDescription>Share important updates with your club members</DialogDescription>
                      </DialogHeader>
                      <div className="space-y-4">
                        <div>
                          <Label htmlFor="title">Title</Label>
                          <Input
                            id="title"
                            value={announcementTitle}
                            onChange={(e) => setAnnouncementTitle(e.target.value)}
                            placeholder="Announcement title"
                          />
                        </div>
                        <div>
                          <Label htmlFor="content">Content</Label>
                          <Textarea
                            id="content"
                            value={announcementContent}
                            onChange={(e) => setAnnouncementContent(e.target.value)}
                            placeholder="Write your announcement..."
                            rows={5}
                          />
                        </div>
                      </div>
                      <DialogFooter>
                        <Button variant="outline" onClick={() => setAnnouncementDialogOpen(false)}>
                          Cancel
                        </Button>
                        <Button onClick={handleCreateAnnouncement} disabled={submitting}>
                          {submitting ? (
                            <>
                              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                              Publishing...
                            </>
                          ) : (
                            "Publish"
                          )}
                        </Button>
                      </DialogFooter>
                    </DialogContent>
                  </Dialog>
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                {announcements.length === 0 ? (
                  <div className="text-center py-12 text-muted-foreground">
                    <Megaphone className="h-12 w-12 mx-auto mb-4 opacity-50" />
                    <p>No announcements yet. Create your first announcement!</p>
                  </div>
                ) : (
                  announcements.map((announcement) => (
                    <div key={announcement.id} className="border border-border rounded-lg p-4">
                      <div className="flex items-start justify-between mb-2">
                        <h3 className="font-semibold text-lg">{announcement.title}</h3>
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => handleDeleteAnnouncement(announcement.id)}
                          className="text-red-500 hover:text-red-600 hover:bg-red-500/10"
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                      <p className="text-muted-foreground mb-2">{announcement.content}</p>
                      <div className="flex items-center gap-2 text-sm text-muted-foreground">
                        <span>By {announcement.authorName}</span>
                        <span>•</span>
                        <span>{announcement.createdAt?.toDate?.()?.toLocaleDateString() || "N/A"}</span>
                      </div>
                    </div>
                  ))
                )}
              </CardContent>
            </Card>
          </TabsContent>

          {/* Analytics Tab */}
          <TabsContent value="analytics">
            <div className="grid gap-6">
              <Card>
                <CardHeader>
                  <CardTitle>Member Growth</CardTitle>
                  <CardDescription>Track your club's membership over time</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="h-64 flex items-end justify-around gap-2">
                    {analytics?.memberGrowth.map((data, index) => (
                      <div key={index} className="flex flex-col items-center gap-2 flex-1">
                        <div
                          className="w-full bg-primary rounded-t-lg transition-all hover:bg-primary/80"
                          style={{ height: `${(data.count / (analytics.totalMembers || 1)) * 100}%` }}
                        />
                        <span className="text-xs text-muted-foreground">{data.month}</span>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Events by Type</CardTitle>
                  <CardDescription>Distribution of event categories</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {analytics?.eventsByType.map((data, index) => (
                      <div key={index}>
                        <div className="flex items-center justify-between mb-2">
                          <span className="text-sm font-medium capitalize">{data.type}</span>
                          <span className="text-sm text-muted-foreground">{data.count} events</span>
                        </div>
                        <div className="h-2 bg-muted rounded-full overflow-hidden">
                          <div
                            className="h-full bg-primary rounded-full"
                            style={{ width: `${(data.count / (analytics.totalEvents || 1)) * 100}%` }}
                          />
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
        </Tabs>
      </div>

      <Footer />
    </main>
  )
}
