const statements = {
    SELECT_USERS: 'SELECT * FROM users ORDER BY created_at DESC LIMIT ?',
    SELECT_USER: 'SELECT * FROM users WHERE (id = ? OR email = ?)',
    CREATE_USER: 'INSERT INTO users (photo, first_name, last_name, email, mobile_number, password, role) VALUES (?, ?, ?, ?, ?, ?, ?)',
    UPDATE_USER: 'UPDATE users SET photo = ?, first_name = ?, last_name = ?, email = ?, mobile_number = ?, role = ? WHERE id = ?',
    DELETE_USER: 'UPDATE users SET deleted_at = NOW() WHERE id = ?',
    SELECT_LOGS: 'SELECT * FROM logs ORDER BY created_at DESC',
    SELECT_LOG: 'SELECT * FROM logs WHERE id = ?',
    CREATE_LOG: 'INSERT INTO logs (module, content, author_id) VALUES (?, ?, ?)',
    SELECT_FORM_FIELDS: 'SELECT * FROM form_fields ORDER BY created_at DESC LIMIT ?',
    CREATE_FORM_FIELD: 'INSERT INTO form_fields (field_name, field_label, field_placeholder, field_type) VALUES (?, ?, ?, ?)',
    SELECT_VALIDATION_RULES: 'SELECT * FROM validation_rules ORDER BY created_at DESC LIMIT ?',
    CREATE_VALIDATION_RULE: 'INSERT INTO validation_rules (field_id, validation_type, validation_value, validation_pattern, validation_message) VALUES (?, ?, ?, ?, ?)',
}

export default statements