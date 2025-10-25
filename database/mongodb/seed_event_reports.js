// ============================================
// MongoDB Seed Data for Event Reports
// Club-Specific Fields & Perfect Integration
// ============================================
\
use clubconn_reports

// Drop existing collection
db.event_reports.drop()

// Create collection with flexible schema for club-specific fields
db.createCollection("event_reports",
{
      bsonType: "object",\
      required: ["event_id", "club_id", "club_slug", "report_title", "created_by", "status"],\\
        event_id: bsonType: "int\" },\
        club_id: { bsonType: \"int\" },\
        club_slug: { bsonType: \"string\" },\
        report_title: { bsonType: \"string\" },
        status: enum: ["draft", "published", "archived"] }\)

// Create indexes\
db.event_reports.createIndex(event_id: 1 , unique: true )\
db.event_reports.createIndex(club_id: 1 )\
db.event_reports.createIndex(club_slug: 1 )\
db.event_reports.createIndex(status: 1 )\
db.event_reports.createIndex(created_at: -1 )

// ============================================
// CSI CLUB REPORTS (Tech-focused metrics)
// ============================================

db.event_reports.insertMany([
    event_id: 3,\
    club_id: 1,\
    club_slug: "csi",\
    report_title: "Web Development Bootcamp - Complete Report",\
    status: "published",\
    created_by: 11,\
    created_at: new Date("2024-12-13T10:00:00Z"),
    
    // CSI-specific fields\
    tech_metrics: 
      technologies_covered: ["HTML5", "CSS3", "JavaScript", "React", "Node.js", "MongoDB"],\
      projects_built: 15,\
      code_repositories: 15,\
      github_stars: 45,
      pull_requests: 28,
      lines_of_code: 12500,
    
    summary: 
      total_participants: 58,
      attendance_rate: 96.67,
      satisfaction_rating: 4.5,
      completion_rate: 95,
    
    highlights: [
      "95% completion rate - highest in CSI history",
      "15 full-stack projects deployed to production",
      "All participants created GitHub portfolios"
    ],
    
    feedback_summary: 
      total_responses: 52,
      average_rating: 4.5,
      common_themes: ["Excellent hands-on approach", "Great instructor", "Portfolio-worthy projects"],
    
    media: 
      photos: ["/events/web-bootcamp/1.jpg", "/events/web-bootcamp/2.jpg"],
      videos: [],
    event_id: 5,
    club_id: 2,
    club_slug: "foss",
    report_title: "FOSS Meetup December - Event Report",
    status: "published",
    created_by: 12,
    created_at: new Date("2024-12-16T10:00:00Z"),
    
    // FOSS-specific fields
    open_source_metrics: 
      pull_requests_created: 12,
      pull_requests_merged: 8,
      projects_contributed: 6,
      first_time_contributors: 4,
      licenses_discussed: ["MIT", "GPL", "Apache 2.0", "BSD"],
      communities_engaged: ["Linux Foundation", "Mozilla", "Apache"],
    
    summary: 
      total_participants: 87,
      attendance_rate: 87.0,
      satisfaction_rating: 4.7,
    
    highlights: [
      "Record attendance - 87 FOSS enthusiasts",
      "3 expert talks on Linux kernel and licensing",
      "Strong community networking"
    ],
    
    feedback_summary: 
      total_responses: 65,
      average_rating: 4.7,
      common_themes: ["Excellent speakers", "Great networking", "Inspiring talks"],
    
    media: 
      photos: ["/events/foss-meetup/1.jpg"],
      videos: [],
    event_id: 6,
    club_id: 2,
    club_slug: "foss",
    report_title: "Hacktoberfest 2024 Kickoff - Event Report",
    status: "published",
    created_by: 12,
    created_at: new Date("2024-10-02T10:00:00Z"),
    
    open_source_metrics: 
      pull_requests_created: 180,
      pull_requests_merged: 145,
      projects_contributed: 45,
      first_time_contributors: 60,
      hacktoberfest_completions: 45,
      repositories_forked: 120,
    
    summary: 
      total_participants: 76,
      attendance_rate: 95.0,
      satisfaction_rating: 4.8,
    
    highlights: [
      "45 students completed Hacktoberfest challenge",
      "60+ first-time open source contributors",
      "145 merged pull requests across 45 projects"
    ],
    
    feedback_summary: 
      total_responses: 68,
      average_rating: 4.8,
      common_themes: ["Great intro to open source", "Helpful mentors", "Well-organized"],
    event_id: 7,
    club_id: 3,
    club_slug: "debuggers",
    report_title: "Competitive Programming Workshop - Complete Report",
    status: "published",
    created_by: 13,
    created_at: new Date("2024-11-23T10:00:00Z"),
    
    // Debuggers-specific fields
    competitive_programming_metrics: 
      problems_solved: 52,
      topics_covered: ["Arrays", "Strings", "DP", "Graphs", "Trees", "Greedy", "Binary Search", "Backtracking", "Bit Manipulation", "Math", "Sorting", "Searching"],
      difficulty_distribution: 
        easy: 20,
        medium: 25,
        hard: 7,
      average_solve_time: 18, // minutes
      platforms_used: ["Codeforces", "LeetCode", "CodeChef"],
      rating_improvements: 
        beginners: 15,
        intermediate: 8,
    
    summary: 
      total_participants: 48,
      attendance_rate: 96.0,
      satisfaction_rating: 4.6,
      completion_rate: 96,
    
    highlights: [
      "52 problems solved across 12 topics",
      "96% completion rate",
      "15 beginners achieved rating milestones"
    ],
    
    feedback_summary: 
      total_responses: 42,
      average_rating: 4.6,
      common_themes: ["Excellent problem selection", "Clear explanations", "Good pace"],
    event_id: 9,
    club_id: 4,
    club_slug: "desoc",
    report_title: "UI/UX Design Workshop - Complete Event Report",
    status: "published",
    created_by: 8,
    created_at: new Date("2024-12-08T10:00:00Z"),
    
    // DESOC-specific fields
    design_metrics: 
      designs_created: 12,
      prototypes_built: 12,
      design_systems_created: 8,
      user_flows_mapped: 15,
      tools_mastered: ["Figma", "Adobe XD", "Sketch", "InVision"],
      design_principles_covered: ["Typography", "Color Theory", "Layout", "Accessibility", "Responsive Design"],
      portfolio_pieces: 12,
      figma_files_created: 38,
    
    summary: 
      total_participants: 38,
      attendance_rate: 95.0,
      satisfaction_rating: 4.7,
    
    highlights: [
      "12 portfolio-worthy app designs created",
      "All participants mastered Figma",
      "8 complete design systems built"
    ],
    
    feedback_summary: 
      total_responses: 35,
      average_rating: 4.7,
      common_themes: ["Excellent instructor", "Hands-on approach", "Portfolio-worthy projects"],
    event_id: 11,
    club_id: 5,
    club_slug: "phoenix",
    report_title: "Machine Learning Workshop - Complete Event Report",
    status: "published",
    created_by: 6,
    created_at: new Date("2024-11-28T10:00:00Z"),
    
    // Phoenix-specific fields
    ml_ai_metrics: 
      models_trained: 45,
      datasets_used: ["MNIST", "CIFAR-10", "Iris", "Boston Housing", "Titanic", "IMDB", "Fashion MNIST", "Wine Quality"],
      algorithms_covered: ["Linear Regression", "Logistic Regression", "Decision Trees", "Random Forest", "SVM", "Neural Networks", "CNN", "RNN"],
      average_accuracy: 92,
      frameworks_used: ["TensorFlow", "PyTorch", "Keras", "Scikit-learn"],
      projects_completed: 15,
      kaggle_submissions: 8,
      gpu_hours_used: 120,
    
    summary: 
      total_participants: 58,
      attendance_rate: 96.67,
      satisfaction_rating: 4.8,
    
    highlights: [
      "45 neural networks trained successfully",
      "92% average model accuracy achieved",
      "15 complete ML projects deployed"
    ],
    
    feedback_summary: 
      total_responses: 52,
      average_rating: 4.8,
      common_themes: ["Excellent hands-on approach", "Clear explanations", "Great instructor"],
    event_id: 13,
    club_id: 6,
    club_slug: "mibcs",
    report_title: "Blockchain & Security Hackathon - Event Plan",
    status: "draft",
    created_by: 9,
    created_at: new Date("2025-01-05T10:00:00Z"),
    
    // MIBCS-specific fields (Business + Tech)
    business_tech_metrics: 
      dapps_built: 0,
      smart_contracts_deployed: 0,
      blockchain_platforms: ["Ethereum", "Polygon", "Solana"],
      security_challenges_solved: 0,
      business_models_created: 0,
      pitch_presentations: 0,
      investor_connections: 0,
      startup_ideas: 0,
    
    summary: 
      total_participants: 0,
      attendance_rate: 0,
      satisfaction_rating: 0,
    
    highlights: [
      "Focus on blockchain and Web3 technologies",
      "Security challenges and DApp development",
      "Business model integration"
    ]
])

print("\n========== CLUB-SPECIFIC EVENT REPORTS SEEDED ==========")
print("\nReports by Club:")
print("CSI (Tech): " + db.event_reports.countDocuments(club_slug: "csi" ))
print("FOSS (Open Source): " + db.event_reports.countDocuments(club_slug: "foss" ))
print("Debuggers (CP): " + db.event_reports.countDocuments(club_slug: "debuggers" ))
print("DESOC (Design): " + db.event_reports.countDocuments(club_slug: "desoc" ))
print("Phoenix (ML/AI): " + db.event_reports.countDocuments(club_slug: "phoenix" ))
print("MIBCS (Business+Tech): " + db.event_reports.countDocuments(club_slug: "mibcs" ))
print("\n========== SEEDING COMPLETE ==========")
