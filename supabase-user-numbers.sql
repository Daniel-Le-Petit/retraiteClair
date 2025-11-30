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
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  -- Informations de localisation
  country TEXT,
  country_code TEXT,
  region TEXT,
  region_code TEXT,
  city TEXT,
  postal_code TEXT,
  latitude DECIMAL(10, 8),
  longitude DECIMAL(11, 8),
  timezone TEXT,
  ip_address TEXT,
  -- Informations de source de trafic
  traffic_source TEXT,
  traffic_medium TEXT,
  traffic_campaign TEXT,
  traffic_source_type TEXT,
  referrer TEXT
);

-- Index pour les requêtes rapides
CREATE INDEX IF NOT EXISTS idx_user_numbers_user_id ON user_numbers(user_id);
CREATE INDEX IF NOT EXISTS idx_user_numbers_user_number ON user_numbers(user_number);
CREATE INDEX IF NOT EXISTS idx_user_numbers_last_seen ON user_numbers(last_seen);
-- Index pour les requêtes de localisation
CREATE INDEX IF NOT EXISTS idx_user_numbers_country ON user_numbers(country);
CREATE INDEX IF NOT EXISTS idx_user_numbers_country_code ON user_numbers(country_code);
CREATE INDEX IF NOT EXISTS idx_user_numbers_city ON user_numbers(city);
-- Index pour les requêtes de source de trafic
CREATE INDEX IF NOT EXISTS idx_user_numbers_traffic_source ON user_numbers(traffic_source);
CREATE INDEX IF NOT EXISTS idx_user_numbers_traffic_source_type ON user_numbers(traffic_source_type);
CREATE INDEX IF NOT EXISTS idx_user_numbers_traffic_medium ON user_numbers(traffic_medium);

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

-- Utilisateurs par pays
-- SELECT country, COUNT(*) as count
-- FROM user_numbers
-- WHERE country IS NOT NULL
-- GROUP BY country
-- ORDER BY count DESC;

-- Utilisateurs par ville
-- SELECT city, country, COUNT(*) as count
-- FROM user_numbers
-- WHERE city IS NOT NULL
-- GROUP BY city, country
-- ORDER BY count DESC
-- LIMIT 20;

-- Utilisateurs par source de trafic
-- SELECT traffic_source, traffic_source_type, COUNT(*) as count
-- FROM user_numbers
-- WHERE traffic_source IS NOT NULL
-- GROUP BY traffic_source, traffic_source_type
-- ORDER BY count DESC;

-- Utilisateurs par réseau social
-- SELECT traffic_source, COUNT(*) as count
-- FROM user_numbers
-- WHERE traffic_source_type = 'social'
-- GROUP BY traffic_source
-- ORDER BY count DESC;

-- Utilisateurs par moteur de recherche
-- SELECT traffic_source, COUNT(*) as count
-- FROM user_numbers
-- WHERE traffic_source_type = 'search'
-- GROUP BY traffic_source
-- ORDER BY count DESC;

