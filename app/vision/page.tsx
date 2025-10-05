import { Linkedin, Target, Users, Lightbulb, Heart } from "lucide-react"
import Link from "next/link"
import Image from "next/image"

export default function VisionPage() {
  const teamMembers = [
    {
      name: "Anup Patil",
      image:
        "https://media.licdn.com/dms/image/v2/D4D03AQE4ETcb4nzboQ/profile-displayphoto-scale_400_400/B4DZg8jUj_GsAk-/0/1753362551299?e=1762387200&v=beta&t=X36Rgn90mOoqCgKtYAPs5tN0hBZlTdDuMLi8nfbxKUs",
      linkedin: "https://www.linkedin.com/in/anuppatil29/",
    },
    {
      name: "Akshada Kale",
      image:
        "https://media.licdn.com/dms/image/v2/D5603AQGdXAtva3S9jA/profile-displayphoto-shrink_400_400/B56Zi9R1PlHMAg-/0/1755522227635?e=1762387200&v=beta&t=qn3VjyZuQgGt06Y8TRkAdsb39dmOEYQHn-ugDZPzhKA",
      linkedin: "https://www.linkedin.com/in/akshada-kale-768a5629a/",
    },
    {
      name: "Arinjay Gawade",
      image:
        "https://media.licdn.com/dms/image/v2/D5603AQGWUDmUiabVYQ/profile-displayphoto-scale_400_400/B56ZlYcnL7JoAg-/0/1758125520463?e=1762387200&v=beta&t=eJwgst1lWErFoBmDMc2cY1QlqeZNMy9InRCwtbyHOi4",
      linkedin: "https://www.linkedin.com/in/arinjay-gawade-b92849356/",
    },
    {
      name: "Manas Shinde",
      image:
        "https://media.licdn.com/dms/image/v2/D4D03AQG2bnVTEf_bow/profile-displayphoto-scale_400_400/B4DZlEf70vJQAg-/0/1757790852942?e=1762387200&v=beta&t=yzi5NhQiQgMj5OR07GNVo264r5agQcORFiQG_luNqyM",
      linkedin: "https://www.linkedin.com/in/manas-hitendra-shinde-5839a5278/",
    },
    {
      name: "Om Bhamare",
      image:
        "https://media.licdn.com/dms/image/v2/D4D03AQHcI_DmqxECLg/profile-displayphoto-scale_400_400/B4DZh0nCPDHwAg-/0/1754303056051?e=1762387200&v=beta&t=CsVy-rHoiuz2nq0EVXKOKjmQ6KPp9gBO9Cv8nu7i6GU",
      linkedin: "https://www.linkedin.com/in/om-bhamare-b80173309/",
    },
  ]

  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <section className="relative py-20 px-4 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-background to-primary/5" />
        <div className="container relative max-w-4xl mx-auto text-center">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 text-primary text-sm font-medium mb-6">
            <Target className="h-4 w-4" />
            Our Vision
          </div>
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 text-balance">
            One-Stop Destination for All College Clubs
          </h1>
          <p className="text-lg md:text-xl text-muted-foreground mb-8 text-pretty max-w-3xl mx-auto">
            Building a unified platform that empowers students to discover, connect, and grow through college clubs
            while enabling seamless profile building at the college level.
          </p>
        </div>
      </section>

      {/* Problem & Solution Section */}
      <section className="py-16 px-4">
        <div className="container max-w-6xl mx-auto">
          <div className="grid md:grid-cols-2 gap-8">
            {/* The Problem */}
            <div className="p-8 rounded-2xl bg-gradient-to-br from-destructive/5 to-destructive/10 border border-destructive/20">
              <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-destructive/10 text-destructive text-sm font-medium mb-4">
                <Lightbulb className="h-4 w-4" />
                The Challenge
              </div>
              <h2 className="text-2xl font-bold mb-4">What We Observed</h2>
              <ul className="space-y-3 text-muted-foreground">
                <li className="flex gap-3">
                  <span className="text-destructive mt-1">•</span>
                  <span>Fragmented club management across multiple platforms</span>
                </li>
                <li className="flex gap-3">
                  <span className="text-destructive mt-1">•</span>
                  <span>Conflicts and miscommunication between club coordinators</span>
                </li>
                <li className="flex gap-3">
                  <span className="text-destructive mt-1">•</span>
                  <span>Unnecessary spam in WhatsApp groups cluttering important updates</span>
                </li>
                <li className="flex gap-3">
                  <span className="text-destructive mt-1">•</span>
                  <span>Difficulty in tracking student participation and achievements</span>
                </li>
                <li className="flex gap-3">
                  <span className="text-destructive mt-1">•</span>
                  <span>No centralized system for event management and certificates</span>
                </li>
              </ul>
            </div>

            {/* The Solution */}
            <div className="p-8 rounded-2xl bg-gradient-to-br from-primary/5 to-primary/10 border border-primary/20">
              <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-primary/10 text-primary text-sm font-medium mb-4">
                <Target className="h-4 w-4" />
                Our Solution
              </div>
              <h2 className="text-2xl font-bold mb-4">
                <span className="text-emerald-500">ClubConn</span> Platform
              </h2>
              <ul className="space-y-3 text-muted-foreground">
                <li className="flex gap-3">
                  <span className="text-primary mt-1">✓</span>
                  <span>Unified dashboard for all club activities and events</span>
                </li>
                <li className="flex gap-3">
                  <span className="text-primary mt-1">✓</span>
                  <span>Streamlined communication channels reducing spam</span>
                </li>
                <li className="flex gap-3">
                  <span className="text-primary mt-1">✓</span>
                  <span>Automated certificate generation and achievement tracking</span>
                </li>
                <li className="flex gap-3">
                  <span className="text-primary mt-1">✓</span>
                  <span>Comprehensive student profiles showcasing club involvement</span>
                </li>
                <li className="flex gap-3">
                  <span className="text-primary mt-1">✓</span>
                  <span>Transparent event management and conflict resolution</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="py-16 px-4 bg-muted/30">
        <div className="container max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 text-primary text-sm font-medium mb-4">
              <Users className="h-4 w-4" />
              Meet the Team
            </div>
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Built by Students, for Students</h2>
            <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
              A passionate team dedicated to revolutionizing club management in colleges
            </p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6 mb-12">
            {teamMembers.map((member) => (
              <Link
                key={member.name}
                href={member.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="group"
              >
                <div className="relative overflow-hidden rounded-2xl bg-card border border-border hover:border-primary/50 transition-all duration-300 hover:shadow-lg hover:shadow-primary/10">
                  <div className="aspect-square relative overflow-hidden">
                    <Image
                      src={member.image || "/placeholder.svg"}
                      alt={member.name}
                      fill
                      className="object-cover group-hover:scale-110 transition-transform duration-300"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                    <div className="absolute bottom-3 right-3 bg-white rounded-full p-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300 shadow-lg">
                      <Linkedin className="h-4 w-4 text-[#0A66C2]" />
                    </div>
                  </div>
                  <div className="p-4">
                    <h3 className="font-semibold text-center group-hover:text-primary transition-colors">
                      {member.name}
                    </h3>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Acknowledgment Section */}
      <section className="py-16 px-4">
        <div className="container max-w-4xl mx-auto">
          <div className="relative p-8 md:p-12 rounded-3xl bg-gradient-to-br from-primary/10 via-background to-primary/5 border border-primary/20 overflow-hidden">
            <div className="absolute top-0 right-0 w-64 h-64 bg-primary/5 rounded-full blur-3xl" />
            <div className="relative text-center">
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 text-primary text-sm font-medium mb-6">
                <Heart className="h-4 w-4" />
                Acknowledgment
              </div>
              <h2 className="text-2xl md:text-3xl font-bold mb-4">Guided by Excellence</h2>
              <p className="text-lg text-muted-foreground mb-6">
                This project was developed under the invaluable guidance and mentorship of
              </p>
              <div className="inline-block">
                <p className="text-2xl md:text-3xl font-bold text-primary mb-2">Prof. Yogita Bhise</p>
                <p className="text-muted-foreground">Faculty Mentor</p>
              </div>
              <p className="text-muted-foreground mt-6 max-w-2xl mx-auto">
                Her continuous support, insights, and encouragement have been instrumental in bringing{" "}
                <span className="font-semibold text-emerald-500">ClubConn</span> to life and shaping it into a platform
                that truly serves the student community.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 px-4">
        <div className="container max-w-4xl mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">Join Us in Transforming Club Management</h2>
          <p className="text-lg text-muted-foreground mb-8 max-w-2xl mx-auto">
            Be part of a community that values organization, collaboration, and student growth
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/clubs"
              className="inline-flex items-center justify-center px-8 py-3 rounded-lg bg-primary text-primary-foreground font-medium hover:bg-primary/90 transition-colors"
            >
              Explore Clubs
            </Link>
            <Link
              href="/events"
              className="inline-flex items-center justify-center px-8 py-3 rounded-lg border border-border bg-background font-medium hover:bg-muted transition-colors"
            >
              View Events
            </Link>
          </div>
        </div>
      </section>
    </div>
  )
}
