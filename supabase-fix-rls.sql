-- ============================================
-- CORRECTION RLS POUR LE DASHBOARD
-- ============================================
-- Ce script ajoute une politique pour permettre la lecture des événements
-- Copiez-collez ce SQL dans SQL Editor de Supabase
-- ============================================

-- Politique : Autoriser les SELECT pour tous (anon)
-- Cette politique permet au dashboard de lire les événements
CREATE POLICY "Allow public selects" ON events
  FOR SELECT
  TO anon
  USING (true);

-- ============================================
-- VÉRIFICATION
-- ============================================
-- Après avoir exécuté ce script, testez avec :
-- SELECT COUNT(*) FROM events;
-- ============================================

