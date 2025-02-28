# Validation Rules Storage

## Overview
To store JSON configuration for validation rules in a database, you can create two tables:
- **FormFields**: Stores form field details.
- **ValidationRules**: Stores validation rules associated with form fields.

## Database Schema

### FormFields Table
This table stores information about the fields you want to validate. Each row represents a form field.

| Column      | Type         | Description                                      |
|------------|------------|--------------------------------------------------|
| field_id   | Primary Key | A unique identifier for each form field.        |
| field_name | String      | The name or identifier of the form field (e.g., "username"). |
| field_type | String      | The type of the form field (e.g., "text").      |

### ValidationRules Table
This table stores the validation rules for each form field. Each row represents a validation rule.

| Column             | Type         | Description                                                    |
|-------------------|------------|----------------------------------------------------------------|
| rule_id          | Primary Key | A unique identifier for each validation rule.                  |
| field_id         | Foreign Key | References `field_id` in the FormFields table.                 |
| validation_type  | String      | The type of validation rule (e.g., "required").                |
| validation_value | Integer     | The value associated with the validation rule (e.g., `6` for minLength). |
| validation_pattern | String  | The regular expression pattern (if applicable).                |
| validation_message | String  | The error message displayed when the rule is not met.         |

## Example Data

### FormFields Table
| field_id | field_name | field_type |
|----------|------------|------------|
| 1        | username   | text       |

### ValidationRules Table
| rule_id | field_id | validation_type | validation_value | validation_pattern | validation_message                            |
|---------|----------|-----------------|------------------|--------------------|----------------------------------------------|
| 1       | 1        | required        | null             | null               | Username is required.                        |
| 2       | 1        | minLength       | 6                | null               | Username must be at least 6 characters long. |
| 3       | 1        | maxLength       | 20               | null               | Username cannot exceed 20 characters.        |
| 4       | 1        | regex           | null             | ^[a-zA-Z0-9]+$     | Username can only contain letters and numbers. |

## Usage
- Store form field configurations in the `FormFields` table.
- Define validation rules in the `ValidationRules` table.
- Query the database to retrieve validation settings dynamically.

This approach ensures structured, scalable, and flexible validation management in your application.

