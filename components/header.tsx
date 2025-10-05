"use client"

import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Menu, ChevronDown, User, LogOut, Settings } from "lucide-react"
import { useAuth } from "@/contexts/auth-context"
import { useState, useEffect } from "react"
import { LoginDialog } from "./auth/login-dialog"
import { SignupDialog } from "./auth/signup-dialog"
import { UsernameSetupDialog } from "./auth/username-setup-dialog"
import { WelcomeToast } from "./welcome-toast"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
  DropdownMenuSeparator,
  DropdownMenuLabel,
} from "@/components/ui/dropdown-menu"

export function Header() {
  const { user, userProfile, signOut, loading, profileChecked } = useAuth()
  const [loginOpen, setLoginOpen] = useState(false)
  const [signupOpen, setSignupOpen] = useState(false)
  const [usernameSetupOpen, setUsernameSetupOpen] = useState(false)
  const [showWelcome, setShowWelcome] = useState(false)
  const [hasShownWelcome, setHasShownWelcome] = useState(false)
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  useEffect(() => {
    if (profileChecked && user && !userProfile) {
      console.log("[v0] New user detected - showing username setup")
      setUsernameSetupOpen(true)
    } else if (profileChecked && user && userProfile) {
      console.log("[v0] Returning user detected - skipping username setup")
      setUsernameSetupOpen(false)
    }
  }, [user, userProfile, profileChecked])

  useEffect(() => {
    if (userProfile && !hasShownWelcome && !loading) {
      setShowWelcome(true)
      setHasShownWelcome(true)
    }
  }, [userProfile, hasShownWelcome, loading])

  const handleSignOut = async () => {
    await signOut()
  }

  const getInitials = (name: string) => {
    return name
      .split(" ")
      .map((n) => n[0])
      .join("")
      .toUpperCase()
      .slice(0, 2)
  }

  return (
    <>
      <header className="sticky top-0 z-50 w-full border-b border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container flex h-16 items-center justify-between">
          <Link href="/" className="flex items-center gap-2">
            <div className="h-8 w-8 rounded-lg bg-gradient-to-br from-primary to-primary/60 flex items-center justify-center">
              <span className="text-white font-bold text-sm">CC</span>
            </div>
            <span className="font-bold text-xl">ClubConn</span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-6">
            {/* Explore Dropdown */}
            <DropdownMenu>
              <DropdownMenuTrigger className="flex items-center gap-1 text-sm font-medium hover:text-primary transition-colors outline-none">
                Explore
                <ChevronDown className="h-4 w-4" />
              </DropdownMenuTrigger>
              <DropdownMenuContent align="start" className="w-56">
                <DropdownMenuLabel>Student Hub</DropdownMenuLabel>
                <DropdownMenuItem asChild>
                  <Link href="/dashboard" className="cursor-pointer">
                    Dashboard
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuItem asChild>
                  <Link href="/certificates" className="cursor-pointer">
                    Certificates
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuItem asChild>
                  <Link href="/achievements" className="cursor-pointer">
                    Achievements
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuItem asChild>
                  <Link href="/leaderboard" className="cursor-pointer">
                    Leaderboard
                  </Link>
                </DropdownMenuItem>

                <DropdownMenuSeparator />

                <DropdownMenuLabel>Partnerships</DropdownMenuLabel>
                <DropdownMenuItem asChild>
                  <Link href="/sponsorship" className="cursor-pointer">
                    Sponsorship
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuItem asChild>
                  <Link href="/sponsorship/dashboard" className="cursor-pointer">
                    Sponsor Dashboard
                  </Link>
                </DropdownMenuItem>

                {userProfile?.platform_role === "platform_admin" && (
                  <>
                    <DropdownMenuSeparator />
                    <DropdownMenuLabel>Administration</DropdownMenuLabel>
                    <DropdownMenuItem asChild>
                      <Link href="/college-admin" className="cursor-pointer">
                        College Admin
                      </Link>
                    </DropdownMenuItem>
                  </>
                )}
              </DropdownMenuContent>
            </DropdownMenu>

            {/* Main Navigation Items */}
            <Link href="/events" className="text-sm font-medium hover:text-primary transition-colors">
              Events
            </Link>
            <Link href="/communities" className="text-sm font-medium hover:text-primary transition-colors">
              Communities
            </Link>
            <Link href="/clubs" className="text-sm font-medium hover:text-primary transition-colors">
              Clubs
            </Link>
            <Link href="/vision" className="text-sm font-medium hover:text-primary transition-colors">
              Vision
            </Link>
          </nav>

          {/* Auth Buttons Section */}
          <div className="hidden md:flex items-center gap-3">
            {user && userProfile ? (
              <DropdownMenu>
                <DropdownMenuTrigger className="outline-none">
                  <Avatar className="h-9 w-9 cursor-pointer ring-2 ring-primary/20 hover:ring-primary/40 transition-all">
                    <AvatarImage src={userProfile.avatarUrl || "/placeholder.svg"} alt={userProfile.displayName} />
                    <AvatarFallback className="bg-gradient-to-br from-primary to-primary/60 text-white font-semibold">
                      {getInitials(userProfile.displayName)}
                    </AvatarFallback>
                  </Avatar>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="w-56">
                  <DropdownMenuLabel>
                    <div className="flex flex-col space-y-1">
                      <p className="text-sm font-medium">{userProfile.displayName}</p>
                      <p className="text-xs text-muted-foreground">@{userProfile.username}</p>
                    </div>
                  </DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem asChild>
                    <Link href={`/u/${userProfile.username}`} className="cursor-pointer">
                      <User className="mr-2 h-4 w-4" />
                      Profile
                    </Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem asChild>
                    <Link href="/dashboard" className="cursor-pointer">
                      <Settings className="mr-2 h-4 w-4" />
                      Dashboard
                    </Link>
                  </DropdownMenuItem>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem onClick={handleSignOut} className="cursor-pointer text-destructive">
                    <LogOut className="mr-2 h-4 w-4" />
                    Sign Out
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            ) : (
              <>
                <Button variant="ghost" onClick={() => setLoginOpen(true)}>
                  Sign In
                </Button>
                <Button onClick={() => setSignupOpen(true)}>Get Started</Button>
              </>
            )}
          </div>

          {/* Mobile Navigation */}
          <Sheet open={mobileMenuOpen} onOpenChange={setMobileMenuOpen}>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon" className="md:hidden">
                <Menu className="h-5 w-5" />
              </Button>
            </SheetTrigger>
            <SheetContent side="right" className="w-[300px] sm:w-[400px] p-0">
              <nav className="flex flex-col h-full overflow-y-auto py-6">
                <div className="flex-1 space-y-1">
                  {/* Explore Section */}
                  <div className="space-y-1">
                    <p className="text-xs font-semibold text-muted-foreground px-6 py-2">Student Hub</p>
                    <Link
                      href="/dashboard"
                      className="text-base font-medium hover:text-primary transition-colors block px-6 py-2"
                      onClick={() => setMobileMenuOpen(false)}
                    >
                      Dashboard
                    </Link>
                    <Link
                      href="/certificates"
                      className="text-base font-medium hover:text-primary transition-colors block px-6 py-2"
                      onClick={() => setMobileMenuOpen(false)}
                    >
                      Certificates
                    </Link>
                    <Link
                      href="/achievements"
                      className="text-base font-medium hover:text-primary transition-colors block px-6 py-2"
                      onClick={() => setMobileMenuOpen(false)}
                    >
                      Achievements
                    </Link>
                    <Link
                      href="/leaderboard"
                      className="text-base font-medium hover:text-primary transition-colors block px-6 py-2"
                      onClick={() => setMobileMenuOpen(false)}
                    >
                      Leaderboard
                    </Link>
                  </div>

                  <div className="space-y-1">
                    <p className="text-xs font-semibold text-muted-foreground px-6 py-2">Partnerships</p>
                    <Link
                      href="/sponsorship"
                      className="text-base font-medium hover:text-primary transition-colors block px-6 py-2"
                      onClick={() => setMobileMenuOpen(false)}
                    >
                      Sponsorship
                    </Link>
                    <Link
                      href="/sponsorship/dashboard"
                      className="text-base font-medium hover:text-primary transition-colors block px-6 py-2"
                      onClick={() => setMobileMenuOpen(false)}
                    >
                      Sponsor Dashboard
                    </Link>
                  </div>

                  {userProfile?.platform_role === "platform_admin" && (
                    <div className="space-y-1">
                      <p className="text-xs font-semibold text-muted-foreground px-6 py-2">Administration</p>
                      <Link
                        href="/college-admin"
                        className="text-base font-medium hover:text-primary transition-colors block px-6 py-2"
                        onClick={() => setMobileMenuOpen(false)}
                      >
                        College Admin
                      </Link>
                    </div>
                  )}

                  <div className="border-t border-border my-2" />

                  {/* Main Navigation */}
                  <Link
                    href="/events"
                    className="text-base font-medium hover:text-primary transition-colors block px-6 py-2"
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    Events
                  </Link>
                  <Link
                    href="/communities"
                    className="text-base font-medium hover:text-primary transition-colors block px-6 py-2"
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    Communities
                  </Link>
                  <Link
                    href="/clubs"
                    className="text-base font-medium hover:text-primary transition-colors block px-6 py-2"
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    Clubs
                  </Link>
                  <Link
                    href="/vision"
                    className="text-base font-medium hover:text-primary transition-colors block px-6 py-2"
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    Vision
                  </Link>
                </div>

                {/* User Profile Section in Mobile Menu */}
                {user && userProfile && (
                  <>
                    <div className="border-t border-border my-2" />
                    <Link
                      href={`/u/${userProfile.username}`}
                      className="flex items-center gap-3 px-6 py-3"
                      onClick={() => setMobileMenuOpen(false)}
                    >
                      <Avatar className="h-10 w-10">
                        <AvatarImage src={userProfile.avatarUrl || "/placeholder.svg"} alt={userProfile.displayName} />
                        <AvatarFallback className="bg-gradient-to-br from-primary to-primary/60 text-white font-semibold">
                          {getInitials(userProfile.displayName)}
                        </AvatarFallback>
                      </Avatar>
                      <div className="flex flex-col">
                        <span className="text-sm font-medium">{userProfile.displayName}</span>
                        <span className="text-xs text-muted-foreground">@{userProfile.username}</span>
                      </div>
                    </Link>
                  </>
                )}

                {/* Auth Buttons */}
                <div className="px-6 pb-6 pt-2 space-y-2">
                  {user ? (
                    <Button
                      variant="outline"
                      className="w-full justify-center bg-transparent"
                      onClick={() => {
                        setMobileMenuOpen(false)
                        handleSignOut()
                      }}
                    >
                      Sign Out
                    </Button>
                  ) : (
                    <>
                      <Button
                        variant="outline"
                        className="w-full justify-center bg-transparent"
                        onClick={() => {
                          setMobileMenuOpen(false)
                          setLoginOpen(true)
                        }}
                      >
                        Sign In
                      </Button>
                      <Button
                        className="w-full justify-center"
                        onClick={() => {
                          setMobileMenuOpen(false)
                          setSignupOpen(true)
                        }}
                      >
                        Get Started
                      </Button>
                    </>
                  )}
                </div>
              </nav>
            </SheetContent>
          </Sheet>
        </div>
      </header>

      <LoginDialog
        open={loginOpen}
        onOpenChange={setLoginOpen}
        onSwitchToSignup={() => {
          setLoginOpen(false)
          setSignupOpen(true)
        }}
      />
      <SignupDialog
        open={signupOpen}
        onOpenChange={setSignupOpen}
        onSwitchToLogin={() => {
          setSignupOpen(false)
          setLoginOpen(true)
        }}
      />
      <UsernameSetupDialog open={usernameSetupOpen} onComplete={() => setUsernameSetupOpen(false)} />

      {userProfile && (
        <WelcomeToast username={userProfile.displayName} show={showWelcome} onClose={() => setShowWelcome(false)} />
      )}
    </>
  )
}
