-- ============================================
-- SCRIPT DE MISE À JOUR DE LA LOCALISATION
-- ============================================
-- Ce script permet de mettre à jour les utilisateurs existants
-- qui n'ont pas encore de localisation
-- ============================================

-- Vérifier les utilisateurs sans localisation
SELECT 
  user_id, 
  user_number, 
  first_seen,
  country,
  city
FROM user_numbers
WHERE (country IS NULL AND city IS NULL)
ORDER BY first_seen DESC;

-- Pour mettre à jour manuellement un utilisateur (remplacer les valeurs)
-- UPDATE user_numbers
-- SET 
--   country = 'France',
--   country_code = 'FR',
--   region = 'Île-de-France',
--   city = 'Paris',
--   latitude = 48.8566,
--   longitude = 2.3522,
--   timezone = 'Europe/Paris'
-- WHERE user_id = 'user_XXXXXXXXX_XXXXXXXXX';

-- Compter les utilisateurs avec et sans localisation
SELECT 
  COUNT(*) FILTER (WHERE country IS NOT NULL OR city IS NOT NULL) as avec_localisation,
  COUNT(*) FILTER (WHERE country IS NULL AND city IS NULL) as sans_localisation,
  COUNT(*) as total
FROM user_numbers;

