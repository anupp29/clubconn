-- ClubConn SQL Schema (3NF - Third Normal Form)
-- Relational database schema for reference and migration

-- ============================================================================
-- USERS AND AUTHENTICATION
-- ============================================================================

CREATE TABLE users (
    uid VARCHAR(128) PRIMARY KEY,
    email VARCHAR(255) UNIQUE NOT NULL,
    display_name VARCHAR(255) NOT NULL,
    username VARCHAR(50) UNIQUE NOT NULL,
    photo_url TEXT,
    bio TEXT,
    college_id VARCHAR(128),
    year INT CHECK (year BETWEEN 1 AND 4),
    branch VARCHAR(100),
    phone VARCHAR(20),
    website TEXT,
    github VARCHAR(255),
    linkedin VARCHAR(255),
    twitter VARCHAR(255),
    instagram VARCHAR(255),
    platform_role VARCHAR(20) DEFAULT 'user' CHECK (platform_role IN ('platform_admin', 'user')),
    is_active BOOLEAN DEFAULT TRUE,
    email_verified BOOLEAN DEFAULT FALSE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    last_login TIMESTAMP,
    FOREIGN KEY (college_id) REFERENCES colleges(college_id) ON DELETE SET NULL,
    INDEX idx_username (username),
    INDEX idx_email (email),
    INDEX idx_college_active (college_id, is_active)
);

-- ============================================================================
-- COLLEGES
-- ============================================================================

CREATE TABLE colleges (
    college_id VARCHAR(128) PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    short_name VARCHAR(50) NOT NULL,
    city VARCHAR(100) NOT NULL,
    state VARCHAR(100) NOT NULL,
    country VARCHAR(100) DEFAULT 'India',
    email VARCHAR(255),
    phone VARCHAR(20),
    website TEXT,
    address TEXT,
    logo_url TEXT,
    established_year INT,
    is_active BOOLEAN DEFAULT TRUE,
    total_clubs INT DEFAULT 0,
    total_students INT DEFAULT 0,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    INDEX idx_short_name (short_name),
    INDEX idx_city_active (city, is_active)
);

-- ============================================================================
-- CITY COMMUNITIES
-- ============================================================================

CREATE TABLE city_communities (
    community_id VARCHAR(128) PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    slug VARCHAR(100) UNIQUE NOT NULL,
    description TEXT,
    city VARCHAR(100) NOT NULL,
    state VARCHAR(100) NOT NULL,
    logo_url TEXT,
    banner_url TEXT,
    website TEXT,
    github VARCHAR(255),
    twitter VARCHAR(255),
    linkedin VARCHAR(255),
    discord TEXT,
    telegram TEXT,
    is_active BOOLEAN DEFAULT TRUE,
    total_members INT DEFAULT 0,
    total_events INT DEFAULT 0,
    created_by VARCHAR(128) NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (created_by) REFERENCES users(uid),
    INDEX idx_slug (slug),
    INDEX idx_city_active (city, is_active)
);

-- Associated colleges for city communities (many-to-many)
CREATE TABLE community_colleges (
    community_id VARCHAR(128) NOT NULL,
    college_id VARCHAR(128) NOT NULL,
    added_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    PRIMARY KEY (community_id, college_id),
    FOREIGN KEY (community_id) REFERENCES city_communities(community_id) ON DELETE CASCADE,
    FOREIGN KEY (college_id) REFERENCES colleges(college_id) ON DELETE CASCADE,
    INDEX idx_college (college_id)
);

-- City community members
CREATE TABLE community_members (
    community_id VARCHAR(128) NOT NULL,
    uid VARCHAR(128) NOT NULL,
    role VARCHAR(20) NOT NULL CHECK (role IN ('lead', 'co-lead', 'member')),
    joined_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    added_by VARCHAR(128) NOT NULL,
    PRIMARY KEY (community_id, uid),
    FOREIGN KEY (community_id) REFERENCES city_communities(community_id) ON DELETE CASCADE,
    FOREIGN KEY (uid) REFERENCES users(uid) ON DELETE CASCADE,
    FOREIGN KEY (added_by) REFERENCES users(uid),
    INDEX idx_user (uid),
    INDEX idx_role (community_id, role)
);

-- ============================================================================
-- CLUBS
-- ============================================================================

CREATE TABLE clubs (
    club_id VARCHAR(128) PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    short_name VARCHAR(50) NOT NULL,
    slug VARCHAR(100) UNIQUE NOT NULL,
    description TEXT,
    college_id VARCHAR(128) NOT NULL,
    category VARCHAR(20) CHECK (category IN ('technical', 'cultural', 'sports', 'social', 'other')),
    logo_url TEXT,
    banner_url TEXT,
    official_logo_url TEXT,
    website TEXT,
    github VARCHAR(255),
    twitter VARCHAR(255),
    linkedin VARCHAR(255),
    instagram VARCHAR(255),
    discord TEXT,
    is_active BOOLEAN DEFAULT TRUE,
    is_verified BOOLEAN DEFAULT FALSE,
    total_members INT DEFAULT 0,
    total_events INT DEFAULT 0,
    created_by VARCHAR(128) NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (college_id) REFERENCES colleges(college_id) ON DELETE CASCADE,
    FOREIGN KEY (created_by) REFERENCES users(uid),
    INDEX idx_slug (slug),
    INDEX idx_college_active (college_id, is_active),
    INDEX idx_category_active (category, is_active)
);

-- Club tags (many-to-many)
CREATE TABLE club_tags (
    club_id VARCHAR(128) NOT NULL,
    tag VARCHAR(50) NOT NULL,
    PRIMARY KEY (club_id, tag),
    FOREIGN KEY (club_id) REFERENCES clubs(club_id) ON DELETE CASCADE,
    INDEX idx_tag (tag)
);

-- Club members with roles
CREATE TABLE club_members (
    club_id VARCHAR(128) NOT NULL,
    uid VARCHAR(128) NOT NULL,
    role VARCHAR(30) NOT NULL CHECK (role IN (
        'club_coordinator', 'lead', 'co-lead', 'secretary', 
        'joint-secretary', 'creative', 'social', 'member'
    )),
    is_active BOOLEAN DEFAULT TRUE,
    joined_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    added_by VARCHAR(128) NOT NULL,
    PRIMARY KEY (club_id, uid),
    FOREIGN KEY (club_id) REFERENCES clubs(club_id) ON DELETE CASCADE,
    FOREIGN KEY (uid) REFERENCES users(uid) ON DELETE CASCADE,
    FOREIGN KEY (added_by) REFERENCES users(uid),
    INDEX idx_user (uid),
    INDEX idx_role (club_id, role, is_active)
);

-- ============================================================================
-- EVENTS
-- ============================================================================

CREATE TABLE events (
    event_id VARCHAR(128) PRIMARY KEY,
    title VARCHAR(255) NOT NULL,
    description TEXT,
    organizer_type VARCHAR(20) NOT NULL CHECK (organizer_type IN ('club', 'city_community')),
    organizer_id VARCHAR(128) NOT NULL,
    college_id VARCHAR(128),
    event_type VARCHAR(20) CHECK (event_type IN (
        'workshop', 'hackathon', 'meetup', 'conference', 
        'competition', 'seminar', 'social', 'other'
    )),
    mode VARCHAR(10) CHECK (mode IN ('online', 'offline', 'hybrid')),
    start_date TIMESTAMP NOT NULL,
    end_date TIMESTAMP NOT NULL,
    registration_start TIMESTAMP,
    registration_end TIMESTAMP,
    venue VARCHAR(255),
    hall_id VARCHAR(128),
    city VARCHAR(100),
    online_link TEXT,
    max_participants INT,
    current_participants INT DEFAULT 0,
    requires_registration BOOLEAN DEFAULT TRUE,
    registration_fee DECIMAL(10, 2) DEFAULT 0,
    external_registration_link TEXT,
    banner_url TEXT,
    status VARCHAR(20) DEFAULT 'draft' CHECK (status IN (
        'draft', 'published', 'ongoing', 'completed', 'cancelled'
    )),
    is_featured BOOLEAN DEFAULT FALSE,
    is_must_attend BOOLEAN DEFAULT FALSE,
    total_rsvps INT DEFAULT 0,
    total_attended INT DEFAULT 0,
    created_by VARCHAR(128) NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (college_id) REFERENCES colleges(college_id) ON DELETE SET NULL,
    FOREIGN KEY (created_by) REFERENCES users(uid),
    INDEX idx_organizer (organizer_type, organizer_id, status, start_date),
    INDEX idx_college_status (college_id, status, start_date),
    INDEX idx_type_status (event_type, status, start_date),
    INDEX idx_featured (is_featured, start_date)
);

-- Event tags
CREATE TABLE event_tags (
    event_id VARCHAR(128) NOT NULL,
    tag VARCHAR(50) NOT NULL,
    PRIMARY KEY (event_id, tag),
    FOREIGN KEY (event_id) REFERENCES events(event_id) ON DELETE CASCADE,
    INDEX idx_tag (tag)
);

-- Event participants (RSVPs)
CREATE TABLE event_participants (
    event_id VARCHAR(128) NOT NULL,
    uid VARCHAR(128) NOT NULL,
    rsvp_status VARCHAR(20) CHECK (rsvp_status IN ('going', 'interested', 'not_going')),
    attended BOOLEAN DEFAULT FALSE,
    registered_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    attendance_marked_at TIMESTAMP,
    attendance_marked_by VARCHAR(128),
    submission_id VARCHAR(128),
    submission_status VARCHAR(20) CHECK (submission_status IN ('pending', 'submitted', 'evaluated')),
    PRIMARY KEY (event_id, uid),
    FOREIGN KEY (event_id) REFERENCES events(event_id) ON DELETE CASCADE,
    FOREIGN KEY (uid) REFERENCES users(uid) ON DELETE CASCADE,
    FOREIGN KEY (attendance_marked_by) REFERENCES users(uid),
    INDEX idx_user (uid, registered_at),
    INDEX idx_status (event_id, rsvp_status)
);

-- ============================================================================
-- SUBMISSIONS
-- ============================================================================

CREATE TABLE submissions (
    submission_id VARCHAR(128) PRIMARY KEY,
    event_id VARCHAR(128) NOT NULL,
    submitted_by VARCHAR(128) NOT NULL,
    title VARCHAR(255) NOT NULL,
    description TEXT,
    submission_url TEXT,
    status VARCHAR(20) DEFAULT 'pending' CHECK (status IN (
        'pending', 'under_review', 'accepted', 'rejected'
    )),
    score DECIMAL(5, 2),
    feedback TEXT,
    evaluated_by VARCHAR(128),
    evaluated_at TIMESTAMP,
    submitted_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (event_id) REFERENCES events(event_id) ON DELETE CASCADE,
    FOREIGN KEY (submitted_by) REFERENCES users(uid) ON DELETE CASCADE,
    FOREIGN KEY (evaluated_by) REFERENCES users(uid),
    INDEX idx_event_status (event_id, status),
    INDEX idx_user (submitted_by, submitted_at)
);

-- Submission team members
CREATE TABLE submission_team_members (
    submission_id VARCHAR(128) NOT NULL,
    uid VARCHAR(128) NOT NULL,
    PRIMARY KEY (submission_id, uid),
    FOREIGN KEY (submission_id) REFERENCES submissions(submission_id) ON DELETE CASCADE,
    FOREIGN KEY (uid) REFERENCES users(uid) ON DELETE CASCADE
);

-- Submission attachments
CREATE TABLE submission_attachments (
    attachment_id VARCHAR(128) PRIMARY KEY,
    submission_id VARCHAR(128) NOT NULL,
    file_url TEXT NOT NULL,
    file_name VARCHAR(255),
    file_type VARCHAR(50),
    uploaded_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (submission_id) REFERENCES submissions(submission_id) ON DELETE CASCADE,
    INDEX idx_submission (submission_id)
);

-- ============================================================================
-- HALL REQUESTS
-- ============================================================================

CREATE TABLE hall_requests (
    request_id VARCHAR(128) PRIMARY KEY,
    event_id VARCHAR(128) NOT NULL,
    club_id VARCHAR(128) NOT NULL,
    college_id VARCHAR(128) NOT NULL,
    hall_name VARCHAR(255) NOT NULL,
    requested_date DATE NOT NULL,
    start_time TIMESTAMP NOT NULL,
    end_time TIMESTAMP NOT NULL,
    expected_attendees INT,
    special_requirements TEXT,
    status VARCHAR(20) DEFAULT 'pending' CHECK (status IN (
        'pending', 'approved', 'rejected', 'cancelled'
    )),
    requested_by VARCHAR(128) NOT NULL,
    requested_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    approved_by VARCHAR(128),
    approved_at TIMESTAMP,
    rejection_reason TEXT,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (event_id) REFERENCES events(event_id) ON DELETE CASCADE,
    FOREIGN KEY (club_id) REFERENCES clubs(club_id) ON DELETE CASCADE,
    FOREIGN KEY (college_id) REFERENCES colleges(college_id) ON DELETE CASCADE,
    FOREIGN KEY (requested_by) REFERENCES users(uid),
    FOREIGN KEY (approved_by) REFERENCES users(uid),
    INDEX idx_college_status (college_id, status, requested_date),
    INDEX idx_club_status (club_id, status),
    INDEX idx_status_date (status, requested_date)
);

-- Hall equipment requirements
CREATE TABLE hall_equipment (
    request_id VARCHAR(128) NOT NULL,
    equipment VARCHAR(100) NOT NULL,
    PRIMARY KEY (request_id, equipment),
    FOREIGN KEY (request_id) REFERENCES hall_requests(request_id) ON DELETE CASCADE
);

-- ============================================================================
-- MESSAGES
-- ============================================================================

CREATE TABLE messages (
    message_id VARCHAR(128) PRIMARY KEY,
    from_uid VARCHAR(128) NOT NULL,
    to_uid VARCHAR(128) NOT NULL,
    subject VARCHAR(255) NOT NULL,
    body TEXT NOT NULL,
    context_type VARCHAR(20) CHECK (context_type IN ('club', 'event', 'hall_request')),
    context_id VARCHAR(128),
    is_read BOOLEAN DEFAULT FALSE,
    read_at TIMESTAMP,
    is_archived BOOLEAN DEFAULT FALSE,
    sent_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (from_uid) REFERENCES users(uid) ON DELETE CASCADE,
    FOREIGN KEY (to_uid) REFERENCES users(uid) ON DELETE CASCADE,
    INDEX idx_recipient (to_uid, is_read, sent_at),
    INDEX idx_sender (from_uid, sent_at)
);

-- Message attachments
CREATE TABLE message_attachments (
    attachment_id VARCHAR(128) PRIMARY KEY,
    message_id VARCHAR(128) NOT NULL,
    file_url TEXT NOT NULL,
    file_name VARCHAR(255),
    FOREIGN KEY (message_id) REFERENCES messages(message_id) ON DELETE CASCADE,
    INDEX idx_message (message_id)
);

-- ============================================================================
-- AUDIT LOGS
-- ============================================================================

CREATE TABLE audit_logs (
    log_id VARCHAR(128) PRIMARY KEY,
    actor_uid VARCHAR(128) NOT NULL,
    actor_role VARCHAR(30) NOT NULL,
    action VARCHAR(20) NOT NULL CHECK (action IN (
        'create', 'update', 'delete', 'approve', 'reject', 
        'role_change', 'status_change'
    )),
    resource_type VARCHAR(30) NOT NULL CHECK (resource_type IN (
        'user', 'club', 'event', 'hall_request', 
        'city_community', 'membership'
    )),
    resource_id VARCHAR(128) NOT NULL,
    college_id VARCHAR(128),
    club_id VARCHAR(128),
    ip_address VARCHAR(45),
    user_agent TEXT,
    timestamp TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (actor_uid) REFERENCES users(uid),
    INDEX idx_resource (resource_type, resource_id, timestamp),
    INDEX idx_actor (actor_uid, timestamp),
    INDEX idx_college (college_id, timestamp)
);

-- Audit log changes (detailed field-level changes)
CREATE TABLE audit_log_changes (
    change_id VARCHAR(128) PRIMARY KEY,
    log_id VARCHAR(128) NOT NULL,
    field VARCHAR(100) NOT NULL,
    old_value TEXT,
    new_value TEXT,
    FOREIGN KEY (log_id) REFERENCES audit_logs(log_id) ON DELETE CASCADE,
    INDEX idx_log (log_id)
);

-- ============================================================================
-- NOTIFICATIONS
-- ============================================================================

CREATE TABLE notifications (
    notification_id VARCHAR(128) PRIMARY KEY,
    user_id VARCHAR(128) NOT NULL,
    type VARCHAR(30) NOT NULL CHECK (type IN (
        'event_invite', 'role_change', 'hall_approved', 
        'hall_rejected', 'mention', 'announcement'
    )),
    title VARCHAR(255) NOT NULL,
    body TEXT NOT NULL,
    action_url TEXT,
    action_label VARCHAR(100),
    related_type VARCHAR(20) CHECK (related_type IN ('event', 'club', 'hall_request')),
    related_id VARCHAR(128),
    is_read BOOLEAN DEFAULT FALSE,
    read_at TIMESTAMP,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES users(uid) ON DELETE CASCADE,
    INDEX idx_user_read (user_id, is_read, created_at)
);

-- ============================================================================
-- ROLE TYPES (Reference Data)
-- ============================================================================

CREATE TABLE role_types (
    role_id VARCHAR(128) PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    slug VARCHAR(50) UNIQUE NOT NULL,
    description TEXT,
    can_manage_members BOOLEAN DEFAULT FALSE,
    can_create_events BOOLEAN DEFAULT FALSE,
    can_edit_club BOOLEAN DEFAULT FALSE,
    can_delete_events BOOLEAN DEFAULT FALSE,
    can_approve_halls BOOLEAN DEFAULT FALSE,
    can_view_analytics BOOLEAN DEFAULT FALSE,
    can_manage_roles BOOLEAN DEFAULT FALSE,
    level INT NOT NULL,
    scope VARCHAR(20) CHECK (scope IN ('platform', 'college', 'club', 'city_community'))
);

-- ============================================================================
-- SEQUENCES AND AUTO-INCREMENT
-- ============================================================================

-- For MySQL/MariaDB, use AUTO_INCREMENT on ID columns
-- For PostgreSQL, use SERIAL or SEQUENCE
-- For Firestore migration, generate IDs using UUID or Firestore auto-ID

-- ============================================================================
-- TRIGGERS FOR UPDATED_AT
-- ============================================================================

-- MySQL Trigger Example (repeat for each table with updated_at)
DELIMITER $$
CREATE TRIGGER users_updated_at
BEFORE UPDATE ON users
FOR EACH ROW
BEGIN
    SET NEW.updated_at = CURRENT_TIMESTAMP;
END$$
DELIMITER ;

-- ============================================================================
-- CONSTRAINTS AND CHECKS
-- ============================================================================

-- Ensure event dates are logical
ALTER TABLE events ADD CONSTRAINT chk_event_dates 
    CHECK (end_date >= start_date);

ALTER TABLE events ADD CONSTRAINT chk_registration_dates 
    CHECK (registration_end >= registration_start);

-- Ensure hall booking times are logical
ALTER TABLE hall_requests ADD CONSTRAINT chk_hall_times 
    CHECK (end_time > start_time);

-- Ensure positive values
ALTER TABLE events ADD CONSTRAINT chk_max_participants 
    CHECK (max_participants IS NULL OR max_participants > 0);

ALTER TABLE events ADD CONSTRAINT chk_registration_fee 
    CHECK (registration_fee >= 0);
