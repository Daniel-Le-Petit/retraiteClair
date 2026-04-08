#!/bin/bash

# Script de déploiement pour retraiteClair

MESSAGE=${1:-"Mise à jour"}
LOG_FILE="./git.log"
REPO_URL="https://github.com/Daniel-Le-Petit/retraiteClair.git"
REPO_PATH="."

echo "=== Git script lancé à $(date) ===" > "$LOG_FILE"

cd "$REPO_PATH" || exit 1

{
echo "== Remote(s) avant correction =="
git remote -v

# Corriger le remote
git remote remove origin 2>/dev/null
git remote add origin "$REPO_URL"
echo "Remote corrigé : $REPO_URL"

echo ""
echo "== Statut du dépôt =="
git status

echo ""
echo "== Passage à la branche main =="
git checkout main

echo ""
echo "== Pull des dernières modifs =="
git pull origin main

echo ""
echo "== Ajout des fichiers (hors node_modules) =="
git add . -- ':!node_modules'

echo ""
echo "== Commit avec message =="
if ! git diff --cached --quiet; then
    git commit -m "$MESSAGE"
else
    echo "Aucun changement à commit."
fi

echo ""
echo "== Push vers GitHub =="
git push origin main

echo "Script terminé avec succès."

} >> "$LOG_FILE" 2>&1

# Afficher le log

cat "$LOG_FILE"
