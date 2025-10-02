# ⚡ Configuration EmailJS - Guide Rapide

## 🚨 Problème actuel
Le formulaire de contact affiche l'erreur : **"Configuration EmailJS manquante"**

## 🔧 Solution rapide (5 minutes)

### 1. Créer un compte EmailJS
1. Allez sur [emailjs.com](https://emailjs.com)
2. Cliquez sur **"Sign Up"** (gratuit)
3. Créez votre compte avec votre email

### 2. Créer un service email
1. Dans le dashboard, cliquez sur **"Email Services"**
2. Cliquez sur **"Add New Service"**
3. Choisissez **"Gmail"**
4. Connectez votre compte Gmail `dlepetit.maa@gmail.com`
5. **Copiez le Service ID** (ex: `service_abc123`)

### 3. Créer un template
1. Cliquez sur **"Email Templates"**
2. Cliquez sur **"Create New Template"**
3. Utilisez ce template :

```
Sujet: Nouveau message de {{from_name}} - RetraiteClair

De: {{from_name}} ({{from_email}})
Email: {{from_email}}

Message:
{{message}}

---
Message envoyé depuis le formulaire de contact RetraiteClair
```

4. **Copiez le Template ID** (ex: `template_xyz789`)

### 4. Configurer le code
Dans `src/components/ContactForm.jsx`, ligne 15-19, remplacez :

```javascript
const EMAILJS_CONFIG = {
  serviceId: 'YOUR_SERVICE_ID',        // ← Remplacez par votre Service ID
  templateId: 'YOUR_TEMPLATE_ID',      // ← Remplacez par votre Template ID
  publicKey: 'gBCd9v4gii2QckAgK'      // ← Déjà configuré
};
```

**Par :**

```javascript
const EMAILJS_CONFIG = {
  serviceId: 'service_abc123',         // ← Votre vrai Service ID
  templateId: 'template_xyz789',       // ← Votre vrai Template ID
  publicKey: 'gBCd9v4gii2QckAgK'      // ← Déjà configuré
};
```

### 5. Tester
1. Sauvegardez le fichier
2. Rechargez la page
3. Testez l'envoi d'un message

## ✅ Résultat attendu
- Le message s'envoie sans erreur
- Vous recevez l'email sur `dlepetit.maa@gmail.com`
- Le formulaire se réinitialise après envoi

## 🆘 Si ça ne marche pas
1. Vérifiez que vos clés sont correctes
2. Vérifiez que le service Gmail est bien connecté
3. Vérifiez que le template est actif
4. Regardez la console pour d'autres erreurs

## 📧 Alternative rapide
Si vous voulez tester immédiatement, vous pouvez temporairement utiliser un service de test comme [webhook.site](https://webhook.site) en remplaçant l'URL EmailJS par votre webhook.
