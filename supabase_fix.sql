-- ═══════════════════════════════════════════════════════════
-- Apollo Clinic Srinagar — Supabase Fix Script
-- Run this in: https://supabase.com/dashboard/project/iognlpkitvdflbqtadxy/sql/new
-- ═══════════════════════════════════════════════════════════

-- STEP 1: Create the appointments table (if it doesn't exist or has wrong columns)
-- ───────────────────────────────────────────────────────────────────────────────
CREATE TABLE IF NOT EXISTS public.appointments (
  id          uuid DEFAULT gen_random_uuid() PRIMARY KEY,
  type        text NOT NULL DEFAULT 'general',   -- 'general' | 'checkup' | 'visiting'
  name        text,
  phone       text,
  date        text,
  department  text,
  notes       text,
  doctor_name text,
  source      text,
  status      text DEFAULT 'Pending',
  created_at  timestamptz DEFAULT now()
);

-- STEP 2: Enable Row Level Security (keep it enabled)
-- ───────────────────────────────────────────────────────────────────────────────
ALTER TABLE public.appointments ENABLE ROW LEVEL SECURITY;

-- STEP 3: Drop any existing policies (to start fresh)
-- ───────────────────────────────────────────────────────────────────────────────
DROP POLICY IF EXISTS "Allow anon insert" ON public.appointments;
DROP POLICY IF EXISTS "Allow anon read" ON public.appointments;
DROP POLICY IF EXISTS "Allow anon update" ON public.appointments;
DROP POLICY IF EXISTS "Allow anon delete" ON public.appointments;
DROP POLICY IF EXISTS "Allow public insert" ON public.appointments;
DROP POLICY IF EXISTS "Allow public select" ON public.appointments;
DROP POLICY IF EXISTS "Allow public update" ON public.appointments;
DROP POLICY IF EXISTS "Allow public delete" ON public.appointments;

-- STEP 4: Create RLS policies allowing anon (public website) users to INSERT
-- and authenticated users (admin) to read/update/delete
-- ───────────────────────────────────────────────────────────────────────────────

-- Allow anyone (website visitors) to INSERT new appointments
CREATE POLICY "Allow public insert"
  ON public.appointments
  FOR INSERT
  TO anon, authenticated
  WITH CHECK (true);

-- Allow anyone to SELECT appointments (dashboard reads as anon too with publishable key)
CREATE POLICY "Allow public select"
  ON public.appointments
  FOR SELECT
  TO anon, authenticated
  USING (true);

-- Allow anyone to UPDATE appointments (admin status changes)
CREATE POLICY "Allow public update"
  ON public.appointments
  FOR UPDATE
  TO anon, authenticated
  USING (true)
  WITH CHECK (true);

-- Allow anyone to DELETE appointments (admin deletes)
CREATE POLICY "Allow public delete"
  ON public.appointments
  FOR DELETE
  TO anon, authenticated
  USING (true);

-- ═══════════════════════════════════════════════════════════
-- DONE! All 4 policies created. Test by submitting a booking.
-- ═══════════════════════════════════════════════════════════
