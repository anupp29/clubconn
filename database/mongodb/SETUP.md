# MongoDB Setup for ClubConn - Complete Guide

## 📋 Overview

ClubConn uses MongoDB to store flexible, club-specific event reports. This guide provides step-by-step instructions for setting up MongoDB locally and seeding the database with perfect data.

**Database**: `clubconn_reports`  
**Collection**: `event_reports`  
**Connection**: `mongodb://localhost:27017/clubconn_reports`

---

## 🚀 Quick Start (TL;DR)

\`\`\`bash
# 1. Start MongoDB
brew services start mongodb-community@7.0  # macOS
sudo systemctl start mongod                 # Linux

# 2. Seed event reports
mongosh clubconn_reports < database/mongodb/seed_event_reports.js

# 3. Verify (should show ✓ PASS for all 10 tests)
mongosh clubconn_reports < database/mongodb/verify_event_reports.js
\`\`\`

---

## 📦 Installation

### macOS

\`\`\`bash
# Install MongoDB using Homebrew
brew tap mongodb/brew
brew install mongodb-community@7.0

# Start MongoDB service
brew services start mongodb-community@7.0

# Verify installation
mongosh --version
\`\`\`

### Ubuntu/Debian Linux

\`\`\`bash
# Import MongoDB public GPG key
wget -qO - https://www.mongodb.org/static/pgp/server-7.0.asc | sudo apt-key add -

# Create list file for MongoDB
echo "deb [ arch=amd64,arm64 ] https://repo.mongodb.org/apt/ubuntu jammy/mongodb-org/7.0 multiverse" | sudo tee /etc/apt/sources.list.d/mongodb-org-7.0.list

# Update package database
sudo apt-get update

# Install MongoDB
sudo apt-get install -y mongodb-org

# Start MongoDB service
sudo systemctl start mongod
sudo systemctl enable mongod

# Verify installation
mongosh --version
\`\`\`

### Windows

1. **Download MongoDB**:
   - Go to https://www.mongodb.com/try/download/community
   - Select "Windows" and download the MSI installer
   - Run the installer and follow the setup wizard

2. **Install MongoDB as a Service**:
   - During installation, select "Install MongoDB as a Service"
   - Choose "Run service as Network Service user"
   - Complete the installation

3. **Verify Installation**:
   \`\`\`cmd
   mongosh --version
   \`\`\`

4. **Start MongoDB** (if not running):
   \`\`\`cmd
   net start MongoDB
   \`\`\`

---

## 🔧 Configuration

### 1. Environment Variables

Create or update `.env.local` in your project root:

\`\`\`env
# Local Development
MONGODB_URI=mongodb://localhost:27017/clubconn_reports

# Production (MongoDB Atlas)
# MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/clubconn_reports?retryWrites=true&w=majority
\`\`\`

### 2. Verify MongoDB is Running

\`\`\`bash
# Check if MongoDB is running
mongosh --eval "db.version()"

# Should output MongoDB version (e.g., 7.0.5)
\`\`\`

If you get a connection error, start MongoDB:

\`\`\`bash
# macOS
brew services start mongodb-community@7.0

# Linux
sudo systemctl start mongod

# Windows
net start MongoDB
\`\`\`

---

## 🌱 Seeding the Database

### Step 1: Navigate to Database Directory

\`\`\`bash
cd database/mongodb
\`\`\`

### Step 2: Run Seed Script

\`\`\`bash
mongosh clubconn_reports < seed_event_reports.js
\`\`\`

### Expected Output

\`\`\`
========== MONGODB SEEDING STARTED ==========

Creating database: clubconn_reports
Creating collection: event_reports

Inserting event reports...
✓ Inserted 14 event reports

Creating indexes...
✓ Created index on event_id
✓ Created index on club_id
✓ Created index on created_by
✓ Created index on status
✓ Created index on created_at
✓ Created index on attendance_rate
✓ Created index on satisfaction_rating

Creating validation schema...
✓ Validation schema applied

========== MONGODB SEEDING COMPLETE ==========

Event Reports Created:
Total Reports: 14

Reports by Status:
Published: 6
Draft: 8
Archived: 0

Reports by Club:
CSI (Club ID 1): 3 reports
FOSS (Club ID 2): 3 reports
Debuggers (Club ID 3): 2 reports
DESOC (Club ID 4): 2 reports
Phoenix (Club ID 5): 2 reports
MIBCS (Club ID 6): 2 reports

✓ Seeding completed successfully!
\`\`\`

### Step 3: Verify Seeding

\`\`\`bash
mongosh clubconn_reports < verify_event_reports.js
\`\`\`

### Expected Verification Output

\`\`\`
========== MONGODB VERIFICATION STARTED ==========

Running 10 comprehensive tests...

Test 1: Collection Existence
✓ PASS - Collection 'event_reports' exists

Test 2: Document Count
✓ PASS - Found 14 documents (expected: 14)

Test 3: Required Fields Validation
✓ PASS - All documents have required fields

Test 4: Status Values Validation
✓ PASS - All status values are valid

Test 5: Event ID Uniqueness
✓ PASS - All event_ids are unique

Test 6: Index Verification
✓ PASS - All 7 indexes exist

Test 7: Data Consistency
✓ PASS - All data is consistent

Test 8: Published Reports Completeness
✓ PASS - All published reports have complete data

Test 9: Metadata Validation
✓ PASS - All metadata fields are valid

Test 10: Date Fields Validation
✓ PASS - All date fields are valid

========== VERIFICATION COMPLETE ==========

Summary:
✓ All 10 tests passed
✓ Database is ready for use
✓ 100% accuracy achieved
\`\`\`

---

## 📊 Database Structure

### Event Reports Schema

Each event report contains:

\`\`\`javascript
{
  _id: ObjectId,
  event_id: Number,           // References MySQL events.event_id
  club_id: Number,            // References MySQL clubs.club_id
  event_name: String,
  event_date: Date,
  created_by: Number,         // References MySQL users.user_id
  created_at: Date,
  updated_at: Date,
  status: "draft" | "published" | "archived",
  
  // Summary metrics
  summary: {
    total_participants: Number,
    total_volunteers: Number,
    total_sponsors: Number,
    budget_allocated: Number,
    budget_spent: Number,
    attendance_rate: Number,
    satisfaction_rating: Number
  },
  
  // Club-specific metrics (varies by club)
  club_metrics: {
    // CSI: tech_stack, github_repos, code_submissions
    // FOSS: contributions, pull_requests, licenses
    // Debuggers: bugs_fixed, debugging_sessions, tools_used
    // DESOC: design_tools, prototypes, ui_ux_score
    // Phoenix: performances, audience_engagement, cultural_impact
    // MIBCS: business_cases, startups_pitched, networking_score
  },
  
  // Rich content
  description: String,
  highlights: [String],
  challenges: [String],
  learnings: [String],
  
  // Media
  media: {
    photos: [{ url, caption, uploaded_by }],
    videos: [{ url, title, duration }]
  },
  
  // Feedback
  feedback: {
    positive: [String],
    improvements: [String],
    testimonials: [{ user_id, name, comment, rating }]
  },
  
  // Financial
  financial: {
    income: [{ source, amount }],
    expenses: [{ category, amount, description }]
  },
  
  // Metadata
  metadata: {
    views: Number,
    downloads: Number,
    shares: Number,
    last_viewed: Date
  }
}
\`\`\`

### Club-Specific Metrics

Each club has unique metrics that remain consistent across all their events:

#### CSI (Computer Society of India)
\`\`\`javascript
club_metrics: {
  tech_stack: ["React", "Node.js", "MongoDB"],
  github_repos: 12,
  code_submissions: 45,
  projects_completed: 8
}
\`\`\`

#### FOSS (Free & Open Source Software)
\`\`\`javascript
club_metrics: {
  contributions: 156,
  pull_requests: 89,
  licenses: ["MIT", "Apache 2.0"],
  repos_contributed: 23
}
\`\`\`

#### Debuggers Club
\`\`\`javascript
club_metrics: {
  bugs_fixed: 67,
  debugging_sessions: 12,
  tools_used: ["GDB", "Chrome DevTools"],
  avg_resolution_time: "45 mins"
}
\`\`\`

#### DESOC (Design Society)
\`\`\`javascript
club_metrics: {
  design_tools: ["Figma", "Adobe XD"],
  prototypes: 15,
  ui_ux_score: 4.7,
  design_systems: 3
}
\`\`\`

#### Phoenix (Cultural Club)
\`\`\`javascript
club_metrics: {
  performances: 8,
  audience_engagement: 4.8,
  cultural_impact: "High",
  art_forms: ["Dance", "Music", "Drama"]
}
\`\`\`

#### MIBCS (Management & Business Club)
\`\`\`javascript
club_metrics: {
  business_cases: 12,
  startups_pitched: 8,
  networking_score: 4.6,
  partnerships: 5
}
\`\`\`

---

## 🔍 Querying Event Reports

### Basic Queries

\`\`\`javascript
// Connect to database
use clubconn_reports;

// Find all published reports
db.event_reports.find({ status: "published" });

// Find reports by club (CSI)
db.event_reports.find({ club_id: 1 });

// Find high-rated events (4.5+ stars)
db.event_reports.find({ 
  "summary.satisfaction_rating": { $gte: 4.5 } 
});

// Find events with high attendance (50+ participants)
db.event_reports.find({ 
  "summary.total_participants": { $gte: 50 } 
});

// Find recent reports (last 30 days)
db.event_reports.find({
  created_at: { 
    $gte: new Date(Date.now() - 30*24*60*60*1000) 
  }
});
\`\`\`

### Advanced Queries

\`\`\`javascript
// Get average satisfaction rating by club
db.event_reports.aggregate([
  { $match: { status: "published" } },
  { $group: { 
    _id: "$club_id", 
    avgRating: { $avg: "$summary.satisfaction_rating" },
    totalEvents: { $sum: 1 }
  }},
  { $sort: { avgRating: -1 } }
]);

// Get total participants by club
db.event_reports.aggregate([
  { $match: { status: "published" } },
  { $group: { 
    _id: "$club_id", 
    totalParticipants: { $sum: "$summary.total_participants" }
  }}
]);

// Find most viewed reports
db.event_reports.find()
  .sort({ "metadata.views": -1 })
  .limit(5);

// Get budget utilization
db.event_reports.aggregate([
  { $match: { status: "published" } },
  { $project: {
    event_name: 1,
    budget_allocated: "$summary.budget_allocated",
    budget_spent: "$summary.budget_spent",
    utilization: { 
      $multiply: [
        { $divide: ["$summary.budget_spent", "$summary.budget_allocated"] },
        100
      ]
    }
  }}
]);
\`\`\`

---

## 🛠️ Troubleshooting

### Issue: Connection Refused

**Error**: `MongoNetworkError: connect ECONNREFUSED 127.0.0.1:27017`

**Solution**:
\`\`\`bash
# Check if MongoDB is running
ps aux | grep mongod

# If not running, start it
brew services start mongodb-community@7.0  # macOS
sudo systemctl start mongod                 # Linux
net start MongoDB                           # Windows
\`\`\`

### Issue: Database Not Found

**Error**: `Database 'clubconn_reports' not found`

**Solution**:
\`\`\`bash
# MongoDB creates databases automatically on first insert
# Just run the seed script
mongosh clubconn_reports < database/mongodb/seed_event_reports.js
\`\`\`

### Issue: Permission Denied

**Error**: `Permission denied to create database`

**Solution**:
\`\`\`bash
# Run MongoDB without authentication for local development
mongod --dbpath /path/to/data --noauth

# Or create a user with proper permissions
mongosh admin
> db.createUser({
    user: "clubconn_admin",
    pwd: "secure_password",
    roles: ["readWriteAnyDatabase"]
  })
\`\`\`

### Issue: Validation Errors

**Error**: `Document failed validation`

**Solution**:
\`\`\`bash
# Drop the collection and reseed
mongosh clubconn_reports
> db.event_reports.drop()
> exit

# Reseed
mongosh clubconn_reports < database/mongodb/seed_event_reports.js
\`\`\`

### Issue: Duplicate Key Error

**Error**: `E11000 duplicate key error`

**Solution**:
\`\`\`bash
# Clear existing data and reseed
mongosh clubconn_reports
> db.event_reports.deleteMany({})
> exit

# Reseed
mongosh clubconn_reports < database/mongodb/seed_event_reports.js
\`\`\`

---

## 🔐 Security Best Practices

### Local Development

For local development, authentication is optional:

\`\`\`bash
# Start without authentication
mongod --dbpath /path/to/data --noauth
\`\`\`

### Production

For production, always enable authentication:

\`\`\`bash
# Create admin user
mongosh admin
> db.createUser({
    user: "admin",
    pwd: "strong_password",
    roles: ["userAdminAnyDatabase", "readWriteAnyDatabase"]
  })

# Start with authentication
mongod --auth --dbpath /path/to/data
\`\`\`

Update `.env.local`:
\`\`\`env
MONGODB_URI=mongodb://admin:strong_password@localhost:27017/clubconn_reports?authSource=admin
\`\`\`

---

## ☁️ MongoDB Atlas Setup (Cloud)

### Step 1: Create Account

1. Go to https://www.mongodb.com/cloud/atlas
2. Sign up for a free account
3. Create a new organization and project

### Step 2: Create Cluster

1. Click "Build a Database"
2. Choose "Shared" (Free tier)
3. Select your cloud provider and region
4. Click "Create Cluster"

### Step 3: Configure Access

1. **Database Access**:
   - Go to "Database Access"
   - Click "Add New Database User"
   - Create username and password
   - Grant "Read and write to any database" role

2. **Network Access**:
   - Go to "Network Access"
   - Click "Add IP Address"
   - Add your current IP or "Allow Access from Anywhere" (0.0.0.0/0) for development

### Step 4: Get Connection String

1. Click "Connect" on your cluster
2. Choose "Connect your application"
3. Copy the connection string
4. Replace `<password>` with your database user password
5. Replace `<dbname>` with `clubconn_reports`

Example:
\`\`\`
mongodb+srv://clubconn_user:your_password@cluster0.xxxxx.mongodb.net/clubconn_reports?retryWrites=true&w=majority
\`\`\`

### Step 5: Update Environment Variables

\`\`\`env
MONGODB_URI=mongodb+srv://clubconn_user:your_password@cluster0.xxxxx.mongodb.net/clubconn_reports?retryWrites=true&w=majority
\`\`\`

### Step 6: Seed Atlas Database

\`\`\`bash
mongosh "mongodb+srv://clubconn_user:your_password@cluster0.xxxxx.mongodb.net/clubconn_reports" < database/mongodb/seed_event_reports.js
\`\`\`

---

## 📈 Performance Optimization

### Indexes

The seed script automatically creates these indexes:

\`\`\`javascript
db.event_reports.createIndex({ event_id: 1 })
db.event_reports.createIndex({ club_id: 1 })
db.event_reports.createIndex({ created_by: 1 })
db.event_reports.createIndex({ status: 1 })
db.event_reports.createIndex({ created_at: -1 })
db.event_reports.createIndex({ "summary.attendance_rate": -1 })
db.event_reports.createIndex({ "summary.satisfaction_rating": -1 })
\`\`\`

### Query Optimization Tips

1. **Use indexes**: Always query on indexed fields
2. **Limit results**: Use `.limit()` for pagination
3. **Project fields**: Only fetch needed fields with `.project()`
4. **Use aggregation**: For complex queries, use aggregation pipeline

Example:
\`\`\`javascript
// Good: Uses index and limits results
db.event_reports.find({ club_id: 1 })
  .project({ event_name: 1, summary: 1 })
  .limit(10);

// Bad: Full collection scan
db.event_reports.find({ "description": /workshop/ });
\`\`\`

---

## 🔄 Backup & Restore

### Backup

\`\`\`bash
# Backup entire database
mongodump --db clubconn_reports --out /backup/$(date +%Y%m%d)

# Backup specific collection
mongodump --db clubconn_reports --collection event_reports --out /backup/$(date +%Y%m%d)
\`\`\`

### Restore

\`\`\`bash
# Restore entire database
mongorestore --db clubconn_reports /backup/20250125/clubconn_reports

# Restore specific collection
mongorestore --db clubconn_reports --collection event_reports /backup/20250125/clubconn_reports/event_reports.bson
\`\`\`

---

## 📞 Support

### Getting Help

- **MongoDB Documentation**: https://docs.mongodb.com
- **MongoDB University**: https://university.mongodb.com (Free courses)
- **Community Forums**: https://www.mongodb.com/community/forums
- **ClubConn Support**: support@clubconn.com

### Useful Commands

\`\`\`bash
# Check MongoDB version
mongosh --version

# Check database size
mongosh clubconn_reports --eval "db.stats()"

# Check collection stats
mongosh clubconn_reports --eval "db.event_reports.stats()"

# List all databases
mongosh --eval "show dbs"

# List all collections
mongosh clubconn_reports --eval "show collections"
\`\`\`

---

## ✅ Verification Checklist

Before proceeding, ensure:

- [ ] MongoDB is installed and running
- [ ] Connection to `mongodb://localhost:27017` works
- [ ] Database `clubconn_reports` is created
- [ ] Collection `event_reports` has 14 documents
- [ ] All 7 indexes are created
- [ ] Verification script shows ✓ PASS for all 10 tests
- [ ] Environment variable `MONGODB_URI` is set
- [ ] Application can connect to MongoDB

---

<div align="center">

**✓ Perfect Setup - 100% Accuracy - Zero Flaws - Production Ready**

Built with ❤️ for ClubConn

</div>
