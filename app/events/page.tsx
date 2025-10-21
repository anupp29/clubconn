"use client"
import { Footer } from "@/components/footer"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import {
  Calendar,
  MapPin,
  Users,
  Code,
  Cpu,
  Palette,
  Rocket,
  Network,
  Globe,
  Sparkles,
  ExternalLink,
} from "lucide-react"
import Link from "next/link"

const EVENT_COLORS = {
  CSI: {
    primary: "rgb(59, 130, 246)", // Blue
    light: "rgba(59, 130, 246, 0.1)",
    glow: "rgba(59, 130, 246, 0.15)",
  },
  DEBUGGERS: {
    primary: "rgb(168, 85, 247)", // Purple
    light: "rgba(168, 85, 247, 0.1)",
    glow: "rgba(168, 85, 247, 0.15)",
  },
  DESOC: {
    primary: "rgb(249, 115, 22)", // Orange
    light: "rgba(249, 115, 22, 0.1)",
    glow: "rgba(249, 115, 22, 0.15)",
  },
  PHOENIX: {
    primary: "rgb(16, 185, 129)", // Emerald
    light: "rgba(16, 185, 129, 0.1)",
    glow: "rgba(16, 185, 129, 0.15)",
  },
  MIBCS: {
    primary: "rgb(139, 92, 246)", // Violet
    light: "rgba(139, 92, 246, 0.1)",
    glow: "rgba(139, 92, 246, 0.15)",
  },
  FOSS: {
    primary: "rgb(34, 197, 94)", // Green
    light: "rgba(34, 197, 94, 0.1)",
    glow: "rgba(34, 197, 94, 0.15)",
  },
}

export default function EventsPage() {
  const communityEvents = [
    {
      icon: Calendar,
      title: "Monthly Meetups",
      description:
        "Student clubs meet in-person on the second or last Saturday of every month, where members share their projects, learnings, and have open discussions about technology and innovation.",
    },
    {
      icon: Users,
      title: "Club Conferences",
      description:
        "Once a year, each club organizes an annual conference to celebrate achievements, showcase student projects, and bring together the campus tech community.",
    },
    {
      icon: Code,
      title: "Hackathons",
      description:
        "Intensive coding events where students collaboratively build projects, solve real-world problems, and compete for prizes while learning new technologies.",
    },
    {
      icon: Rocket,
      title: "Tech Workshops",
      description:
        "Hands-on learning sessions where students come together to explore new technologies, tools, and frameworks through practical demonstrations and guided projects.",
    },
  ]

  const upcomingEvents = [
    {
      tag: "CSI",
      club: "Computer Society of India",
      date: "15 Nov 2025",
      title: "CSI Tech Summit 2025",
      location: "KKWIEER Main Auditorium",
      attendees: 250,
      badge: "Must Attend",
      link: "/clubs/csi/techfest-2024",
      description:
        "Join us for the biggest tech event of the year! Featuring keynote speakers from Google, Microsoft, and Amazon, hands-on workshops on AI/ML, cloud computing, and web development, plus exciting coding competitions with prizes worth ₹50,000.",
    },
    {
      tag: "DEBUGGERS",
      club: "Debuggers' Club",
      date: "22 Nov 2025",
      title: "Code Debug Marathon",
      location: "Computer Lab A & B",
      attendees: 120,
      badge: "Featured",
      link: "/clubs/debuggers/equinox-2024",
      description:
        "24-hour intensive coding marathon where you'll tackle real-world debugging challenges. Work in teams to solve complex problems, learn advanced debugging techniques, and compete for exciting prizes. Free meals and refreshments provided!",
    },
    {
      tag: "DESOC",
      club: "Design & CS Society",
      date: "28 Nov 2025",
      title: "UI/UX Design Workshop",
      location: "Design Studio, Block C",
      attendees: 80,
      badge: "Must Attend",
      link: "/clubs/desoc/design-sprint-2024",
      description:
        "Master modern UI/UX design principles with industry experts from top design agencies. Learn Figma, Adobe XD, and prototyping tools. Create your own portfolio project and get personalized feedback from professional designers.",
    },
    {
      tag: "PHOENIX",
      club: "Phoenix Club (AIDS)",
      date: "05 Dec 2025",
      title: "AI & Data Science Symposium",
      location: "KKWIEER Auditorium",
      attendees: 300,
      badge: "Featured",
      link: "/clubs/phoenix/phoenix-codefest-2024",
      description:
        "Explore cutting-edge AI and data science technologies with expert speakers from IIT Bombay and leading tech companies. Hands-on workshops on machine learning, deep learning, and data visualization. Network with industry professionals and researchers.",
    },
    {
      tag: "MIBCS",
      club: "ML, IoT, Blockchain & CyberSec",
      date: "12 Dec 2025",
      title: "Blockchain & Security Hackathon",
      location: "Innovation Lab",
      attendees: 150,
      badge: "Must Attend",
      link: "/clubs/mibcs/data-science-summit-2024",
      description:
        "Build innovative blockchain solutions and tackle cybersecurity challenges in this 36-hour hackathon. Work on real-world problems, learn from security experts, and compete for prizes worth ₹1,00,000. Mentorship from industry professionals provided.",
    },
    {
      tag: "FOSS",
      club: "FOSS KKWIEER",
      date: "18 Dec 2025",
      title: "Open Source Contribution Drive",
      location: "Tech Hub, Block D",
      attendees: 200,
      badge: "Featured",
      link: "/clubs/foss/foss-meetup-2024",
      description:
        "Learn to contribute to open source projects and make your mark in the global developer community. Guided sessions on Git, GitHub, and open source best practices. Connect with maintainers of popular projects and start your open source journey.",
    },
    {
      tag: "CSI",
      club: "Computer Society of India",
      date: "10 Jan 2026",
      title: "CSI Monthly Meetup - January",
      location: "Seminar Hall 1",
      attendees: 100,
      badge: null,
      link: "/clubs/csi/c2c",
      description:
        "Monthly networking event featuring tech talks from CSI members, project showcases, and open discussions on latest technology trends. Great opportunity to connect with fellow tech enthusiasts and share your knowledge.",
    },
    {
      tag: "DESOC",
      club: "Design & CS Society",
      date: "17 Jan 2026",
      title: "Design Thinking Bootcamp",
      location: "Creative Space, Block B",
      attendees: 60,
      badge: "Featured",
      link: "/clubs/desoc/design-sprint-2024",
      description:
        "Intensive 3-day bootcamp on design thinking methodology and creative problem solving. Learn human-centered design, rapid prototyping, and user research techniques. Work on real client projects and build your design portfolio.",
    },
  ]

  const clubIcons: Record<string, any> = {
    CSI: Code,
    DEBUGGERS: Cpu,
    DESOC: Palette,
    PHOENIX: Rocket,
    MIBCS: Network,
    FOSS: Globe,
  }

  return (
    <main className="min-h-screen bg-background">
      {/* Hero Section */}
      <section className="relative overflow-hidden border-b border-border">
        <div className="absolute inset-0 bg-gradient-to-br from-emerald-500/3 via-background to-emerald-500/5" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,rgba(16,185,129,0.06),transparent_50%)]" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_80%,rgba(16,185,129,0.04),transparent_50%)]" />

        <div className="absolute top-20 left-10 w-72 h-72 bg-emerald-500/3 rounded-full blur-3xl" />
        <div className="absolute bottom-20 right-10 w-96 h-96 bg-emerald-500/4 rounded-full blur-3xl" />
        {/* </CHANGE> */}

        <div className="container relative py-20 md:py-28">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-6">
              <div className="inline-flex items-center gap-2 rounded-full border border-border bg-card/50 backdrop-blur-sm px-4 py-1.5 text-sm">
                <Sparkles className="h-4 w-4 text-primary" />
                <span className="text-muted-foreground">50+ Events This Year</span>
              </div>
              <h1 className="text-5xl md:text-6xl font-bold tracking-tight text-balance">Campus Events</h1>
              <p className="text-lg text-muted-foreground leading-relaxed max-w-xl">
                Discover exciting events from KKWIEER's vibrant club ecosystem. Join workshops, hackathons, and tech
                talks to grow your skills and network.
              </p>
              <Button size="lg" className="mt-4 shadow-lg hover:shadow-xl transition-shadow">
                <Calendar className="mr-2 h-5 w-5" />
                Browse All Events
              </Button>
            </div>
            <div className="relative hidden lg:block">
              <div className="absolute inset-0 bg-gradient-to-r from-primary/10 to-accent/10 rounded-3xl blur-3xl animate-pulse" />
              <div className="relative bg-card/80 backdrop-blur-sm border border-border rounded-2xl p-8 shadow-2xl">
                <div className="grid grid-cols-3 gap-4">
                  {[Code, Users, Calendar, Rocket, Network, Globe].map((Icon, i) => (
                    <div
                      key={i}
                      className="aspect-square rounded-xl bg-gradient-to-br from-primary/10 to-accent/10 flex items-center justify-center hover:scale-110 hover:rotate-6 transition-all duration-300 cursor-pointer"
                      style={{ animationDelay: `${i * 100}ms` }}
                    >
                      <Icon className="h-8 w-8 text-primary" />
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Community Events Section */}
      <section className="py-16 md:py-20">
        <div className="container">
          <div className="mb-12 space-y-4">
            <h2 className="text-3xl md:text-4xl font-bold">Community Events</h2>
            <p className="text-lg text-muted-foreground max-w-3xl leading-relaxed">
              We support various events encouraging the spirit of innovation and promoting technology across the campus.
            </p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {communityEvents.map((event, index) => {
              const Icon = event.icon
              return (
                <div
                  key={index}
                  className="group bg-card border border-border rounded-xl p-6 hover:border-emerald-500/50 hover:shadow-lg transition-all space-y-4"
                >
                  <div className="inline-flex items-center justify-center w-12 h-12 rounded-xl bg-emerald-500/10 text-emerald-600">
                    <Icon className="h-6 w-6" />
                  </div>
                  <h3 className="text-xl font-semibold">{event.title}</h3>
                  <p className="text-sm text-muted-foreground leading-relaxed">{event.description}</p>
                </div>
              )
            })}
          </div>
        </div>
      </section>

      {/* Active and Upcoming Events Section */}
      <section className="py-20 md:py-28">
        <div className="container">
          <div className="mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Upcoming Events</h2>
            <p className="text-lg text-muted-foreground max-w-3xl">
              Join the most exciting events from KKWIEER's top clubs and communities. Register now to secure your spot.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {upcomingEvents.map((event, index) => {
              const colors = EVENT_COLORS[event.tag as keyof typeof EVENT_COLORS]

              return (
                <Link key={index} href={event.link}>
                  <Card
                    className="group relative overflow-hidden hover:shadow-2xl hover:scale-[1.02] transition-all duration-500 border-border/50 h-full"
                    style={{
                      ["--brand-color" as string]: colors.primary,
                      ["--brand-light" as string]: colors.light,
                      ["--brand-glow" as string]: colors.glow,
                    }}
                  >
                    <div
                      className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
                      style={{
                        background: `radial-gradient(circle at center, ${colors.glow}, transparent 70%)`,
                        filter: "blur(40px)",
                      }}
                    />
                    {/* </CHANGE> */}

                    <div
                      className="h-1 w-full transition-all duration-500"
                      style={{
                        background: `linear-gradient(90deg, ${colors.light}, ${colors.primary}, ${colors.light})`,
                        opacity: 0.5,
                      }}
                    />

                    <CardContent className="p-6 relative">
                      <div className="space-y-4 relative">
                        <div className="flex items-start justify-between">
                          <div className="space-y-1">
                            <Badge
                              className="text-xs font-semibold border-0"
                              style={{
                                backgroundColor: colors.light,
                                color: colors.primary,
                              }}
                            >
                              {event.tag}
                            </Badge>
                            <p className="text-xs text-muted-foreground">{event.club}</p>
                          </div>
                          {event.badge && (
                            <Badge className="bg-gradient-to-r from-green-500 to-emerald-500 text-white border-0 text-xs">
                              {event.badge}
                            </Badge>
                          )}
                        </div>

                        <div className="flex items-center gap-2 text-sm text-muted-foreground">
                          <Calendar className="h-4 w-4" style={{ color: colors.primary }} />
                          <span className="font-medium">{event.date}</span>
                        </div>

                        <h3
                          className="font-bold text-xl leading-tight transition-all duration-500"
                          style={{ color: "inherit" }}
                        >
                          <span className="group-hover:hidden">{event.title}</span>
                          <span
                            className="hidden group-hover:inline transition-colors duration-500"
                            style={{ color: colors.primary }}
                          >
                            {event.title}
                          </span>
                        </h3>

                        <p className="text-sm text-muted-foreground line-clamp-2 leading-relaxed">
                          {event.description}
                        </p>

                        <div className="flex items-start gap-2 text-sm text-muted-foreground">
                          <MapPin className="h-4 w-4 mt-0.5 flex-shrink-0" style={{ color: colors.primary }} />
                          <span className="line-clamp-1">{event.location}</span>
                        </div>

                        <div className="flex items-center gap-2 pt-2">
                          <Users className="h-4 w-4" style={{ color: colors.primary }} />
                          <span className="font-semibold">{event.attendees}</span>
                          <span className="text-xs text-muted-foreground">attending</span>
                        </div>

                        <Button
                          variant="outline"
                          size="sm"
                          className="w-full transition-all duration-500 border-2 bg-transparent relative overflow-hidden"
                        >
                          <span
                            className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                            style={{ backgroundColor: colors.primary }}
                          />
                          <span className="relative z-10 flex items-center justify-center group-hover:text-white transition-colors duration-500">
                            View Event
                            <ExternalLink className="ml-2 h-3.5 w-3.5" />
                          </span>
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                </Link>
              )
            })}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 md:py-20 border-t border-border">
        <div className="container">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-6">
              <h2 className="text-3xl md:text-4xl font-bold text-balance">Explore events in your region!</h2>
              <p className="text-lg text-muted-foreground leading-relaxed">
                Follow a club community and explore club events in your locale!
              </p>
              <Button size="lg" className="bg-emerald-600 hover:bg-emerald-700 text-white">
                <Users className="mr-2 h-5 w-5" />
                Join a Community
              </Button>
            </div>
            <div className="relative hidden lg:block">
              <div className="bg-card border border-border rounded-2xl p-12 shadow-lg">
                <div className="flex items-center justify-center">
                  <Globe className="h-32 w-32 text-emerald-600" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  )
}
