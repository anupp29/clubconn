"use client"

import type React from "react"

import { useState } from "react"
import { useRouter } from "next/navigation"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { ArrowLeft, Plus, X, Upload } from "lucide-react"

export default function NewEventPage({ params }: { params: { slug: string } }) {
  const router = useRouter()
  const [eventSlug, setEventSlug] = useState("")
  const [speakers, setSpeakers] = useState([{ name: "", bio: "", photo: "" }])
  const [agenda, setAgenda] = useState([{ time: "", activity: "", speaker: "" }])
  const [rsvpFields, setRsvpFields] = useState([
    { label: "Full Name", type: "text", required: true },
    { label: "Email", type: "email", required: true },
    { label: "Phone", type: "tel", required: true },
  ])

  const addSpeaker = () => {
    setSpeakers([...speakers, { name: "", bio: "", photo: "" }])
  }

  const removeSpeaker = (index: number) => {
    setSpeakers(speakers.filter((_, i) => i !== index))
  }

  const addAgendaItem = () => {
    setAgenda([...agenda, { time: "", activity: "", speaker: "" }])
  }

  const removeAgendaItem = (index: number) => {
    setAgenda(agenda.filter((_, i) => i !== index))
  }

  const addRsvpField = () => {
    setRsvpFields([...rsvpFields, { label: "", type: "text", required: false }])
  }

  const removeRsvpField = (index: number) => {
    setRsvpFields(rsvpFields.filter((_, i) => i !== index))
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // Save to database
    console.log("[v0] Event created with slug:", eventSlug)
    router.push(`/clubs/${params.slug}/${eventSlug}`)
  }

  return (
    <div className="min-h-screen bg-background">
      <div className="container py-8 max-w-4xl">
        <div className="mb-6">
          <Link
            href={`/clubs/${params.slug}`}
            className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors"
          >
            <ArrowLeft className="h-4 w-4" />
            Back to Club
          </Link>
        </div>

        <div className="mb-8">
          <h1 className="text-4xl font-bold mb-2">Create New Event</h1>
          <p className="text-muted-foreground">Fill in the details to create and publish your event</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-8">
          {/* Basic Information */}
          <div className="rounded-xl border border-border bg-card p-6">
            <h2 className="text-2xl font-bold mb-6">Basic Information</h2>
            <div className="space-y-4">
              <div>
                <Label htmlFor="title">Event Title *</Label>
                <Input id="title" placeholder="e.g., Campus to Corporate Workshop" required />
              </div>

              <div>
                <Label htmlFor="slug">Event URL Slug *</Label>
                <div className="flex items-center gap-2">
                  <span className="text-sm text-muted-foreground">/clubs/{params.slug}/</span>
                  <Input
                    id="slug"
                    placeholder="c2c"
                    value={eventSlug}
                    onChange={(e) => setEventSlug(e.target.value.toLowerCase().replace(/\s+/g, "-"))}
                    required
                  />
                </div>
                <p className="text-xs text-muted-foreground mt-1">
                  This will be your event URL: /clubs/{params.slug}/{eventSlug || "event-slug"}
                </p>
              </div>

              <div className="grid gap-4 md:grid-cols-2">
                <div>
                  <Label htmlFor="date">Event Date *</Label>
                  <Input id="date" type="date" required />
                </div>
                <div>
                  <Label htmlFor="time">Event Time *</Label>
                  <Input id="time" type="time" required />
                </div>
              </div>

              <div>
                <Label htmlFor="location">Location *</Label>
                <Input id="location" placeholder="Seminar Hall A" required />
              </div>

              <div>
                <Label htmlFor="description">Event Description *</Label>
                <Textarea id="description" placeholder="Describe your event in detail..." rows={4} required />
              </div>

              <div>
                <Label htmlFor="banner">Event Banner Image</Label>
                <div className="mt-2 flex items-center gap-4">
                  <Button type="button" variant="outline" size="sm">
                    <Upload className="mr-2 h-4 w-4" />
                    Upload Image
                  </Button>
                  <span className="text-sm text-muted-foreground">Recommended: 1200x630px</span>
                </div>
              </div>
            </div>
          </div>

          {/* Objectives */}
          <div className="rounded-xl border border-border bg-card p-6">
            <h2 className="text-2xl font-bold mb-6">Objectives & Goals</h2>
            <div className="space-y-4">
              <div>
                <Label htmlFor="objectives">Event Objectives *</Label>
                <Textarea id="objectives" placeholder="What are the main objectives of this event?" rows={4} required />
              </div>

              <div>
                <Label htmlFor="learnings">Key Learnings</Label>
                <Textarea id="learnings" placeholder="What will participants learn from this event?" rows={4} />
              </div>

              <div>
                <Label htmlFor="target-audience">Target Audience</Label>
                <Input id="target-audience" placeholder="e.g., Final year students, All branches" />
              </div>
            </div>
          </div>

          {/* Speakers */}
          <div className="rounded-xl border border-border bg-card p-6">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-bold">Speakers & Guests</h2>
              <Button type="button" variant="outline" size="sm" onClick={addSpeaker}>
                <Plus className="mr-2 h-4 w-4" />
                Add Speaker
              </Button>
            </div>
            <div className="space-y-6">
              {speakers.map((speaker, index) => (
                <div key={index} className="relative rounded-lg border border-border p-4">
                  {speakers.length > 1 && (
                    <Button
                      type="button"
                      variant="ghost"
                      size="sm"
                      className="absolute top-2 right-2"
                      onClick={() => removeSpeaker(index)}
                    >
                      <X className="h-4 w-4" />
                    </Button>
                  )}
                  <div className="space-y-4">
                    <div>
                      <Label>Speaker Name</Label>
                      <Input placeholder="Dr. John Doe" />
                    </div>
                    <div>
                      <Label>Designation & Organization</Label>
                      <Input placeholder="Senior Engineer, Google" />
                    </div>
                    <div>
                      <Label>Bio</Label>
                      <Textarea placeholder="Brief bio of the speaker..." rows={3} />
                    </div>
                    <div>
                      <Label>Photo</Label>
                      <Button type="button" variant="outline" size="sm">
                        <Upload className="mr-2 h-4 w-4" />
                        Upload Photo
                      </Button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Agenda */}
          <div className="rounded-xl border border-border bg-card p-6">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-bold">Event Agenda</h2>
              <Button type="button" variant="outline" size="sm" onClick={addAgendaItem}>
                <Plus className="mr-2 h-4 w-4" />
                Add Item
              </Button>
            </div>
            <div className="space-y-4">
              {agenda.map((item, index) => (
                <div key={index} className="relative rounded-lg border border-border p-4">
                  {agenda.length > 1 && (
                    <Button
                      type="button"
                      variant="ghost"
                      size="sm"
                      className="absolute top-2 right-2"
                      onClick={() => removeAgendaItem(index)}
                    >
                      <X className="h-4 w-4" />
                    </Button>
                  )}
                  <div className="grid gap-4 md:grid-cols-3">
                    <div>
                      <Label>Time</Label>
                      <Input type="time" placeholder="10:00 AM" />
                    </div>
                    <div className="md:col-span-2">
                      <Label>Activity</Label>
                      <Input placeholder="Opening Ceremony" />
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* RSVP Form Configuration */}
          <div className="rounded-xl border border-border bg-card p-6">
            <div className="flex items-center justify-between mb-6">
              <div>
                <h2 className="text-2xl font-bold">RSVP Form Configuration</h2>
                <p className="text-sm text-muted-foreground mt-1">Customize the fields for your RSVP form</p>
              </div>
              <Button type="button" variant="outline" size="sm" onClick={addRsvpField}>
                <Plus className="mr-2 h-4 w-4" />
                Add Field
              </Button>
            </div>
            <div className="space-y-4">
              {rsvpFields.map((field, index) => (
                <div key={index} className="relative rounded-lg border border-border p-4">
                  {index >= 3 && (
                    <Button
                      type="button"
                      variant="ghost"
                      size="sm"
                      className="absolute top-2 right-2"
                      onClick={() => removeRsvpField(index)}
                    >
                      <X className="h-4 w-4" />
                    </Button>
                  )}
                  <div className="grid gap-4 md:grid-cols-3">
                    <div>
                      <Label>Field Label</Label>
                      <Input placeholder="Field name" value={field.label} disabled={index < 3} />
                    </div>
                    <div>
                      <Label>Field Type</Label>
                      <select
                        className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm"
                        disabled={index < 3}
                      >
                        <option value="text">Text</option>
                        <option value="email">Email</option>
                        <option value="tel">Phone</option>
                        <option value="number">Number</option>
                        <option value="textarea">Long Text</option>
                        <option value="select">Dropdown</option>
                      </select>
                    </div>
                    <div className="flex items-end">
                      <label className="flex items-center gap-2">
                        <input type="checkbox" checked={field.required} disabled={index < 3} />
                        <span className="text-sm">Required</span>
                      </label>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Team Roles */}
          <div className="rounded-xl border border-border bg-card p-6">
            <h2 className="text-2xl font-bold mb-6">Team & Roles</h2>
            <div className="space-y-4">
              <div>
                <Label htmlFor="organizers">Organizing Team</Label>
                <Textarea id="organizers" placeholder="List the team members and their roles..." rows={4} />
              </div>
              <div>
                <Label htmlFor="volunteers">Volunteers Needed</Label>
                <Input id="volunteers" type="number" placeholder="10" />
              </div>
            </div>
          </div>

          {/* Expected Attendance */}
          <div className="rounded-xl border border-border bg-card p-6">
            <h2 className="text-2xl font-bold mb-6">Attendance & Capacity</h2>
            <div className="grid gap-4 md:grid-cols-2">
              <div>
                <Label htmlFor="capacity">Maximum Capacity</Label>
                <Input id="capacity" type="number" placeholder="100" />
              </div>
              <div>
                <Label htmlFor="expected">Expected Attendance</Label>
                <Input id="expected" type="number" placeholder="80" />
              </div>
            </div>
          </div>

          {/* Submit Buttons */}
          <div className="flex gap-4">
            <Button type="submit" size="lg" className="flex-1">
              Publish Event
            </Button>
            <Button type="button" variant="outline" size="lg" onClick={() => router.back()}>
              Cancel
            </Button>
          </div>
        </form>
      </div>
    </div>
  )
}
