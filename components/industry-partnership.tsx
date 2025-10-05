import { Handshake } from "lucide-react"

export function IndustryPartnership() {
  const partners = [
    { name: "Frappe", logo: "/frappe-logo.jpg" },
    { name: "Zerodha", logo: "/zerodha-logo.jpg" },
    { name: "Sumlata", logo: "/sumlata-logo.jpg" },
  ]

  return (
    <section className="py-16 md:py-24 bg-muted/30">
      <div className="container">
        <div className="max-w-4xl mx-auto text-center">
          <div className="inline-flex h-16 w-16 items-center justify-center rounded-2xl bg-primary text-primary-foreground mb-6">
            <Handshake className="h-8 w-8" />
          </div>
          <h2 className="mb-4 text-3xl font-bold tracking-tight md:text-4xl">Industry Partnership</h2>
          <p className="text-lg text-muted-foreground leading-relaxed mb-8 text-balance">
            The foundation was started as a collaboration between the teams of Frappe and Zerodha. Currently we have two
            more partners supporting us, and we invite more organizations to join the movement.
          </p>

          <div className="flex flex-wrap items-center justify-center gap-8 mb-8">
            {partners.map((partner) => (
              <div
                key={partner.name}
                className="grayscale hover:grayscale-0 transition-all opacity-60 hover:opacity-100"
              >
                <img src={partner.logo || "/placeholder.svg"} alt={partner.name} className="h-12" />
              </div>
            ))}
          </div>

          <a href="#" className="text-sm font-medium text-primary hover:underline">
            View Current Partners →
          </a>
        </div>
      </div>
    </section>
  )
}
