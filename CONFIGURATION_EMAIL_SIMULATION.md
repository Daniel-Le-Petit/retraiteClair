# 📧 Configuration Email pour les Simulations - RetraiteClair

## ✅ Statut

L'envoi d'email pour les simulations utilise **exactement la même configuration** que le formulaire de contact.

- **Service EmailJS** : `service_go62bxn` (Gmail)
- **Template EmailJS** : `template_sirltvl` (actuellement partagé avec le contact)
- **Clé publique** : `gBCd9v4gii2QckAgK`

## 📝 Template Email Actuel

Le template `template_sirltvl` reçoit ces variables :

### Variables envoyées depuis le formulaire de contact :
- `from_name` - Nom de l'expéditeur
- `from_email` - Email de l'expéditeur
- `message` - Message du formulaire
- `reply_to` - Email de réponse
- `to_email` - Email de destination
- `to_name` - Nom du destinataire
- `subject` - Sujet de l'email
- `date` - Date formatée

### Variables envoyées depuis la simulation :
- `to_email` - Email du destinataire
- `to_name` - "Utilisateur RetraiteClair"
- `from_email` - "retraiteClair@gmail.com"
- `from_name` - "RetraiteClair"
- `reply_to` - "retraiteClair@gmail.com"
- `subject` - "Votre simulation Retraite Progressive - RetraiteClair"
- `message` - Message complet avec tous les résultats de simulation formatés
- `date` - Date formatée

## 🔧 Option 1 : Utiliser le template existant (actuel)

Le template actuel devrait fonctionner car il utilise principalement la variable `{{message}}` qui contient toutes les informations.

**Vérification nécessaire :** Vérifiez que le template `template_sirltvl` utilise bien `{{message}}` pour afficher le contenu.

## 🎯 Option 2 : Créer un template dédié (recommandé pour l'avenir)

Pour un meilleur formatage et une meilleure expérience utilisateur, créez un nouveau template spécifique aux simulations :

### Étapes :

1. **Dans EmailJS Dashboard :**
   - Allez dans "Email Templates"
   - Cliquez sur "Create New Template"
   - Nommez-le : "Template Simulation Retraite"

2. **Configurez le template :**

```
Subject: {{subject}}

Bonjour {{to_name}},

{{message}}

---
Date de génération : {{date}}
RetraiteClair - Simulateur Retraite Progressive
https://retraiteclair.com
```

3. **Notez le nouveau Template ID**

4. **Mettez à jour `src/utils/sendEmail.js` :**

```javascript
const EMAILJS_CONFIG = {
  serviceId: 'service_go62bxn',
  templateId: 'template_NOUVEAU_ID',  // ← Nouveau template ID
  publicKey: 'gBCd9v4gii2QckAgK'
};
```

## ✅ Test

1. Complétez une simulation
2. Entrez votre email dans "Recevoir par email"
3. Cliquez sur "Envoyer"
4. Vérifiez votre boîte mail (vérifiez aussi les spams)

## 🔍 Dépannage

**Si l'email n'arrive pas :**
1. Vérifiez les logs dans la console du navigateur
2. Vérifiez les logs dans EmailJS Dashboard > Logs
3. Vérifiez que le quota n'est pas dépassé (200 emails/mois gratuit)

**Si l'erreur "service ID not found" :**
- Vérifiez que `service_go62bxn` est bien actif dans EmailJS Dashboard

**Si l'erreur "template ID not found" :**
- Vérifiez que `template_sirltvl` existe bien
- Ou créez un nouveau template et mettez à jour l'ID

## 📊 Format du message de simulation

Le message envoyé contient :

```
Voici votre simulation de retraite progressive générée le [DATE]

📊 VOS RÉSULTATS :

💰 Revenu total net mensuel : [MONTANT]
💼 Salaire temps partiel : [MONTANT]
🏦 Pension retraite : [MONTANT]
⏰ Temps partiel : [POURCENTAGE]%
📈 Économie fiscale annuelle : [MONTANT]

Pour plus de détails et pour modifier vos paramètres, visitez https://retraiteclair.com

Cordialement,
L'équipe RetraiteClair
```




