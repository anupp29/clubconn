import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Users, ArrowRight, Code, Palette, Briefcase, Trophy, Camera, Heart, MapPin, BookOpen } from "lucide-react"

const clubs = [
  {
    name: "Tech Innovation Club",
    category: "Technology",
    members: 450,
    description: "Building the future through code, hackathons, and innovation challenges.",
    icon: Code,
    gradient: "from-blue-500 to-cyan-500",
  },
  {
    name: "Cultural Society",
    category: "Arts & Culture",
    members: 380,
    description: "Celebrating diversity through music, dance, and cultural festivals.",
    icon: Palette,
    gradient: "from-purple-500 to-pink-500",
  },
  {
    name: "Entrepreneurship Cell",
    category: "Business",
    members: 320,
    description: "Fostering startup culture and business acumen among students.",
    icon: Briefcase,
    gradient: "from-orange-500 to-red-500",
  },
  {
    name: "Sports Committee",
    category: "Sports",
    members: 520,
    description: "Promoting fitness, teamwork, and competitive spirit across campus.",
    icon: Trophy,
    gradient: "from-emerald-500 to-teal-500",
  },
  {
    name: "Photography Club",
    category: "Creative",
    members: 280,
    description: "Capturing moments and telling stories through the lens.",
    icon: Camera,
    gradient: "from-violet-500 to-purple-500",
  },
  {
    name: "Social Service League",
    category: "Community",
    members: 410,
    description: "Making a difference through community outreach and social initiatives.",
    icon: Heart,
    gradient: "from-green-500 to-emerald-500",
  },
  {
    name: "City Communities",
    category: "Community",
    members: 450,
    description: "Join a community in your city and take part in local meetups and events.",
    icon: MapPin,
    gradient: "from-blue-500 to-indigo-500",
  },
  {
    name: "FOSS Clubs",
    category: "Technology",
    members: 380,
    description: "Explore our clubs that promotes FOSS projects and events for students.",
    icon: Code,
    gradient: "from-green-500 to-teal-500",
  },
  {
    name: "Departmental Activities",
    category: "Academic",
    members: 520,
    description: "Engage with department-specific clubs and technical societies.",
    icon: BookOpen,
    gradient: "from-amber-500 to-orange-500",
  },
]

export function FeaturedClubs() {
  return (
    <section id="clubs" className="py-16 md:py-24 relative overflow-hidden">
      <div className="absolute inset-0 -z-10 bg-gradient-to-b from-transparent via-primary/5 to-transparent" />

      <div className="container">
        <div className="mb-12 text-center">
          <h2 className="mb-4 text-3xl font-bold tracking-tight text-balance md:text-4xl">Programs</h2>
          <p className="text-lg text-muted-foreground text-balance max-w-2xl mx-auto">
            Explore our diverse range of programs and find your community
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {clubs.map((club, index) => {
            const Icon = club.icon
            return (
              <Card
                key={index}
                className="group relative overflow-hidden hover:shadow-2xl transition-all duration-300 border-border/50 hover:border-primary/50 hover:scale-[1.02]"
              >
                <div className={`absolute top-0 left-0 right-0 h-1 bg-gradient-to-r ${club.gradient}`} />

                <CardContent className="p-6">
                  <div className="flex items-start justify-between gap-2 mb-4">
                    <div
                      className={`inline-flex h-14 w-14 items-center justify-center rounded-xl bg-gradient-to-br ${club.gradient} shadow-lg`}
                    >
                      <Icon className="h-7 w-7 text-white" />
                    </div>
                    <Badge variant="secondary" className="text-xs">
                      {club.category}
                    </Badge>
                  </div>

                  <h3 className="font-bold text-xl mb-2 group-hover:text-primary transition-colors">{club.name}</h3>
                  <p className="text-muted-foreground leading-relaxed mb-4 text-sm">{club.description}</p>

                  <div className="flex items-center justify-between pt-4 border-t border-border">
                    <div className="flex items-center gap-2 text-sm text-muted-foreground">
                      <Users className="h-4 w-4" />
                      <span className="font-medium">{club.members} members</span>
                    </div>
                    <Button variant="ghost" size="sm" className="group/btn">
                      <span className="text-xs">Learn More</span>
                      <ArrowRight className="ml-1 h-3 w-3 group-hover/btn:translate-x-1 transition-transform" />
                    </Button>
                  </div>
                </CardContent>

                <div
                  className={`absolute inset-0 bg-gradient-to-br ${club.gradient} opacity-0 group-hover:opacity-5 transition-opacity duration-300 pointer-events-none`}
                />
              </Card>
            )
          })}
        </div>

        <div className="mt-12 text-center">
          <Button size="lg" variant="outline">
            View All Programs
            <ArrowRight className="ml-2 h-4 w-4" />
          </Button>
        </div>
      </div>
    </section>
  )
}
