import {
  collection,
  doc,
  getDoc,
  getDocs,
  query,
  where,
  addDoc,
  updateDoc,
  Timestamp,
  orderBy,
} from "firebase/firestore"
import { db } from "./firebase"

// Sponsorship Types
export interface SponsorshipPackage {
  id: string
  clubId: string
  clubName: string
  title: string
  description: string
  benefits: string[]
  price: number
  duration: number // in months
  maxSponsors: number
  currentSponsors: number
  category: "bronze" | "silver" | "gold" | "platinum"
  isActive: boolean
  createdAt: Timestamp
}

export interface Sponsor {
  id: string
  companyName: string
  logo: string
  website: string
  description: string
  contactEmail: string
  contactPhone?: string
  industry: string
  createdAt: Timestamp
}

export interface Sponsorship {
  id: string
  sponsorId: string
  packageId: string
  clubId: string
  status: "pending" | "active" | "expired" | "cancelled"
  startDate: Timestamp
  endDate: Timestamp
  amount: number
  benefits: string[]
  impressions: number
  clicks: number
  createdAt: Timestamp
}

export interface SponsorshipAnalytics {
  sponsorshipId: string
  totalImpressions: number
  totalClicks: number
  eventsSponsored: number
  studentsReached: number
  engagementRate: number
}

// Create sponsorship package
export async function createSponsorshipPackage(
  clubId: string,
  clubName: string,
  title: string,
  description: string,
  benefits: string[],
  price: number,
  duration: number,
  maxSponsors: number,
  category: "bronze" | "silver" | "gold" | "platinum",
): Promise<SponsorshipPackage | null> {
  try {
    const packageData: Omit<SponsorshipPackage, "id"> = {
      clubId,
      clubName,
      title,
      description,
      benefits,
      price,
      duration,
      maxSponsors,
      currentSponsors: 0,
      category,
      isActive: true,
      createdAt: Timestamp.now(),
    }

    const docRef = await addDoc(collection(db, "sponsorship_packages"), packageData)

    console.log(`[v0] Sponsorship package created: ${title}`)

    return {
      id: docRef.id,
      ...packageData,
    }
  } catch (error) {
    console.error("[v0] Error creating sponsorship package:", error)
    return null
  }
}

// Get all active sponsorship packages
export async function getActiveSponsorshipPackages(): Promise<SponsorshipPackage[]> {
  try {
    const q = query(collection(db, "sponsorship_packages"), where("isActive", "==", true), orderBy("price", "desc"))
    const snapshot = await getDocs(q)

    return snapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    })) as SponsorshipPackage[]
  } catch (error) {
    console.error("[v0] Error fetching sponsorship packages:", error)
    return []
  }
}

// Get club sponsorship packages
export async function getClubSponsorshipPackages(clubId: string): Promise<SponsorshipPackage[]> {
  try {
    const q = query(collection(db, "sponsorship_packages"), where("clubId", "==", clubId))
    const snapshot = await getDocs(q)

    return snapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    })) as SponsorshipPackage[]
  } catch (error) {
    console.error("[v0] Error fetching club packages:", error)
    return []
  }
}

// Register as sponsor
export async function registerSponsor(
  companyName: string,
  logo: string,
  website: string,
  description: string,
  contactEmail: string,
  industry: string,
  contactPhone?: string,
): Promise<Sponsor | null> {
  try {
    const sponsorData: Omit<Sponsor, "id"> = {
      companyName,
      logo,
      website,
      description,
      contactEmail,
      contactPhone,
      industry,
      createdAt: Timestamp.now(),
    }

    const docRef = await addDoc(collection(db, "sponsors"), sponsorData)

    console.log(`[v0] Sponsor registered: ${companyName}`)

    return {
      id: docRef.id,
      ...sponsorData,
    }
  } catch (error) {
    console.error("[v0] Error registering sponsor:", error)
    return null
  }
}

// Create sponsorship
export async function createSponsorship(
  sponsorId: string,
  packageId: string,
  clubId: string,
  amount: number,
  benefits: string[],
  durationMonths: number,
): Promise<Sponsorship | null> {
  try {
    const startDate = Timestamp.now()
    const endDate = Timestamp.fromDate(new Date(Date.now() + durationMonths * 30 * 24 * 60 * 60 * 1000))

    const sponsorshipData: Omit<Sponsorship, "id"> = {
      sponsorId,
      packageId,
      clubId,
      status: "pending",
      startDate,
      endDate,
      amount,
      benefits,
      impressions: 0,
      clicks: 0,
      createdAt: Timestamp.now(),
    }

    const docRef = await addDoc(collection(db, "sponsorships"), sponsorshipData)

    // Update package current sponsors count
    const packageRef = doc(db, "sponsorship_packages", packageId)
    const packageDoc = await getDoc(packageRef)

    if (packageDoc.exists()) {
      const currentSponsors = packageDoc.data().currentSponsors || 0
      await updateDoc(packageRef, {
        currentSponsors: currentSponsors + 1,
      })
    }

    console.log(`[v0] Sponsorship created for package ${packageId}`)

    return {
      id: docRef.id,
      ...sponsorshipData,
    }
  } catch (error) {
    console.error("[v0] Error creating sponsorship:", error)
    return null
  }
}

// Get sponsor's active sponsorships
export async function getSponsorSponsorships(sponsorId: string): Promise<Sponsorship[]> {
  try {
    const q = query(collection(db, "sponsorships"), where("sponsorId", "==", sponsorId), orderBy("createdAt", "desc"))
    const snapshot = await getDocs(q)

    return snapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    })) as Sponsorship[]
  } catch (error) {
    console.error("[v0] Error fetching sponsorships:", error)
    return []
  }
}

// Get club's active sponsors
export async function getClubSponsors(clubId: string): Promise<Sponsorship[]> {
  try {
    const q = query(
      collection(db, "sponsorships"),
      where("clubId", "==", clubId),
      where("status", "==", "active"),
      orderBy("createdAt", "desc"),
    )
    const snapshot = await getDocs(q)

    return snapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    })) as Sponsorship[]
  } catch (error) {
    console.error("[v0] Error fetching club sponsors:", error)
    return []
  }
}

// Track sponsorship impression
export async function trackSponsorshipImpression(sponsorshipId: string): Promise<void> {
  try {
    const sponsorshipRef = doc(db, "sponsorships", sponsorshipId)
    const sponsorshipDoc = await getDoc(sponsorshipRef)

    if (sponsorshipDoc.exists()) {
      const currentImpressions = sponsorshipDoc.data().impressions || 0
      await updateDoc(sponsorshipRef, {
        impressions: currentImpressions + 1,
      })
    }
  } catch (error) {
    console.error("[v0] Error tracking impression:", error)
  }
}

// Track sponsorship click
export async function trackSponsorshipClick(sponsorshipId: string): Promise<void> {
  try {
    const sponsorshipRef = doc(db, "sponsorships", sponsorshipId)
    const sponsorshipDoc = await getDoc(sponsorshipRef)

    if (sponsorshipDoc.exists()) {
      const currentClicks = sponsorshipDoc.data().clicks || 0
      await updateDoc(sponsorshipRef, {
        clicks: currentClicks + 1,
      })
    }
  } catch (error) {
    console.error("[v0] Error tracking click:", error)
  }
}

// Get sponsorship analytics
export async function getSponsorshipAnalytics(sponsorshipId: string): Promise<SponsorshipAnalytics | null> {
  try {
    const sponsorshipRef = doc(db, "sponsorships", sponsorshipId)
    const sponsorshipDoc = await getDoc(sponsorshipRef)

    if (!sponsorshipDoc.exists()) return null

    const sponsorshipData = sponsorshipDoc.data() as Sponsorship

    // Calculate engagement rate
    const engagementRate =
      sponsorshipData.impressions > 0 ? (sponsorshipData.clicks / sponsorshipData.impressions) * 100 : 0

    return {
      sponsorshipId,
      totalImpressions: sponsorshipData.impressions,
      totalClicks: sponsorshipData.clicks,
      eventsSponsored: 0, // This would need to be calculated from events
      studentsReached: sponsorshipData.impressions, // Approximation
      engagementRate,
    }
  } catch (error) {
    console.error("[v0] Error fetching analytics:", error)
    return null
  }
}

// Get sponsor by ID
export async function getSponsorById(sponsorId: string): Promise<Sponsor | null> {
  try {
    const sponsorRef = doc(db, "sponsors", sponsorId)
    const sponsorDoc = await getDoc(sponsorRef)

    if (!sponsorDoc.exists()) return null

    return {
      id: sponsorDoc.id,
      ...sponsorDoc.data(),
    } as Sponsor
  } catch (error) {
    console.error("[v0] Error fetching sponsor:", error)
    return null
  }
}

// Approve sponsorship
export async function approveSponsorship(sponsorshipId: string): Promise<boolean> {
  try {
    const sponsorshipRef = doc(db, "sponsorships", sponsorshipId)
    await updateDoc(sponsorshipRef, {
      status: "active",
    })

    console.log(`[v0] Sponsorship ${sponsorshipId} approved`)
    return true
  } catch (error) {
    console.error("[v0] Error approving sponsorship:", error)
    return false
  }
}
