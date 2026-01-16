# 🚨 Dépannage : "L'adresse de destination est vide"

## Erreur
```
Erreur de configuration EmailJS : L'adresse de destination est vide. Vérifiez la configuration du template.
```

## 🔍 Diagnostic

Cette erreur signifie qu'EmailJS ne reçoit pas ou ne trouve pas la variable `to_email` dans le template.

## ✅ Solutions

### Solution 1 : Vérifier le nom de la variable dans le template

Dans EmailJS Dashboard → Template `template_amj5ayi` :

1. Ouvrez le template
2. Regardez le champ **"To Email"**
3. Il doit contenir exactement : `{{to_email}}`
   - ⚠️ Vérifiez qu'il n'y a pas de fautes de frappe
   - ⚠️ Vérifiez qu'il n'y a pas d'espaces supplémentaires
   - ⚠️ Il ne doit pas contenir de texte autour, juste `{{to_email}}`

### Solution 2 : Vérifier les logs dans la console

1. Ouvrez la console du navigateur (F12)
2. Testez l'envoi d'un email
3. Regardez les logs qui commencent par `=== ENVOI EMAIL SIMULATION ===`
4. Vérifiez que `Email destinataire dans params (to_email)` contient bien votre email

**Si `to_email` est vide dans les logs** → Le problème vient du code JavaScript
**Si `to_email` est correct dans les logs** → Le problème vient de la configuration EmailJS

### Solution 3 : Essayer un autre nom de variable

Parfois EmailJS préfère d'autres noms de variables. Essayez :

**Option A : Utiliser `user_email`**
1. Dans le template EmailJS, changez `{{to_email}}` en `{{user_email}}`
2. Le code envoie déjà `user_email`, donc cela devrait fonctionner

**Option B : Utiliser `email`**
1. Dans le template EmailJS, changez `{{to_email}}` en `{{email}}`
2. Dans `sendEmail.js`, ajoutez `email: recipientEmail` dans `templateParams`

### Solution 4 : Vérifier le format du champ "To Email"

Dans EmailJS, le champ "To Email" peut parfois être mal configuré. Vérifiez :

1. **Type de champ** : Le champ doit être de type "Text" ou "Variable", pas "Fixed"
2. **Valeur** : Doit être exactement `{{to_email}}` (avec les doubles accolades)
3. **Pas d'espace** : Pas d'espace avant ou après `{{to_email}}`

### Solution 5 : Vérifier dans EmailJS Logs

1. Allez sur [EmailJS Logs](https://dashboard.emailjs.com/admin/logs)
2. Trouvez la tentative d'envoi qui a échoué
3. Regardez les **paramètres envoyés**
4. Vérifiez si `to_email` est présent et contient votre email

**Si `to_email` n'apparaît pas dans les logs EmailJS** → Le code ne l'envoie pas correctement
**Si `to_email` apparaît mais est vide** → L'email n'est pas passé correctement
**Si `to_email` apparaît et est correct** → Le problème est dans le template EmailJS

## 🔧 Test Rapide

Pour tester rapidement si c'est un problème de variable :

1. **Temporairement**, dans le template EmailJS, remplacez `{{to_email}}` par votre email direct (ex: `dlepetit@hotmail.fr`)
2. Testez l'envoi
3. Si ça fonctionne → Le problème vient de la variable `to_email`
4. Si ça ne fonctionne pas → Il y a un autre problème dans la configuration

## ✅ Vérifications finales

- [ ] Template "To Email" contient exactement `{{to_email}}` (sans espaces)
- [ ] Console montre que `to_email` contient bien votre email
- [ ] EmailJS Logs montrent que `to_email` est envoyé
- [ ] Le template est bien associé au service `service_7l45cwp`
- [ ] Le service EmailJS est actif

## 💡 Solution alternative : Utiliser le champ "Reply To" temporairement

Si rien ne fonctionne, vous pouvez temporairement :

1. Dans le template, mettez votre email dans "To Email" (fixe)
2. Mettez `{{reply_to}}` dans "Reply To"
3. Puis changez manuellement après chaque envoi (pas idéal mais fonctionnel)

Mais l'objectif est bien d'utiliser `{{to_email}}` dans "To Email" pour que chaque utilisateur reçoive l'email.
