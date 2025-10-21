import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Calendar, MapPin, Users, Code, Rocket, Network, Globe, Sparkles } from "lucide-react"
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
      link: "/clubs/desoc/design-sprint-2024",
    },
  ]

  return (
    <main className="min-h-screen bg-background">
      {/* Hero Section */}
      <section className="relative overflow-hidden border-b border-border bg-background">
        <div className="absolute inset-0 -z-10 bg-[linear-gradient(to_right,#8080800a_1px,transparent_1px),linear-gradient(to_bottom,#8080800a_1px,transparent_1px)] bg-[size:24px_24px]" />
        <div className="absolute inset-0 -z-10 bg-gradient-to-b from-emerald-500/5 via-transparent to-transparent" />

        <div className="container py-16 sm:py-20 md:py-24 lg:py-32">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-6">
              <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold tracking-tight text-balance leading-tight">
                Events
              </h1>
              <p className="text-lg text-muted-foreground leading-relaxed max-w-xl">
                We conduct various events encouraging the spirit of innovation and promoting technology across the
                campus. Join us in building the future.
              </p>
              <Button size="lg" className="bg-emerald-600 hover:bg-emerald-700 text-white">
                Explore Events
              </Button>
            </div>
            <div className="relative hidden lg:block">
              <div className="bg-card border border-border rounded-2xl p-8 shadow-lg">
                <div className="grid grid-cols-3 gap-4">
                  {[Code, Users, Calendar, Rocket, Network, Globe].map((Icon, i) => (
                    <div
                      key={i}
                      className="aspect-square rounded-xl bg-emerald-500/10 flex items-center justify-center hover:bg-emerald-500/20 transition-colors"
                    >
                      <Icon className="h-8 w-8 text-emerald-600" />
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
      <section className="py-16 md:py-20 bg-muted/30">
        <div className="container">
          <div className="mb-12 text-center space-y-4">
            <div className="inline-flex items-center gap-2 rounded-full border border-emerald-500/20 bg-emerald-500/5 px-4 py-2 text-sm font-medium">
              <Sparkles className="h-4 w-4 text-emerald-600" />
              <span className="text-foreground">Happening Now</span>
            </div>
            <h2 className="text-3xl md:text-4xl font-bold tracking-tight text-balance">
              Active and <span className="text-emerald-600">Upcoming Events</span>
            </h2>
            <p className="text-lg text-muted-foreground text-balance max-w-2xl mx-auto leading-relaxed">
              Join the most exciting events from KKWIEER's top clubs and communities
            </p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {upcomingEvents.map((event, index) => (
              <Link key={index} href={event.link} className="block">
                <Card className="group relative overflow-hidden hover:shadow-lg hover:border-emerald-500/50 transition-all border-border/50 h-full">
                  <div className="h-1 w-full bg-emerald-600" />

                  <CardContent className="p-6 space-y-4">
                    <div className="flex items-start justify-between">
                      <div className="space-y-2">
                        <Badge variant="outline" className="text-xs font-semibold">
                          {event.tag}
                        </Badge>
                        <span className="text-xs text-muted-foreground block">{event.club}</span>
                      </div>
                      {event.badge && <Badge className="bg-emerald-600 text-white border-0">{event.badge}</Badge>}
                    </div>

                    <div className="flex items-center gap-2 text-sm text-muted-foreground">
                      <Calendar className="h-4 w-4" />
                      <span className="font-medium">{event.date}</span>
                    </div>

                    <h3 className="font-bold text-lg leading-tight group-hover:text-emerald-600 transition-colors">
                      {event.title}
                    </h3>

                    <div className="flex items-start gap-2 text-sm text-muted-foreground">
                      <MapPin className="h-4 w-4 mt-0.5 flex-shrink-0" />
                      <span className="line-clamp-2">{event.location}</span>
                    </div>
                  </CardContent>
                </Card>
              </Link>
            ))}
          </div>

          <div className="mt-12 text-center space-y-4">
            <p className="text-muted-foreground">Don't see your club's event?</p>
            <Button size="lg" className="bg-emerald-600 hover:bg-emerald-700 text-white" asChild>
              <Link href="/dashboard">
                <Sparkles className="mr-2 h-4 w-4" />
                Submit Your Event
              </Link>
            </Button>
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
    </main>
  )
}
