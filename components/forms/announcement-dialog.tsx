"use client"

import type React from "react"

import { useState } from "react"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Megaphone, Bell } from "lucide-react"

interface AnnouncementDialogProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  clubName: string
  onSubmit: (data: AnnouncementData) => void
}

export interface AnnouncementData {
  title: string
  message: string
  priority: "low" | "medium" | "high"
  sendEmail: boolean
  sendPush: boolean
  targetAudience: "all" | "members" | "followers"
}

export function AnnouncementDialog({ open, onOpenChange, clubName, onSubmit }: AnnouncementDialogProps) {
  const [formData, setFormData] = useState<AnnouncementData>({
    title: "",
    message: "",
    priority: "medium",
    sendEmail: true,
    sendPush: true,
    targetAudience: "all",
  })
  const [loading, setLoading] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    try {
      await onSubmit(formData)
      onOpenChange(false)
      setFormData({
        title: "",
        message: "",
        priority: "medium",
        sendEmail: true,
        sendPush: true,
        targetAudience: "all",
      })
    } catch (error) {
      console.error("[v0] Error creating announcement:", error)
    } finally {
      setLoading(false)
    }
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-lg">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Megaphone className="h-5 w-5 text-primary" />
            Create Announcement
          </DialogTitle>
          <DialogDescription>Send an announcement to {clubName} members</DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="announcement-title">Title *</Label>
            <Input
              id="announcement-title"
              value={formData.title}
              onChange={(e) => setFormData({ ...formData, title: e.target.value })}
              placeholder="Important Update"
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="announcement-message">Message *</Label>
            <Textarea
              id="announcement-message"
              value={formData.message}
              onChange={(e) => setFormData({ ...formData, message: e.target.value })}
              placeholder="Write your announcement here..."
              rows={5}
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="priority">Priority</Label>
            <select
              id="priority"
              value={formData.priority}
              onChange={(e) => setFormData({ ...formData, priority: e.target.value as any })}
              className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm"
            >
              <option value="low">Low - General Information</option>
              <option value="medium">Medium - Important Update</option>
              <option value="high">High - Urgent Action Required</option>
            </select>
          </div>

          <div className="space-y-2">
            <Label htmlFor="target-audience">Target Audience</Label>
            <select
              id="target-audience"
              value={formData.targetAudience}
              onChange={(e) => setFormData({ ...formData, targetAudience: e.target.value as any })}
              className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm"
            >
              <option value="all">All (Members + Followers)</option>
              <option value="members">Members Only</option>
              <option value="followers">Followers Only</option>
            </select>
          </div>

          <div className="space-y-3">
            <Label>Notification Channels</Label>
            <div className="space-y-2">
              <label className="flex items-center gap-2">
                <input
                  type="checkbox"
                  checked={formData.sendEmail}
                  onChange={(e) => setFormData({ ...formData, sendEmail: e.target.checked })}
                  className="rounded"
                />
                <span className="text-sm">Send Email Notification</span>
              </label>
              <label className="flex items-center gap-2">
                <input
                  type="checkbox"
                  checked={formData.sendPush}
                  onChange={(e) => setFormData({ ...formData, sendPush: e.target.checked })}
                  className="rounded"
                />
                <span className="text-sm">Send Push Notification</span>
              </label>
            </div>
          </div>

          <div className="rounded-lg bg-muted p-3 text-sm text-muted-foreground flex items-start gap-2">
            <Bell className="h-4 w-4 mt-0.5 flex-shrink-0" />
            <p>This announcement will be visible on the club page and sent to selected audience members.</p>
          </div>

          <div className="flex gap-3">
            <Button type="submit" disabled={loading} className="flex-1">
              {loading ? "Sending..." : "Send Announcement"}
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
