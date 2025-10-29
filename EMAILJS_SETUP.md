# Configuration EmailJS pour l'envoi automatique d'emails

## 📋 Prérequis

EmailJS est **déjà installé** dans le projet. Il permet d'envoyer des emails directement depuis le frontend sans backend, en restant sur **Static Site** sur Render.

## 🚀 Étapes de configuration

### 1. Créer un compte EmailJS (Gratuit)

1. Allez sur [https://www.emailjs.com/](https://www.emailjs.com/)
2. Créez un compte gratuit (200 emails/mois)
3. Vérifiez votre email

### 2. Configurer un service email

1. Dans le Dashboard EmailJS, allez dans **"Email Services"**
2. Cliquez sur **"Add New Service"**
3. Choisissez votre fournisseur email :
   - **Gmail** (recommandé pour commencer)
   - **Outlook**
   - **Yahoo**
   - Ou un autre service SMTP personnalisé

4. Suivez les instructions pour connecter votre compte email
5. Notez le **Service ID** (ex: `service_xxxxx`)

### 3. Créer un template d'email

1. Allez dans **"Email Templates"**
2. Cliquez sur **"Create New Template"**
3. Utilisez ce template de base :

```
Subject: {{subject}}

Bonjour {{to_name}},

Voici votre simulation de retraite progressive générée le {{date_simulation}}.

📊 Vos résultats :
• Revenu total net : {{total_net}}
• Salaire temps partiel : {{salaire_partiel}}
• Pension retraite : {{pension}}
• Temps partiel : {{temps_partiel}}
• Économie fiscale annuelle : {{economie_fiscale}}

{{message}}

Cordialement,
L'équipe RetraiteClair
```

4. Les variables disponibles :
   - `{{to_email}}` - Email du destinataire
   - `{{to_name}}` - Nom du destinataire
   - `{{subject}}` - Sujet de l'email
   - `{{total_net}}` - Revenu total net formaté
   - `{{salaire_partiel}}` - Salaire temps partiel formaté
   - `{{pension}}` - Pension formatée
   - `{{temps_partiel}}` - Pourcentage de temps partiel
   - `{{economie_fiscale}}` - Économie fiscale formatée
   - `{{date_simulation}}` - Date de la simulation
   - `{{message}}` - Message personnalisé

5. Notez le **Template ID** (ex: `template_xxxxx`)

### 4. Récupérer votre clé publique

1. Allez dans **"Account"** > **"General"**
2. Trouvez votre **Public Key** (ex: `xxxxx`)
3. Notez-la

### 5. Configurer les variables d'environnement

1. Créez un fichier `.env` à la racine du projet (copiez `.env.example`)
2. Remplissez les variables :

```env
REACT_APP_EMAILJS_PUBLIC_KEY=votre_public_key
REACT_APP_EMAILJS_SERVICE_ID=votre_service_id
REACT_APP_EMAILJS_TEMPLATE_ID=votre_template_id
```

3. **IMPORTANT** : Ajoutez `.env` au `.gitignore` pour ne pas commiter vos clés

### 6. Redémarrer le serveur de développement

```bash
npm start
```

### 7. Déployer sur Render

1. Dans votre projet Render, allez dans **"Environment"**
2. Ajoutez les 3 variables d'environnement :
   - `REACT_APP_EMAILJS_PUBLIC_KEY`
   - `REACT_APP_EMAILJS_SERVICE_ID`
   - `REACT_APP_EMAILJS_TEMPLATE_ID`

3. Redéployez votre site statique

## ✅ Test

1. Rendez-vous sur votre site
2. Complétez une simulation
3. Dans la section "Recevoir par email", entrez votre email
4. Cliquez sur "Envoyer"
5. Vérifiez votre boîte mail !

## 🔒 Sécurité

- Les clés EmailJS sont **publiques** par design (elles sont visibles dans le code frontend)
- C'est normal et sécurisé pour EmailJS
- EmailJS limite automatiquement le nombre d'emails envoyés
- Vous pouvez configurer des restrictions par domaine dans EmailJS

## 💰 Coûts

- **Gratuit** : 200 emails/mois
- **Paid** : À partir de $15/mois pour 1000 emails/mois

## 🐛 Dépannage

**Erreur "Configuration EmailJS manquante"**
- Vérifiez que les variables d'environnement sont bien définies
- Redémarrez le serveur après avoir ajouté les variables

**Email non reçu**
- Vérifiez vos spams
- Vérifiez les logs dans le Dashboard EmailJS
- Testez avec un autre email

**Limite dépassée**
- Vérifiez votre quota dans EmailJS Dashboard
- Passez au plan payant si nécessaire

## 📝 Notes

- L'email est envoyé depuis votre compte email configuré dans EmailJS
- Le PDF n'est pas encore attaché automatiquement (amélioration future possible)
- Pour ajouter le PDF, il faudrait utiliser l'API EmailJS avec des fichiers en base64
