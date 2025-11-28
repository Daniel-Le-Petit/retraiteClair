-- ============================================
-- TABLE USER_NUMBERS - RetraiteClair
-- ============================================
-- Crée une table pour assigner un numéro unique à chaque utilisateur
-- ============================================

-- Table pour stocker les numéros d'utilisateurs
CREATE TABLE IF NOT EXISTS user_numbers (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  user_id TEXT NOT NULL UNIQUE,
  user_number INTEGER NOT NULL UNIQUE,
  first_seen TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  last_seen TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Index pour les requêtes rapides
CREATE INDEX IF NOT EXISTS idx_user_numbers_user_id ON user_numbers(user_id);
CREATE INDEX IF NOT EXISTS idx_user_numbers_user_number ON user_numbers(user_number);
CREATE INDEX IF NOT EXISTS idx_user_numbers_last_seen ON user_numbers(last_seen);

-- Row Level Security : Autoriser les INSERT et SELECT depuis n'importe où
ALTER TABLE user_numbers ENABLE ROW LEVEL SECURITY;

-- Politique : Autoriser les INSERT pour tous (anon)
CREATE POLICY "Allow public inserts" ON user_numbers
  FOR INSERT
  TO anon
  WITH CHECK (true);

-- Politique : Autoriser les SELECT pour tous (anon)
CREATE POLICY "Allow public selects" ON user_numbers
  FOR SELECT
  TO anon
  USING (true);

-- Politique : Autoriser les UPDATE pour tous (anon) - pour mettre à jour last_seen
CREATE POLICY "Allow public updates" ON user_numbers
  FOR UPDATE
  TO anon
  USING (true)
  WITH CHECK (true);

-- Politique : Autoriser tout pour service_role
CREATE POLICY "Allow service role all access" ON user_numbers
  FOR ALL
  TO service_role
  USING (true);

-- ============================================
-- REQUÊTES UTILES
-- ============================================

-- Nombre total d'utilisateurs
-- SELECT COUNT(*) as total_users FROM user_numbers;

-- Derniers utilisateurs créés
-- SELECT user_id, user_number, first_seen, last_seen
-- FROM user_numbers
-- ORDER BY user_number DESC
-- LIMIT 10;

-- Utilisateurs actifs récemment
-- SELECT user_id, user_number, last_seen
-- FROM user_numbers
-- WHERE last_seen >= NOW() - INTERVAL '7 days'
-- ORDER BY last_seen DESC;

