"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { Star, Loader2, CheckCircle } from "lucide-react"
import { submitEventFeedback } from "@/lib/interactive"
import { useAuth } from "@/contexts/auth-context"

interface FeedbackFormProps {
  eventId: string
  eventTitle: string
  onSubmitSuccess?: () => void
}

export function FeedbackForm({ eventId, eventTitle, onSubmitSuccess }: FeedbackFormProps) {
  const { user } = useAuth()
  const [rating, setRating] = useState(0)
  const [hoverRating, setHoverRating] = useState(0)
  const [comment, setComment] = useState("")
  const [categories, setCategories] = useState({
    organization: 0,
    content: 0,
    venue: 0,
    overall: 0,
  })
  const [submitting, setSubmitting] = useState(false)
  const [submitted, setSubmitted] = useState(false)

  const handleSubmit = async () => {
    if (!user || rating === 0) return

    setSubmitting(true)
    try {
      const result = await submitEventFeedback(eventId, user.uid, rating, comment, categories)
      if (result) {
        setSubmitted(true)
        onSubmitSuccess?.()
      }
    } catch (error) {
      console.error("[v0] Error submitting feedback:", error)
    } finally {
      setSubmitting(false)
    }
  }

  const renderStars = (value: number, onChange: (value: number) => void, onHover?: (value: number) => void) => {
    return (
      <div className="flex gap-1">
        {[1, 2, 3, 4, 5].map((star) => (
          <button
            key={star}
            type="button"
            onClick={() => onChange(star)}
            onMouseEnter={() => onHover?.(star)}
            onMouseLeave={() => onHover?.(0)}
            className="transition-transform hover:scale-110"
          >
            <Star
              className={`h-6 w-6 ${star <= value ? "fill-yellow-500 text-yellow-500" : "text-muted-foreground"}`}
            />
          </button>
        ))}
      </div>
    )
  }

  if (submitted) {
    return (
      <Card>
        <CardContent className="py-12 text-center">
          <CheckCircle className="h-16 w-16 mx-auto mb-4 text-green-500" />
          <h3 className="text-lg font-semibold mb-2">Thank You for Your Feedback!</h3>
          <p className="text-muted-foreground">Your feedback helps us improve future events.</p>
        </CardContent>
      </Card>
    )
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Share Your Feedback</CardTitle>
        <p className="text-sm text-muted-foreground">Help us improve by sharing your experience at {eventTitle}</p>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Overall Rating */}
        <div className="space-y-2">
          <Label>Overall Rating</Label>
          {renderStars(hoverRating || rating, setRating, setHoverRating)}
        </div>

        {/* Category Ratings */}
        <div className="space-y-4">
          <div className="space-y-2">
            <Label>Organization</Label>
            {renderStars(categories.organization, (value) => setCategories({ ...categories, organization: value }))}
          </div>

          <div className="space-y-2">
            <Label>Content Quality</Label>
            {renderStars(categories.content, (value) => setCategories({ ...categories, content: value }))}
          </div>

          <div className="space-y-2">
            <Label>Venue</Label>
            {renderStars(categories.venue, (value) => setCategories({ ...categories, venue: value }))}
          </div>

          <div className="space-y-2">
            <Label>Overall Experience</Label>
            {renderStars(categories.overall, (value) => setCategories({ ...categories, overall: value }))}
          </div>
        </div>

        {/* Comment */}
        <div className="space-y-2">
          <Label htmlFor="comment">Additional Comments</Label>
          <Textarea
            id="comment"
            placeholder="Share your thoughts about the event..."
            value={comment}
            onChange={(e) => setComment(e.target.value)}
            rows={4}
          />
        </div>

        <Button onClick={handleSubmit} disabled={submitting || rating === 0} className="w-full">
          {submitting ? (
            <>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              Submitting...
            </>
          ) : (
            "Submit Feedback"
          )}
        </Button>
      </CardContent>
    </Card>
  )
}
