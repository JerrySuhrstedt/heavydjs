-- Lead capture storage for heavydjs.com
-- Apply with:
--   npx wrangler d1 execute heavydjs-leads --remote --file=./schema.sql

CREATE TABLE IF NOT EXISTS leads (
  id          INTEGER PRIMARY KEY AUTOINCREMENT,
  name        TEXT NOT NULL,
  email       TEXT NOT NULL,
  event_date  TEXT,
  message     TEXT,
  source      TEXT,             -- which page the form was submitted from
  created_at  TEXT NOT NULL DEFAULT (datetime('now')),
  notified    INTEGER NOT NULL DEFAULT 0  -- 1 once the notification email sent
);

CREATE INDEX IF NOT EXISTS idx_leads_created_at ON leads (created_at DESC);
CREATE INDEX IF NOT EXISTS idx_leads_email ON leads (email);
