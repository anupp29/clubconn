// ============================================
// MongoDB Verification Script
// Verify Event Reports Data Integrity
// ============================================

// Run: mongosh clubconn_reports < database/mongodb/verify_event_reports.js

const db = db.getSiblingDB("clubconn_reports")

print("\n========== MONGODB DATA VERIFICATION ==========\n")

// Test 1: Check collection exists
print("Test 1: Collection Existence")
const collections = db.getCollectionNames()
if (collections.includes("event_reports")) {
  print("✓ PASS: event_reports collection exists")
} else {
  print("✗ FAIL: event_reports collection not found")
}

// Test 2: Check document count
print("\nTest 2: Document Count")
const totalDocs = db.event_reports.countDocuments()
print("Total Documents: " + totalDocs)
if (totalDocs === 14) {
  print("✓ PASS: All 14 event reports inserted")
} else {
  print("✗ FAIL: Expected 14 reports, found " + totalDocs)
}

// Test 3: Check required fields
print("\nTest 3: Required Fields Validation")
const missingFields = db.event_reports
  .find({
    $or: [
      { event_id: { $exists: false } },
      { club_id: { $exists: false } },
      { report_title: { $exists: false } },
      { created_by: { $exists: false } },
      { status: { $exists: false } },
    ],
  })
  .count()

if (missingFields === 0) {
  print("✓ PASS: All documents have required fields")
} else {
  print("✗ FAIL: " + missingFields + " documents missing required fields")
}

// Test 4: Check status values
print("\nTest 4: Status Values Validation")
const invalidStatus = db.event_reports
  .find({
    status: { $nin: ["draft", "published", "archived"] },
  })
  .count()

if (invalidStatus === 0) {
  print("✓ PASS: All status values are valid")
} else {
  print("✗ FAIL: " + invalidStatus + " documents have invalid status")
}

// Test 5: Check event_id uniqueness
print("\nTest 5: Event ID Uniqueness")
const uniqueEvents = db.event_reports.distinct("event_id").length
if (uniqueEvents === totalDocs) {
  print("✓ PASS: All event_ids are unique")
} else {
  print("✗ FAIL: Duplicate event_ids found")
}

// Test 6: Check indexes
print("\nTest 6: Index Verification")
const indexes = db.event_reports.getIndexes()
const requiredIndexes = ["event_id", "club_id", "created_by", "status", "created_at"]
let allIndexesExist = true

requiredIndexes.forEach((field) => {
  const indexExists = indexes.some((index) => index.key[field] !== undefined)
  if (indexExists) {
    print("✓ PASS: Index on '" + field + "' exists")
  } else {
    print("✗ FAIL: Index on '" + field + "' missing")
    allIndexesExist = false
  }
})

// Test 7: Check data consistency
print("\nTest 7: Data Consistency")
const reportsWithSummary = db.event_reports.find({ summary: { $exists: true } }).count()
if (reportsWithSummary === totalDocs) {
  print("✓ PASS: All reports have summary section")
} else {
  print("✗ FAIL: " + (totalDocs - reportsWithSummary) + " reports missing summary")
}

// Test 8: Check published reports have complete data
print("\nTest 8: Published Reports Completeness")
const publishedReports = db.event_reports.find({ status: "published" })
let incompletePublished = 0

publishedReports.forEach((report) => {
  if (!report.feedback_summary || !report.media || !report.financial_details) {
    incompletePublished++
  }
})

if (incompletePublished === 0) {
  print("✓ PASS: All published reports have complete data")
} else {
  print("✗ FAIL: " + incompletePublished + " published reports have incomplete data")
}

// Test 9: Check metadata
print("\nTest 9: Metadata Validation")
const reportsWithMetadata = db.event_reports.find({ metadata: { $exists: true } }).count()
if (reportsWithMetadata === totalDocs) {
  print("✓ PASS: All reports have metadata")
} else {
  print("✗ FAIL: " + (totalDocs - reportsWithMetadata) + " reports missing metadata")
}

// Test 10: Check date fields
print("\nTest 10: Date Fields Validation")
const invalidDates = db.event_reports
  .find({
    $or: [{ created_at: { $type: "date", $exists: false } }, { updated_at: { $type: "date", $exists: false } }],
  })
  .count()

if (invalidDates === 0) {
  print("✓ PASS: All date fields are valid")
} else {
  print("✗ FAIL: " + invalidDates + " documents have invalid date fields")
}

// Summary Statistics
print("\n========== SUMMARY STATISTICS ==========\n")

print("Reports by Status:")
db.event_reports
  .aggregate([{ $group: { _id: "$status", count: { $sum: 1 } } }, { $sort: { _id: 1 } }])
  .forEach((doc) => {
    print("  " + doc._id + ": " + doc.count)
  })

print("\nReports by Club:")
db.event_reports
  .aggregate([{ $group: { _id: "$club_id", count: { $sum: 1 } } }, { $sort: { _id: 1 } }])
  .forEach((doc) => {
    print("  Club " + doc._id + ": " + doc.count + " reports")
  })

print("\nAverage Satisfaction Ratings (Published Reports):")
const avgRating = db.event_reports
  .aggregate([
    { $match: { status: "published", "summary.satisfaction_rating": { $gt: 0 } } },
    { $group: { _id: null, avgRating: { $avg: "$summary.satisfaction_rating" } } },
  ])
  .toArray()

if (avgRating.length > 0) {
  print("  Average: " + avgRating[0].avgRating.toFixed(2) + " / 5.0")
}

print("\nTotal Participants (Published Reports):")
const totalParticipants = db.event_reports
  .aggregate([
    { $match: { status: "published" } },
    { $group: { _id: null, total: { $sum: "$summary.total_participants" } } },
  ])
  .toArray()

if (totalParticipants.length > 0) {
  print("  Total: " + totalParticipants[0].total + " participants")
}

print("\n========== VERIFICATION COMPLETE ==========\n")
