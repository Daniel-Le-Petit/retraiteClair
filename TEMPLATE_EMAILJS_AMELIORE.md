# 📧 Template EmailJS Amélioré - Affichage de l'expéditeur

## 🚨 Problème identifié
L'adresse email de l'expéditeur n'apparaît pas dans l'email reçu.

## ✅ Solution : Template HTML complet

### 📋 **Template à copier dans EmailJS :**

```html
<!DOCTYPE html>
<html>
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Nouveau message RetraiteClair</title>
    <style>
        body {
            font-family: Arial, sans-serif;
            line-height: 1.6;
            color: #333;
            max-width: 600px;
            margin: 0 auto;
            padding: 20px;
            background-color: #f9f9f9;
        }
        .container {
            background: white;
            padding: 30px;
            border-radius: 10px;
            box-shadow: 0 2px 10px rgba(0,0,0,0.1);
        }
        .header {
            text-align: center;
            border-bottom: 3px solid #10b981;
            padding-bottom: 20px;
            margin-bottom: 30px;
        }
        .logo {
            max-width: 200px;
            height: auto;
            margin-bottom: 15px;
        }
        .info-box {
            background: #f0f9ff;
            border: 1px solid #0ea5e9;
            border-radius: 8px;
            padding: 20px;
            margin: 20px 0;
        }
        .info-row {
            display: flex;
            margin: 10px 0;
            padding: 8px 0;
            border-bottom: 1px solid #e5e7eb;
        }
        .info-row:last-child {
            border-bottom: none;
        }
        .info-label {
            font-weight: bold;
            color: #374151;
            min-width: 120px;
            margin-right: 15px;
        }
        .info-value {
            color: #1f2937;
            flex: 1;
        }
        .message-box {
            background: #f9fafb;
            border-left: 4px solid #10b981;
            padding: 20px;
            margin: 20px 0;
            border-radius: 0 8px 8px 0;
        }
        .message-label {
            font-weight: bold;
            color: #374151;
            margin-bottom: 10px;
            font-size: 16px;
        }
        .message-content {
            color: #1f2937;
            white-space: pre-wrap;
            line-height: 1.7;
        }
        .footer {
            text-align: center;
            margin-top: 30px;
            padding-top: 20px;
            border-top: 1px solid #e5e7eb;
            color: #6b7280;
            font-size: 14px;
        }
        .reply-button {
            display: inline-block;
            background: #10b981;
            color: white;
            padding: 12px 24px;
            text-decoration: none;
            border-radius: 6px;
            margin: 15px 0;
            font-weight: bold;
        }
        .reply-button:hover {
            background: #059669;
        }
    </style>
</head>
<body>
    <div class="container">
        <!-- En-tête avec logo -->
        <div class="header">
            <img src="https://retraiteclair.onrender.com/logo-retraiteclair.svg" 
                 alt="RetraiteClair" 
                 class="logo">
            <h1 style="color: #10b981; margin: 0;">Nouveau message de contact</h1>
        </div>

        <!-- Informations de l'expéditeur -->
        <div class="info-box">
            <h3 style="color: #0ea5e9; margin-top: 0;">📧 Informations de l'expéditeur</h3>
            
            <div class="info-row">
                <div class="info-label">👤 Nom :</div>
                <div class="info-value">{{from_name}}</div>
            </div>
            
            <div class="info-row">
                <div class="info-label">📮 Email :</div>
                <div class="info-value">
                    <a href="mailto:{{from_email}}" style="color: #0ea5e9; text-decoration: none;">
                        {{from_email}}
                    </a>
                </div>
            </div>
            
            <div class="info-row">
                <div class="info-label">📅 Date :</div>
                <div class="info-value">{{date}}</div>
            </div>
            
            <div class="info-row">
                <div class="info-label">🎯 Sujet :</div>
                <div class="info-value">{{subject}}</div>
            </div>
        </div>

        <!-- Message -->
        <div class="message-box">
            <div class="message-label">💬 Message :</div>
            <div class="message-content">{{message}}</div>
        </div>

        <!-- Bouton de réponse -->
        <div style="text-align: center;">
            <a href="mailto:{{from_email}}?subject=Re: {{subject}}" class="reply-button">
                📧 Répondre à {{from_name}}
            </a>
        </div>

        <!-- Pied de page -->
        <div class="footer">
            <p>Ce message a été envoyé depuis le formulaire de contact de <strong>RetraiteClair</strong></p>
            <p>Pour répondre, cliquez sur le bouton ci-dessus ou envoyez un email à : <strong>{{from_email}}</strong></p>
        </div>
    </div>
</body>
</html>
```

## 🔧 **Étapes pour appliquer le template :**

### 1. **Accédez à EmailJS**
- Allez sur [emailjs.com](https://emailjs.com)
- Connectez-vous à votre compte
- Allez dans **"Email Templates"**

### 2. **Modifiez le template**
- Ouvrez le template `template_sirltvl`
- **Supprimez tout le contenu existant**
- **Collez le template HTML complet** ci-dessus
- **Sauvegardez** le template

### 3. **Variables utilisées**
Le template utilise ces variables EmailJS :
- `{{from_name}}` - Nom de l'expéditeur
- `{{from_email}}` - Email de l'expéditeur
- `{{message}}` - Message
- `{{subject}}` - Sujet
- `{{date}}` - Date d'envoi

### 4. **Test**
- Testez avec `debug-emailjs.html`
- Vérifiez que l'email de l'expéditeur apparaît bien

## ✅ **Avantages de ce template :**

1. **📧 Email de l'expéditeur visible** dans une section dédiée
2. **🔗 Lien de réponse direct** vers l'email de l'expéditeur
3. **📱 Design responsive** pour mobile et desktop
4. **🎨 Style professionnel** avec le logo RetraiteClair
5. **📋 Toutes les informations** clairement organisées

## 🚀 **Résultat attendu :**

Après avoir appliqué ce template, vous devriez recevoir des emails avec :
- ✅ Le nom de l'expéditeur
- ✅ L'email de l'expéditeur (cliquable)
- ✅ La date d'envoi
- ✅ Le message complet
- ✅ Un bouton pour répondre directement




