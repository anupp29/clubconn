"use client"

import { Briefcase, Award, ArrowRight } from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import Link from "next/link"

const flagshipEvents = [
  {
    icon: Briefcase,
    title: "CampusToCorporate",
    description: "Annual internship program connecting students with top companies for real-world experience.",
    link: "/events",
    stats: { participants: "500+", companies: "50+" },
  },
  {
    icon: Award,
    title: "TnP Industrial Training",
    description: "Hands-on training in cutting-edge technologies and industry practices.",
    link: "/events",
    stats: { participants: "400+", duration: "6 weeks" },
  },
]

export function FlagshipEvents() {
  return (
    <section className="py-24">
      <div className="container">
        <div className="mb-12 text-center max-w-2xl mx-auto">
          <h2 className="mb-4 text-4xl font-bold tracking-tight">Flagship Programs</h2>
          <p className="text-lg text-muted-foreground">Premier programs designed to accelerate your career growth</p>
        </div>

        <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
          {flagshipEvents.map((event) => {
            const Icon = event.icon
            return (
              <Card key={event.title} className="group hover:shadow-lg transition-all hover:border-emerald-500/50">
                <CardContent className="p-8 space-y-6">
                  <div className="flex items-start justify-between">
                    <div className="inline-flex h-14 w-14 items-center justify-center rounded-2xl bg-emerald-500/10">
                      <Icon className="h-7 w-7 text-emerald-500" />
                    </div>
                    <Badge className="bg-emerald-500 text-white">Flagship</Badge>
                  </div>

                  <div className="space-y-3">
                    <h3 className="text-2xl font-bold group-hover:text-emerald-500 transition-colors">{event.title}</h3>
                    <p className="text-muted-foreground leading-relaxed">{event.description}</p>
                  </div>

                  <div className="flex gap-8 pt-4 border-t">
                    {Object.entries(event.stats).map(([key, value]) => (
                      <div key={key}>
                        <div className="text-2xl font-bold text-emerald-500">{value}</div>
                        <div className="text-xs text-muted-foreground capitalize">{key}</div>
                      </div>
                    ))}
                  </div>

                  <Link href={event.link} className="inline-flex items-center text-sm font-medium text-emerald-500">
                    Learn More
                    <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
                  </Link>
                </CardContent>
              </Card>
            )
          })}
        </div>
      </div>
    </section>
  )
}
