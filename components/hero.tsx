"use client"

import { Button } from "@/components/ui/button"
import { ArrowRight, Sparkles } from "lucide-react"
import Link from "next/link"
import Image from "next/image"

export function Hero() {
  return (
    <section className="relative overflow-hidden bg-background">
      {/* Simplified background - single subtle gradient */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px]" />
        <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-emerald-500/10 rounded-full blur-3xl" />
      </div>

      <div className="container">
        <div className="grid lg:grid-cols-2 gap-12 items-center min-h-[calc(100vh-4rem)] py-12">
          {/* Left: Content */}
          <div className="space-y-8">
            <div className="inline-flex items-center gap-2 rounded-full border bg-muted/50 px-3 py-1 text-sm backdrop-blur-sm">
              <Sparkles className="h-3.5 w-3.5 text-emerald-500" />
              <span className="text-muted-foreground">Your Campus, Connected</span>
            </div>

            <div className="space-y-4">
              <h1 className="text-5xl font-bold tracking-tight text-balance lg:text-6xl xl:text-7xl">
                Growing <span className="text-emerald-500">KKWIEER's</span> Ecosystem
              </h1>

              <p className="text-xl text-muted-foreground text-pretty max-w-xl leading-relaxed">
                Your one-stop destination to explore, join, and engage with all student clubs and organizations. Never
                miss an event.
              </p>
            </div>

            <div className="flex flex-wrap items-center gap-4">
              <Link href="/events">
                <Button size="lg" className="h-12 px-8 bg-emerald-500 hover:bg-emerald-600 text-white">
                  Explore Events
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </Link>
              <Link href="/clubs">
                <Button size="lg" variant="outline" className="h-12 px-8 bg-transparent">
                  Browse Clubs
                </Button>
              </Link>
            </div>

            {/* Stats */}
            <div className="flex flex-wrap gap-8 pt-4">
              <div>
                <div className="text-3xl font-bold">50+</div>
                <div className="text-sm text-muted-foreground">Active Clubs</div>
              </div>
              <div>
                <div className="text-3xl font-bold">200+</div>
                <div className="text-sm text-muted-foreground">Events Yearly</div>
              </div>
              <div>
                <div className="text-3xl font-bold">5000+</div>
                <div className="text-sm text-muted-foreground">Students</div>
              </div>
            </div>
          </div>

          {/* Right: Visual */}
          <div className="relative hidden lg:block">
            <div className="relative aspect-square max-w-lg mx-auto">
              <div className="absolute inset-0 bg-gradient-to-br from-emerald-500/20 to-blue-500/20 rounded-3xl" />
              <div className="absolute inset-4 bg-card border rounded-2xl shadow-2xl overflow-hidden">
                <Image
                  src="/modern-dashboard-showing-clubs-and-events-interfac.jpg"
                  alt="ClubConn Dashboard"
                  fill
                  className="object-cover"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
