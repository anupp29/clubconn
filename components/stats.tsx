import { Users, Calendar, Award, TrendingUp } from "lucide-react"

const stats = [
  {
    icon: Users,
    value: "50+",
    label: "Active Clubs",
    description: "Across all categories",
  },
  {
    icon: Calendar,
    value: "200+",
    label: "Events Yearly",
    description: "Something every week",
  },
  {
    icon: Award,
    value: "5000+",
    label: "Active Members",
    description: "Growing community",
  },
  {
    icon: TrendingUp,
    value: "95%",
    label: "Satisfaction Rate",
    description: "Student approved",
  },
]

export function Stats() {
  return (
    <section className="py-16 md:py-24 bg-muted/30">
      <div className="container">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {stats.map((stat, index) => {
            const Icon = stat.icon
            return (
              <div key={index} className="text-center">
                <div className="mb-4 inline-flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10">
                  <Icon className="h-6 w-6 text-primary" />
                </div>
                <div className="mb-1 text-3xl font-bold">{stat.value}</div>
                <div className="mb-1 font-semibold text-foreground">{stat.label}</div>
                <div className="text-sm text-muted-foreground">{stat.description}</div>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
