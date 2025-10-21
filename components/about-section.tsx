import { Target, Zap, Heart } from "lucide-react"

export function AboutSection() {
  const goals = [
    {
      number: "01",
      title: "Connect Students",
      description: "Bridge the gap between students and clubs, making it easy to discover and join communities.",
      icon: Heart,
      gradient: "from-pink-500 to-rose-500",
    },
    {
      number: "02",
      title: "Centralize Information",
      description: "Provide a single platform for all club activities, events, and announcements at KKWIEER.",
      icon: Target,
      gradient: "from-blue-500 to-cyan-500",
    },
    {
      number: "03",
      title: "Foster Engagement",
      description: "Encourage active participation in campus life through seamless event discovery and registration.",
      icon: Zap,
      gradient: "from-violet-500 to-purple-500",
    },
  ]

  return (
    <section id="about" className="py-16 md:py-24 bg-muted/30 relative overflow-hidden">
      <div className="absolute top-0 left-1/4 w-96 h-96 bg-primary/5 rounded-full blur-3xl animate-pulse" />
      <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-blue-500/5 rounded-full blur-3xl animate-pulse delay-1000" />

      <div className="container relative z-10">
        <div className="mb-16 text-center max-w-3xl mx-auto">
          <h2 className="mb-6 text-3xl font-bold tracking-tight md:text-5xl bg-gradient-to-r from-foreground to-foreground/70 bg-clip-text text-transparent">
            About ClubConn
          </h2>
          <div className="space-y-4">
            <h3 className="text-2xl md:text-3xl font-semibold text-balance">
              Discover Every Club at KKWIEER in One Place
            </h3>
            <p className="text-lg text-muted-foreground leading-relaxed text-pretty">
              ClubConn is your one-stop destination to explore, join, and engage with all student clubs and
              organizations. Never miss an event, connect with like-minded peers, and make the most of your campus
              experience.
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {goals.map((goal, index) => {
            const Icon = goal.icon
            return (
              <div key={goal.number} className="group relative" style={{ animationDelay: `${index * 100}ms` }}>
                {/* Gradient border effect on hover */}
                <div
                  className={`absolute -inset-0.5 bg-gradient-to-r ${goal.gradient} rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 blur`}
                />

                <div className="relative bg-card border border-border rounded-2xl p-8 h-full transition-all duration-500 group-hover:scale-[1.02] group-hover:shadow-2xl">
                  {/* Icon with gradient background */}
                  <div className="mb-6 relative">
                    <div
                      className={`absolute inset-0 bg-gradient-to-r ${goal.gradient} rounded-xl opacity-10 group-hover:opacity-20 transition-opacity`}
                    />
                    <div
                      className={`relative flex h-14 w-14 items-center justify-center rounded-xl bg-gradient-to-r ${goal.gradient} text-white shadow-lg group-hover:scale-110 transition-transform duration-300`}
                    >
                      <Icon className="h-7 w-7" />
                    </div>
                  </div>

                  {/* Number badge */}
                  <div className="absolute top-6 right-6 text-6xl font-bold text-muted/10 group-hover:text-muted/20 transition-colors">
                    {goal.number}
                  </div>

                  {/* Content */}
                  <div className="space-y-3 relative">
                    <h3 className="text-2xl font-bold group-hover:text-primary transition-colors">{goal.title}</h3>
                    <p className="text-muted-foreground leading-relaxed">{goal.description}</p>
                  </div>

                  {/* Hover indicator */}
                  <div className="mt-6 flex items-center text-sm font-medium text-primary opacity-0 group-hover:opacity-100 transition-opacity">
                    Learn more
                    <svg
                      className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                  </div>
                </div>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
