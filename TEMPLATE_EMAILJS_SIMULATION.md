# 📧 Template EmailJS pour les Simulations - Configuration

## Template ID: `template_amj5ayi`

Ce document explique comment configurer votre template EmailJS pour recevoir les emails de simulation avec toutes les informations demandées.

## ⚙️ Configuration du Template dans EmailJS Dashboard

### 1. Paramètres du Template

Allez sur [emailjs.com](https://emailjs.com) → **Email Templates** → **template_amj5ayi**

#### Paramètres obligatoires :
- **To Email** : `{{to_email}}` ⚠️ **IMPORTANT** : Utilisez la variable, pas une adresse fixe
- **From Name** : `RetraiteClair`
- **Subject** : `{{subject}}` (ou fixe : "Votre simulation Retraite Progressive - RetraiteClair")
- **Reply To** : `{{reply_to}}` (ou fixe : retraiteclair@gmail.com)

### 2. Contenu du Template

Copiez ce template dans le champ "Content" de votre template EmailJS :

```
📧 Informations de l'expéditeur

👤 Nom : {{sender_name}}
📮 Email : {{sender_email}}
📅 Date : {{date}} {{time}}
🎯 Sujet : {{subject}}

💬 Message :

{{message}}
```

**OU** si vous voulez plus de contrôle sur le formatage, utilisez cette version détaillée :

```
📧 Informations de l'expéditeur

👤 Nom : {{sender_name}}
📮 Email : {{sender_email}}
📅 Date : {{date}} {{time}}

🎯 Sujet : {{subject}}

💬 Message :

Voici votre simulation de retraite progressive générée le {{date_time}}

VOS RÉSULTATS :

💰 Revenu total net mensuel : {{revenu_total}}
💼 Salaire temps partiel : {{salaire_temps_partiel}}
🏦 Pension retraite : {{pension_retraite}}
⏰ Temps partiel : {{temps_partiel}}
📈 Économie fiscale annuelle : {{economie_fiscale}}

Pour plus de détails et pour modifier vos paramètres, visitez {{website_url}}

Cordialement,
L'équipe RetraiteClair
📧 Répondre à {{reply_to}}
```

## 📋 Variables Disponibles dans le Template

| Variable | Description | Exemple |
|----------|-------------|---------|
| `{{to_email}}` | Email du destinataire (utilisateur) | `user@example.com` |
| `{{to_name}}` | Nom du destinataire (dérivé de l'email) | `user` |
| `{{sender_name}}` | Nom de l'expéditeur | `RetraiteClair` |
| `{{sender_email}}` | Email de l'expéditeur | `retraiteClair@gmail.com` |
| `{{subject}}` | Sujet de l'email | `Votre simulation Retraite Progressive - RetraiteClair` |
| `{{date}}` | Date formatée | `15 janvier 2025` |
| `{{time}}` | Heure formatée | `14:30` |
| `{{date_time}}` | Date et heure complètes | `15 janvier 2025 14:30` |
| `{{message}}` | Message complet avec tous les résultats | *Message formaté* |
| `{{revenu_total}}` | Revenu total net mensuel formaté | `2 500 €` |
| `{{salaire_temps_partiel}}` | Salaire temps partiel formaté | `1 200 €` |
| `{{pension_retraite}}` | Pension retraite formatée | `1 300 €` |
| `{{temps_partiel}}` | Pourcentage temps partiel | `80%` |
| `{{economie_fiscale}}` | Économie fiscale annuelle formatée | `1 500 €` |
| `{{reply_to}}` | Email de réponse | `retraiteclair@gmail.com` |
| `{{website_url}}` | URL du site | `https://retraiteclair.onrender.com` |

## ✅ Vérification

1. ✅ Template ID `template_amj5ayi` configuré dans EmailJS
2. ✅ **To Email** utilise `{{to_email}}` (pas une adresse fixe)
3. ✅ Variables du template correspondent à celles utilisées dans le code
4. ✅ Test d'envoi réussi

## 🔍 Test

Pour tester l'envoi :
1. Allez sur votre site retraiteclair
2. Effectuez une simulation
3. Cliquez sur "Recevoir par email"
4. Entrez votre adresse email
5. Vérifiez que vous recevez l'email avec toutes les informations

## 📝 Notes

- Le template utilise le format demandé avec toutes les informations de l'expéditeur
- Les montants sont formatés en euros (ex: `2 500 €`)
- La date et l'heure sont séparées pour plus de flexibilité
- Le message complet inclut tous les résultats de simulation
