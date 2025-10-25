-- ============================================
-- CLUBCONN - COMPREHENSIVE SEED DATA
-- Perfect 3NF/BCNF Normalized Data
-- Matching Frontend Context & Schema
-- ============================================

USE clubconn;

-- Disable foreign key checks for clean insertion
SET FOREIGN_KEY_CHECKS = 0;

-- Clear existing data (for re-seeding)
TRUNCATE TABLE activity_feed;
TRUNCATE TABLE user_badges;
TRUNCATE TABLE certificates;
TRUNCATE TABLE event_feedback;
TRUNCATE TABLE event_sponsors;
TRUNCATE TABLE event_volunteers;
TRUNCATE TABLE event_proposals;
TRUNCATE TABLE event_rsvps;
TRUNCATE TABLE events;
TRUNCATE TABLE club_members;
TRUNCATE TABLE clubs;
TRUNCATE TABLE communities;
TRUNCATE TABLE badges;
TRUNCATE TABLE points_history;
TRUNCATE TABLE notifications;
TRUNCATE TABLE sponsorship_requests;
TRUNCATE TABLE sponsorship_packages;
TRUNCATE TABLE users;
TRUNCATE TABLE colleges;

-- Re-enable foreign key checks
SET FOREIGN_KEY_CHECKS = 1;

-- ============================================
-- 1. COLLEGES DATA
-- ============================================

INSERT INTO colleges (college_name, college_code, location, city, state, country, pincode, website_url, is_active) VALUES
('K. K. Wagh Institute of Engineering Education and Research', 'KKWIEER', 'Panchavati', 'Nashik', 'Maharashtra', 'India', '422003', 'https://kkwagh.edu.in', TRUE),
('Sandip Foundation', 'SANDIP', 'Trimbak Road', 'Nashik', 'Maharashtra', 'India', '422213', 'https://sandipfoundation.org', TRUE),
('MIT Academy of Engineering', 'MITAOE', 'Alandi', 'Pune', 'Maharashtra', 'India', '412105', 'https://mitaoe.ac.in', TRUE);

SET @kkwieer_id = (SELECT college_id FROM colleges WHERE college_code = 'KKWIEER');
SET @sandip_id = (SELECT college_id FROM colleges WHERE college_code = 'SANDIP');
SET @mitaoe_id = (SELECT college_id FROM colleges WHERE college_code = 'MITAOE');

-- ============================================
-- 2. COMMUNITIES DATA (Matching Frontend)
-- ============================================

INSERT INTO communities (community_name, slug, description, icon, color_primary, color_light, color_glow, display_order, is_active) VALUES
('Technology', 'tech', 'Explore the world of coding, AI, machine learning, and cutting-edge innovation. Join workshops, hackathons, and tech talks.', 'Code', '#3B82F6', '#DBEAFE', 'rgba(59, 130, 246, 0.15)', 1, TRUE),
('Cultural', 'cultural', 'Celebrate art, music, dance, and cultural diversity. Participate in festivals, performances, and creative showcases.', 'Music', '#F59E0B', '#FEF3C7', 'rgba(245, 158, 11, 0.15)', 2, TRUE),
('Sports', 'sports', 'Stay active, competitive, and healthy. Join sports tournaments, fitness sessions, and athletic events.', 'Trophy', '#EF4444', '#FEE2E2', 'rgba(239, 68, 68, 0.15)', 3, TRUE),
('Business', 'business', 'Learn entrepreneurship, business strategy, and leadership skills. Network with industry professionals.', 'Briefcase', '#8B5CF6', '#EDE9FE', 'rgba(139, 92, 246, 0.15)', 4, TRUE),
('Social', 'social', 'Make a positive difference in the community through social service, volunteering, and awareness campaigns.', 'Heart', '#10B981', '#D1FAE5', 'rgba(16, 185, 129, 0.15)', 5, TRUE),
('Creative', 'creative', 'Express yourself through art, design, photography, and creative projects. Showcase your talent.', 'Palette', '#EC4899', '#FCE7F3', 'rgba(236, 72, 153, 0.15)', 6, TRUE);

SET @tech_community = (SELECT community_id FROM communities WHERE slug = 'tech');
SET @cultural_community = (SELECT community_id FROM communities WHERE slug = 'cultural');
SET @sports_community = (SELECT community_id FROM communities WHERE slug = 'sports');
SET @business_community = (SELECT community_id FROM communities WHERE slug = 'business');
SET @social_community = (SELECT community_id FROM communities WHERE slug = 'social');
SET @creative_community = (SELECT community_id FROM communities WHERE slug = 'creative');

-- ============================================
-- 3. USERS DATA (Diverse Student Profiles)
-- ============================================

INSERT INTO users (username, email, password_hash, full_name, college_id, department, year_of_study, user_type, bio, avatar_url, total_points, is_active) VALUES
-- Students
('rahul_sharma', 'rahul.sharma@kkwieer.edu.in', '$2a$10$abcdefghijklmnopqrstuvwxyz123456', 'Rahul Sharma', @kkwieer_id, 'Computer Engineering', 3, 'student', 'Passionate about AI/ML and open source. Love attending hackathons!', NULL, 2450, TRUE),
('priya_patel', 'priya.patel@kkwieer.edu.in', '$2a$10$abcdefghijklmnopqrstuvwxyz123456', 'Priya Patel', @kkwieer_id, 'Information Technology', 2, 'student', 'Full-stack developer | UI/UX enthusiast | Coffee lover ☕', NULL, 1890, TRUE),
('amit_desai', 'amit.desai@kkwieer.edu.in', '$2a$10$abcdefghijklmnopqrstuvwxyz123456', 'Amit Desai', @kkwieer_id, 'Electronics Engineering', 4, 'student', 'IoT and embedded systems geek. Building smart solutions.', NULL, 3120, TRUE),
('sneha_kulkarni', 'sneha.kulkarni@kkwieer.edu.in', '$2a$10$abcdefghijklmnopqrstuvwxyz123456', 'Sneha Kulkarni', @kkwieer_id, 'Computer Engineering', 3, 'student', 'Cybersecurity researcher | CTF player | Bug bounty hunter', NULL, 2780, TRUE),
('rohan_joshi', 'rohan.joshi@kkwieer.edu.in', '$2a$10$abcdefghijklmnopqrstuvwxyz123456', 'Rohan Joshi', @kkwieer_id, 'Mechanical Engineering', 2, 'student', 'Robotics and automation enthusiast. Team player.', NULL, 1560, TRUE),
('ananya_singh', 'ananya.singh@kkwieer.edu.in', '$2a$10$abcdefghijklmnopqrstuvwxyz123456', 'Ananya Singh', @kkwieer_id, 'AIDS (Artificial Intelligence & Data Science)', 3, 'student', 'Data scientist in making | Python lover | ML practitioner', NULL, 2210, TRUE),
('vikram_mehta', 'vikram.mehta@kkwieer.edu.in', '$2a$10$abcdefghijklmnopqrstuvwxyz123456', 'Vikram Mehta', @kkwieer_id, 'Computer Engineering', 4, 'student', 'Open source contributor | FOSS advocate | Linux enthusiast', NULL, 3450, TRUE),
('ishita_rao', 'ishita.rao@kkwieer.edu.in', '$2a$10$abcdefghijklmnopqrstuvwxyz123456', 'Ishita Rao', @kkwieer_id, 'Information Technology', 2, 'student', 'Creative designer | UI/UX | Figma expert', NULL, 1720, TRUE),
('karan_verma', 'karan.verma@kkwieer.edu.in', '$2a$10$abcdefghijklmnopqrstuvwxyz123456', 'Karan Verma', @kkwieer_id, 'Electronics Engineering', 3, 'student', 'Blockchain developer | Web3 enthusiast | Crypto curious', NULL, 2340, TRUE),
('neha_gupta', 'neha.gupta@kkwieer.edu.in', '$2a$10$abcdefghijklmnopqrstuvwxyz123456', 'Neha Gupta', @kkwieer_id, 'Computer Engineering', 4, 'student', 'Competitive programmer | Codeforces Expert | Problem solver', NULL, 3890, TRUE),
-- Club Admins
('admin_csi', 'admin.csi@kkwieer.edu.in', '$2a$10$abcdefghijklmnopqrstuvwxyz123456', 'CSI Admin', @kkwieer_id, 'Computer Engineering', 4, 'club_admin', 'Managing CSI KKWIEER chapter', NULL, 500, TRUE),
('admin_foss', 'admin.foss@kkwieer.edu.in', '$2a$10$abcdefghijklmnopqrstuvwxyz123456', 'FOSS Admin', @kkwieer_id, 'Information Technology', 4, 'club_admin', 'FOSS KKWIEER coordinator', NULL, 450, TRUE),
('admin_debuggers', 'admin.debuggers@kkwieer.edu.in', '$2a$10$abcdefghijklmnopqrstuvwxyz123456', 'Debuggers Admin', @kkwieer_id, 'Computer Engineering', 4, 'club_admin', 'Debuggers Club coordinator', NULL, 400, TRUE),
-- College Admin
('college_admin', 'admin@kkwieer.edu.in', '$2a$10$abcdefghijklmnopqrstuvwxyz123456', 'College Administrator', @kkwieer_id, NULL, NULL, 'college_admin', 'Managing ClubConn for KKWIEER', NULL, 0, TRUE);

-- Get user IDs for reference
SET @rahul_id = (SELECT user_id FROM users WHERE username = 'rahul_sharma');
SET @priya_id = (SELECT user_id FROM users WHERE username = 'priya_patel');
SET @amit_id = (SELECT user_id FROM users WHERE username = 'amit_desai');
SET @sneha_id = (SELECT user_id FROM users WHERE username = 'sneha_kulkarni');
SET @rohan_id = (SELECT user_id FROM users WHERE username = 'rohan_joshi');
SET @ananya_id = (SELECT user_id FROM users WHERE username = 'ananya_singh');
SET @vikram_id = (SELECT user_id FROM users WHERE username = 'vikram_mehta');
SET @ishita_id = (SELECT user_id FROM users WHERE username = 'ishita_rao');
SET @karan_id = (SELECT user_id FROM users WHERE username = 'karan_verma');
SET @neha_id = (SELECT user_id FROM users WHERE username = 'neha_gupta');
SET @admin_csi_id = (SELECT user_id FROM users WHERE username = 'admin_csi');
SET @admin_foss_id = (SELECT user_id FROM users WHERE username = 'admin_foss');
SET @admin_debuggers_id = (SELECT user_id FROM users WHERE username = 'admin_debuggers');

-- ============================================
-- 4. CLUBS DATA (Matching Frontend Exactly)
-- ============================================

INSERT INTO clubs (club_name, slug, community_id, college_id, description, mission, vision, founded_year, member_count, logo_url, cover_image_url, email, social_instagram, social_linkedin, social_twitter, social_website, is_active) VALUES
('Computer Society of India', 'csi', @tech_community, @kkwieer_id, 
 'Leading tech club at KKWIEER promoting computer science education, innovation, and professional development. We organize workshops, hackathons, tech talks, and coding competitions.',
 'To advance computing as a science and profession, and to foster innovation and excellence in technology education.',
 'To be the premier student organization for computer science and technology at KKWIEER.',
 2010, 5, NULL, NULL, 'csi@kkwieer.edu.in', 'csi_kkwieer', 'csi-kkwieer', 'csi_kkwieer', 'https://csi-kkwieer.org', TRUE),

('FOSS KKWIEER', 'foss', @tech_community, @kkwieer_id,
 'Free and Open Source Software community promoting open source culture, contribution, and collaboration.',
 'To promote free and open source software culture and empower students to contribute to global open source projects.',
 'To build a thriving FOSS ecosystem at KKWIEER and create world-class open source contributors.',
 2015, 4, NULL, NULL, 'foss@kkwieer.edu.in', NULL, NULL, 'foss_kkwieer', 'https://foss.kkwieer.edu.in', TRUE),

('Debuggers Club', 'debuggers', @tech_community, @kkwieer_id,
 'Competitive programming and problem-solving club training students for coding competitions.',
 'To nurture competitive programming talent and create problem solvers who excel in technical interviews.',
 'To produce top-ranked competitive programmers and place students in leading tech companies.',
 2012, 3, NULL, NULL, 'debuggers@kkwieer.edu.in', NULL, NULL, NULL, NULL, TRUE),

('Design & CS Society', 'desoc', @creative_community, @kkwieer_id,
 'Perfect blend of design and computer science focusing on UI/UX design and creative technology.',
 'To bridge the gap between design and technology, creating designers who code and developers who design.',
 'To be the leading design-tech community producing world-class UI/UX designers.',
 2016, 3, NULL, NULL, 'desoc@kkwieer.edu.in', 'desoc_kkwieer', NULL, NULL, 'https://desoc.kkwieer.edu.in', TRUE),

('Phoenix Club (AIDS)', 'phoenix', @tech_community, @kkwieer_id,
 'Artificial Intelligence and Data Science club focusing on ML, DL, and data analytics.',
 'To advance AI and data science education and create skilled data scientists and ML engineers.',
 'To be the premier AI/DS community producing cutting-edge research and industry-ready professionals.',
 2019, 3, NULL, NULL, 'phoenix@kkwieer.edu.in', NULL, NULL, NULL, NULL, TRUE),

('ML, IoT, Blockchain & CyberSec', 'mibcs', @tech_community, @kkwieer_id,
 'Emerging technologies club covering Machine Learning, IoT, Blockchain, and Cybersecurity.',
 'To explore and master emerging technologies and prepare students for the future of tech.',
 'To be the innovation hub for emerging technologies at KKWIEER.',
 2018, 2, NULL, NULL, 'mibcs@kkwieer.edu.in', NULL, 'mibcs-kkwieer', 'mibcs_kkw', NULL, TRUE);

-- Get club IDs
SET @csi_id = (SELECT club_id FROM clubs WHERE slug = 'csi');
SET @foss_id = (SELECT club_id FROM clubs WHERE slug = 'foss');
SET @debuggers_id = (SELECT club_id FROM clubs WHERE slug = 'debuggers');
SET @desoc_id = (SELECT club_id FROM clubs WHERE slug = 'desoc');
SET @phoenix_id = (SELECT club_id FROM clubs WHERE slug = 'phoenix');
SET @mibcs_id = (SELECT club_id FROM clubs WHERE slug = 'mibcs');

-- ============================================
-- 5. CLUB MEMBERS (Diverse Membership)
-- ============================================

INSERT INTO club_members (club_id, user_id, role, position_title, joined_at, is_active) VALUES
-- CSI Members
(@csi_id, @admin_csi_id, 'president', 'President', '2024-07-01 10:00:00', TRUE),
(@csi_id, @neha_id, 'vice_president', 'Vice President', '2024-07-01 10:00:00', TRUE),
(@csi_id, @rahul_id, 'member', 'Member', '2024-08-01 14:20:00', TRUE),
(@csi_id, @priya_id, 'member', 'Member', '2024-08-05 11:30:00', TRUE),
(@csi_id, @sneha_id, 'coordinator', 'Technical Coordinator', '2024-07-15 09:00:00', TRUE),

-- FOSS Members
(@foss_id, @admin_foss_id, 'president', 'Coordinator', '2024-07-01 10:00:00', TRUE),
(@foss_id, @vikram_id, 'coordinator', 'Technical Lead', '2024-07-01 10:00:00', TRUE),
(@foss_id, @rahul_id, 'member', 'Member', '2024-08-10 15:00:00', TRUE),
(@foss_id, @karan_id, 'member', 'Core Member', '2024-08-01 12:00:00', TRUE),

-- Debuggers Members
(@debuggers_id, @admin_debuggers_id, 'president', 'President', '2024-07-01 10:00:00', TRUE),
(@debuggers_id, @neha_id, 'member', 'Member', '2024-08-01 10:00:00', TRUE),
(@debuggers_id, @rahul_id, 'member', 'Member', '2024-08-15 14:00:00', TRUE),

-- DESOC Members
(@desoc_id, @ishita_id, 'coordinator', 'Design Lead', '2024-07-20 11:00:00', TRUE),
(@desoc_id, @priya_id, 'member', 'Member', '2024-08-10 16:00:00', TRUE),
(@desoc_id, @rohan_id, 'member', 'Member', '2024-09-05 13:00:00', TRUE),

-- Phoenix Members
(@phoenix_id, @ananya_id, 'coordinator', 'ML Lead', '2024-08-01 10:00:00', TRUE),
(@phoenix_id, @rahul_id, 'member', 'Member', '2024-08-20 15:00:00', TRUE),
(@phoenix_id, @amit_id, 'member', 'Member', '2024-09-10 11:00:00', TRUE),

-- MIBCS Members
(@mibcs_id, @karan_id, 'member', 'Member', '2024-08-15 14:00:00', TRUE),
(@mibcs_id, @sneha_id, 'coordinator', 'Security Lead', '2024-08-01 10:00:00', TRUE);

-- ============================================
-- 6. BADGES (Matching Frontend Exactly)
-- ============================================

INSERT INTO badges (badge_name, badge_slug, description, icon, category, tier, points_required, criteria_type, criteria_value, is_active) VALUES
-- Participation Badges
('First Steps', 'first-steps', 'Took the first step into the world of campus events and community engagement', '👣', 'participation', 'bronze', 0, 'events_attended', 1, TRUE),
('Event Enthusiast', 'event-enthusiast', 'A regular at campus events, always eager to learn and connect', '🎉', 'participation', 'silver', 100, 'events_attended', 10, TRUE),
('Event Veteran', 'event-veteran', 'Seasoned event-goer with extensive experience', '🎪', 'participation', 'gold', 500, 'events_attended', 25, TRUE),
('Event Master', 'event-master', 'Campus event legend who has attended countless events', '🏆', 'participation', 'platinum', 1000, 'events_attended', 50, TRUE),

-- Social Badges
('Team Player', 'team-player', 'Joined your first club and became part of a community', '🤝', 'participation', 'bronze', 0, 'clubs_joined', 1, TRUE),
('Social Butterfly', 'social-butterfly', 'Active member of multiple clubs', '🦋', 'participation', 'silver', 200, 'clubs_joined', 5, TRUE),
('Club Hopper', 'club-hopper', 'Exploring every corner of campus life', '🎯', 'participation', 'gold', 500, 'clubs_joined', 10, TRUE),
('Community Champion', 'community-champion', 'Ultimate community builder', '🌐', 'participation', 'platinum', 1000, 'clubs_joined', 15, TRUE),

-- Achievement Badges
('Rising Star', 'rising-star', 'Rapidly growing in campus engagement', '⭐', 'achievement', 'silver', 500, 'total_points', 500, TRUE),
('Campus Influencer', 'campus-influencer', 'Well-known figure on campus', '💫', 'achievement', 'gold', 1000, 'total_points', 1000, TRUE),
('Campus Legend', 'campus-legend', 'Legendary status achieved', '👑', 'achievement', 'platinum', 2000, 'total_points', 2000, TRUE),

-- Certificate Badges
('Certified Pro', 'certified-pro', 'Earned multiple certificates', '📜', 'achievement', 'silver', 300, 'certificates_earned', 5, TRUE),
('Certificate Collector', 'certificate-collector', 'Impressive collection of certificates', '🎓', 'achievement', 'gold', 800, 'certificates_earned', 20, TRUE),
('Master Achiever', 'master-achiever', 'Ultimate achiever with extraordinary collection', '🏅', 'achievement', 'platinum', 1500, 'certificates_earned', 50, TRUE),

-- XP Badges
('XP Hunter', 'xp-hunter', 'Actively pursuing experience points', '💎', 'achievement', 'silver', 1000, 'total_points', 1000, TRUE),
('XP Master', 'xp-master', 'Mastered the art of earning experience', '💠', 'achievement', 'gold', 5000, 'total_points', 5000, TRUE),
('XP Legend', 'xp-legend', 'Legendary XP accumulation', '🔷', 'achievement', 'platinum', 10000, 'total_points', 10000, TRUE),

-- Special Badges
('Early Adopter', 'early-adopter', 'One of the first pioneers to join ClubConn', '🌟', 'special', 'platinum', 0, 'custom', 1, TRUE);

-- ============================================
-- 7. EVENTS DATA (Comprehensive & Realistic)
-- ============================================

INSERT INTO events (club_id, community_id, event_name, slug, description, event_type, start_date, end_date, venue, max_participants, entry_fee, event_mode, status, points_reward, created_by) VALUES
-- CSI Events
(@csi_id, @tech_community, 'CSI Tech Summit 2025', 'csi-tech-summit-2025', 
 'Annual flagship tech summit featuring keynote speakers, workshops, and networking.',
 'workshop', '2025-02-15 09:00:00', '2025-02-16 18:00:00', 'KKWIEER Auditorium', 500, 0.00, 'offline', 'published', 100, @admin_csi_id),

(@csi_id, @tech_community, 'Code Debug Marathon', 'code-debug-marathon',
 '24-hour coding marathon testing debugging skills and problem-solving.',
 'hackathon', '2025-01-20 10:00:00', '2025-01-21 10:00:00', 'CSI Lab, Block A', 120, 100.00, 'offline', 'published', 150, @admin_csi_id),

(@csi_id, @tech_community, 'Web Development Bootcamp', 'web-dev-bootcamp',
 'Intensive 3-day bootcamp covering full-stack web development.',
 'workshop', '2024-12-10 10:00:00', '2024-12-12 17:00:00', 'Computer Lab 3', 60, 200.00, 'offline', 'completed', 75, @admin_csi_id),

-- FOSS Events
(@foss_id, @tech_community, 'Open Source Contribution Drive', 'foss-contribution-drive',
 'Month-long open source contribution program with mentorship.',
 'workshop', '2025-01-05 18:00:00', '2025-01-31 20:00:00', 'Online (Discord)', 200, 0.00, 'online', 'published', 50, @admin_foss_id),

(@foss_id, @tech_community, 'FOSS Meetup December', 'foss-meetup-dec',
 'Monthly FOSS meetup featuring talks and networking.',
 'seminar', '2024-12-15 15:00:00', '2024-12-15 18:00:00', 'Seminar Hall 2', 100, 0.00, 'offline', 'published', 25, @admin_foss_id),

(@foss_id, @tech_community, 'Hacktoberfest Kickoff', 'hacktoberfest-2024',
 'Official Hacktoberfest kickoff event for open source contributions.',
 'workshop', '2024-10-01 16:00:00', '2024-10-01 19:00:00', 'FOSS Lab', 80, 0.00, 'offline', 'completed', 50, @admin_foss_id),

-- Debuggers Events
(@debuggers_id, @tech_community, 'Competitive Programming Workshop', 'cp-workshop-nov',
 'Learn algorithms and data structures for competitive programming.',
 'workshop', '2024-11-20 14:00:00', '2024-11-22 17:00:00', 'Lab 5', 50, 50.00, 'offline', 'completed', 60, @admin_debuggers_id),

(@debuggers_id, @tech_community, 'Mock Coding Contest', 'mock-contest-jan',
 'Practice coding contest simulating real competition environment.',
 'competition', '2025-01-25 14:00:00', '2025-01-25 16:00:00', 'Online (Codeforces)', 150, 0.00, 'online', 'published', 40, @admin_debuggers_id),

-- DESOC Events
(@desoc_id, @creative_community, 'UI/UX Design Workshop', 'uiux-workshop-dec',
 'Comprehensive UI/UX design workshop covering Figma and prototyping.',
 'workshop', '2024-12-05 10:00:00', '2024-12-07 16:00:00', 'Design Studio', 40, 150.00, 'offline', 'completed', 70, @ishita_id),

(@desoc_id, @creative_community, 'Design Thinking Bootcamp', 'design-thinking-bootcamp',
 'Learn design thinking methodology and problem-solving through design.',
 'workshop', '2025-01-17 10:00:00', '2025-01-19 17:00:00', 'Innovation Lab', 50, 200.00, 'offline', 'published', 80, @ishita_id),

-- Phoenix Events
(@phoenix_id, @tech_community, 'Machine Learning Workshop', 'ml-workshop-nov',
 'Hands-on ML workshop covering neural networks and deep learning.',
 'workshop', '2024-11-25 10:00:00', '2024-11-27 17:00:00', 'AI Lab', 60, 250.00, 'offline', 'completed', 90, @ananya_id),

(@phoenix_id, @tech_community, 'Data Science Hackathon', 'ds-hackathon-jan',
 '48-hour data science hackathon with real-world datasets.',
 'hackathon', '2025-01-10 09:00:00', '2025-01-12 09:00:00', 'Phoenix Lab', 80, 150.00, 'offline', 'published', 120, @ananya_id),

-- MIBCS Events
(@mibcs_id, @tech_community, 'Blockchain & Security Hackathon', 'blockchain-hackathon',
 'Build decentralized applications and security solutions.',
 'hackathon', '2025-01-12 10:00:00', '2025-01-14 18:00:00', 'Tech Hub', 100, 200.00, 'offline', 'published', 130, @karan_id),

(@mibcs_id, @tech_community, 'IoT Workshop: Smart Home', 'iot-workshop-dec',
 'Build smart home automation using Arduino and Raspberry Pi.',
 'workshop', '2024-12-18 10:00:00', '2024-12-20 16:00:00', 'Electronics Lab', 40, 300.00, 'offline', 'published', 85, @karan_id);

-- Get event IDs
SET @event1_id = (SELECT event_id FROM events WHERE slug = 'csi-tech-summit-2025');
SET @event2_id = (SELECT event_id FROM events WHERE slug = 'code-debug-marathon');
SET @event3_id = (SELECT event_id FROM events WHERE slug = 'foss-contribution-drive');
SET @event4_id = (SELECT event_id FROM events WHERE slug = 'ml-workshop-nov');
SET @event5_id = (SELECT event_id FROM events WHERE slug = 'uiux-workshop-dec');
SET @event6_id = (SELECT event_id FROM events WHERE slug = 'cp-workshop-nov');

-- ============================================
-- 8. EVENT RSVPs (Realistic Registrations)
-- ============================================

INSERT INTO event_rsvps (event_id, user_id, status, registration_date, attendance_marked_at) VALUES
-- CSI Tech Summit RSVPs
(@event1_id, @rahul_id, 'registered', '2025-01-10 10:30:00', NULL),
(@event1_id, @priya_id, 'registered', '2025-01-11 14:20:00', NULL),
(@event1_id, @sneha_id, 'registered', '2025-01-12 09:15:00', NULL),
(@event1_id, @ananya_id, 'registered', '2025-01-13 16:45:00', NULL),
(@event1_id, @neha_id, 'registered', '2025-01-14 11:00:00', NULL),

-- Code Debug Marathon RSVPs
(@event2_id, @rahul_id, 'registered', '2025-01-05 12:00:00', NULL),
(@event2_id, @neha_id, 'registered', '2025-01-06 15:30:00', NULL),
(@event2_id, @priya_id, 'registered', '2025-01-07 10:20:00', NULL),

-- FOSS Contribution Drive RSVPs
(@event3_id, @vikram_id, 'registered', '2024-12-28 18:00:00', NULL),
(@event3_id, @rahul_id, 'registered', '2024-12-29 20:15:00', NULL),
(@event3_id, @karan_id, 'registered', '2024-12-30 14:30:00', NULL),
(@event3_id, @amit_id, 'registered', '2024-12-31 11:45:00', NULL),

-- ML Workshop RSVPs (Completed)
(@event4_id, @ananya_id, 'attended', '2024-11-15 10:00:00', '2024-11-25 09:45:00'),
(@event4_id, @rahul_id, 'attended', '2024-11-16 14:30:00', '2024-11-25 09:50:00'),
(@event4_id, @amit_id, 'attended', '2024-11-17 16:20:00', '2024-11-25 10:05:00'),

-- UI/UX Workshop RSVPs (Completed)
(@event5_id, @ishita_id, 'attended', '2024-11-25 12:00:00', '2024-12-05 09:55:00'),
(@event5_id, @priya_id, 'attended', '2024-11-26 15:30:00', '2024-12-05 10:00:00'),
(@event5_id, @rohan_id, 'attended', '2024-11-27 18:45:00', '2024-12-05 10:10:00'),

-- CP Workshop RSVPs (Completed)
(@event6_id, @neha_id, 'attended', '2024-11-10 12:00:00', '2024-11-20 13:55:00'),
(@event6_id, @rahul_id, 'attended', '2024-11-11 15:00:00', '2024-11-20 14:00:00');

-- ============================================
-- 9. CERTIFICATES (Earned Certificates)
-- ============================================

INSERT INTO certificates (user_id, event_id, club_id, certificate_type, title, description, issued_date, verification_code, certificate_number, is_verified, issued_by) VALUES
(@ananya_id, @event4_id, @phoenix_id, 'participation', 'Machine Learning Workshop Certificate', 'Successfully completed 3-day ML workshop', '2024-11-27', 'CERT-ML-2024-001', 'CC-2024-001', TRUE, @ananya_id),
(@rahul_id, @event4_id, @phoenix_id, 'participation', 'Machine Learning Workshop Certificate', 'Successfully completed 3-day ML workshop', '2024-11-27', 'CERT-ML-2024-002', 'CC-2024-002', TRUE, @ananya_id),
(@amit_id, @event4_id, @phoenix_id, 'participation', 'Machine Learning Workshop Certificate', 'Successfully completed 3-day ML workshop', '2024-11-27', 'CERT-ML-2024-003', 'CC-2024-003', TRUE, @ananya_id),
(@ishita_id, @event5_id, @desoc_id, 'participation', 'UI/UX Design Workshop Certificate', 'Successfully completed UI/UX design workshop', '2024-12-07', 'CERT-UIUX-2024-001', 'CC-2024-004', TRUE, @ishita_id),
(@priya_id, @event5_id, @desoc_id, 'participation', 'UI/UX Design Workshop Certificate', 'Successfully completed UI/UX design workshop', '2024-12-07', 'CERT-UIUX-2024-002', 'CC-2024-005', TRUE, @ishita_id),
(@neha_id, @event6_id, @debuggers_id, 'participation', 'Competitive Programming Workshop Certificate', 'Successfully completed CP workshop', '2024-11-22', 'CERT-CP-2024-001', 'CC-2024-006', TRUE, @admin_debuggers_id),
(@rahul_id, @event6_id, @debuggers_id, 'participation', 'Competitive Programming Workshop Certificate', 'Successfully completed CP workshop', '2024-11-22', 'CERT-CP-2024-002', 'CC-2024-007', TRUE, @admin_debuggers_id),
(@neha_id, NULL, @csi_id, 'achievement', 'Outstanding Contribution to CSI', 'Recognized for exceptional leadership and contribution', '2024-12-01', 'CERT-CSI-ACH-001', 'CC-2024-008', TRUE, @admin_csi_id);

-- ============================================
-- 10. USER BADGES (Earned Badges)
-- ============================================

SET @first_steps_badge = (SELECT badge_id FROM badges WHERE badge_slug = 'first-steps');
SET @event_enthusiast_badge = (SELECT badge_id FROM badges WHERE badge_slug = 'event-enthusiast');
SET @team_player_badge = (SELECT badge_id FROM badges WHERE badge_slug = 'team-player');
SET @social_butterfly_badge = (SELECT badge_id FROM badges WHERE badge_slug = 'social-butterfly');
SET @rising_star_badge = (SELECT badge_id FROM badges WHERE badge_slug = 'rising-star');
SET @xp_hunter_badge = (SELECT badge_id FROM badges WHERE badge_slug = 'xp-hunter');
SET @campus_influencer_badge = (SELECT badge_id FROM badges WHERE badge_slug = 'campus-influencer');

INSERT INTO user_badges (user_id, badge_id, earned_at, progress, is_unlocked) VALUES
-- Rahul's badges
(@rahul_id, @first_steps_badge, '2024-08-05 10:00:00', 100, TRUE),
(@rahul_id, @event_enthusiast_badge, '2024-11-20 15:00:00', 100, TRUE),
(@rahul_id, @team_player_badge, '2024-08-01 14:20:00', 100, TRUE),
(@rahul_id, @social_butterfly_badge, '2024-10-15 12:00:00', 100, TRUE),
(@rahul_id, @rising_star_badge, '2024-12-01 10:00:00', 100, TRUE),
(@rahul_id, @xp_hunter_badge, '2024-11-25 16:00:00', 100, TRUE),

-- Neha's badges (Top performer)
(@neha_id, @first_steps_badge, '2024-08-02 09:00:00', 100, TRUE),
(@neha_id, @event_enthusiast_badge, '2024-10-10 14:00:00', 100, TRUE),
(@neha_id, @team_player_badge, '2024-08-01 10:00:00', 100, TRUE),
(@neha_id, @social_butterfly_badge, '2024-09-20 11:00:00', 100, TRUE),
(@neha_id, @rising_star_badge, '2024-11-01 15:00:00', 100, TRUE),
(@neha_id, @xp_hunter_badge, '2024-10-15 13:00:00', 100, TRUE),
(@neha_id, @campus_influencer_badge, '2024-12-10 10:00:00', 100, TRUE),

-- Vikram's badges
(@vikram_id, @first_steps_badge, '2024-08-12 11:00:00', 100, TRUE),
(@vikram_id, @team_player_badge, '2024-07-01 10:00:00', 100, TRUE),
(@vikram_id, @rising_star_badge, '2024-12-05 14:00:00', 100, TRUE);

-- ============================================
-- 11. ACTIVITY FEED (Recent Activities)
-- ============================================

INSERT INTO activity_feed (user_id, activity_type, reference_type, reference_id, activity_text, is_public, created_at) VALUES
(@rahul_id, 'event_rsvp', 'event', @event1_id, 'Registered for CSI Tech Summit 2025', TRUE, '2025-01-10 10:30:00'),
(@rahul_id, 'event_attended', 'event', @event4_id, 'Attended Machine Learning Workshop', TRUE, '2024-11-25 09:50:00'),
(@rahul_id, 'club_joined', 'club', @csi_id, 'Joined Computer Society of India', TRUE, '2024-08-01 14:20:00'),
(@rahul_id, 'badge_earned', 'badge', @event_enthusiast_badge, 'Earned Event Enthusiast badge', TRUE, '2024-11-20 15:00:00'),

(@neha_id, 'event_attended', 'event', @event6_id, 'Attended Competitive Programming Workshop', TRUE, '2024-11-20 13:55:00'),
(@neha_id, 'certificate_received', 'certificate', 6, 'Received CP Workshop certificate', TRUE, '2024-11-22 17:00:00'),
(@neha_id, 'badge_earned', 'badge', @campus_influencer_badge, 'Earned Campus Influencer badge', TRUE, '2024-12-10 10:00:00'),
(@neha_id, 'club_joined', 'club', @debuggers_id, 'Joined Debuggers Club', TRUE, '2024-08-01 10:00:00'),

(@vikram_id, 'event_rsvp', 'event', @event3_id, 'Registered for FOSS Contribution Drive', TRUE, '2024-12-28 18:00:00'),
(@vikram_id, 'badge_earned', 'badge', @rising_star_badge, 'Earned Rising Star badge', TRUE, '2024-12-05 14:00:00'),
(@vikram_id, 'club_joined', 'club', @foss_id, 'Joined FOSS KKWIEER', TRUE, '2024-07-01 10:00:00'),

(@ananya_id, 'event_attended', 'event', @event4_id, 'Attended Machine Learning Workshop', TRUE, '2024-11-25 09:45:00'),
(@ananya_id, 'certificate_received', 'certificate', 1, 'Received ML Workshop certificate', TRUE, '2024-11-27 17:00:00'),
(@ananya_id, 'club_joined', 'club', @phoenix_id, 'Joined Phoenix Club (AIDS)', TRUE, '2024-08-01 10:00:00');

-- ============================================
-- 12. EVENT VOLUNTEERS (Leadership Roles)
-- ============================================

INSERT INTO event_volunteers (event_id, user_id, role, responsibilities, status, applied_at, approved_at, hours_contributed, points_earned) VALUES
(@event1_id, @sneha_id, 'Event Coordinator', 'Overall event coordination and speaker management', 'approved', '2024-12-01 10:00:00', '2024-12-05 14:00:00', 0, 50),
(@event1_id, @neha_id, 'Technical Lead', 'Technical setup and AV management', 'approved', '2024-12-02 11:00:00', '2024-12-05 14:00:00', 0, 50),
(@event2_id, @rahul_id, 'Mentor', 'Mentoring participants and helping with debugging', 'approved', '2024-12-20 15:00:00', '2024-12-22 10:00:00', 0, 40),
(@event3_id, @vikram_id, 'Mentor', 'Guiding participants in open source contribution', 'approved', '2024-12-15 12:00:00', '2024-12-18 16:00:00', 0, 40),
(@event4_id, @ananya_id, 'Workshop Instructor', 'Teaching ML concepts and hands-on sessions', 'completed', '2024-11-01 10:00:00', '2024-11-05 14:00:00', 24, 100),
(@event5_id, @ishita_id, 'Workshop Instructor', 'Teaching UI/UX design and Figma', 'completed', '2024-11-10 11:00:00', '2024-11-15 15:00:00', 20, 90),
(@event6_id, @neha_id, 'Teaching Assistant', 'Helping with problem-solving and doubts', 'completed', '2024-11-05 12:00:00', '2024-11-08 10:00:00', 15, 60);

-- ============================================
-- 13. EVENT SPONSORS (Funding & Support)
-- ============================================

INSERT INTO event_sponsors (event_id, sponsor_name, sponsor_type, logo_url, website_url, contribution_amount, description, display_order) VALUES
(@event1_id, 'Google Developer Groups Nashik', 'partner', NULL, 'https://gdg.community.dev/nashik', 0.00, 'Community partner providing venue support', 1),
(@event1_id, 'GitHub Education', 'title', NULL, 'https://education.github.com', 50000.00, 'Title sponsor providing monetary support', 2),
(@event2_id, 'Coding Ninjas', 'gold', NULL, 'https://codingninjas.com', 25000.00, 'Gold sponsor supporting the hackathon', 1),
(@event3_id, 'DigitalOcean', 'silver', NULL, 'https://digitalocean.com', 15000.00, 'Providing cloud credits for participants', 1),
(@event4_id, 'TensorFlow Community', 'partner', NULL, 'https://tensorflow.org', 0.00, 'Technical partner providing resources', 1),
(@event5_id, 'Figma', 'gold', NULL, 'https://figma.com', 20000.00, 'Providing Figma Pro licenses', 1),
(@event6_id, 'Codeforces', 'partner', NULL, 'https://codeforces.com', 0.00, 'Platform partner for contest hosting', 1);

-- ============================================
-- 14. EVENT PROPOSALS (Student Initiatives)
-- ============================================

INSERT INTO event_proposals (event_id, user_id, proposal_title, proposal_description, proposal_file_url, status, submitted_at, reviewed_by, review_comments) VALUES
(@event1_id, @rahul_id, 'AI/ML Track Proposal', 'Proposing dedicated AI/ML track with hands-on workshops', NULL, 'approved', '2024-12-15 14:00:00', @admin_csi_id, 'Great idea! Approved for implementation.'),
(@event3_id, @vikram_id, 'Linux Kernel Contribution Workshop', 'Workshop on contributing to Linux kernel', NULL, 'under_review', '2024-12-10 16:00:00', NULL, NULL),
(@event5_id, @ishita_id, 'Design System Workshop', 'Building design systems from scratch', NULL, 'approved', '2024-11-20 12:00:00', @ishita_id, 'Excellent proposal, will be included.'),
(@event2_id, @neha_id, 'Competitive Debugging Challenge', 'Special debugging challenge segment', NULL, 'approved', '2024-12-05 15:00:00', @admin_csi_id, 'Approved as bonus round.'),
(@event4_id, @ananya_id, 'Deep Learning Advanced Track', 'Advanced DL topics for experienced participants', NULL, 'approved', '2024-11-01 10:00:00', @ananya_id, 'Will be included as advanced track.');

-- ============================================
-- 15. EVENT FEEDBACK (Post-Event Reviews)
-- ============================================

INSERT INTO event_feedback (event_id, user_id, rating, feedback_text, would_recommend, submitted_at) VALUES
(@event4_id, @ananya_id, 5, 'Excellent workshop! Hands-on approach made learning ML concepts easy.', TRUE, '2024-11-28 10:00:00'),
(@event4_id, @rahul_id, 4, 'Great content and well-organized. Would have loved more time for deep learning.', TRUE, '2024-11-28 14:00:00'),
(@event4_id, @amit_id, 5, 'Best ML workshop I have attended! Covered everything from basics to advanced.', TRUE, '2024-11-29 11:00:00'),
(@event5_id, @ishita_id, 5, 'Amazing design workshop! Learned Figma from scratch and built complete prototype.', TRUE, '2024-12-08 15:00:00'),
(@event5_id, @priya_id, 4, 'Very informative and practical. Design thinking exercises were eye-opening.', TRUE, '2024-12-08 16:00:00'),
(@event6_id, @neha_id, 5, 'Perfect for competitive programming beginners. Instructor was excellent.', TRUE, '2024-11-23 12:00:00'),
(@event6_id, @rahul_id, 4, 'Good workshop with practical problems. Would love more advanced topics next time.', TRUE, '2024-11-23 14:00:00'),
(@event5_id, @rohan_id, 3, 'Good workshop but pace was a bit fast for beginners. More examples would help.', TRUE, '2024-12-09 10:00:00');

-- ============================================
-- 16. POINTS HISTORY (XP Tracking)
-- ============================================

INSERT INTO points_history (user_id, points_earned, points_type, reference_type, reference_id, description, created_at) VALUES
(@rahul_id, 50, 'event_participation', 'event', @event4_id, 'Attended Machine Learning Workshop', '2024-11-25 09:50:00'),
(@rahul_id, 25, 'badge', 'badge', @team_player_badge, 'Earned Team Player badge', '2024-08-01 14:20:00'),
(@rahul_id, 50, 'badge', 'badge', @event_enthusiast_badge, 'Earned Event Enthusiast badge', '2024-11-20 15:00:00'),
(@neha_id, 50, 'event_participation', 'event', @event6_id, 'Attended CP Workshop', '2024-11-20 13:55:00'),
(@neha_id, 75, 'certificate', 'certificate', 6, 'Received CP Workshop certificate', '2024-11-22 17:00:00'),
(@neha_id, 100, 'badge', 'badge', @campus_influencer_badge, 'Earned Campus Influencer badge', '2024-12-10 10:00:00'),
(@vikram_id, 25, 'badge', 'badge', @team_player_badge, 'Earned Team Player badge', '2024-07-01 10:00:00'),
(@vikram_id, 100, 'badge', 'badge', @rising_star_badge, 'Earned Rising Star badge', '2024-12-05 14:00:00'),
(@ananya_id, 50, 'event_participation', 'event', @event4_id, 'Attended ML Workshop', '2024-11-25 09:45:00'),
(@ananya_id, 75, 'certificate', 'certificate', 1, 'Received ML Workshop certificate', '2024-11-27 17:00:00'),
(@ananya_id, 100, 'event_organization', 'event', @event4_id, 'Organized ML Workshop as instructor', '2024-11-27 18:00:00'),
(@priya_id, 50, 'event_participation', 'event', @event5_id, 'Attended UI/UX Workshop', '2024-12-05 10:00:00');

-- ============================================
-- 17. SPONSORSHIP PACKAGES
-- ============================================

INSERT INTO sponsorship_packages (package_name, package_type, price, description, benefits, is_active) VALUES
('Title Sponsor', 'title', 100000.00, 'Exclusive title sponsorship with maximum visibility', 
 '{"logo_placement": "primary", "speaking_slot": true, "booth_space": "premium", "social_media": "featured"}', TRUE),
('Platinum Sponsor', 'platinum', 75000.00, 'Premium sponsorship with high visibility',
 '{"logo_placement": "prominent", "speaking_slot": true, "booth_space": "large", "social_media": "regular"}', TRUE),
('Gold Sponsor', 'gold', 50000.00, 'Gold tier sponsorship with good visibility',
 '{"logo_placement": "standard", "speaking_slot": false, "booth_space": "medium", "social_media": "regular"}', TRUE),
('Silver Sponsor', 'silver', 25000.00, 'Silver tier sponsorship',
 '{"logo_placement": "standard", "speaking_slot": false, "booth_space": "small", "social_media": "occasional"}', TRUE),
('Bronze Sponsor', 'bronze', 10000.00, 'Entry level sponsorship',
 '{"logo_placement": "basic", "speaking_slot": false, "booth_space": "none", "social_media": "occasional"}', TRUE);

-- ============================================
-- VERIFICATION QUERIES
-- ============================================

SELECT 'Colleges' as Entity, COUNT(*) as Count FROM colleges
UNION ALL SELECT 'Communities', COUNT(*) FROM communities
UNION ALL SELECT 'Users', COUNT(*) FROM users
UNION ALL SELECT 'Clubs', COUNT(*) FROM clubs
UNION ALL SELECT 'Club Members', COUNT(*) FROM club_members
UNION ALL SELECT 'Events', COUNT(*) FROM events
UNION ALL SELECT 'Event RSVPs', COUNT(*) FROM event_rsvps
UNION ALL SELECT 'Badges', COUNT(*) FROM badges
UNION ALL SELECT 'User Badges', COUNT(*) FROM user_badges
UNION ALL SELECT 'Certificates', COUNT(*) FROM certificates
UNION ALL SELECT 'Activity Feed', COUNT(*) FROM activity_feed
UNION ALL SELECT 'Event Volunteers', COUNT(*) FROM event_volunteers
UNION ALL SELECT 'Event Sponsors', COUNT(*) FROM event_sponsors
UNION ALL SELECT 'Event Proposals', COUNT(*) FROM event_proposals
UNION ALL SELECT 'Event Feedback', COUNT(*) FROM event_feedback
UNION ALL SELECT 'Points History', COUNT(*) FROM points_history
UNION ALL SELECT 'Sponsorship Packages', COUNT(*) FROM sponsorship_packages;

SELECT '========== SEEDING COMPLETE ==========' as '';
SELECT 'Run 08_verification.sql to verify data integrity!' as 'Next Step';
