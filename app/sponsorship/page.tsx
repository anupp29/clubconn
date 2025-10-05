"use client"

import { Footer } from "@/components/footer"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Building2, TrendingUp, Users, Award, CheckCircle, ArrowRight } from "lucide-react"
import Link from "next/link"
import { useEffect, useState } from "react"
import { getActiveSponsorshipPackages, type SponsorshipPackage } from "@/lib/sponsorship"

export default function SponsorshipPage() {
  const [packages, setPackages] = useState<SponsorshipPackage[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    async function fetchPackages() {
      const data = await getActiveSponsorshipPackages()
      setPackages(data)
      setLoading(false)
    }
    fetchPackages()
  }, [])

  const getCategoryColor = (category: string) => {
    switch (category) {
      case "platinum":
        return "bg-gradient-to-r from-slate-400 to-slate-600"
      case "gold":
        return "bg-gradient-to-r from-yellow-400 to-yellow-600"
      case "silver":
        return "bg-gradient-to-r from-gray-300 to-gray-500"
      case "bronze":
        return "bg-gradient-to-r from-orange-400 to-orange-600"
      default:
        return "bg-primary"
    }
  }

  return (
    <main className="min-h-screen bg-background">
      {/* Hero Section */}
      <section className="py-20 bg-gradient-to-br from-primary/5 via-background to-background">
        <div className="container">
          <div className="max-w-3xl mx-auto text-center">
            <Badge className="mb-4">Sponsorship Opportunities</Badge>
            <h1 className="text-5xl font-bold mb-6 text-balance">Partner with Student Communities</h1>
            <p className="text-xl text-muted-foreground mb-8 text-pretty">
              Connect your brand with engaged students and support the next generation of leaders through meaningful
              sponsorships.
            </p>
            <div className="flex gap-4 justify-center">
              <Button size="lg" asChild>
                <Link href="/sponsorship/register">
                  Become a Sponsor
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
              <Button size="lg" variant="outline" asChild>
                <Link href="/sponsorship/dashboard">Sponsor Dashboard</Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="py-16 border-b border-border">
        <div className="container">
          <h2 className="text-3xl font-bold text-center mb-12">Why Sponsor Student Clubs?</h2>
          <div className="grid md:grid-cols-4 gap-6">
            <Card>
              <CardContent className="pt-6 text-center">
                <div className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-4">
                  <Users className="h-6 w-6 text-primary" />
                </div>
                <h3 className="font-semibold mb-2">Reach Students</h3>
                <p className="text-sm text-muted-foreground">Connect with thousands of engaged college students</p>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="pt-6 text-center">
                <div className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-4">
                  <Building2 className="h-6 w-6 text-primary" />
                </div>
                <h3 className="font-semibold mb-2">Brand Visibility</h3>
                <p className="text-sm text-muted-foreground">Increase brand awareness on campus and beyond</p>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="pt-6 text-center">
                <div className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-4">
                  <TrendingUp className="h-6 w-6 text-primary" />
                </div>
                <h3 className="font-semibold mb-2">Track Impact</h3>
                <p className="text-sm text-muted-foreground">Real-time analytics on your sponsorship performance</p>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="pt-6 text-center">
                <div className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-4">
                  <Award className="h-6 w-6 text-primary" />
                </div>
                <h3 className="font-semibold mb-2">Support Education</h3>
                <p className="text-sm text-muted-foreground">Invest in the future by supporting student activities</p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Sponsorship Packages */}
      <section className="py-16">
        <div className="container">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">Available Sponsorship Packages</h2>
            <p className="text-muted-foreground">Choose from various sponsorship tiers to match your goals</p>
          </div>

          <Tabs defaultValue="all" className="w-full">
            <TabsList className="grid w-full max-w-md mx-auto grid-cols-5 mb-8">
              <TabsTrigger value="all">All</TabsTrigger>
              <TabsTrigger value="platinum">Platinum</TabsTrigger>
              <TabsTrigger value="gold">Gold</TabsTrigger>
              <TabsTrigger value="silver">Silver</TabsTrigger>
              <TabsTrigger value="bronze">Bronze</TabsTrigger>
            </TabsList>

            <TabsContent value="all" className="space-y-6">
              {loading ? (
                <div className="text-center py-12">
                  <p className="text-muted-foreground">Loading packages...</p>
                </div>
              ) : packages.length === 0 ? (
                <div className="text-center py-12">
                  <p className="text-muted-foreground">No sponsorship packages available at the moment.</p>
                </div>
              ) : (
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {packages.map((pkg) => (
                    <Card key={pkg.id} className="flex flex-col">
                      <CardHeader>
                        <div className={`h-2 w-full rounded-full mb-4 ${getCategoryColor(pkg.category)}`} />
                        <div className="flex items-start justify-between mb-2">
                          <div>
                            <Badge variant="outline" className="mb-2 capitalize">
                              {pkg.category}
                            </Badge>
                            <CardTitle className="text-xl">{pkg.title}</CardTitle>
                          </div>
                          <div className="text-right">
                            <div className="text-2xl font-bold">${pkg.price.toLocaleString()}</div>
                            <div className="text-xs text-muted-foreground">{pkg.duration} months</div>
                          </div>
                        </div>
                        <p className="text-sm text-muted-foreground">{pkg.clubName}</p>
                      </CardHeader>
                      <CardContent className="flex-1 flex flex-col">
                        <p className="text-sm mb-4">{pkg.description}</p>

                        <div className="space-y-2 mb-6">
                          <p className="text-sm font-semibold">Benefits:</p>
                          {pkg.benefits.map((benefit, index) => (
                            <div key={index} className="flex items-start gap-2 text-sm">
                              <CheckCircle className="h-4 w-4 text-green-500 flex-shrink-0 mt-0.5" />
                              <span>{benefit}</span>
                            </div>
                          ))}
                        </div>

                        <div className="mt-auto">
                          <div className="flex items-center justify-between text-sm mb-4">
                            <span className="text-muted-foreground">Available Spots:</span>
                            <span className="font-medium">
                              {pkg.maxSponsors - pkg.currentSponsors} / {pkg.maxSponsors}
                            </span>
                          </div>
                          <Button className="w-full" asChild>
                            <Link href={`/sponsorship/packages/${pkg.id}`}>View Details</Link>
                          </Button>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              )}
            </TabsContent>

            {["platinum", "gold", "silver", "bronze"].map((category) => (
              <TabsContent key={category} value={category} className="space-y-6">
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {packages
                    .filter((pkg) => pkg.category === category)
                    .map((pkg) => (
                      <Card key={pkg.id} className="flex flex-col">
                        <CardHeader>
                          <div className={`h-2 w-full rounded-full mb-4 ${getCategoryColor(pkg.category)}`} />
                          <div className="flex items-start justify-between mb-2">
                            <div>
                              <Badge variant="outline" className="mb-2 capitalize">
                                {pkg.category}
                              </Badge>
                              <CardTitle className="text-xl">{pkg.title}</CardTitle>
                            </div>
                            <div className="text-right">
                              <div className="text-2xl font-bold">${pkg.price.toLocaleString()}</div>
                              <div className="text-xs text-muted-foreground">{pkg.duration} months</div>
                            </div>
                          </div>
                          <p className="text-sm text-muted-foreground">{pkg.clubName}</p>
                        </CardHeader>
                        <CardContent className="flex-1 flex flex-col">
                          <p className="text-sm mb-4">{pkg.description}</p>

                          <div className="space-y-2 mb-6">
                            <p className="text-sm font-semibold">Benefits:</p>
                            {pkg.benefits.map((benefit, index) => (
                              <div key={index} className="flex items-start gap-2 text-sm">
                                <CheckCircle className="h-4 w-4 text-green-500 flex-shrink-0 mt-0.5" />
                                <span>{benefit}</span>
                              </div>
                            ))}
                          </div>

                          <div className="mt-auto">
                            <div className="flex items-center justify-between text-sm mb-4">
                              <span className="text-muted-foreground">Available Spots:</span>
                              <span className="font-medium">
                                {pkg.maxSponsors - pkg.currentSponsors} / {pkg.maxSponsors}
                              </span>
                            </div>
                            <Button className="w-full" asChild>
                              <Link href={`/sponsorship/packages/${pkg.id}`}>View Details</Link>
                            </Button>
                          </div>
                        </CardContent>
                      </Card>
                    ))}
                </div>
              </TabsContent>
            ))}
          </Tabs>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-primary/5">
        <div className="container">
          <div className="max-w-2xl mx-auto text-center">
            <h2 className="text-3xl font-bold mb-4">Ready to Make an Impact?</h2>
            <p className="text-muted-foreground mb-8">
              Join leading companies in supporting student communities and building your brand presence on campus.
            </p>
            <Button size="lg" asChild>
              <Link href="/sponsorship/register">
                Get Started Today
                <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  )
}
