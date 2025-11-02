-- k8s/init_db.sql
CREATE EXTENSION IF NOT EXISTS pgcrypto;

CREATE TABLE IF NOT EXISTS users (
  id SERIAL PRIMARY KEY,
  username VARCHAR(50) UNIQUE NOT NULL,
  password VARCHAR(255) NOT NULL,
  full_name VARCHAR(100),
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- user demo: username=admin password=admin
INSERT INTO users (username, password, full_name)
VALUES ('admin', 'admin', 'Administrator')
ON CONFLICT (username) DO NOTHING;
