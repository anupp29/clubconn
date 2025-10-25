-- ============================================
-- Database Triggers
-- ============================================

USE clubconn;

DELIMITER $$

-- Trigger: Update club member count after insert
CREATE TRIGGER trg_club_members_after_insert
AFTER INSERT ON club_members
FOR EACH ROW
BEGIN
    IF NEW.is_active = TRUE THEN
        UPDATE clubs
        SET member_count = member_count + 1
        WHERE club_id = NEW.club_id;
    END IF;
END$$

-- Trigger: Update club member count after update
CREATE TRIGGER trg_club_members_after_update
AFTER UPDATE ON club_members
FOR EACH ROW
BEGIN
    IF OLD.is_active = TRUE AND NEW.is_active = FALSE THEN
        UPDATE clubs
        SET member_count = member_count - 1
        WHERE club_id = NEW.club_id;
    ELSEIF OLD.is_active = FALSE AND NEW.is_active = TRUE THEN
        UPDATE clubs
        SET member_count = member_count + 1
        WHERE club_id = NEW.club_id;
    END IF;
END$$

-- Trigger: Update club member count after delete
CREATE TRIGGER trg_club_members_after_delete
AFTER DELETE ON club_members
FOR EACH ROW
BEGIN
    IF OLD.is_active = TRUE THEN
        UPDATE clubs
        SET member_count = member_count - 1
        WHERE club_id = OLD.club_id;
    END IF;
END$$

-- Trigger: Update user total points after points history insert
CREATE TRIGGER trg_points_history_after_insert
AFTER INSERT ON points_history
FOR EACH ROW
BEGIN
    UPDATE users
    SET total_points = total_points + NEW.points_earned
    WHERE user_id = NEW.user_id;
END$$

-- Trigger: Check badge criteria and auto-award
CREATE TRIGGER trg_check_badge_criteria_after_points
AFTER INSERT ON points_history
FOR EACH ROW
BEGIN
    DECLARE done INT DEFAULT FALSE;
    DECLARE v_badge_id BIGINT;
    DECLARE v_points_required INT;
    DECLARE v_user_points INT;
    
    DECLARE badge_cursor CURSOR FOR
        SELECT badge_id, points_required
        FROM badges
        WHERE is_active = TRUE
        AND criteria_type = 'total_points'
        AND badge_id NOT IN (
            SELECT badge_id FROM user_badges 
            WHERE user_id = NEW.user_id AND is_unlocked = TRUE
        );
    
    DECLARE CONTINUE HANDLER FOR NOT FOUND SET done = TRUE;
    
    -- Get user's current points
    SELECT total_points INTO v_user_points
    FROM users WHERE user_id = NEW.user_id;
    
    OPEN badge_cursor;
    
    read_loop: LOOP
        FETCH badge_cursor INTO v_badge_id, v_points_required;
        IF done THEN
            LEAVE read_loop;
        END IF;
        
        -- Award badge if criteria met
        IF v_user_points >= v_points_required THEN
            INSERT INTO user_badges (user_id, badge_id, is_unlocked, progress)
            VALUES (NEW.user_id, v_badge_id, TRUE, 100)
            ON DUPLICATE KEY UPDATE is_unlocked = TRUE, progress = 100;
            
            -- Add activity
            INSERT INTO activity_feed (user_id, activity_type, reference_type, reference_id, activity_text)
            SELECT NEW.user_id, 'badge_earned', 'badge', v_badge_id,
                   CONCAT('Earned badge: ', badge_name)
            FROM badges WHERE badge_id = v_badge_id;
        END IF;
    END LOOP;
    
    CLOSE badge_cursor;
END$$

-- Trigger: Create notification for new event RSVP
CREATE TRIGGER trg_event_rsvp_notification
AFTER INSERT ON event_rsvps
FOR EACH ROW
BEGIN
    INSERT INTO notifications (user_id, notification_type, title, message, reference_type, reference_id)
    SELECT 
        NEW.user_id,
        'rsvp_confirmation',
        'Event Registration Confirmed',
        CONCAT('You have successfully registered for ', e.event_name),
        'event',
        NEW.event_id
    FROM events e
    WHERE e.event_id = NEW.event_id;
END$$

-- Trigger: Send event reminder notification
CREATE TRIGGER trg_event_reminder
AFTER UPDATE ON events
FOR EACH ROW
BEGIN
    -- Send reminder 24 hours before event
    IF TIMESTAMPDIFF(HOUR, NOW(), NEW.start_date) = 24 
       AND OLD.status = 'published' AND NEW.status = 'published' THEN
        
        INSERT INTO notifications (user_id, notification_type, title, message, reference_type, reference_id)
        SELECT 
            er.user_id,
            'event_reminder',
            'Event Starting Tomorrow',
            CONCAT(NEW.event_name, ' starts tomorrow at ', DATE_FORMAT(NEW.start_date, '%h:%i %p')),
            'event',
            NEW.event_id
        FROM event_rsvps er
        WHERE er.event_id = NEW.event_id 
        AND er.status = 'registered';
    END IF;
END$$

-- Trigger: Audit log for user updates
CREATE TRIGGER trg_users_audit_update
AFTER UPDATE ON users
FOR EACH ROW
BEGIN
    INSERT INTO audit_log (user_id, action, table_name, record_id, old_values, new_values)
    VALUES (
        NEW.user_id,
        'UPDATE',
        'users',
        NEW.user_id,
        JSON_OBJECT(
            'email', OLD.email,
            'full_name', OLD.full_name,
            'total_points', OLD.total_points,
            'user_type', OLD.user_type
        ),
        JSON_OBJECT(
            'email', NEW.email,
            'full_name', NEW.full_name,
            'total_points', NEW.total_points,
            'user_type', NEW.user_type
        )
    );
END$$

-- Trigger: Prevent deletion of events with RSVPs
CREATE TRIGGER trg_prevent_event_deletion
BEFORE DELETE ON events
FOR EACH ROW
BEGIN
    DECLARE v_rsvp_count INT;
    
    SELECT COUNT(*) INTO v_rsvp_count
    FROM event_rsvps
    WHERE event_id = OLD.event_id;
    
    IF v_rsvp_count > 0 THEN
        SIGNAL SQLSTATE '45000'
        SET MESSAGE_TEXT = 'Cannot delete event with existing RSVPs. Please cancel the event instead.';
    END IF;
END$$

-- Trigger: Update event status based on dates
CREATE TRIGGER trg_update_event_status
BEFORE UPDATE ON events
FOR EACH ROW
BEGIN
    IF NEW.start_date <= NOW() AND NEW.end_date >= NOW() AND NEW.status = 'published' THEN
        SET NEW.status = 'ongoing';
    ELSEIF NEW.end_date < NOW() AND NEW.status IN ('published', 'ongoing') THEN
        SET NEW.status = 'completed';
    END IF;
END$$

DELIMITER ;
