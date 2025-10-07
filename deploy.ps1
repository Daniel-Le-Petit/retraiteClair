# Script de déploiement pour retraiteClair
param(
    [string]$message = "Mise à jour"
)

# Ajouter Git au PATH si nécessaire
$Env:PATH += ';C:\Program Files\Git\cmd'

$logFile = ".\git.log"
"=== Git script lancé à $(Get-Date) ===" | Out-File $logFile

# Définir le repo
$repoUrl = "https://github.com/Daniel-Le-Petit/retraiteClair.git"
$repoPath = "C:\Users\AIFinesHerbes\AIFB\retraiteclair"

try {
    # Vérifier le remote
    "== Remote(s) avant correction ==" | Out-File $logFile -Append
    git -C $repoPath remote -v | Out-File $logFile -Append

    # Corriger le remote si besoin
    git -C $repoPath remote remove origin
    git -C $repoPath remote add origin $repoUrl
    "Remote corrigé : $repoUrl" | Out-File $logFile -Append

    # Vérifier le status
    "`n== Statut du dépôt ==" | Out-File $logFile -Append
    git -C $repoPath status | Out-File $logFile -Append

    # Passer à la branche main
    "`n== Passage à la branche main ==" | Out-File $logFile -Append
    git -C $repoPath checkout main | Out-File $logFile -Append

    # Pull des dernières modifications
    "`n== Pull des dernières modifs ==" | Out-File $logFile -Append
    git -C $repoPath pull origin main | Out-File $logFile -Append

    # Ajouter tous les fichiers sauf node_modules
    "`n== Ajout des fichiers (hors node_modules) ==" | Out-File $logFile -Append
    git -C $repoPath add . -- ':!node_modules' | Out-File $logFile -Append

    # Commit avec message
    "`n== Commit avec message ==" | Out-File $logFile -Append
    if (-not (git -C $repoPath diff --cached --quiet)) {
        git -C $repoPath commit -m "$message" | Out-File $logFile -Append
    } else {
        "Aucun changement à commit." | Out-File $logFile -Append
    }

    # Push vers GitHub
    "`n== Push vers GitHub ==" | Out-File $logFile -Append
    git -C $repoPath push origin main | Out-File $logFile -Append

    "Script terminé avec succès." | Out-File $logFile -Append
}
catch {
    "Une erreur est survenue : $_" | Out-File $logFile -Append
}

# Afficher le log à la fin
Get-Content $logFile
