CREATE TABLE IF NOT EXISTS tickets (
  id SERIAL PRIMARY KEY,
  body TEXT NOT NULL,
  category TEXT,
  priority TEXT,
  confidence REAL,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);