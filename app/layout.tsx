import type React from "react"
import type { Metadata } from "next"
import { GeistSans } from "geist/font/sans"
import { GeistMono } from "geist/font/mono"
import { Analytics } from "@vercel/analytics/next"
import "./globals.css"
import { Suspense } from "react"
import { AuthProvider } from "@/contexts/auth-context"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"

export const metadata: Metadata = {
  title: "ClubConn - Your Campus Connection Hub",
  description:
    "Discover and connect with all clubs at KKWIEER in one place. Join communities, attend events, and make the most of your campus experience.",
  generator: "v0.app",
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body className={`font-sans ${GeistSans.variable} ${GeistMono.variable}`}>
        <AuthProvider>
          <Header />
          <Suspense fallback={null}>{children}</Suspense>
          <Footer />
        </AuthProvider>
        <Analytics />
      </body>
    </html>
  )
}
