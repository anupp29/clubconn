"use client"

import type React from "react"

import { useState } from "react"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { useAuth } from "@/contexts/auth-context"
import { createUserProfile, isUsernameAvailable } from "@/lib/firestore"
import { Check, X } from "lucide-react"

interface UsernameSetupDialogProps {
  open: boolean
  onComplete: () => void
}

export function UsernameSetupDialog({ open, onComplete }: UsernameSetupDialogProps) {
  const [username, setUsername] = useState("")
  const [displayName, setDisplayName] = useState("")
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState("")
  const [usernameStatus, setUsernameStatus] = useState<"idle" | "checking" | "available" | "taken">("idle")
  const { user, refreshUserProfile } = useAuth()

  const checkUsername = async (value: string) => {
    if (value.length < 3) {
      setUsernameStatus("idle")
      return
    }

    setUsernameStatus("checking")
    try {
      const available = await isUsernameAvailable(value)
      setUsernameStatus(available ? "available" : "taken")
    } catch (err) {
      console.error("[v0] Error checking username:", err)
      setUsernameStatus("idle")
    }
  }

  const handleUsernameChange = (value: string) => {
    const sanitized = value.toLowerCase().replace(/[^a-z0-9_]/g, "")
    setUsername(sanitized)
    checkUsername(sanitized)
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError("")

    if (!user) {
      setError("No user found")
      return
    }

    if (usernameStatus !== "available") {
      setError("Please choose an available username")
      return
    }

    const finalDisplayName = displayName.trim() || user.displayName || username

    setLoading(true)

    try {
      await createUserProfile(user.uid, {
        uid: user.uid,
        username,
        displayName: finalDisplayName,
        email: user.email || "",
      })
      await refreshUserProfile()
      onComplete()
    } catch (err: any) {
      console.error("[v0] Username setup error:", err)
      setError(err.message || "Failed to set up username")
    } finally {
      setLoading(false)
    }
  }

  return (
    <Dialog open={open} onOpenChange={() => {}}>
      <DialogContent className="sm:max-w-md" onInteractOutside={(e) => e.preventDefault()}>
        <DialogHeader>
          <DialogTitle>Complete Your Profile</DialogTitle>
          <DialogDescription>Choose a username and display name to get started on ClubConn</DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="setup-displayname">Display Name</Label>
            <Input
              id="setup-displayname"
              type="text"
              placeholder={user?.displayName || "John Doe"}
              value={displayName}
              onChange={(e) => setDisplayName(e.target.value)}
              disabled={loading}
            />
            <p className="text-xs text-muted-foreground">This is how your name will appear on your profile</p>
          </div>

          <div className="space-y-2">
            <Label htmlFor="setup-username">Username</Label>
            <div className="relative">
              <Input
                id="setup-username"
                type="text"
                placeholder="johndoe"
                value={username}
                onChange={(e) => handleUsernameChange(e.target.value)}
                required
                disabled={loading}
                className="pr-10"
              />
              {usernameStatus === "checking" && (
                <div className="absolute right-3 top-1/2 -translate-y-1/2">
                  <div className="h-4 w-4 animate-spin rounded-full border-2 border-primary border-t-transparent" />
                </div>
              )}
              {usernameStatus === "available" && (
                <Check className="absolute right-3 top-1/2 -translate-y-1/2 h-4 w-4 text-green-500" />
              )}
              {usernameStatus === "taken" && (
                <X className="absolute right-3 top-1/2 -translate-y-1/2 h-4 w-4 text-destructive" />
              )}
            </div>
            <p className="text-xs text-muted-foreground">
              Your profile will be at clubconn.vercel.app/u/{username || "username"}
            </p>
          </div>

          {error && <p className="text-sm text-destructive">{error}</p>}

          <Button type="submit" className="w-full" disabled={loading || usernameStatus !== "available"}>
            {loading ? "Setting up..." : "Continue"}
          </Button>
        </form>
      </DialogContent>
    </Dialog>
  )
}
