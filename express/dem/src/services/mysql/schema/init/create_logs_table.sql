CREATE TABLE IF NOT EXISTS logs (
  id            BIGINT(20) NOT NULL AUTO_INCREMENT,
  module        VARCHAR(20) NULL,
  content       VARCHAR(255) NOT NULL,
  author_id     BIGINT(20) NOT NULL,
  created_at    TIMESTAMP NULL,
  updated_at    TIMESTAMP NULL,
  deleted_at    TIMESTAMP NULL,
  PRIMARY KEY (id)
)