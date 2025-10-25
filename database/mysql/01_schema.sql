-- ============================================
-- ClubConn Database Schema (MySQL)
-- 3NF Normalized Schema
-- ============================================

-- Drop existing database if exists (for clean setup)
DROP DATABASE IF EXISTS clubconn;
CREATE DATABASE clubconn CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
USE clubconn;

-- ============================================
-- CORE TABLES
-- ============================================

-- Users Table (Students, Club Admins, College Admins)
CREATE TABLE users (
    user_id BIGINT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
    username VARCHAR(50) UNIQUE NOT NULL,
    email VARCHAR(255) UNIQUE NOT NULL,
    password_hash VARCHAR(255) NOT NULL,
    full_name VARCHAR(255) NOT NULL,
    avatar_url VARCHAR(500),
    bio TEXT,
    phone VARCHAR(20),
    college_id BIGINT UNSIGNED,
    department VARCHAR(100),
    year_of_study TINYINT UNSIGNED,
    roll_number VARCHAR(50),
    user_type ENUM('student', 'club_admin', 'college_admin', 'super_admin') DEFAULT 'student',
    total_points INT UNSIGNED DEFAULT 0,
    is_active BOOLEAN DEFAULT TRUE,
    email_verified BOOLEAN DEFAULT FALSE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    last_login_at TIMESTAMP NULL,
    INDEX idx_username (username),
    INDEX idx_email (email),
    INDEX idx_college (college_id),
    INDEX idx_user_type (user_type),
    INDEX idx_total_points (total_points DESC),
    INDEX idx_created_at (created_at)
) ENGINE=InnoDB;

-- Colleges Table
CREATE TABLE colleges (
    college_id BIGINT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
    college_name VARCHAR(255) NOT NULL,
    college_code VARCHAR(50) UNIQUE NOT NULL,
    location VARCHAR(255),
    city VARCHAR(100),
    state VARCHAR(100),
    country VARCHAR(100) DEFAULT 'India',
    website_url VARCHAR(500),
    logo_url VARCHAR(500),
    is_active BOOLEAN DEFAULT TRUE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    INDEX idx_college_code (college_code),
    INDEX idx_city (city)
) ENGINE=InnoDB;

-- Communities Table (Tech, Cultural, Sports, etc.)
CREATE TABLE communities (
    community_id BIGINT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
    community_name VARCHAR(255) NOT NULL,
    slug VARCHAR(255) UNIQUE NOT NULL,
    description TEXT,
    icon VARCHAR(100),
    color_primary VARCHAR(7),
    color_light VARCHAR(7),
    color_glow VARCHAR(7),
    display_order INT DEFAULT 0,
    is_active BOOLEAN DEFAULT TRUE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    INDEX idx_slug (slug),
    INDEX idx_display_order (display_order)
) ENGINE=InnoDB;

-- Clubs Table
CREATE TABLE clubs (
    club_id BIGINT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
    club_name VARCHAR(255) NOT NULL,
    slug VARCHAR(255) UNIQUE NOT NULL,
    community_id BIGINT UNSIGNED NOT NULL,
    college_id BIGINT UNSIGNED NOT NULL,
    description TEXT,
    mission TEXT,
    vision TEXT,
    founded_year YEAR,
    logo_url VARCHAR(500),
    cover_image_url VARCHAR(500),
    email VARCHAR(255),
    social_instagram VARCHAR(255),
    social_twitter VARCHAR(255),
    social_linkedin VARCHAR(255),
    social_website VARCHAR(500),
    member_count INT UNSIGNED DEFAULT 0,
    event_count INT UNSIGNED DEFAULT 0,
    is_active BOOLEAN DEFAULT TRUE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (community_id) REFERENCES communities(community_id) ON DELETE RESTRICT,
    FOREIGN KEY (college_id) REFERENCES colleges(college_id) ON DELETE RESTRICT,
    INDEX idx_slug (slug),
    INDEX idx_community (community_id),
    INDEX idx_college (college_id),
    INDEX idx_member_count (member_count DESC)
) ENGINE=InnoDB;

-- Club Members Table (Many-to-Many: Users <-> Clubs)
CREATE TABLE club_members (
    membership_id BIGINT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
    club_id BIGINT UNSIGNED NOT NULL,
    user_id BIGINT UNSIGNED NOT NULL,
    role ENUM('member', 'coordinator', 'president', 'vice_president', 'secretary', 'treasurer') DEFAULT 'member',
    position_title VARCHAR(255),
    joined_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    left_at TIMESTAMP NULL,
    is_active BOOLEAN DEFAULT TRUE,
    FOREIGN KEY (club_id) REFERENCES clubs(club_id) ON DELETE CASCADE,
    FOREIGN KEY (user_id) REFERENCES users(user_id) ON DELETE CASCADE,
    UNIQUE KEY unique_active_membership (club_id, user_id, is_active),
    INDEX idx_club (club_id),
    INDEX idx_user (user_id),
    INDEX idx_role (role)
) ENGINE=InnoDB;

-- ============================================
-- EVENTS TABLES
-- ============================================

-- Events Table
CREATE TABLE events (
    event_id BIGINT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
    event_name VARCHAR(255) NOT NULL,
    slug VARCHAR(255) NOT NULL,
    club_id BIGINT UNSIGNED NOT NULL,
    community_id BIGINT UNSIGNED NOT NULL,
    description TEXT,
    event_type ENUM('workshop', 'seminar', 'competition', 'hackathon', 'cultural', 'sports', 'social', 'other') NOT NULL,
    event_mode ENUM('online', 'offline', 'hybrid') DEFAULT 'offline',
    venue VARCHAR(500),
    venue_details TEXT,
    start_date DATETIME NOT NULL,
    end_date DATETIME NOT NULL,
    registration_start DATETIME,
    registration_end DATETIME,
    max_participants INT UNSIGNED,
    current_participants INT UNSIGNED DEFAULT 0,
    entry_fee DECIMAL(10, 2) DEFAULT 0.00,
    poster_url VARCHAR(500),
    banner_url VARCHAR(500),
    status ENUM('draft', 'published', 'ongoing', 'completed', 'cancelled') DEFAULT 'draft',
    is_featured BOOLEAN DEFAULT FALSE,
    points_reward INT UNSIGNED DEFAULT 0,
    created_by BIGINT UNSIGNED NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (club_id) REFERENCES clubs(club_id) ON DELETE CASCADE,
    FOREIGN KEY (community_id) REFERENCES communities(community_id) ON DELETE RESTRICT,
    FOREIGN KEY (created_by) REFERENCES users(user_id) ON DELETE RESTRICT,
    INDEX idx_slug (club_id, slug),
    INDEX idx_club (club_id),
    INDEX idx_community (community_id),
    INDEX idx_start_date (start_date),
    INDEX idx_status (status),
    INDEX idx_featured (is_featured),
    FULLTEXT idx_search (event_name, description)
) ENGINE=InnoDB;

-- Event RSVPs Table
CREATE TABLE event_rsvps (
    rsvp_id BIGINT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
    event_id BIGINT UNSIGNED NOT NULL,
    user_id BIGINT UNSIGNED NOT NULL,
    status ENUM('registered', 'attended', 'cancelled', 'waitlist') DEFAULT 'registered',
    registration_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    attendance_marked_at TIMESTAMP NULL,
    payment_status ENUM('pending', 'completed', 'refunded') DEFAULT 'pending',
    payment_amount DECIMAL(10, 2) DEFAULT 0.00,
    payment_reference VARCHAR(255),
    notes TEXT,
    FOREIGN KEY (event_id) REFERENCES events(event_id) ON DELETE CASCADE,
    FOREIGN KEY (user_id) REFERENCES users(user_id) ON DELETE CASCADE,
    UNIQUE KEY unique_event_user (event_id, user_id),
    INDEX idx_event (event_id),
    INDEX idx_user (user_id),
    INDEX idx_status (status)
) ENGINE=InnoDB;

-- Event Volunteers Table
CREATE TABLE event_volunteers (
    volunteer_id BIGINT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
    event_id BIGINT UNSIGNED NOT NULL,
    user_id BIGINT UNSIGNED NOT NULL,
    role VARCHAR(255),
    responsibilities TEXT,
    status ENUM('applied', 'approved', 'rejected', 'completed') DEFAULT 'applied',
    applied_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    approved_at TIMESTAMP NULL,
    hours_contributed DECIMAL(5, 2) DEFAULT 0.00,
    points_earned INT UNSIGNED DEFAULT 0,
    FOREIGN KEY (event_id) REFERENCES events(event_id) ON DELETE CASCADE,
    FOREIGN KEY (user_id) REFERENCES users(user_id) ON DELETE CASCADE,
    UNIQUE KEY unique_event_volunteer (event_id, user_id),
    INDEX idx_event (event_id),
    INDEX idx_user (user_id),
    INDEX idx_status (status)
) ENGINE=InnoDB;

-- Event Sponsors Table
CREATE TABLE event_sponsors (
    sponsor_id BIGINT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
    event_id BIGINT UNSIGNED NOT NULL,
    sponsor_name VARCHAR(255) NOT NULL,
    sponsor_type ENUM('title', 'platinum', 'gold', 'silver', 'bronze', 'partner') NOT NULL,
    logo_url VARCHAR(500),
    website_url VARCHAR(500),
    contribution_amount DECIMAL(12, 2),
    description TEXT,
    display_order INT DEFAULT 0,
    FOREIGN KEY (event_id) REFERENCES events(event_id) ON DELETE CASCADE,
    INDEX idx_event (event_id),
    INDEX idx_sponsor_type (sponsor_type)
) ENGINE=InnoDB;

-- Event Proposals Table
CREATE TABLE event_proposals (
    proposal_id BIGINT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
    event_id BIGINT UNSIGNED NOT NULL,
    user_id BIGINT UNSIGNED NOT NULL,
    proposal_title VARCHAR(255) NOT NULL,
    proposal_description TEXT NOT NULL,
    proposal_file_url VARCHAR(500),
    status ENUM('submitted', 'under_review', 'approved', 'rejected') DEFAULT 'submitted',
    submitted_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    reviewed_at TIMESTAMP NULL,
    reviewed_by BIGINT UNSIGNED,
    review_comments TEXT,
    FOREIGN KEY (event_id) REFERENCES events(event_id) ON DELETE CASCADE,
    FOREIGN KEY (user_id) REFERENCES users(user_id) ON DELETE CASCADE,
    FOREIGN KEY (reviewed_by) REFERENCES users(user_id) ON DELETE SET NULL,
    INDEX idx_event (event_id),
    INDEX idx_user (user_id),
    INDEX idx_status (status)
) ENGINE=InnoDB;

-- ============================================
-- ACHIEVEMENTS & GAMIFICATION
-- ============================================

-- Badges Table
CREATE TABLE badges (
    badge_id BIGINT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
    badge_name VARCHAR(255) NOT NULL,
    badge_slug VARCHAR(255) UNIQUE NOT NULL,
    description TEXT,
    icon VARCHAR(100),
    category ENUM('participation', 'leadership', 'achievement', 'milestone', 'special') NOT NULL,
    tier ENUM('bronze', 'silver', 'gold', 'platinum', 'diamond') DEFAULT 'bronze',
    points_required INT UNSIGNED DEFAULT 0,
    criteria_type VARCHAR(50),
    criteria_value INT UNSIGNED,
    is_active BOOLEAN DEFAULT TRUE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    INDEX idx_slug (badge_slug),
    INDEX idx_category (category),
    INDEX idx_tier (tier)
) ENGINE=InnoDB;

-- User Badges Table (Many-to-Many: Users <-> Badges)
CREATE TABLE user_badges (
    user_badge_id BIGINT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
    user_id BIGINT UNSIGNED NOT NULL,
    badge_id BIGINT UNSIGNED NOT NULL,
    earned_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    progress INT UNSIGNED DEFAULT 0,
    is_unlocked BOOLEAN DEFAULT FALSE,
    FOREIGN KEY (user_id) REFERENCES users(user_id) ON DELETE CASCADE,
    FOREIGN KEY (badge_id) REFERENCES badges(badge_id) ON DELETE CASCADE,
    UNIQUE KEY unique_user_badge (user_id, badge_id),
    INDEX idx_user (user_id),
    INDEX idx_badge (badge_id),
    INDEX idx_earned_at (earned_at)
) ENGINE=InnoDB;

-- Certificates Table
CREATE TABLE certificates (
    certificate_id BIGINT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
    certificate_number VARCHAR(100) UNIQUE NOT NULL,
    user_id BIGINT UNSIGNED NOT NULL,
    event_id BIGINT UNSIGNED,
    club_id BIGINT UNSIGNED,
    certificate_type ENUM('participation', 'achievement', 'volunteer', 'winner', 'organizer') NOT NULL,
    title VARCHAR(255) NOT NULL,
    description TEXT,
    issued_date DATE NOT NULL,
    certificate_url VARCHAR(500),
    verification_code VARCHAR(100) UNIQUE NOT NULL,
    is_verified BOOLEAN DEFAULT TRUE,
    issued_by BIGINT UNSIGNED,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES users(user_id) ON DELETE CASCADE,
    FOREIGN KEY (event_id) REFERENCES events(event_id) ON DELETE SET NULL,
    FOREIGN KEY (club_id) REFERENCES clubs(club_id) ON DELETE SET NULL,
    FOREIGN KEY (issued_by) REFERENCES users(user_id) ON DELETE SET NULL,
    INDEX idx_user (user_id),
    INDEX idx_event (event_id),
    INDEX idx_certificate_number (certificate_number),
    INDEX idx_verification_code (verification_code)
) ENGINE=InnoDB;

-- Points History Table
CREATE TABLE points_history (
    points_id BIGINT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
    user_id BIGINT UNSIGNED NOT NULL,
    points_earned INT NOT NULL,
    points_type ENUM('event_participation', 'event_organization', 'volunteer', 'achievement', 'badge', 'bonus', 'penalty') NOT NULL,
    reference_type ENUM('event', 'badge', 'certificate', 'manual') NOT NULL,
    reference_id BIGINT UNSIGNED,
    description VARCHAR(500),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES users(user_id) ON DELETE CASCADE,
    INDEX idx_user (user_id),
    INDEX idx_created_at (created_at),
    INDEX idx_points_type (points_type)
) ENGINE=InnoDB;

-- ============================================
-- ACTIVITY & FEED
-- ============================================

-- Activity Feed Table
CREATE TABLE activity_feed (
    activity_id BIGINT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
    user_id BIGINT UNSIGNED NOT NULL,
    activity_type ENUM('event_rsvp', 'event_attended', 'badge_earned', 'certificate_received', 'club_joined', 'volunteer', 'achievement') NOT NULL,
    reference_type ENUM('event', 'badge', 'certificate', 'club') NOT NULL,
    reference_id BIGINT UNSIGNED NOT NULL,
    activity_text TEXT NOT NULL,
    is_public BOOLEAN DEFAULT TRUE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES users(user_id) ON DELETE CASCADE,
    INDEX idx_user (user_id),
    INDEX idx_created_at (created_at DESC),
    INDEX idx_activity_type (activity_type),
    INDEX idx_public (is_public)
) ENGINE=InnoDB;

-- Notifications Table
CREATE TABLE notifications (
    notification_id BIGINT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
    user_id BIGINT UNSIGNED NOT NULL,
    notification_type ENUM('event_reminder', 'rsvp_confirmation', 'badge_earned', 'certificate_issued', 'club_update', 'system') NOT NULL,
    title VARCHAR(255) NOT NULL,
    message TEXT NOT NULL,
    reference_type VARCHAR(50),
    reference_id BIGINT UNSIGNED,
    is_read BOOLEAN DEFAULT FALSE,
    read_at TIMESTAMP NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES users(user_id) ON DELETE CASCADE,
    INDEX idx_user (user_id),
    INDEX idx_is_read (is_read),
    INDEX idx_created_at (created_at DESC)
) ENGINE=InnoDB;

-- ============================================
-- SPONSORSHIP
-- ============================================

-- Sponsorship Packages Table
CREATE TABLE sponsorship_packages (
    package_id BIGINT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
    package_name VARCHAR(255) NOT NULL,
    package_type ENUM('title', 'platinum', 'gold', 'silver', 'bronze') NOT NULL,
    price DECIMAL(12, 2) NOT NULL,
    description TEXT,
    benefits JSON,
    is_active BOOLEAN DEFAULT TRUE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    INDEX idx_package_type (package_type)
) ENGINE=InnoDB;

-- Sponsorship Requests Table
CREATE TABLE sponsorship_requests (
    request_id BIGINT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
    club_id BIGINT UNSIGNED NOT NULL,
    event_id BIGINT UNSIGNED,
    company_name VARCHAR(255) NOT NULL,
    contact_person VARCHAR(255) NOT NULL,
    contact_email VARCHAR(255) NOT NULL,
    contact_phone VARCHAR(20),
    package_id BIGINT UNSIGNED,
    requested_amount DECIMAL(12, 2),
    message TEXT,
    status ENUM('pending', 'approved', 'rejected', 'completed') DEFAULT 'pending',
    submitted_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    reviewed_at TIMESTAMP NULL,
    FOREIGN KEY (club_id) REFERENCES clubs(club_id) ON DELETE CASCADE,
    FOREIGN KEY (event_id) REFERENCES events(event_id) ON DELETE SET NULL,
    FOREIGN KEY (package_id) REFERENCES sponsorship_packages(package_id) ON DELETE SET NULL,
    INDEX idx_club (club_id),
    INDEX idx_event (event_id),
    INDEX idx_status (status)
) ENGINE=InnoDB;

-- ============================================
-- SYSTEM TABLES
-- ============================================

-- Audit Log Table
CREATE TABLE audit_log (
    log_id BIGINT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
    user_id BIGINT UNSIGNED,
    action VARCHAR(100) NOT NULL,
    table_name VARCHAR(100) NOT NULL,
    record_id BIGINT UNSIGNED,
    old_values JSON,
    new_values JSON,
    ip_address VARCHAR(45),
    user_agent TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES users(user_id) ON DELETE SET NULL,
    INDEX idx_user (user_id),
    INDEX idx_table (table_name),
    INDEX idx_created_at (created_at)
) ENGINE=InnoDB;

-- System Settings Table
CREATE TABLE system_settings (
    setting_id BIGINT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
    setting_key VARCHAR(100) UNIQUE NOT NULL,
    setting_value TEXT,
    setting_type ENUM('string', 'number', 'boolean', 'json') DEFAULT 'string',
    description TEXT,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    INDEX idx_key (setting_key)
) ENGINE=InnoDB;

-- Add foreign key constraint for users.college_id
ALTER TABLE users 
ADD CONSTRAINT fk_users_college 
FOREIGN KEY (college_id) REFERENCES colleges(college_id) ON DELETE SET NULL;
