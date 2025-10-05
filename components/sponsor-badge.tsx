"use client"

import { useEffect, useState } from "react"
import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Building2 } from "lucide-react"
import {
  getClubSponsors,
  getSponsorById,
  trackSponsorshipImpression,
  trackSponsorshipClick,
  type Sponsor,
} from "@/lib/sponsorship"

interface SponsorBadgeProps {
  clubId: string
  variant?: "compact" | "full"
}

export function SponsorBadge({ clubId, variant = "compact" }: SponsorBadgeProps) {
  const [sponsors, setSponsors] = useState<Array<{ sponsor: Sponsor; sponsorshipId: string }>>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    async function fetchSponsors() {
      const sponsorships = await getClubSponsors(clubId)

      const sponsorsData = await Promise.all(
        sponsorships.map(async (sponsorship) => {
          const sponsor = await getSponsorById(sponsorship.sponsorId)
          if (sponsor) {
            // Track impression
            await trackSponsorshipImpression(sponsorship.id)
            return { sponsor, sponsorshipId: sponsorship.id }
          }
          return null
        }),
      )

      setSponsors(sponsorsData.filter((s) => s !== null) as Array<{ sponsor: Sponsor; sponsorshipId: string }>)
      setLoading(false)
    }

    fetchSponsors()
  }, [clubId])

  const handleSponsorClick = async (sponsorshipId: string, website: string) => {
    await trackSponsorshipClick(sponsorshipId)
    window.open(website, "_blank")
  }

  if (loading || sponsors.length === 0) return null

  if (variant === "compact") {
    return (
      <div className="flex items-center gap-2 flex-wrap">
        <Badge variant="outline" className="gap-1">
          <Building2 className="h-3 w-3" />
          Sponsored by
        </Badge>
        {sponsors.slice(0, 3).map(({ sponsor, sponsorshipId }) => (
          <button
            key={sponsorshipId}
            onClick={() => handleSponsorClick(sponsorshipId, sponsor.website)}
            className="text-sm font-medium text-primary hover:underline"
          >
            {sponsor.companyName}
          </button>
        ))}
        {sponsors.length > 3 && <span className="text-sm text-muted-foreground">+{sponsors.length - 3} more</span>}
      </div>
    )
  }

  return (
    <Card className="p-4">
      <h3 className="text-sm font-semibold mb-3 flex items-center gap-2">
        <Building2 className="h-4 w-4" />
        Our Sponsors
      </h3>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {sponsors.map(({ sponsor, sponsorshipId }) => (
          <button
            key={sponsorshipId}
            onClick={() => handleSponsorClick(sponsorshipId, sponsor.website)}
            className="flex flex-col items-center gap-2 p-3 rounded-lg border border-border hover:border-primary transition-colors"
          >
            <div className="h-12 w-12 rounded-full bg-muted flex items-center justify-center">
              <Building2 className="h-6 w-6 text-muted-foreground" />
            </div>
            <span className="text-xs font-medium text-center">{sponsor.companyName}</span>
          </button>
        ))}
      </div>
    </Card>
  )
}
