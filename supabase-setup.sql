-- ============================================
-- SUPABASE SETUP SQL - RetraiteClair
-- ============================================
-- Copiez-collez ce SQL dans SQL Editor de Supabase
-- ============================================

-- Table pour stocker les événements de tracking
CREATE TABLE events (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  event_name TEXT NOT NULL,
  properties JSONB,
  user_id TEXT,
  session_id TEXT,
  page_url TEXT,
  user_agent TEXT,
  referrer TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Index pour les requêtes rapides
CREATE INDEX idx_events_event_name ON events(event_name);
CREATE INDEX idx_events_created_at ON events(created_at);
CREATE INDEX idx_events_user_id ON events(user_id);
CREATE INDEX idx_events_session_id ON events(session_id);

-- Row Level Security : Autoriser les INSERT depuis n'importe où
ALTER TABLE events ENABLE ROW LEVEL SECURITY;

-- Politique : Autoriser les INSERT pour tous (anon)
-- Cette politique permet à n'importe qui d'insérer des événements
CREATE POLICY "Allow public inserts" ON events
  FOR INSERT
  TO anon
  WITH CHECK (true);

-- Politique : Autoriser les SELECT pour tous (anon)
-- Cette politique permet au dashboard de lire les événements
CREATE POLICY "Allow public selects" ON events
  FOR SELECT
  TO anon
  USING (true);

-- Politique : Autoriser les SELECT seulement pour service_role (vous)
-- Vous pourrez voir les données via le dashboard ou avec la service_role key
CREATE POLICY "Allow service role all access" ON events
  FOR ALL
  TO service_role
  USING (true);

-- ============================================
-- REQUÊTES UTILES POUR ANALYSER LES DONNÉES
-- ============================================

-- Nombre d'événements par type
-- SELECT event_name, COUNT(*) as count
-- FROM events
-- GROUP BY event_name
-- ORDER BY count DESC;

-- Événements aujourd'hui
-- SELECT * FROM events
-- WHERE created_at >= CURRENT_DATE
-- ORDER BY created_at DESC
-- LIMIT 100;

-- Calculs effectués par mode
-- SELECT 
--   properties->>'mode' as mode,
--   COUNT(*) as count
-- FROM events
-- WHERE event_name = 'calculation_completed'
-- GROUP BY properties->>'mode';

-- Temps moyen passé sur les pages
-- SELECT 
--   properties->>'page' as page,
--   AVG((properties->>'time_seconds')::int) as avg_time_seconds
-- FROM events
-- WHERE event_name = 'time_on_page'
-- GROUP BY properties->>'page';

