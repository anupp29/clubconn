"use client"

import type React from "react"
import { useState } from "react"
import { useRouter } from "next/navigation"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { ArrowLeft, CheckCircle, UserCheck } from "lucide-react"

export default function RSVPPage({ params }: { params: { slug: string; eventSlug: string } }) {
  const router = useRouter()
  const [submitted, setSubmitted] = useState(false)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    console.log("[v0] RSVP submitted for event:", params.eventSlug)
    setSubmitted(true)
    setTimeout(() => {
      router.push(`/clubs/${params.slug}/${params.eventSlug}`)
    }, 2000)
  }

  if (submitted) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <CheckCircle className="h-16 w-16 text-blue-500 mx-auto mb-4" />
          <h1 className="text-3xl font-bold mb-2">Registration Successful!</h1>
          <p className="text-muted-foreground mb-4">You'll receive a confirmation email shortly.</p>
          <p className="text-sm text-muted-foreground">Redirecting...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-background">
      <section className="relative overflow-hidden border-b border-border bg-gradient-to-br from-blue-500/5 via-background to-background">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,rgba(59,130,246,0.1),transparent_50%)]" />
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
            <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-blue-500/10 border border-blue-500/20">
              <UserCheck className="h-6 w-6 text-blue-600" />
            </div>
            <div>
              <h1 className="text-4xl font-bold">Event Registration</h1>
              <p className="text-muted-foreground">Register for Campus to Corporate Workshop</p>
            </div>
          </div>
        </div>
      </section>

      <div className="container py-8 max-w-3xl">
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="rounded-xl border border-blue-500/20 bg-card p-6">
            <h2 className="text-xl font-bold mb-6 text-blue-600">Personal Information</h2>
            <div className="space-y-4">
              <div>
                <Label htmlFor="name">Full Name *</Label>
                <Input id="name" placeholder="John Doe" required />
              </div>

              <div className="grid gap-4 md:grid-cols-2">
                <div>
                  <Label htmlFor="email">Email Address *</Label>
                  <Input id="email" type="email" placeholder="john@example.com" required />
                </div>
                <div>
                  <Label htmlFor="phone">Phone Number *</Label>
                  <Input id="phone" type="tel" placeholder="+91 98765 43210" required />
                </div>
              </div>

              <div className="grid gap-4 md:grid-cols-2">
                <div>
                  <Label htmlFor="college">College/Organization *</Label>
                  <Input id="college" placeholder="KKWIEER" required />
                </div>
                <div>
                  <Label htmlFor="year">Year of Study</Label>
                  <select
                    id="year"
                    className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm"
                  >
                    <option value="">Select year</option>
                    <option value="1">First Year</option>
                    <option value="2">Second Year</option>
                    <option value="3">Third Year</option>
                    <option value="4">Final Year</option>
                    <option value="other">Other</option>
                  </select>
                </div>
              </div>

              <div>
                <Label htmlFor="branch">Branch/Department</Label>
                <Input id="branch" placeholder="Computer Engineering" />
              </div>

              <div>
                <Label htmlFor="student-id">Student/Employee ID</Label>
                <Input id="student-id" placeholder="ID Number" />
              </div>
            </div>
          </div>

          <div className="rounded-xl border border-blue-500/20 bg-card p-6">
            <h2 className="text-xl font-bold mb-6 text-blue-600">Event Preferences</h2>
            <div className="space-y-4">
              <div>
                <Label htmlFor="expectations">What do you expect from this event? *</Label>
                <Textarea id="expectations" placeholder="Share your expectations..." rows={4} required />
              </div>

              <div>
                <Label htmlFor="topics">Topics you're most interested in</Label>
                <Textarea id="topics" placeholder="Specific topics or areas..." rows={3} />
              </div>

              <div>
                <Label htmlFor="questions">Questions for speakers (optional)</Label>
                <Textarea id="questions" placeholder="Any questions you'd like to ask..." rows={3} />
              </div>

              <div>
                <Label htmlFor="dietary">Dietary Restrictions (if any)</Label>
                <Input id="dietary" placeholder="Vegetarian, Vegan, Allergies, etc." />
              </div>

              <div>
                <Label>How did you hear about this event?</Label>
                <select
                  id="source"
                  className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm"
                >
                  <option value="">Select source</option>
                  <option value="social">Social Media</option>
                  <option value="email">Email</option>
                  <option value="friend">Friend/Colleague</option>
                  <option value="website">Website</option>
                  <option value="poster">Poster/Flyer</option>
                  <option value="other">Other</option>
                </select>
              </div>
            </div>
          </div>

          <div className="rounded-xl border border-blue-500/20 bg-card p-6">
            <h2 className="text-xl font-bold mb-4 text-blue-600">Terms & Conditions</h2>
            <div className="space-y-3 text-sm text-muted-foreground mb-4">
              <p>• Registration is mandatory to attend the event</p>
              <p>• Please arrive 15 minutes before the event starts</p>
              <p>• Carry a valid ID card for verification</p>
              <p>• Certificate will be provided upon completion</p>
              <p>• Event photos may be used for promotional purposes</p>
            </div>
            <label className="flex items-start gap-2">
              <input type="checkbox" required className="mt-1" />
              <span className="text-sm">I agree to the terms and conditions and confirm my attendance *</span>
            </label>
          </div>

          <div className="flex gap-4">
            <Button type="submit" size="lg" className="flex-1 bg-blue-600 hover:bg-blue-700">
              Submit Registration
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
