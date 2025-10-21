"use client"

import { useParams } from "next/navigation"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Calendar, MapPin, Users, Globe, Github, Twitter, Linkedin, MessageCircle, Send, Building2 } from "lucide-react"
import Link from "next/link"
import Image from "next/image"

const COMMUNITY_COLORS = {
  "ml-nashik": {
    primary: "rgb(30, 64, 175)", // Deep Blue
    light: "rgba(30, 64, 175, 0.1)",
    glow: "rgba(30, 64, 175, 0.3)",
    shadow: "rgba(30, 64, 175, 0.5)",
  },
  "cyberx-nashik": {
    primary: "rgb(251, 191, 36)", // Bright Yellow
    light: "rgba(251, 191, 36, 0.1)",
    glow: "rgba(251, 191, 36, 0.3)",
    shadow: "rgba(251, 191, 36, 0.5)",
  },
  "foss-united-nashik": {
    primary: "rgb(34, 197, 94)", // Green
    light: "rgba(34, 197, 94, 0.1)",
    glow: "rgba(34, 197, 94, 0.3)",
    shadow: "rgba(34, 197, 94, 0.5)",
  },
  "flutter-nashik": {
    primary: "rgb(56, 189, 248)", // Light Blue
    light: "rgba(56, 189, 248, 0.1)",
    glow: "rgba(56, 189, 248, 0.3)",
    shadow: "rgba(56, 189, 248, 0.5)",
  },
  "react-nashik": {
    primary: "rgb(168, 85, 247)", // Purple
    light: "rgba(168, 85, 247, 0.1)",
    glow: "rgba(168, 85, 247, 0.3)",
    shadow: "rgba(168, 85, 247, 0.5)",
  },
  "pune-tech": {
    primary: "rgb(249, 115, 22)", // Orange
    light: "rgba(249, 115, 22, 0.1)",
    glow: "rgba(249, 115, 22, 0.3)",
    shadow: "rgba(249, 115, 22, 0.5)",
  },
}

const COMMUNITIES = [
  {
    community_id: "ml-nashik",
    slug: "ml-nashik",
    name: "ML Nashik",
    description: "Machine Learning community in Nashik focused on AI/ML research, workshops, and hands-on projects.",
    city: "Nashik",
    state: "Maharashtra",
    logo_url:
      "https://media.licdn.com/dms/image/v2/D560BAQG3mAm0WD6Zcw/company-logo_200_200/company-logo_200_200/0/1727876964114/mlnashik_logo?e=1762387200&v=beta&t=cHUlv9njn4jOIsaAXk__XhFDtbXygqogm4vX3WV-i3U",
    banner_url: "",
    total_members: 850,
    total_events: 24,
    is_active: true,
    linkedin: "https://www.linkedin.com/company/ml-nashik/",
    website: "",
    github: "",
    twitter: "",
    discord: "",
    telegram: "",
  },
  {
    community_id: "react-nashik",
    slug: "react-nashik",
    name: "React Nashik",
    description:
      "React.js developer community in Nashik. Learn modern web development with React, Next.js, and the latest frontend technologies.",
    city: "Nashik",
    state: "Maharashtra",
    logo_url:
      "https://media.licdn.com/dms/image/v2/D4D0BAQHTD-zBWGJcnA/company-logo_200_200/company-logo_200_200/0/1725172146439?e=1762387200&v=beta&t=ozlbqLlrmrLmToem1Oq5MrGFsC-HgL_dN5PSN5OUP4w",
    banner_url: "",
    total_members: 720,
    total_events: 18,
    is_active: true,
    linkedin: "https://www.linkedin.com/company/react-nashik/",
    website: "",
    github: "",
    twitter: "",
    discord: "",
    telegram: "",
  },
  {
    community_id: "flutter-nashik",
    slug: "flutter-nashik",
    name: "Flutter Nashik",
    description:
      "Flutter development community in Nashik. Build beautiful cross-platform mobile apps with Flutter and Dart.",
    city: "Nashik",
    state: "Maharashtra",
    logo_url:
      "https://media.licdn.com/dms/image/v2/C4D0BAQF0Wzgt0hwRJA/company-logo_200_200/company-logo_200_200/0/1678436815187?e=1762387200&v=beta&t=nsgxXcglhmLZY1ntSgMQ1LLLdwvgd3p-R3nYCTn4GCo",
    banner_url: "",
    total_members: 650,
    total_events: 15,
    is_active: true,
    linkedin: "https://www.linkedin.com/company/flutter-nashik/",
    website: "",
    github: "",
    twitter: "",
    discord: "",
    telegram: "",
  },
  {
    community_id: "foss-united-nashik",
    slug: "foss-united-nashik",
    name: "FOSS United Nashik",
    description:
      "Free and Open Source Software community in Nashik. Promoting FOSS culture and contributing to open source projects.",
    city: "Nashik",
    state: "Maharashtra",
    logo_url:
      "https://media.licdn.com/dms/image/v2/D560BAQGrUsDBAvre_A/img-crop_100/img-crop_100/0/1728063754718?e=1762387200&v=beta&t=-9Pr4tA0glI3eYhbtynsXUbpG4PEeYnhcj9gwWriCsU",
    banner_url: "",
    total_members: 920,
    total_events: 32,
    is_active: true,
    linkedin: "https://www.linkedin.com/company/foss-united-nashik/",
    website: "",
    github: "",
    twitter: "",
    discord: "",
    telegram: "",
  },
  {
    community_id: "cyberx-nashik",
    slug: "cyberx-nashik",
    name: "CyberX Nashik",
    description:
      "Cybersecurity community in Nashik focused on ethical hacking, penetration testing, and security research.",
    city: "Nashik",
    state: "Maharashtra",
    logo_url:
      "https://media.licdn.com/dms/image/v2/D4D0BAQHo2dgAJ16JsA/company-logo_200_200/B4DZWLOd6gHIAI-/0/1741797581907/cyberx_nashik_community_logo?e=1762387200&v=beta&t=UkVbL4eY8T-FsOBzSZwUaKEKRj6EkHmtEzjv5lj0eDk",
    banner_url: "",
    total_members: 580,
    total_events: 21,
    is_active: true,
    linkedin: "https://www.linkedin.com/company/cyberx-nashik/",
    website: "",
    github: "",
    twitter: "",
    discord: "",
    telegram: "",
  },
  {
    community_id: "pune-tech",
    slug: "pune-tech",
    name: "Pune Tech Community",
    description: "Largest tech community in Pune bringing together developers, designers, and entrepreneurs.",
    city: "Pune",
    state: "Maharashtra",
    logo_url: "/pune-tech-logo.jpg",
    banner_url: "",
    total_members: 2500,
    total_events: 48,
    is_active: true,
    linkedin: "",
    website: "",
    github: "",
    twitter: "",
    discord: "",
    telegram: "",
  },
]

export default function CityCommunitPage() {
  const params = useParams()
  const slug = params.slug as string

  const community = COMMUNITIES.find((c) => c.slug === slug)

  if (!community) {
    return (
      <main className="min-h-screen bg-background">
        <div className="container py-20 text-center">
          <h1 className="text-4xl font-bold mb-4">Community Not Found</h1>
          <p className="text-muted-foreground mb-8">The community you're looking for doesn't exist.</p>
          <Button asChild>
            <Link href="/communities">Browse Communities</Link>
          </Button>
        </div>
        <Footer />
      </main>
    )
  }

  const socialLinks = [
    { icon: Globe, label: "Website", url: community.website },
    { icon: Github, label: "GitHub", url: community.github },
    { icon: Twitter, label: "Twitter", url: community.twitter },
    { icon: Linkedin, label: "LinkedIn", url: community.linkedin },
    { icon: MessageCircle, label: "Discord", url: community.discord },
    { icon: Send, label: "Telegram", url: community.telegram },
  ].filter((link) => link.url)

  const upcomingEvents = [
    {
      date: "15 Nov 2025",
      title: `${community.name} Monthly Meetup`,
      location: `Tech Hub, ${community.city}`,
      badge: "Must Attend",
      time: "To be Announced",
      slug: "monthly-meetup-nov-2025",
    },
  ]

  const pastEvents = [
    {
      date: "27 Sep 2025",
      title: `${community.name} Conference 2025`,
      location: `${community.city} Convention Center`,
      organizer: "Tech Events Co.",
      slug: "conference-2025",
    },
    {
      date: "23 Aug 2025",
      title: "Workshop: Advanced Topics",
      location: "Innovation Hub",
      organizer: "Community Team",
      slug: "workshop-advanced-topics",
    },
    {
      date: "16 Jul 2025",
      title: "Summer Meetup 2025",
      location: `${community.city} Tech Park`,
      organizer: "Local Chapter",
      slug: "summer-meetup-2025",
    },
    {
      date: "24 May 2025",
      title: "Hackathon Weekend",
      location: "Startup Incubator",
      organizer: "Dev Community",
      slug: "hackathon-weekend",
    },
    {
      date: "26 Apr 2025",
      title: "April Meetup",
      location: "Co-working Space",
      organizer: "Organizers Team",
      slug: "april-meetup",
    },
    {
      date: "22 Mar 2025",
      title: "March Tech Talk",
      location: "University Campus",
      organizer: "Student Chapter",
      slug: "march-tech-talk",
    },
    {
      date: "23 Jan 2025",
      title: "New Year Kickoff",
      location: "Tech Center",
      organizer: "Core Team",
      slug: "new-year-kickoff",
    },
    {
      date: "20 Jan 2025",
      title: "January Meetup",
      location: `${community.city} Hub`,
      organizer: "Community Leaders",
      slug: "january-meetup",
    },
  ]

  const colors = COMMUNITY_COLORS[slug as keyof typeof COMMUNITY_COLORS] || COMMUNITY_COLORS["ml-nashik"]

  return (
    <main className="min-h-screen bg-background">
      <Header />

      <section className="relative overflow-hidden border-b border-border">
        <div className="absolute inset-0 bg-gradient-to-br from-primary/10 via-accent/5 to-background" />
        <div className="absolute top-20 left-10 w-80 h-80 bg-primary/5 rounded-full blur-3xl" />

        <div className="absolute inset-0 overflow-hidden">
          <svg
            className="absolute bottom-0 right-0 w-full h-full opacity-[0.05]"
            viewBox="0 0 1440 400"
            fill="none"
            preserveAspectRatio="xMaxYMax meet"
          >
            <g className="text-primary">
              <rect x="1200" y="120" width="60" height="280" fill="currentColor" opacity="0.4" />
              <rect x="1120" y="180" width="70" height="220" fill="currentColor" opacity="0.35" />
              <rect x="1030" y="150" width="80" height="250" fill="currentColor" opacity="0.4" />
              <rect x="940" y="200" width="75" height="200" fill="currentColor" opacity="0.3" />
              <rect x="850" y="170" width="80" height="230" fill="currentColor" opacity="0.35" />
            </g>
          </svg>
        </div>

        <div className="container relative py-12 md:py-16 lg:py-20">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-card/50 backdrop-blur-sm rounded-md border border-border mb-8">
            <div className="w-1.5 h-1.5 rounded-full bg-primary animate-pulse" />
            <span className="text-xs font-semibold tracking-wider uppercase text-muted-foreground">
              ClubConn Communities
            </span>
          </div>

          <div className="flex flex-col lg:flex-row items-start gap-8 lg:gap-12 mb-10">
            <div className="relative w-28 h-28 lg:w-32 lg:h-32 rounded-3xl overflow-hidden bg-white shadow-2xl flex-shrink-0 ring-4 ring-primary/10">
              <Image
                src={community.logo_url || "/placeholder.svg"}
                alt={community.name}
                fill
                className="object-contain p-3"
              />
            </div>

            <div className="flex-1">
              <h1 className="text-5xl md:text-6xl lg:text-7xl xl:text-8xl font-black mb-3 uppercase tracking-tighter leading-none bg-gradient-to-br from-foreground to-foreground/70 bg-clip-text text-transparent">
                {community.city}
              </h1>
              <p className="text-lg md:text-xl text-muted-foreground font-light">{community.name}</p>
            </div>
          </div>

          {socialLinks.length > 0 && (
            <div className="flex items-center gap-2.5">
              {socialLinks.map((link, index) => {
                const Icon = link.icon
                return (
                  <Link
                    key={index}
                    href={link.url!}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-11 h-11 rounded-xl bg-card/50 backdrop-blur-sm border border-border hover:bg-card hover:border-primary/50 hover:shadow-lg transition-all flex items-center justify-center group"
                    title={link.label}
                  >
                    <Icon className="h-5 w-5 text-muted-foreground group-hover:text-primary transition-colors" />
                  </Link>
                )
              })}
            </div>
          )}
        </div>
      </section>

      <section className="py-12 md:py-16 border-b">
        <div className="container max-w-4xl">
          <h2 className="text-2xl font-bold mb-4">About</h2>
          <p className="text-muted-foreground leading-relaxed">{community.description}</p>

          <div className="flex items-center gap-6 mt-6 text-sm text-muted-foreground">
            <div className="flex items-center gap-2">
              <Users className="h-4 w-4" />
              <span>{community.total_members.toLocaleString()} members</span>
            </div>
            <div className="flex items-center gap-2">
              <Calendar className="h-4 w-4" />
              <span>{community.total_events} events</span>
            </div>
            <div className="flex items-center gap-2">
              <MapPin className="h-4 w-4" />
              <span>
                {community.city}, {community.state}
              </span>
            </div>
          </div>
        </div>
      </section>

      <section className="py-12 md:py-16 border-b bg-muted/30">
        <div className="container max-w-6xl">
          <h2 className="text-2xl font-bold mb-6">Past Events</h2>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {pastEvents.map((event, index) => (
              <Link key={index} href={`/clubs/${slug}/${event.slug}`}>
                <Card
                  className="group relative overflow-hidden transition-all duration-500 hover:scale-[1.03] cursor-pointer"
                  style={{
                    ["--brand-color" as string]: colors.primary,
                    ["--brand-light" as string]: colors.light,
                    ["--brand-glow" as string]: colors.glow,
                    ["--brand-shadow" as string]: colors.shadow,
                  }}
                >
                  <div
                    className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
                    style={{
                      background: `linear-gradient(135deg, ${colors.light.replace("0.1", "0.05")}, transparent)`,
                    }}
                  />

                  <div
                    className="absolute -inset-1 opacity-0 group-hover:opacity-60 transition-opacity duration-500 blur-xl -z-10"
                    style={{
                      background: colors.glow.replace("0.3", "0.15"),
                    }}
                  />

                  <CardContent className="p-5 relative">
                    <Badge
                      className="font-medium mb-3 px-2.5 py-0.5 transition-all duration-500 bg-black text-white hover:bg-black/90"
                      style={{
                        backgroundColor: "black",
                      }}
                    >
                      <span className="group-hover:hidden">{community.city.toUpperCase()}</span>
                      <span
                        className="hidden group-hover:inline"
                        style={{
                          color: colors.primary,
                        }}
                      >
                        {community.city.toUpperCase()}
                      </span>
                    </Badge>

                    <div className="text-sm text-muted-foreground mb-2 group-hover:font-medium transition-all duration-300">
                      {event.date}
                    </div>

                    <h3 className="font-semibold mb-3 leading-tight line-clamp-2 transition-colors duration-500">
                      <span className="group-hover:hidden">{event.title}</span>
                      <span className="hidden group-hover:inline" style={{ color: colors.primary }}>
                        {event.title}
                      </span>
                    </h3>

                    <div className="space-y-1.5 text-xs text-muted-foreground">
                      <div className="flex items-center gap-1.5">
                        <MapPin className="h-3.5 w-3.5 flex-shrink-0" />
                        <span className="line-clamp-1">{event.location}</span>
                      </div>
                      <div className="flex items-center gap-1.5">
                        <Building2 className="h-3.5 w-3.5 flex-shrink-0" />
                        <span className="line-clamp-1">{event.organizer}</span>
                      </div>
                    </div>

                    <div
                      className="absolute bottom-0 left-0 h-1 w-0 group-hover:w-full transition-all duration-500"
                      style={{
                        backgroundColor: colors.primary,
                      }}
                    />
                  </CardContent>
                </Card>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <Footer />
    </main>
  )
}
