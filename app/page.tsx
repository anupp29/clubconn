import { Hero } from "@/components/hero"
import { AboutSection } from "@/components/about-section"
import { ProgramsSection } from "@/components/programs-section"
import { FlagshipEvents } from "@/components/flagship-events"
import { UpcomingEvents } from "@/components/upcoming-events"
import { IndustryPartnership } from "@/components/industry-partnership"
import { FaqSection } from "@/components/faq-section"
import { NewsletterContact } from "@/components/newsletter-contact"
import { Footer } from "@/components/footer"

export default function Home() {
  return (
    <main className="min-h-screen scroll-smooth">
      <section id="home">
        <Hero />
      </section>
      <section id="about">
        <AboutSection />
      </section>
      <section id="programs">
        <ProgramsSection />
      </section>
      <section id="events">
        <FlagshipEvents />
        <UpcomingEvents />
      </section>
      <section id="partnerships">
        <IndustryPartnership />
      </section>
      <section id="faq">
        <FaqSection />
      </section>
      <section id="contact">
        <NewsletterContact />
      </section>
      <Footer />
    </main>
  )
}
