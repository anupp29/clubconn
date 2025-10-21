import { Target, Zap, Heart } from "lucide-react"

export function AboutSection() {
  const goals = [
    {
      title: "Connect Students",
      description: "Bridge the gap between students and clubs, making it easy to discover and join communities.",
      icon: Heart,
    },
    {
      title: "Centralize Information",
      description: "Provide a single platform for all club activities, events, and announcements.",
      icon: Target,
    },
    {
      title: "Foster Engagement",
      description: "Encourage active participation through seamless event discovery and registration.",
      icon: Zap,
    },
  ]

  return (
    <section className="py-24">
      <div className="container">
        <div className="mb-16 text-center max-w-3xl mx-auto">
          <h2 className="mb-6 text-4xl font-bold tracking-tight">
            About <span className="text-emerald-500">ClubConn</span>
          </h2>
          <p className="text-xl text-muted-foreground leading-relaxed">
            Your one-stop destination to explore, join, and engage with all student clubs and organizations at KKWIEER.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
          {goals.map((goal) => {
            const Icon = goal.icon
            return (
              <div key={goal.title} className="text-center space-y-4">
                <div className="inline-flex h-14 w-14 items-center justify-center rounded-2xl bg-emerald-500/10">
                  <Icon className="h-7 w-7 text-emerald-500" />
                </div>
                <h3 className="text-xl font-bold">{goal.title}</h3>
                <p className="text-muted-foreground leading-relaxed">{goal.description}</p>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
