"use client"

import type React from "react"
import { useState } from "react"
import { useRouter } from "next/navigation"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { ArrowLeft, CheckCircle, Megaphone, Plus, X } from "lucide-react"

export default function ProposalsPage({ params }: { params: { slug: string; eventSlug: string } }) {
  const router = useRouter()
  const [submitted, setSubmitted] = useState(false)
  const [coSpeakers, setCoSpeakers] = useState<string[]>([])

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    console.log("[v0] Proposal submitted for event:", params.eventSlug)
    setSubmitted(true)
    setTimeout(() => {
      router.push(`/clubs/${params.slug}/${params.eventSlug}`)
    }, 2000)
  }

  if (submitted) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <CheckCircle className="h-16 w-16 text-purple-500 mx-auto mb-4" />
          <h1 className="text-3xl font-bold mb-2">Proposal Submitted!</h1>
          <p className="text-muted-foreground mb-4">We'll review your proposal and get back to you soon.</p>
          <p className="text-sm text-muted-foreground">Redirecting...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <section className="relative overflow-hidden border-b border-border bg-gradient-to-br from-purple-500/5 via-background to-background">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,rgba(168,85,247,0.1),transparent_50%)]" />
        <div className="container relative py-12">
          <div className="mb-6">
            <Link
              href={`/clubs/${params.slug}/${params.eventSlug}`}
              className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors"
            >
              <ArrowLeft className="h-4 w-4" />
              Back to Event
            </Link>
          </div>
          <div className="flex items-center gap-3 mb-4">
            <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-purple-500/10 border border-purple-500/20">
              <Megaphone className="h-6 w-6 text-purple-600" />
            </div>
            <div>
              <h1 className="text-4xl font-bold">Call for Proposals</h1>
              <p className="text-muted-foreground">Submit your talk/workshop proposal</p>
            </div>
          </div>
        </div>
      </section>

      <div className="container py-8 max-w-3xl">
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Speaker Information */}
          <div className="rounded-xl border border-purple-500/20 bg-card p-6">
            <h2 className="text-xl font-bold mb-6 text-purple-600">Speaker Information</h2>
            <div className="space-y-4">
              <div className="grid gap-4 md:grid-cols-2">
                <div>
                  <Label htmlFor="speaker-name">Full Name *</Label>
                  <Input id="speaker-name" placeholder="John Doe" required />
                </div>
                <div>
                  <Label htmlFor="speaker-email">Email Address *</Label>
                  <Input id="speaker-email" type="email" placeholder="john@example.com" required />
                </div>
              </div>

              <div className="grid gap-4 md:grid-cols-2">
                <div>
                  <Label htmlFor="speaker-phone">Phone Number *</Label>
                  <Input id="speaker-phone" type="tel" placeholder="+91 98765 43210" required />
                </div>
                <div>
                  <Label htmlFor="speaker-org">Organization/Company</Label>
                  <Input id="speaker-org" placeholder="Tech Corp" />
                </div>
              </div>

              <div>
                <Label htmlFor="speaker-designation">Designation/Title</Label>
                <Input id="speaker-designation" placeholder="Senior Software Engineer" />
              </div>

              <div>
                <Label htmlFor="speaker-bio">Speaker Bio (max 200 words) *</Label>
                <Textarea
                  id="speaker-bio"
                  placeholder="Brief professional background and expertise..."
                  rows={4}
                  required
                />
              </div>

              <div>
                <Label htmlFor="speaker-linkedin">LinkedIn Profile</Label>
                <Input id="speaker-linkedin" type="url" placeholder="https://linkedin.com/in/..." />
              </div>

              <div>
                <Label htmlFor="speaker-photo">Profile Photo URL</Label>
                <Input id="speaker-photo" type="url" placeholder="https://..." />
              </div>
            </div>
          </div>

          {/* Co-Speakers */}
          <div className="rounded-xl border border-purple-500/20 bg-card p-6">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-xl font-bold text-purple-600">Co-Speakers (Optional)</h2>
              <Button
                type="button"
                size="sm"
                variant="outline"
                onClick={() => setCoSpeakers([...coSpeakers, ""])}
                className="border-purple-500/50"
              >
                <Plus className="h-4 w-4 mr-2" />
                Add Co-Speaker
              </Button>
            </div>
            {coSpeakers.map((_, index) => (
              <div key={index} className="mb-4 p-4 rounded-lg border border-border bg-background/50">
                <div className="flex items-center justify-between mb-3">
                  <h3 className="font-semibold">Co-Speaker {index + 1}</h3>
                  <Button
                    type="button"
                    size="sm"
                    variant="ghost"
                    onClick={() => setCoSpeakers(coSpeakers.filter((_, i) => i !== index))}
                  >
                    <X className="h-4 w-4" />
                  </Button>
                </div>
                <div className="grid gap-3 md:grid-cols-2">
                  <Input placeholder="Name" />
                  <Input placeholder="Email" type="email" />
                </div>
              </div>
            ))}
          </div>

          {/* Proposal Details */}
          <div className="rounded-xl border border-purple-500/20 bg-card p-6">
            <h2 className="text-xl font-bold mb-6 text-purple-600">Proposal Details</h2>
            <div className="space-y-4">
              <div>
                <Label htmlFor="proposal-title">Talk/Workshop Title *</Label>
                <Input id="proposal-title" placeholder="Introduction to Machine Learning" required />
              </div>

              <div>
                <Label htmlFor="proposal-type">Session Type *</Label>
                <select
                  id="proposal-type"
                  required
                  className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm"
                >
                  <option value="">Select type</option>
                  <option value="talk">Talk/Presentation</option>
                  <option value="workshop">Hands-on Workshop</option>
                  <option value="panel">Panel Discussion</option>
                  <option value="demo">Live Demo</option>
                </select>
              </div>

              <div>
                <Label htmlFor="proposal-duration">Preferred Duration *</Label>
                <select
                  id="proposal-duration"
                  required
                  className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm"
                >
                  <option value="">Select duration</option>
                  <option value="30">30 minutes</option>
                  <option value="45">45 minutes</option>
                  <option value="60">1 hour</option>
                  <option value="90">1.5 hours</option>
                  <option value="120">2 hours</option>
                </select>
              </div>

              <div>
                <Label htmlFor="proposal-level">Difficulty Level *</Label>
                <select
                  id="proposal-level"
                  required
                  className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm"
                >
                  <option value="">Select level</option>
                  <option value="beginner">Beginner</option>
                  <option value="intermediate">Intermediate</option>
                  <option value="advanced">Advanced</option>
                  <option value="all">All Levels</option>
                </select>
              </div>

              <div>
                <Label htmlFor="proposal-abstract">Abstract/Summary (max 300 words) *</Label>
                <Textarea
                  id="proposal-abstract"
                  placeholder="Provide a brief overview of your talk/workshop..."
                  rows={5}
                  required
                />
              </div>

              <div>
                <Label htmlFor="proposal-outline">Detailed Outline *</Label>
                <Textarea
                  id="proposal-outline"
                  placeholder="Key topics and structure of your session..."
                  rows={6}
                  required
                />
              </div>

              <div>
                <Label htmlFor="proposal-audience">Target Audience *</Label>
                <Textarea
                  id="proposal-audience"
                  placeholder="Who will benefit most from this session?"
                  rows={3}
                  required
                />
              </div>

              <div>
                <Label htmlFor="proposal-takeaways">Key Takeaways *</Label>
                <Textarea
                  id="proposal-takeaways"
                  placeholder="What will attendees learn? (3-5 points)"
                  rows={4}
                  required
                />
              </div>

              <div>
                <Label htmlFor="proposal-prerequisites">Prerequisites (if any)</Label>
                <Textarea id="proposal-prerequisites" placeholder="Required knowledge or tools..." rows={3} />
              </div>
            </div>
          </div>

          {/* Technical Requirements */}
          <div className="rounded-xl border border-purple-500/20 bg-card p-6">
            <h2 className="text-xl font-bold mb-6 text-purple-600">Technical Requirements</h2>
            <div className="space-y-4">
              <div>
                <Label>Equipment Needed</Label>
                <div className="space-y-2 mt-2">
                  {["Projector", "Microphone", "Whiteboard", "Internet Connection", "Laptop"].map((item) => (
                    <label key={item} className="flex items-center gap-2">
                      <input type="checkbox" className="rounded" />
                      <span className="text-sm">{item}</span>
                    </label>
                  ))}
                </div>
              </div>

              <div>
                <Label htmlFor="proposal-special">Special Requirements</Label>
                <Textarea id="proposal-special" placeholder="Any other technical or logistical needs..." rows={3} />
              </div>
            </div>
          </div>

          {/* Additional Information */}
          <div className="rounded-xl border border-purple-500/20 bg-card p-6">
            <h2 className="text-xl font-bold mb-6 text-purple-600">Additional Information</h2>
            <div className="space-y-4">
              <div>
                <Label htmlFor="proposal-previous">Previous Speaking Experience</Label>
                <Textarea
                  id="proposal-previous"
                  placeholder="List any previous talks or workshops you've conducted..."
                  rows={3}
                />
              </div>

              <div>
                <Label htmlFor="proposal-references">References/Links</Label>
                <Textarea
                  id="proposal-references"
                  placeholder="Links to previous talks, slides, videos, or relevant work..."
                  rows={3}
                />
              </div>

              <div>
                <Label htmlFor="proposal-notes">Additional Notes</Label>
                <Textarea id="proposal-notes" placeholder="Anything else we should know..." rows={3} />
              </div>
            </div>
          </div>

          {/* Terms */}
          <div className="rounded-xl border border-purple-500/20 bg-card p-6">
            <h2 className="text-xl font-bold mb-4 text-purple-600">Terms & Conditions</h2>
            <div className="space-y-3 text-sm text-muted-foreground mb-4">
              <p>• Proposals will be reviewed by the organizing committee</p>
              <p>• Selected speakers will be notified via email</p>
              <p>• Speakers must be available on the event date</p>
              <p>• All materials must be original or properly attributed</p>
            </div>
            <label className="flex items-start gap-2">
              <input type="checkbox" required className="mt-1" />
              <span className="text-sm">I agree to the terms and conditions and confirm my availability *</span>
            </label>
          </div>

          <div className="flex gap-4">
            <Button type="submit" size="lg" className="flex-1 bg-purple-600 hover:bg-purple-700">
              Submit Proposal
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
