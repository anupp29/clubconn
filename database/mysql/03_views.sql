-- ============================================
-- Database Views
-- ============================================

USE clubconn;

-- View: Active Events with Club and Community Info
CREATE OR REPLACE VIEW v_active_events AS
SELECT 
    e.event_id,
    e.event_name,
    e.slug,
    e.description,
    e.event_type,
    e.event_mode,
    e.venue,
    e.start_date,
    e.end_date,
    e.registration_end,
    e.max_participants,
    e.current_participants,
    e.entry_fee,
    e.poster_url,
    e.status,
    e.is_featured,
    e.points_reward,
    c.club_name,
    c.slug AS club_slug,
    c.logo_url AS club_logo,
    com.community_name,
    com.slug AS community_slug,
    com.color_primary,
    CASE 
        WHEN e.current_participants >= e.max_participants THEN 'full'
        WHEN e.registration_end < NOW() THEN 'closed'
        ELSE 'open'
    END AS registration_status
FROM events e
JOIN clubs c ON e.club_id = c.club_id
JOIN communities com ON e.community_id = com.community_id
WHERE e.status IN ('published', 'ongoing')
    AND e.is_active = TRUE
    AND c.is_active = TRUE;

-- View: User Leaderboard
CREATE OR REPLACE VIEW v_leaderboard AS
SELECT 
    u.user_id,
    u.username,
    u.full_name,
    u.avatar_url,
    u.total_points,
    u.department,
    u.year_of_study,
    col.college_name,
    COUNT(DISTINCT cm.club_id) AS clubs_joined,
    COUNT(DISTINCT er.event_id) AS events_attended,
    COUNT(DISTINCT ub.badge_id) AS badges_earned,
    COUNT(DISTINCT cert.certificate_id) AS certificates_earned,
    RANK() OVER (ORDER BY u.total_points DESC) AS rank_position
FROM users u
LEFT JOIN colleges col ON u.college_id = col.college_id
LEFT JOIN club_members cm ON u.user_id = cm.user_id AND cm.is_active = TRUE
LEFT JOIN event_rsvps er ON u.user_id = er.user_id AND er.status = 'attended'
LEFT JOIN user_badges ub ON u.user_id = ub.user_id AND ub.is_unlocked = TRUE
LEFT JOIN certificates cert ON u.user_id = cert.user_id
WHERE u.is_active = TRUE
GROUP BY u.user_id
ORDER BY u.total_points DESC;

-- View: Club Statistics
CREATE OR REPLACE VIEW v_club_stats AS
SELECT 
    c.club_id,
    c.club_name,
    c.slug,
    c.logo_url,
    com.community_name,
    col.college_name,
    COUNT(DISTINCT cm.user_id) AS total_members,
    COUNT(DISTINCT e.event_id) AS total_events,
    COUNT(DISTINCT CASE WHEN e.status = 'published' THEN e.event_id END) AS upcoming_events,
    COUNT(DISTINCT CASE WHEN e.status = 'completed' THEN e.event_id END) AS completed_events,
    COALESCE(SUM(e.current_participants), 0) AS total_participants,
    c.created_at
FROM clubs c
JOIN communities com ON c.community_id = com.community_id
JOIN colleges col ON c.college_id = col.college_id
LEFT JOIN club_members cm ON c.club_id = cm.club_id AND cm.is_active = TRUE
LEFT JOIN events e ON c.club_id = e.club_id
WHERE c.is_active = TRUE
GROUP BY c.club_id;

-- View: User Activity Summary
CREATE OR REPLACE VIEW v_user_activity_summary AS
SELECT 
    u.user_id,
    u.username,
    u.full_name,
    COUNT(DISTINCT af.activity_id) AS total_activities,
    COUNT(DISTINCT CASE WHEN af.activity_type = 'event_attended' THEN af.activity_id END) AS events_attended,
    COUNT(DISTINCT CASE WHEN af.activity_type = 'badge_earned' THEN af.activity_id END) AS badges_earned,
    COUNT(DISTINCT CASE WHEN af.activity_type = 'club_joined' THEN af.activity_id END) AS clubs_joined,
    MAX(af.created_at) AS last_activity_at
FROM users u
LEFT JOIN activity_feed af ON u.user_id = af.user_id
WHERE u.is_active = TRUE
GROUP BY u.user_id;

-- View: Event Participation Details
CREATE OR REPLACE VIEW v_event_participation AS
SELECT 
    e.event_id,
    e.event_name,
    e.start_date,
    c.club_name,
    COUNT(DISTINCT er.user_id) AS total_registrations,
    COUNT(DISTINCT CASE WHEN er.status = 'attended' THEN er.user_id END) AS total_attended,
    COUNT(DISTINCT ev.user_id) AS total_volunteers,
    COALESCE(SUM(er.payment_amount), 0) AS total_revenue,
    ROUND(COUNT(DISTINCT CASE WHEN er.status = 'attended' THEN er.user_id END) * 100.0 / 
          NULLIF(COUNT(DISTINCT er.user_id), 0), 2) AS attendance_rate
FROM events e
JOIN clubs c ON e.club_id = c.club_id
LEFT JOIN event_rsvps er ON e.event_id = er.event_id
LEFT JOIN event_volunteers ev ON e.event_id = ev.event_id AND ev.status = 'approved'
GROUP BY e.event_id;

-- View: Upcoming Events Dashboard
CREATE OR REPLACE VIEW v_upcoming_events_dashboard AS
SELECT 
    e.event_id,
    e.event_name,
    e.slug,
    e.start_date,
    e.end_date,
    e.venue,
    e.poster_url,
    c.club_name,
    c.slug AS club_slug,
    com.community_name,
    com.color_primary,
    e.current_participants,
    e.max_participants,
    DATEDIFF(e.start_date, NOW()) AS days_until_event,
    CASE 
        WHEN e.current_participants >= e.max_participants THEN 'Full'
        WHEN e.registration_end < NOW() THEN 'Registration Closed'
        WHEN DATEDIFF(e.start_date, NOW()) <= 7 THEN 'Starting Soon'
        ELSE 'Open'
    END AS event_status_label
FROM events e
JOIN clubs c ON e.club_id = c.club_id
JOIN communities com ON e.community_id = com.community_id
WHERE e.status = 'published'
    AND e.start_date > NOW()
ORDER BY e.start_date ASC;
