-- ============================================
-- Stored Procedures
-- ============================================

USE clubconn;

DELIMITER $$

-- Procedure: Register User for Event
CREATE PROCEDURE sp_register_for_event(
    IN p_event_id BIGINT UNSIGNED,
    IN p_user_id BIGINT UNSIGNED,
    IN p_payment_amount DECIMAL(10,2),
    OUT p_result VARCHAR(100)
)
BEGIN
    DECLARE v_max_participants INT;
    DECLARE v_current_participants INT;
    DECLARE v_registration_end DATETIME;
    DECLARE v_existing_rsvp INT;
    
    DECLARE EXIT HANDLER FOR SQLEXCEPTION
    BEGIN
        ROLLBACK;
        SET p_result = 'ERROR: Registration failed';
    END;
    
    START TRANSACTION;
    
    -- Check if event exists and get details
    SELECT max_participants, current_participants, registration_end
    INTO v_max_participants, v_current_participants, v_registration_end
    FROM events
    WHERE event_id = p_event_id AND status = 'published'
    FOR UPDATE;
    
    -- Validate registration
    IF v_registration_end < NOW() THEN
        SET p_result = 'ERROR: Registration period has ended';
        ROLLBACK;
    ELSEIF v_current_participants >= v_max_participants THEN
        SET p_result = 'ERROR: Event is full';
        ROLLBACK;
    ELSE
        -- Check for existing registration
        SELECT COUNT(*) INTO v_existing_rsvp
        FROM event_rsvps
        WHERE event_id = p_event_id AND user_id = p_user_id;
        
        IF v_existing_rsvp > 0 THEN
            SET p_result = 'ERROR: Already registered';
            ROLLBACK;
        ELSE
            -- Insert RSVP
            INSERT INTO event_rsvps (event_id, user_id, status, payment_amount, payment_status)
            VALUES (p_event_id, p_user_id, 'registered', p_payment_amount, 
                    IF(p_payment_amount > 0, 'pending', 'completed'));
            
            -- Update event participant count
            UPDATE events 
            SET current_participants = current_participants + 1
            WHERE event_id = p_event_id;
            
            -- Add activity
            INSERT INTO activity_feed (user_id, activity_type, reference_type, reference_id, activity_text)
            SELECT p_user_id, 'event_rsvp', 'event', p_event_id,
                   CONCAT('Registered for ', event_name)
            FROM events WHERE event_id = p_event_id;
            
            COMMIT;
            SET p_result = 'SUCCESS: Registration completed';
        END IF;
    END IF;
END$$

-- Procedure: Mark Event Attendance
CREATE PROCEDURE sp_mark_attendance(
    IN p_event_id BIGINT UNSIGNED,
    IN p_user_id BIGINT UNSIGNED,
    IN p_points_reward INT,
    OUT p_result VARCHAR(100)
)
BEGIN
    DECLARE v_rsvp_exists INT;
    
    DECLARE EXIT HANDLER FOR SQLEXCEPTION
    BEGIN
        ROLLBACK;
        SET p_result = 'ERROR: Failed to mark attendance';
    END;
    
    START TRANSACTION;
    
    -- Check if RSVP exists
    SELECT COUNT(*) INTO v_rsvp_exists
    FROM event_rsvps
    WHERE event_id = p_event_id AND user_id = p_user_id;
    
    IF v_rsvp_exists = 0 THEN
        SET p_result = 'ERROR: No registration found';
        ROLLBACK;
    ELSE
        -- Update RSVP status
        UPDATE event_rsvps
        SET status = 'attended',
            attendance_marked_at = NOW()
        WHERE event_id = p_event_id AND user_id = p_user_id;
        
        -- Award points
        IF p_points_reward > 0 THEN
            UPDATE users
            SET total_points = total_points + p_points_reward
            WHERE user_id = p_user_id;
            
            INSERT INTO points_history (user_id, points_earned, points_type, reference_type, reference_id, description)
            SELECT p_user_id, p_points_reward, 'event_participation', 'event', p_event_id,
                   CONCAT('Attended ', event_name)
            FROM events WHERE event_id = p_event_id;
        END IF;
        
        -- Add activity
        INSERT INTO activity_feed (user_id, activity_type, reference_type, reference_id, activity_text)
        SELECT p_user_id, 'event_attended', 'event', p_event_id,
               CONCAT('Attended ', event_name)
        FROM events WHERE event_id = p_event_id;
        
        COMMIT;
        SET p_result = 'SUCCESS: Attendance marked';
    END IF;
END$$

-- Procedure: Award Badge to User
CREATE PROCEDURE sp_award_badge(
    IN p_user_id BIGINT UNSIGNED,
    IN p_badge_id BIGINT UNSIGNED,
    OUT p_result VARCHAR(100)
)
BEGIN
    DECLARE v_badge_exists INT;
    DECLARE v_badge_name VARCHAR(255);
    
    DECLARE EXIT HANDLER FOR SQLEXCEPTION
    BEGIN
        ROLLBACK;
        SET p_result = 'ERROR: Failed to award badge';
    END;
    
    START TRANSACTION;
    
    -- Check if badge already awarded
    SELECT COUNT(*) INTO v_badge_exists
    FROM user_badges
    WHERE user_id = p_user_id AND badge_id = p_badge_id AND is_unlocked = TRUE;
    
    IF v_badge_exists > 0 THEN
        SET p_result = 'ERROR: Badge already awarded';
        ROLLBACK;
    ELSE
        -- Get badge name
        SELECT badge_name INTO v_badge_name
        FROM badges WHERE badge_id = p_badge_id;
        
        -- Award badge
        INSERT INTO user_badges (user_id, badge_id, is_unlocked, progress)
        VALUES (p_user_id, p_badge_id, TRUE, 100)
        ON DUPLICATE KEY UPDATE is_unlocked = TRUE, progress = 100, earned_at = NOW();
        
        -- Add activity
        INSERT INTO activity_feed (user_id, activity_type, reference_type, reference_id, activity_text)
        VALUES (p_user_id, 'badge_earned', 'badge', p_badge_id,
                CONCAT('Earned badge: ', v_badge_name));
        
        -- Create notification
        INSERT INTO notifications (user_id, notification_type, title, message, reference_type, reference_id)
        VALUES (p_user_id, 'badge_earned', 'New Badge Earned!',
                CONCAT('Congratulations! You earned the ', v_badge_name, ' badge.'),
                'badge', p_badge_id);
        
        COMMIT;
        SET p_result = 'SUCCESS: Badge awarded';
    END IF;
END$$

-- Procedure: Issue Certificate
CREATE PROCEDURE sp_issue_certificate(
    IN p_user_id BIGINT UNSIGNED,
    IN p_event_id BIGINT UNSIGNED,
    IN p_certificate_type VARCHAR(50),
    IN p_title VARCHAR(255),
    IN p_issued_by BIGINT UNSIGNED,
    OUT p_certificate_number VARCHAR(100),
    OUT p_result VARCHAR(100)
)
BEGIN
    DECLARE v_verification_code VARCHAR(100);
    
    DECLARE EXIT HANDLER FOR SQLEXCEPTION
    BEGIN
        ROLLBACK;
        SET p_result = 'ERROR: Failed to issue certificate';
    END;
    
    START TRANSACTION;
    
    -- Generate certificate number and verification code
    SET p_certificate_number = CONCAT('CERT-', YEAR(NOW()), '-', LPAD(FLOOR(RAND() * 999999), 6, '0'));
    SET v_verification_code = CONCAT('VER-', MD5(CONCAT(p_user_id, p_event_id, NOW())));
    
    -- Insert certificate
    INSERT INTO certificates (
        certificate_number, user_id, event_id, certificate_type,
        title, issued_date, verification_code, issued_by
    ) VALUES (
        p_certificate_number, p_user_id, p_event_id, p_certificate_type,
        p_title, CURDATE(), v_verification_code, p_issued_by
    );
    
    -- Add activity
    INSERT INTO activity_feed (user_id, activity_type, reference_type, reference_id, activity_text)
    VALUES (p_user_id, 'certificate_received', 'certificate', LAST_INSERT_ID(),
            CONCAT('Received certificate: ', p_title));
    
    -- Create notification
    INSERT INTO notifications (user_id, notification_type, title, message, reference_type, reference_id)
    VALUES (p_user_id, 'certificate_issued', 'Certificate Issued',
            CONCAT('Your certificate for "', p_title, '" has been issued.'),
            'certificate', LAST_INSERT_ID());
    
    COMMIT;
    SET p_result = 'SUCCESS: Certificate issued';
END$$

-- Procedure: Get User Dashboard Stats
CREATE PROCEDURE sp_get_user_dashboard_stats(
    IN p_user_id BIGINT UNSIGNED
)
BEGIN
    SELECT 
        u.total_points,
        COUNT(DISTINCT cm.club_id) AS clubs_joined,
        COUNT(DISTINCT er.event_id) AS events_registered,
        COUNT(DISTINCT CASE WHEN er.status = 'attended' THEN er.event_id END) AS events_attended,
        COUNT(DISTINCT ub.badge_id) AS badges_earned,
        COUNT(DISTINCT cert.certificate_id) AS certificates_earned,
        COUNT(DISTINCT ev.event_id) AS volunteer_activities,
        (SELECT rank_position FROM v_leaderboard WHERE user_id = p_user_id) AS leaderboard_rank
    FROM users u
    LEFT JOIN club_members cm ON u.user_id = cm.user_id AND cm.is_active = TRUE
    LEFT JOIN event_rsvps er ON u.user_id = er.user_id
    LEFT JOIN user_badges ub ON u.user_id = ub.user_id AND ub.is_unlocked = TRUE
    LEFT JOIN certificates cert ON u.user_id = cert.user_id
    LEFT JOIN event_volunteers ev ON u.user_id = ev.user_id AND ev.status = 'approved'
    WHERE u.user_id = p_user_id
    GROUP BY u.user_id;
END$$

DELIMITER ;
