import Link from "next/link"
import { Button } from "@/components/ui/button"
import {
  Code2,
  Users,
  Trophy,
  CheckCircle2,
  Linkedin,
  Instagram,
  Calendar,
  UserCircle,
  Award,
  Sparkles,
} from "lucide-react"

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
      <section className="relative overflow-hidden border-b border-border bg-background">
        <div className="absolute inset-0 -z-10 bg-[linear-gradient(to_right,#8080800a_1px,transparent_1px),linear-gradient(to_bottom,#8080800a_1px,transparent_1px)] bg-[size:24px_24px]" />
        <div className="absolute inset-0 -z-10 bg-gradient-to-b from-emerald-500/5 via-transparent to-transparent" />

        <div className="container py-16 sm:py-20 md:py-24 lg:py-32">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-6">
              <div className="inline-flex items-center gap-2 rounded-full border border-emerald-500/20 bg-emerald-500/5 px-4 py-2 text-sm font-medium">
                <Sparkles className="h-4 w-4 text-emerald-600" />
                <span className="text-foreground">8 Active Student Clubs</span>
              </div>

              <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold tracking-tight text-balance leading-tight">
                KKWIEER Student <span className="text-emerald-600">Clubs</span>
              </h1>

              <p className="text-lg text-muted-foreground leading-relaxed max-w-xl">
                Join our vibrant community of student clubs promoting innovation, collaboration, and technical
                excellence through events, workshops, and networking.
              </p>

              <div className="flex flex-col sm:flex-row items-start gap-3 pt-2">
                <Button size="lg" className="w-full sm:w-auto bg-emerald-600 hover:bg-emerald-700 text-white" asChild>
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
              <div className="bg-card border border-border rounded-2xl p-8 shadow-lg">
                <div className="grid grid-cols-3 gap-4">
                  {[Code2, Users, Trophy, Calendar, Award, Sparkles].map((Icon, i) => (
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
      <section id="clubs" className="py-16 md:py-20">
        <div className="container">
          <h2 className="mb-12 text-3xl font-bold">Active Clubs</h2>
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {clubs.map((club) => (
              <Link
                key={club.id}
                href={`/clubs/${club.id}`}
                className="group relative overflow-hidden rounded-xl border border-border bg-card transition-all hover:border-emerald-500/50 hover:shadow-lg"
              >
                <div className="p-6 space-y-4">
                  <div className="inline-flex items-center gap-1.5 rounded-full bg-emerald-500/10 px-3 py-1 text-xs font-medium text-emerald-600">
                    <Award className="h-3 w-3" />
                    ACTIVE CLUB
                  </div>

                  {/* Club Logo */}
                  <div className="flex h-16 w-16 items-center justify-center overflow-hidden rounded-xl bg-muted ring-1 ring-border">
                    <div
                      className="h-full w-full bg-cover bg-center"
                      style={{ backgroundImage: `url(${club.logo})` }}
                    />
                  </div>

                  {/* Club Name */}
                  <h3 className="text-xl font-bold group-hover:text-emerald-600 transition-colors">{club.name}</h3>

                  {/* Mission */}
                  <p className="text-sm text-muted-foreground line-clamp-3 leading-relaxed">{club.mission}</p>

                  {/* Social Links */}
                  <div className="flex gap-2">
                    {club.linkedin && (
                      <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-muted hover:bg-emerald-500/10 hover:text-emerald-600 transition-colors">
                        <Linkedin className="h-4 w-4" />
                      </div>
                    )}
                    {club.instagram && (
                      <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-muted hover:bg-emerald-500/10 hover:text-emerald-600 transition-colors">
                        <Instagram className="h-4 w-4" />
                      </div>
                    )}
                  </div>

                  {/* Stats */}
                  <div className="grid grid-cols-3 gap-4 border-t border-border pt-4">
                    <div className="text-center">
                      <div className="mb-1 flex items-center justify-center gap-1 text-xs text-muted-foreground">
                        <UserCircle className="h-3 w-3" />
                      </div>
                      <div className="text-lg font-bold">{club.stats.participants}</div>
                      <div className="text-xs text-muted-foreground">Members</div>
                    </div>
                    <div className="text-center">
                      <div className="mb-1 flex items-center justify-center gap-1 text-xs text-muted-foreground">
                        <Calendar className="h-3 w-3" />
                      </div>
                      <div className="text-lg font-bold">{club.stats.events}</div>
                      <div className="text-xs text-muted-foreground">Events</div>
                    </div>
                    <div className="text-center">
                      <div className="mb-1 flex items-center justify-center gap-1 text-xs text-muted-foreground">
                        <Users className="h-3 w-3" />
                      </div>
                      <div className="text-lg font-bold">{club.stats.teamSize}</div>
                      <div className="text-xs text-muted-foreground">Team</div>
                    </div>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </div>
  )
}
