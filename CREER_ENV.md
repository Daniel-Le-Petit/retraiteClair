# 📝 Créer le Fichier .env

## 🎯 Étapes Rapides

1. **Créez un fichier nommé `.env`** à la racine de votre projet (même niveau que `package.json`)

2. **Copiez-collez ce contenu** dans le fichier `.env` :

```bash
REACT_APP_SUPABASE_URL=https://kdrrqevuywsvwdffxuhp.supabase.co
REACT_APP_SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImtkcnJxZXZ1eXdzdndkZmZ4dWhwIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjQyNDY1MTIsImV4cCI6MjA3OTgyMjUxMn0.Uh-G9XBqvEdWkWv0bZKXQcDREP3RjUVf404WfyWhRwM
```

3. **Sauvegardez le fichier**

4. **Redémarrez votre serveur** (arrêtez avec Ctrl+C puis relancez `npm start`)

5. **Ouvrez la console du navigateur** (F12) - vous devriez maintenant voir :
   ```
   ✅ Supabase configuré avec succès
      URL: https://kdrrqevuywsvwdffxuhp.supabase.co
   ```

## ⚠️ Important

- Le fichier `.env` doit être à la **racine** du projet
- Ne commitez **JAMAIS** le fichier `.env` dans Git (il devrait déjà être dans `.gitignore`)
- Après avoir créé/modifié `.env`, **redémarrez toujours le serveur**

## 🧪 Tester

Après avoir créé le fichier et redémarré :

1. Effectuez une action sur votre site (lancer un calcul)
2. Ouvrez la console (F12)
3. Vous devriez voir :
   ```
   📊 GA4 Event: calculation_started {...}
   📊 Supabase Event: calculation_started {...}
   ```
4. Vérifiez dans Supabase Table Editor → events

