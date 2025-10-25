-- ============================================
-- ClubConn Database Verification Script
-- Run this after seeding to verify data integrity
-- ============================================

USE clubconn;

-- ============================================
-- 1. DATA COUNT VERIFICATION
-- ============================================

SELECT '========== DATA COUNT VERIFICATION ==========' as '';

SELECT 'Colleges' as Entity, COUNT(*) as Count, 3 as Expected, 
       CASE WHEN COUNT(*) = 3 THEN '✓ PASS' ELSE '✗ FAIL' END as Status
FROM colleges
UNION ALL
SELECT 'Communities', COUNT(*), 6,
       CASE WHEN COUNT(*) = 6 THEN '✓ PASS' ELSE '✗ FAIL' END
FROM communities
UNION ALL
SELECT 'Users', COUNT(*), 14,
       CASE WHEN COUNT(*) >= 14 THEN '✓ PASS' ELSE '✗ FAIL' END
FROM users
UNION ALL
SELECT 'Clubs', COUNT(*), 6,
       CASE WHEN COUNT(*) = 6 THEN '✓ PASS' ELSE '✗ FAIL' END
FROM clubs
UNION ALL
SELECT 'Club Members', COUNT(*), 17,
       CASE WHEN COUNT(*) >= 17 THEN '✓ PASS' ELSE '✗ FAIL' END
FROM club_members
UNION ALL
SELECT 'Events', COUNT(*), 14,
       CASE WHEN COUNT(*) >= 14 THEN '✓ PASS' ELSE '✗ FAIL' END
FROM events
UNION ALL
SELECT 'Event RSVPs', COUNT(*), 20,
       CASE WHEN COUNT(*) >= 20 THEN '✓ PASS' ELSE '✗ FAIL' END
FROM event_rsvps
UNION ALL
SELECT 'Certificates', COUNT(*), 8,
       CASE WHEN COUNT(*) >= 8 THEN '✓ PASS' ELSE '✗ FAIL' END
FROM certificates
UNION ALL
SELECT 'Badges', COUNT(*), 18,
       CASE WHEN COUNT(*) = 18 THEN '✓ PASS' ELSE '✗ FAIL' END
FROM badges
UNION ALL
SELECT 'User Badges', COUNT(*), 13,
       CASE WHEN COUNT(*) >= 13 THEN '✓ PASS' ELSE '✗ FAIL' END
FROM user_badges
UNION ALL
SELECT 'Activity Feed', COUNT(*), 14,
       CASE WHEN COUNT(*) >= 14 THEN '✓ PASS' ELSE '✗ FAIL' END
FROM activity_feed
UNION ALL
SELECT 'Volunteers', COUNT(*), 7,
       CASE WHEN COUNT(*) >= 7 THEN '✓ PASS' ELSE '✗ FAIL' END
FROM event_volunteers
UNION ALL
SELECT 'Sponsors', COUNT(*), 7,
       CASE WHEN COUNT(*) >= 7 THEN '✓ PASS' ELSE '✗ FAIL' END
FROM event_sponsors
UNION ALL
SELECT 'Proposals', COUNT(*), 5,
       CASE WHEN COUNT(*) >= 5 THEN '✓ PASS' ELSE '✗ FAIL' END
FROM event_proposals
UNION ALL
SELECT 'Event Feedback', COUNT(*), 8,
       CASE WHEN COUNT(*) >= 8 THEN '✓ PASS' ELSE '✗ FAIL' END
FROM event_feedback
UNION ALL
SELECT 'Points History', COUNT(*), 12,
       CASE WHEN COUNT(*) >= 12 THEN '✓ PASS' ELSE '✗ FAIL' END
FROM points_history;

-- ============================================
-- 2. FOREIGN KEY INTEGRITY CHECK
-- ============================================

SELECT '========== FOREIGN KEY INTEGRITY CHECK ==========' as '';

-- Check for orphaned club members
SELECT 'Orphaned Club Members' as Check_Type, COUNT(*) as Count,
       CASE WHEN COUNT(*) = 0 THEN '✓ PASS' ELSE '✗ FAIL' END as Status
FROM club_members cm
LEFT JOIN clubs c ON cm.club_id = c.club_id
LEFT JOIN users u ON cm.user_id = u.user_id
WHERE c.club_id IS NULL OR u.user_id IS NULL

UNION ALL

-- Check for orphaned events
SELECT 'Orphaned Events', COUNT(*),
       CASE WHEN COUNT(*) = 0 THEN '✓ PASS' ELSE '✗ FAIL' END
FROM events e
LEFT JOIN clubs c ON e.club_id = c.club_id
LEFT JOIN communities com ON e.community_id = com.community_id
WHERE c.club_id IS NULL OR com.community_id IS NULL

UNION ALL

-- Check for orphaned RSVPs
SELECT 'Orphaned RSVPs', COUNT(*),
       CASE WHEN COUNT(*) = 0 THEN '✓ PASS' ELSE '✗ FAIL' END
FROM event_rsvps er
LEFT JOIN events e ON er.event_id = e.event_id
LEFT JOIN users u ON er.user_id = u.user_id
WHERE e.event_id IS NULL OR u.user_id IS NULL

UNION ALL

-- Check for orphaned certificates
SELECT 'Orphaned Certificates', COUNT(*),
       CASE WHEN COUNT(*) = 0 THEN '✓ PASS' ELSE '✗ FAIL' END
FROM certificates cert
LEFT JOIN users u ON cert.user_id = u.user_id
WHERE u.user_id IS NULL;

-- ============================================
-- 3. DATA CONSISTENCY CHECK
-- ============================================

SELECT '========== DATA CONSISTENCY CHECK ==========' as '';

-- Check if all clubs belong to valid communities
SELECT 'Clubs with Valid Communities' as Check_Type, COUNT(*) as Count, 6 as Expected,
       CASE WHEN COUNT(*) = 6 THEN '✓ PASS' ELSE '✗ FAIL' END as Status
FROM clubs c
INNER JOIN communities com ON c.community_id = com.community_id

UNION ALL

-- Check if all events have valid clubs
SELECT 'Events with Valid Clubs', COUNT(*), 14,
       CASE WHEN COUNT(*) >= 14 THEN '✓ PASS' ELSE '✗ FAIL' END
FROM events e
INNER JOIN clubs c ON e.club_id = c.club_id

UNION ALL

-- Check if all users with college_id have valid colleges
SELECT 'Users with Valid Colleges', COUNT(*), 14,
       CASE WHEN COUNT(*) >= 14 THEN '✓ PASS' ELSE '✗ FAIL' END
FROM users u
INNER JOIN colleges col ON u.college_id = col.college_id;

-- ============================================
-- 4. BUSINESS LOGIC VALIDATION
-- ============================================

SELECT '========== BUSINESS LOGIC VALIDATION ==========' as '';

-- Check if event dates are logical (end_date >= start_date)
SELECT 'Events with Valid Dates' as Check_Type, COUNT(*) as Count,
       CASE WHEN COUNT(*) = (SELECT COUNT(*) FROM events) THEN '✓ PASS' ELSE '✗ FAIL' END as Status
FROM events
WHERE end_date >= start_date

UNION ALL

-- Check if registration dates are before event start
SELECT 'Events with Valid Registration Dates', COUNT(*),
       CASE WHEN COUNT(*) = (SELECT COUNT(*) FROM events WHERE registration_start IS NOT NULL) THEN '✓ PASS' ELSE '✗ FAIL' END
FROM events
WHERE registration_start IS NULL OR registration_start < start_date

UNION ALL

-- Check if current_participants <= max_participants
SELECT 'Events with Valid Participant Counts', COUNT(*),
       CASE WHEN COUNT(*) = (SELECT COUNT(*) FROM events WHERE max_participants IS NOT NULL) THEN '✓ PASS' ELSE '✗ FAIL' END
FROM events
WHERE max_participants IS NULL OR current_participants <= max_participants

UNION ALL

-- Check if certificate dates are after event dates
SELECT 'Certificates with Valid Issue Dates', COUNT(*),
       CASE WHEN COUNT(*) = (SELECT COUNT(*) FROM certificates WHERE event_id IS NOT NULL) THEN '✓ PASS' ELSE '✗ FAIL' END
FROM certificates cert
INNER JOIN events e ON cert.event_id = e.event_id
WHERE cert.issued_date >= DATE(e.end_date);

-- ============================================
-- 5. SAMPLE DATA QUERIES
-- ============================================

SELECT '========== SAMPLE DATA VERIFICATION ==========' as '';

-- Show clubs with member counts
SELECT 
    c.club_name,
    com.community_name,
    COUNT(cm.membership_id) as actual_members,
    c.member_count as recorded_members,
    CASE WHEN COUNT(cm.membership_id) = c.member_count THEN '✓' ELSE '✗' END as match_status
FROM clubs c
LEFT JOIN club_members cm ON c.club_id = cm.club_id AND cm.is_active = TRUE
LEFT JOIN communities com ON c.community_id = com.community_id
GROUP BY c.club_id, c.club_name, com.community_name, c.member_count
ORDER BY c.club_name;

-- Show events with RSVP counts
SELECT 
    e.event_name,
    c.club_name,
    COUNT(er.rsvp_id) as actual_rsvps,
    e.current_participants as recorded_participants,
    e.max_participants,
    CASE WHEN COUNT(er.rsvp_id) = e.current_participants THEN '✓' ELSE '✗' END as match_status
FROM events e
LEFT JOIN event_rsvps er ON e.event_id = er.event_id
LEFT JOIN clubs c ON e.club_id = c.club_id
GROUP BY e.event_id, e.event_name, c.club_name, e.current_participants, e.max_participants
ORDER BY e.start_date;

-- Show users with their points and badges
SELECT 
    u.username,
    u.full_name,
    u.total_points,
    COUNT(DISTINCT ub.badge_id) as badges_earned,
    COUNT(DISTINCT cert.certificate_id) as certificates_earned,
    COUNT(DISTINCT er.rsvp_id) as events_registered
FROM users u
LEFT JOIN user_badges ub ON u.user_id = ub.user_id AND ub.is_unlocked = TRUE
LEFT JOIN certificates cert ON u.user_id = cert.user_id
LEFT JOIN event_rsvps er ON u.user_id = er.user_id
WHERE u.user_type = 'student' OR u.user_type = 'club_admin'
GROUP BY u.user_id, u.username, u.full_name, u.total_points
ORDER BY u.total_points DESC
LIMIT 10;

-- ============================================
-- 6. FINAL SUMMARY
-- ============================================

SELECT '========== SEEDING VERIFICATION SUMMARY ==========' as '';

SELECT 
    'Total Tables' as Metric,
    COUNT(DISTINCT table_name) as Value
FROM information_schema.tables
WHERE table_schema = 'clubconn'

UNION ALL

SELECT 
    'Total Records',
    (SELECT SUM(table_rows) FROM information_schema.tables WHERE table_schema = 'clubconn')

UNION ALL

SELECT
    'Database Size (MB)',
    ROUND(SUM(data_length + index_length) / 1024 / 1024, 2)
FROM information_schema.tables
WHERE table_schema = 'clubconn';

SELECT '========== VERIFICATION COMPLETE ==========' as '';
SELECT 'If all checks show ✓ PASS, the database is properly seeded!' as Result;
