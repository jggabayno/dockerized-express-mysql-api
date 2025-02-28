CREATE TABLE validation_rules (
    id       BIGINT(20) NOT NULL AUTO_INCREMENT,
    field_id INT,
    validation_type VARCHAR(255) NOT NULL,
    validation_value INT, -- Assuming validation_value is an integer; you can adjust the data type as needed
    validation_pattern VARCHAR(255), -- Assuming validation_pattern is a VARCHAR; adjust data type if needed
    validation_message VARCHAR(255) NOT NULL,
    created_at    TIMESTAMP NULL,
    updated_at    TIMESTAMP NULL,
    deleted_at    TIMESTAMP NULL,
    PRIMARY KEY (id)
    -- Define a foreign key constraint to reference the FormFields table
    -- FOREIGN KEY (field_id) REFERENCES form_fields(field_id)
)