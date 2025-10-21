import Link from "next/link"
import { Twitter, Youtube, Linkedin, Instagram, Mail, Phone, MapPin, ExternalLink } from "lucide-react"

export function Footer() {
  return (
    <footer className="border-t border-border bg-gradient-to-b from-muted/30 to-muted/50">
      <div className="container py-12 md:py-16">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-8 lg:gap-12 mb-12">
          <div className="lg:col-span-1 space-y-4">
            <Link href="/" className="font-bold text-2xl block group">
              <span className="text-emerald-600 group-hover:text-emerald-700 transition-colors">Club</span>
              <span className="text-foreground">Conn</span>
            </Link>
            <p className="text-sm text-muted-foreground leading-relaxed">
              Your one-stop destination for college clubs, events, and community building. Connect, participate, and
              grow.
            </p>
            <div className="flex items-center gap-3 pt-2">
              <Link
                href="https://twitter.com/clubconn"
                target="_blank"
                rel="noopener noreferrer"
                className="text-muted-foreground hover:text-emerald-600 hover:scale-110 transition-all"
                aria-label="Twitter"
              >
                <Twitter className="h-5 w-5" />
              </Link>
              <Link
                href="https://linkedin.com/company/clubconn"
                target="_blank"
                rel="noopener noreferrer"
                className="text-muted-foreground hover:text-emerald-600 hover:scale-110 transition-all"
                aria-label="LinkedIn"
              >
                <Linkedin className="h-5 w-5" />
              </Link>
              <Link
                href="https://instagram.com/clubconn"
                target="_blank"
                rel="noopener noreferrer"
                className="text-muted-foreground hover:text-emerald-600 hover:scale-110 transition-all"
                aria-label="Instagram"
              >
                <Instagram className="h-5 w-5" />
              </Link>
              <Link
                href="https://youtube.com/@clubconn"
                target="_blank"
                rel="noopener noreferrer"
                className="text-muted-foreground hover:text-emerald-600 hover:scale-110 transition-all"
                aria-label="YouTube"
              >
                <Youtube className="h-5 w-5" />
              </Link>
            </div>
          </div>

          <div>
            <h3 className="font-semibold text-foreground mb-4">Platform</h3>
            <ul className="space-y-3 text-sm">
              <li>
                <Link
                  href="/events"
                  className="text-muted-foreground hover:text-emerald-600 hover:translate-x-1 transition-all inline-block"
                >
                  Events
                </Link>
              </li>
              <li>
                <Link
                  href="/clubs"
                  className="text-muted-foreground hover:text-emerald-600 hover:translate-x-1 transition-all inline-block"
                >
                  Clubs
                </Link>
              </li>
              <li>
                <Link
                  href="/communities"
                  className="text-muted-foreground hover:text-emerald-600 hover:translate-x-1 transition-all inline-block"
                >
                  Communities
                </Link>
              </li>
              <li>
                <Link
                  href="/dashboard"
                  className="text-muted-foreground hover:text-emerald-600 hover:translate-x-1 transition-all inline-block"
                >
                  Dashboard
                </Link>
              </li>
              <li>
                <Link
                  href="/vision"
                  className="text-muted-foreground hover:text-emerald-600 hover:translate-x-1 transition-all inline-block"
                >
                  Our Vision
                </Link>
              </li>
              <li>
                <Link
                  href="/sponsorship"
                  className="text-muted-foreground hover:text-emerald-600 hover:translate-x-1 transition-all inline-block"
                >
                  Sponsorship
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="font-semibold text-foreground mb-4">Student Hub</h3>
            <ul className="space-y-3 text-sm">
              <li>
                <Link
                  href="/certificates"
                  className="text-muted-foreground hover:text-emerald-600 hover:translate-x-1 transition-all inline-block"
                >
                  Certificates
                </Link>
              </li>
              <li>
                <Link
                  href="/achievements"
                  className="text-muted-foreground hover:text-emerald-600 hover:translate-x-1 transition-all inline-block"
                >
                  Achievements
                </Link>
              </li>
              <li>
                <Link
                  href="/leaderboard"
                  className="text-muted-foreground hover:text-emerald-600 hover:translate-x-1 transition-all inline-block"
                >
                  Leaderboard
                </Link>
              </li>
              <li>
                <Link
                  href="/dashboard"
                  className="text-muted-foreground hover:text-emerald-600 hover:translate-x-1 transition-all inline-block"
                >
                  My Profile
                </Link>
              </li>
              <li>
                <Link
                  href="/events"
                  className="text-muted-foreground hover:text-emerald-600 hover:translate-x-1 transition-all inline-block"
                >
                  Browse Events
                </Link>
              </li>
              <li>
                <Link
                  href="/clubs"
                  className="text-muted-foreground hover:text-emerald-600 hover:translate-x-1 transition-all inline-block"
                >
                  Discover Clubs
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="font-semibold text-foreground mb-4">Legal & Support</h3>
            <ul className="space-y-3 text-sm">
              <li>
                <Link
                  href="/privacy"
                  className="text-muted-foreground hover:text-emerald-600 hover:translate-x-1 transition-all inline-block"
                >
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link
                  href="/terms"
                  className="text-muted-foreground hover:text-emerald-600 hover:translate-x-1 transition-all inline-block"
                >
                  Terms of Service
                </Link>
              </li>
              <li>
                <Link
                  href="/code-of-conduct"
                  className="text-muted-foreground hover:text-emerald-600 hover:translate-x-1 transition-all inline-block"
                >
                  Code of Conduct
                </Link>
              </li>
              <li>
                <Link
                  href="/cookies"
                  className="text-muted-foreground hover:text-emerald-600 hover:translate-x-1 transition-all inline-block"
                >
                  Cookie Policy
                </Link>
              </li>
              <li>
                <Link
                  href="/help"
                  className="text-muted-foreground hover:text-emerald-600 hover:translate-x-1 transition-all inline-block"
                >
                  Help Center
                </Link>
              </li>
              <li>
                <Link
                  href="/contact"
                  className="text-muted-foreground hover:text-emerald-600 hover:translate-x-1 transition-all inline-block"
                >
                  Contact Support
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="font-semibold text-foreground mb-4">Get in Touch</h3>
            <ul className="space-y-4 text-sm">
              <li className="flex items-start gap-3 text-muted-foreground group">
                <Mail className="h-4 w-4 mt-0.5 flex-shrink-0 text-emerald-600 group-hover:scale-110 transition-transform" />
                <a href="mailto:support@clubconn.com" className="hover:text-emerald-600 transition-colors">
                  support@clubconn.com
                </a>
              </li>
              <li className="flex items-start gap-3 text-muted-foreground group">
                <Phone className="h-4 w-4 mt-0.5 flex-shrink-0 text-emerald-600 group-hover:scale-110 transition-transform" />
                <a href="tel:+911234567890" className="hover:text-emerald-600 transition-colors">
                  +91 123 456 7890
                </a>
              </li>
              <li className="flex items-start gap-3 text-muted-foreground">
                <MapPin className="h-4 w-4 mt-0.5 flex-shrink-0 text-emerald-600" />
                <span>KKWIEER, Nashik, Maharashtra</span>
              </li>
            </ul>
            <div className="mt-6 pt-6 border-t border-border">
              <h4 className="font-medium text-sm mb-3 text-foreground">For Institutions</h4>
              <Link
                href="/clubconnectadmin"
                className="inline-flex items-center gap-2 text-sm text-emerald-600 hover:text-emerald-700 transition-all font-medium group hover:gap-3"
              >
                Admin Portal
                <ExternalLink className="h-3.5 w-3.5 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
              </Link>
            </div>
          </div>
        </div>

        <div className="pt-8 border-t border-border">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <div className="text-sm text-muted-foreground text-center md:text-left">
              <p className="font-medium">
                © 2025 <span className="text-emerald-600 font-semibold">ClubConn</span>. All rights reserved.
              </p>
              <p className="mt-1 text-xs">Empowering college communities across India 🇮🇳</p>
            </div>
            <div className="flex items-center gap-2 text-xs text-muted-foreground">
              <span className="hover:text-emerald-600 transition-colors cursor-default">
                Made with ❤️ by Team ClubConn
              </span>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}
