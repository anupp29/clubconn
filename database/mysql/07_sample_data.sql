-- ============================================
-- Sample Data for Testing
-- ============================================

USE clubconn;

-- Insert Sample College
INSERT INTO colleges (college_name, college_code, location, city, state, website_url) VALUES
('K. K. Wagh Institute of Engineering Education and Research', 'KKWIEER', 'Nashik', 'Nashik', 'Maharashtra', 'https://kkwagh.edu.in');

SET @college_id = LAST_INSERT_ID();

-- Insert Sample Communities
INSERT INTO communities (community_name, slug, description, icon, color_primary, color_light, color_glow, display_order) VALUES
('Technology', 'tech', 'Explore the world of coding, AI, and innovation', 'Code', '#3B82F6', '#DBEAFE', '#3B82F620', 1),
('Cultural', 'cultural', 'Celebrate art, music, and cultural diversity', 'Music', '#F59E0B', '#FEF3C7', '#F59E0B20', 2),
('Sports', 'sports', 'Stay active and competitive', 'Trophy', '#EF4444', '#FEE2E2', '#EF444420', 3),
('Business', 'business', 'Learn entrepreneurship and business skills', 'Briefcase', '#8B5CF6', '#EDE9FE', '#8B5CF620', 4),
('Social', 'social', 'Make a difference in the community', 'Heart', '#10B981', '#D1FAE5', '#10B98120', 5),
('Creative', 'creative', 'Express yourself through art and design', 'Palette', '#EC4899', '#FCE7F3', '#EC489920', 6);

-- Insert Sample Users
INSERT INTO users (username, email, password_hash, full_name, college_id, department, year_of_study, user_type, total_points) VALUES
('john_doe', 'john@example.com', '$2a$10$abcdefghijklmnopqrstuvwxyz', 'John Doe', @college_id, 'Computer Engineering', 3, 'student', 1250),
('jane_smith', 'jane@example.com', '$2a$10$abcdefghijklmnopqrstuvwxyz', 'Jane Smith', @college_id, 'Electronics Engineering', 2, 'student', 890),
('admin_user', 'admin@example.com', '$2a$10$abcdefghijklmnopqrstuvwxyz', 'Admin User', @college_id, NULL, NULL, 'college_admin', 0);

-- Insert Sample Clubs
INSERT INTO clubs (club_name, slug, community_id, college_id, description, mission, founded_year, member_count) VALUES
('Computer Society of India', 'csi', 1, @college_id, 'Leading tech club promoting computer science education', 'To advance computing as a science and profession', 2010, 150),
('Cultural Committee', 'cultural-committee', 2, @college_id, 'Organizing cultural events and festivals', 'To promote cultural diversity and artistic expression', 2008, 200),
('Sports Committee', 'sports-committee', 3, @college_id, 'Managing all sports activities', 'To promote physical fitness and sportsmanship', 2005, 180);

-- Insert Sample Badges
INSERT INTO badges (badge_name, badge_slug, description, icon, category, tier, points_required, criteria_type, criteria_value) VALUES
('First Steps', 'first-steps', 'Join your first club', 'Star', 'milestone', 'bronze', 0, 'clubs_joined', 1),
('Event Enthusiast', 'event-enthusiast', 'Attend 5 events', 'Calendar', 'participation', 'silver', 100, 'events_attended', 5),
('Point Master', 'point-master', 'Earn 1000 points', 'Award', 'achievement', 'gold', 1000, 'total_points', 1000),
('Volunteer Hero', 'volunteer-hero', 'Volunteer for 10 hours', 'Heart', 'leadership', 'gold', 200, 'volunteer_hours', 10);
