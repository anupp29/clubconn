"use client"

import type React from "react"

import { useState } from "react"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { useAuth } from "@/contexts/auth-context"
import { isUsernameAvailable } from "@/lib/firestore"
import { Github, Check, X } from "lucide-react"
import { AvatarSelector } from "./avatar-selector"
import { DEFAULT_AVATARS } from "@/lib/default-avatars"

interface SignupDialogProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  onSwitchToLogin: () => void
}

export function SignupDialog({ open, onOpenChange, onSwitchToLogin }: SignupDialogProps) {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [username, setUsername] = useState("")
  const [displayName, setDisplayName] = useState("")
  const [selectedAvatar, setSelectedAvatar] = useState(DEFAULT_AVATARS[0].id)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState("")
  const [usernameStatus, setUsernameStatus] = useState<"idle" | "checking" | "available" | "taken">("idle")
  const { signUp, signInWithGoogle, signInWithGithub } = useAuth()

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
    // Only allow alphanumeric and underscores
    const sanitized = value.toLowerCase().replace(/[^a-z0-9_]/g, "")
    setUsername(sanitized)
    checkUsername(sanitized)
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError("")

    if (usernameStatus !== "available") {
      setError("Please choose an available username")
      return
    }

    setLoading(true)

    try {
      await signUp(email, password, username, displayName, selectedAvatar)
      onOpenChange(false)
      setEmail("")
      setPassword("")
      setUsername("")
      setDisplayName("")
      setSelectedAvatar(DEFAULT_AVATARS[0].id)
    } catch (err: any) {
      console.error("[v0] Signup error:", err)
      setError(err.message || "Failed to create account")
    } finally {
      setLoading(false)
    }
  }

  const handleGoogleSignIn = async () => {
    setError("")
    setLoading(true)
    try {
      await signInWithGoogle()
      onOpenChange(false)
    } catch (err: any) {
      console.error("[v0] Google sign in error:", err)
      if (err.code === "auth/unauthorized-domain") {
        setError(
          "OAuth is not configured for this preview domain. To enable Google sign-in, add this domain to Firebase Console → Authentication → Settings → Authorized domains. For now, please use email/password signup.",
        )
      } else {
        setError(err.message || "Failed to sign in with Google")
      }
    } finally {
      setLoading(false)
    }
  }

  const handleGithubSignIn = async () => {
    setError("")
    setLoading(true)
    try {
      await signInWithGithub()
      onOpenChange(false)
    } catch (err: any) {
      console.error("[v0] GitHub sign in error:", err)
      if (err.code === "auth/unauthorized-domain") {
        setError(
          "OAuth is not configured for this preview domain. To enable GitHub sign-in, add this domain to Firebase Console → Authentication → Settings → Authorized domains. For now, please use email/password signup.",
        )
      } else {
        setError(err.message || "Failed to sign in with GitHub")
      }
    } finally {
      setLoading(false)
    }
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Create your account</DialogTitle>
          <DialogDescription>Join ClubConn and connect with campus communities</DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-4">
          <AvatarSelector selectedAvatar={selectedAvatar} onSelect={setSelectedAvatar} disabled={loading} />

          <div className="space-y-2">
            <Label htmlFor="displayName">Display Name</Label>
            <Input
              id="displayName"
              type="text"
              placeholder="John Doe"
              value={displayName}
              onChange={(e) => setDisplayName(e.target.value)}
              required
              disabled={loading}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="username">Username</Label>
            <div className="relative">
              <Input
                id="username"
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

          <div className="space-y-2">
            <Label htmlFor="signup-email">Email</Label>
            <Input
              id="signup-email"
              type="email"
              placeholder="you@example.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              disabled={loading}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="signup-password">Password</Label>
            <Input
              id="signup-password"
              type="password"
              placeholder="••••••••"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              disabled={loading}
              minLength={6}
            />
          </div>

          {error && <p className="text-sm text-destructive">{error}</p>}

          <Button type="submit" className="w-full" disabled={loading || usernameStatus !== "available"}>
            {loading ? "Creating account..." : "Create Account"}
          </Button>
        </form>

        <div className="relative">
          <div className="absolute inset-0 flex items-center">
            <span className="w-full border-t" />
          </div>
          <div className="relative flex justify-center text-xs uppercase">
            <span className="bg-background px-2 text-muted-foreground">Or continue with</span>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <Button variant="outline" onClick={handleGoogleSignIn} disabled={loading}>
            <svg className="mr-2 h-4 w-4" viewBox="0 0 24 24">
              <path
                d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                fill="#4285F4"
              />
              <path
                d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                fill="#34A853"
              />
              <path
                d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                fill="#FBBC05"
              />
              <path
                d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                fill="#EA4335"
              />
            </svg>
            Google
          </Button>
          <Button variant="outline" onClick={handleGithubSignIn} disabled={loading}>
            <Github className="mr-2 h-4 w-4" />
            GitHub
          </Button>
        </div>

        <p className="text-center text-sm text-muted-foreground">
          Already have an account?{" "}
          <button
            type="button"
            onClick={onSwitchToLogin}
            className="font-medium text-primary hover:underline"
            disabled={loading}
          >
            Sign in
          </button>
        </p>
      </DialogContent>
    </Dialog>
  )
}
