"use client"

import { type Certificate, formatCertificateDate } from "@/lib/certificates"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Award, Download, Share2, CheckCircle } from "lucide-react"

interface CertificateCardProps {
  certificate: Certificate
}

export function CertificateCard({ certificate }: CertificateCardProps) {
  const handleDownload = () => {
    // Navigate to certificate view page which will have download functionality
    window.open(`/certificates/${certificate.id}`, "_blank")
  }

  const handleShare = async () => {
    const shareData = {
      title: certificate.title,
      text: `I earned a ${certificate.title} from ${certificate.issuedBy}!`,
      url: `${window.location.origin}/certificates/${certificate.id}`,
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

  const typeColors = {
    event: "from-blue-500 to-cyan-500",
    club: "from-purple-500 to-pink-500",
    achievement: "from-yellow-500 to-orange-500",
    participation: "from-green-500 to-emerald-500",
  }

  return (
    <Card className="overflow-hidden hover:shadow-lg transition-shadow">
      <div className={`h-2 bg-gradient-to-r ${typeColors[certificate.type]}`} />
      <CardContent className="p-6">
        <div className="flex items-start justify-between mb-4">
          <div className="flex items-center gap-3">
            <div
              className={`h-12 w-12 rounded-lg bg-gradient-to-br ${typeColors[certificate.type]} flex items-center justify-center`}
            >
              <Award className="h-6 w-6 text-white" />
            </div>
            <div>
              <h3 className="font-semibold text-lg">{certificate.title}</h3>
              <p className="text-sm text-muted-foreground">{certificate.issuedBy}</p>
            </div>
          </div>
          <Badge variant="outline" className="capitalize">
            {certificate.type}
          </Badge>
        </div>

        <p className="text-sm text-muted-foreground mb-4">{certificate.description}</p>

        <div className="flex items-center gap-2 mb-4 text-sm text-muted-foreground">
          <CheckCircle className="h-4 w-4 text-green-500" />
          <span>Issued on {formatCertificateDate(certificate.issuedDate)}</span>
        </div>

        {certificate.metadata && (
          <div className="mb-4 p-3 bg-muted rounded-lg text-sm space-y-1">
            {certificate.metadata.eventDate && (
              <p>
                <span className="font-medium">Event Date:</span> {certificate.metadata.eventDate}
              </p>
            )}
            {certificate.metadata.eventLocation && (
              <p>
                <span className="font-medium">Location:</span> {certificate.metadata.eventLocation}
              </p>
            )}
            {certificate.metadata.hoursAttended && (
              <p>
                <span className="font-medium">Hours:</span> {certificate.metadata.hoursAttended}
              </p>
            )}
            {certificate.metadata.role && (
              <p>
                <span className="font-medium">Role:</span> {certificate.metadata.role}
              </p>
            )}
          </div>
        )}

        <div className="flex gap-2">
          <Button size="sm" onClick={handleDownload} className="flex-1">
            <Download className="mr-2 h-4 w-4" />
            View & Download
          </Button>
          <Button size="sm" variant="outline" onClick={handleShare}>
            <Share2 className="h-4 w-4" />
          </Button>
        </div>

        <p className="text-xs text-muted-foreground mt-3 text-center">
          Verification Code: {certificate.verificationCode}
        </p>
      </CardContent>
    </Card>
  )
}
