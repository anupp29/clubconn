"use client"

import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Calendar, MapPin, Users, Sparkles } from "lucide-react"
import Link from "next/link"

const events = [
  {
    tag: "CSI",
    club: "Computer Society of India",
    date: "15 Oct 2025",
    title: "AI & Machine Learning Workshop",
    location: "Computer Engineering Lab, Block A",
    badge: "Must Attend",
    attendees: 150,
    color: "from-blue-500 to-cyan-500",
  },
  {
    tag: "DEBUGGERS",
    club: "Debuggers' Club",
    date: "18 Oct 2025",
    title: "Hackathon 2025: Code Sprint",
    location: "Innovation Hub, KKWIEER",
    badge: "Featured",
    attendees: 200,
    color: "from-purple-500 to-pink-500",
  },
  {
    tag: "DESOC",
    club: "Design & Development Society",
    date: "22 Oct 2025",
    title: "UI/UX Design Masterclass",
    location: "Design Studio, Block C",
    badge: null,
    attendees: 80,
    color: "from-orange-500 to-red-500",
  },
  {
    tag: "PHOENIX",
    club: "Phoenix Club (AIDS)",
    date: "25 Oct 2025",
    title: "Data Science & Analytics Summit",
    location: "Auditorium, Main Campus",
    badge: "Must Attend",
    attendees: 180,
    color: "from-emerald-500 to-teal-500",
  },
  {
    tag: "MIBCS",
    club: "ML, IoT, Blockchain & CyberSec",
    date: "28 Oct 2025",
    title: "Blockchain & Web3 Workshop",
    location: "Tech Lab, Block B",
    badge: "Featured",
    attendees: 120,
    color: "from-violet-500 to-purple-500",
  },
  {
    tag: "FOSS",
    club: "FOSS KKWIEER",
    date: "02 Nov 2025",
    title: "Open Source Contribution Drive",
    location: "Computer Lab, Block A",
    badge: "Must Attend",
    attendees: 160,
    color: "from-green-500 to-emerald-500",
  },
  {
    tag: "CSI",
    club: "Computer Society of India",
    date: "05 Nov 2025",
    title: "Cloud Computing Bootcamp",
    location: "Innovation Center",
    badge: null,
    attendees: 90,
    color: "from-blue-500 to-cyan-500",
  },
  {
    tag: "MIBCS",
    club: "ML, IoT, Blockchain & CyberSec",
    date: "10 Nov 2025",
    title: "IoT & Smart Systems Expo",
    location: "Exhibition Hall, KKWIEER",
    badge: "Featured",
    attendees: 140,
    color: "from-violet-500 to-purple-500",
  },
]

export function UpcomingEvents() {
  return (
    <section id="events" className="relative py-20 md:py-32 overflow-hidden">
      <div className="absolute inset-0 -z-10 bg-gradient-to-b from-primary/5 via-transparent to-transparent" />
      <div className="absolute inset-0 -z-10 bg-[linear-gradient(to_right,#8080800a_1px,transparent_1px),linear-gradient(to_bottom,#8080800a_1px,transparent_1px)] bg-[size:14px_24px]" />

      <div className="container mx-auto px-4">
        <div className="mb-16 text-center">
          <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-border bg-muted px-4 py-1.5 text-sm">
            <Sparkles className="h-4 w-4 text-primary" />
            <span className="text-muted-foreground">Happening Now</span>
          </div>
          <h2 className="mb-4 text-4xl font-bold tracking-tight text-balance md:text-5xl lg:text-6xl">
            Active and <span className="text-primary">Upcoming Events</span>
          </h2>
          <p className="text-lg text-muted-foreground text-balance max-w-2xl mx-auto leading-relaxed">
            Join the most exciting events from KKWIEER's top clubs and communities
          </p>
          <Link
            href="/events"
            className="mt-6 inline-flex items-center text-sm font-medium text-primary hover:underline transition-all"
          >
            View all Events →
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {events.map((event, index) => (
            <Card
              key={index}
              className="group relative overflow-hidden hover:shadow-2xl hover:scale-[1.02] transition-all duration-300 border-border/50 hover:border-primary/50"
            >
              <div className={`h-1 w-full bg-gradient-to-r ${event.color}`} />

              <CardContent className="p-6">
                <div className="flex items-start justify-between mb-4">
                  <div className="flex flex-col gap-2">
                    <Badge variant="outline" className="text-xs font-semibold w-fit">
                      {event.tag}
                    </Badge>
                    <span className="text-xs text-muted-foreground">{event.club}</span>
                  </div>
                  {event.badge && (
                    <Badge className={`bg-gradient-to-r ${event.color} text-white border-0 shadow-lg`}>
                      {event.badge}
                    </Badge>
                  )}
                </div>

                <div className="flex items-center gap-2 text-sm text-muted-foreground mb-3">
                  <Calendar className="h-4 w-4" />
                  <span className="font-medium">{event.date}</span>
                </div>

                <h3 className="font-bold mb-3 text-lg leading-tight group-hover:text-primary transition-colors">
                  {event.title}
                </h3>

                <div className="flex items-start gap-2 text-sm text-muted-foreground mb-4">
                  <MapPin className="h-4 w-4 mt-0.5 flex-shrink-0" />
                  <span className="line-clamp-2">{event.location}</span>
                </div>

                <div className="flex items-center gap-2 text-sm text-muted-foreground pt-4 border-t border-border">
                  <Users className="h-4 w-4" />
                  <span className="font-medium">{event.attendees}+ attending</span>
                </div>

                <div
                  className={`absolute inset-0 bg-gradient-to-br ${event.color} opacity-0 group-hover:opacity-5 transition-opacity duration-300 pointer-events-none`}
                />
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="mt-16 text-center">
          <p className="text-muted-foreground mb-4">Don't see your club's event?</p>
          <Link 
            href="/dashboard"
            className="inline-flex items-center gap-2 rounded-lg bg-primary px-6 py-3 text-sm font-semibold text-primary-foreground hover:bg-primary/90 transition-all hover:scale-105 shadow-lg"
          >
            Submit Your Event
            <Sparkles className="h-4 w-4" />
          </Link>
        </div>
      </div>
    </section>
  )
}
