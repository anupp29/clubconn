-- ============================================
-- User-Defined Functions
-- ============================================

USE clubconn;

DELIMITER $$

-- Function: Calculate User Level based on points
CREATE FUNCTION fn_calculate_user_level(p_total_points INT)
RETURNS VARCHAR(20)
DETERMINISTIC
BEGIN
    DECLARE v_level VARCHAR(20);
    
    CASE
        WHEN p_total_points >= 10000 THEN SET v_level = 'Legend';
        WHEN p_total_points >= 5000 THEN SET v_level = 'Master';
        WHEN p_total_points >= 2500 THEN SET v_level = 'Expert';
        WHEN p_total_points >= 1000 THEN SET v_level = 'Advanced';
        WHEN p_total_points >= 500 THEN SET v_level = 'Intermediate';
        WHEN p_total_points >= 100 THEN SET v_level = 'Beginner';
        ELSE SET v_level = 'Novice';
    END CASE;
    
    RETURN v_level;
END$$

-- Function: Get Event Capacity Status
CREATE FUNCTION fn_event_capacity_status(
    p_current_participants INT,
    p_max_participants INT
)
RETURNS VARCHAR(20)
DETERMINISTIC
BEGIN
    DECLARE v_percentage DECIMAL(5,2);
    DECLARE v_status VARCHAR(20);
    
    IF p_max_participants = 0 THEN
        RETURN 'Unlimited';
    END IF;
    
    SET v_percentage = (p_current_participants * 100.0) / p_max_participants;
    
    CASE
        WHEN v_percentage >= 100 THEN SET v_status = 'Full';
        WHEN v_percentage >= 90 THEN SET v_status = 'Almost Full';
        WHEN v_percentage >= 50 THEN SET v_status = 'Filling Fast';
        ELSE SET v_status = 'Available';
    END CASE;
    
    RETURN v_status;
END$$

-- Function: Calculate Badge Progress
CREATE FUNCTION fn_calculate_badge_progress(
    p_user_id BIGINT,
    p_badge_id BIGINT
)
RETURNS INT
READS SQL DATA
BEGIN
    DECLARE v_criteria_type VARCHAR(50);
    DECLARE v_criteria_value INT;
    DECLARE v_current_value INT;
    DECLARE v_progress INT;
    
    -- Get badge criteria
    SELECT criteria_type, criteria_value
    INTO v_criteria_type, v_criteria_value
    FROM badges
    WHERE badge_id = p_badge_id;
    
    -- Calculate current value based on criteria type
    CASE v_criteria_type
        WHEN 'events_attended' THEN
            SELECT COUNT(*) INTO v_current_value
            FROM event_rsvps
            WHERE user_id = p_user_id AND status = 'attended';
        WHEN 'clubs_joined' THEN
            SELECT COUNT(*) INTO v_current_value
            FROM club_members
            WHERE user_id = p_user_id AND is_active = TRUE;
        WHEN 'total_points' THEN
            SELECT total_points INTO v_current_value
            FROM users
            WHERE user_id = p_user_id;
        WHEN 'volunteer_hours' THEN
            SELECT COALESCE(SUM(hours_contributed), 0) INTO v_current_value
            FROM event_volunteers
            WHERE user_id = p_user_id AND status = 'completed';
        ELSE
            SET v_current_value = 0;
    END CASE;
    
    -- Calculate progress percentage
    SET v_progress = LEAST(100, ROUND((v_current_value * 100.0) / v_criteria_value));
    
    RETURN v_progress;
END$$

-- Function: Generate Unique Event Slug
CREATE FUNCTION fn_generate_event_slug(
    p_club_id BIGINT,
    p_event_name VARCHAR(255)
)
RETURNS VARCHAR(255)
READS SQL DATA
BEGIN
    DECLARE v_base_slug VARCHAR(255);
    DECLARE v_slug VARCHAR(255);
    DECLARE v_counter INT DEFAULT 1;
    DECLARE v_exists INT;
    
    -- Create base slug from event name
    SET v_base_slug = LOWER(TRIM(p_event_name));
    SET v_base_slug = REPLACE(v_base_slug, ' ', '-');
    SET v_base_slug = REGEXP_REPLACE(v_base_slug, '[^a-z0-9-]', '');
    SET v_slug = v_base_slug;
    
    -- Check if slug exists and add counter if needed
    WHILE TRUE DO
        SELECT COUNT(*) INTO v_exists
        FROM events
        WHERE club_id = p_club_id AND slug = v_slug;
        
        IF v_exists = 0 THEN
            RETURN v_slug;
        END IF;
        
        SET v_slug = CONCAT(v_base_slug, '-', v_counter);
        SET v_counter = v_counter + 1;
    END WHILE;
END$$

-- Function: Calculate Event Attendance Rate
CREATE FUNCTION fn_event_attendance_rate(p_event_id BIGINT)
RETURNS DECIMAL(5,2)
READS SQL DATA
BEGIN
    DECLARE v_registered INT;
    DECLARE v_attended INT;
    DECLARE v_rate DECIMAL(5,2);
    
    SELECT 
        COUNT(*),
        COUNT(CASE WHEN status = 'attended' THEN 1 END)
    INTO v_registered, v_attended
    FROM event_rsvps
    WHERE event_id = p_event_id;
    
    IF v_registered = 0 THEN
        RETURN 0.00;
    END IF;
    
    SET v_rate = (v_attended * 100.0) / v_registered;
    RETURN v_rate;
END$$

DELIMITER ;
