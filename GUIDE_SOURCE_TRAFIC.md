# 📊 Guide de Tracking de la Source de Trafic - RetraiteClair

## 📋 Vue d'ensemble

Le système enregistre maintenant automatiquement la **source de trafic** de chaque utilisateur lors de sa première visite. Cela permet de savoir d'où viennent vos utilisateurs : réseaux sociaux, moteurs de recherche, liens directs, etc.

## 🎯 Sources détectées

### Réseaux sociaux
- **LinkedIn** 💼
- **Facebook** 📘
- **Twitter/X** 🐦
- **Instagram** 📷
- **YouTube** 📺
- **TikTok** 🎵
- **Pinterest** 📌
- **Reddit** 🤖
- **WhatsApp** 💬
- **Telegram** ✈️

### Moteurs de recherche
- **Google** 🔍
- **Bing** 🔍
- **Yahoo** 🔍
- **DuckDuckGo** 🔍
- **Qwant** 🔍
- **Ecosia** 🌱

### Autres sources
- **Référents externes** 🔗 (autres sites web)
- **Accès direct** 🔖 (pas de referrer, bookmark, URL tapée)
- **UTM parameters** 📊 (campagnes marketing)

## 🔧 Configuration

### 1. Mettre à jour la table dans Supabase

Exécutez le script SQL mis à jour `supabase-user-numbers.sql` dans l'éditeur SQL de Supabase :

1. Allez dans votre projet Supabase
2. Ouvrez **SQL Editor**
3. Si la table existe déjà, exécutez cette commande pour ajouter les colonnes :

```sql
-- Ajouter les colonnes de source de trafic si elles n'existent pas
ALTER TABLE user_numbers 
ADD COLUMN IF NOT EXISTS traffic_source TEXT,
ADD COLUMN IF NOT EXISTS traffic_medium TEXT,
ADD COLUMN IF NOT EXISTS traffic_campaign TEXT,
ADD COLUMN IF NOT EXISTS traffic_source_type TEXT,
ADD COLUMN IF NOT EXISTS referrer TEXT;

-- Ajouter les index
CREATE INDEX IF NOT EXISTS idx_user_numbers_traffic_source ON user_numbers(traffic_source);
CREATE INDEX IF NOT EXISTS idx_user_numbers_traffic_source_type ON user_numbers(traffic_source_type);
CREATE INDEX IF NOT EXISTS idx_user_numbers_traffic_medium ON user_numbers(traffic_medium);
```

4. Si la table n'existe pas encore, copiez-collez tout le contenu de `supabase-user-numbers.sql`

## 🚀 Fonctionnement

### Détection automatique

1. **Nouvel utilisateur** : 
   - La source de trafic est automatiquement détectée lors de la première visite
   - Les informations sont stockées dans Supabase

2. **Utilisateur existant** : 
   - Si la source de trafic n'existe pas encore, elle est récupérée lors du prochain événement tracké
   - La source est mise à jour si elle manque

### Priorité de détection

1. **UTM parameters** (priorité la plus haute)
   - Si `utm_source` est présent dans l'URL, il est utilisé
   - Exemple : `?utm_source=linkedin&utm_medium=social&utm_campaign=retraite2025`

2. **Référent (referrer)**
   - Analyse du `document.referrer` pour détecter les réseaux sociaux et moteurs de recherche

3. **Accès direct**
   - Si aucun referrer n'est présent, marqué comme "Direct"

## 📊 Affichage dans le Dashboard

La source de trafic est affichée dans la section "Événements des autres utilisateurs" :

```
💼 LinkedIn (social)
🔍 Google (search)
🔖 Direct (direct)
🔗 example.com (referral)
```

**Couleurs** :
- 🟡 Jaune : Réseaux sociaux
- 🔵 Bleu : Moteurs de recherche
- ⚪ Gris : Accès direct
- 🟣 Violet : Référents externes

## 🔍 Requêtes SQL utiles

### Utilisateurs par source de trafic
```sql
SELECT traffic_source, traffic_source_type, COUNT(*) as count
FROM user_numbers
WHERE traffic_source IS NOT NULL
GROUP BY traffic_source, traffic_source_type
ORDER BY count DESC;
```

### Utilisateurs par réseau social
```sql
SELECT traffic_source, COUNT(*) as count
FROM user_numbers
WHERE traffic_source_type = 'social'
GROUP BY traffic_source
ORDER BY count DESC;
```

### Utilisateurs par moteur de recherche
```sql
SELECT traffic_source, COUNT(*) as count
FROM user_numbers
WHERE traffic_source_type = 'search'
GROUP BY traffic_source
ORDER BY count DESC;
```

### Utilisateurs LinkedIn
```sql
SELECT user_id, user_number, first_seen, city, country
FROM user_numbers
WHERE traffic_source = 'LinkedIn'
ORDER BY first_seen DESC;
```

### Répartition des sources
```sql
SELECT 
  traffic_source_type,
  COUNT(*) as count,
  ROUND(COUNT(*) * 100.0 / (SELECT COUNT(*) FROM user_numbers WHERE traffic_source IS NOT NULL), 2) as percentage
FROM user_numbers
WHERE traffic_source IS NOT NULL
GROUP BY traffic_source_type
ORDER BY count DESC;
```

## 🛠️ Utilisation des UTM Parameters

Pour tracker vos campagnes marketing, utilisez des URLs avec des paramètres UTM :

```
https://retraiteclair.com/?utm_source=linkedin&utm_medium=social&utm_campaign=retraite2025
https://retraiteclair.com/?utm_source=google&utm_medium=cpc&utm_campaign=retraite_ads
https://retraiteclair.com/?utm_source=newsletter&utm_medium=email&utm_campaign=janvier2025
```

**Paramètres supportés** :
- `utm_source` : Source de la campagne (ex: linkedin, google, newsletter)
- `utm_medium` : Medium de la campagne (ex: social, cpc, email)
- `utm_campaign` : Nom de la campagne (ex: retraite2025, janvier2025)

## 📝 Notes techniques

- **Détection en temps réel** : La source est détectée au moment de la première visite
- **Stockage persistant** : La source est stockée dans Supabase et conservée
- **Priorité UTM** : Les paramètres UTM ont priorité sur le referrer
- **Privé** : Le referrer complet est stocké pour analyse détaillée

## ✅ Avantages

1. **Analyse marketing** : Comprendre quels canaux apportent le plus d'utilisateurs
2. **ROI des campagnes** : Mesurer l'efficacité de vos campagnes publicitaires
3. **Optimisation** : Concentrer vos efforts sur les canaux les plus performants
4. **Segmentation** : Analyser le comportement selon la source de trafic

## 🔒 Confidentialité

- **RGPD** : La source de trafic est collectée automatiquement (données de navigation standard)
- **Anonyme** : Aucune information personnelle n'est collectée
- **Stockage** : Les données sont stockées dans Supabase avec les mêmes politiques de sécurité


