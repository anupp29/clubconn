-- ClubConn SQL Schema (BCNF - Boyce-Codd Normal Form)
-- Further normalized to eliminate all functional dependencies

-- ============================================================================
-- BCNF DECOMPOSITION NOTES
-- ============================================================================
-- In BCNF, every determinant must be a candidate key.
-- We decompose tables to eliminate partial and transitive dependencies.

-- ============================================================================
-- USERS (Already in BCNF)
-- ============================================================================

CREATE TABLE users (
    uid VARCHAR(128) PRIMARY KEY,
    email VARCHAR(255) UNIQUE NOT NULL,
    display_name VARCHAR(255) NOT NULL,
    username VARCHAR(50) UNIQUE NOT NULL,
    photo_url TEXT,
    bio TEXT,
    college_id VARCHAR(128),
    platform_role VARCHAR(20) DEFAULT 'user',
    is_active BOOLEAN DEFAULT TRUE,
    email_verified BOOLEAN DEFAULT FALSE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    last_login TIMESTAMP,
    FOREIGN KEY (college_id) REFERENCES colleges(college_id) ON DELETE SET NULL
);

-- Decompose user profile details (eliminates transitive dependency)
CREATE TABLE user_profiles (
    uid VARCHAR(128) PRIMARY KEY,
    year INT CHECK (year BETWEEN 1 AND 4),
    branch VARCHAR(100),
    phone VARCHAR(20),
    FOREIGN KEY (uid) REFERENCES users(uid) ON DELETE CASCADE
);

-- Decompose user social links (eliminates multi-valued dependency)
CREATE TABLE user_social_links (
    uid VARCHAR(128) NOT NULL,
    platform VARCHAR(20) NOT NULL,
    url VARCHAR(255) NOT NULL,
    PRIMARY KEY (uid, platform),
    FOREIGN KEY (uid) REFERENCES users(uid) ON DELETE CASCADE,
    CHECK (platform IN ('website', 'github', 'linkedin', 'twitter', 'instagram'))
);

-- ============================================================================
-- COLLEGES (Already in BCNF)
-- ============================================================================

CREATE TABLE colleges (
    college_id VARCHAR(128) PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    short_name VARCHAR(50) NOT NULL,
    city VARCHAR(100) NOT NULL,
    state VARCHAR(100) NOT NULL,
    country VARCHAR(100) DEFAULT 'India',
    established_year INT,
    is_active BOOLEAN DEFAULT TRUE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Decompose college contact info
CREATE TABLE college_contacts (
    college_id VARCHAR(128) PRIMARY KEY,
    email VARCHAR(255),
    phone VARCHAR(20),
    website TEXT,
    address TEXT,
    FOREIGN KEY (college_id) REFERENCES colleges(college_id) ON DELETE CASCADE
);

-- Decompose college branding
CREATE TABLE college_branding (
    college_id VARCHAR(128) PRIMARY KEY,
    logo_url TEXT,
    FOREIGN KEY (college_id) REFERENCES colleges(college_id) ON DELETE CASCADE
);

-- Decompose college stats (computed values, updated via triggers)
CREATE TABLE college_stats (
    college_id VARCHAR(128) PRIMARY KEY,
    total_clubs INT DEFAULT 0,
    total_students INT DEFAULT 0,
    last_updated TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (college_id) REFERENCES colleges(college_id) ON DELETE CASCADE
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
    is_active BOOLEAN DEFAULT TRUE,
    created_by VARCHAR(128) NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (created_by) REFERENCES users(uid)
);

-- Decompose community branding
CREATE TABLE community_branding (
    community_id VARCHAR(128) PRIMARY KEY,
    logo_url TEXT,
    banner_url TEXT,
    website TEXT,
    FOREIGN KEY (community_id) REFERENCES city_communities(community_id) ON DELETE CASCADE
);

-- Decompose community social links
CREATE TABLE community_social_links (
    community_id VARCHAR(128) NOT NULL,
    platform VARCHAR(20) NOT NULL,
    url TEXT NOT NULL,
    PRIMARY KEY (community_id, platform),
    FOREIGN KEY (community_id) REFERENCES city_communities(community_id) ON DELETE CASCADE,
    CHECK (platform IN ('github', 'twitter', 'linkedin', 'discord', 'telegram'))
);

-- Decompose community stats
CREATE TABLE community_stats (
    community_id VARCHAR(128) PRIMARY KEY,
    total_members INT DEFAULT 0,
    total_events INT DEFAULT 0,
    last_updated TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (community_id) REFERENCES city_communities(community_id) ON DELETE CASCADE
);

-- Associated colleges (already in BCNF)
CREATE TABLE community_colleges (
    community_id VARCHAR(128) NOT NULL,
    college_id VARCHAR(128) NOT NULL,
    added_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    PRIMARY KEY (community_id, college_id),
    FOREIGN KEY (community_id) REFERENCES city_communities(community_id) ON DELETE CASCADE,
    FOREIGN KEY (college_id) REFERENCES colleges(college_id) ON DELETE CASCADE
);

-- Community members (already in BCNF)
CREATE TABLE community_members (
    community_id VARCHAR(128) NOT NULL,
    uid VARCHAR(128) NOT NULL,
    role VARCHAR(20) NOT NULL,
    joined_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    added_by VARCHAR(128) NOT NULL,
    PRIMARY KEY (community_id, uid),
    FOREIGN KEY (community_id) REFERENCES city_communities(community_id) ON DELETE CASCADE,
    FOREIGN KEY (uid) REFERENCES users(uid) ON DELETE CASCADE,
    FOREIGN KEY (added_by) REFERENCES users(uid),
    CHECK (role IN ('lead', 'co-lead', 'member'))
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
    category VARCHAR(20),
    is_active BOOLEAN DEFAULT TRUE,
    is_verified BOOLEAN DEFAULT FALSE,
    created_by VARCHAR(128) NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (college_id) REFERENCES colleges(college_id) ON DELETE CASCADE,
    FOREIGN KEY (created_by) REFERENCES users(uid),
    CHECK (category IN ('technical', 'cultural', 'sports', 'social', 'other'))
);

-- Decompose club branding
CREATE TABLE club_branding (
    club_id VARCHAR(128) PRIMARY KEY,
    logo_url TEXT,
    banner_url TEXT,
    official_logo_url TEXT,
    website TEXT,
    FOREIGN KEY (club_id) REFERENCES clubs(club_id) ON DELETE CASCADE
);

-- Decompose club social links
CREATE TABLE club_social_links (
    club_id VARCHAR(128) NOT NULL,
    platform VARCHAR(20) NOT NULL,
    url TEXT NOT NULL,
    PRIMARY KEY (club_id, platform),
    FOREIGN KEY (club_id) REFERENCES clubs(club_id) ON DELETE CASCADE,
    CHECK (platform IN ('github', 'twitter', 'linkedin', 'instagram', 'discord'))
);

-- Decompose club stats
CREATE TABLE club_stats (
    club_id VARCHAR(128) PRIMARY KEY,
    total_members INT DEFAULT 0,
    total_events INT DEFAULT 0,
    last_updated TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (club_id) REFERENCES clubs(club_id) ON DELETE CASCADE
);

-- Club tags (already in BCNF)
CREATE TABLE club_tags (
    club_id VARCHAR(128) NOT NULL,
    tag VARCHAR(50) NOT NULL,
    PRIMARY KEY (club_id, tag),
    FOREIGN KEY (club_id) REFERENCES clubs(club_id) ON DELETE CASCADE
);

-- Club members (already in BCNF)
CREATE TABLE club_members (
    club_id VARCHAR(128) NOT NULL,
    uid VARCHAR(128) NOT NULL,
    role VARCHAR(30) NOT NULL,
    is_active BOOLEAN DEFAULT TRUE,
    joined_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    added_by VARCHAR(128) NOT NULL,
    PRIMARY KEY (club_id, uid),
    FOREIGN KEY (club_id) REFERENCES clubs(club_id) ON DELETE CASCADE,
    FOREIGN KEY (uid) REFERENCES users(uid) ON DELETE CASCADE,
    FOREIGN KEY (added_by) REFERENCES users(uid),
    CHECK (role IN ('club_coordinator', 'lead', 'co-lead', 'secretary', 
                    'joint-secretary', 'creative', 'social', 'member'))
);

-- ============================================================================
-- EVENTS
-- ============================================================================

CREATE TABLE events (
    event_id VARCHAR(128) PRIMARY KEY,
    title VARCHAR(255) NOT NULL,
    description TEXT,
    organizer_type VARCHAR(20) NOT NULL,
    organizer_id VARCHAR(128) NOT NULL,
    college_id VARCHAR(128),
    event_type VARCHAR(20),
    mode VARCHAR(10),
    status VARCHAR(20) DEFAULT 'draft',
    is_featured BOOLEAN DEFAULT FALSE,
    is_must_attend BOOLEAN DEFAULT FALSE,
    created_by VARCHAR(128) NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (college_id) REFERENCES colleges(college_id) ON DELETE SET NULL,
    FOREIGN KEY (created_by) REFERENCES users(uid),
    CHECK (organizer_type IN ('club', 'city_community')),
    CHECK (event_type IN ('workshop', 'hackathon', 'meetup', 'conference', 
                          'competition', 'seminar', 'social', 'other')),
    CHECK (mode IN ('online', 'offline', 'hybrid')),
    CHECK (status IN ('draft', 'published', 'ongoing', 'completed', 'cancelled'))
);

-- Decompose event timing
CREATE TABLE event_timing (
    event_id VARCHAR(128) PRIMARY KEY,
    start_date TIMESTAMP NOT NULL,
    end_date TIMESTAMP NOT NULL,
    registration_start TIMESTAMP,
    registration_end TIMESTAMP,
    FOREIGN KEY (event_id) REFERENCES events(event_id) ON DELETE CASCADE,
    CHECK (end_date >= start_date),
    CHECK (registration_end >= registration_start)
);

-- Decompose event location
CREATE TABLE event_location (
    event_id VARCHAR(128) PRIMARY KEY,
    venue VARCHAR(255),
    hall_id VARCHAR(128),
    city VARCHAR(100),
    online_link TEXT,
    FOREIGN KEY (event_id) REFERENCES events(event_id) ON DELETE CASCADE
);

-- Decompose event registration
CREATE TABLE event_registration (
    event_id VARCHAR(128) PRIMARY KEY,
    max_participants INT,
    requires_registration BOOLEAN DEFAULT TRUE,
    registration_fee DECIMAL(10, 2) DEFAULT 0,
    external_registration_link TEXT,
    FOREIGN KEY (event_id) REFERENCES events(event_id) ON DELETE CASCADE,
    CHECK (max_participants IS NULL OR max_participants > 0),
    CHECK (registration_fee >= 0)
);

-- Decompose event branding
CREATE TABLE event_branding (
    event_id VARCHAR(128) PRIMARY KEY,
    banner_url TEXT,
    FOREIGN KEY (event_id) REFERENCES events(event_id) ON DELETE CASCADE
);

-- Decompose event stats
CREATE TABLE event_stats (
    event_id VARCHAR(128) PRIMARY KEY,
    current_participants INT DEFAULT 0,
    total_rsvps INT DEFAULT 0,
    total_attended INT DEFAULT 0,
    last_updated TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (event_id) REFERENCES events(event_id) ON DELETE CASCADE
);

-- Event tags (already in BCNF)
CREATE TABLE event_tags (
    event_id VARCHAR(128) NOT NULL,
    tag VARCHAR(50) NOT NULL,
    PRIMARY KEY (event_id, tag),
    FOREIGN KEY (event_id) REFERENCES events(event_id) ON DELETE CASCADE
);

-- Event participants (already in BCNF)
CREATE TABLE event_participants (
    event_id VARCHAR(128) NOT NULL,
    uid VARCHAR(128) NOT NULL,
    rsvp_status VARCHAR(20),
    attended BOOLEAN DEFAULT FALSE,
    registered_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    PRIMARY KEY (event_id, uid),
    FOREIGN KEY (event_id) REFERENCES events(event_id) ON DELETE CASCADE,
    FOREIGN KEY (uid) REFERENCES users(uid) ON DELETE CASCADE,
    CHECK (rsvp_status IN ('going', 'interested', 'not_going'))
);

-- Decompose participant attendance
CREATE TABLE participant_attendance (
    event_id VARCHAR(128) NOT NULL,
    uid VARCHAR(128) NOT NULL,
    attendance_marked_at TIMESTAMP,
    attendance_marked_by VARCHAR(128),
    PRIMARY KEY (event_id, uid),
    FOREIGN KEY (event_id, uid) REFERENCES event_participants(event_id, uid) ON DELETE CASCADE,
    FOREIGN KEY (attendance_marked_by) REFERENCES users(uid)
);

-- Decompose participant submission
CREATE TABLE participant_submission (
    event_id VARCHAR(128) NOT NULL,
    uid VARCHAR(128) NOT NULL,
    submission_id VARCHAR(128),
    submission_status VARCHAR(20),
    PRIMARY KEY (event_id, uid),
    FOREIGN KEY (event_id, uid) REFERENCES event_participants(event_id, uid) ON DELETE CASCADE,
    CHECK (submission_status IN ('pending', 'submitted', 'evaluated'))
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
    status VARCHAR(20) DEFAULT 'pending',
    submitted_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (event_id) REFERENCES events(event_id) ON DELETE CASCADE,
    FOREIGN KEY (submitted_by) REFERENCES users(uid) ON DELETE CASCADE,
    CHECK (status IN ('pending', 'under_review', 'accepted', 'rejected'))
);

-- Decompose submission evaluation
CREATE TABLE submission_evaluation (
    submission_id VARCHAR(128) PRIMARY KEY,
    score DECIMAL(5, 2),
    feedback TEXT,
    evaluated_by VARCHAR(128),
    evaluated_at TIMESTAMP,
    FOREIGN KEY (submission_id) REFERENCES submissions(submission_id) ON DELETE CASCADE,
    FOREIGN KEY (evaluated_by) REFERENCES users(uid)
);

-- Submission team members (already in BCNF)
CREATE TABLE submission_team_members (
    submission_id VARCHAR(128) NOT NULL,
    uid VARCHAR(128) NOT NULL,
    PRIMARY KEY (submission_id, uid),
    FOREIGN KEY (submission_id) REFERENCES submissions(submission_id) ON DELETE CASCADE,
    FOREIGN KEY (uid) REFERENCES users(uid) ON DELETE CASCADE
);

-- Submission attachments (already in BCNF)
CREATE TABLE submission_attachments (
    attachment_id VARCHAR(128) PRIMARY KEY,
    submission_id VARCHAR(128) NOT NULL,
    file_url TEXT NOT NULL,
    file_name VARCHAR(255),
    file_type VARCHAR(50),
    uploaded_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (submission_id) REFERENCES submissions(submission_id) ON DELETE CASCADE
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
    expected_attendees INT,
    special_requirements TEXT,
    status VARCHAR(20) DEFAULT 'pending',
    requested_by VARCHAR(128) NOT NULL,
    requested_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (event_id) REFERENCES events(event_id) ON DELETE CASCADE,
    FOREIGN KEY (club_id) REFERENCES clubs(club_id) ON DELETE CASCADE,
    FOREIGN KEY (college_id) REFERENCES colleges(college_id) ON DELETE CASCADE,
    FOREIGN KEY (requested_by) REFERENCES users(uid),
    CHECK (status IN ('pending', 'approved', 'rejected', 'cancelled'))
);

-- Decompose hall timing
CREATE TABLE hall_timing (
    request_id VARCHAR(128) PRIMARY KEY,
    start_time TIMESTAMP NOT NULL,
    end_time TIMESTAMP NOT NULL,
    FOREIGN KEY (request_id) REFERENCES hall_requests(request_id) ON DELETE CASCADE,
    CHECK (end_time > start_time)
);

-- Decompose hall approval
CREATE TABLE hall_approval (
    request_id VARCHAR(128) PRIMARY KEY,
    approved_by VARCHAR(128),
    approved_at TIMESTAMP,
    rejection_reason TEXT,
    FOREIGN KEY (request_id) REFERENCES hall_requests(request_id) ON DELETE CASCADE,
    FOREIGN KEY (approved_by) REFERENCES users(uid)
);

-- Hall equipment (already in BCNF)
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
    is_read BOOLEAN DEFAULT FALSE,
    is_archived BOOLEAN DEFAULT FALSE,
    sent_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (from_uid) REFERENCES users(uid) ON DELETE CASCADE,
    FOREIGN KEY (to_uid) REFERENCES users(uid) ON DELETE CASCADE
);

-- Decompose message context
CREATE TABLE message_context (
    message_id VARCHAR(128) PRIMARY KEY,
    context_type VARCHAR(20),
    context_id VARCHAR(128),
    FOREIGN KEY (message_id) REFERENCES messages(message_id) ON DELETE CASCADE,
    CHECK (context_type IN ('club', 'event', 'hall_request'))
);

-- Decompose message read status
CREATE TABLE message_read_status (
    message_id VARCHAR(128) PRIMARY KEY,
    read_at TIMESTAMP,
    FOREIGN KEY (message_id) REFERENCES messages(message_id) ON DELETE CASCADE
);

-- Message attachments (already in BCNF)
CREATE TABLE message_attachments (
    attachment_id VARCHAR(128) PRIMARY KEY,
    message_id VARCHAR(128) NOT NULL,
    file_url TEXT NOT NULL,
    file_name VARCHAR(255),
    FOREIGN KEY (message_id) REFERENCES messages(message_id) ON DELETE CASCADE
);

-- ============================================================================
-- AUDIT LOGS
-- ============================================================================

CREATE TABLE audit_logs (
    log_id VARCHAR(128) PRIMARY KEY,
    actor_uid VARCHAR(128) NOT NULL,
    actor_role VARCHAR(30) NOT NULL,
    action VARCHAR(20) NOT NULL,
    resource_type VARCHAR(30) NOT NULL,
    resource_id VARCHAR(128) NOT NULL,
    timestamp TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (actor_uid) REFERENCES users(uid),
    CHECK (action IN ('create', 'update', 'delete', 'approve', 'reject', 
                      'role_change', 'status_change')),
    CHECK (resource_type IN ('user', 'club', 'event', 'hall_request', 
                             'city_community', 'membership'))
);

-- Decompose audit context
CREATE TABLE audit_context (
    log_id VARCHAR(128) PRIMARY KEY,
    college_id VARCHAR(128),
    club_id VARCHAR(128),
    ip_address VARCHAR(45),
    user_agent TEXT,
    FOREIGN KEY (log_id) REFERENCES audit_logs(log_id) ON DELETE CASCADE
);

-- Audit log changes (already in BCNF)
CREATE TABLE audit_log_changes (
    change_id VARCHAR(128) PRIMARY KEY,
    log_id VARCHAR(128) NOT NULL,
    field VARCHAR(100) NOT NULL,
    old_value TEXT,
    new_value TEXT,
    FOREIGN KEY (log_id) REFERENCES audit_logs(log_id) ON DELETE CASCADE
);

-- ============================================================================
-- NOTIFICATIONS
-- ============================================================================

CREATE TABLE notifications (
    notification_id VARCHAR(128) PRIMARY KEY,
    user_id VARCHAR(128) NOT NULL,
    type VARCHAR(30) NOT NULL,
    title VARCHAR(255) NOT NULL,
    body TEXT NOT NULL,
    is_read BOOLEAN DEFAULT FALSE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES users(uid) ON DELETE CASCADE,
    CHECK (type IN ('event_invite', 'role_change', 'hall_approved', 
                    'hall_rejected', 'mention', 'announcement'))
);

-- Decompose notification action
CREATE TABLE notification_action (
    notification_id VARCHAR(128) PRIMARY KEY,
    action_url TEXT,
    action_label VARCHAR(100),
    FOREIGN KEY (notification_id) REFERENCES notifications(notification_id) ON DELETE CASCADE
);

-- Decompose notification context
CREATE TABLE notification_context (
    notification_id VARCHAR(128) PRIMARY KEY,
    related_type VARCHAR(20),
    related_id VARCHAR(128),
    FOREIGN KEY (notification_id) REFERENCES notifications(notification_id) ON DELETE CASCADE,
    CHECK (related_type IN ('event', 'club', 'hall_request'))
);

-- Decompose notification read status
CREATE TABLE notification_read_status (
    notification_id VARCHAR(128) PRIMARY KEY,
    read_at TIMESTAMP,
    FOREIGN KEY (notification_id) REFERENCES notifications(notification_id) ON DELETE CASCADE
);

-- ============================================================================
-- ROLE TYPES (Already in BCNF)
-- ============================================================================

CREATE TABLE role_types (
    role_id VARCHAR(128) PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    slug VARCHAR(50) UNIQUE NOT NULL,
    description TEXT,
    level INT NOT NULL,
    scope VARCHAR(20),
    CHECK (scope IN ('platform', 'college', 'club', 'city_community'))
);

-- Decompose role permissions
CREATE TABLE role_permissions (
    role_id VARCHAR(128) PRIMARY KEY,
    can_manage_members BOOLEAN DEFAULT FALSE,
    can_create_events BOOLEAN DEFAULT FALSE,
    can_edit_club BOOLEAN DEFAULT FALSE,
    can_delete_events BOOLEAN DEFAULT FALSE,
    can_approve_halls BOOLEAN DEFAULT FALSE,
    can_view_analytics BOOLEAN DEFAULT FALSE,
    can_manage_roles BOOLEAN DEFAULT FALSE,
    FOREIGN KEY (role_id) REFERENCES role_types(role_id) ON DELETE CASCADE
);
