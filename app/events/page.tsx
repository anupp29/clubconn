import { Footer } from "@/components/footer"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Calendar, MapPin, Users, Code, Cpu, Palette, Rocket, Network, Globe, Sparkles } from "lucide-react"
import Link from "next/link"

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
      location: "KKWIEER Campus",
      attendees: 250,
      badge: "Must Attend",
      color: "from-blue-500 to-cyan-500",
      link: "/clubs/csi/techfest-2024",
    },
    {
      tag: "DEBUGGERS",
      club: "Debuggers' Club",
      date: "22 Nov 2025",
      title: "Code Debug Marathon",
      location: "Computer Lab A",
      attendees: 120,
      badge: null,
      color: "from-purple-500 to-pink-500",
      link: "/clubs/debuggers/equinox-2024",
    },
    {
      tag: "DESOC",
      club: "Design & CS Society",
      date: "28 Nov 2025",
      title: "UI/UX Design Workshop",
      location: "Design Studio",
      attendees: 80,
      badge: "Must Attend",
      color: "from-orange-500 to-red-500",
      link: "/clubs/desoc/design-sprint-2024",
    },
    {
      tag: "PHOENIX",
      club: "Phoenix Club (AIDS)",
      date: "05 Dec 2025",
      title: "AI & Data Science Symposium",
      location: "Auditorium",
      attendees: 300,
      badge: "Featured",
      color: "from-emerald-500 to-teal-500",
      link: "/clubs/phoenix/phoenix-codefest-2024",
    },
    {
      tag: "MIBCS",
      club: "ML, IoT, Blockchain & CyberSec",
      date: "12 Dec 2025",
      title: "Blockchain & Security Hackathon",
      location: "Innovation Lab",
      attendees: 150,
      badge: "Must Attend",
      color: "from-violet-500 to-purple-500",
      link: "/clubs/mibcs/data-science-summit-2024",
    },
    {
      tag: "FOSS",
      club: "FOSS KKWIEER",
      date: "18 Dec 2025",
      title: "Open Source Contribution Drive",
      location: "Tech Hub",
      attendees: 200,
      badge: "Featured",
      color: "from-green-500 to-emerald-500",
      link: "/clubs/foss/foss-meetup-2024",
    },
    {
      tag: "CSI",
      club: "Computer Society of India",
      date: "10 Jan 2026",
      title: "CSI Monthly Meetup - January",
      location: "Seminar Hall",
      attendees: 100,
      badge: null,
      color: "from-blue-500 to-cyan-500",
      link: "/clubs/csi/c2c",
    },
    {
      tag: "DESOC",
      club: "Design & CS Society",
      date: "17 Jan 2026",
      title: "Design Thinking Bootcamp",
      location: "Creative Space",
      attendees: 60,
      badge: "Featured",
      color: "from-orange-500 to-red-500",
      link: "/clubs/desoc/design-sprint-2024",
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
        {/* Animated gradient background */}
        <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-accent/5 to-background" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,rgba(120,119,198,0.1),transparent_50%)]" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_80%,rgba(74,222,128,0.1),transparent_50%)]" />

        {/* Floating decorative elements */}
        <div className="absolute top-20 left-10 w-72 h-72 bg-primary/5 rounded-full blur-3xl animate-pulse" />
        <div className="absolute bottom-20 right-10 w-96 h-96 bg-accent/5 rounded-full blur-3xl animate-pulse delay-1000" />

        <div className="container relative py-20 md:py-28">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-6">
              <h1 className="text-5xl md:text-6xl font-bold tracking-tight text-balance">Events</h1>
              <p className="text-lg text-muted-foreground leading-relaxed max-w-xl">
                We conduct various events encouraging the spirit of innovation and promoting technology across the
                campus. Monthly club meetups, tech conferences, and hackathons - join us in building the future.
              </p>
              <Button size="lg" className="mt-4 shadow-lg hover:shadow-xl transition-shadow">
                Explore Events
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
      <section className="py-20 md:py-28">
        <div className="container">
          <div className="mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Community Events</h2>
            <p className="text-lg text-muted-foreground max-w-3xl">
              We support various events encouraging the spirit of innovation and promoting technology across the campus.
              The ClubConn communities in different departments build their own niches by hosting events that foster the
              spirit of clubs.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {communityEvents.map((event, index) => {
              const Icon = event.icon
              return (
                <div
                  key={index}
                  className="group relative bg-card border border-border rounded-xl p-6 hover:shadow-lg transition-all duration-300 hover:-translate-y-1"
                >
                  <div className="mb-4 inline-flex items-center justify-center w-12 h-12 rounded-lg bg-primary/10 text-primary group-hover:bg-primary group-hover:text-primary-foreground transition-colors">
                    <Icon className="h-6 w-6" />
                  </div>
                  <h3 className="text-xl font-semibold mb-3">{event.title}</h3>
                  <p className="text-sm text-muted-foreground leading-relaxed">{event.description}</p>
                </div>
              )
            })}
          </div>
        </div>
      </section>

      {/* Active and Upcoming Events Section */}
      <section className="py-20 md:py-28 bg-muted/30">
        <div className="container">
          <div className="mb-16 text-center">
            <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-border bg-muted px-4 py-1.5 text-sm">
              <Sparkles className="h-4 w-4 text-primary" />
              <span className="text-muted-foreground">Happening Now</span>
            </div>
            <h2 className="mb-4 text-4xl font-bold tracking-tight text-balance md:text-5xl">
              Active and <span className="text-primary">Upcoming Events</span>
            </h2>
            <p className="text-lg text-muted-foreground text-balance max-w-2xl mx-auto leading-relaxed">
              Join the most exciting events from KKWIEER's top clubs and communities
            </p>
            <Link
              href="#"
              className="mt-6 inline-flex items-center text-sm font-medium text-primary hover:underline transition-all"
            >
              View all Events →
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {upcomingEvents.map((event, index) => (
              <Link key={index} href={event.link} className="block">
                <Card className="group relative overflow-hidden hover:shadow-2xl hover:scale-[1.02] transition-all duration-300 border-border/50 hover:border-primary/50 h-full">
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

                    <div
                      className={`absolute inset-0 bg-gradient-to-br ${event.color} opacity-0 group-hover:opacity-5 transition-opacity duration-300 pointer-events-none`}
                    />
                  </CardContent>
                </Card>
              </Link>
            ))}
          </div>

          <div className="mt-16 text-center">
            <p className="text-muted-foreground mb-4">Don't see your club's event?</p>
            <Button size="lg" asChild className="shadow-lg hover:scale-105 transition-all">
              <Link href="/dashboard">
                <Sparkles className="mr-2 h-4 w-4" />
                Submit Your Event
              </Link>
            </Button>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 md:py-28 border-t border-border">
        <div className="container">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-6">
              <h2 className="text-4xl md:text-5xl font-bold text-balance">Explore events in your region!</h2>
              <p className="text-lg text-muted-foreground">
                Follow a club community and explore club events in your locale!
              </p>
              <Button size="lg" className="mt-4">
                <Users className="mr-2 h-5 w-5" />
                Join a Community
              </Button>
            </div>
            <div className="relative hidden lg:block">
              <div className="absolute inset-0 bg-gradient-to-r from-primary/20 to-accent/20 rounded-3xl blur-3xl animate-pulse" />
              <div className="relative bg-card border border-border rounded-2xl p-12 shadow-xl">
                <div className="flex items-center justify-center">
                  <div className="relative">
                    <div className="absolute inset-0 bg-primary/20 rounded-full blur-2xl animate-pulse" />
                    <Globe className="relative h-32 w-32 text-primary" />
                  </div>
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
