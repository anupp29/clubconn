"use client"

import { Briefcase, Award, ArrowRight } from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import Link from "next/link"

const flagshipEvents = [
  {
    icon: Briefcase,
    title: "CampusToCorporate",
    description: "Internships for all students",
    details:
      "CampusToCorporate is an annual internship program that connects students with top companies for real-world experience.",
    link: "/events", // Updated to /events
    badge: "Flagship",
    gradient: "from-blue-500 to-cyan-500",
    stats: { participants: "500+", companies: "50+" },
  },
  {
    icon: Award,
    title: "TnP Industrial Training Program",
    description: "Industry-focused skill development",
    details:
      "The Training and Placement Industrial Training Program offers hands-on training in cutting-edge technologies and industry practices.",
    link: "/events", // Updated to /events
    badge: "Flagship",
    gradient: "from-purple-500 to-pink-500",
    stats: { participants: "400+", duration: "6 weeks" },
  },
]

export function FlagshipEvents() {
  return (
    <section className="py-16 md:py-24 bg-muted/30 relative overflow-hidden">
      <div className="absolute top-0 left-0 w-96 h-96 bg-primary/5 rounded-full blur-3xl" />
      <div className="absolute bottom-0 right-0 w-96 h-96 bg-accent/5 rounded-full blur-3xl" />

      <div className="container relative">
        <div className="mb-12 text-center">
          <h2 className="mb-4 text-3xl font-bold tracking-tight md:text-4xl">Flagship Events</h2>
          <p className="text-lg text-muted-foreground text-balance max-w-2xl mx-auto">
            Premier programs designed to accelerate your career growth
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl mx-auto">
          {flagshipEvents.map((event) => {
            const Icon = event.icon
            return (
              <Card
                key={event.title}
                className="group relative overflow-hidden border-2 hover:border-primary/50 transition-all duration-300 hover:shadow-2xl hover:scale-[1.02]"
              >
                <div className={`absolute top-0 left-0 right-0 h-1.5 bg-gradient-to-r ${event.gradient}`} />

                <CardContent className="p-8">
                  <div className="flex items-start justify-between mb-6">
                    <div
                      className={`inline-flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-to-br ${event.gradient} shadow-xl`}
                    >
                      <Icon className="h-8 w-8 text-white" />
                    </div>
                    <Badge className={`bg-gradient-to-r ${event.gradient} text-white border-0`}>{event.badge}</Badge>
                  </div>

                  <h3 className="mb-2 text-2xl font-bold group-hover:text-primary transition-colors">{event.title}</h3>
                  <p className="text-sm text-muted-foreground mb-4 font-medium">{event.description}</p>
                  <p className="text-muted-foreground leading-relaxed mb-6">{event.details}</p>

                  <div className="flex items-center gap-6 mb-6 pb-6 border-b border-border">
                    {Object.entries(event.stats).map(([key, value]) => (
                      <div key={key} className="flex flex-col">
                        <span className="text-2xl font-bold text-primary">{value}</span>
                        <span className="text-xs text-muted-foreground capitalize">{key}</span>
                      </div>
                    ))}
                  </div>

                  <Link
                    href={event.link}
                    className="inline-flex items-center gap-2 text-sm font-semibold text-primary hover:gap-3 transition-all group/link"
                  >
                    <span>Learn More</span>
                    <ArrowRight className="h-4 w-4" />
                  </Link>
                </CardContent>

                <div
                  className={`absolute inset-0 bg-gradient-to-br ${event.gradient} opacity-0 group-hover:opacity-5 transition-opacity duration-300 pointer-events-none`}
                />
              </Card>
            )
          })}
        </div>
      </div>
    </section>
  )
}
