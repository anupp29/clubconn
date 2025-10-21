"use client"

import type React from "react"

import { useState } from "react"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Sparkles } from "lucide-react"

interface ClubCreationDialogProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  onSubmit: (data: ClubProposalData) => void
}

export interface ClubProposalData {
  name: string
  tagline: string
  category: string
  description: string
  mission: string
  proposerName: string
  proposerEmail: string
  proposerRole: string
  expectedMembers: string
  activities: string
}

export function ClubCreationDialog({ open, onOpenChange, onSubmit }: ClubCreationDialogProps) {
  const [formData, setFormData] = useState<ClubProposalData>({
    name: "",
    tagline: "",
    category: "",
    description: "",
    mission: "",
    proposerName: "",
    proposerEmail: "",
    proposerRole: "",
    expectedMembers: "",
    activities: "",
  })
  const [loading, setLoading] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    try {
      await onSubmit(formData)
      onOpenChange(false)
      setFormData({
        name: "",
        tagline: "",
        category: "",
        description: "",
        mission: "",
        proposerName: "",
        proposerEmail: "",
        proposerRole: "",
        expectedMembers: "",
        activities: "",
      })
    } catch (error) {
      console.error("[v0] Error submitting club proposal:", error)
    } finally {
      setLoading(false)
    }
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Sparkles className="h-5 w-5 text-primary" />
            Propose a New Club
          </DialogTitle>
          <DialogDescription>Submit your club proposal for review by the college administration</DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Club Information */}
          <div className="space-y-4">
            <h3 className="font-semibold text-sm text-primary">Club Information</h3>

            <div className="space-y-2">
              <Label htmlFor="club-name">Club Name *</Label>
              <Input
                id="club-name"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                placeholder="e.g., AI & ML Club"
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="club-tagline">Tagline *</Label>
              <Input
                id="club-tagline"
                value={formData.tagline}
                onChange={(e) => setFormData({ ...formData, tagline: e.target.value })}
                placeholder="A catchy one-liner about your club"
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="club-category">Category *</Label>
              <select
                id="club-category"
                value={formData.category}
                onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm"
                required
              >
                <option value="">Select category</option>
                <option value="technical">Technical</option>
                <option value="cultural">Cultural</option>
                <option value="sports">Sports</option>
                <option value="social">Social Service</option>
                <option value="arts">Arts & Literature</option>
                <option value="entrepreneurship">Entrepreneurship</option>
                <option value="other">Other</option>
              </select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="club-description">Description *</Label>
              <Textarea
                id="club-description"
                value={formData.description}
                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                placeholder="Describe what your club is about..."
                rows={4}
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="club-mission">Mission & Vision *</Label>
              <Textarea
                id="club-mission"
                value={formData.mission}
                onChange={(e) => setFormData({ ...formData, mission: e.target.value })}
                placeholder="What are the goals and objectives of your club?"
                rows={3}
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="club-activities">Planned Activities *</Label>
              <Textarea
                id="club-activities"
                value={formData.activities}
                onChange={(e) => setFormData({ ...formData, activities: e.target.value })}
                placeholder="List the activities and events you plan to organize..."
                rows={3}
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="expected-members">Expected Member Count *</Label>
              <Input
                id="expected-members"
                type="number"
                value={formData.expectedMembers}
                onChange={(e) => setFormData({ ...formData, expectedMembers: e.target.value })}
                placeholder="Estimated number of members"
                required
              />
            </div>
          </div>

          {/* Proposer Information */}
          <div className="space-y-4">
            <h3 className="font-semibold text-sm text-primary">Your Information</h3>

            <div className="space-y-2">
              <Label htmlFor="proposer-name">Full Name *</Label>
              <Input
                id="proposer-name"
                value={formData.proposerName}
                onChange={(e) => setFormData({ ...formData, proposerName: e.target.value })}
                placeholder="Your full name"
                required
              />
            </div>

            <div className="grid gap-4 md:grid-cols-2">
              <div className="space-y-2">
                <Label htmlFor="proposer-email">Email *</Label>
                <Input
                  id="proposer-email"
                  type="email"
                  value={formData.proposerEmail}
                  onChange={(e) => setFormData({ ...formData, proposerEmail: e.target.value })}
                  placeholder="your@email.com"
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="proposer-role">Your Role *</Label>
                <Input
                  id="proposer-role"
                  value={formData.proposerRole}
                  onChange={(e) => setFormData({ ...formData, proposerRole: e.target.value })}
                  placeholder="e.g., Student, Faculty"
                  required
                />
              </div>
            </div>
          </div>

          <div className="rounded-lg bg-muted p-4 text-sm text-muted-foreground">
            <p className="font-medium mb-2">What happens next?</p>
            <ul className="space-y-1 list-disc list-inside">
              <li>Your proposal will be reviewed by the administration</li>
              <li>You'll receive an email within 5-7 business days</li>
              <li>If approved, you'll get access to create and manage your club</li>
            </ul>
          </div>

          <div className="flex gap-3">
            <Button type="submit" disabled={loading} className="flex-1">
              {loading ? "Submitting..." : "Submit Proposal"}
            </Button>
            <Button type="button" variant="outline" onClick={() => onOpenChange(false)} disabled={loading}>
              Cancel
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  )
}
