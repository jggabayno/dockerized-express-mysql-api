CREATE TRIGGER auto_log_updated_at BEFORE UPDATE ON logs 
FOR EACH ROW SET NEW.updated_at = NOW()