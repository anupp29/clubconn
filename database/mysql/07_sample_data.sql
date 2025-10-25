-- ============================================
-- CLUBCONN - COMPREHENSIVE SEED DATA
-- Perfect 3NF/BCNF Normalized Data
-- Matching Frontend Context & Requirements
-- ============================================

USE clubconn;

-- Disable foreign key checks for clean insertion
SET FOREIGN_KEY_CHECKS = 0;

-- Clear existing data (for re-seeding)
TRUNCATE TABLE activity_log;
TRUNCATE TABLE user_badges;
TRUNCATE TABLE user_achievements;
TRUNCATE TABLE certificates;
TRUNCATE TABLE event_feedback;
TRUNCATE TABLE event_sponsors;
TRUNCATE TABLE event_volunteers;
TRUNCATE TABLE event_proposals;
TRUNCATE TABLE event_rsvps;
TRUNCATE TABLE events;
TRUNCATE TABLE club_members;
TRUNCATE TABLE club_admins;
TRUNCATE TABLE clubs;
TRUNCATE TABLE communities;
TRUNCATE TABLE badges;
TRUNCATE TABLE users;
TRUNCATE TABLE colleges;

-- Re-enable foreign key checks
SET FOREIGN_KEY_CHECKS = 1;

-- ============================================
-- 1. COLLEGES DATA
-- ============================================

INSERT INTO colleges (college_name, college_code, location, city, state, country, pincode, website_url, established_year, is_active) VALUES
('K. K. Wagh Institute of Engineering Education and Research', 'KKWIEER', 'Panchavati', 'Nashik', 'Maharashtra', 'India', '422003', 'https://kkwagh.edu.in', 1984, TRUE),
('Pune Institute of Computer Technology', 'PICT', 'Dhankawadi', 'Pune', 'Maharashtra', 'India', '411043', 'https://pict.edu', 1983, TRUE),
('College of Engineering Pune', 'COEP', 'Shivajinagar', 'Pune', 'Maharashtra', 'India', '411005', 'https://www.coep.org.in', 1854, TRUE);

SET @kkwieer_id = (SELECT college_id FROM colleges WHERE college_code = 'KKWIEER');
SET @pict_id = (SELECT college_id FROM colleges WHERE college_code = 'PICT');
SET @coep_id = (SELECT college_id FROM colleges WHERE college_code = 'COEP');

-- ============================================
-- 2. COMMUNITIES DATA (Matching Frontend)
-- ============================================

INSERT INTO communities (community_name, slug, description, icon, color_primary, color_light, color_glow, display_order, is_active) VALUES
-- Technology Communities
('Technology', 'tech', 'Explore the world of coding, AI, machine learning, and cutting-edge innovation. Join workshops, hackathons, and tech talks.', 'Code', '#3B82F6', '#DBEAFE', '#3B82F620', 1, TRUE),
('Cultural', 'cultural', 'Celebrate art, music, dance, and cultural diversity. Participate in festivals, performances, and creative showcases.', 'Music', '#F59E0B', '#FEF3C7', '#F59E0B20', 2, TRUE),
('Sports', 'sports', 'Stay active, competitive, and healthy. Join sports tournaments, fitness sessions, and athletic events.', 'Trophy', '#EF4444', '#FEE2E2', '#EF444420', 3, TRUE),
('Business', 'business', 'Learn entrepreneurship, business strategy, and leadership skills. Network with industry professionals.', 'Briefcase', '#8B5CF6', '#EDE9FE', '#8B5CF620', 4, TRUE),
('Social', 'social', 'Make a positive difference in the community through social service, volunteering, and awareness campaigns.', 'Heart', '#10B981', '#D1FAE5', '#10B98120', 5, TRUE),
('Creative', 'creative', 'Express yourself through art, design, photography, and creative projects. Showcase your talent.', 'Palette', '#EC4899', '#FCE7F3', '#EC489920', 6, TRUE);

SET @tech_community = (SELECT community_id FROM communities WHERE slug = 'tech');
SET @cultural_community = (SELECT community_id FROM communities WHERE slug = 'cultural');
SET @sports_community = (SELECT community_id FROM communities WHERE slug = 'sports');
SET @business_community = (SELECT community_id FROM communities WHERE slug = 'business');
SET @social_community = (SELECT community_id FROM communities WHERE slug = 'social');
SET @creative_community = (SELECT community_id FROM communities WHERE slug = 'creative');

-- ============================================
-- 3. USERS DATA (Diverse Student Profiles)
-- ============================================

INSERT INTO users (username, email, password_hash, full_name, college_id, department, year_of_study, user_type, bio, profile_image_url, total_points, current_level, is_active) VALUES
-- Students
('rahul_sharma', 'rahul.sharma@kkwieer.edu.in', '$2a$10$abcdefghijklmnopqrstuvwxyz123456', 'Rahul Sharma', @kkwieer_id, 'Computer Engineering', 3, 'student', 'Passionate about AI/ML and open source. Love attending hackathons!', NULL, 2450, 12, TRUE),
('priya_patel', 'priya.patel@kkwieer.edu.in', '$2a$10$abcdefghijklmnopqrstuvwxyz123456', 'Priya Patel', @kkwieer_id, 'Information Technology', 2, 'student', 'Full-stack developer | UI/UX enthusiast | Coffee lover ☕', NULL, 1890, 9, TRUE),
('amit_desai', 'amit.desai@kkwieer.edu.in', '$2a$10$abcdefghijklmnopqrstuvwxyz123456', 'Amit Desai', @kkwieer_id, 'Electronics Engineering', 4, 'student', 'IoT and embedded systems geek. Building smart solutions.', NULL, 3120, 15, TRUE),
('sneha_kulkarni', 'sneha.kulkarni@kkwieer.edu.in', '$2a$10$abcdefghijklmnopqrstuvwxyz123456', 'Sneha Kulkarni', @kkwieer_id, 'Computer Engineering', 3, 'student', 'Cybersecurity researcher | CTF player | Bug bounty hunter', NULL, 2780, 13, TRUE),
('rohan_joshi', 'rohan.joshi@kkwieer.edu.in', '$2a$10$abcdefghijklmnopqrstuvwxyz123456', 'Rohan Joshi', @kkwieer_id, 'Mechanical Engineering', 2, 'student', 'Robotics and automation enthusiast. Team player.', NULL, 1560, 8, TRUE),
('ananya_singh', 'ananya.singh@kkwieer.edu.in', '$2a$10$abcdefghijklmnopqrstuvwxyz123456', 'Ananya Singh', @kkwieer_id, 'AIDS (Artificial Intelligence & Data Science)', 3, 'student', 'Data scientist in making | Python lover | ML practitioner', NULL, 2210, 11, TRUE),
('vikram_mehta', 'vikram.mehta@kkwieer.edu.in', '$2a$10$abcdefghijklmnopqrstuvwxyz123456', 'Vikram Mehta', @kkwieer_id, 'Computer Engineering', 4, 'student', 'Open source contributor | FOSS advocate | Linux enthusiast', NULL, 3450, 16, TRUE),
('ishita_rao', 'ishita.rao@kkwieer.edu.in', '$2a$10$abcdefghijklmnopqrstuvwxyz123456', 'Ishita Rao', @kkwieer_id, 'Information Technology', 2, 'student', 'Creative designer | UI/UX | Figma expert', NULL, 1720, 9, TRUE),
('karan_verma', 'karan.verma@kkwieer.edu.in', '$2a$10$abcdefghijklmnopqrstuvwxyz123456', 'Karan Verma', @kkwieer_id, 'Electronics Engineering', 3, 'student', 'Blockchain developer | Web3 enthusiast | Crypto curious', NULL, 2340, 11, TRUE),
('neha_gupta', 'neha.gupta@kkwieer.edu.in', '$2a$10$abcdefghijklmnopqrstuvwxyz123456', 'Neha Gupta', @kkwieer_id, 'Computer Engineering', 4, 'student', 'Competitive programmer | Codeforces Expert | Problem solver', NULL, 3890, 18, TRUE),
-- Club Admins
('admin_csi', 'admin.csi@kkwieer.edu.in', '$2a$10$abcdefghijklmnopqrstuvwxyz123456', 'CSI Admin', @kkwieer_id, 'Computer Engineering', 4, 'club_admin', 'Managing CSI KKWIEER chapter', NULL, 500, 5, TRUE),
('admin_foss', 'admin.foss@kkwieer.edu.in', '$2a$10$abcdefghijklmnopqrstuvwxyz123456', 'FOSS Admin', @kkwieer_id, 'Information Technology', 4, 'club_admin', 'FOSS KKWIEER coordinator', NULL, 450, 5, TRUE),
-- College Admin
('college_admin', 'admin@kkwieer.edu.in', '$2a$10$abcdefghijklmnopqrstuvwxyz123456', 'College Administrator', @kkwieer_id, NULL, NULL, 'college_admin', 'Managing ClubConn for KKWIEER', NULL, 0, 1, TRUE);

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

-- ============================================
-- 4. CLUBS DATA (Matching Frontend Exactly)
-- ============================================

INSERT INTO clubs (club_name, slug, community_id, college_id, description, mission, vision, founded_year, member_count, logo_url, cover_image_url, website_url, social_links, is_active) VALUES
-- Technology Clubs
('Computer Society of India', 'csi', @tech_community, @kkwieer_id, 
 'Leading tech club at KKWIEER promoting computer science education, innovation, and professional development. We organize workshops, hackathons, tech talks, and coding competitions.',
 'To advance computing as a science and profession, and to foster innovation and excellence in technology education.',
 'To be the premier student organization for computer science and technology at KKWIEER.',
 2010, 245, NULL, NULL, 'https://csi-kkwieer.org',
 '{"instagram": "csi_kkwieer", "linkedin": "csi-kkwieer", "twitter": "csi_kkwieer"}', TRUE),

('FOSS KKWIEER', 'foss', @tech_community, @kkwieer_id,
 'Free and Open Source Software community promoting open source culture, contribution, and collaboration. We believe in the power of open source and organize contribution drives, workshops, and awareness sessions.',
 'To promote free and open source software culture and empower students to contribute to global open source projects.',
 'To build a thriving FOSS ecosystem at KKWIEER and create world-class open source contributors.',
 2015, 189, NULL, NULL, 'https://foss.kkwieer.edu.in',
 '{"github": "foss-kkwieer", "twitter": "foss_kkwieer", "discord": "foss-kkwieer"}', TRUE),

('Debuggers Club', 'debuggers', @tech_community, @kkwieer_id,
 'Competitive programming and problem-solving club. We train students for coding competitions, conduct mock contests, and help improve algorithmic thinking and coding skills.',
 'To nurture competitive programming talent and create problem solvers who excel in technical interviews and competitions.',
 'To produce top-ranked competitive programmers and place students in leading tech companies.',
 2012, 167, NULL, NULL, NULL,
 '{"codeforces": "debuggers-kkwieer", "codechef": "debuggers_kkw"}', TRUE),

('Design & CS Society', 'desoc', @creative_community, @kkwieer_id,
 'Perfect blend of design and computer science. We focus on UI/UX design, web development, graphic design, and creative technology. Learn Figma, Adobe XD, and modern design principles.',
 'To bridge the gap between design and technology, creating designers who code and developers who design.',
 'To be the leading design-tech community producing world-class UI/UX designers and creative developers.',
 2016, 198, NULL, NULL, 'https://desoc.kkwieer.edu.in',
 '{"instagram": "desoc_kkwieer", "behance": "desoc-kkwieer", "dribbble": "desoc"}', TRUE),

('Phoenix Club (AIDS)', 'phoenix', @tech_community, @kkwieer_id,
 'Artificial Intelligence and Data Science club for AIDS department students. Focus on ML, DL, data analytics, and AI research. Organize workshops on Python, TensorFlow, and data science tools.',
 'To advance AI and data science education and create skilled data scientists and ML engineers.',
 'To be the premier AI/DS community producing cutting-edge research and industry-ready professionals.',
 2019, 156, NULL, NULL, NULL,
 '{"kaggle": "phoenix-kkwieer", "github": "phoenix-aids"}', TRUE),

('ML, IoT, Blockchain & CyberSec (MIBCS)', 'mibcs', @tech_community, @kkwieer_id,
 'Emerging technologies club covering Machine Learning, Internet of Things, Blockchain, and Cybersecurity. Hands-on workshops, hackathons, and research projects in cutting-edge domains.',
 'To explore and master emerging technologies and prepare students for the future of tech.',
 'To be the innovation hub for emerging technologies at KKWIEER.',
 2018, 178, NULL, NULL, NULL,
 '{"linkedin": "mibcs-kkwieer", "twitter": "mibcs_kkw"}', TRUE);

-- Get club IDs
SET @csi_id = (SELECT club_id FROM clubs WHERE slug = 'csi');
SET @foss_id = (SELECT club_id FROM clubs WHERE slug = 'foss');
SET @debuggers_id = (SELECT club_id FROM clubs WHERE slug = 'debuggers');
SET @desoc_id = (SELECT club_id FROM clubs WHERE slug = 'desoc');
SET @phoenix_id = (SELECT club_id FROM clubs WHERE slug = 'phoenix');
SET @mibcs_id = (SELECT club_id FROM clubs WHERE slug = 'mibcs');

-- ============================================
-- 5. CLUB ADMINS (Proper Authorization)
-- ============================================

INSERT INTO club_admins (club_id, user_id, role, permissions, appointed_date) VALUES
(@csi_id, @admin_csi_id, 'president', '["manage_members", "create_events", "manage_content", "approve_proposals"]', '2024-07-01'),
(@foss_id, @admin_foss_id, 'coordinator', '["manage_members", "create_events", "manage_content"]', '2024-07-01'),
(@csi_id, @neha_id, 'vice_president', '["create_events", "manage_content"]', '2024-08-15'),
(@foss_id, @vikram_id, 'technical_lead', '["create_events", "manage_content"]', '2024-08-15');

-- ============================================
-- 6. CLUB MEMBERS (Diverse Membership)
-- ============================================

INSERT INTO club_members (club_id, user_id, role, join_date, is_active) VALUES
-- CSI Members
(@csi_id, @rahul_id, 'member', '2024-08-01', TRUE),
(@csi_id, @priya_id, 'member', '2024-08-05', TRUE),
(@csi_id, @sneha_id, 'core_member', '2024-07-15', TRUE),
(@csi_id, @neha_id, 'vice_president', '2024-07-01', TRUE),
(@csi_id, @ananya_id, 'member', '2024-08-20', TRUE),

-- FOSS Members
(@foss_id, @vikram_id, 'technical_lead', '2024-07-01', TRUE),
(@foss_id, @rahul_id, 'member', '2024-08-10', TRUE),
(@foss_id, @karan_id, 'core_member', '2024-08-01', TRUE),
(@foss_id, @amit_id, 'member', '2024-09-01', TRUE),

-- Debuggers Members
(@debuggers_id, @neha_id, 'member', '2024-08-01', TRUE),
(@debuggers_id, @rahul_id, 'member', '2024-08-15', TRUE),
(@debuggers_id, @priya_id, 'member', '2024-09-01', TRUE),

-- DESOC Members
(@desoc_id, @ishita_id, 'core_member', '2024-07-20', TRUE),
(@desoc_id, @priya_id, 'member', '2024-08-10', TRUE),
(@desoc_id, @rohan_id, 'member', '2024-09-05', TRUE),

-- Phoenix Members
(@phoenix_id, @ananya_id, 'core_member', '2024-08-01', TRUE),
(@phoenix_id, @rahul_id, 'member', '2024-08-20', TRUE),
(@phoenix_id, @amit_id, 'member', '2024-09-10', TRUE),

-- MIBCS Members
(@mibcs_id, @karan_id, 'member', '2024-08-15', TRUE),
(@mibcs_id, @sneha_id, 'core_member', '2024-08-01', TRUE),
(@mibcs_id, @amit_id, 'member', '2024-09-01', TRUE);

-- ============================================
-- 7. BADGES (Matching Frontend Exactly)
-- ============================================

INSERT INTO badges (badge_name, badge_slug, description, icon, category, tier, points_required, criteria_type, criteria_value, xp_reward, rarity) VALUES
-- Participation Badges
('First Steps', 'first-steps', 'Took the first step into the world of campus events and community engagement', '👣', 'participation', 'bronze', 0, 'events_attended', 1, 25, 'common'),
('Event Enthusiast', 'event-enthusiast', 'A regular at campus events, always eager to learn and connect with fellow students', '🎉', 'participation', 'silver', 100, 'events_attended', 10, 50, 'common'),
('Event Veteran', 'event-veteran', 'Seasoned event-goer with extensive experience across workshops, hackathons, and conferences', '🎪', 'participation', 'gold', 500, 'events_attended', 25, 100, 'rare'),
('Event Master', 'event-master', 'Campus event legend who has attended countless workshops, talks, and competitions', '🏆', 'participation', 'platinum', 1000, 'events_attended', 50, 150, 'epic'),

-- Social Badges
('Team Player', 'team-player', 'Joined your first club and became part of a vibrant community of like-minded students', '🤝', 'social', 'bronze', 0, 'clubs_joined', 1, 25, 'common'),
('Social Butterfly', 'social-butterfly', 'Active member of multiple clubs, building connections across diverse communities', '🦋', 'social', 'silver', 200, 'clubs_joined', 5, 75, 'rare'),
('Club Hopper', 'club-hopper', 'Exploring every corner of campus life by joining clubs across all categories', '🎯', 'social', 'gold', 500, 'clubs_joined', 10, 125, 'epic'),
('Community Champion', 'community-champion', 'Ultimate community builder who has joined every major club on campus', '🌐', 'social', 'platinum', 1000, 'clubs_joined', 15, 200, 'legendary'),

-- Achievement Badges
('Rising Star', 'rising-star', 'Rapidly growing in campus engagement and making your mark in the community', '⭐', 'achievement', 'silver', 500, 'level_reached', 10, 100, 'rare'),
('Campus Influencer', 'campus-influencer', 'Well-known figure on campus with significant impact on student engagement', '💫', 'achievement', 'gold', 1000, 'level_reached', 15, 175, 'epic'),
('Campus Legend', 'campus-legend', 'Legendary status achieved through exceptional dedication to campus life and community', '👑', 'achievement', 'platinum', 2000, 'level_reached', 20, 250, 'legendary'),

-- Certificate Badges
('Certified Pro', 'certified-pro', 'Earned multiple certificates showcasing your skills and dedication to learning', '📜', 'achievement', 'silver', 300, 'certificates_earned', 5, 100, 'rare'),
('Certificate Collector', 'certificate-collector', 'Impressive collection of certificates demonstrating expertise across multiple domains', '🎓', 'achievement', 'gold', 800, 'certificates_earned', 20, 200, 'epic'),
('Master Achiever', 'master-achiever', 'Ultimate achiever with an extraordinary collection of certificates and accomplishments', '🏅', 'achievement', 'platinum', 1500, 'certificates_earned', 50, 300, 'legendary'),

-- XP Badges
('XP Hunter', 'xp-hunter', 'Actively pursuing experience points through consistent engagement and participation', '💎', 'achievement', 'silver', 1000, 'total_points', 1000, 100, 'rare'),
('XP Master', 'xp-master', 'Mastered the art of earning experience through diverse campus activities', '💠', 'achievement', 'gold', 5000, 'total_points', 5000, 200, 'epic'),
('XP Legend', 'xp-legend', 'Legendary XP accumulation through unparalleled dedication and engagement', '🔷', 'achievement', 'platinum', 10000, 'total_points', 10000, 500, 'legendary'),

-- Special Badges
('Early Adopter', 'early-adopter', 'One of the first pioneers to join ClubConn and shape the future of campus engagement', '🌟', 'special', 'platinum', 0, 'custom', 1, 100, 'legendary'),
('Volunteer Hero', 'volunteer-hero', 'Dedicated volunteer who has contributed significant time to organizing and supporting events', '❤️', 'leadership', 'gold', 500, 'volunteer_hours', 20, 150, 'epic');

-- ============================================
-- 8. EVENTS DATA (Comprehensive & Realistic)
-- ============================================

INSERT INTO events (club_id, event_name, slug, description, event_type, start_date, end_date, start_time, end_time, venue, max_participants, registration_deadline, registration_fee, event_mode, status, banner_image_url, tags) VALUES
-- CSI Events
(@csi_id, 'CSI Tech Summit 2025', 'csi-tech-summit-2025', 
 'Annual flagship tech summit featuring keynote speakers from industry, technical workshops, hackathon, and networking sessions. Topics include AI, Cloud Computing, Cybersecurity, and Web3.',
 'conference', '2025-02-15', '2025-02-16', '09:00:00', '18:00:00', 'KKWIEER Auditorium', 500, '2025-02-10', 0.00, 'offline', 'upcoming', NULL,
 '["AI", "Cloud", "Cybersecurity", "Web3", "Conference"]'),

(@csi_id, 'Code Debug Marathon', 'code-debug-marathon',
 '24-hour coding marathon testing debugging skills, problem-solving, and endurance. Teams compete to fix bugs, optimize code, and build features under time pressure.',
 'hackathon', '2025-01-20', '2025-01-21', '10:00:00', '10:00:00', 'CSI Lab, Block A', 120, '2025-01-15', 100.00, 'offline', 'upcoming', NULL,
 '["Coding", "Debugging", "Competition", "24-hour"]'),

(@csi_id, 'Web Development Bootcamp', 'web-dev-bootcamp',
 'Intensive 3-day bootcamp covering HTML, CSS, JavaScript, React, Node.js, and MongoDB. Build 3 full-stack projects and deploy them live.',
 'workshop', '2024-12-10', '2024-12-12', '10:00:00', '17:00:00', 'Computer Lab 3', 60, '2024-12-05', 200.00, 'offline', 'completed', NULL,
 '["Web Development", "React", "Node.js", "Full Stack"]'),

-- FOSS Events
(@foss_id, 'Open Source Contribution Drive', 'foss-contribution-drive',
 'Month-long open source contribution program. Learn Git, GitHub, find good first issues, and make your first PR to real-world projects. Mentorship provided.',
 'workshop', '2025-01-05', '2025-01-31', '18:00:00', '20:00:00', 'Online (Discord)', 200, '2025-01-03', 0.00, 'online', 'upcoming', NULL,
 '["Open Source", "Git", "GitHub", "Contribution", "Mentorship"]'),

(@foss_id, 'FOSS Meetup December', 'foss-meetup-dec',
 'Monthly FOSS meetup featuring talks on Linux, open source tools, and community building. Network with fellow FOSS enthusiasts and contributors.',
 'meetup', '2024-12-15', '2024-12-15', '15:00:00', '18:00:00', 'Seminar Hall 2', 100, '2024-12-14', 0.00, 'offline', 'upcoming', NULL,
 '["FOSS", "Linux", "Meetup", "Networking"]'),

(@foss_id, 'Hacktoberfest Kickoff', 'hacktoberfest-2024',
 'Official Hacktoberfest kickoff event. Learn about open source, find projects to contribute to, and start your journey to earn the Hacktoberfest t-shirt.',
 'workshop', '2024-10-01', '2024-10-01', '16:00:00', '19:00:00', 'FOSS Lab', 80, '2024-09-30', 0.00, 'offline', 'completed', NULL,
 '["Hacktoberfest", "Open Source", "GitHub"]'),

-- Debuggers Events
(@debuggers_id, 'Competitive Programming Workshop', 'cp-workshop-nov',
 'Learn algorithms, data structures, and problem-solving techniques for competitive programming. Practice problems from Codeforces, CodeChef, and LeetCode.',
 'workshop', '2024-11-20', '2024-11-22', '14:00:00', '17:00:00', 'Lab 5', 50, '2024-11-18', 50.00, 'offline', 'completed', NULL,
 '["Competitive Programming", "Algorithms", "DSA"]'),

(@debuggers_id, 'Mock Coding Contest', 'mock-contest-jan',
 'Practice coding contest simulating real competition environment. Solve 5 problems in 2 hours. Top performers get prizes and recognition.',
 'competition', '2025-01-25', '2025-01-25', '14:00:00', '16:00:00', 'Online (Codeforces)', 150, '2025-01-24', 0.00, 'online', 'upcoming', NULL,
 '["Contest", "Competitive Programming", "Practice"]'),

-- DESOC Events
(@desoc_id, 'UI/UX Design Workshop', 'uiux-workshop-dec',
 'Comprehensive UI/UX design workshop covering design principles, Figma, prototyping, and user research. Design a complete mobile app from scratch.',
 'workshop', '2024-12-05', '2024-12-07', '10:00:00', '16:00:00', 'Design Studio', 40, '2024-12-01', 150.00, 'offline', 'completed', NULL,
 '["UI/UX", "Design", "Figma", "Prototyping"]'),

(@desoc_id, 'Design Thinking Bootcamp', 'design-thinking-bootcamp',
 'Learn design thinking methodology, ideation techniques, and problem-solving through design. Work on real-world case studies and present solutions.',
 'workshop', '2025-01-17', '2025-01-19', '10:00:00', '17:00:00', 'Innovation Lab', 50, '2025-01-15', 200.00, 'offline', 'upcoming', NULL,
 '["Design Thinking", "Innovation", "Problem Solving"]'),

-- Phoenix Events
(@phoenix_id, 'Machine Learning Workshop', 'ml-workshop-nov',
 'Hands-on ML workshop covering supervised learning, neural networks, and deep learning. Build and train models using Python, TensorFlow, and Keras.',
 'workshop', '2024-11-25', '2024-11-27', '10:00:00', '17:00:00', 'AI Lab', 60, '2024-11-20', 250.00, 'offline', 'completed', NULL,
 '["Machine Learning", "AI", "Python", "TensorFlow"]'),

(@phoenix_id, 'Data Science Hackathon', 'ds-hackathon-jan',
 '48-hour data science hackathon. Analyze datasets, build predictive models, and present insights. Prizes for best models and visualizations.',
 'hackathon', '2025-01-10', '2025-01-12', '09:00:00', '09:00:00', 'Phoenix Lab', 80, '2025-01-05', 150.00, 'offline', 'upcoming', NULL,
 '["Data Science", "Hackathon", "ML", "Analytics"]'),

-- MIBCS Events
(@mibcs_id, 'Blockchain & Security Hackathon', 'blockchain-hackathon',
 'Build decentralized applications, smart contracts, and security solutions. Focus on Web3, Ethereum, Solidity, and cybersecurity best practices.',
 'hackathon', '2025-01-12', '2025-01-14', '10:00:00', '18:00:00', 'Tech Hub', 100, '2025-01-08', 200.00, 'offline', 'upcoming', NULL,
 '["Blockchain", "Web3", "Cybersecurity", "Smart Contracts"]'),

(@mibcs_id, 'IoT Workshop: Smart Home Automation', 'iot-workshop-dec',
 'Build smart home automation system using Arduino, Raspberry Pi, and IoT sensors. Learn MQTT, cloud integration, and mobile app control.',
 'workshop', '2024-12-18', '2024-12-20', '10:00:00', '16:00:00', 'Electronics Lab', 40, '2024-12-15', 300.00, 'offline', 'upcoming', NULL,
 '["IoT", "Arduino", "Raspberry Pi", "Automation"]');

-- Get event IDs for RSVPs
SET @event1_id = (SELECT event_id FROM events WHERE slug = 'csi-tech-summit-2025');
SET @event2_id = (SELECT event_id FROM events WHERE slug = 'code-debug-marathon');
SET @event3_id = (SELECT event_id FROM events WHERE slug = 'foss-contribution-drive');
SET @event4_id = (SELECT event_id FROM events WHERE slug = 'ml-workshop-nov');
SET @event5_id = (SELECT event_id FROM events WHERE slug = 'uiux-workshop-dec');

-- ============================================
-- 9. EVENT RSVPs (Realistic Registrations)
-- ============================================

INSERT INTO event_rsvps (event_id, user_id, status, registration_date, attendance_status, check_in_time) VALUES
-- CSI Tech Summit RSVPs
(@event1_id, @rahul_id, 'confirmed', '2025-01-10 10:30:00', 'registered', NULL),
(@event1_id, @priya_id, 'confirmed', '2025-01-11 14:20:00', 'registered', NULL),
(@event1_id, @sneha_id, 'confirmed', '2025-01-12 09:15:00', 'registered', NULL),
(@event1_id, @ananya_id, 'confirmed', '2025-01-13 16:45:00', 'registered', NULL),
(@event1_id, @neha_id, 'confirmed', '2025-01-14 11:00:00', 'registered', NULL),

-- Code Debug Marathon RSVPs
(@event2_id, @rahul_id, 'confirmed', '2025-01-05 12:00:00', 'registered', NULL),
(@event2_id, @neha_id, 'confirmed', '2025-01-06 15:30:00', 'registered', NULL),
(@event2_id, @priya_id, 'confirmed', '2025-01-07 10:20:00', 'registered', NULL),

-- FOSS Contribution Drive RSVPs
(@event3_id, @vikram_id, 'confirmed', '2024-12-28 18:00:00', 'registered', NULL),
(@event3_id, @rahul_id, 'confirmed', '2024-12-29 20:15:00', 'registered', NULL),
(@event3_id, @karan_id, 'confirmed', '2024-12-30 14:30:00', 'registered', NULL),
(@event3_id, @amit_id, 'confirmed', '2024-12-31 11:45:00', 'registered', NULL),

-- ML Workshop RSVPs (Completed Event)
(@event4_id, @ananya_id, 'confirmed', '2024-11-15 10:00:00', 'attended', '2024-11-25 09:45:00'),
(@event4_id, @rahul_id, 'confirmed', '2024-11-16 14:30:00', 'attended', '2024-11-25 09:50:00'),
(@event4_id, @amit_id, 'confirmed', '2024-11-17 16:20:00', 'attended', '2024-11-25 10:05:00'),

-- UI/UX Workshop RSVPs (Completed Event)
(@event5_id, @ishita_id, 'confirmed', '2024-11-25 12:00:00', 'attended', '2024-12-05 09:55:00'),
(@event5_id, @priya_id, 'confirmed', '2024-11-26 15:30:00', 'attended', '2024-12-05 10:00:00'),
(@event5_id, @rohan_id, 'confirmed', '2024-11-27 18:45:00', 'attended', '2024-12-05 10:10:00');

-- ============================================
-- 10. CERTIFICATES (Earned Certificates)
-- ============================================

INSERT INTO certificates (user_id, event_id, club_id, certificate_type, certificate_title, issued_date, verification_code, certificate_url) VALUES
-- Event Attendance Certificates
(@ananya_id, @event4_id, @phoenix_id, 'event_attendance', 'Certificate of Attendance - Machine Learning Workshop', '2024-11-27', 'CERT-ML-2024-001', NULL),
(@rahul_id, @event4_id, @phoenix_id, 'event_attendance', 'Certificate of Attendance - Machine Learning Workshop', '2024-11-27', 'CERT-ML-2024-002', NULL),
(@amit_id, @event4_id, @phoenix_id, 'event_attendance', 'Certificate of Attendance - Machine Learning Workshop', '2024-11-27', 'CERT-ML-2024-003', NULL),
(@ishita_id, @event5_id, @desoc_id, 'event_attendance', 'Certificate of Attendance - UI/UX Design Workshop', '2024-12-07', 'CERT-UIUX-2024-001', NULL),
(@priya_id, @event5_id, @desoc_id, 'event_attendance', 'Certificate of Attendance - UI/UX Design Workshop', '2024-12-07', 'CERT-UIUX-2024-002', NULL),

-- Club Participation Certificates
(@neha_id, NULL, @csi_id, 'club_participation', 'Certificate of Active Participation - CSI KKWIEER', '2024-12-01', 'CERT-CSI-PART-001', NULL),
(@vikram_id, NULL, @foss_id, 'club_leadership', 'Certificate of Leadership - FOSS KKWIEER', '2024-12-01', 'CERT-FOSS-LEAD-001', NULL),

-- Achievement Certificates
(@neha_id, NULL, NULL, 'achievement', 'Certificate of Achievement - Campus Legend Badge', '2024-11-15', 'CERT-ACH-LEGEND-001', NULL);

-- ============================================
-- 11. USER BADGES (Earned Badges)
-- ============================================

-- Get badge IDs
SET @first_steps_badge = (SELECT badge_id FROM badges WHERE badge_slug = 'first-steps');
SET @event_enthusiast_badge = (SELECT badge_id FROM badges WHERE badge_slug = 'event-enthusiast');
SET @team_player_badge = (SELECT badge_id FROM badges WHERE badge_slug = 'team-player');
SET @social_butterfly_badge = (SELECT badge_id FROM badges WHERE badge_slug = 'social-butterfly');
SET @rising_star_badge = (SELECT badge_id FROM badges WHERE badge_slug = 'rising-star');
SET @xp_hunter_badge = (SELECT badge_id FROM badges WHERE badge_slug = 'xp-hunter');

INSERT INTO user_badges (user_id, badge_id, earned_date, progress_percentage) VALUES
-- Rahul's badges
(@rahul_id, @first_steps_badge, '2024-08-05', 100),
(@rahul_id, @event_enthusiast_badge, '2024-11-20', 100),
(@rahul_id, @team_player_badge, '2024-08-01', 100),
(@rahul_id, @social_butterfly_badge, '2024-10-15', 100),
(@rahul_id, @rising_star_badge, '2024-12-01', 100),
(@rahul_id, @xp_hunter_badge, '2024-11-25', 100),

-- Neha's badges (Top performer)
(@neha_id, @first_steps_badge, '2024-08-02', 100),
(@neha_id, @event_enthusiast_badge, '2024-10-10', 100),
(@neha_id, @team_player_badge, '2024-08-01', 100),
(@neha_id, @social_butterfly_badge, '2024-09-20', 100),
(@neha_id, @rising_star_badge, '2024-11-01', 100),
(@neha_id, @xp_hunter_badge, '2024-10-15', 100),

-- Priya's badges
(@priya_id, @first_steps_badge, '2024-08-10', 100),
(@priya_id, @team_player_badge, '2024-08-05', 100),

-- Vikram's badges
(@vikram_id, @first_steps_badge, '2024-08-12', 100),
(@vikram_id, @event_enthusiast_badge, '2024-11-30', 100),
(@vikram_id, @team_player_badge, '2024-07-01', 100),
(@vikram_id, @social_butterfly_badge, '2024-10-20', 100),
(@vikram_id, @rising_star_badge, '2024-12-05', 100);

-- ============================================
-- 12. ACTIVITY LOG (Recent Activities)
-- ============================================

INSERT INTO activity_log (user_id, activity_type, activity_description, related_entity_type, related_entity_id, xp_earned, created_at) VALUES
(@rahul_id, 'event_registration', 'Registered for CSI Tech Summit 2025', 'event', @event1_id, 10, '2025-01-10 10:30:00'),
(@rahul_id, 'event_registration', 'Registered for Code Debug Marathon', 'event', @event2_id, 10, '2025-01-05 12:00:00'),
(@rahul_id, 'event_attendance', 'Attended Machine Learning Workshop', 'event', @event4_id, 50, '2024-11-25 09:50:00'),
(@rahul_id, 'club_join', 'Joined Computer Society of India', 'club', @csi_id, 25, '2024-08-01 14:20:00'),
(@rahul_id, 'badge_earned', 'Earned Event Enthusiast badge', 'badge', @event_enthusiast_badge, 50, '2024-11-20 18:30:00'),

(@neha_id, 'event_attendance', 'Attended UI/UX Design Workshop', 'event', @event5_id, 50, '2024-12-05 10:00:00'),
(@neha_id, 'certificate_earned', 'Earned certificate for CSI participation', 'certificate', 1, 75, '2024-12-01 16:00:00'),
(@neha_id, 'badge_earned', 'Earned Rising Star badge', 'badge', @rising_star_badge, 100, '2024-11-01 12:00:00'),
(@neha_id, 'club_join', 'Joined Debuggers Club', 'club', @debuggers_id, 25, '2024-08-01 10:15:00'),

(@vikram_id, 'event_registration', 'Registered for FOSS Contribution Drive', 'event', @event3_id, 10, '2024-12-28 18:00:00'),
(@vikram_id, 'badge_earned', 'Earned Social Butterfly badge', 'badge', @social_butterfly_badge, 75, '2024-10-20 14:30:00'),
(@vikram_id, 'club_join', 'Joined FOSS KKWIEER', 'club', @foss_id, 25, '2024-07-01 09:00:00'),

(@ananya_id, 'event_attendance', 'Attended Machine Learning Workshop', 'event', @event4_id, 50, '2024-11-25 09:45:00'),
(@ananya_id, 'certificate_earned', 'Earned ML Workshop certificate', 'certificate', 1, 75, '2024-11-27 17:00:00'),
(@ananya_id, 'club_join', 'Joined Phoenix Club (AIDS)', 'club', @phoenix_id, 25, '2024-08-01 11:30:00'),

(@priya_id, 'event_attendance', 'Attended UI/UX Design Workshop', 'event', @event5_id, 50, '2024-12-05 10:00:00'),
(@priya_id, 'event_registration', 'Registered for CSI Tech Summit 2025', 'event', @event1_id, 10, '2025-01-11 14:20:00'),
(@priya_id, 'club_join', 'Joined Design & CS Society', 'club', @desoc_id, 25, '2024-08-10 15:45:00');

-- ============================================
-- 13. EVENT VOLUNTEERS (Leadership Roles)
-- ============================================

INSERT INTO event_volunteers (event_id, user_id, role, responsibilities, status, hours_contributed, application_date, approval_date) VALUES
(@event1_id, @sneha_id, 'coordinator', 'Overall event coordination and speaker management', 'approved', 0, '2024-12-01', '2024-12-05'),
(@event1_id, @neha_id, 'technical_lead', 'Technical setup, AV management, and troubleshooting', 'approved', 0, '2024-12-02', '2024-12-05'),
(@event2_id, @rahul_id, 'mentor', 'Mentoring participants and helping with debugging', 'approved', 0, '2024-12-20', '2024-12-22'),
(@event3_id, @vikram_id, 'mentor', 'Guiding participants in open source contribution', 'approved', 0, '2024-12-15', '2024-12-18');

-- ============================================
-- 14. EVENT SPONSORS (Funding & Support)
-- ============================================

INSERT INTO event_sponsors (event_id, sponsor_name, sponsor_type, contribution_amount, contribution_type, logo_url, website_url, contact_email, status) VALUES
(@event1_id, 'Google Developer Groups Nashik', 'community_partner', 0.00, 'venue_support', NULL, 'https://gdg.community.dev/nashik', 'gdg.nashik@gmail.com', 'confirmed'),
(@event1_id, 'GitHub Education', 'title_sponsor', 50000.00, 'monetary', NULL, 'https://education.github.com', 'education@github.com', 'confirmed'),
(@event2_id, 'Coding Ninjas', 'sponsor', 25000.00, 'monetary', NULL, 'https://codingninjas.com', 'partnerships@codingninjas.com', 'confirmed'),
(@event3_id, 'DigitalOcean', 'sponsor', 15000.00, 'credits', NULL, 'https://digitalocean.com', 'opensource@digitalocean.com', 'confirmed');

-- ============================================
-- 15. EVENT PROPOSALS (Student Initiatives)
-- ============================================

INSERT INTO event_proposals (club_id, proposed_by, event_title, event_description, proposed_date, estimated_budget, expected_participants, proposal_status, submission_date) VALUES
(@csi_id, @rahul_id, 'AI/ML Bootcamp Series', 'Month-long AI/ML bootcamp with hands-on projects, industry mentors, and certification', '2025-03-01', 75000.00, 100, 'under_review', '2024-12-15'),
(@foss_id, @vikram_id, 'Open Source Summit 2025', 'Two-day open source conference with talks, workshops, and contribution sprints', '2025-04-15', 100000.00, 300, 'approved', '2024-12-10'),
(@desoc_id, @ishita_id, 'Design Sprint Challenge', 'Week-long design sprint solving real-world problems for local startups', '2025-02-20', 30000.00, 50, 'under_review', '2024-12-18');

-- ============================================
-- 16. EVENT FEEDBACK (Post-Event Reviews)
-- ============================================

INSERT INTO event_feedback (event_id, user_id, rating, feedback_text, would_recommend, submitted_date) VALUES
(@event4_id, @ananya_id, 5, 'Excellent workshop! The hands-on approach and real-world projects made learning ML concepts so much easier. Instructors were knowledgeable and patient.', TRUE, '2024-11-28'),
(@event4_id, @rahul_id, 4, 'Great content and well-organized. Would have loved more time for the deep learning section. Overall, highly recommended for ML beginners.', TRUE, '2024-11-28'),
(@event4_id, @amit_id, 5, 'Best ML workshop I have attended! Covered everything from basics to advanced topics. The TensorFlow hands-on session was particularly helpful.', TRUE, '2024-11-29'),
(@event5_id, @ishita_id, 5, 'Amazing design workshop! Learned Figma from scratch and built a complete app prototype. The instructor was fantastic and very helpful.', TRUE, '2024-12-08'),
(@event5_id, @priya_id, 4, 'Very informative and practical. The design thinking exercises were eye-opening. Would love a follow-up workshop on advanced prototyping.', TRUE, '2024-12-08');

-- ============================================
-- VERIFICATION QUERIES
-- ============================================

-- Verify data insertion
SELECT 'Colleges' as Entity, COUNT(*) as Count FROM colleges
UNION ALL
SELECT 'Communities', COUNT(*) FROM communities
UNION ALL
SELECT 'Users', COUNT(*) FROM users
UNION ALL
SELECT 'Clubs', COUNT(*) FROM clubs
UNION ALL
SELECT 'Club Members', COUNT(*) FROM club_members
UNION ALL
SELECT 'Events', COUNT(*) FROM events
UNION ALL
SELECT 'Event RSVPs', COUNT(*) FROM event_rsvps
UNION ALL
SELECT 'Badges', COUNT(*) FROM badges
UNION ALL
SELECT 'User Badges', COUNT(*) FROM user_badges
UNION ALL
SELECT 'Certificates', COUNT(*) FROM certificates
UNION ALL
SELECT 'Activity Log', COUNT(*) FROM activity_log
UNION ALL
SELECT 'Event Volunteers', COUNT(*) FROM event_volunteers
UNION ALL
SELECT 'Event Sponsors', COUNT(*) FROM event_sponsors
UNION ALL
SELECT 'Event Proposals', COUNT(*) FROM event_proposals
UNION ALL
SELECT 'Event Feedback', COUNT(*) FROM event_feedback;

-- ============================================
-- END OF SEED DATA
-- ============================================
