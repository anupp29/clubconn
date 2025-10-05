"use client"

import { QRCodeSVG } from "qrcode.react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Download, QrCode } from "lucide-react"

interface EventQRCodeProps {
  eventId: string
  eventTitle: string
}

export function EventQRCode({ eventId, eventTitle }: EventQRCodeProps) {
  const checkInUrl = `${typeof window !== "undefined" ? window.location.origin : ""}/events/${eventId}/checkin`

  const handleDownload = () => {
    const svg = document.getElementById("event-qr-code")
    if (!svg) return

    const svgData = new XMLSerializer().serializeToString(svg)
    const canvas = document.createElement("canvas")
    const ctx = canvas.getContext("2d")
    const img = new Image()

    img.onload = () => {
      canvas.width = img.width
      canvas.height = img.height
      ctx?.drawImage(img, 0, 0)
      const pngFile = canvas.toDataURL("image/png")

      const downloadLink = document.createElement("a")
      downloadLink.download = `${eventTitle}-qr-code.png`
      downloadLink.href = pngFile
      downloadLink.click()
    }

    img.src = "data:image/svg+xml;base64," + btoa(svgData)
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <QrCode className="h-5 w-5" />
          Event Check-in QR Code
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="flex justify-center p-6 bg-white rounded-lg">
          <QRCodeSVG id="event-qr-code" value={checkInUrl} size={256} level="H" includeMargin />
        </div>
        <p className="text-sm text-muted-foreground text-center">Scan this QR code to check in to the event</p>
        <Button onClick={handleDownload} variant="outline" className="w-full bg-transparent">
          <Download className="mr-2 h-4 w-4" />
          Download QR Code
        </Button>
      </CardContent>
    </Card>
  )
}
