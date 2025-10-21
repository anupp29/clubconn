"use client"

import { Button } from "@/components/ui/button"
import { ArrowRight, Sparkles } from "lucide-react"
import Link from "next/link"

export function Hero() {
  return (
    <section className="relative overflow-hidden bg-background py-16 sm:py-20 md:py-24 lg:py-32">
      <div className="absolute inset-0 -z-10 bg-[linear-gradient(to_right,#00000040_3px,transparent_3px),linear-gradient(to_bottom,#00000040_3px,transparent_3px)] bg-[size:80px_80px]" />

      <div className="absolute inset-0 -z-10 bg-[radial-gradient(ellipse_at_center,transparent_0%,#ffffff_100%)]" />

      <div className="absolute inset-0 -z-10 bg-gradient-to-b from-emerald-500/3 via-transparent to-transparent" />

      <div className="container">
        <div className="mx-auto max-w-4xl text-center space-y-8">
          <div className="inline-flex items-center gap-2 rounded-full border border-emerald-500/20 bg-emerald-500/5 px-4 py-2 text-sm font-medium">
            <Sparkles className="h-4 w-4 text-emerald-600" />
            <span className="text-foreground">Your Campus, Connected</span>
          </div>

          <h1 className="text-4xl font-bold tracking-tight text-balance sm:text-5xl md:text-6xl lg:text-7xl leading-tight">
            Growing <span className="text-emerald-600">KKWIEER's</span> Ecosystem
          </h1>

          <p className="text-lg text-muted-foreground text-balance md:text-xl max-w-2xl mx-auto leading-relaxed">
            Discover Every Club at KKWIEER in One Place. ClubConn is your one-stop destination to explore, join, and
            engage with all student clubs and organizations.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-3 pt-4">
            <Button size="lg" className="w-full sm:w-auto bg-emerald-600 hover:bg-emerald-700 text-white" asChild>
              <Link href="/events">
                Explore Events
                <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
            <Button size="lg" variant="outline" className="w-full sm:w-auto bg-transparent" asChild>
              <Link href="/communities">Join Communities</Link>
            </Button>
          </div>
        </div>
      </div>
    </section>
  )
}
