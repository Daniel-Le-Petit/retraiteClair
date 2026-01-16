# 🚨 Dépannage : Template EmailJS introuvable pour les Simulations

## Erreur rencontrée
```
Erreur EmailJS: The template ID not found. To find this ID, visit https://dashboard.emailjs.com/admin/templates
```

## ✅ Solution : Vérifier et créer le template

### Étape 1 : Vérifier si le template existe

1. Connectez-vous à [EmailJS Dashboard](https://dashboard.emailjs.com/admin/templates)
2. Vérifiez si un template avec l'ID `template_amj5ayi` existe
3. Si **OUI** : Vérifiez que le Template ID est correctement copié
4. Si **NON** : Passez à l'étape 2

### Étape 2 : Créer le template dans EmailJS

1. Allez sur [EmailJS Dashboard](https://dashboard.emailjs.com/admin/templates)
2. Cliquez sur **"Create New Template"** ou **"+ Add New Template"**
3. Configurez le template :

#### **Paramètres du Template** :
- **Template Name** : `Simulation Retraite Progressive` (ou le nom de votre choix)
- **Service** : Sélectionnez `service_go62bxn` (votre service Gmail)
- **To Email** : `{{to_email}}` ⚠️ **IMPORTANT** : Utilisez la variable, pas une adresse fixe
- **From Name** : `RetraiteClair`
- **Subject** : `{{subject}}`
- **Reply To** : `{{reply_to}}` (ou `retraiteclair@gmail.com`)

#### **Contenu du Template** :

Copiez ce contenu dans le champ "Content" :

```
📧 Informations de l'expéditeur

👤 Nom : {{sender_name}}
📮 Email : {{sender_email}}
📅 Date : {{date}} {{time}}
🎯 Sujet : {{subject}}

💬 Message :

{{message}}
```

4. **Sauvegardez** le template
5. **Copiez le Template ID** : Il devrait ressembler à `template_xxxxxxxxx`

### Étape 3 : Vérifier le Template ID dans le code

1. Ouvrez le fichier `src/utils/sendEmail.js`
2. Vérifiez que le `templateId` correspond à celui copié dans EmailJS
3. Si différent, remplacez `template_amj5ayi` par votre vrai Template ID

```javascript
const EMAILJS_CONFIG = {
  serviceId: 'service_go62bxn',
  templateId: 'template_xxxxxxxxx', // ← Remplacez par votre Template ID
  publicKey: 'gBCd9v4gii2QckAgK'
};
```

### Étape 4 : Tester

1. Rafraîchissez votre application
2. Effectuez une simulation
3. Cliquez sur "Recevoir par email"
4. Entrez votre adresse email
5. Vérifiez que l'email est bien envoyé

## 🔍 Vérifications complémentaires

### Vérifier le Service ID
- Allez sur [Email Services](https://dashboard.emailjs.com/admin/integration)
- Vérifiez que `service_go62bxn` existe et est actif

### Vérifier la Public Key
- Allez sur [Account > General](https://dashboard.emailjs.com/admin)
- Vérifiez que la Public Key est bien `gBCd9v4gii2QckAgK`

### Vérifier les logs EmailJS
- Allez sur [Email Logs](https://dashboard.emailjs.com/admin/logs)
- Consultez les erreurs récentes pour plus de détails

## 📝 Variables utilisées dans le template

Assurez-vous que votre template EmailJS contient ces variables :

| Variable | Description |
|----------|-------------|
| `{{to_email}}` | Email du destinataire |
| `{{sender_name}}` | Nom de l'expéditeur (RetraiteClair) |
| `{{sender_email}}` | Email de l'expéditeur |
| `{{date}}` | Date formatée |
| `{{time}}` | Heure formatée |
| `{{subject}}` | Sujet de l'email |
| `{{message}}` | Message complet avec résultats |

Pour plus de détails, consultez `TEMPLATE_EMAILJS_SIMULATION.md`

## ⚠️ Note importante

Si vous utilisez `{{to_email}}` dans le champ "To Email" du template, EmailJS enverra l'email à l'adresse spécifiée dans cette variable. **Ne mettez pas une adresse email fixe** dans ce champ, sinon tous les emails iront à cette adresse au lieu d'aller aux utilisateurs.

## 💡 Solution temporaire

Si vous voulez tester rapidement avec un template existant :

1. Utilisez temporairement le template `template_sirltvl` (le template du formulaire de contact)
2. Dans `src/utils/sendEmail.js`, remplacez :
   ```javascript
   templateId: 'template_amj5ayi',
   ```
   par :
   ```javascript
   templateId: 'template_sirltvl',
   ```
3. Testez l'envoi
4. Une fois le nouveau template créé, remplacez par le bon Template ID
