"use client"
import { Footer } from "@/components/footer"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import Image from "next/image"
import {
  Code2,
  Users,
  Trophy,
  CheckCircle2,
  Linkedin,
  Instagram,
  Calendar,
  Award,
  Sparkles,
  ExternalLink,
} from "lucide-react"

const CLUB_COLORS = {
  csi: {
    primary: "rgb(59, 130, 246)", // Blue
    light: "rgba(59, 130, 246, 0.1)",
    glow: "rgba(59, 130, 246, 0.3)",
  },
  debuggers: {
    primary: "rgb(168, 85, 247)", // Purple
    light: "rgba(168, 85, 247, 0.1)",
    glow: "rgba(168, 85, 247, 0.3)",
  },
  desoc: {
    primary: "rgb(249, 115, 22)", // Orange
    light: "rgba(249, 115, 22, 0.1)",
    glow: "rgba(249, 115, 22, 0.3)",
  },
  phoenix: {
    primary: "rgb(16, 185, 129)", // Emerald
    light: "rgba(16, 185, 129, 0.1)",
    glow: "rgba(16, 185, 129, 0.3)",
  },
  mibcs: {
    primary: "rgb(139, 92, 246)", // Violet
    light: "rgba(139, 92, 246, 0.1)",
    glow: "rgba(139, 92, 246, 0.3)",
  },
  mesa: {
    primary: "rgb(234, 88, 12)", // Orange-red
    light: "rgba(234, 88, 12, 0.1)",
    glow: "rgba(234, 88, 12, 0.3)",
  },
  foss: {
    primary: "rgb(34, 197, 94)", // Green
    light: "rgba(34, 197, 94, 0.1)",
    glow: "rgba(34, 197, 94, 0.3)",
  },
  iste: {
    primary: "rgb(236, 72, 153)", // Pink
    light: "rgba(236, 72, 153, 0.1)",
    glow: "rgba(236, 72, 153, 0.3)",
  },
}

const clubs = [
  {
    id: "csi",
    name: "Computer Society of India",
    shortName: "CSI",
    logo: "https://media.licdn.com/dms/image/v2/D560BAQH1ZZdNzAfyxA/company-logo_100_100/B56ZiXY4IWHMAU-/0/1754886539197/csi_kkwieer_logo?e=1762387200&v=beta&t=gYuZHd1gC94yXf0tJhTZisDrJJl_uvTnLUDHyCZPv3k",
    mission: "Empowering students through technology and innovation, fostering a platform where ideas meet execution.",
    activities: [
      "Workshops and seminars on emerging technologies",
      "Collaborations with industry experts",
      "Participation in national and regional CSI events",
    ],
    linkedin: "https://in.linkedin.com/company/csi-kkwieer",
    instagram: "https://www.instagram.com/csi_kkwieer/",
    stats: {
      participants: 250,
      events: 24,
      teamSize: 15,
    },
  },
  {
    id: "debuggers",
    name: "Debuggers' Club",
    shortName: "Debuggers",
    logo: "https://media.licdn.com/dms/image/v2/C4D0BAQEF8RJes9ghBw/company-logo_200_200/company-logo_200_200/0/1670586536703?e=1762387200&v=beta&t=AimcngHaejppK7cQS00GhtGCU5bF8st9SOeaL6_ppPM",
    mission:
      "Providing a platform for students to showcase their talents, focusing on both technical and non-technical events.",
    activities: [
      "Organizing seminars, workshops, and guest lectures",
      'Hosting annual technical events like "Equinox" since 2007',
      "Conducting industrial visits and day celebrations",
    ],
    linkedin: "https://in.linkedin.com/company/debuggers-club-kkwieer",
    instagram: "https://www.instagram.com/debuggersclub/",
    stats: {
      participants: 320,
      events: 18,
      teamSize: 12,
    },
  },
  {
    id: "desoc",
    name: "DESOC",
    shortName: "DESOC",
    logo: "https://media.licdn.com/dms/image/v2/D4D03AQEw2mbHXhRKAg/profile-displayphoto-shrink_100_100/profile-displayphoto-shrink_100_100/0/1710820747705?e=1762387200&v=beta&t=IiAKyLeuTtGRgVS3rwHhiqOVvGiYkVNySSXSziKAeWg",
    mission:
      "Empowering students to combine creativity with technology through hands-on projects, workshops, and competitions.",
    activities: [
      "Hosting design and coding challenges",
      "Organizing workshops on UI/UX and graphic design",
      "Collaborations with tech and design communities",
    ],
    linkedin: "https://www.linkedin.com/company/desoc-kkwieer",
    instagram: "https://www.instagram.com/desoc.kkwieer/",
    stats: {
      participants: 180,
      events: 15,
      teamSize: 10,
    },
  },
  {
    id: "phoenix",
    name: "Phoenix Club",
    shortName: "Phoenix",
    logo: "https://media.licdn.com/dms/image/v2/D4D0BAQEc8uYXrvdKrQ/company-logo_100_100/company-logo_100_100/0/1728374269111?e=1762387200&v=beta&t=OhmrWWcQldgSfJtLMkkN--5hZ2zwweDzgyJ9jRXb6JA",
    mission: "Focused on Artificial Intelligence and Data Science, aiming to revolutionize the tech landscape.",
    activities: [
      "Conducting AI/DS workshops and hackathons",
      'Organizing competitions like "Prompt Quest"',
      "Collaborations with AI research communities",
    ],
    linkedin: "https://www.linkedin.com/company/phoenix-club-kkwieer",
    instagram: "https://www.instagram.com/phoenix_kkw/",
    stats: {
      participants: 200,
      events: 12,
      teamSize: 8,
    },
  },
  {
    id: "mibcs",
    name: "MIBCS",
    shortName: "MIBCS",
    logo: "https://media.licdn.com/dms/image/v2/C4E0BAQG7rzLov7ysxw/company-logo_200_200/company-logo_200_200/0/1644348176661?e=1762387200&v=beta&t=o1uHh1yA7mWrbt1CRScqRuL0rl9ib_HuczN2NO4el-o",
    mission:
      "Formed under the Innovation Centre, MIBCS focuses on emerging technologies like Machine Learning, IoT, Blockchain, and Cyber Security.",
    activities: [
      "Organizing workshops on ML, IoT, and Cyber Security",
      "Hosting blockchain development sessions",
      "Collaborations with tech innovators and startups",
    ],
    linkedin: "https://in.linkedin.com/company/mibcs-kkwieer",
    instagram: "https://www.instagram.com/mibcs_kkw/",
    stats: {
      participants: 150,
      events: 10,
      teamSize: 9,
    },
  },
  {
    id: "mesa",
    name: "MESA",
    shortName: "MESA",
    logo: "https://media.licdn.com/dms/image/v2/D4D0BAQFNGUBNFutEFw/company-logo_200_200/company-logo_200_200/0/1694096670884?e=1762387200&v=beta&t=hzNot28zSeV7jYQIK_QBxkkLhiyrWPEIrd_Wh2WdzY8",
    mission: "Representing mechanical engineering students, MESA focuses on academic and extracurricular activities.",
    activities: [
      "Organizing technical workshops and seminars",
      "Conducting industrial visits and guest lectures",
      "Participating in inter-college competitions",
    ],
    instagram: "https://www.instagram.com/mesa_kkwieer/",
    stats: {
      participants: 140,
      events: 14,
      teamSize: 11,
    },
  },
  {
    id: "foss",
    name: "FOSS Club",
    shortName: "FOSS",
    logo: "https://media.licdn.com/dms/image/v2/D4D0BAQHVFE_EClm9xw/img-crop_100/B4DZlHrNNPIgAM-/0/1757844133467?e=1762387200&v=beta&t=lhmvYcKkVYRNvSSxF3lgp_F4wjC0n2a_Oo89CVHP2Bg",
    mission:
      "Promoting Free and Open Source Software culture among students through events, workshops, and networking.",
    activities: [
      "Hosting workshops on open-source tools like Docker",
      "Organizing hackathons and coding challenges",
      "Collaborations with FOSS United and other communities",
    ],
    linkedin: "https://www.linkedin.com/company/foss-club-kkwieer",
    instagram: "https://www.instagram.com/foss_kkwieer/",
    stats: {
      participants: 190,
      events: 16,
      teamSize: 10,
    },
  },
  {
    id: "iste",
    name: "ISTE",
    shortName: "ISTE",
    logo: "https://media.licdn.com/dms/image/v2/D4D0BAQGGPJSuDfFlHg/company-logo_200_200/company-logo_200_200/0/1736951134455?e=1762387200&v=beta&t=R5_bJ-8U0hyvcp7n2DyW8yFRGuHxdCGkGJgJ1Nj9rEw",
    mission: "A non-profit society dedicated to fostering quality education in engineering and technology.",
    activities: [
      "Organizing workshops, seminars, and conferences",
      "Conducting faculty development programs",
      "Promoting student and faculty exchange programs",
    ],
    linkedin: "https://www.linkedin.com/company/iste-kkwieer",
    instagram: "https://www.instagram.com/iste_kkwieer/",
    stats: {
      participants: 280,
      events: 20,
      teamSize: 14,
    },
  },
]

const benefits = [
  {
    icon: Users,
    title: "Build a Community",
    description: "Connect with like-minded students and create lasting professional relationships.",
  },
  {
    icon: Code2,
    title: "Host Events and Workshops",
    description: "Organize technical workshops, seminars, and hands-on learning sessions.",
  },
  {
    icon: Trophy,
    title: "Build and Maintain Teams",
    description: "Develop leadership skills and collaborate on innovative projects.",
  },
]

const support = [
  {
    title: "Expert Speakers",
    description: "Access to industry professionals and experienced mentors for lectures and guidance.",
  },
  {
    title: "Educational Resources",
    description: "Curated learning materials and resources to support your technical growth.",
  },
  {
    title: "Mentorship",
    description: "Direct access to mentors for guidance and assistance in projects.",
  },
  {
    title: "Funding Support",
    description: "Financial aid for organizing events and additional support for club activities.",
  },
]

export default function ClubsPage() {
  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <section className="relative overflow-hidden border-b border-border">
        <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-accent/5 to-background" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,rgba(120,119,198,0.1),transparent_50%)]" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_80%,rgba(74,222,128,0.1),transparent_50%)]" />

        <div className="absolute top-20 left-10 w-72 h-72 bg-primary/5 rounded-full blur-3xl animate-pulse" />
        <div className="absolute bottom-20 right-10 w-96 h-96 bg-accent/5 rounded-full blur-3xl animate-pulse delay-1000" />

        <div className="container relative py-20 md:py-28">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-6">
              <div className="inline-flex items-center gap-2 rounded-full border border-border bg-card/50 backdrop-blur-sm px-4 py-1.5 text-sm">
                <Sparkles className="h-4 w-4 text-primary" />
                <span className="text-muted-foreground">8 Active Student Clubs</span>
              </div>

              <h1 className="text-5xl md:text-6xl font-bold tracking-tight text-balance">Student Clubs</h1>

              <p className="text-lg text-muted-foreground leading-relaxed max-w-xl">
                Join our vibrant community of student clubs promoting innovation, collaboration, and technical
                excellence through events, workshops, and networking.
              </p>

              <div className="flex flex-col sm:flex-row items-start gap-3 pt-2">
                <Button size="lg" className="w-full sm:w-auto shadow-lg hover:shadow-xl transition-shadow" asChild>
                  <Link href="/events">
                    <Calendar className="mr-2 h-5 w-5" />
                    Upcoming Events
                  </Link>
                </Button>
                <Button size="lg" variant="outline" className="w-full sm:w-auto bg-transparent" asChild>
                  <Link href="#clubs">
                    <Users className="mr-2 h-5 w-5" />
                    View All Clubs
                  </Link>
                </Button>
              </div>
            </div>

            <div className="relative hidden lg:block">
              <div className="absolute inset-0 bg-gradient-to-r from-primary/10 to-accent/10 rounded-3xl blur-3xl animate-pulse" />
              <div className="relative bg-card/80 backdrop-blur-sm border border-border rounded-2xl p-8 shadow-2xl">
                <div className="grid grid-cols-3 gap-4">
                  {[Code2, Users, Trophy, Calendar, Award, Sparkles].map((Icon, i) => (
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

      {/* Benefits Section */}
      <section className="border-b border-border py-16 md:py-20">
        <div className="container">
          <div className="grid gap-8 sm:grid-cols-2 md:grid-cols-3">
            {benefits.map((benefit) => (
              <div key={benefit.title} className="flex flex-col items-center text-center space-y-3">
                <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-emerald-500/10">
                  <benefit.icon className="h-6 w-6 text-emerald-600" />
                </div>
                <h3 className="text-lg font-semibold">{benefit.title}</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">{benefit.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Support Section */}
      <section className="border-b border-border py-16 md:py-20">
        <div className="container">
          <h2 className="mb-12 text-center text-3xl font-bold">Support from KKWIEER</h2>
          <div className="mx-auto grid max-w-4xl gap-6 sm:grid-cols-2">
            {support.map((item) => (
              <div key={item.title} className="flex gap-3">
                <CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0 text-emerald-600" />
                <div>
                  <h3 className="mb-1 font-semibold">{item.title}</h3>
                  <p className="text-sm text-muted-foreground leading-relaxed">{item.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Active Clubs Section */}
      <section id="clubs" className="py-20 md:py-28">
        <div className="container">
          <div className="mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Active Clubs</h2>
            <p className="text-lg text-muted-foreground max-w-3xl">
              Explore KKWIEER's diverse student clubs. Each club offers unique opportunities for learning, networking,
              and personal growth.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {clubs.map((club) => {
              const colors = CLUB_COLORS[club.id as keyof typeof CLUB_COLORS]

              return (
                <Link key={club.id} href={`/clubs/${club.id}`}>
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
                              src={club.logo || "/placeholder.svg"}
                              alt={club.name}
                              fill
                              className="object-contain p-2"
                            />
                          </div>
                        </div>

                        {/* Club Name and Badge */}
                        <div className="space-y-2">
                          <div className="flex items-center justify-center gap-2 flex-wrap">
                            <h3
                              className="font-bold text-xl leading-tight transition-all duration-500"
                              style={{ color: "inherit" }}
                            >
                              <span className="group-hover:hidden">{club.name}</span>
                              <span
                                className="hidden group-hover:inline transition-colors duration-500"
                                style={{ color: colors.primary }}
                              >
                                {club.name}
                              </span>
                            </h3>
                            <Badge className="bg-gradient-to-r from-green-500 to-emerald-500 text-white border-0 text-xs">
                              Active
                            </Badge>
                          </div>
                        </div>

                        {/* Mission */}
                        <p className="text-sm text-muted-foreground line-clamp-3 leading-relaxed">{club.mission}</p>

                        {/* Social Links */}
                        <div className="flex items-center justify-center gap-2">
                          {club.linkedin && (
                            <div
                              className="flex h-8 w-8 items-center justify-center rounded-lg bg-muted hover:scale-110 transition-all duration-300"
                              style={{
                                backgroundColor: colors.light,
                              }}
                            >
                              <Linkedin className="h-4 w-4" style={{ color: colors.primary }} />
                            </div>
                          )}
                          {club.instagram && (
                            <div
                              className="flex h-8 w-8 items-center justify-center rounded-lg bg-muted hover:scale-110 transition-all duration-300"
                              style={{
                                backgroundColor: colors.light,
                              }}
                            >
                              <Instagram className="h-4 w-4" style={{ color: colors.primary }} />
                            </div>
                          )}
                        </div>

                        {/* Stats */}
                        <div className="flex items-center justify-center gap-6 pt-2">
                          <div className="flex items-center gap-1.5">
                            <Users className="h-4 w-4" style={{ color: colors.primary }} />
                            <span className="font-semibold">{club.stats.participants}</span>
                            <span className="text-xs text-muted-foreground">members</span>
                          </div>

                          <div className="h-4 w-px bg-border" />

                          <div className="flex items-center gap-1.5">
                            <Calendar className="h-4 w-4" style={{ color: colors.primary }} />
                            <span className="font-semibold">{club.stats.events}</span>
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
                            View Club
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

      <Footer />
    </div>
  )
}
