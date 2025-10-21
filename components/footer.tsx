import Link from "next/link"
import { Twitter, Youtube, Linkedin, Instagram, Mail, Phone, MapPin, ExternalLink } from "lucide-react"

export function Footer() {
  return (
    <footer className="border-t border-border/50 bg-gradient-to-b from-background via-muted/20 to-muted/40">
      <div className="container py-16 md:py-20">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-10 lg:gap-16 mb-16">
          <div className="lg:col-span-1 space-y-5">
            <Link href="/" className="font-bold text-2xl block group">
              <span className="text-emerald-600 group-hover:text-emerald-700 transition-colors duration-200">Club</span>
              <span className="text-foreground">Conn</span>
            </Link>
            <p className="text-sm text-muted-foreground leading-relaxed max-w-xs">
              Your one-stop destination for college clubs, events, and community building. Connect, participate, and
              grow.
            </p>
            <div className="flex items-center gap-4 pt-3">
              <Link
                href="https://twitter.com/clubconn"
                target="_blank"
                rel="noopener noreferrer"
                className="text-muted-foreground hover:text-emerald-600 hover:scale-125 transition-all duration-200"
                aria-label="Twitter"
              >
                <Twitter className="h-5 w-5" />
              </Link>
              <Link
                href="https://linkedin.com/company/clubconn"
                target="_blank"
                rel="noopener noreferrer"
                className="text-muted-foreground hover:text-emerald-600 hover:scale-125 transition-all duration-200"
                aria-label="LinkedIn"
              >
                <Linkedin className="h-5 w-5" />
              </Link>
              <Link
                href="https://instagram.com/clubconn"
                target="_blank"
                rel="noopener noreferrer"
                className="text-muted-foreground hover:text-emerald-600 hover:scale-125 transition-all duration-200"
                aria-label="Instagram"
              >
                <Instagram className="h-5 w-5" />
              </Link>
              <Link
                href="https://youtube.com/@clubconn"
                target="_blank"
                rel="noopener noreferrer"
                className="text-muted-foreground hover:text-emerald-600 hover:scale-125 transition-all duration-200"
                aria-label="YouTube"
              >
                <Youtube className="h-5 w-5" />
              </Link>
            </div>
          </div>

          <div>
            <h3 className="font-semibold text-foreground mb-5 text-sm uppercase tracking-wider">Platform</h3>
            <ul className="space-y-3.5 text-sm">
              <li>
                <Link
                  href="/events"
                  className="text-muted-foreground hover:text-emerald-600 hover:translate-x-1.5 transition-all duration-200 inline-block"
                >
                  Events
                </Link>
              </li>
              <li>
                <Link
                  href="/clubs"
                  className="text-muted-foreground hover:text-emerald-600 hover:translate-x-1.5 transition-all duration-200 inline-block"
                >
                  Clubs
                </Link>
              </li>
              <li>
                <Link
                  href="/communities"
                  className="text-muted-foreground hover:text-emerald-600 hover:translate-x-1.5 transition-all duration-200 inline-block"
                >
                  Communities
                </Link>
              </li>
              <li>
                <Link
                  href="/dashboard"
                  className="text-muted-foreground hover:text-emerald-600 hover:translate-x-1.5 transition-all duration-200 inline-block"
                >
                  Dashboard
                </Link>
              </li>
              <li>
                <Link
                  href="/vision"
                  className="text-muted-foreground hover:text-emerald-600 hover:translate-x-1.5 transition-all duration-200 inline-block"
                >
                  Our Vision
                </Link>
              </li>
              <li>
                <Link
                  href="/sponsorship"
                  className="text-muted-foreground hover:text-emerald-600 hover:translate-x-1.5 transition-all duration-200 inline-block"
                >
                  Sponsorship
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="font-semibold text-foreground mb-5 text-sm uppercase tracking-wider">Student Hub</h3>
            <ul className="space-y-3.5 text-sm">
              <li>
                <Link
                  href="/certificates"
                  className="text-muted-foreground hover:text-emerald-600 hover:translate-x-1.5 transition-all duration-200 inline-block"
                >
                  Certificates
                </Link>
              </li>
              <li>
                <Link
                  href="/achievements"
                  className="text-muted-foreground hover:text-emerald-600 hover:translate-x-1.5 transition-all duration-200 inline-block"
                >
                  Achievements
                </Link>
              </li>
              <li>
                <Link
                  href="/leaderboard"
                  className="text-muted-foreground hover:text-emerald-600 hover:translate-x-1.5 transition-all duration-200 inline-block"
                >
                  Leaderboard
                </Link>
              </li>
              <li>
                <Link
                  href="/dashboard"
                  className="text-muted-foreground hover:text-emerald-600 hover:translate-x-1.5 transition-all duration-200 inline-block"
                >
                  My Profile
                </Link>
              </li>
              <li>
                <Link
                  href="/events"
                  className="text-muted-foreground hover:text-emerald-600 hover:translate-x-1.5 transition-all duration-200 inline-block"
                >
                  Browse Events
                </Link>
              </li>
              <li>
                <Link
                  href="/clubs"
                  className="text-muted-foreground hover:text-emerald-600 hover:translate-x-1.5 transition-all duration-200 inline-block"
                >
                  Discover Clubs
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="font-semibold text-foreground mb-5 text-sm uppercase tracking-wider">Legal & Support</h3>
            <ul className="space-y-3.5 text-sm">
              <li>
                <Link
                  href="/privacy"
                  className="text-muted-foreground hover:text-emerald-600 hover:translate-x-1.5 transition-all duration-200 inline-block"
                >
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link
                  href="/terms"
                  className="text-muted-foreground hover:text-emerald-600 hover:translate-x-1.5 transition-all duration-200 inline-block"
                >
                  Terms of Service
                </Link>
              </li>
              <li>
                <Link
                  href="/code-of-conduct"
                  className="text-muted-foreground hover:text-emerald-600 hover:translate-x-1.5 transition-all duration-200 inline-block"
                >
                  Code of Conduct
                </Link>
              </li>
              <li>
                <Link
                  href="/cookies"
                  className="text-muted-foreground hover:text-emerald-600 hover:translate-x-1.5 transition-all duration-200 inline-block"
                >
                  Cookie Policy
                </Link>
              </li>
              <li>
                <Link
                  href="/help"
                  className="text-muted-foreground hover:text-emerald-600 hover:translate-x-1.5 transition-all duration-200 inline-block"
                >
                  Help Center
                </Link>
              </li>
              <li>
                <Link
                  href="/contact"
                  className="text-muted-foreground hover:text-emerald-600 hover:translate-x-1.5 transition-all duration-200 inline-block"
                >
                  Contact Support
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="font-semibold text-foreground mb-5 text-sm uppercase tracking-wider">Get in Touch</h3>
            <ul className="space-y-4 text-sm">
              <li className="flex items-start gap-3 text-muted-foreground group">
                <Mail className="h-4 w-4 mt-0.5 flex-shrink-0 text-emerald-600 group-hover:scale-125 transition-transform duration-200" />
                <a
                  href="mailto:support@clubconn.com"
                  className="hover:text-emerald-600 transition-colors duration-200 break-all"
                >
                  support@clubconn.com
                </a>
              </li>
              <li className="flex items-start gap-3 text-muted-foreground group">
                <Phone className="h-4 w-4 mt-0.5 flex-shrink-0 text-emerald-600 group-hover:scale-125 transition-transform duration-200" />
                <a href="tel:+911234567890" className="hover:text-emerald-600 transition-colors duration-200">
                  +91 123 456 7890
                </a>
              </li>
              <li className="flex items-start gap-3 text-muted-foreground">
                <MapPin className="h-4 w-4 mt-0.5 flex-shrink-0 text-emerald-600" />
                <span>KKWIEER, Nashik, Maharashtra</span>
              </li>
            </ul>
            <div className="mt-8 pt-6 border-t border-border/50">
              <h4 className="font-semibold text-sm mb-4 text-foreground uppercase tracking-wider">For Institutions</h4>
              <Link
                href="/clubconnectadmin"
                className="inline-flex items-center gap-2 text-sm text-emerald-600 hover:text-emerald-700 transition-all duration-200 font-semibold group hover:gap-3"
              >
                Admin Portal
                <ExternalLink className="h-4 w-4 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform duration-200" />
              </Link>
            </div>
          </div>
        </div>

        <div className="pt-10 border-t border-border/50">
          <div className="flex flex-col md:flex-row items-center justify-between gap-6">
            <div className="text-sm text-muted-foreground text-center md:text-left">
              <p className="font-semibold text-foreground">
                © 2025 <span className="text-emerald-600">ClubConn</span>. All rights reserved.
              </p>
              <p className="mt-2 text-xs">Empowering college communities across India 🇮🇳</p>
            </div>
            <div className="flex items-center gap-2 text-xs text-muted-foreground">
              <span className="hover:text-emerald-600 transition-colors duration-200 cursor-default">
                Made with <span className="text-red-500 animate-pulse">❤️</span> by Team ClubConn
              </span>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}
