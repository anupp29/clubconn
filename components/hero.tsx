"use client"

import { Button } from "@/components/ui/button"
import { ArrowRight, Sparkles } from "lucide-react"
import Link from "next/link"

export function Hero() {
  return (
    <section className="relative overflow-hidden bg-gradient-to-br from-gray-50 via-white to-emerald-50/30 py-16 sm:py-20 md:py-24 lg:py-32">
      <svg className="absolute inset-0 -z-10 h-full w-full" xmlns="http://www.w3.org/2000/svg">
        <defs>
          <linearGradient id="gridGradient" x1="0%" y1="100%" x2="0%" y2="0%">
            <stop offset="0%" stopColor="rgba(0,0,0,0.35)" />
            <stop offset="50%" stopColor="rgba(0,0,0,0.25)" />
            <stop offset="100%" stopColor="rgba(0,0,0,0.15)" />
          </linearGradient>
          <pattern id="grid" width="40" height="40" patternUnits="userSpaceOnUse">
            <rect width="40" height="40" fill="none" stroke="url(#gridGradient)" strokeWidth="3" />
            <circle cx="0" cy="0" r="2" fill="url(#gridGradient)" />
          </pattern>
        </defs>
        <rect width="100%" height="100%" fill="url(#grid)" />
      </svg>

      <div className="absolute inset-0 -z-10 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-emerald-100/40 via-white/50 to-transparent" />

      <div className="absolute top-20 left-10 w-72 h-72 bg-emerald-500/5 rounded-full blur-3xl -z-10" />
      <div className="absolute bottom-20 right-10 w-96 h-96 bg-emerald-500/5 rounded-full blur-3xl -z-10" />

      <div className="container relative z-10">
        <div className="mx-auto max-w-4xl text-center space-y-8">
          <div className="inline-flex items-center gap-2 rounded-full border-2 border-emerald-500/30 bg-white/80 backdrop-blur-sm px-5 py-2.5 text-sm font-medium shadow-lg">
            <Sparkles className="h-4 w-4 text-emerald-600" />
            <span className="text-foreground font-semibold">Your Campus, Connected</span>
          </div>

          <h1 className="text-4xl font-bold tracking-tight text-balance sm:text-5xl md:text-6xl lg:text-7xl leading-tight">
            Growing{" "}
            <span className="text-emerald-600 relative inline-block">
              <span className="absolute inset-0 blur-2xl bg-emerald-500/20" />
              <span className="relative">KKWIEER's</span>
            </span>{" "}
            Ecosystem
          </h1>

          <p className="text-lg text-muted-foreground text-balance md:text-xl max-w-2xl mx-auto leading-relaxed">
            Discover Every Club at KKWIEER in One Place. ClubConn is your one-stop destination to explore, join, and
            engage with all student clubs and organizations.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-3 pt-4">
            <Button
              size="lg"
              className="w-full sm:w-auto bg-emerald-600 hover:bg-emerald-700 text-white shadow-xl hover:shadow-2xl hover:scale-105 transition-all duration-300"
              asChild
            >
              <Link href="/events">
                Explore Events
                <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
            <Button
              size="lg"
              variant="outline"
              className="w-full sm:w-auto bg-white/80 backdrop-blur-sm hover:bg-white border-2 border-gray-200 hover:border-emerald-500/50 shadow-lg hover:shadow-xl hover:scale-105 transition-all duration-300"
              asChild
            >
              <Link href="/communities">Join Communities</Link>
            </Button>
          </div>
        </div>
      </div>
    </section>
  )
}
