# RetraiteClair

Simulateur de retraite progressive pour la France - Outil gratuit et transparent pour calculer vos revenus en retraite progressive.

## 🚀 Fonctionnalités

- **Mode simplifié** : Calcul rapide en 2 minutes avec 3 informations clés
- **Mode avancé** : Calcul détaillé avec tous vos paramètres personnels
- **Impact fiscal** : Calcul automatique des économies d'impôts
- **Comparaison de scénarios** : Visualisez différents pourcentages de temps partiel
- **Transparence** : Détail complet des calculs avec formules officielles

## 📋 Prérequis

- Node.js 16+ et npm
- Docker (optionnel, pour le déploiement en conteneur)

## 🛠️ Installation

### Développement local

```bash
# Cloner le repository
git clone https://github.com/retraiteclair/retraiteclair.git
cd retraiteclair

# Installer les dépendances
npm install

# Copier le fichier d'environnement
cp .env.example .env

# Éditer .env avec vos clés (voir .env.example)

# Lancer le serveur de développement
npm start
```

Le site sera accessible sur `http://localhost:3000`

### Build de production

```bash
npm run build
```

Les fichiers optimisés seront dans le dossier `build/`

## 🐳 Self-hosting avec Docker

### Prérequis

- Docker 20.10+ et Docker Compose (optionnel)
- Node.js 18+ pour le développement local

### Dockerfile multi-stage

Un Dockerfile optimisé multi-stage est fourni pour la production. Il construit l'application React et la sert via nginx avec des headers de sécurité.

#### Build de l'image

```bash
# Build avec les variables d'environnement
docker build \
  --build-arg REACT_APP_VERSION=1.0.0 \
  --build-arg REACT_APP_FORMULA_VERSION=1.0.0 \
  --build-arg REACT_APP_BUILD_DATE=$(date -u +"%Y-%m-%dT%H:%M:%SZ") \
  -t retraiteclair:latest .
```

#### Lancer le conteneur

```bash
# Lancer le conteneur avec les variables d'environnement
docker run -d -p 3000:80 \
  --name retraiteclair \
  -e REACT_APP_FORMULA_VERSION=1.0.0 \
  -e REACT_APP_EMAILJS_PUBLIC_KEY=your_key \
  -e REACT_APP_EMAILJS_SERVICE_ID=your_service \
  -e REACT_APP_EMAILJS_TEMPLATE_ID=your_template \
  retraiteclair:latest
```

#### Vérifier le conteneur

```bash
# Vérifier les logs
docker logs retraiteclair

# Vérifier le health check
curl http://localhost:3000/api/health
```

### Docker Compose

Créez un fichier `docker-compose.yml` :

```yaml
version: '3.8'
services:
  retraiteclair:
    build:
      context: .
      args:
        REACT_APP_VERSION: 1.0.0
        REACT_APP_FORMULA_VERSION: 1.0.0
        REACT_APP_BUILD_DATE: "${BUILD_DATE:-$(date -u +%Y-%m-%dT%H:%M:%SZ)}"
    ports:
      - "3000:80"
    environment:
      - REACT_APP_FORMULA_VERSION=1.0.0
      - REACT_APP_EMAILJS_PUBLIC_KEY=${EMAILJS_PUBLIC_KEY}
      - REACT_APP_EMAILJS_SERVICE_ID=${EMAILJS_SERVICE_ID}
      - REACT_APP_EMAILJS_TEMPLATE_ID=${EMAILJS_TEMPLATE_ID}
    restart: unless-stopped
    healthcheck:
      test: ["CMD", "wget", "--quiet", "--tries=1", "--spider", "http://localhost/api/health"]
      interval: 30s
      timeout: 3s
      retries: 3
      start_period: 5s
```

```bash
# Lancer avec Docker Compose
docker-compose up -d

# Voir les logs
docker-compose logs -f

# Arrêter
docker-compose down
```

### Audit du conteneur

Pour auditer le conteneur et vérifier son contenu :

```bash
# Inspecter l'image
docker inspect retraiteclair:latest

# Entrer dans le conteneur
docker exec -it retraiteclair sh

# Vérifier les fichiers
docker exec retraiteclair ls -la /usr/share/nginx/html

# Vérifier la configuration nginx
docker exec retraiteclair cat /etc/nginx/conf.d/default.conf
```

## 📦 Structure du projet

```
retraiteclair/
├── public/              # Fichiers statiques
├── src/
│   ├── components/      # Composants React
│   ├── data/           # Données (testimonials.json, etc.)
│   ├── pages/          # Pages (mentions-legales, politique-confidentialite, etc.)
│   ├── utils/          # Utilitaires (validation, logging)
│   └── App.js          # Point d'entrée
├── .env.example        # Exemple de variables d'environnement
├── package.json        # Dépendances
└── README.md           # Ce fichier
```

## 🔒 Sécurité et conformité

### RGPD / CNIL

- ✅ Politique de confidentialité complète
- ✅ Gestion des cookies avec consentement
- ✅ Liste exhaustive des données collectées (localStorage, sessionStorage, cookies)
- ✅ Droits des utilisateurs (accès, rectification, suppression)
- ✅ Contact DPO et réclamation CNIL

### Sécurité

- ✅ Validation des entrées avec Zod
- ✅ Headers de sécurité (via serveur/proxy)
- ✅ HTTPS forcé en production
- ✅ Pas de données personnelles dans les logs

## 📊 Sources des calculs

Les calculs sont basés sur :
- Code de la sécurité sociale (Articles L. 161-17-2 et suivants)
- Simulateur M@rel (référence officielle)
- Barèmes 2024 (plafond SS, valeur point Agirc-Arrco, etc.)

Voir la page [À propos](/a-propos) pour plus de détails.

## 🧪 Tests

```bash
# Tests automatisés
npm run test:automated

# Tests manuels
npm run test:manual

# Tous les tests
npm run test:all
```

## 📝 Variables d'environnement

Voir `.env.example` pour la liste complète. Variables principales :

- `REACT_APP_FORMULA_VERSION` : Version de la formule de calcul
- `REACT_APP_EMAILJS_*` : Configuration EmailJS pour le formulaire de contact
- `REACT_APP_GA_MEASUREMENT_ID` : Google Analytics (optionnel)

## 🚀 Déploiement

### Render.com (recommandé)

Le projet est configuré pour Render avec `render.yaml`. Déployez simplement en connectant votre repository GitHub.

### Autres plateformes

Le build produit des fichiers statiques compatibles avec :
- Netlify
- Vercel
- GitHub Pages
- Tout serveur web statique

## 📄 Licence

MIT

## 🤝 Contribution

Les contributions sont les bienvenues ! Veuillez ouvrir une issue ou une pull request.

## 📧 Contact

- Email : contact@retraiteclair.fr
- Site : https://retraiteclair.com

---

**Note importante** : Les résultats du simulateur sont indicatifs et non contractuels. Vérifiez toujours vos calculs avec l'[Assurance Retraite](https://www.lassuranceretraite.fr).
