"use client"

import type React from "react"

import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import {
  Code,
  GitPullRequest,
  Trophy,
  Palette,
  Brain,
  Briefcase,
  Users,
  Star,
  TrendingUp,
  CheckCircle,
} from "lucide-react"
import type { EventReport } from "@/lib/mongodb-reports"

interface EventReportDisplayProps {
  report: EventReport
}

export function EventReportDisplay({ report }: EventReportDisplayProps) {
  const renderClubSpecificMetrics = () => {
    // CSI - Tech Metrics
    if (report.tech_metrics) {
      const metrics = report.tech_metrics
      return (
        <Card className="p-6">
          <div className="flex items-center gap-2 mb-4">
            <Code className="h-5 w-5 text-emerald-500" />
            <h3 className="text-xl font-bold">Tech Metrics</h3>
          </div>
          <div className="grid gap-4 md:grid-cols-2">
            <MetricItem label="Projects Built" value={metrics.projects_built} />
            <MetricItem label="Code Repositories" value={metrics.code_repositories} />
            <MetricItem label="GitHub Stars" value={metrics.github_stars} />
            <MetricItem label="Pull Requests" value={metrics.pull_requests} />
            <MetricItem label="Lines of Code" value={metrics.lines_of_code.toLocaleString()} />
          </div>
          <div className="mt-4">
            <p className="text-sm font-medium mb-2">Technologies Covered:</p>
            <div className="flex flex-wrap gap-2">
              {metrics.technologies_covered.map((tech) => (
                <Badge key={tech} variant="secondary">
                  {tech}
                </Badge>
              ))}
            </div>
          </div>
        </Card>
      )
    }

    // FOSS - Open Source Metrics
    if (report.open_source_metrics) {
      const metrics = report.open_source_metrics
      return (
        <Card className="p-6">
          <div className="flex items-center gap-2 mb-4">
            <GitPullRequest className="h-5 w-5 text-emerald-500" />
            <h3 className="text-xl font-bold">Open Source Metrics</h3>
          </div>
          <div className="grid gap-4 md:grid-cols-2">
            <MetricItem label="PRs Created" value={metrics.pull_requests_created} />
            <MetricItem label="PRs Merged" value={metrics.pull_requests_merged} />
            <MetricItem label="Projects Contributed" value={metrics.projects_contributed} />
            <MetricItem label="First-Time Contributors" value={metrics.first_time_contributors} />
            {metrics.hacktoberfest_completions && (
              <MetricItem label="Hacktoberfest Completions" value={metrics.hacktoberfest_completions} />
            )}
            {metrics.repositories_forked && (
              <MetricItem label="Repositories Forked" value={metrics.repositories_forked} />
            )}
          </div>
          <div className="mt-4 grid gap-4 md:grid-cols-2">
            <div>
              <p className="text-sm font-medium mb-2">Licenses Discussed:</p>
              <div className="flex flex-wrap gap-2">
                {metrics.licenses_discussed.map((license) => (
                  <Badge key={license} variant="secondary">
                    {license}
                  </Badge>
                ))}
              </div>
            </div>
            <div>
              <p className="text-sm font-medium mb-2">Communities Engaged:</p>
              <div className="flex flex-wrap gap-2">
                {metrics.communities_engaged.map((community) => (
                  <Badge key={community} variant="secondary">
                    {community}
                  </Badge>
                ))}
              </div>
            </div>
          </div>
        </Card>
      )
    }

    // Debuggers - Competitive Programming Metrics
    if (report.competitive_programming_metrics) {
      const metrics = report.competitive_programming_metrics
      return (
        <Card className="p-6">
          <div className="flex items-center gap-2 mb-4">
            <Trophy className="h-5 w-5 text-emerald-500" />
            <h3 className="text-xl font-bold">Competitive Programming Metrics</h3>
          </div>
          <div className="grid gap-4 md:grid-cols-2">
            <MetricItem label="Problems Solved" value={metrics.problems_solved} />
            <MetricItem label="Avg Solve Time" value={`${metrics.average_solve_time} min`} />
            <MetricItem label="Easy Problems" value={metrics.difficulty_distribution.easy} />
            <MetricItem label="Medium Problems" value={metrics.difficulty_distribution.medium} />
            <MetricItem label="Hard Problems" value={metrics.difficulty_distribution.hard} />
          </div>
          <div className="mt-4 grid gap-4 md:grid-cols-2">
            <div>
              <p className="text-sm font-medium mb-2">Topics Covered:</p>
              <div className="flex flex-wrap gap-2">
                {metrics.topics_covered.map((topic) => (
                  <Badge key={topic} variant="secondary">
                    {topic}
                  </Badge>
                ))}
              </div>
            </div>
            <div>
              <p className="text-sm font-medium mb-2">Platforms Used:</p>
              <div className="flex flex-wrap gap-2">
                {metrics.platforms_used.map((platform) => (
                  <Badge key={platform} variant="secondary">
                    {platform}
                  </Badge>
                ))}
              </div>
            </div>
          </div>
        </Card>
      )
    }

    // DESOC - Design Metrics
    if (report.design_metrics) {
      const metrics = report.design_metrics
      return (
        <Card className="p-6">
          <div className="flex items-center gap-2 mb-4">
            <Palette className="h-5 w-5 text-emerald-500" />
            <h3 className="text-xl font-bold">Design Metrics</h3>
          </div>
          <div className="grid gap-4 md:grid-cols-2">
            <MetricItem label="Designs Created" value={metrics.designs_created} />
            <MetricItem label="Prototypes Built" value={metrics.prototypes_built} />
            <MetricItem label="Design Systems" value={metrics.design_systems_created} />
            <MetricItem label="User Flows Mapped" value={metrics.user_flows_mapped} />
            <MetricItem label="Portfolio Pieces" value={metrics.portfolio_pieces} />
            <MetricItem label="Figma Files" value={metrics.figma_files_created} />
          </div>
          <div className="mt-4 grid gap-4 md:grid-cols-2">
            <div>
              <p className="text-sm font-medium mb-2">Tools Mastered:</p>
              <div className="flex flex-wrap gap-2">
                {metrics.tools_mastered.map((tool) => (
                  <Badge key={tool} variant="secondary">
                    {tool}
                  </Badge>
                ))}
              </div>
            </div>
            <div>
              <p className="text-sm font-medium mb-2">Design Principles:</p>
              <div className="flex flex-wrap gap-2">
                {metrics.design_principles_covered.map((principle) => (
                  <Badge key={principle} variant="secondary">
                    {principle}
                  </Badge>
                ))}
              </div>
            </div>
          </div>
        </Card>
      )
    }

    // Phoenix - ML/AI Metrics
    if (report.ml_ai_metrics) {
      const metrics = report.ml_ai_metrics
      return (
        <Card className="p-6">
          <div className="flex items-center gap-2 mb-4">
            <Brain className="h-5 w-5 text-emerald-500" />
            <h3 className="text-xl font-bold">ML/AI Metrics</h3>
          </div>
          <div className="grid gap-4 md:grid-cols-2">
            <MetricItem label="Models Trained" value={metrics.models_trained} />
            <MetricItem label="Projects Completed" value={metrics.projects_completed} />
            <MetricItem label="Average Accuracy" value={`${metrics.average_accuracy}%`} />
            <MetricItem label="Kaggle Submissions" value={metrics.kaggle_submissions} />
            <MetricItem label="GPU Hours Used" value={metrics.gpu_hours_used} />
          </div>
          <div className="mt-4 grid gap-4 md:grid-cols-2">
            <div>
              <p className="text-sm font-medium mb-2">Datasets Used:</p>
              <div className="flex flex-wrap gap-2">
                {metrics.datasets_used.map((dataset) => (
                  <Badge key={dataset} variant="secondary">
                    {dataset}
                  </Badge>
                ))}
              </div>
            </div>
            <div>
              <p className="text-sm font-medium mb-2">Frameworks:</p>
              <div className="flex flex-wrap gap-2">
                {metrics.frameworks_used.map((framework) => (
                  <Badge key={framework} variant="secondary">
                    {framework}
                  </Badge>
                ))}
              </div>
            </div>
          </div>
          <div className="mt-4">
            <p className="text-sm font-medium mb-2">Algorithms Covered:</p>
            <div className="flex flex-wrap gap-2">
              {metrics.algorithms_covered.map((algo) => (
                <Badge key={algo} variant="secondary">
                  {algo}
                </Badge>
              ))}
            </div>
          </div>
        </Card>
      )
    }

    // MIBCS - Business & Tech Metrics
    if (report.business_tech_metrics) {
      const metrics = report.business_tech_metrics
      return (
        <Card className="p-6">
          <div className="flex items-center gap-2 mb-4">
            <Briefcase className="h-5 w-5 text-emerald-500" />
            <h3 className="text-xl font-bold">Business & Tech Metrics</h3>
          </div>
          <div className="grid gap-4 md:grid-cols-2">
            <MetricItem label="DApps Built" value={metrics.dapps_built} />
            <MetricItem label="Smart Contracts" value={metrics.smart_contracts_deployed} />
            <MetricItem label="Security Challenges" value={metrics.security_challenges_solved} />
            <MetricItem label="Business Models" value={metrics.business_models_created} />
            <MetricItem label="Pitch Presentations" value={metrics.pitch_presentations} />
            <MetricItem label="Startup Ideas" value={metrics.startup_ideas} />
          </div>
          <div className="mt-4">
            <p className="text-sm font-medium mb-2">Blockchain Platforms:</p>
            <div className="flex flex-wrap gap-2">
              {metrics.blockchain_platforms.map((platform) => (
                <Badge key={platform} variant="secondary">
                  {platform}
                </Badge>
              ))}
            </div>
          </div>
        </Card>
      )
    }

    return null
  }

  return (
    <div className="space-y-6">
      {/* Summary Stats */}
      <Card className="p-6">
        <h3 className="text-xl font-bold mb-4">Event Summary</h3>
        <div className="grid gap-4 md:grid-cols-4">
          <MetricItem
            label="Total Participants"
            value={report.summary.total_participants}
            icon={<Users className="h-4 w-4" />}
          />
          <MetricItem
            label="Attendance Rate"
            value={`${report.summary.attendance_rate}%`}
            icon={<CheckCircle className="h-4 w-4" />}
          />
          <MetricItem
            label="Satisfaction Rating"
            value={`${report.summary.satisfaction_rating}/5`}
            icon={<Star className="h-4 w-4" />}
          />
          {report.summary.completion_rate && (
            <MetricItem
              label="Completion Rate"
              value={`${report.summary.completion_rate}%`}
              icon={<TrendingUp className="h-4 w-4" />}
            />
          )}
        </div>
      </Card>

      {/* Club-Specific Metrics */}
      {renderClubSpecificMetrics()}

      {/* Highlights */}
      {report.highlights && report.highlights.length > 0 && (
        <Card className="p-6">
          <h3 className="text-xl font-bold mb-4">Event Highlights</h3>
          <ul className="space-y-2">
            {report.highlights.map((highlight, index) => (
              <li key={index} className="flex items-start gap-2">
                <CheckCircle className="h-5 w-5 text-emerald-500 mt-0.5 flex-shrink-0" />
                <span>{highlight}</span>
              </li>
            ))}
          </ul>
        </Card>
      )}

      {/* Feedback Summary */}
      {report.feedback_summary && (
        <Card className="p-6">
          <h3 className="text-xl font-bold mb-4">Participant Feedback</h3>
          <div className="space-y-4">
            <div className="grid gap-4 md:grid-cols-2">
              <MetricItem label="Total Responses" value={report.feedback_summary.total_responses} />
              <MetricItem label="Average Rating" value={`${report.feedback_summary.average_rating}/5`} />
            </div>

            {report.feedback_summary.common_themes && (
              <div>
                <p className="text-sm font-medium mb-2">Common Themes:</p>
                <ul className="space-y-1">
                  {report.feedback_summary.common_themes.map((theme, index) => (
                    <li key={index} className="text-sm text-muted-foreground">
                      • {theme}
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        </Card>
      )}
    </div>
  )
}

function MetricItem({
  label,
  value,
  icon,
}: {
  label: string
  value: string | number
  icon?: React.ReactNode
}) {
  return (
    <div className="space-y-1">
      <div className="flex items-center gap-2">
        {icon}
        <p className="text-sm text-muted-foreground">{label}</p>
      </div>
      <p className="text-2xl font-bold">{value}</p>
    </div>
  )
}
