"use client"

import type React from "react"
import { useState } from "react"
import { useRouter } from "next/navigation"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { ArrowLeft, CheckCircle, Handshake } from "lucide-react"

export default function SponsorsPage({ params }: { params: { slug: string; eventSlug: string } }) {
  const router = useRouter()
  const [submitted, setSubmitted] = useState(false)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    console.log("[v0] Sponsorship inquiry submitted for event:", params.eventSlug)
    setSubmitted(true)
    setTimeout(() => {
      router.push(`/clubs/${params.slug}/${params.eventSlug}`)
    }, 2000)
  }

  if (submitted) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <CheckCircle className="h-16 w-16 text-amber-500 mx-auto mb-4" />
          <h1 className="text-3xl font-bold mb-2">Inquiry Submitted!</h1>
          <p className="text-muted-foreground mb-4">We'll send you the sponsorship brochure shortly.</p>
          <p className="text-sm text-muted-foreground">Redirecting...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <section className="relative overflow-hidden border-b border-border bg-gradient-to-br from-amber-500/5 via-background to-background">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,rgba(245,158,11,0.1),transparent_50%)]" />
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
            <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-amber-500/10 border border-amber-500/20">
              <Handshake className="h-6 w-6 text-amber-600" />
            </div>
            <div>
              <h1 className="text-4xl font-bold">Call for Sponsors</h1>
              <p className="text-muted-foreground">Partner with us to make this event a success</p>
            </div>
          </div>
        </div>
      </section>

      <div className="container py-8 max-w-3xl">
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Company Information */}
          <div className="rounded-xl border border-amber-500/20 bg-card p-6">
            <h2 className="text-xl font-bold mb-6 text-amber-600">Company Information</h2>
            <div className="space-y-4">
              <div>
                <Label htmlFor="company-name">Company Name *</Label>
                <Input id="company-name" placeholder="Tech Corp Pvt. Ltd." required />
              </div>

              <div className="grid gap-4 md:grid-cols-2">
                <div>
                  <Label htmlFor="company-website">Website</Label>
                  <Input id="company-website" type="url" placeholder="https://example.com" />
                </div>
                <div>
                  <Label htmlFor="company-industry">Industry *</Label>
                  <Input id="company-industry" placeholder="Technology, Finance, etc." required />
                </div>
              </div>

              <div>
                <Label htmlFor="company-description">Company Description</Label>
                <Textarea id="company-description" placeholder="Brief overview of your company..." rows={3} />
              </div>

              <div>
                <Label htmlFor="company-logo">Company Logo URL</Label>
                <Input id="company-logo" type="url" placeholder="https://..." />
              </div>
            </div>
          </div>

          {/* Contact Person */}
          <div className="rounded-xl border border-amber-500/20 bg-card p-6">
            <h2 className="text-xl font-bold mb-6 text-amber-600">Contact Person</h2>
            <div className="space-y-4">
              <div className="grid gap-4 md:grid-cols-2">
                <div>
                  <Label htmlFor="contact-name">Full Name *</Label>
                  <Input id="contact-name" placeholder="John Doe" required />
                </div>
                <div>
                  <Label htmlFor="contact-designation">Designation *</Label>
                  <Input id="contact-designation" placeholder="Marketing Manager" required />
                </div>
              </div>

              <div className="grid gap-4 md:grid-cols-2">
                <div>
                  <Label htmlFor="contact-email">Email Address *</Label>
                  <Input id="contact-email" type="email" placeholder="john@example.com" required />
                </div>
                <div>
                  <Label htmlFor="contact-phone">Phone Number *</Label>
                  <Input id="contact-phone" type="tel" placeholder="+91 98765 43210" required />
                </div>
              </div>
            </div>
          </div>

          {/* Sponsorship Details */}
          <div className="rounded-xl border border-amber-500/20 bg-card p-6">
            <h2 className="text-xl font-bold mb-6 text-amber-600">Sponsorship Interest</h2>
            <div className="space-y-4">
              <div>
                <Label>Sponsorship Tier *</Label>
                <div className="space-y-2 mt-2">
                  {[
                    { tier: "Title Sponsor", amount: "₹1,00,000+" },
                    { tier: "Platinum Sponsor", amount: "₹50,000 - ₹1,00,000" },
                    { tier: "Gold Sponsor", amount: "₹25,000 - ₹50,000" },
                    { tier: "Silver Sponsor", amount: "₹10,000 - ₹25,000" },
                    { tier: "Bronze Sponsor", amount: "₹5,000 - ₹10,000" },
                    { tier: "In-Kind Sponsor", amount: "Products/Services" },
                  ].map((option) => (
                    <label key={option.tier} className="flex items-center gap-2">
                      <input type="radio" name="tier" className="rounded" required />
                      <span className="text-sm">
                        {option.tier} <span className="text-muted-foreground">({option.amount})</span>
                      </span>
                    </label>
                  ))}
                </div>
              </div>

              <div>
                <Label htmlFor="budget">Proposed Budget</Label>
                <Input id="budget" placeholder="₹ 50,000" />
              </div>

              <div>
                <Label>Sponsorship Benefits Interested In</Label>
                <div className="space-y-2 mt-2">
                  {[
                    "Logo on Event Materials",
                    "Booth/Stall Space",
                    "Speaking Opportunity",
                    "Social Media Mentions",
                    "Email Marketing",
                    "Recruitment Opportunity",
                    "Product Sampling",
                    "Banner Display",
                  ].map((benefit) => (
                    <label key={benefit} className="flex items-center gap-2">
                      <input type="checkbox" className="rounded" />
                      <span className="text-sm">{benefit}</span>
                    </label>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Marketing Objectives */}
          <div className="rounded-xl border border-amber-500/20 bg-card p-6">
            <h2 className="text-xl font-bold mb-6 text-amber-600">Marketing Objectives</h2>
            <div className="space-y-4">
              <div>
                <Label htmlFor="objectives">What are your marketing objectives? *</Label>
                <Textarea
                  id="objectives"
                  placeholder="Brand awareness, recruitment, product launch, etc..."
                  rows={4}
                  required
                />
              </div>

              <div>
                <Label htmlFor="target-audience">Target Audience</Label>
                <Textarea
                  id="target-audience"
                  placeholder="Students, professionals, specific departments..."
                  rows={3}
                />
              </div>

              <div>
                <Label htmlFor="previous-sponsorships">Previous Sponsorship Experience</Label>
                <Textarea id="previous-sponsorships" placeholder="Have you sponsored similar events before?" rows={3} />
              </div>
            </div>
          </div>

          {/* Additional Requirements */}
          <div className="rounded-xl border border-amber-500/20 bg-card p-6">
            <h2 className="text-xl font-bold mb-6 text-amber-600">Additional Information</h2>
            <div className="space-y-4">
              <div>
                <Label htmlFor="special-requests">Special Requests or Requirements</Label>
                <Textarea id="special-requests" placeholder="Any specific needs or preferences..." rows={4} />
              </div>

              <div>
                <Label htmlFor="timeline">Decision Timeline</Label>
                <select
                  id="timeline"
                  className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm"
                >
                  <option value="">Select timeline</option>
                  <option value="immediate">Immediate (Within 1 week)</option>
                  <option value="short">Short (1-2 weeks)</option>
                  <option value="medium">Medium (2-4 weeks)</option>
                  <option value="flexible">Flexible</option>
                </select>
              </div>

              <div>
                <Label htmlFor="additional-notes">Additional Notes</Label>
                <Textarea id="additional-notes" placeholder="Anything else we should know..." rows={3} />
              </div>
            </div>
          </div>

          {/* Terms */}
          <div className="rounded-xl border border-amber-500/20 bg-card p-6">
            <h2 className="text-xl font-bold mb-4 text-amber-600">Next Steps</h2>
            <div className="space-y-3 text-sm text-muted-foreground mb-4">
              <p>• We'll send you a detailed sponsorship brochure</p>
              <p>• Our team will schedule a call to discuss opportunities</p>
              <p>• Customized packages can be created based on your needs</p>
              <p>• Early sponsors receive additional benefits</p>
            </div>
            <label className="flex items-start gap-2">
              <input type="checkbox" required className="mt-1" />
              <span className="text-sm">
                I authorize the event team to contact me regarding sponsorship opportunities *
              </span>
            </label>
          </div>

          <div className="flex gap-4">
            <Button type="submit" size="lg" className="flex-1 bg-amber-600 hover:bg-amber-700">
              Submit Inquiry
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
