# 📧 Configuration EmailJS - RetraiteClair

## ✅ Migration terminée
- ❌ **Formspree supprimé** : Tous les fichiers et références Formspree ont été supprimés
- ✅ **EmailJS installé** : Package `@emailjs/browser` installé
- ✅ **ContactForm créé** : Nouveau composant avec EmailJS
- ✅ **Intégration terminée** : Formulaire accessible via le menu "Contact"

## 🔧 Configuration requise

### 1. Créer un compte EmailJS
1. Allez sur [emailjs.com](https://emailjs.com)
2. Créez un compte gratuit
3. Vérifiez votre email

### 2. Créer un service email
1. Dans le dashboard EmailJS, allez dans **"Email Services"**
2. Cliquez sur **"Add New Service"**
3. Choisissez **Gmail** (ou votre fournisseur email)
4. Connectez votre compte Gmail
5. **Copiez le Service ID** (ex: `service_abc123`)

### 3. Créer un template
1. Allez dans **"Email Templates"**
2. Cliquez sur **"Create New Template"**
3. Utilisez ce template :

```html
Sujet: Nouveau message de {{from_name}} - RetraiteClair

De: {{from_name}} ({{from_email}})
Email: {{from_email}}
Message:
{{message}}

---
Message envoyé depuis le formulaire de contact RetraiteClair
```

4. **Copiez le Template ID** (ex: `template_xyz789`)

### 4. Récupérer la clé publique
1. Allez dans **"Account"** > **"General"**
2. **Copiez la Public Key** (déjà fournie: `gBCd9v4gii2QckAgK`)

### 5. Configurer le code
Dans `src/components/ContactForm.jsx`, remplacez :

```javascript
const EMAILJS_CONFIG = {
  serviceId: 'YOUR_SERVICE_ID',        // ← Remplacez par votre Service ID
  templateId: 'YOUR_TEMPLATE_ID',      // ← Remplacez par votre Template ID
  publicKey: 'gBCd9v4gii2QckAgK'      // ← Déjà configuré
};
```

## 📁 Fichiers créés/modifiés

### Nouveaux fichiers :
- `src/components/ContactForm.jsx` - Composant principal
- `src/components/ContactForm.css` - Styles
- `EMAILJS_SETUP.md` - Cette documentation

### Fichiers modifiés :
- `src/App.js` - Import et routage du nouveau composant
- `src/components/Sidebar.js` - Menu "Contact" au lieu de "Votre avis"
- `package.json` - Ajout de `@emailjs/browser`

### Fichiers supprimés :
- Tous les fichiers Formspree (FeedbackForm.jsx, tests, documentation)

## 🚀 Test du formulaire

1. **Lancez l'application** :
   ```bash
   npm start
   ```

2. **Allez sur "Contact"** dans le menu

3. **Testez l'envoi** avec vos vraies clés EmailJS

4. **Vérifiez votre email** `dlepetit.maa@gmail.com`

## 🔒 Sécurité

- ✅ **Champ honeypot** : Protection anti-spam
- ✅ **Validation côté client** : Tous les champs requis
- ✅ **Clé publique** : Sécurisée côté client
- ✅ **Email de destination** : Configuré dans le template

## 📊 Fonctionnalités

- ✅ **Champs requis** : Nom, email, message
- ✅ **Validation** : Email valide, message min 10 caractères
- ✅ **États visuels** : Envoi en cours, succès, erreur
- ✅ **Responsive** : Largeur max 400px, mobile-friendly
- ✅ **Accessibilité** : ARIA, focus, tabindex
- ✅ **Animation** : Spinner sur le bouton d'envoi

## 🆘 Dépannage

### Si l'envoi échoue :
1. Vérifiez que vos clés EmailJS sont correctes
2. Vérifiez que le service Gmail est bien connecté
3. Vérifiez que le template existe et est actif
4. Regardez la console pour les erreurs

### Si l'email n'arrive pas :
1. Vérifiez vos spams
2. Vérifiez que l'email de destination est correct dans le template
3. Attendez quelques minutes (délai d'envoi)

## 📞 Support

Pour toute question sur EmailJS :
- [Documentation EmailJS](https://www.emailjs.com/docs/)
- [Support EmailJS](https://www.emailjs.com/support/)




