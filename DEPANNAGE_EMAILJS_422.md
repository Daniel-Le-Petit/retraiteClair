# 🚨 Dépannage EmailJS - Erreur 422

## ❌ Problème
```
POST https://api.emailjs.com/api/v1.0/email/send 422 (Unprocessable Content)
"The recipients address is empty"
```

## 🔍 Diagnostic

### 1. **Test de diagnostic**
Ouvrez `debug-emailjs.html` dans votre navigateur pour tester différentes configurations.

### 2. **Vérifications EmailJS**

#### A. **Template Configuration**
1. Allez sur [emailjs.com](https://emailjs.com)
2. Ouvrez **Email Templates** → **template_sirltvl**
3. Vérifiez la section **"Settings"** :

**Configuration requise :**
```
To Email: dlepetit.maa@gmail.com
From Name: {{from_name}}
From Email: {{from_email}}
Reply To: {{reply_to}}
```

#### B. **Service Gmail**
1. Allez dans **Email Services** → **service_b96jawv**
2. Vérifiez que Gmail est **connecté**
3. Vérifiez que l'email `dlepetit.maa@gmail.com` est **autorisé**

### 3. **Solutions à essayer**

#### Solution 1: Configuration du template
```
Sujet: {{subject}}

Contenu:
Nouveau message de {{from_name}} - RetraiteClair

De: {{from_name}} ({{from_email}})
Email: {{from_email}}

Message:
{{message}}

---
Message envoyé depuis le formulaire de contact RetraiteClair
```

#### Solution 2: Variables du template
Assurez-vous que le template utilise ces variables :
- `{{from_name}}`
- `{{from_email}}`
- `{{message}}`
- `{{reply_to}}`
- `{{to_email}}`
- `{{subject}}`

#### Solution 3: Test avec debug
1. Ouvrez `debug-emailjs.html`
2. Testez les 3 boutons :
   - "Test EmailJS"
   - "Test avec to_email"
   - "Test avec to_name"
3. Regardez les logs pour identifier le problème

### 4. **Vérifications supplémentaires**

#### A. **Compte EmailJS**
- ✅ Compte actif
- ✅ Service Gmail connecté
- ✅ Template publié et actif

#### B. **Configuration Gmail**
- ✅ Compte Gmail `dlepetit.maa@gmail.com` accessible
- ✅ Autorisation EmailJS accordée
- ✅ Pas de blocage de sécurité

#### C. **Paramètres du code**
- ✅ Service ID correct : `service_b96jawv`
- ✅ Template ID correct : `template_sirltvl`
- ✅ Public Key correct : `gBCd9v4gii2QckAgK`

### 5. **Solutions alternatives**

#### Option A: Recréer le template
1. Supprimez `template_sirltvl`
2. Créez un nouveau template
3. Configurez-le avec l'email de destination
4. Mettez à jour le Template ID dans le code

#### Option B: Utiliser un autre service
1. Créez un nouveau service EmailJS
2. Connectez un autre compte email
3. Testez avec le nouveau service

#### Option C: Configuration manuelle
Dans le template EmailJS, ajoutez explicitement :
```
To Email: dlepetit.maa@gmail.com
```

### 6. **Test final**

Après chaque modification :
1. Sauvegardez le template
2. Testez avec `debug-emailjs.html`
3. Vérifiez les logs
4. Testez le formulaire principal

## 🆘 Si le problème persiste

1. **Contactez le support EmailJS**
2. **Vérifiez les logs détaillés** dans `debug-emailjs.html`
3. **Essayez avec un autre compte email**
4. **Recréez complètement le service et le template**

## 📞 Support

- [Documentation EmailJS](https://www.emailjs.com/docs/)
- [Support EmailJS](https://www.emailjs.com/support/)
- [Forum EmailJS](https://github.com/emailjs-com/emailjs-sdk)





