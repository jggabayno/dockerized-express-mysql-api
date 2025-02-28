CREATE TABLE IF NOT EXISTS users (
  id            BIGINT(20) NOT NULL AUTO_INCREMENT,
  photo         VARCHAR(20) NULL,
  first_name    VARCHAR(20) NOT NULL,
  last_name     VARCHAR(20) NOT NULL,
  email         VARCHAR(50) NOT NULL,
  mobile_number VARCHAR(20) NOT NULL,
  password      VARCHAR(100) NOT NULL,
  role          VARCHAR(20) NOT NULL,
  created_at    TIMESTAMP NULL,
  updated_at    TIMESTAMP NULL,
  deleted_at    TIMESTAMP NULL,
  PRIMARY KEY (id),
  CONSTRAINT unique_user_email UNIQUE (email),
  CONSTRAINT unique_user_mobile_number UNIQUE (mobile_number),
  CONSTRAINT unique_user_name UNIQUE (first_name, last_name)
)