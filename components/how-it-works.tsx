import { Search, UserPlus, Bell, Sparkles } from "lucide-react"

const steps = [
  {
    icon: Search,
    title: "Discover Clubs",
    description: "Browse through all clubs at KKWIEER, filter by category, and find your interests.",
  },
  {
    icon: UserPlus,
    title: "Join Communities",
    description: "Connect with club members, attend meetings, and become part of something bigger.",
  },
  {
    icon: Bell,
    title: "Stay Updated",
    description: "Get notifications about events, activities, and opportunities from your clubs.",
  },
  {
    icon: Sparkles,
    title: "Make an Impact",
    description: "Participate in events, lead initiatives, and create lasting memories on campus.",
  },
]

export function HowItWorks() {
  return (
    <section id="about" className="py-16 md:py-24">
      <div className="container">
        <div className="mb-12 text-center">
          <h2 className="mb-4 text-3xl font-bold tracking-tight text-balance md:text-4xl">How ClubConn Works</h2>
          <p className="text-lg text-muted-foreground text-balance max-w-2xl mx-auto">
            Your journey to an enriched campus life starts here
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {steps.map((step, index) => {
            const Icon = step.icon
            return (
              <div key={index} className="relative text-center">
                <div className="mb-4 inline-flex h-16 w-16 items-center justify-center rounded-2xl bg-primary text-primary-foreground">
                  <Icon className="h-8 w-8" />
                </div>
                <h3 className="mb-2 text-xl font-semibold">{step.title}</h3>
                <p className="text-muted-foreground leading-relaxed">{step.description}</p>
                {index < steps.length - 1 && (
                  <div className="hidden lg:block absolute top-8 left-[60%] w-[80%] h-0.5 bg-border" />
                )}
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
