import { HelpCircle } from "lucide-react"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"

const faqs = [
  {
    question: "What is ClubConn?",
    answer:
      "ClubConn is a comprehensive platform designed to connect students with all clubs and organizations at KKWIEER. It serves as a centralized hub where you can discover clubs, attend events, engage with communities, and make the most of your campus experience.",
  },
  {
    question: "How do I join a club?",
    answer:
      "Joining a club is simple! Browse through the Clubs section, find a club that interests you, and click the 'Join' button. Some clubs may have specific requirements or an application process, which will be clearly mentioned on their club page.",
  },
  {
    question: "Can I create my own club?",
    answer:
      "Yes! If you have a unique idea for a club that doesn't exist yet, you can submit a club creation request through the platform. Your proposal will be reviewed by the college administration, and once approved, you can start building your community.",
  },
  {
    question: "How do I stay updated about events?",
    answer:
      "Stay in the loop by subscribing to our newsletter, following clubs you're interested in, and enabling notifications on the platform. You'll receive timely updates about upcoming events, workshops, and activities from all your favorite clubs.",
  },
  {
    question: "Is ClubConn only for KKWIEER students?",
    answer:
      "Currently, ClubConn is exclusively designed for KKWIEER students, faculty, and staff. You'll need a valid college email address to sign up and access the platform's features.",
  },
  {
    question: "How can I contact ClubConn support?",
    answer:
      "For any questions, issues, or feedback, you can reach out to us at foundation@fossunited.org or drop a message on our forum. We're also available on our Telegram and Matrix communities for quick assistance.",
  },
]

export function FaqSection() {
  return (
    <section className="py-16 md:py-24 relative overflow-hidden">
      <div className="absolute inset-0 -z-10 bg-[linear-gradient(to_right,#8080800a_1px,transparent_1px),linear-gradient(to_bottom,#8080800a_1px,transparent_1px)] bg-[size:14px_24px]" />
      <div className="absolute top-1/4 right-1/4 w-96 h-96 bg-primary/5 rounded-full blur-3xl animate-pulse" />
      <div className="absolute bottom-1/4 left-1/4 w-96 h-96 bg-blue-500/5 rounded-full blur-3xl animate-pulse delay-1000" />

      <div className="container relative z-10">
        <div className="mb-12 text-center max-w-3xl mx-auto">
          <div className="inline-flex h-16 w-16 items-center justify-center rounded-2xl bg-primary text-primary-foreground mb-6">
            <HelpCircle className="h-8 w-8" />
          </div>
          <h2 className="mb-4 text-3xl font-bold tracking-tight md:text-5xl bg-gradient-to-r from-foreground to-foreground/70 bg-clip-text text-transparent">
            Frequently Asked Questions
          </h2>
          <p className="text-lg text-muted-foreground leading-relaxed">
            Got questions? We've got answers. Find everything you need to know about ClubConn.
          </p>
        </div>

        <div className="max-w-3xl mx-auto">
          <Accordion type="single" collapsible className="w-full space-y-4">
            {faqs.map((faq, index) => (
              <AccordionItem
                key={index}
                value={`item-${index}`}
                className="border border-border rounded-lg px-6 bg-card hover:border-primary/50 transition-colors"
              >
                <AccordionTrigger className="text-base font-semibold hover:text-primary">
                  {faq.question}
                </AccordionTrigger>
                <AccordionContent className="text-muted-foreground leading-relaxed">{faq.answer}</AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>

        <div className="mt-12 text-center">
          <p className="text-muted-foreground mb-4">Still have questions?</p>
          <a
            href="mailto:foundation@fossunited.org"
            className="inline-flex items-center gap-2 text-primary font-medium hover:underline"
          >
            Contact our support team →
          </a>
        </div>
      </div>
    </section>
  )
}
