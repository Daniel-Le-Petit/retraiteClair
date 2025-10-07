/**
 * Script de monitoring SEO pour RetraiteClair
 * À exécuter régulièrement pour surveiller les performances
 */

const fs = require('fs');
const path = require('path');

class SEOMonitor {
  constructor() {
    this.report = {
      date: new Date().toISOString(),
      pages: [],
      issues: [],
      recommendations: []
    };
  }

  // Vérifier la structure des titres
  checkTitleStructure() {
    const pages = [
      { file: 'src/components/PageAccueil.js', name: 'Page d\'accueil' },
      { file: 'src/components/ConseilsPage.js', name: 'Conseils' },
      { file: 'src/components/ContactForm.jsx', name: 'Contact' },
      { file: 'src/components/CalculateurAvance.js', name: 'Calculateur' }
    ];

    pages.forEach(page => {
      try {
        const content = fs.readFileSync(page.file, 'utf8');
        const h1Count = (content.match(/<h1/g) || []).length;
        const h2Count = (content.match(/<h2/g) || []).length;
        const h3Count = (content.match(/<h3/g) || []).length;

        this.report.pages.push({
          name: page.name,
          h1: h1Count,
          h2: h2Count,
          h3: h3Count,
          status: h1Count === 1 ? 'OK' : 'ATTENTION'
        });

        if (h1Count !== 1) {
          this.report.issues.push(`${page.name}: ${h1Count} H1 trouvé(s) (attendu: 1)`);
        }
      } catch (error) {
        this.report.issues.push(`Erreur lecture ${page.name}: ${error.message}`);
      }
    });
  }

  // Vérifier les mots-clés
  checkKeywords() {
    const keywords = [
      'retraite progressive',
      'simulateur retraite',
      'calcul retraite',
      'éligibilité retraite'
    ];

    const files = [
      'src/components/PageAccueil.js',
      'src/components/ConseilsPage.js',
      'src/components/ContactForm.jsx'
    ];

    files.forEach(file => {
      try {
        const content = fs.readFileSync(file, 'utf8').toLowerCase();
        const keywordCounts = {};

        keywords.forEach(keyword => {
          const count = (content.match(new RegExp(keyword.toLowerCase(), 'g')) || []).length;
          keywordCounts[keyword] = count;
        });

        const totalWords = content.split(/\s+/).length;
        const keywordDensity = Object.values(keywordCounts).reduce((a, b) => a + b, 0) / totalWords * 100;

        this.report.pages.push({
          file: file,
          keywordCounts: keywordCounts,
          density: keywordDensity.toFixed(2) + '%',
          status: keywordDensity >= 1.5 && keywordDensity <= 3 ? 'OK' : 'ATTENTION'
        });

        if (keywordDensity < 1.5) {
          this.report.issues.push(`${file}: Densité mots-clés trop faible (${keywordDensity.toFixed(2)}%)`);
        } else if (keywordDensity > 3) {
          this.report.issues.push(`${file}: Densité mots-clés trop élevée (${keywordDensity.toFixed(2)}%)`);
        }
      } catch (error) {
        this.report.issues.push(`Erreur analyse ${file}: ${error.message}`);
      }
    });
  }

  // Vérifier les fichiers SEO
  checkSEOFiles() {
    const seoFiles = [
      'public/robots.txt',
      'public/sitemap.xml',
      'public/index.html'
    ];

    seoFiles.forEach(file => {
      try {
        if (fs.existsSync(file)) {
          const content = fs.readFileSync(file, 'utf8');
          
          if (file === 'public/index.html') {
            const hasMetaDescription = content.includes('name="description"');
            const hasOpenGraph = content.includes('og:title');
            const hasTwitterCard = content.includes('twitter:card');
            
            if (!hasMetaDescription) {
              this.report.issues.push('Meta description manquante dans index.html');
            }
            if (!hasOpenGraph) {
              this.report.issues.push('Balises Open Graph manquantes');
            }
            if (!hasTwitterCard) {
              this.report.issues.push('Balises Twitter Card manquantes');
            }
          }
          
          this.report.pages.push({
            file: file,
            status: 'OK',
            size: content.length
          });
        } else {
          this.report.issues.push(`Fichier SEO manquant: ${file}`);
        }
      } catch (error) {
        this.report.issues.push(`Erreur vérification ${file}: ${error.message}`);
      }
    });
  }

  // Générer des recommandations
  generateRecommendations() {
    if (this.report.issues.length === 0) {
      this.report.recommendations.push('✅ Excellent ! Aucun problème SEO détecté.');
    } else {
      this.report.recommendations.push('🔧 Problèmes détectés - Voir la section issues');
    }

    this.report.recommendations.push('📊 Surveillez régulièrement Google Search Console');
    this.report.recommendations.push('📈 Testez la vitesse avec PageSpeed Insights');
    this.report.recommendations.push('🔍 Vérifiez les Core Web Vitals mensuellement');
  }

  // Générer le rapport
  generateReport() {
    this.checkTitleStructure();
    this.checkKeywords();
    this.checkSEOFiles();
    this.generateRecommendations();

    const reportPath = path.join(__dirname, 'seo-report.json');
    fs.writeFileSync(reportPath, JSON.stringify(this.report, null, 2));

    console.log('📊 RAPPORT SEO GÉNÉRÉ');
    console.log('====================');
    console.log(`📅 Date: ${this.report.date}`);
    console.log(`📄 Pages analysées: ${this.report.pages.length}`);
    console.log(`⚠️  Problèmes: ${this.report.issues.length}`);
    console.log(`💡 Recommandations: ${this.report.recommendations.length}`);
    console.log(`📁 Rapport sauvegardé: ${reportPath}`);

    if (this.report.issues.length > 0) {
      console.log('\n🚨 PROBLÈMES DÉTECTÉS:');
      this.report.issues.forEach(issue => console.log(`  - ${issue}`));
    }

    console.log('\n💡 RECOMMANDATIONS:');
    this.report.recommendations.forEach(rec => console.log(`  - ${rec}`));

    return this.report;
  }
}

// Exécution du monitoring
if (require.main === module) {
  const monitor = new SEOMonitor();
  monitor.generateReport();
}

module.exports = SEOMonitor;




