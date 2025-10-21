"use client"

import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Calendar, MapPin, Users, ArrowRight } from "lucide-react"
import Link from "next/link"
import { Button } from "@/components/ui/button"

const events = [
  {
    club: "Computer Society of India",
    date: "15 Oct 2025",
    title: "AI & Machine Learning Workshop",
    location: "Computer Engineering Lab",
    attendees: 150,
    featured: true,
  },
  {
    club: "Debuggers' Club",
    date: "18 Oct 2025",
    title: "Hackathon 2025: Code Sprint",
    location: "Innovation Hub",
    attendees: 200,
    featured: true,
  },
  {
    club: "Design Society",
    date: "22 Oct 2025",
    title: "UI/UX Design Masterclass",
    location: "Design Studio",
    attendees: 80,
    featured: false,
  },
  {
    club: "Phoenix Club",
    date: "25 Oct 2025",
    title: "Data Science Summit",
    location: "Main Auditorium",
    attendees: 180,
    featured: true,
  },
]

export function UpcomingEvents() {
  return (
    <section className="py-24 bg-muted/30">
      <div className="container">
        <div className="mb-12 flex items-end justify-between">
          <div>
            <h2 className="mb-2 text-4xl font-bold tracking-tight">Upcoming Events</h2>
            <p className="text-lg text-muted-foreground">Join the most exciting events from KKWIEER's clubs</p>
          </div>
          <Link href="/events">
            <Button variant="outline">
              View All
              <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </Link>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {events.map((event, index) => (
            <Card key={index} className="group hover:shadow-lg transition-all hover:border-emerald-500/50">
              <CardContent className="p-6 space-y-4">
                <div className="flex items-start justify-between">
                  <Badge variant="outline" className="text-xs">
                    {event.club}
                  </Badge>
                  {event.featured && <Badge className="bg-emerald-500 text-white">Featured</Badge>}
                </div>

                <div className="space-y-2">
                  <div className="flex items-center gap-2 text-sm text-muted-foreground">
                    <Calendar className="h-4 w-4" />
                    <span>{event.date}</span>
                  </div>

                  <h3 className="font-bold text-lg leading-tight group-hover:text-emerald-500 transition-colors">
                    {event.title}
                  </h3>

                  <div className="flex items-center gap-2 text-sm text-muted-foreground">
                    <MapPin className="h-4 w-4 flex-shrink-0" />
                    <span className="line-clamp-1">{event.location}</span>
                  </div>
                </div>

                <div className="flex items-center gap-2 text-sm text-muted-foreground pt-4 border-t">
                  <Users className="h-4 w-4" />
                  <span>{event.attendees}+ attending</span>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
}
