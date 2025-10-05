"use client"
import { Footer } from "@/components/footer"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Award, Search, Loader2, ShieldCheck } from "lucide-react"
import { useAuth } from "@/contexts/auth-context"
import { useRouter } from "next/navigation"
import { useEffect, useState } from "react"
import { getUserCertificates, verifyCertificate, type Certificate } from "@/lib/certificates"
import { CertificateCard } from "@/components/certificate-card"

export default function CertificatesPage() {
  const { user, loading: authLoading } = useAuth()
  const router = useRouter()

  const [certificates, setCertificates] = useState<Certificate[]>([])
  const [loading, setLoading] = useState(true)
  const [verificationCode, setVerificationCode] = useState("")
  const [verifying, setVerifying] = useState(false)
  const [verifiedCertificate, setVerifiedCertificate] = useState<Certificate | null>(null)
  const [verificationError, setVerificationError] = useState("")

  useEffect(() => {
    if (!authLoading && !user) {
      router.push("/")
    }
  }, [user, authLoading, router])

  useEffect(() => {
    async function fetchCertificates() {
      if (!user) return

      setLoading(true)
      try {
        const certs = await getUserCertificates(user.uid)
        setCertificates(certs)
      } catch (error) {
        console.error("[v0] Error fetching certificates:", error)
      } finally {
        setLoading(false)
      }
    }

    fetchCertificates()
  }, [user])

  const handleVerify = async () => {
    if (!verificationCode.trim()) {
      setVerificationError("Please enter a verification code")
      return
    }

    setVerifying(true)
    setVerificationError("")
    setVerifiedCertificate(null)

    try {
      const cert = await verifyCertificate(verificationCode.trim())
      if (cert) {
        setVerifiedCertificate(cert)
      } else {
        setVerificationError("Invalid verification code. Please check and try again.")
      }
    } catch (error) {
      console.error("[v0] Error verifying certificate:", error)
      setVerificationError("An error occurred while verifying. Please try again.")
    } finally {
      setVerifying(false)
    }
  }

  if (authLoading || loading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="flex flex-col items-center gap-4">
          <Loader2 className="h-8 w-8 animate-spin text-primary" />
          <p className="text-muted-foreground">Loading certificates...</p>
        </div>
      </div>
    )
  }

  if (!user) {
    return null
  }

  const eventCertificates = certificates.filter((c) => c.type === "event")
  const clubCertificates = certificates.filter((c) => c.type === "club")
  const achievementCertificates = certificates.filter((c) => c.type === "achievement")

  return (
    <main className="min-h-screen bg-background">
      <div className="container py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold mb-2 flex items-center gap-3">
            <Award className="h-10 w-10 text-primary" />
            My Certificates
          </h1>
          <p className="text-muted-foreground">
            View and download your earned certificates. Share your achievements with the world!
          </p>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
          <Card>
            <CardContent className="pt-6">
              <div className="text-center">
                <p className="text-3xl font-bold text-primary">{certificates.length}</p>
                <p className="text-sm text-muted-foreground">Total Certificates</p>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="pt-6">
              <div className="text-center">
                <p className="text-3xl font-bold text-blue-500">{eventCertificates.length}</p>
                <p className="text-sm text-muted-foreground">Event Certificates</p>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="pt-6">
              <div className="text-center">
                <p className="text-3xl font-bold text-purple-500">{clubCertificates.length}</p>
                <p className="text-sm text-muted-foreground">Club Certificates</p>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="pt-6">
              <div className="text-center">
                <p className="text-3xl font-bold text-yellow-500">{achievementCertificates.length}</p>
                <p className="text-sm text-muted-foreground">Achievements</p>
              </div>
            </CardContent>
          </Card>
        </div>

        <Tabs defaultValue="all" className="space-y-6">
          <TabsList className="grid w-full grid-cols-5">
            <TabsTrigger value="all">All ({certificates.length})</TabsTrigger>
            <TabsTrigger value="events">Events ({eventCertificates.length})</TabsTrigger>
            <TabsTrigger value="clubs">Clubs ({clubCertificates.length})</TabsTrigger>
            <TabsTrigger value="achievements">Achievements ({achievementCertificates.length})</TabsTrigger>
            <TabsTrigger value="verify">Verify</TabsTrigger>
          </TabsList>

          <TabsContent value="all" className="space-y-4">
            {certificates.length === 0 ? (
              <Card>
                <CardContent className="py-12 text-center">
                  <Award className="h-16 w-16 mx-auto mb-4 text-muted-foreground opacity-50" />
                  <h3 className="text-lg font-semibold mb-2">No Certificates Yet</h3>
                  <p className="text-muted-foreground mb-4">
                    Attend events, participate in clubs, and earn achievements to get certificates!
                  </p>
                  <Button asChild>
                    <a href="/dashboard">Go to Dashboard</a>
                  </Button>
                </CardContent>
              </Card>
            ) : (
              <div className="grid md:grid-cols-2 gap-6">
                {certificates.map((cert) => (
                  <CertificateCard key={cert.id} certificate={cert} />
                ))}
              </div>
            )}
          </TabsContent>

          <TabsContent value="events" className="space-y-4">
            {eventCertificates.length === 0 ? (
              <Card>
                <CardContent className="py-12 text-center">
                  <Award className="h-16 w-16 mx-auto mb-4 text-muted-foreground opacity-50" />
                  <p className="text-muted-foreground">No event certificates yet. Attend events to earn them!</p>
                </CardContent>
              </Card>
            ) : (
              <div className="grid md:grid-cols-2 gap-6">
                {eventCertificates.map((cert) => (
                  <CertificateCard key={cert.id} certificate={cert} />
                ))}
              </div>
            )}
          </TabsContent>

          <TabsContent value="clubs" className="space-y-4">
            {clubCertificates.length === 0 ? (
              <Card>
                <CardContent className="py-12 text-center">
                  <Award className="h-16 w-16 mx-auto mb-4 text-muted-foreground opacity-50" />
                  <p className="text-muted-foreground">
                    No club certificates yet. Participate actively in clubs to earn them!
                  </p>
                </CardContent>
              </Card>
            ) : (
              <div className="grid md:grid-cols-2 gap-6">
                {clubCertificates.map((cert) => (
                  <CertificateCard key={cert.id} certificate={cert} />
                ))}
              </div>
            )}
          </TabsContent>

          <TabsContent value="achievements" className="space-y-4">
            {achievementCertificates.length === 0 ? (
              <Card>
                <CardContent className="py-12 text-center">
                  <Award className="h-16 w-16 mx-auto mb-4 text-muted-foreground opacity-50" />
                  <p className="text-muted-foreground">
                    No achievement certificates yet. Complete challenges to earn them!
                  </p>
                </CardContent>
              </Card>
            ) : (
              <div className="grid md:grid-cols-2 gap-6">
                {achievementCertificates.map((cert) => (
                  <CertificateCard key={cert.id} certificate={cert} />
                ))}
              </div>
            )}
          </TabsContent>

          <TabsContent value="verify" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <ShieldCheck className="h-5 w-5" />
                  Verify Certificate
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <p className="text-sm text-muted-foreground">
                  Enter a verification code to check if a certificate is authentic and view its details.
                </p>

                <div className="flex gap-2">
                  <Input
                    placeholder="Enter verification code (e.g., ABCD-1234-EFGH-5678)"
                    value={verificationCode}
                    onChange={(e) => setVerificationCode(e.target.value)}
                    onKeyDown={(e) => e.key === "Enter" && handleVerify()}
                  />
                  <Button onClick={handleVerify} disabled={verifying}>
                    {verifying ? (
                      <>
                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                        Verifying
                      </>
                    ) : (
                      <>
                        <Search className="mr-2 h-4 w-4" />
                        Verify
                      </>
                    )}
                  </Button>
                </div>

                {verificationError && (
                  <div className="p-4 bg-destructive/10 border border-destructive/20 rounded-lg">
                    <p className="text-sm text-destructive">{verificationError}</p>
                  </div>
                )}

                {verifiedCertificate && (
                  <div className="mt-6">
                    <div className="p-4 bg-green-500/10 border border-green-500/20 rounded-lg mb-4">
                      <p className="text-sm text-green-600 dark:text-green-400 font-medium flex items-center gap-2">
                        <ShieldCheck className="h-4 w-4" />
                        Certificate Verified Successfully!
                      </p>
                    </div>
                    <CertificateCard certificate={verifiedCertificate} />
                  </div>
                )}
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>

      <Footer />
    </main>
  )
}
