import { type Certificate, formatCertificateDate } from "@/lib/certificates"
import { Award, ShieldCheck } from "lucide-react"

interface CertificateTemplateProps {
  certificate: Certificate
  recipientName: string
}

export function CertificateTemplate({ certificate, recipientName }: CertificateTemplateProps) {
  return (
    <div className="w-full aspect-[1.414/1] bg-gradient-to-br from-background via-background to-muted p-12 relative overflow-hidden">
      {/* Decorative Background Elements */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute top-0 left-0 w-64 h-64 bg-primary rounded-full blur-3xl" />
        <div className="absolute bottom-0 right-0 w-64 h-64 bg-primary rounded-full blur-3xl" />
      </div>

      {/* Border */}
      <div className="absolute inset-8 border-4 border-primary/20 rounded-lg" />
      <div className="absolute inset-10 border border-primary/10 rounded-lg" />

      {/* Content */}
      <div className="relative h-full flex flex-col items-center justify-center text-center px-12">
        {/* Logo/Icon */}
        <div className="mb-6">
          <div className="h-20 w-20 rounded-full bg-gradient-to-br from-primary to-primary/60 flex items-center justify-center mx-auto mb-4">
            <Award className="h-10 w-10 text-white" />
          </div>
          <h1 className="text-4xl font-bold text-primary mb-2">ClubConn</h1>
          <p className="text-sm text-muted-foreground">Student Engagement Platform</p>
        </div>

        {/* Certificate Title */}
        <div className="mb-8">
          <h2 className="text-5xl font-bold mb-4 bg-gradient-to-r from-primary to-primary/60 bg-clip-text text-transparent">
            {certificate.title}
          </h2>
          <div className="h-1 w-32 bg-gradient-to-r from-transparent via-primary to-transparent mx-auto" />
        </div>

        {/* Recipient */}
        <div className="mb-8">
          <p className="text-lg text-muted-foreground mb-2">This certificate is proudly presented to</p>
          <h3 className="text-4xl font-bold mb-4">{recipientName}</h3>
          <p className="text-lg text-muted-foreground max-w-2xl">
            {certificate.description}
            {certificate.metadata?.eventDate && ` on ${certificate.metadata.eventDate}`}
          </p>
        </div>

        {/* Additional Details */}
        {certificate.metadata && (
          <div className="mb-8 flex flex-wrap justify-center gap-6 text-sm text-muted-foreground">
            {certificate.metadata.eventLocation && (
              <div>
                <span className="font-medium">Location:</span> {certificate.metadata.eventLocation}
              </div>
            )}
            {certificate.metadata.hoursAttended && (
              <div>
                <span className="font-medium">Duration:</span> {certificate.metadata.hoursAttended} hours
              </div>
            )}
            {certificate.metadata.role && (
              <div>
                <span className="font-medium">Role:</span> {certificate.metadata.role}
              </div>
            )}
          </div>
        )}

        {/* Issuer and Date */}
        <div className="mt-auto pt-8 flex items-center justify-between w-full max-w-2xl">
          <div className="text-left">
            <div className="h-px w-48 bg-border mb-2" />
            <p className="text-sm font-medium">{certificate.issuedBy}</p>
            <p className="text-xs text-muted-foreground">Issuing Authority</p>
          </div>
          <div className="text-right">
            <div className="h-px w-48 bg-border mb-2" />
            <p className="text-sm font-medium">{formatCertificateDate(certificate.issuedDate)}</p>
            <p className="text-xs text-muted-foreground">Date of Issue</p>
          </div>
        </div>

        {/* Verification Code */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex items-center gap-2 text-xs text-muted-foreground">
          <ShieldCheck className="h-3 w-3" />
          <span>Verification Code: {certificate.verificationCode}</span>
        </div>
      </div>
    </div>
  )
}
