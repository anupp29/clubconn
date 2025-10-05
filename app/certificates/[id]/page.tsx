"use client"
import { Footer } from "@/components/footer"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Download, Share2, Loader2, ArrowLeft, ShieldCheck } from "lucide-react"
import { useAuth } from "@/contexts/auth-context"
import { useRouter, useParams } from "next/navigation"
import { useEffect, useState, useRef } from "react"
import { getCertificateById, type Certificate } from "@/lib/certificates"
import { CertificateTemplate } from "@/components/certificate-template"
import Link from "next/link"

export default function CertificateViewPage() {
  const { user, userProfile, loading: authLoading } = useAuth()
  const router = useRouter()
  const params = useParams()
  const certificateRef = useRef<HTMLDivElement>(null)

  const [certificate, setCertificate] = useState<Certificate | null>(null)
  const [loading, setLoading] = useState(true)
  const [downloading, setDownloading] = useState(false)

  useEffect(() => {
    async function fetchCertificate() {
      const id = params.id as string
      if (!id) return

      setLoading(true)
      try {
        const cert = await getCertificateById(id)
        setCertificate(cert)
      } catch (error) {
        console.error("[v0] Error fetching certificate:", error)
      } finally {
        setLoading(false)
      }
    }

    fetchCertificate()
  }, [params.id])

  const handleDownload = async () => {
    if (!certificateRef.current || !certificate) return

    setDownloading(true)
    try {
      // Dynamically import html2canvas and jsPDF
      const html2canvas = (await import("html2canvas")).default
      const { jsPDF } = await import("jspdf")

      // Capture the certificate as canvas
      const canvas = await html2canvas(certificateRef.current, {
        scale: 2,
        backgroundColor: "#ffffff",
        logging: false,
      })

      // Create PDF
      const imgData = canvas.toDataURL("image/png")
      const pdf = new jsPDF({
        orientation: "landscape",
        unit: "mm",
        format: "a4",
      })

      const pdfWidth = pdf.internal.pageSize.getWidth()
      const pdfHeight = pdf.internal.pageSize.getHeight()

      pdf.addImage(imgData, "PNG", 0, 0, pdfWidth, pdfHeight)
      pdf.save(`certificate-${certificate.verificationCode}.pdf`)
    } catch (error) {
      console.error("[v0] Error downloading certificate:", error)
      alert("Failed to download certificate. Please try again.")
    } finally {
      setDownloading(false)
    }
  }

  const handleShare = async () => {
    if (!certificate) return

    const shareData = {
      title: certificate.title,
      text: `I earned a ${certificate.title} from ${certificate.issuedBy}!`,
      url: window.location.href,
    }

    if (navigator.share) {
      try {
        await navigator.share(shareData)
      } catch (error) {
        console.log("Error sharing:", error)
      }
    } else {
      // Fallback: copy link to clipboard
      navigator.clipboard.writeText(shareData.url)
      alert("Certificate link copied to clipboard!")
    }
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="flex flex-col items-center gap-4">
          <Loader2 className="h-8 w-8 animate-spin text-primary" />
          <p className="text-muted-foreground">Loading certificate...</p>
        </div>
      </div>
    )
  }

  if (!certificate) {
    return (
      <div className="min-h-screen bg-background">
        <div className="container py-16 text-center">
          <h1 className="text-2xl font-bold mb-4">Certificate Not Found</h1>
          <p className="text-muted-foreground mb-6">The certificate you're looking for doesn't exist.</p>
          <Button asChild>
            <Link href="/certificates">
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back to Certificates
            </Link>
          </Button>
        </div>
        <Footer />
      </div>
    )
  }

  return (
    <main className="min-h-screen bg-background">
      <div className="container py-8">
        {/* Header */}
        <div className="mb-6 flex items-center justify-between">
          <Button variant="ghost" asChild>
            <Link href="/certificates">
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back to Certificates
            </Link>
          </Button>

          <div className="flex gap-2">
            <Button onClick={handleShare} variant="outline">
              <Share2 className="mr-2 h-4 w-4" />
              Share
            </Button>
            <Button onClick={handleDownload} disabled={downloading}>
              {downloading ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Downloading...
                </>
              ) : (
                <>
                  <Download className="mr-2 h-4 w-4" />
                  Download PDF
                </>
              )}
            </Button>
          </div>
        </div>

        {/* Certificate Preview */}
        <div className="mb-6">
          <Card className="overflow-hidden">
            <CardContent className="p-0">
              <div ref={certificateRef}>
                <CertificateTemplate certificate={certificate} recipientName={userProfile?.displayName || "Student"} />
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Verification Info */}
        <Card>
          <CardContent className="p-6">
            <div className="flex items-start gap-4">
              <div className="h-12 w-12 rounded-full bg-green-500/10 flex items-center justify-center flex-shrink-0">
                <ShieldCheck className="h-6 w-6 text-green-500" />
              </div>
              <div className="flex-1">
                <h3 className="font-semibold mb-2">Certificate Verification</h3>
                <p className="text-sm text-muted-foreground mb-3">
                  This certificate is authentic and can be verified using the verification code below. Anyone can verify
                  this certificate by entering the code on the certificates page.
                </p>
                <div className="flex items-center gap-2">
                  <code className="px-3 py-2 bg-muted rounded-lg font-mono text-sm">
                    {certificate.verificationCode}
                  </code>
                  <Button
                    size="sm"
                    variant="outline"
                    onClick={() => {
                      navigator.clipboard.writeText(certificate.verificationCode)
                      alert("Verification code copied!")
                    }}
                  >
                    Copy
                  </Button>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <Footer />
    </main>
  )
}
