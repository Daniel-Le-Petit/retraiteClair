# 🔧 Configuration du Template EmailJS

## 🚨 Problème identifié
Erreur 422 : "The recipients address is empty"

## ✅ Solution

### 1. Configurer le template EmailJS

Allez sur [emailjs.com](https://emailjs.com) → **Email Templates** → **template_sirltvl**

### 2. Configuration du template

**Sujet :**
```
{{subject}}
```

**Contenu :**
```
Nouveau message de {{from_name}} - RetraiteClair

De: {{from_name}} ({{from_email}})
Email: {{from_email}}

Message:
{{message}}

---
Message envoyé depuis le formulaire de contact RetraiteClair
```

### 3. Configuration des paramètres

Dans la section **"Settings"** du template :

- **To Email** : `dlepetit.maa@gmail.com`
- **From Name** : `{{from_name}}`
- **From Email** : `{{from_email}}`
- **Reply To** : `{{reply_to}}`

### 4. Variables disponibles

Le formulaire envoie ces variables :
- `{{from_name}}` - Nom de l'expéditeur
- `{{from_email}}` - Email de l'expéditeur
- `{{message}}` - Message
- `{{reply_to}}` - Email pour répondre
- `{{to_name}}` - Nom du destinataire (RetraiteClair)
- `{{subject}}` - Sujet de l'email

### 5. Sauvegarder et tester

1. **Sauvegardez** le template
2. **Testez** le formulaire de contact
3. **Vérifiez** votre boîte email `dlepetit.maa@gmail.com`

## 🎯 Résultat attendu

Après cette configuration, le formulaire devrait :
- ✅ Envoyer les emails sans erreur 422
- ✅ Arriver sur `dlepetit.maa@gmail.com`
- ✅ Afficher le message de succès

## 🆘 Si le problème persiste

1. Vérifiez que le template est **actif**
2. Vérifiez que l'adresse **"To Email"** est bien `dlepetit.maa@gmail.com`
3. Vérifiez que le service Gmail est bien **connecté**
4. Testez avec un email simple d'abord




