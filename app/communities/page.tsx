"use client"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { MapPin, Users, Calendar, ExternalLink, Sparkles, Globe, Network, Code, Rocket } from "lucide-react"
import Link from "next/link"
import Image from "next/image"

const COMMUNITY_COLORS = {
  "ml-nashik": {
    primary: "rgb(16, 185, 129)", // Emerald
    light: "rgba(16, 185, 129, 0.1)",
    glow: "rgba(16, 185, 129, 0.3)",
  },
  "cyberx-nashik": {
    primary: "rgb(16, 185, 129)", // Emerald
    light: "rgba(16, 185, 129, 0.1)",
    glow: "rgba(16, 185, 129, 0.3)",
  },
  "foss-united-nashik": {
    primary: "rgb(16, 185, 129)", // Emerald
    light: "rgba(16, 185, 129, 0.1)",
    glow: "rgba(16, 185, 129, 0.3)",
  },
  "flutter-nashik": {
    primary: "rgb(16, 185, 129)", // Emerald
    light: "rgba(16, 185, 129, 0.1)",
    glow: "rgba(16, 185, 129, 0.3)",
  },
  "react-nashik": {
    primary: "rgb(16, 185, 129)", // Emerald
    light: "rgba(16, 185, 129, 0.1)",
    glow: "rgba(16, 185, 129, 0.3)",
  },
  "pune-tech": {
    primary: "rgb(16, 185, 129)", // Emerald
    light: "rgba(16, 185, 129, 0.1)",
    glow: "rgba(16, 185, 129, 0.3)",
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
      "Free and Open Source Software community in Nashik. Promoting FOSS culture, contributing to open source projects.",
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

export default function CommunitiesPage() {
  return (
    <main className="min-h-screen bg-background">
      <section className="relative overflow-hidden border-b border-border">
        <div className="absolute inset-0 bg-gradient-to-br from-emerald-500/5 via-background to-background" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(16,185,129,0.1),transparent_50%)]" />

        <div className="absolute top-20 left-10 w-72 h-72 bg-emerald-500/5 rounded-full blur-3xl" />
        <div className="absolute bottom-20 right-10 w-96 h-96 bg-emerald-500/5 rounded-full blur-3xl" />

        <div className="container relative py-20 md:py-28">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-6">
              <div className="inline-flex items-center gap-2 rounded-full border border-border bg-card/50 backdrop-blur-sm px-4 py-1.5 text-sm">
                <Sparkles className="h-4 w-4 text-emerald-500" />
                <span className="text-muted-foreground">Join 5,000+ Tech Enthusiasts</span>
              </div>
              <h1 className="text-5xl md:text-6xl font-bold tracking-tight text-balance">Tech Communities</h1>
              <p className="text-lg text-muted-foreground leading-relaxed max-w-xl">
                Connect with passionate developers, attend amazing events, and grow your skills with vibrant tech
                communities across Maharashtra. Find your tribe and build together.
              </p>
              <Button size="lg" className="mt-4 shadow-lg hover:shadow-xl transition-shadow">
                <Globe className="mr-2 h-5 w-5" />
                Explore Communities
              </Button>
            </div>
            <div className="relative hidden lg:block">
              <div className="absolute inset-0 bg-emerald-500/10 rounded-3xl blur-3xl" />
              <div className="relative bg-card/80 backdrop-blur-sm border border-border rounded-2xl p-8 shadow-2xl">
                <div className="grid grid-cols-3 gap-4">
                  {[Globe, Network, Code, Users, Rocket, Sparkles].map((Icon, i) => (
                    <div
                      key={i}
                      className="aspect-square rounded-xl bg-emerald-500/10 flex items-center justify-center hover:scale-110 hover:rotate-6 transition-all duration-300 cursor-pointer"
                    >
                      <Icon className="h-8 w-8 text-emerald-500" />
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="py-20 md:py-28">
        <div className="container">
          <div className="mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Active Communities</h2>
            <p className="text-lg text-muted-foreground max-w-3xl">
              Discover thriving tech communities in your city. Join meetups, workshops, and connect with like-minded
              developers.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {COMMUNITIES.map((community) => {
              const colors = COMMUNITY_COLORS[community.slug as keyof typeof COMMUNITY_COLORS]

              return (
                <Link key={community.community_id} href={`/c/${community.slug}`}>
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
                        background: `linear-gradient(135deg, ${colors.glow}, transparent, ${colors.glow})`,
                        filter: "blur(20px)",
                      }}
                    />

                    <div
                      className="h-1 w-full transition-all duration-500"
                      style={{
                        background: `linear-gradient(90deg, ${colors.light}, ${colors.primary}, ${colors.light})`,
                        opacity: 0.5,
                      }}
                    />

                    <CardContent className="p-6 text-center relative">
                      <div
                        className="absolute top-6 left-1/2 -translate-x-1/2 w-24 h-24 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-500 blur-2xl"
                        style={{ backgroundColor: colors.glow }}
                      />

                      <div className="space-y-4 relative">
                        {/* Centered Logo */}
                        <div className="flex justify-center">
                          <div
                            className="relative w-20 h-20 rounded-2xl overflow-hidden shadow-lg bg-white group-hover:scale-110 group-hover:shadow-2xl transition-all duration-500"
                            style={{
                              borderWidth: "2px",
                              borderColor: "transparent",
                              borderStyle: "solid",
                            }}
                          >
                            <div
                              className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                              style={{
                                borderWidth: "2px",
                                borderColor: colors.primary,
                                borderStyle: "solid",
                                borderRadius: "1rem",
                              }}
                            />
                            <Image
                              src={community.logo_url || "/placeholder.svg"}
                              alt={community.name}
                              fill
                              className="object-contain p-2"
                            />
                          </div>
                        </div>

                        {/* Community Name and Badge */}
                        <div className="space-y-2">
                          <div className="flex items-center justify-center gap-2 flex-wrap">
                            <h3
                              className="font-bold text-xl leading-tight transition-all duration-500"
                              style={{
                                color: "inherit",
                              }}
                            >
                              <span className="group-hover:hidden">{community.name}</span>
                              <span
                                className="hidden group-hover:inline transition-colors duration-500"
                                style={{ color: colors.primary }}
                              >
                                {community.name}
                              </span>
                            </h3>
                            {community.is_active && (
                              <Badge className="bg-emerald-500 text-white border-0 text-xs">Active</Badge>
                            )}
                          </div>

                          {/* Location */}
                          <div className="flex items-center justify-center gap-1.5 text-sm text-muted-foreground">
                            <MapPin className="h-3.5 w-3.5" />
                            <span>
                              {community.city}, {community.state}
                            </span>
                          </div>
                        </div>

                        {/* Description */}
                        <p className="text-sm text-muted-foreground line-clamp-2 leading-relaxed">
                          {community.description}
                        </p>

                        {/* Stats */}
                        <div className="flex items-center justify-center gap-6 pt-2">
                          <div className="flex items-center gap-1.5">
                            <Users
                              className="h-4 w-4 transition-colors duration-500"
                              style={{
                                color: "hsl(var(--primary))",
                              }}
                            />
                            <span className="font-semibold">{community.total_members.toLocaleString()}</span>
                            <span className="text-xs text-muted-foreground">members</span>
                          </div>

                          <div className="h-4 w-px bg-border" />

                          <div className="flex items-center gap-1.5">
                            <Calendar
                              className="h-4 w-4 transition-colors duration-500"
                              style={{
                                color: "hsl(var(--primary))",
                              }}
                            />
                            <span className="font-semibold">{community.total_events}</span>
                            <span className="text-xs text-muted-foreground">events</span>
                          </div>
                        </div>

                        {/* CTA Button */}
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
                            View Community
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
    </main>
  )
}
