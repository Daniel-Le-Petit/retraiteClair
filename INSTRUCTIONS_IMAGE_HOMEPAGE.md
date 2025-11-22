# Instructions pour l'image de la page d'accueil

## 📸 Placement de l'image

L'image du couple avec le texte "RetraiteClair" doit être placée dans le dossier `public/images/` avec le nom suivant :

**Nom du fichier :** `homepage-hero-couple.jpg`

**Chemin complet :** `public/images/homepage-hero-couple.jpg`

## ✅ Modifications effectuées

1. **`src/components/HomePage.js`** :
   - Remplacement du header avec texte par une image
   - L'image affiche automatiquement le texte "RetraiteClair" et "Simplifiez votre départ à la retraite avec notre simulateur de retraite progressive"

2. **`src/homepage-styles.css`** :
   - Styles ajustés pour que l'image soit responsive
   - L'image s'adapte automatiquement aux différentes tailles d'écran :
     - Desktop : max-height 500px
     - Tablette : max-height 400px
     - Mobile : max-height 300px

## 🎨 Format recommandé pour l'image

- **Format :** JPG, PNG ou WebP
- **Largeur recommandée :** 1200px minimum
- **Ratio :** 16:9 ou 21:9 (format paysage)
- **Poids :** Optimisé pour le web (< 500KB de préférence)

## 📱 Responsive

L'image s'adapte automatiquement :
- ✅ Desktop : Affichage complet
- ✅ Tablette : Hauteur réduite à 400px
- ✅ Mobile : Hauteur réduite à 300px
- ✅ Largeur : 100% de la largeur du conteneur

## 🔄 Alternative : Nom de fichier différent

Si vous souhaitez utiliser un autre nom de fichier, modifiez la ligne suivante dans `src/components/HomePage.js` :

```jsx
src="/images/homepage-hero-couple.jpg"
```

Remplacez `homepage-hero-couple.jpg` par le nom de votre fichier.

## ✨ Résultat attendu

L'image remplace complètement le header texte et s'affiche en haut de la page d'accueil, avec un espacement optimal entre l'image et les cartes de simulation.

