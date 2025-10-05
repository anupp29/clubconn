"use client"

import type React from "react"

import { useState } from "react"
import { useRouter } from "next/navigation"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { ArrowLeft, Plus, X, Save } from "lucide-react"

export default function EditClubPage({ params }: { params: { slug: string } }) {
  const router = useRouter()
  const [isSaving, setIsSaving] = useState(false)

  // Form state
  const [formData, setFormData] = useState({
    name: "Computer Society of India",
    shortName: "CSI",
    tagline: "Empowering Innovation Through Technology",
    logo: "",
    description: "",
    mission: "",
    vision: "",
    founded: "2015",
    email: "csi@kkwieer.edu.in",
    linkedin: "",
    instagram: "",
  })

  const [history, setHistory] = useState([{ year: "2015", event: "CSI KKWIEER Chapter Founded", description: "" }])

  const [committee, setCommittee] = useState([{ name: "", role: "", image: "" }])

  const [events, setEvents] = useState([{ title: "", date: "", image: "", description: "" }])

  const [upcomingEvents, setUpcomingEvents] = useState([
    { title: "", date: "", time: "", location: "", description: "" },
  ])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSaving(true)

    // Simulate save
    await new Promise((resolve) => setTimeout(resolve, 1000))

    setIsSaving(false)
    router.push(`/clubs/${params.slug}`)
  }

  const addHistoryItem = () => {
    setHistory([...history, { year: "", event: "", description: "" }])
  }

  const removeHistoryItem = (index: number) => {
    setHistory(history.filter((_, i) => i !== index))
  }

  const addCommitteeMember = () => {
    setCommittee([...committee, { name: "", role: "", image: "" }])
  }

  const removeCommitteeMember = (index: number) => {
    setCommittee(committee.filter((_, i) => i !== index))
  }

  const addEvent = () => {
    setEvents([...events, { title: "", date: "", image: "", description: "" }])
  }

  const removeEvent = (index: number) => {
    setEvents(events.filter((_, i) => i !== index))
  }

  const addUpcomingEvent = () => {
    setUpcomingEvents([...upcomingEvents, { title: "", date: "", time: "", location: "", description: "" }])
  }

  const removeUpcomingEvent = (index: number) => {
    setUpcomingEvents(upcomingEvents.filter((_, i) => i !== index))
  }

  return (
    <div className="min-h-screen bg-background">
      <div className="container py-12">
        <div className="mb-6">
          <Link
            href={`/clubs/${params.slug}`}
            className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground"
          >
            <ArrowLeft className="h-4 w-4" />
            Back to Club
          </Link>
        </div>

        <div className="mb-8">
          <h1 className="mb-2 text-4xl font-bold">Edit Club Information</h1>
          <p className="text-muted-foreground">Update your club details, history, committee, and events</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-12">
          {/* Basic Information */}
          <section className="rounded-xl border border-border bg-card p-6">
            <h2 className="mb-6 text-2xl font-bold">Basic Information</h2>
            <div className="grid gap-6 md:grid-cols-2">
              <div className="space-y-2">
                <Label htmlFor="name">Club Name</Label>
                <Input
                  id="name"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  placeholder="Computer Society of India"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="shortName">Short Name</Label>
                <Input
                  id="shortName"
                  value={formData.shortName}
                  onChange={(e) => setFormData({ ...formData, shortName: e.target.value })}
                  placeholder="CSI"
                />
              </div>
              <div className="space-y-2 md:col-span-2">
                <Label htmlFor="tagline">Tagline</Label>
                <Input
                  id="tagline"
                  value={formData.tagline}
                  onChange={(e) => setFormData({ ...formData, tagline: e.target.value })}
                  placeholder="Empowering Innovation Through Technology"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="logo">Logo URL</Label>
                <Input
                  id="logo"
                  value={formData.logo}
                  onChange={(e) => setFormData({ ...formData, logo: e.target.value })}
                  placeholder="https://example.com/logo.png"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="founded">Founded Year</Label>
                <Input
                  id="founded"
                  value={formData.founded}
                  onChange={(e) => setFormData({ ...formData, founded: e.target.value })}
                  placeholder="2015"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  type="email"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  placeholder="club@kkwieer.edu.in"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="linkedin">LinkedIn URL</Label>
                <Input
                  id="linkedin"
                  value={formData.linkedin}
                  onChange={(e) => setFormData({ ...formData, linkedin: e.target.value })}
                  placeholder="https://linkedin.com/company/..."
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="instagram">Instagram URL</Label>
                <Input
                  id="instagram"
                  value={formData.instagram}
                  onChange={(e) => setFormData({ ...formData, instagram: e.target.value })}
                  placeholder="https://instagram.com/..."
                />
              </div>
              <div className="space-y-2 md:col-span-2">
                <Label htmlFor="description">Description</Label>
                <Textarea
                  id="description"
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  placeholder="Detailed description of your club..."
                  rows={4}
                />
              </div>
              <div className="space-y-2 md:col-span-2">
                <Label htmlFor="mission">Mission</Label>
                <Textarea
                  id="mission"
                  value={formData.mission}
                  onChange={(e) => setFormData({ ...formData, mission: e.target.value })}
                  placeholder="Your club's mission statement..."
                  rows={3}
                />
              </div>
              <div className="space-y-2 md:col-span-2">
                <Label htmlFor="vision">Vision</Label>
                <Textarea
                  id="vision"
                  value={formData.vision}
                  onChange={(e) => setFormData({ ...formData, vision: e.target.value })}
                  placeholder="Your club's vision statement..."
                  rows={3}
                />
              </div>
            </div>
          </section>

          {/* History Timeline */}
          <section className="rounded-xl border border-border bg-card p-6">
            <div className="mb-6 flex items-center justify-between">
              <h2 className="text-2xl font-bold">History Timeline</h2>
              <Button type="button" variant="outline" size="sm" onClick={addHistoryItem}>
                <Plus className="mr-2 h-4 w-4" />
                Add Event
              </Button>
            </div>
            <div className="space-y-6">
              {history.map((item, index) => (
                <div key={index} className="relative rounded-lg border border-border p-4">
                  <Button
                    type="button"
                    variant="ghost"
                    size="sm"
                    className="absolute right-2 top-2"
                    onClick={() => removeHistoryItem(index)}
                  >
                    <X className="h-4 w-4" />
                  </Button>
                  <div className="grid gap-4 pr-8 md:grid-cols-3">
                    <div className="space-y-2">
                      <Label>Year</Label>
                      <Input
                        value={item.year}
                        onChange={(e) => {
                          const newHistory = [...history]
                          newHistory[index].year = e.target.value
                          setHistory(newHistory)
                        }}
                        placeholder="2015"
                      />
                    </div>
                    <div className="space-y-2 md:col-span-2">
                      <Label>Event Title</Label>
                      <Input
                        value={item.event}
                        onChange={(e) => {
                          const newHistory = [...history]
                          newHistory[index].event = e.target.value
                          setHistory(newHistory)
                        }}
                        placeholder="Club Founded"
                      />
                    </div>
                    <div className="space-y-2 md:col-span-3">
                      <Label>Description</Label>
                      <Textarea
                        value={item.description}
                        onChange={(e) => {
                          const newHistory = [...history]
                          newHistory[index].description = e.target.value
                          setHistory(newHistory)
                        }}
                        placeholder="Brief description of the event..."
                        rows={2}
                      />
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* Committee Members */}
          <section className="rounded-xl border border-border bg-card p-6">
            <div className="mb-6 flex items-center justify-between">
              <h2 className="text-2xl font-bold">Committee Members</h2>
              <Button type="button" variant="outline" size="sm" onClick={addCommitteeMember}>
                <Plus className="mr-2 h-4 w-4" />
                Add Member
              </Button>
            </div>
            <div className="grid gap-6 md:grid-cols-2">
              {committee.map((member, index) => (
                <div key={index} className="relative rounded-lg border border-border p-4">
                  <Button
                    type="button"
                    variant="ghost"
                    size="sm"
                    className="absolute right-2 top-2"
                    onClick={() => removeCommitteeMember(index)}
                  >
                    <X className="h-4 w-4" />
                  </Button>
                  <div className="space-y-4 pr-8">
                    <div className="space-y-2">
                      <Label>Name</Label>
                      <Input
                        value={member.name}
                        onChange={(e) => {
                          const newCommittee = [...committee]
                          newCommittee[index].name = e.target.value
                          setCommittee(newCommittee)
                        }}
                        placeholder="John Doe"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label>Role</Label>
                      <Input
                        value={member.role}
                        onChange={(e) => {
                          const newCommittee = [...committee]
                          newCommittee[index].role = e.target.value
                          setCommittee(newCommittee)
                        }}
                        placeholder="President"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label>Image URL</Label>
                      <Input
                        value={member.image}
                        onChange={(e) => {
                          const newCommittee = [...committee]
                          newCommittee[index].image = e.target.value
                          setCommittee(newCommittee)
                        }}
                        placeholder="https://example.com/photo.jpg"
                      />
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* Past Events */}
          <section className="rounded-xl border border-border bg-card p-6">
            <div className="mb-6 flex items-center justify-between">
              <h2 className="text-2xl font-bold">Past Events</h2>
              <Button type="button" variant="outline" size="sm" onClick={addEvent}>
                <Plus className="mr-2 h-4 w-4" />
                Add Event
              </Button>
            </div>
            <div className="space-y-6">
              {events.map((event, index) => (
                <div key={index} className="relative rounded-lg border border-border p-4">
                  <Button
                    type="button"
                    variant="ghost"
                    size="sm"
                    className="absolute right-2 top-2"
                    onClick={() => removeEvent(index)}
                  >
                    <X className="h-4 w-4" />
                  </Button>
                  <div className="grid gap-4 pr-8 md:grid-cols-2">
                    <div className="space-y-2">
                      <Label>Event Title</Label>
                      <Input
                        value={event.title}
                        onChange={(e) => {
                          const newEvents = [...events]
                          newEvents[index].title = e.target.value
                          setEvents(newEvents)
                        }}
                        placeholder="TechFest 2024"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label>Date</Label>
                      <Input
                        value={event.date}
                        onChange={(e) => {
                          const newEvents = [...events]
                          newEvents[index].date = e.target.value
                          setEvents(newEvents)
                        }}
                        placeholder="March 15, 2024"
                      />
                    </div>
                    <div className="space-y-2 md:col-span-2">
                      <Label>Image URL</Label>
                      <Input
                        value={event.image}
                        onChange={(e) => {
                          const newEvents = [...events]
                          newEvents[index].image = e.target.value
                          setEvents(newEvents)
                        }}
                        placeholder="https://example.com/event.jpg"
                      />
                    </div>
                    <div className="space-y-2 md:col-span-2">
                      <Label>Description</Label>
                      <Textarea
                        value={event.description}
                        onChange={(e) => {
                          const newEvents = [...events]
                          newEvents[index].description = e.target.value
                          setEvents(newEvents)
                        }}
                        placeholder="Event description..."
                        rows={2}
                      />
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* Upcoming Events */}
          <section className="rounded-xl border border-border bg-card p-6">
            <div className="mb-6 flex items-center justify-between">
              <h2 className="text-2xl font-bold">Upcoming Events</h2>
              <Button type="button" variant="outline" size="sm" onClick={addUpcomingEvent}>
                <Plus className="mr-2 h-4 w-4" />
                Add Event
              </Button>
            </div>
            <div className="space-y-6">
              {upcomingEvents.map((event, index) => (
                <div key={index} className="relative rounded-lg border border-border p-4">
                  <Button
                    type="button"
                    variant="ghost"
                    size="sm"
                    className="absolute right-2 top-2"
                    onClick={() => removeUpcomingEvent(index)}
                  >
                    <X className="h-4 w-4" />
                  </Button>
                  <div className="grid gap-4 pr-8 md:grid-cols-2">
                    <div className="space-y-2 md:col-span-2">
                      <Label>Event Title</Label>
                      <Input
                        value={event.title}
                        onChange={(e) => {
                          const newEvents = [...upcomingEvents]
                          newEvents[index].title = e.target.value
                          setUpcomingEvents(newEvents)
                        }}
                        placeholder="Web Development Bootcamp"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label>Date</Label>
                      <Input
                        value={event.date}
                        onChange={(e) => {
                          const newEvents = [...upcomingEvents]
                          newEvents[index].date = e.target.value
                          setUpcomingEvents(newEvents)
                        }}
                        placeholder="April 20, 2025"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label>Time</Label>
                      <Input
                        value={event.time}
                        onChange={(e) => {
                          const newEvents = [...upcomingEvents]
                          newEvents[index].time = e.target.value
                          setUpcomingEvents(newEvents)
                        }}
                        placeholder="10:00 AM - 5:00 PM"
                      />
                    </div>
                    <div className="space-y-2 md:col-span-2">
                      <Label>Location</Label>
                      <Input
                        value={event.location}
                        onChange={(e) => {
                          const newEvents = [...upcomingEvents]
                          newEvents[index].location = e.target.value
                          setUpcomingEvents(newEvents)
                        }}
                        placeholder="Seminar Hall A"
                      />
                    </div>
                    <div className="space-y-2 md:col-span-2">
                      <Label>Description</Label>
                      <Textarea
                        value={event.description}
                        onChange={(e) => {
                          const newEvents = [...upcomingEvents]
                          newEvents[index].description = e.target.value
                          setUpcomingEvents(newEvents)
                        }}
                        placeholder="Event description..."
                        rows={2}
                      />
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* Submit Button */}
          <div className="flex items-center justify-end gap-4">
            <Button type="button" variant="outline" asChild>
              <Link href={`/clubs/${params.slug}`}>Cancel</Link>
            </Button>
            <Button type="submit" disabled={isSaving}>
              <Save className="mr-2 h-4 w-4" />
              {isSaving ? "Saving..." : "Save Changes"}
            </Button>
          </div>
        </form>
      </div>
    </div>
  )
}
