# 📍 Guide de Localisation des Utilisateurs - RetraiteClair

## 📋 Vue d'ensemble

Le système enregistre maintenant automatiquement la **localisation** (ville, pays, région) de chaque utilisateur lors de sa première visite. Cette information est obtenue depuis l'adresse IP de l'utilisateur et stockée dans Supabase.

## 🎯 Informations collectées

Pour chaque utilisateur, les informations suivantes sont enregistrées :

- **Pays** : Nom complet du pays (ex: "France")
- **Code pays** : Code ISO (ex: "FR")
- **Région** : Nom de la région (ex: "Île-de-France")
- **Code région** : Code de la région
- **Ville** : Nom de la ville (ex: "Paris")
- **Code postal** : Code postal
- **Coordonnées GPS** : Latitude et longitude (approximatives)
- **Fuseau horaire** : Fuseau horaire de l'utilisateur
- **Adresse IP** : Adresse IP utilisée (pour référence)

## 🔧 Configuration

### 1. Mettre à jour la table dans Supabase

Exécutez le script SQL mis à jour `supabase-user-numbers.sql` dans l'éditeur SQL de Supabase :

1. Allez dans votre projet Supabase
2. Ouvrez **SQL Editor**
3. Si la table existe déjà, exécutez cette commande pour ajouter les colonnes :

```sql
-- Ajouter les colonnes de localisation si elles n'existent pas
ALTER TABLE user_numbers 
ADD COLUMN IF NOT EXISTS country TEXT,
ADD COLUMN IF NOT EXISTS country_code TEXT,
ADD COLUMN IF NOT EXISTS region TEXT,
ADD COLUMN IF NOT EXISTS region_code TEXT,
ADD COLUMN IF NOT EXISTS city TEXT,
ADD COLUMN IF NOT EXISTS postal_code TEXT,
ADD COLUMN IF NOT EXISTS latitude DECIMAL(10, 8),
ADD COLUMN IF NOT EXISTS longitude DECIMAL(11, 8),
ADD COLUMN IF NOT EXISTS timezone TEXT,
ADD COLUMN IF NOT EXISTS ip_address TEXT;
```

4. Si la table n'existe pas encore, copiez-collez tout le contenu de `supabase-user-numbers.sql`

## 🚀 Fonctionnement

### Attribution automatique

1. **Nouvel utilisateur** : 
   - Un numéro unique est assigné
   - La localisation est automatiquement obtenue depuis l'IP
   - Les informations sont stockées dans Supabase

2. **Utilisateur existant** : 
   - Si la localisation n'existe pas encore, elle est récupérée lors du prochain événement tracké
   - La localisation est mise à jour si elle manque

### Service utilisé

Le système utilise **ipapi.co** (gratuit, sans API key pour usage basique) pour obtenir la localisation depuis l'adresse IP.

**Limites** :
- 1000 requêtes/jour en gratuit
- Pour plus de requêtes, un compte payant est nécessaire

## 📊 Affichage dans le Dashboard

La localisation est affichée dans la section "Événements des autres utilisateurs" :

```
📍 Paris, France
```

Format : `📍 [Ville], [Pays]`

Si seule la ville ou le pays est disponible, seul l'élément disponible est affiché.

## 🔍 Requêtes SQL utiles

### Utilisateurs par pays
```sql
SELECT country, COUNT(*) as count
FROM user_numbers
WHERE country IS NOT NULL
GROUP BY country
ORDER BY count DESC;
```

### Utilisateurs par ville
```sql
SELECT city, country, COUNT(*) as count
FROM user_numbers
WHERE city IS NOT NULL
GROUP BY city, country
ORDER BY count DESC
LIMIT 20;
```

### Utilisateurs français
```sql
SELECT user_id, user_number, city, region, country
FROM user_numbers
WHERE country_code = 'FR'
ORDER BY user_number;
```

### Utilisateurs sans localisation
```sql
SELECT user_id, user_number, first_seen
FROM user_numbers
WHERE city IS NULL AND country IS NULL;
```

## 🛠️ Dépannage

### Problème : La localisation n'est pas enregistrée

**Solutions** :
1. Vérifiez que les colonnes existent dans la table `user_numbers`
2. Vérifiez la console du navigateur pour les erreurs
3. Vérifiez que le service ipapi.co est accessible (peut être bloqué par certains réseaux)

### Problème : Localisation incorrecte

**Explication** : La localisation basée sur IP est approximative. Elle peut indiquer :
- La ville du fournisseur d'accès Internet plutôt que la ville réelle
- La localisation du serveur VPN si l'utilisateur utilise un VPN

### Problème : Limite de requêtes atteinte

**Solution** : 
- Attendre 24h pour que la limite se réinitialise
- Ou créer un compte payant sur ipapi.co

## 🔒 Confidentialité

- **RGPD** : La localisation est collectée automatiquement sans consentement explicite supplémentaire (basée sur IP uniquement)
- **Précision** : La localisation est approximative (niveau ville, pas adresse exacte)
- **Stockage** : Les données sont stockées dans Supabase avec les mêmes politiques de sécurité que les autres données

## ✅ Avantages

1. **Analyse géographique** : Comprendre d'où viennent vos utilisateurs
2. **Personnalisation** : Adapter le contenu selon la localisation
3. **Statistiques** : Visualiser la répartition géographique des utilisateurs
4. **Détection de fraude** : Identifier les connexions suspectes (changements de localisation rapides)

## 📝 Notes techniques

- **Asynchrone** : La récupération de la localisation est asynchrone et ne bloque pas le chargement de la page
- **Cache** : La localisation est stockée dans Supabase et n'est récupérée qu'une fois par utilisateur
- **Performance** : L'appel à ipapi.co est fait en arrière-plan et n'affecte pas l'expérience utilisateur

