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
    <main className="min-h-screen">
      <Hero />
      <AboutSection />
      <ProgramsSection />
      <FlagshipEvents />
      <UpcomingEvents />
      <IndustryPartnership />
      <FaqSection />
      <NewsletterContact />
      <Footer />
    </main>
  )
}
