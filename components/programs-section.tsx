"use client"

import { Users, Sparkles, GraduationCap } from "lucide-react"
import Link from "next/link"

const programs = [
  {
    icon: Users,
    title: "City Communities",
    description:
      "Join a community of city and take part in local meetups, networking events, and collaborative projects.",
    link: "/communities", // Updated to /communities
    gradient: "from-emerald-500 to-teal-500",
    stats: "12+ Communities",
  },
  {
    icon: Sparkles,
    title: "Clubs",
    description:
      "Explore clubs that promotes student clubs, events, and activities. Discover your passion and connect with peers.",
    link: "/clubs", // Updated to /clubs
    gradient: "from-amber-500 to-orange-500",
    stats: "50+ Active Clubs",
  },
  {
    icon: GraduationCap,
    title: "Departmental Activities",
    description:
      "Engage with department-specific initiatives, workshops, and academic events tailored to your field of study.",
    link: "/events", // Updated to /events
    gradient: "from-indigo-500 to-blue-500",
    stats: "100+ Events/Year",
  },
]

export function ProgramsSection() {
  return (
    <section id="programs" className="py-16 md:py-24 relative overflow-hidden">
      <div className="absolute inset-0 bg-grid-pattern opacity-5" />
      <div className="absolute top-1/2 left-0 w-72 h-72 bg-primary/10 rounded-full blur-3xl" />
      <div className="absolute top-1/4 right-0 w-72 h-72 bg-blue-500/10 rounded-full blur-3xl" />

      <div className="container relative z-10">
        <div className="mb-16 text-center max-w-3xl mx-auto">
          <h2 className="mb-4 text-3xl font-bold tracking-tight md:text-5xl bg-gradient-to-r from-foreground to-foreground/70 bg-clip-text text-transparent">
            Programs
          </h2>
          <p className="text-lg text-muted-foreground">
            Explore diverse opportunities to connect, learn, and grow within the KKWIEER ecosystem
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {programs.map((program, index) => {
            const Icon = program.icon
            return (
              <div key={program.title} className="group relative" style={{ animationDelay: `${index * 150}ms` }}>
                {/* Animated gradient border */}
                <div
                  className={`absolute -inset-0.5 bg-gradient-to-r ${program.gradient} rounded-3xl opacity-0 group-hover:opacity-100 transition-all duration-500 blur group-hover:blur-md`}
                />

                {/* Card content */}
                <div className="relative bg-card border border-border rounded-3xl p-8 h-full transition-all duration-500 group-hover:scale-[1.02] group-hover:shadow-2xl overflow-hidden">
                  {/* Background decoration */}
                  <div
                    className={`absolute top-0 right-0 w-32 h-32 bg-gradient-to-br ${program.gradient} opacity-5 rounded-full -mr-16 -mt-16 group-hover:scale-150 transition-transform duration-700`}
                  />

                  {/* Icon with animated gradient */}
                  <div className="relative mb-6">
                    <div
                      className={`inline-flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-to-r ${program.gradient} text-white shadow-lg group-hover:shadow-xl group-hover:scale-110 transition-all duration-300`}
                    >
                      <Icon className="h-8 w-8" />
                    </div>
                  </div>

                  {/* Stats badge */}
                  <div className="mb-4">
                    <span
                      className={`inline-block px-3 py-1 text-xs font-semibold rounded-full bg-gradient-to-r ${program.gradient} text-white`}
                    >
                      {program.stats}
                    </span>
                  </div>

                  {/* Content */}
                  <div className="space-y-4 relative">
                    <h3 className="text-2xl font-bold group-hover:text-primary transition-colors">{program.title}</h3>
                    <p className="text-muted-foreground leading-relaxed">{program.description}</p>
                  </div>

                  <Link
                    href={program.link}
                    className="mt-6 inline-flex items-center text-sm font-semibold text-primary group-hover:gap-2 transition-all"
                  >
                    <span>Explore More</span>
                    <svg
                      className="ml-1 h-4 w-4 group-hover:translate-x-1 transition-transform"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                    </svg>
                  </Link>

                  {/* Bottom gradient line */}
                  <div
                    className={`absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r ${program.gradient} transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left`}
                  />
                </div>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
