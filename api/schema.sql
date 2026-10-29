-- Lead Queue Schema for OKELAS
-- Run this in Supabase SQL Editor: https://supabase.com/dashboard → SQL Editor

CREATE TABLE IF NOT EXISTS leads (
  id              UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  submission_id   TEXT,
  assessment_id   TEXT NOT NULL,
  org_name        TEXT,
  role            TEXT,
  fullname        TEXT,
  contact         TEXT,
  email           TEXT,
  language        TEXT NOT NULL DEFAULT 'vi',
  status          TEXT NOT NULL DEFAULT 'PENDING',  -- PENDING | PROCESSED
  created_at      TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  processed_at    TIMESTAMPTZ,
  -- Assessment result context (for Telegram alert & CRM context)
  assessment_level    INTEGER,
  assessment_label    TEXT,
  assessment_archetype TEXT,
  -- UTM attribution
  utm_source      TEXT,
  utm_medium      TEXT,
  utm_campaign    TEXT
);

-- Index for the internal polling query (status + chronological order)
CREATE INDEX IF NOT EXISTS leads_status_created ON leads (status, created_at ASC);

-- Row Level Security: block public reads/writes; service role key bypasses RLS
ALTER TABLE leads ENABLE ROW LEVEL SECURITY;
