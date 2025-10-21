"use client"

import { Button } from "@/components/ui/button"
import { ArrowRight, Sparkles } from "lucide-react"
import Link from "next/link"

export function Hero() {
  return (
    <section className="relative overflow-hidden bg-gradient-to-br from-gray-50 via-white to-emerald-50/30 py-20 sm:py-24 md:py-28 lg:py-32">
      <svg className="absolute inset-0 -z-10 h-full w-full" xmlns="http://www.w3.org/2000/svg">
        <defs>
          {/* Radial gradient for perfect depth from center to edges */}
          <radialGradient id="gridGradientRadial" cx="50%" cy="50%">
            <stop offset="0%" stopColor="rgba(0,0,0,0.12)" />
            <stop offset="60%" stopColor="rgba(0,0,0,0.22)" />
            <stop offset="100%" stopColor="rgba(0,0,0,0.35)" />
          </radialGradient>

          {/* Mobile-optimized grid pattern - smaller spacing */}
          <pattern id="gridMobile" width="35" height="35" patternUnits="userSpaceOnUse">
            <rect width="35" height="35" fill="none" stroke="url(#gridGradientRadial)" strokeWidth="2" />
            <circle cx="0" cy="0" r="2" fill="url(#gridGradientRadial)" opacity="0.7" />
            <circle cx="0" cy="0" r="1.2" fill="rgba(16,185,129,0.25)" />
          </pattern>

          {/* Desktop grid pattern - larger spacing */}
          <pattern id="gridDesktop" width="50" height="50" patternUnits="userSpaceOnUse">
            <rect width="50" height="50" fill="none" stroke="url(#gridGradientRadial)" strokeWidth="2.5" />
            <circle cx="0" cy="0" r="2.5" fill="url(#gridGradientRadial)" opacity="0.8" />
            <circle cx="0" cy="0" r="1.5" fill="rgba(16,185,129,0.3)" />
          </pattern>
        </defs>
        {/* Use mobile grid on small screens, desktop grid on larger screens */}
        <rect width="100%" height="100%" fill="url(#gridMobile)" className="sm:hidden" />
        <rect width="100%" height="100%" fill="url(#gridDesktop)" className="hidden sm:block" />
      </svg>

      <div className="absolute inset-0 -z-10 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-emerald-100/40 via-white/50 to-transparent" />

      <div className="absolute top-10 left-5 w-48 h-48 sm:top-20 sm:left-10 sm:w-72 sm:h-72 bg-emerald-500/5 rounded-full blur-3xl -z-10" />
      <div className="absolute bottom-10 right-5 w-56 h-56 sm:bottom-20 sm:right-10 sm:w-96 sm:h-96 bg-emerald-500/5 rounded-full blur-3xl -z-10" />

      <div className="container relative z-10 px-4 sm:px-6">
        <div className="mx-auto max-w-4xl text-center space-y-6 sm:space-y-8">
          <div className="inline-flex items-center gap-2 rounded-full border-2 border-emerald-500/30 bg-white/90 backdrop-blur-sm px-4 py-2 sm:px-5 sm:py-2.5 text-xs sm:text-sm font-medium shadow-lg">
            <Sparkles className="h-3.5 w-3.5 sm:h-4 sm:w-4 text-emerald-600" />
            <span className="text-foreground font-semibold">Your Campus, Connected</span>
          </div>

          <h1 className="text-4xl font-bold tracking-tight text-balance sm:text-5xl md:text-6xl lg:text-7xl leading-[1.15] sm:leading-tight">
            Growing{" "}
            <span className="text-emerald-600 relative inline-block">
              <span className="absolute inset-0 blur-xl sm:blur-2xl bg-emerald-500/20" />
              <span className="relative">KKWIEER's</span>
            </span>{" "}
            Ecosystem
          </h1>

          <p className="text-base sm:text-lg text-muted-foreground text-balance md:text-xl max-w-2xl mx-auto leading-relaxed px-2 sm:px-0">
            Discover Every Club at KKWIEER in One Place. ClubConn is your one-stop destination to explore, join, and
            engage with all student clubs and organizations.
          </p>

          <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-center gap-3 pt-2 sm:pt-4 px-2 sm:px-0">
            <Button
              size="lg"
              className="w-full sm:w-auto min-h-[48px] bg-emerald-600 hover:bg-emerald-700 text-white shadow-xl hover:shadow-2xl hover:scale-105 transition-all duration-300 text-base font-semibold"
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
              className="w-full sm:w-auto min-h-[48px] bg-white/90 backdrop-blur-sm hover:bg-white border-2 border-gray-200 hover:border-emerald-500/50 shadow-lg hover:shadow-xl hover:scale-105 transition-all duration-300 text-base font-semibold"
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
