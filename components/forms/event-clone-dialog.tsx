"use client"

import { useState } from "react"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Calendar, Copy } from "lucide-react"

interface EventCloneDialogProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  eventTitle: string
  onClone: (newTitle: string, newDate: string) => void
}

export function EventCloneDialog({ open, onOpenChange, eventTitle, onClone }: EventCloneDialogProps) {
  const [newTitle, setNewTitle] = useState(`${eventTitle} (Copy)`)
  const [newDate, setNewDate] = useState("")
  const [loading, setLoading] = useState(false)

  const handleClone = async () => {
    setLoading(true)
    try {
      await onClone(newTitle, newDate)
      onOpenChange(false)
    } catch (error) {
      console.error("[v0] Error cloning event:", error)
    } finally {
      setLoading(false)
    }
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Copy className="h-5 w-5" />
            Clone Event
          </DialogTitle>
          <DialogDescription>Create a copy of this event with a new date and title</DialogDescription>
        </DialogHeader>

        <div className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="clone-title">Event Title</Label>
            <Input
              id="clone-title"
              value={newTitle}
              onChange={(e) => setNewTitle(e.target.value)}
              placeholder="Enter new event title"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="clone-date">Event Date</Label>
            <div className="relative">
              <Calendar className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                id="clone-date"
                type="date"
                value={newDate}
                onChange={(e) => setNewDate(e.target.value)}
                className="pl-10"
              />
            </div>
          </div>

          <div className="rounded-lg bg-muted p-4 text-sm text-muted-foreground">
            <p className="font-medium mb-2">What will be copied:</p>
            <ul className="space-y-1 list-disc list-inside">
              <li>Event description and objectives</li>
              <li>Speakers and agenda</li>
              <li>RSVP form configuration</li>
              <li>Team roles and structure</li>
            </ul>
          </div>

          <div className="flex gap-3">
            <Button onClick={handleClone} disabled={loading || !newTitle || !newDate} className="flex-1">
              {loading ? "Cloning..." : "Clone Event"}
            </Button>
            <Button variant="outline" onClick={() => onOpenChange(false)} disabled={loading}>
              Cancel
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}
