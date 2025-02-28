CREATE TABLE form_fields (
    id         BIGINT(20) NOT NULL AUTO_INCREMENT,
    field_name VARCHAR(255) NOT NULL,
    field_label VARCHAR(255) NOT NULL,
    field_placeholder VARCHAR(255) NOT NULL,
    field_type VARCHAR(255) NOT NULL,
    created_at    TIMESTAMP NULL,
    updated_at    TIMESTAMP NULL,
    deleted_at    TIMESTAMP NULL,
    PRIMARY KEY (id),
    CONSTRAINT unique_field_name UNIQUE (field_name),
    CONSTRAINT unique_field_label UNIQUE (field_label),
    CONSTRAINT unique_field_placeholder UNIQUE (field_placeholder)
)