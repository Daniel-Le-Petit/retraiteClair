# 🚨 Dépannage EmailJS - Erreur 400 Service ID

## ❌ Problème
```
POST https://api.emailjs.com/api/v1.0/email/send 400 (Bad Request)
"The service ID not found. To find this ID, visit https://dashboard.emailjs.com/admin"
```

## 🔍 Diagnostic

### 1. **Vérification du Service ID**

Le Service ID `service_b96jawv` n'est pas trouvé. Cela peut arriver si :

- ❌ Le service a été supprimé
- ❌ Le service n'est pas actif
- ❌ L'ID est incorrect
- ❌ Le service n'est pas connecté à Gmail

### 2. **Solutions immédiates**

#### Solution A: Vérifier le service existant
1. Allez sur [dashboard.emailjs.com/admin](https://dashboard.emailjs.com/admin)
2. Vérifiez que `service_b96jawv` existe
3. Vérifiez qu'il est **actif** et **connecté à Gmail**

#### Solution B: Créer un nouveau service
1. Allez sur [emailjs.com](https://emailjs.com)
2. Cliquez sur **"Email Services"**
3. Cliquez sur **"Add New Service"**
4. Choisissez **"Gmail"**
5. Connectez votre compte Gmail `retraiteClair@gmail.com`
6. **Copiez le nouveau Service ID**

#### Solution C: Vérifier la connexion Gmail
1. Dans **Email Services** → **service_b96jawv**
2. Vérifiez que Gmail est **connecté**
3. Si non, reconnectez le compte Gmail
4. Autorisez EmailJS à accéder à Gmail

### 3. **Mise à jour du code**

Si vous avez un nouveau Service ID, mettez à jour le fichier `ContactForm.jsx` :

```javascript
const EMAILJS_CONFIG = {
  serviceId: 'service_NOUVEAU_ID',        // ← Nouveau Service ID
  templateId: 'template_sirltvl',         // ← Template ID (inchangé)
  publicKey: 'gBCd9v4gii2QckAgK'         // ← Public Key (inchangé)
};
```

### 4. **Test de diagnostic**

Ouvrez `debug-emailjs.html` et testez avec le nouveau Service ID.

### 5. **Vérifications complètes**

#### A. **Service EmailJS**
- ✅ Service existe et est actif
- ✅ Gmail est connecté
- ✅ Email `retraiteClair@gmail.com` est autorisé

#### B. **Template EmailJS**
- ✅ Template `template_sirltvl` existe
- ✅ Template est actif
- ✅ Adresse de destination configurée

#### C. **Configuration du code**
- ✅ Service ID correct
- ✅ Template ID correct
- ✅ Public Key correct

### 6. **Création d'un nouveau service (étape par étape)**

1. **Connectez-vous** à [emailjs.com](https://emailjs.com)
2. **Email Services** → **Add New Service**
3. **Choisissez Gmail**
4. **Connectez** votre compte Gmail
5. **Autorisez** EmailJS
6. **Copiez** le Service ID
7. **Mettez à jour** le code
8. **Testez** le formulaire

### 7. **Variables à vérifier**

Dans le dashboard EmailJS, vérifiez :
- **Service ID** : `service_xxxxxxx`
- **Template ID** : `template_xxxxxxx`
- **Public Key** : `xxxxxxxxxxxxx`

### 8. **Test final**

Après chaque modification :
1. Sauvegardez le code
2. Testez avec `debug-emailjs.html`
3. Vérifiez les logs
4. Testez le formulaire principal

## 🆘 Si le problème persiste

1. **Recréez complètement** le service EmailJS
2. **Recréez** le template
3. **Vérifiez** que Gmail est bien connecté
4. **Testez** avec un autre compte email temporairement

## 📞 Support

- [Dashboard EmailJS](https://dashboard.emailjs.com/admin)
- [Documentation EmailJS](https://www.emailjs.com/docs/)
- [Support EmailJS](https://www.emailjs.com/support/)

