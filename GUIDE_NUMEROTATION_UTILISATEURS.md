# 🔢 Guide de Numérotation des Utilisateurs - RetraiteClair

## 📋 Vue d'ensemble

Chaque utilisateur reçoit maintenant un **numéro unique** qui est conservé lors de ses prochaines connexions. Cela permet de mieux identifier et suivre les utilisateurs dans le dashboard.

## 🎯 Format des IDs

### Avant :
```
user_1764253590480_8818u0x2r
user_1764244042494_gpv7sgs5g
```

### Après :
```
user#1_1764253590480_8818u0x2r
user#2_1764244042494_gpv7sgs5g
```

## 🔧 Configuration

### 1. Créer la table dans Supabase

Exécutez le script SQL `supabase-user-numbers.sql` dans l'éditeur SQL de Supabase :

1. Allez dans votre projet Supabase
2. Ouvrez **SQL Editor**
3. Copiez-collez le contenu de `supabase-user-numbers.sql`
4. Cliquez sur **Run**

### 2. Vérifier la configuration

La table `user_numbers` doit contenir :
- `user_id` : L'ID original de l'utilisateur
- `user_number` : Le numéro unique assigné (1, 2, 3, ...)
- `first_seen` : Date de première visite
- `last_seen` : Date de dernière visite

## 🚀 Fonctionnement

### Attribution automatique

1. **Nouvel utilisateur** : Un numéro unique est automatiquement assigné lors de sa première visite
2. **Utilisateur existant** : Le numéro est conservé et récupéré depuis Supabase
3. **Cache** : L'ID numéroté est mis en cache dans `localStorage` pour éviter les appels répétés

### Mise à jour de `last_seen`

À chaque événement tracké, le champ `last_seen` est automatiquement mis à jour dans la table `user_numbers`.

## 📊 Utilisation dans le Dashboard

Le dashboard affiche maintenant les IDs avec leurs numéros :

```
user#1_1764253590480_8818u0x2r (iPhone-Daniel)
user#2_1764244042494_gpv7sgs5g (Professional_Laptop)
```

## 🔍 Requêtes SQL utiles

### Nombre total d'utilisateurs
```sql
SELECT COUNT(*) as total_users FROM user_numbers;
```

### Derniers utilisateurs créés
```sql
SELECT user_id, user_number, first_seen, last_seen
FROM user_numbers
ORDER BY user_number DESC
LIMIT 10;
```

### Utilisateurs actifs récemment
```sql
SELECT user_id, user_number, last_seen
FROM user_numbers
WHERE last_seen >= NOW() - INTERVAL '7 days'
ORDER BY last_seen DESC;
```

### Utilisateurs par numéro
```sql
SELECT user_number, user_id, first_seen, last_seen
FROM user_numbers
ORDER BY user_number;
```

## 🛠️ Dépannage

### Problème : Les IDs ne sont pas numérotés

**Solution** :
1. Vérifiez que la table `user_numbers` existe dans Supabase
2. Vérifiez les politiques RLS (Row Level Security)
3. Vérifiez la console du navigateur pour les erreurs

### Problème : Les numéros ne sont pas séquentiels

**Solution** : C'est normal si plusieurs utilisateurs se connectent simultanément. Le système gère les race conditions automatiquement.

### Problème : L'ID change à chaque visite

**Solution** : Vérifiez que `localStorage` n'est pas vidé. Le numéro est stocké dans `localStorage` avec la clé `retraiteClair_userId`.

## 📝 Notes techniques

- **Cache** : L'ID numéroté est mis en cache pour éviter les appels répétés à Supabase
- **Asynchrone** : `getUserId()` est maintenant asynchrone, mais une version synchrone `getUserIdSync()` existe pour GA4
- **Rétrocompatibilité** : Les anciens IDs sans numéro sont automatiquement convertis lors de la prochaine visite

## ✅ Avantages

1. **Identification facile** : `user#1`, `user#2`, etc. sont plus faciles à identifier que les IDs longs
2. **Suivi persistant** : Le numéro est conservé entre les sessions
3. **Statistiques** : Facilite l'analyse des utilisateurs récurrents
4. **Dashboard** : Améliore la lisibilité dans le dashboard analytics

