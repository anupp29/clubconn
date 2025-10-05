"use client"

import type React from "react"
import { useState } from "react"
import { useRouter } from "next/navigation"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { ArrowLeft, CheckCircle, HandHeart } from "lucide-react"

export default function VolunteersPage({ params }: { params: { slug: string; eventSlug: string } }) {
  const router = useRouter()
  const [submitted, setSubmitted] = useState(false)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    console.log("[v0] Volunteer application submitted for event:", params.eventSlug)
    setSubmitted(true)
    setTimeout(() => {
      router.push(`/clubs/${params.slug}/${params.eventSlug}`)
    }, 2000)
  }

  if (submitted) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <CheckCircle className="h-16 w-16 text-green-500 mx-auto mb-4" />
          <h1 className="text-3xl font-bold mb-2">Application Submitted!</h1>
          <p className="text-muted-foreground mb-4">Thank you for volunteering. We'll contact you soon.</p>
          <p className="text-sm text-muted-foreground">Redirecting...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <section className="relative overflow-hidden border-b border-border bg-gradient-to-br from-green-500/5 via-background to-background">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,rgba(34,197,94,0.1),transparent_50%)]" />
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
            <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-green-500/10 border border-green-500/20">
              <HandHeart className="h-6 w-6 text-green-600" />
            </div>
            <div>
              <h1 className="text-4xl font-bold">Call for Volunteers</h1>
              <p className="text-muted-foreground">Join our team and make this event successful</p>
            </div>
          </div>
        </div>
      </section>

      <div className="container py-8 max-w-3xl">
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Personal Information */}
          <div className="rounded-xl border border-green-500/20 bg-card p-6">
            <h2 className="text-xl font-bold mb-6 text-green-600">Personal Information</h2>
            <div className="space-y-4">
              <div className="grid gap-4 md:grid-cols-2">
                <div>
                  <Label htmlFor="name">Full Name *</Label>
                  <Input id="name" placeholder="John Doe" required />
                </div>
                <div>
                  <Label htmlFor="email">Email Address *</Label>
                  <Input id="email" type="email" placeholder="john@example.com" required />
                </div>
              </div>

              <div className="grid gap-4 md:grid-cols-2">
                <div>
                  <Label htmlFor="phone">Phone Number *</Label>
                  <Input id="phone" type="tel" placeholder="+91 98765 43210" required />
                </div>
                <div>
                  <Label htmlFor="whatsapp">WhatsApp Number</Label>
                  <Input id="whatsapp" type="tel" placeholder="+91 98765 43210" />
                </div>
              </div>

              <div className="grid gap-4 md:grid-cols-2">
                <div>
                  <Label htmlFor="college">College/Organization *</Label>
                  <Input id="college" placeholder="KKWIEER" required />
                </div>
                <div>
                  <Label htmlFor="year">Year of Study *</Label>
                  <select
                    id="year"
                    required
                    className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm"
                  >
                    <option value="">Select year</option>
                    <option value="1">First Year</option>
                    <option value="2">Second Year</option>
                    <option value="3">Third Year</option>
                    <option value="4">Final Year</option>
                  </select>
                </div>
              </div>

              <div>
                <Label htmlFor="branch">Branch/Department *</Label>
                <Input id="branch" placeholder="Computer Engineering" required />
              </div>
            </div>
          </div>

          {/* Volunteer Preferences */}
          <div className="rounded-xl border border-green-500/20 bg-card p-6">
            <h2 className="text-xl font-bold mb-6 text-green-600">Volunteer Preferences</h2>
            <div className="space-y-4">
              <div>
                <Label>Preferred Roles (select all that apply) *</Label>
                <div className="space-y-2 mt-2">
                  {[
                    "Registration Desk",
                    "Technical Support",
                    "Hospitality",
                    "Photography/Videography",
                    "Social Media Coverage",
                    "Logistics & Setup",
                    "Crowd Management",
                    "Speaker Coordination",
                  ].map((role) => (
                    <label key={role} className="flex items-center gap-2">
                      <input type="checkbox" className="rounded" />
                      <span className="text-sm">{role}</span>
                    </label>
                  ))}
                </div>
              </div>

              <div>
                <Label htmlFor="availability">Availability *</Label>
                <select
                  id="availability"
                  required
                  className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm"
                >
                  <option value="">Select availability</option>
                  <option value="full">Full Day (Setup to Cleanup)</option>
                  <option value="morning">Morning Session Only</option>
                  <option value="afternoon">Afternoon Session Only</option>
                  <option value="flexible">Flexible</option>
                </select>
              </div>

              <div>
                <Label htmlFor="tshirt">T-Shirt Size *</Label>
                <select
                  id="tshirt"
                  required
                  className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm"
                >
                  <option value="">Select size</option>
                  <option value="xs">XS</option>
                  <option value="s">S</option>
                  <option value="m">M</option>
                  <option value="l">L</option>
                  <option value="xl">XL</option>
                  <option value="xxl">XXL</option>
                </select>
              </div>
            </div>
          </div>

          {/* Experience & Skills */}
          <div className="rounded-xl border border-green-500/20 bg-card p-6">
            <h2 className="text-xl font-bold mb-6 text-green-600">Experience & Skills</h2>
            <div className="space-y-4">
              <div>
                <Label htmlFor="experience">Previous Volunteering Experience</Label>
                <Textarea id="experience" placeholder="Describe any previous volunteering experience..." rows={4} />
              </div>

              <div>
                <Label htmlFor="skills">Relevant Skills</Label>
                <Textarea id="skills" placeholder="Technical skills, languages, photography, design, etc..." rows={3} />
              </div>

              <div>
                <Label htmlFor="motivation">Why do you want to volunteer? *</Label>
                <Textarea id="motivation" placeholder="Share your motivation..." rows={4} required />
              </div>
            </div>
          </div>

          {/* Emergency Contact */}
          <div className="rounded-xl border border-green-500/20 bg-card p-6">
            <h2 className="text-xl font-bold mb-6 text-green-600">Emergency Contact</h2>
            <div className="space-y-4">
              <div className="grid gap-4 md:grid-cols-2">
                <div>
                  <Label htmlFor="emergency-name">Contact Name *</Label>
                  <Input id="emergency-name" placeholder="Parent/Guardian Name" required />
                </div>
                <div>
                  <Label htmlFor="emergency-phone">Contact Phone *</Label>
                  <Input id="emergency-phone" type="tel" placeholder="+91 98765 43210" required />
                </div>
              </div>

              <div>
                <Label htmlFor="emergency-relation">Relationship *</Label>
                <Input id="emergency-relation" placeholder="Parent, Guardian, etc." required />
              </div>
            </div>
          </div>

          {/* Terms */}
          <div className="rounded-xl border border-green-500/20 bg-card p-6">
            <h2 className="text-xl font-bold mb-4 text-green-600">Commitment</h2>
            <div className="space-y-3 text-sm text-muted-foreground mb-4">
              <p>• Volunteers must attend a mandatory briefing session</p>
              <p>• Punctuality and commitment are essential</p>
              <p>• Volunteers will receive certificates and refreshments</p>
              <p>• Professional behavior is expected at all times</p>
            </div>
            <label className="flex items-start gap-2">
              <input type="checkbox" required className="mt-1" />
              <span className="text-sm">
                I commit to volunteering for this event and will be available as indicated *
              </span>
            </label>
          </div>

          <div className="flex gap-4">
            <Button type="submit" size="lg" className="flex-1 bg-green-600 hover:bg-green-700">
              Submit Application
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
