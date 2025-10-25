// ============================================
// MongoDB Verification Script
// Verify Event Reports Data Integrity
// ============================================

use clubconn_reports

print("\n========== MONGODB DATA VERIFICATION ==========\n");

// Test 1: Check collection exists
print("Test 1: Collection Existence");
const collections = db.getCollectionNames();
if (collections.includes("event_reports")) {
  print("✓ PASS: event_reports collection exists");
} else {
  print("✗ FAIL: event_reports collection not found");
}

// Test 2: Check document count
print("\nTest 2: Document Count");
const totalDocs = db.event_reports.countDocuments();
print("Total Documents: " + totalDocs);
if (totalDocs === 7) {
  print("✓ PASS: All 7 event reports inserted");
} else {
  print("✗ FAIL: Expected 7 reports, found " + totalDocs);
}

// Test 3: Check required fields
print("\nTest 3: Required Fields Validation");
const missingFields = db.event_reports.find({
  $or: [
    { event_id: { $exists: false } },
    { club_id: { $exists: false } },
    { report_title: { $exists: false } },
    { created_by: { $exists: false } },
    { status: { $exists: false } }
  ]
}).count();

if (missingFields === 0) {
  print("✓ PASS: All documents have required fields");
} else {
  print("✗ FAIL: " + missingFields + " documents missing required fields");
}

// Test 4: Check status values
print("\nTest 4: Status Values Validation");
const invalidStatus = db.event_reports.find({
  status: { $nin: ["draft", "published", "archived"] }
}).count();

if (invalidStatus === 0) {
  print("✓ PASS: All status values are valid");
} else {
  print("✗ FAIL: " + invalidStatus + " documents have invalid status");
}

// Test 5: Check event_id uniqueness
print("\nTest 5: Event ID Uniqueness");
const uniqueEvents = db.event_reports.distinct("event_id").length;
if (uniqueEvents === totalDocs) {
  print("✓ PASS: All event_ids are unique");
} else {
  print("✗ FAIL: Duplicate event_ids found");
}

// Test 6: Check indexes
print("\nTest 6: Index Verification");
const indexes = db.event_reports.getIndexes();
const requiredIndexes = ["event_id", "club_id", "club_slug", "status", "created_at"];
let allIndexesExist = true;

requiredIndexes.forEach(function(field) {
  const indexExists = indexes.some(function(index) {
    return index.key[field] !== undefined;
  });
  if (indexExists) {
    print("✓ PASS: Index on '" + field + "' exists");
  } else {
    print("✗ FAIL: Index on '" + field + "' missing");
    allIndexesExist = false;
  }
});

// Test 7: Check data consistency
print("\nTest 7: Data Consistency");
const reportsWithSummary = db.event_reports.find({ summary: { $exists: true } }).count();
if (reportsWithSummary === totalDocs) {
  print("✓ PASS: All reports have summary section");
} else {
  print("✗ FAIL: " + (totalDocs - reportsWithSummary) + " reports missing summary");
}

// Test 8: Check published reports have complete data
print("\nTest 8: Published Reports Completeness");
const publishedReports = db.event_reports.find({ status: "published" }).toArray();
let incompletePublished = 0;

publishedReports.forEach(function(report) {
  if (!report.feedback_summary || !report.media) {
    incompletePublished++;
  }
});

const publishedCount = publishedReports.length;
if (incompletePublished === 0) {
  print("✓ PASS: All " + publishedCount + " published reports have complete data");
} else {
  print("✗ FAIL: " + incompletePublished + " published reports have incomplete data");
}

// Test 9: Check club-specific metrics exist
print("\nTest 9: Club-Specific Metrics Validation");
const csiReports = db.event_reports.find({ club_slug: "csi", tech_metrics: { $exists: true } }).count();
const fossReports = db.event_reports.find({ club_slug: "foss", open_source_metrics: { $exists: true } }).count();
const debuggersReports = db.event_reports.find({ club_slug: "debuggers", competitive_programming_metrics: { $exists: true } }).count();
const desocReports = db.event_reports.find({ club_slug: "desoc", design_metrics: { $exists: true } }).count();
const phoenixReports = db.event_reports.find({ club_slug: "phoenix", ml_ai_metrics: { $exists: true } }).count();
const mibcsReports = db.event_reports.find({ club_slug: "mibcs", business_tech_metrics: { $exists: true } }).count();

const totalClubMetrics = csiReports + fossReports + debuggersReports + desocReports + phoenixReports + mibcsReports;

if (totalClubMetrics === totalDocs) {
  print("✓ PASS: All reports have club-specific metrics");
} else {
  print("✗ FAIL: Some reports missing club-specific metrics");
}

// Test 10: Check date fields
print("\nTest 10: Date Fields Validation");
const invalidDates = db.event_reports.find({
  created_at: { $exists: false }
}).count();

if (invalidDates === 0) {
  print("✓ PASS: All date fields are valid");
} else {
  print("✗ FAIL: " + invalidDates + " documents have invalid date fields");
}

// Summary Statistics
print("\n========== SUMMARY STATISTICS ==========\n");

print("Reports by Status:");
const statusGroups = db.event_reports.aggregate([
  { $group: { _id: "$status", count: { $sum: 1 } } },
  { $sort: { _id: 1 } }
]).toArray();

statusGroups.forEach(function(doc) {
  print("  " + doc._id + ": " + doc.count);
});

print("\nReports by Club:");
const clubGroups = db.event_reports.aggregate([
  { $group: { _id: "$club_slug", count: { $sum: 1 } } },
  { $sort: { _id: 1 } }
]).toArray();

clubGroups.forEach(function(doc) {
  print("  " + doc._id + ": " + doc.count + " report(s)");
});

print("\nAverage Satisfaction Ratings (Published Reports):");
const avgRating = db.event_reports.aggregate([
  { $match: { status: "published", "summary.satisfaction_rating": { $gt: 0 } } },
  { $group: { _id: null, avgRating: { $avg: "$summary.satisfaction_rating" } } }
]).toArray();

if (avgRating.length > 0) {
  print("  Average: " + avgRating[0].avgRating.toFixed(2) + " / 5.0");
}

print("\nTotal Participants (Published Reports):");
const totalParticipants = db.event_reports.aggregate([
  { $match: { status: "published" } },
  { $group: { _id: null, total: { $sum: "$summary.total_participants" } } }
]).toArray();

if (totalParticipants.length > 0) {
  print("  Total: " + totalParticipants[0].total + " participants");
}

print("\nAverage Attendance Rate (Published Reports):");
const avgAttendance = db.event_reports.aggregate([
  { $match: { status: "published", "summary.attendance_rate": { $gt: 0 } } },
  { $group: { _id: null, avgAttendance: { $avg: "$summary.attendance_rate" } } }
]).toArray();

if (avgAttendance.length > 0) {
  print("  Average: " + avgAttendance[0].avgAttendance.toFixed(2) + "%");
}

print("\n========== VERIFICATION COMPLETE ==========\n");