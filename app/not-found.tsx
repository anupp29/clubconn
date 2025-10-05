import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Home, Search } from "lucide-react"

export default function NotFound() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-background via-background to-emerald-500/5 p-4">
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#8080800a_1px,transparent_1px),linear-gradient(to_bottom,#8080800a_1px,transparent_1px)] bg-[size:14px_24px]" />

      <div className="relative z-10 text-center max-w-2xl mx-auto">
        {/* 404 Animation */}
        <div className="mb-8">
          <h1 className="text-[150px] md:text-[200px] font-bold leading-none bg-gradient-to-br from-emerald-500 to-emerald-600 bg-clip-text text-transparent">
            404
          </h1>
        </div>

        {/* Error Message */}
        <div className="space-y-4 mb-8">
          <h2 className="text-3xl md:text-4xl font-bold">Page Not Found</h2>
          <p className="text-lg text-muted-foreground max-w-md mx-auto">
            Oops! The page you're looking for seems to have wandered off. Let's get you back on track.
          </p>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
          <Button asChild size="lg" className="bg-emerald-500 hover:bg-emerald-600 min-w-[200px]">
            <Link href="/">
              <Home className="h-5 w-5 mr-2" />
              Go Home
            </Link>
          </Button>
          <Button asChild size="lg" variant="outline" className="min-w-[200px] bg-transparent">
            <Link href="/events">
              <Search className="h-5 w-5 mr-2" />
              Browse Events
            </Link>
          </Button>
        </div>

        {/* Additional Links */}
        <div className="mt-12 pt-8 border-t">
          <p className="text-sm text-muted-foreground mb-4">Looking for something specific?</p>
          <div className="flex flex-wrap gap-4 justify-center">
            <Link href="/clubs" className="text-sm text-emerald-500 hover:underline">
              Clubs
            </Link>
            <Link href="/communities" className="text-sm text-emerald-500 hover:underline">
              Communities
            </Link>
            <Link href="/dashboard" className="text-sm text-emerald-500 hover:underline">
              Dashboard
            </Link>
            <Link href="/vision" className="text-sm text-emerald-500 hover:underline">
              Our Vision
            </Link>
          </div>
        </div>

        {/* Fun Element */}
        <div className="mt-12">
          <p className="text-xs text-muted-foreground italic">
            "Not all who wander are lost... but this page definitely is."
          </p>
        </div>
      </div>
    </div>
  )
}
