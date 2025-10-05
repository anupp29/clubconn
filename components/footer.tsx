import Link from "next/link"
import { Twitter, Youtube, Linkedin, Instagram, Mail, Phone, MapPin } from "lucide-react"

export function Footer() {
  return (
    <footer className="border-t border-border bg-background">
      <div className="container py-12 md:py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8 mb-12">
          <div className="lg:col-span-1">
            <Link href="/" className="font-bold text-xl mb-4 block">
              <span className="text-emerald-500">Club</span>Conn
            </Link>
            <p className="text-sm text-muted-foreground mb-4">
              Your one-stop destination for college clubs, events, and community building. Connect, participate, and
              grow.
            </p>
            <div className="flex items-center gap-3">
              <Link href="#" className="text-muted-foreground hover:text-emerald-500 transition-colors">
                <Twitter className="h-5 w-5" />
              </Link>
              <Link href="#" className="text-muted-foreground hover:text-emerald-500 transition-colors">
                <Linkedin className="h-5 w-5" />
              </Link>
              <Link href="#" className="text-muted-foreground hover:text-emerald-500 transition-colors">
                <Instagram className="h-5 w-5" />
              </Link>
              <Link href="#" className="text-muted-foreground hover:text-emerald-500 transition-colors">
                <Youtube className="h-5 w-5" />
              </Link>
            </div>
          </div>

          <div>
            <h3 className="font-semibold mb-4">Platform</h3>
            <ul className="space-y-3 text-sm">
              <li>
                <Link href="/events" className="text-muted-foreground hover:text-emerald-500 transition-colors">
                  Events
                </Link>
              </li>
              <li>
                <Link href="/clubs" className="text-muted-foreground hover:text-emerald-500 transition-colors">
                  Clubs
                </Link>
              </li>
              <li>
                <Link href="/communities" className="text-muted-foreground hover:text-emerald-500 transition-colors">
                  Communities
                </Link>
              </li>
              <li>
                <Link href="/dashboard" className="text-muted-foreground hover:text-emerald-500 transition-colors">
                  Dashboard
                </Link>
              </li>
              <li>
                <Link href="/vision" className="text-muted-foreground hover:text-emerald-500 transition-colors">
                  Our Vision
                </Link>
              </li>
              <li>
                <Link href="/sponsorship" className="text-muted-foreground hover:text-emerald-500 transition-colors">
                  Sponsorship
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="font-semibold mb-4">Student Hub</h3>
            <ul className="space-y-3 text-sm">
              <li>
                <Link href="/certificates" className="text-muted-foreground hover:text-emerald-500 transition-colors">
                  Certificates
                </Link>
              </li>
              <li>
                <Link href="/achievements" className="text-muted-foreground hover:text-emerald-500 transition-colors">
                  Achievements
                </Link>
              </li>
              <li>
                <Link href="/leaderboard" className="text-muted-foreground hover:text-emerald-500 transition-colors">
                  Leaderboard
                </Link>
              </li>
              <li>
                <Link href="/dashboard" className="text-muted-foreground hover:text-emerald-500 transition-colors">
                  My Profile
                </Link>
              </li>
              <li>
                <Link href="/events" className="text-muted-foreground hover:text-emerald-500 transition-colors">
                  Browse Events
                </Link>
              </li>
              <li>
                <Link href="/clubs" className="text-muted-foreground hover:text-emerald-500 transition-colors">
                  Discover Clubs
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="font-semibold mb-4">Legal & Support</h3>
            <ul className="space-y-3 text-sm">
              <li>
                <Link href="#" className="text-muted-foreground hover:text-emerald-500 transition-colors">
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link href="#" className="text-muted-foreground hover:text-emerald-500 transition-colors">
                  Terms of Service
                </Link>
              </li>
              <li>
                <Link href="#" className="text-muted-foreground hover:text-emerald-500 transition-colors">
                  Code of Conduct
                </Link>
              </li>
              <li>
                <Link href="#" className="text-muted-foreground hover:text-emerald-500 transition-colors">
                  Cookie Policy
                </Link>
              </li>
              <li>
                <Link href="#" className="text-muted-foreground hover:text-emerald-500 transition-colors">
                  Help Center
                </Link>
              </li>
              <li>
                <Link href="#" className="text-muted-foreground hover:text-emerald-500 transition-colors">
                  Contact Support
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="font-semibold mb-4">Get in Touch</h3>
            <ul className="space-y-3 text-sm">
              <li className="flex items-start gap-2 text-muted-foreground">
                <Mail className="h-4 w-4 mt-0.5 flex-shrink-0" />
                <a href="mailto:support@clubconn.com" className="hover:text-emerald-500 transition-colors">
                  support@clubconn.com
                </a>
              </li>
              <li className="flex items-start gap-2 text-muted-foreground">
                <Phone className="h-4 w-4 mt-0.5 flex-shrink-0" />
                <a href="tel:+911234567890" className="hover:text-emerald-500 transition-colors">
                  +91 123 456 7890
                </a>
              </li>
              <li className="flex items-start gap-2 text-muted-foreground">
                <MapPin className="h-4 w-4 mt-0.5 flex-shrink-0" />
                <span>Mumbai, Maharashtra, India</span>
              </li>
            </ul>
            <div className="mt-6">
              <h4 className="font-medium text-sm mb-3">For Institutions</h4>
              <Link
                href="/clubconnectadmin"
                className="text-sm text-emerald-500 hover:text-emerald-600 transition-colors"
              >
                Admin Portal →
              </Link>
            </div>
          </div>
        </div>

        <div className="pt-8 border-t border-border">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <div className="text-sm text-muted-foreground text-center md:text-left">
              <p>
                © 2025 <span className="text-emerald-500 font-semibold">ClubConn</span>. All rights reserved.
              </p>
              <p className="mt-1">Empowering college communities across India 🇮🇳</p>
            </div>
            <div className="flex items-center gap-2 text-xs text-muted-foreground">
              <span>Made with ❤️ by Team ClubConn</span>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}
