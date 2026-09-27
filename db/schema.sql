-- Leads captured from the site's quote-request forms (hero embed + popup).
-- Run once against the Neon database. Safe to re-run (IF NOT EXISTS).
CREATE TABLE IF NOT EXISTS leads (
  id BIGSERIAL PRIMARY KEY,
  name TEXT NOT NULL,
  email TEXT NOT NULL,
  phone TEXT,
  event_date DATE,
  event_type TEXT,
  location TEXT,
  message TEXT,
  -- Which page the form was submitted from (e.g. /ultimate-wedding-dj-mesa-az/)
  -- Tally never gave us this; worth keeping now that it's easy.
  source_page TEXT,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

CREATE INDEX IF NOT EXISTS leads_created_at_idx ON leads (created_at DESC);

-- Why the notification email did or didn't go out, for debugging.
ALTER TABLE leads ADD COLUMN IF NOT EXISTS notify_status TEXT;
