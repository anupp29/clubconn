"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Label } from "@/components/ui/label"
import { BarChart3, CheckCircle, Loader2 } from "lucide-react"
import { type Poll, voteOnPoll, hasUserVoted } from "@/lib/interactive"
import { useAuth } from "@/contexts/auth-context"

interface PollCardProps {
  poll: Poll
  onVoteSuccess?: () => void
}

export function PollCard({ poll, onVoteSuccess }: PollCardProps) {
  const { user } = useAuth()
  const [selectedOption, setSelectedOption] = useState<string>("")
  const [voting, setVoting] = useState(false)
  const [hasVoted, setHasVoted] = useState(false)
  const [showResults, setShowResults] = useState(false)

  useEffect(() => {
    async function checkVoteStatus() {
      if (user) {
        const voted = await hasUserVoted(poll.id, user.uid)
        setHasVoted(voted)
        setShowResults(voted)
      }
    }
    checkVoteStatus()
  }, [poll.id, user])

  const handleVote = async () => {
    if (!user || !selectedOption) return

    setVoting(true)
    try {
      const success = await voteOnPoll(poll.id, user.uid, selectedOption)
      if (success) {
        setHasVoted(true)
        setShowResults(true)
        onVoteSuccess?.()
      }
    } catch (error) {
      console.error("[v0] Error voting:", error)
    } finally {
      setVoting(false)
    }
  }

  const getPercentage = (votes: number) => {
    if (poll.totalVotes === 0) return 0
    return Math.round((votes / poll.totalVotes) * 100)
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <BarChart3 className="h-5 w-5" />
          {poll.title}
        </CardTitle>
        {poll.description && <p className="text-sm text-muted-foreground">{poll.description}</p>}
      </CardHeader>
      <CardContent className="space-y-4">
        {!showResults ? (
          <>
            <RadioGroup value={selectedOption} onValueChange={setSelectedOption}>
              {poll.options.map((option) => (
                <div key={option.id} className="flex items-center space-x-2">
                  <RadioGroupItem value={option.id} id={option.id} />
                  <Label htmlFor={option.id} className="flex-1 cursor-pointer">
                    {option.text}
                  </Label>
                </div>
              ))}
            </RadioGroup>

            <div className="flex gap-2">
              <Button onClick={handleVote} disabled={voting || !selectedOption || hasVoted} className="flex-1">
                {voting ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Voting...
                  </>
                ) : hasVoted ? (
                  <>
                    <CheckCircle className="mr-2 h-4 w-4" />
                    Voted
                  </>
                ) : (
                  "Vote"
                )}
              </Button>
              {hasVoted && (
                <Button variant="outline" onClick={() => setShowResults(!showResults)}>
                  {showResults ? "Hide" : "Show"} Results
                </Button>
              )}
            </div>
          </>
        ) : (
          <>
            <div className="space-y-4">
              {poll.options.map((option) => {
                const percentage = getPercentage(option.votes)
                return (
                  <div key={option.id} className="space-y-2">
                    <div className="flex items-center justify-between text-sm">
                      <span className="font-medium">{option.text}</span>
                      <span className="text-muted-foreground">
                        {option.votes} votes ({percentage}%)
                      </span>
                    </div>
                    <Progress value={percentage} className="h-2" />
                  </div>
                )
              })}
            </div>

            <div className="pt-2 border-t border-border">
              <p className="text-sm text-muted-foreground text-center">Total votes: {poll.totalVotes}</p>
            </div>

            {hasVoted && (
              <Button variant="outline" onClick={() => setShowResults(false)} className="w-full bg-transparent">
                Hide Results
              </Button>
            )}
          </>
        )}
      </CardContent>
    </Card>
  )
}
