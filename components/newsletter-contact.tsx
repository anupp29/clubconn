import { MessageSquare, Send } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent } from "@/components/ui/card"

export function NewsletterContact() {
  return (
    <section className="py-16 md:py-24">
      <div className="container">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl mx-auto">
          {/* Newsletter */}
          <Card>
            <CardContent className="p-6">
              <h3 className="text-2xl font-bold mb-4">Newsletter</h3>
              <p className="text-muted-foreground mb-6 leading-relaxed">
                Monthly digest of the latest news and updates about ClubConn events, grants, and non-school. Subscribe
                to stay updated and never miss out.
              </p>
              <div className="flex gap-2 mb-4">
                <Input type="email" placeholder="Enter your email" className="flex-1" />
                <Button>
                  <Send className="h-4 w-4" />
                </Button>
              </div>
              <a href="#" className="text-sm text-primary hover:underline flex items-center gap-2">
                <span>RSS Feed</span>
                <span>→</span>
              </a>
            </CardContent>
          </Card>

          {/* Get in Touch */}
          <Card>
            <CardContent className="p-6">
              <h3 className="text-2xl font-bold mb-4">Get in Touch</h3>
              <p className="text-muted-foreground mb-6 leading-relaxed">
                Write to us at{" "}
                <a href="mailto:foundation@fossunited.org" className="text-primary hover:underline">
                  foundation@fossunited.org
                </a>{" "}
                or drop a message on the{" "}
                <a href="#" className="text-primary hover:underline">
                  forum
                </a>
                .
              </p>
              <div className="space-y-3">
                <a
                  href="#"
                  className="flex items-center gap-3 text-sm text-muted-foreground hover:text-foreground transition-colors"
                >
                  <MessageSquare className="h-5 w-5" />
                  <span>Join our Matrix Community</span>
                </a>
                <a
                  href="#"
                  className="flex items-center gap-3 text-sm text-muted-foreground hover:text-foreground transition-colors"
                >
                  <Send className="h-5 w-5" />
                  <span>Join our Telegram Community</span>
                </a>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  )
}
