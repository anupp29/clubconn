-- ============================================
-- Additional Performance Indexes
-- ============================================

USE clubconn;

-- Composite indexes for common queries
CREATE INDEX idx_events_club_status ON events(club_id, status, start_date);
CREATE INDEX idx_events_community_status ON events(community_id, status, start_date);
CREATE INDEX idx_events_date_range ON events(start_date, end_date, status);

CREATE INDEX idx_rsvps_event_status ON event_rsvps(event_id, status);
CREATE INDEX idx_rsvps_user_status ON event_rsvps(user_id, status);

CREATE INDEX idx_club_members_active ON club_members(club_id, is_active, role);
CREATE INDEX idx_user_clubs_active ON club_members(user_id, is_active);

CREATE INDEX idx_activity_user_public ON activity_feed(user_id, is_public, created_at DESC);
CREATE INDEX idx_activity_type_date ON activity_feed(activity_type, created_at DESC);

CREATE INDEX idx_points_user_date ON points_history(user_id, created_at DESC);

CREATE INDEX idx_notifications_user_unread ON notifications(user_id, is_read, created_at DESC);

-- Covering indexes for leaderboard queries
CREATE INDEX idx_users_leaderboard ON users(total_points DESC, username, full_name, avatar_url);
