# 🔍 Vérification Complète de la Configuration EmailJS

## Problème
L'email est envoyé à `retraiteclair@gmail.com` au lieu de l'utilisateur, même si le template utilise `{{to_email}}`.

## ✅ Vérifications à faire

### 1. Vérifier le Template (`template_amj5ayi`)

1. Allez sur [EmailJS Templates](https://dashboard.emailjs.com/admin/templates)
2. Ouvrez `template_amj5ayi`
3. Vérifiez que **"To Email"** contient exactement : `{{to_email}}`
   - ⚠️ Pas d'espaces avant/après
   - ⚠️ Pas de texte autour (juste `{{to_email}}`)
   - ⚠️ Pas d'adresse email fixe

### 2. Vérifier le Service EmailJS (`service_7l45cwp`)

⚠️ **IMPORTANT** : Le service EmailJS lui-même peut avoir une configuration qui force l'adresse !

1. Allez sur [EmailJS Services](https://dashboard.emailjs.com/admin/integration)
2. Ouvrez le service `service_7l45cwp`
3. Vérifiez s'il y a un champ **"Default To Email"** ou **"Default Recipient"**
4. Si c'est le cas, **VACUISEZ ce champ** ou mettez une variable dynamique

### 3. Vérifier les Paramètres du Template

Dans le template `template_amj5ayi`, vérifiez TOUS les champs :

| Champ | Doit contenir |
|-------|---------------|
| **To Email** | `{{to_email}}` |
| **To Name** | `{{to_name}}` ou vide |
| **From Name** | `RetraiteClair` |
| **Reply To** | `{{reply_to}}` ou `retraiteclair@gmail.com` |
| **Subject** | `{{subject}}` |

### 4. Vérifier dans la Console du Navigateur

Après un test d'envoi, ouvrez la console (F12) et vérifiez les logs :

```
Paramètres EmailJS (simulation): { to_email: "dlepetit@hotmail.com", ... }
Email destinataire (to_email): dlepetit@hotmail.com
Service ID: service_7l45cwp
Template ID: template_amj5ayi
```

Si `to_email` est correct dans les logs mais que l'email va quand même à retraiteclair@gmail.com, le problème est dans la configuration EmailJS.

## 🔧 Solutions possibles

### Solution 1 : Vider le "Default To Email" du Service

Si le service a un "Default To Email" configuré, cela peut override le template :
1. Ouvrez le service `service_7l45cwp`
2. Cherchez "Default To Email" ou "Default Recipient"
3. **VIDEZ ce champ** ou mettez `{{to_email}}`

### Solution 2 : Recréer le Template

Parfois, les templates peuvent avoir des configurations cachées :
1. Créez un nouveau template
2. Configurez-le exactement comme `template_amj5ayi`
3. **IMPORTANT** : Dans "To Email", mettez **UNIQUEMENT** `{{to_email}}` (rien d'autre)
4. Testez avec le nouveau Template ID
5. Mettez à jour le code avec le nouveau Template ID

### Solution 3 : Utiliser `user_email` au lieu de `to_email`

Parfois EmailJS préfère `user_email` :
1. Dans le template, changez `{{to_email}}` en `{{user_email}}`
2. Dans `sendEmail.js`, changez `to_email: recipientEmail` en `user_email: recipientEmail`

### Solution 4 : Vérifier les Logs EmailJS

1. Allez sur [EmailJS Logs](https://dashboard.emailjs.com/admin/logs)
2. Ouvrez le dernier email envoyé
3. Regardez les paramètres envoyés
4. Vérifiez si `to_email` est bien présent et correct

## ✅ Test Final

1. Ouvrez la console du navigateur (F12)
2. Effectuez un test d'envoi d'email
3. Vérifiez dans les logs que `to_email` contient bien l'email de l'utilisateur
4. Vérifiez dans EmailJS Logs que l'email a bien été envoyé avec les bons paramètres
5. Vérifiez que l'email arrive bien à l'adresse de l'utilisateur

## 📝 Checklist

- [ ] Template "To Email" = `{{to_email}}` (exactement, sans espaces)
- [ ] Service n'a pas de "Default To Email" configuré
- [ ] Les logs montrent que `to_email` est correct
- [ ] EmailJS Logs montrent les bons paramètres
- [ ] L'email arrive à l'utilisateur et non à retraiteclair@gmail.com
