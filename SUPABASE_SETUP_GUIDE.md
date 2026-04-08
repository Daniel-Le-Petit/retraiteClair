# 🚀 Guide de Configuration Supabase - RetraiteClair

## 📋 Informations de Votre Projet

- **Project URL** : `https://kdrrqevuywsvwdffxuhp.supabase.co`
- **API Key (anon)** : `eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImtkcnJxZXZ1eXdzdndkZmZ4dWhwIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjQyNDY1MTIsImV4cCI6MjA3OTgyMjUxMn0.Uh-G9XBqvEdWkWv0bZKXQcDREP3RjUVf404WfyWhRwM`

---

## 📝 Étape 1 : Créer la Table `events`

### **Option A : Via SQL Editor (Recommandé)**

1. Dans votre dashboard Supabase, cliquez sur **SQL Editor** (dans le menu de gauche)
2. Cliquez sur **New query**
3. Copiez-collez ce SQL :

```sql
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
CREATE POLICY "Allow public inserts" ON events
  FOR INSERT
  TO anon
  WITH CHECK (true);

-- Politique : Autoriser les SELECT seulement pour service_role (vous)
-- Vous pourrez voir les données via le dashboard ou avec la service_role key
CREATE POLICY "Allow service role all access" ON events
  FOR ALL
  TO service_role
  USING (true);
```

4. Cliquez sur **Run** (ou Ctrl+Enter)
5. Vous devriez voir "Success. No rows returned"

### **Option B : Via Table Editor**

1. Cliquez sur **Table Editor** (dans le menu de gauche)
2. Cliquez sur **New table**
3. Nommez-la `events`
4. Ajoutez les colonnes suivantes :

| Column Name | Type | Default Value | Nullable |
|------------|------|---------------|----------|
| id | uuid | `uuid_generate_v4()` | ❌ No |
| event_name | text | - | ❌ No |
| properties | jsonb | - | ✅ Yes |
| user_id | text | - | ✅ Yes |
| session_id | text | - | ✅ Yes |
| page_url | text | - | ✅ Yes |
| user_agent | text | - | ✅ Yes |
| referrer | text | - | ✅ Yes |
| created_at | timestamptz | `now()` | ❌ No |

5. Cliquez sur **Save**
6. Ensuite, allez dans **SQL Editor** pour ajouter les index et RLS (voir Option A)

---

## 🔒 Étape 2 : Configurer Row Level Security (RLS)

Si vous avez utilisé l'Option A (SQL Editor), c'est déjà fait ! ✅

Si vous avez utilisé l'Option B (Table Editor), exécutez ce SQL :

```sql
-- Activer RLS
ALTER TABLE events ENABLE ROW LEVEL SECURITY;

-- Politique : Autoriser les INSERT pour tous (anon)
CREATE POLICY "Allow public inserts" ON events
  FOR INSERT
  TO anon
  WITH CHECK (true);

-- Politique : Autoriser les SELECT seulement pour service_role
CREATE POLICY "Allow service role all access" ON events
  FOR ALL
  TO service_role
  USING (true);
```

---

## 🔑 Étape 3 : Récupérer la Service Role Key (Optionnel)

**⚠️ Important :** La service_role key est **SECRÈTE** et ne doit **JAMAIS** être exposée dans le code frontend !

1. Allez dans **Settings** (⚙️) → **API**
2. Trouvez **service_role** (secret)
3. Copiez cette clé (vous en aurez besoin seulement pour des scripts backend ou le dashboard)

---

## 📦 Étape 4 : Installer Supabase dans Votre Projet

```bash
npm install @supabase/supabase-js
```

---

## ⚙️ Étape 5 : Configurer les Variables d'Environnement

### **Créer/Modifier le fichier `.env`**

À la racine de votre projet, créez ou modifiez le fichier `.env` :

```bash
REACT_APP_SUPABASE_URL=https://kdrrqevuywsvwdffxuhp.supabase.co
REACT_APP_SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImtkcnJxZXZ1eXdzdndkZmZ4dWhwIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjQyNDY1MTIsImV4cCI6MjA3OTgyMjUxMn0.Uh-G9XBqvEdWkWv0bZKXQcDREP3RjUVf404WfyWhRwM
```

### **⚠️ Important pour Render :**

Si vous déployez sur Render, vous devez aussi ajouter ces variables dans les **Environment Variables** de votre service Render :

1. Allez sur votre dashboard Render
2. Sélectionnez votre service
3. Allez dans **Environment**
4. Ajoutez :
   - `REACT_APP_SUPABASE_URL` = `https://kdrrqevuywsvwdffxuhp.supabase.co`
   - `REACT_APP_SUPABASE_ANON_KEY` = `eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImtkcnJxZXZ1eXdzdndkZmZ4dWhwIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjQyNDY1MTIsImV4cCI6MjA3OTgyMjUxMn0.Uh-G9XBqvEdWkWv0bZKXQcDREP3RjUVf404WfyWhRwM`

---

## 📁 Étape 6 : Créer le Fichier de Configuration Supabase

Créez le fichier `src/utils/supabase.js` :

```javascript
import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.REACT_APP_SUPABASE_URL;
const supabaseAnonKey = process.env.REACT_APP_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseAnonKey) {
  console.warn('⚠️ Supabase non configuré. Le tracking Supabase sera désactivé.');
  console.warn('   Ajoutez REACT_APP_SUPABASE_URL et REACT_APP_SUPABASE_ANON_KEY dans votre .env');
  export const supabase = null;
} else {
  export const supabase = createClient(supabaseUrl, supabaseAnonKey);
  
  if (process.env.NODE_ENV === 'development') {
    console.log('✅ Supabase configuré avec succès');
  }
}
```

---

## ✅ Étape 7 : Vérifier que le Tracking Fonctionne

Le tracking Supabase est **déjà intégré** dans `src/utils/tracking.js` ! 

Il s'active automatiquement si Supabase est configuré.

### **Tester en Mode Développement :**

1. Redémarrez votre serveur de développement :
   ```bash
   npm start
   ```

2. Ouvrez la console du navigateur (F12)

3. Naviguez sur votre site et effectuez des actions (calcul, changement de scénario, etc.)

4. Vous devriez voir dans la console :
   ```
   ✅ Supabase configuré avec succès
   📊 Supabase Event: calculation_started {...}
   📊 Supabase Event: calculation_completed {...}
   ```

5. Vérifiez dans Supabase :
   - Allez dans **Table Editor** → **events**
   - Vous devriez voir vos événements apparaître en temps réel !

---

## 📊 Étape 8 : Visualiser les Données

### **Option 1 : Table Editor (Simple)**

1. Allez dans **Table Editor** → **events**
2. Vous verrez tous vos événements
3. Cliquez sur un événement pour voir les détails

### **Option 2 : SQL Editor (Avancé)**

Exécutez des requêtes SQL pour analyser :

```sql
-- Nombre d'événements par type
SELECT event_name, COUNT(*) as count
FROM events
GROUP BY event_name
ORDER BY count DESC;

-- Événements aujourd'hui
SELECT * FROM events
WHERE created_at >= CURRENT_DATE
ORDER BY created_at DESC
LIMIT 100;

-- Calculs effectués par mode
SELECT 
  properties->>'mode' as mode,
  COUNT(*) as count
FROM events
WHERE event_name = 'calculation_completed'
GROUP BY properties->>'mode';

-- Temps moyen passé sur les pages
SELECT 
  properties->>'page' as page,
  AVG((properties->>'time_seconds')::int) as avg_time_seconds
FROM events
WHERE event_name = 'time_on_page'
GROUP BY properties->>'page';
```

---

## 🔍 Vérification Finale

### **Checklist :**

- [ ] Table `events` créée
- [ ] Index créés
- [ ] RLS activé avec politiques
- [ ] Variables d'environnement ajoutées (`.env` + Render)
- [ ] Fichier `src/utils/supabase.js` créé
- [ ] `npm install @supabase/supabase-js` exécuté
- [ ] Serveur redémarré
- [ ] Événements visibles dans Supabase Table Editor

---

## 🎯 Prochaines Étapes

Une fois configuré, vous pourrez :

1. **Analyser les comportements** dans Supabase
2. **Exporter les données** vers Excel/CSV
3. **Créer des dashboards** personnalisés
4. **Combiner avec GA4** pour une analyse complète

---

## ❓ Problèmes Courants

### **"Supabase non configuré" dans la console**

➡️ Vérifiez que les variables d'environnement sont bien définies dans `.env` et redémarrez le serveur.

### **"Row Level Security policy violation"**

➡️ Vérifiez que les politiques RLS sont bien créées (voir Étape 2).

### **Les événements n'apparaissent pas dans Supabase**

➡️ Vérifiez la console du navigateur pour les erreurs. Assurez-vous que Supabase est bien configuré.

---

## 🚀 C'est Prêt !

Votre tracking Supabase est maintenant configuré et fonctionnel ! 🎉

