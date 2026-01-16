# 🚨 Dépannage : "The recipients address is corrupted"

## Erreur
```
Erreur 422 : The recipients address is corrupted
```

## 🔍 Diagnostic

D'après les logs :
- ✅ Le code envoie bien `user_email: "dlepetit@hotmail.fr"`
- ✅ Le code envoie bien `to_email: "dlepetit@hotmail.fr"`
- ❌ EmailJS dit que l'adresse est "corrupted"

Cela signifie que le template EmailJS ne peut pas utiliser correctement la variable dans le champ "To Email".

## ✅ Solutions

### Solution 1 : Vérifier le format exact dans le template

Dans EmailJS Dashboard → Template `template_amj5ayi` :

1. Ouvrez le template
2. **SUPPRIMEZ TOUT** dans le champ "To Email"
3. **TAPEZ EXACTEMENT** : `{{user_email}}`
   - ⚠️ Pas d'espaces avant ou après
   - ⚠️ Pas de texte autour
   - ⚠️ Exactement : `{{user_email}}`

4. **SAUVEGARDEZ** le template
5. Testez à nouveau

### Solution 2 : Recréer le champ "To Email"

Parfois le champ peut être mal configuré :

1. Dans le template, **SUPPRIMEZ** complètement le contenu du champ "To Email"
2. **ÉFFACEZ LE CHAMP** (laissez-le vide)
3. **TAPEZ À NOUVEAU** : `{{user_email}}`
4. Sauvegardez

### Solution 3 : Vérifier le type de champ

Dans EmailJS, le champ "To Email" doit être de type **variable** ou **text**, pas "fixed" ou "static".

1. Vérifiez les options du champ "To Email"
2. Assurez-vous qu'il accepte les variables dynamiques

### Solution 4 : Essayer avec un autre nom de variable

Si `{{user_email}}` ne fonctionne toujours pas :

1. Essayez `{{to_email}}` (même si on l'a déjà testé)
2. Ou créez une variable personnalisée

### Solution 5 : Vérifier dans EmailJS Logs

1. Allez sur [EmailJS Logs](https://dashboard.emailjs.com/admin/logs)
2. Trouvez la tentative d'envoi
3. Regardez les **paramètres reçus par EmailJS**
4. Vérifiez si `user_email` est bien présent

## 🔧 Solution alternative : Recréer le template

Si rien ne fonctionne, recréez le template depuis zéro :

1. Créez un **nouveau template** dans EmailJS
2. Configurez-le :
   - **Service** : `service_7l45cwp`
   - **To Email** : `{{user_email}}` ⚠️ **EXACTEMENT comme ça, rien d'autre**
   - **From Name** : `RetraiteClair`
   - **Subject** : `{{subject}}`
3. Copiez le contenu du template depuis `TEMPLATE_EMAILJS_SIMULATION.md`
4. Sauvegardez et notez le nouveau Template ID
5. Mettez à jour le code avec le nouveau Template ID

## ✅ Checklist

- [ ] Le champ "To Email" contient EXACTEMENT `{{user_email}}` (sans espaces)
- [ ] Le champ "To Email" ne contient QUE `{{user_email}}` (pas de texte autour)
- [ ] Le template est bien associé au service `service_7l45cwp`
- [ ] Le service EmailJS est actif
- [ ] Les logs EmailJS montrent que `user_email` est bien reçu

## 💡 Test rapide

Pour tester si c'est vraiment un problème de variable :

1. **Temporairement**, mettez votre email direct dans "To Email" (ex: `dlepetit@hotmail.fr`)
2. Testez l'envoi
3. Si ça fonctionne → Le problème vient vraiment de la variable
4. Si ça ne fonctionne pas → Il y a un autre problème dans la configuration

## 📝 Note importante

L'erreur "corrupted" apparaît généralement quand :
- Il y a des espaces ou du texte autour de la variable
- La syntaxe de la variable est incorrecte
- Le champ n'accepte pas les variables dynamiques
- Il y a un caractère invisible ou spécial qui corrompt l'adresse

La solution la plus sûre est souvent de **recréer complètement le champ "To Email"** en le vidant d'abord, puis en tapant à nouveau `{{user_email}}`.
