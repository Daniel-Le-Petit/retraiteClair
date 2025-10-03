# Script de monitoring SEO pour RetraiteClair
# Execution: .\monitoring-seo.ps1

Write-Host "MONITORING SEO RETRAITECLAIR" -ForegroundColor Green
Write-Host "================================" -ForegroundColor Green

# Verifier Node.js
try {
    $nodeVersion = node --version
    Write-Host "OK - Node.js detecte: $nodeVersion" -ForegroundColor Green
} catch {
    Write-Host "ERREUR - Node.js non trouve. Installez Node.js pour utiliser le monitoring automatise." -ForegroundColor Red
    exit 1
}

# Executer le monitoring
Write-Host "`nExecution du monitoring SEO..." -ForegroundColor Yellow
node monitoring-seo.js

# Verifier les fichiers SEO
Write-Host "`nVerification des fichiers SEO..." -ForegroundColor Yellow

$seoFiles = @(
    "public\robots.txt",
    "public\sitemap.xml",
    "public\index.html"
)

foreach ($file in $seoFiles) {
    if (Test-Path $file) {
        $size = (Get-Item $file).Length
        Write-Host "OK - $file ($size bytes)" -ForegroundColor Green
    } else {
        Write-Host "ERREUR - $file manquant" -ForegroundColor Red
    }
}

# Verifier la structure des titres
Write-Host "`nVerification de la structure des titres..." -ForegroundColor Yellow

$componentFiles = @(
    "src\components\PageAccueil.js",
    "src\components\ConseilsPage.js",
    "src\components\ContactForm.jsx",
    "src\components\CalculateurAvance.js"
)

foreach ($file in $componentFiles) {
    if (Test-Path $file) {
        $content = Get-Content $file -Raw
        $h1Count = ($content | Select-String "<h1" -AllMatches).Matches.Count
        $h2Count = ($content | Select-String "<h2" -AllMatches).Matches.Count
        $h3Count = ($content | Select-String "<h3" -AllMatches).Matches.Count
        
        $status = if ($h1Count -eq 1) { "OK" } else { "ATTENTION" }
        Write-Host "$status - $file - H1:$h1Count H2:$h2Count H3:$h3Count" -ForegroundColor $(if ($h1Count -eq 1) { "Green" } else { "Yellow" })
    } else {
        Write-Host "ERREUR - $file non trouve" -ForegroundColor Red
    }
}

# Afficher le rapport genere
if (Test-Path "seo-report.json") {
    Write-Host "`nRapport detaille disponible: seo-report.json" -ForegroundColor Cyan
    Write-Host "Ouvrez le fichier pour voir l'analyse complete" -ForegroundColor Cyan
}

# Suggestions d'actions
Write-Host "`nPROCHAINES ETAPES:" -ForegroundColor Magenta
Write-Host "1. Configurez Google Search Console: https://search.google.com/search-console/" -ForegroundColor White
Write-Host "2. Testez la vitesse: https://pagespeed.web.dev/" -ForegroundColor White
Write-Host "3. Verifiez les Core Web Vitals" -ForegroundColor White
Write-Host "4. Surveillez regulierement les performances" -ForegroundColor White

Write-Host "`nMonitoring termine!" -ForegroundColor Green
