CREATE TRIGGER auto_user_created_at BEFORE INSERT ON users 
FOR EACH ROW SET NEW.created_at = NOW()