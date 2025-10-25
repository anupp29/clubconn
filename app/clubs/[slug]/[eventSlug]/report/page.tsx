"use client"

import type React from "react"
import { useState } from "react"
import { useRouter } from "next/navigation"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { ArrowLeft, X, Upload, CheckCircle } from "lucide-react"
import { getEventReport } from "@/lib/mongodb-reports"
import { EventReportDisplay } from "@/components/event-report-display"

export default async function EventReportPage({
  params,
}: {
  params: { slug: string; eventSlug: string }
}) {
  const router = useRouter()
  const [submitted, setSubmitted] = useState(false)
  const [photos, setPhotos] = useState<string[]>([])
  const [certificates, setCertificates] = useState<string[]>([])

  const eventId = 3 // This should be dynamically determined from eventSlug
  const report = await getEventReport(eventId)

  // If report exists, show it
  if (report && report.status === "published") {
    return (
      <div className="min-h-screen bg-background">
        <div className="container py-8 max-w-6xl">
          <div className="mb-6">
            <Link
              href={`/clubs/${params.slug}/${params.eventSlug}`}
              className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors"
            >
              <ArrowLeft className="h-4 w-4" />
              Back to Event
            </Link>
          </div>

          <div className="mb-8">
            <h1 className="text-4xl font-bold mb-2">{report.report_title}</h1>
            <p className="text-muted-foreground">Published on {new Date(report.created_at).toLocaleDateString()}</p>
          </div>

          <EventReportDisplay report={report} />
        </div>
      </div>
    )
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // Save report to database
    console.log("[v0] Event report submitted for:", params.eventSlug)
    setSubmitted(true)
    setTimeout(() => {
      router.push(`/clubs/${params.slug}/${params.eventSlug}`)
    }, 2000)
  }

  if (submitted) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <CheckCircle className="h-16 w-16 text-emerald-500 mx-auto mb-4" />
          <h1 className="text-3xl font-bold mb-2">Report Submitted Successfully!</h1>
          <p className="text-muted-foreground mb-4">Your event report has been saved and will be reviewed.</p>
          <p className="text-sm text-muted-foreground">Redirecting...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-background">
      <div className="container py-8 max-w-4xl">
        <div className="mb-6">
          <Link
            href={`/clubs/${params.slug}/${params.eventSlug}`}
            className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors"
          >
            <ArrowLeft className="h-4 w-4" />
            Back to Event
          </Link>
        </div>

        <div className="mb-8">
          <h1 className="text-4xl font-bold mb-2">Submit Event Report</h1>
          <p className="text-muted-foreground">Document your event with detailed information, photos, and outcomes</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-8">
          {/* Executive Summary */}
          <div className="rounded-xl border border-border bg-card p-6">
            <h2 className="text-2xl font-bold mb-6">Executive Summary</h2>
            <div className="space-y-4">
              <div>
                <Label htmlFor="summary">Event Summary *</Label>
                <Textarea id="summary" placeholder="Provide a brief overview of the event..." rows={4} required />
              </div>

              <div className="grid gap-4 md:grid-cols-3">
                <div>
                  <Label htmlFor="rsvp-count">RSVP Count</Label>
                  <Input id="rsvp-count" type="number" placeholder="100" />
                </div>
                <div>
                  <Label htmlFor="attendees">Actual Attendees *</Label>
                  <Input id="attendees" type="number" placeholder="85" required />
                </div>
                <div>
                  <Label htmlFor="certificates-issued">Certificates Issued</Label>
                  <Input id="certificates-issued" type="number" placeholder="80" />
                </div>
              </div>
            </div>
          </div>

          {/* Detailed Report */}
          <div className="rounded-xl border border-border bg-card p-6">
            <h2 className="text-2xl font-bold mb-6">Detailed Report</h2>
            <div className="space-y-4">
              <div>
                <Label htmlFor="objectives-met">Objectives Achievement *</Label>
                <Textarea
                  id="objectives-met"
                  placeholder="Describe how the event objectives were met..."
                  rows={4}
                  required
                />
              </div>

              <div>
                <Label htmlFor="highlights">Event Highlights *</Label>
                <Textarea
                  id="highlights"
                  placeholder="Key moments and highlights from the event..."
                  rows={4}
                  required
                />
              </div>

              <div>
                <Label htmlFor="learnings">Key Learnings & Takeaways *</Label>
                <Textarea id="learnings" placeholder="What did participants learn from this event?" rows={4} required />
              </div>

              <div>
                <Label htmlFor="challenges">Challenges Faced</Label>
                <Textarea id="challenges" placeholder="Any challenges encountered during the event..." rows={3} />
              </div>

              <div>
                <Label htmlFor="improvements">Suggestions for Improvement</Label>
                <Textarea id="improvements" placeholder="How can future events be improved?" rows={3} />
              </div>
            </div>
          </div>

          {/* Minute-by-Minute Timeline */}
          <div className="rounded-xl border border-border bg-card p-6">
            <h2 className="text-2xl font-bold mb-6">Event Timeline</h2>
            <div className="space-y-4">
              <div>
                <Label htmlFor="timeline">Minute-by-Minute Account *</Label>
                <Textarea id="timeline" placeholder="Provide a detailed timeline of the event..." rows={6} required />
                <p className="text-xs text-muted-foreground mt-1">
                  Example: 10:00 AM - Registration started, 10:30 AM - Opening ceremony, etc.
                </p>
              </div>
            </div>
          </div>

          {/* Speaker Feedback */}
          <div className="rounded-xl border border-border bg-card p-6">
            <h2 className="text-2xl font-bold mb-6">Speaker & Guest Information</h2>
            <div className="space-y-4">
              <div>
                <Label htmlFor="speaker-performance">Speaker Performance & Feedback</Label>
                <Textarea
                  id="speaker-performance"
                  placeholder="How did the speakers perform? Any feedback from attendees?"
                  rows={4}
                />
              </div>

              <div>
                <Label htmlFor="speaker-topics">Topics Covered</Label>
                <Textarea id="speaker-topics" placeholder="List the main topics and sessions covered..." rows={3} />
              </div>
            </div>
          </div>

          {/* Team Performance */}
          <div className="rounded-xl border border-border bg-card p-6">
            <h2 className="text-2xl font-bold mb-6">Team & Volunteer Performance</h2>
            <div className="space-y-4">
              <div>
                <Label htmlFor="team-roles">Team Roles & Responsibilities</Label>
                <Textarea
                  id="team-roles"
                  placeholder="List team members and their roles during the event..."
                  rows={4}
                />
              </div>

              <div>
                <Label htmlFor="volunteer-count">Number of Volunteers</Label>
                <Input id="volunteer-count" type="number" placeholder="10" />
              </div>

              <div>
                <Label htmlFor="team-feedback">Team Performance Feedback</Label>
                <Textarea
                  id="team-feedback"
                  placeholder="How did the team perform? Any standout contributions?"
                  rows={3}
                />
              </div>
            </div>
          </div>

          {/* Event Photos */}
          <div className="rounded-xl border border-border bg-card p-6">
            <h2 className="text-2xl font-bold mb-6">Event Photos</h2>
            <div className="space-y-4">
              <div>
                <Label>Upload Event Photos *</Label>
                <div className="mt-2">
                  <Button type="button" variant="outline" size="sm">
                    <Upload className="mr-2 h-4 w-4" />
                    Upload Photos
                  </Button>
                  <p className="text-xs text-muted-foreground mt-2">
                    Upload high-quality photos from the event (max 20 photos)
                  </p>
                </div>
              </div>

              {photos.length > 0 && (
                <div className="grid grid-cols-3 gap-4">
                  {photos.map((photo, index) => (
                    <div key={index} className="relative aspect-video rounded-lg bg-muted">
                      <Button
                        type="button"
                        variant="ghost"
                        size="sm"
                        className="absolute top-1 right-1"
                        onClick={() => setPhotos(photos.filter((_, i) => i !== index))}
                      >
                        <X className="h-4 w-4" />
                      </Button>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>

          {/* Certificates */}
          <div className="rounded-xl border border-border bg-card p-6">
            <h2 className="text-2xl font-bold mb-6">Certificates</h2>
            <div className="space-y-4">
              <div>
                <Label>Upload Certificate Template/Samples</Label>
                <div className="mt-2">
                  <Button type="button" variant="outline" size="sm">
                    <Upload className="mr-2 h-4 w-4" />
                    Upload Certificates
                  </Button>
                  <p className="text-xs text-muted-foreground mt-2">
                    Upload certificate template or sample certificates issued
                  </p>
                </div>
              </div>

              {certificates.length > 0 && (
                <div className="grid grid-cols-3 gap-4">
                  {certificates.map((certificate, index) => (
                    <div key={index} className="relative aspect-video rounded-lg bg-muted">
                      <Button
                        type="button"
                        variant="ghost"
                        size="sm"
                        className="absolute top-1 right-1"
                        onClick={() => setCertificates(certificates.filter((_, i) => i !== index))}
                      >
                        <X className="h-4 w-4" />
                      </Button>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>

          {/* Financial Summary */}
          <div className="rounded-xl border border-border bg-card p-6">
            <h2 className="text-2xl font-bold mb-6">Financial Summary</h2>
            <div className="space-y-4">
              <div className="grid gap-4 md:grid-cols-2">
                <div>
                  <Label htmlFor="budget">Total Budget</Label>
                  <Input id="budget" type="number" placeholder="50000" />
                </div>
                <div>
                  <Label htmlFor="expenses">Actual Expenses</Label>
                  <Input id="expenses" type="number" placeholder="45000" />
                </div>
              </div>

              <div>
                <Label htmlFor="expense-breakdown">Expense Breakdown</Label>
                <Textarea id="expense-breakdown" placeholder="Provide a breakdown of expenses..." rows={4} />
              </div>
            </div>
          </div>

          {/* Participant Feedback */}
          <div className="rounded-xl border border-border bg-card p-6">
            <h2 className="text-2xl font-bold mb-6">Participant Feedback</h2>
            <div className="space-y-4">
              <div>
                <Label htmlFor="feedback-summary">Feedback Summary</Label>
                <Textarea
                  id="feedback-summary"
                  placeholder="Summarize the feedback received from participants..."
                  rows={4}
                />
              </div>

              <div className="grid gap-4 md:grid-cols-2">
                <div>
                  <Label htmlFor="satisfaction">Overall Satisfaction Rating</Label>
                  <select
                    id="satisfaction"
                    className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm"
                  >
                    <option value="">Select rating</option>
                    <option value="5">Excellent (5/5)</option>
                    <option value="4">Very Good (4/5)</option>
                    <option value="3">Good (3/5)</option>
                    <option value="2">Fair (2/5)</option>
                    <option value="1">Poor (1/5)</option>
                  </select>
                </div>
                <div>
                  <Label htmlFor="recommendation">Would Recommend (%)</Label>
                  <Input id="recommendation" type="number" min="0" max="100" placeholder="95" />
                </div>
              </div>
            </div>
          </div>

          {/* Submit Buttons */}
          <div className="flex gap-4">
            <Button type="submit" size="lg" className="flex-1">
              Submit Report
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
