// ============================================
// MongoDB Schema for Event Reports (NoSQL)
// ============================================

// Import ObjectId from MongoDB
const { ObjectId } = require("mongodb")

// Database: clubconn_reports
// Collection: event_reports

// Event Report Document Schema
const eventReportSchema = {
  _id: ObjectId,

  // Reference to MySQL event
  event_id: Number, // References events.event_id in MySQL
  club_id: Number, // References clubs.club_id in MySQL

  // Report Metadata
  report_title: String,
  report_date: Date,
  created_by: Number, // References users.user_id in MySQL
  created_at: Date,
  updated_at: Date,
  status: String, // 'draft', 'published', 'archived'

  // Event Summary
  summary: {
    total_participants: Number,
    total_volunteers: Number,
    total_sponsors: Number,
    total_revenue: Number,
    total_expenses: Number,
    net_profit: Number,
    attendance_rate: Number,
    satisfaction_rating: Number,
  },

  // Detailed Report Sections
  sections: [
    {
      section_id: String,
      section_title: String,
      section_type: String, // 'text', 'images', 'statistics', 'feedback'
      content: String,
      order: Number,

      // For image galleries
      images: [
        {
          image_url: String,
          caption: String,
          uploaded_at: Date,
        },
      ],

      // For statistics
      statistics: [
        {
          label: String,
          value: Number,
          unit: String,
          icon: String,
        },
      ],

      // For feedback
      feedback: [
        {
          user_id: Number,
          rating: Number,
          comment: String,
          submitted_at: Date,
        },
      ],
    },
  ],

  // Highlights
  highlights: [
    {
      title: String,
      description: String,
      icon: String,
      color: String,
    },
  ],

  // Challenges Faced
  challenges: [
    {
      challenge: String,
      solution: String,
      lessons_learned: String,
    },
  ],

  // Team Members
  team_members: [
    {
      user_id: Number,
      name: String,
      role: String,
      contribution: String,
    },
  ],

  // Sponsors Details
  sponsors: [
    {
      sponsor_id: Number,
      sponsor_name: String,
      sponsor_type: String,
      contribution_amount: Number,
      logo_url: String,
    },
  ],

  // Financial Breakdown
  financial_details: {
    revenue: [
      {
        source: String,
        amount: Number,
        description: String,
      },
    ],
    expenses: [
      {
        category: String,
        amount: Number,
        description: String,
        receipt_url: String,
      },
    ],
  },

  // Media Gallery
  media: {
    photos: [
      {
        url: String,
        caption: String,
        uploaded_by: Number,
        uploaded_at: Date,
        tags: [String],
      },
    ],
    videos: [
      {
        url: String,
        title: String,
        duration: Number,
        thumbnail_url: String,
        uploaded_at: Date,
      },
    ],
  },

  // Participant Feedback Summary
  feedback_summary: {
    total_responses: Number,
    average_rating: Number,
    rating_distribution: {
      five_star: Number,
      four_star: Number,
      three_star: Number,
      two_star: Number,
      one_star: Number,
    },
    common_themes: [String],
    improvement_suggestions: [String],
  },

  // Future Recommendations
  recommendations: [
    {
      category: String,
      recommendation: String,
      priority: String, // 'high', 'medium', 'low'
    },
  ],

  // Attachments
  attachments: [
    {
      file_name: String,
      file_url: String,
      file_type: String,
      file_size: Number,
      uploaded_at: Date,
    },
  ],

  // Metadata
  metadata: {
    views: Number,
    downloads: Number,
    shares: Number,
    last_viewed_at: Date,
  },

  // Indexes for performance
  indexes: [
    { event_id: 1 },
    { club_id: 1 },
    { created_by: 1 },
    { status: 1 },
    { created_at: -1 },
    { "summary.attendance_rate": -1 },
    { "summary.satisfaction_rating": -1 },
  ],
}

// MongoDB Validation Schema
function createEventReportsCollection(db) {
  db.createCollection("event_reports", {
    validator: {
      $jsonSchema: {
        bsonType: "object",
        required: ["event_id", "club_id", "report_title", "created_by", "status"],
        properties: {
          event_id: {
            bsonType: "int",
            description: "Reference to MySQL events table",
          },
          club_id: {
            bsonType: "int",
            description: "Reference to MySQL clubs table",
          },
          report_title: {
            bsonType: "string",
            minLength: 5,
            maxLength: 255,
          },
          status: {
            enum: ["draft", "published", "archived"],
          },
          summary: {
            bsonType: "object",
            properties: {
              total_participants: { bsonType: "int", minimum: 0 },
              attendance_rate: { bsonType: "double", minimum: 0, maximum: 100 },
              satisfaction_rating: { bsonType: "double", minimum: 0, maximum: 5 },
            },
          },
        },
      },
    },
  })
}

// Create Indexes
function createIndexes(db) {
  db.event_reports.createIndex({ event_id: 1 })
  db.event_reports.createIndex({ club_id: 1 })
  db.event_reports.createIndex({ created_by: 1 })
  db.event_reports.createIndex({ status: 1 })
  db.event_reports.createIndex({ created_at: -1 })
  db.event_reports.createIndex({ "summary.attendance_rate": -1 })
  db.event_reports.createIndex({ "summary.satisfaction_rating": -1 })
}

// Sample Event Report Document
const sampleEventReport = {
  event_id: 1,
  club_id: 1,
  report_title: "TechFest 2025 - Complete Event Report",
  report_date: new Date("2025-01-20"),
  created_by: 1,
  created_at: new Date(),
  updated_at: new Date(),
  status: "published",

  summary: {
    total_participants: 250,
    total_volunteers: 15,
    total_sponsors: 5,
    total_revenue: 125000,
    total_expenses: 85000,
    net_profit: 40000,
    attendance_rate: 92.5,
    satisfaction_rating: 4.6,
  },

  sections: [
    {
      section_id: "overview",
      section_title: "Event Overview",
      section_type: "text",
      content: "TechFest 2025 was a grand success with over 250 participants...",
      order: 1,
    },
    {
      section_id: "statistics",
      section_title: "Key Statistics",
      section_type: "statistics",
      order: 2,
      statistics: [
        { label: "Total Participants", value: 250, unit: "people", icon: "Users" },
        { label: "Workshops Conducted", value: 8, unit: "sessions", icon: "BookOpen" },
        { label: "Satisfaction Rate", value: 96, unit: "%", icon: "ThumbsUp" },
      ],
    },
  ],

  highlights: [
    {
      title: "Record Attendance",
      description: "Highest participation in club history",
      icon: "TrendingUp",
      color: "#10B981",
    },
    {
      title: "Industry Partnerships",
      description: "Secured 5 major sponsors",
      icon: "Briefcase",
      color: "#3B82F6",
    },
  ],

  media: {
    photos: [
      {
        url: "https://example.com/photo1.jpg",
        caption: "Opening ceremony",
        uploaded_by: 1,
        uploaded_at: new Date(),
        tags: ["ceremony", "opening", "crowd"],
      },
    ],
    videos: [],
  },

  feedback_summary: {
    total_responses: 180,
    average_rating: 4.6,
    rating_distribution: {
      five_star: 120,
      four_star: 45,
      three_star: 10,
      two_star: 3,
      one_star: 2,
    },
  },

  metadata: {
    views: 0,
    downloads: 0,
    shares: 0,
  },
}
