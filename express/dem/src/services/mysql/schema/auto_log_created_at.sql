CREATE TRIGGER auto_log_created_at BEFORE INSERT ON logs 
FOR EACH ROW SET NEW.created_at = NOW()