"use client"

import { Users, Sparkles, GraduationCap, ArrowRight } from "lucide-react"
import Link from "next/link"
import { Card } from "@/components/ui/card"

const programs = [
  {
    icon: Users,
    title: "City Communities",
    description: "Join local meetups, networking events, and collaborative projects in your city.",
    link: "/communities",
    stats: "12+ Communities",
  },
  {
    icon: Sparkles,
    title: "Student Clubs",
    description: "Explore clubs that promote student activities and events. Discover your passion.",
    link: "/clubs",
    stats: "50+ Active Clubs",
  },
  {
    icon: GraduationCap,
    title: "Departmental Activities",
    description: "Engage with department-specific initiatives and academic events.",
    link: "/events",
    stats: "100+ Events/Year",
  },
]

export function ProgramsSection() {
  return (
    <section className="py-24 bg-muted/30">
      <div className="container">
        <div className="mb-16 text-center max-w-2xl mx-auto">
          <h2 className="mb-4 text-4xl font-bold tracking-tight">Explore Programs</h2>
          <p className="text-lg text-muted-foreground">Discover diverse opportunities to connect, learn, and grow</p>
        </div>

        <div className="grid md:grid-cols-3 gap-6 max-w-5xl mx-auto">
          {programs.map((program) => {
            const Icon = program.icon
            return (
              <Link key={program.title} href={program.link}>
                <Card className="group p-8 h-full hover:shadow-lg transition-all hover:border-emerald-500/50">
                  <div className="space-y-4">
                    <div className="inline-flex h-12 w-12 items-center justify-center rounded-xl bg-emerald-500/10">
                      <Icon className="h-6 w-6 text-emerald-500" />
                    </div>

                    <div className="space-y-2">
                      <div className="text-sm font-medium text-emerald-500">{program.stats}</div>
                      <h3 className="text-xl font-bold group-hover:text-emerald-500 transition-colors">
                        {program.title}
                      </h3>
                      <p className="text-muted-foreground leading-relaxed">{program.description}</p>
                    </div>

                    <div className="flex items-center text-sm font-medium text-emerald-500 pt-2">
                      Explore
                      <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
                    </div>
                  </div>
                </Card>
              </Link>
            )
          })}
        </div>
      </div>
    </section>
  )
}
