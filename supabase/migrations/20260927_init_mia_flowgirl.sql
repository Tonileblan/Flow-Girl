-- ==============================================================================
-- MIGRACIÓN SUPABASE: ESQUEMA AISLADO mia_flowgirl (BY TONI)
-- ==============================================================================

CREATE SCHEMA IF NOT EXISTS mia_flowgirl;
GRANT USAGE ON SCHEMA mia_flowgirl TO anon, authenticated, service_role, authenticator;
GRANT ALL ON ALL TABLES IN SCHEMA mia_flowgirl TO anon, authenticated, service_role, authenticator;
GRANT ALL ON ALL SEQUENCES IN SCHEMA mia_flowgirl TO anon, authenticated, service_role, authenticator;
ALTER DEFAULT PRIVILEGES IN SCHEMA mia_flowgirl GRANT ALL ON TABLES TO anon, authenticated, service_role, authenticator;

CREATE TABLE IF NOT EXISTS mia_flowgirl.cycles (
  id TEXT PRIMARY KEY,
  start_date DATE NOT NULL,
  end_date DATE,
  cycle_length INTEGER,
  period_length INTEGER,
  notes TEXT,
  created_at TIMESTAMPTZ DEFAULT now()
);

CREATE TABLE IF NOT EXISTS mia_flowgirl.daily_logs (
  id TEXT PRIMARY KEY,
  date DATE NOT NULL,
  phase TEXT,
  mood TEXT,
  energy_level INTEGER,
  symptoms JSONB DEFAULT '[]'::jsonb,
  hot_flash_count INTEGER DEFAULT 0,
  notes TEXT,
  created_at TIMESTAMPTZ DEFAULT now()
);

ALTER TABLE mia_flowgirl.cycles ENABLE ROW LEVEL SECURITY;
ALTER TABLE mia_flowgirl.daily_logs ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "Allow all for cycles" ON mia_flowgirl.cycles;
DROP POLICY IF EXISTS "Allow all for daily_logs" ON mia_flowgirl.daily_logs;

CREATE POLICY "Allow all for cycles" ON mia_flowgirl.cycles FOR ALL USING (true) WITH CHECK (true);
CREATE POLICY "Allow all for daily_logs" ON mia_flowgirl.daily_logs FOR ALL USING (true) WITH CHECK (true);
