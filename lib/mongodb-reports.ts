import clientPromise from './mongodb'

// Club-specific report interfaces
export interface TechMetrics {
  technologies_covered: string[]
  projects_built: number
  code_repositories: number
  github_stars: number
  pull_requests: number
  lines_of_code: number
}

export interface OpenSourceMetrics {
  pull_requests_created: number
  pull_requests_merged: number
  projects_contributed: number
  first_time_contributors: number
  licenses_discussed?: string[]
  communities_engaged?: string[]
  hacktoberfest_completions?: number
  repositories_forked?: number
}

export interface CompetitiveProgrammingMetrics {
  problems_solved: number
  topics_covered: string[]
  difficulty_distribution: {
    easy: number
    medium: number
    hard: number
  }
  average_solve_time: number
  platforms_used: string[]
  rating_improvements?: {
    beginners: number
    intermediate: number
  }
}

export interface DesignMetrics {
  designs_created: number
  prototypes_built: number
  design_systems_created: number
  user_flows_mapped: number
  tools_mastered: string[]
  design_principles_covered: string[]
  portfolio_pieces: number
  figma_files_created: number
}

export interface MLAIMetrics {
  models_trained: number
  datasets_used: string[]
  algorithms_covered: string[]
  average_accuracy: number
  frameworks_used: string[]
  projects_completed: number
  kaggle_submissions?: number
  gpu_hours_used?: number
}

export interface BusinessTechMetrics {
  dapps_built: number
  smart_contracts_deployed: number
  blockchain_platforms: string[]
  security_challenges_solved: number
  business_models_created: number
  pitch_presentations: number
  investor_connections: number
  startup_ideas: number
}

export interface EventReport {
  _id: string
  event_id: number
  club_id: number
  club_slug: string
  report_title: string
  status: 'draft' | 'published' | 'archived'
  created_by: number
  created_at: Date
  updated_at?: Date
  
  // Club-specific metrics (only one will be present based on club)
  tech_metrics?: TechMetrics
  open_source_metrics?: OpenSourceMetrics
  competitive_programming_metrics?: CompetitiveProgrammingMetrics
  design_metrics?: DesignMetrics
  ml_ai_metrics?: MLAIMetrics
  business_tech_metrics?: BusinessTechMetrics
  
  summary: {
    total_participants: number
    attendance_rate: number
    satisfaction_rating: number
    completion_rate?: number
  }
  
  highlights: string[]
  
  feedback_summary?: {
    total_responses: number
    average_rating: number
    common_themes: string[]
    improvement_suggestions?: string[]
  }
  
  media?: {
    photos: string[]
    videos: string[]
  }
}

export async function getEventReport(eventId: number): Promise<EventReport | null> {
  try {
    const client = await clientPromise
    const db = client.db('clubconn_reports')
    
    const report = await db.collection('event_reports').findOne({ event_id: eventId })
    
    if (!report) return null
    
    return {
      ...report,
      _id: report._id.toString()
    } as EventReport
  } catch (error) {
    console.error('[v0] Error fetching event report:', error)
    return null
  }
}

export async function getClubReports(clubSlug: string): Promise<EventReport[]> {
  try {
    const client = await clientPromise
    const db = client.db('clubconn_reports')
    
    const reports = await db
      .collection('event_reports')
      .find({ club_slug: clubSlug, status: 'published' })
      .sort({ created_at: -1 })
      .toArray()
    
    return reports.map(report => ({
      ...report,
      _id: report._id.toString()
    })) as EventReport[]
  } catch (error) {
    console.error('[v0] Error fetching club reports:', error)
    return []
  }
}

export async function getAllPublishedReports(): Promise<EventReport[]> {
  try {
    const client = await clientPromise
    const db = client.db('clubconn_reports')
    
    const reports = await db
      .collection('event_reports')
      .find({ status: 'published' })
      .sort({ created_at: -1 })
      .toArray()
    
    return reports.map(report => ({
      ...report,
      _id: report._id.toString()
    })) as EventReport[]
  } catch (error) {
    console.error('[v0] Error fetching published reports:', error)
    return []
  }
}

// Helper function to get club-specific metrics label
export function getClubMetricsLabel(clubSlug: string): string {
  const labels: Record<string, string> = {
    'csi': 'Tech Metrics',
    'foss': 'Open Source Metrics',
    'debuggers': 'Competitive Programming Metrics',
    'desoc': 'Design Metrics',
    'phoenix': 'ML/AI Metrics',
    'mibcs': 'Business & Tech Metrics'
  }
  return labels[clubSlug] || 'Event Metrics'
}
