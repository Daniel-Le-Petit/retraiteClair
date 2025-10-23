/**
 * Visualiseur de Résultats de Tests - Simulateur Retraite Progressive
 * 
 * Ce script affiche les résultats des tests de manière claire et colorée
 */

const fs = require('fs');
const path = require('path');

class TestResultViewer {
  constructor() {
    this.reports = [];
    this.loadReports();
  }

  loadReports() {
    const reportFiles = [
      'manual-test-report.json',
      'automated-test-report.json'
    ];

    for (const file of reportFiles) {
      if (fs.existsSync(file)) {
        try {
          const report = JSON.parse(fs.readFileSync(file, 'utf8'));
          this.reports.push({
            type: file.includes('manual') ? 'Manuel' : 'Automatisé',
            file: file,
            data: report
          });
        } catch (error) {
          console.log(`⚠️ Erreur lors du chargement de ${file}: ${error.message}`);
        }
      }
    }
  }

  displayReport(report) {
    console.log(`\n📊 RAPPORT ${report.type.toUpperCase()}`);
    console.log('='.repeat(50));
    
    const { summary, results } = report.data;
    
    // Résumé coloré
    console.log(`\n📈 RÉSUMÉ GLOBAL:`);
    console.log(`   Total des tests: ${summary.totalTests}`);
    console.log(`   Tests réussis: ${this.colorText(summary.passedTests, 'green')}`);
    console.log(`   Tests échoués: ${this.colorText(summary.failedTests, 'red')}`);
    console.log(`   Taux de réussite: ${this.colorText(summary.successRate, summary.failedTests === 0 ? 'green' : 'yellow')}`);
    console.log(`   Timestamp: ${new Date(summary.timestamp).toLocaleString('fr-FR')}`);

    // Détail des résultats
    console.log(`\n📋 DÉTAIL DES TESTS:`);
    console.log('-'.repeat(50));
    
    results.forEach((result, index) => {
      const status = result.passed ? '✅' : '❌';
      const statusText = result.passed ? 'RÉUSSI' : 'ÉCHOUÉ';
      const color = result.passed ? 'green' : 'red';
      
      console.log(`\n${index + 1}. ${status} ${result.name}`);
      console.log(`   Statut: ${this.colorText(statusText, color)}`);
      
      if (result.actual && result.expected) {
        // Comparaison des valeurs
        Object.keys(result.expected).forEach(key => {
          const actual = result.actual[key];
          const expected = result.expected[key];
          
          if (typeof actual === 'number' && typeof expected === 'number') {
            const diff = Math.abs(actual - expected);
            const isCorrect = diff <= 1; // Tolérance de 1€
            
            console.log(`   ${key}:`);
            console.log(`     Attendu: ${expected}€`);
            console.log(`     Obtenu: ${actual}€`);
            console.log(`     Différence: ${diff}€ ${isCorrect ? '✅' : '❌'}`);
          }
        });
      }
      
      if (result.error) {
        console.log(`   Erreur: ${this.colorText(result.error, 'red')}`);
      }
    });

    // Recommandations
    this.displayRecommendations(summary);
  }

  displayRecommendations(summary) {
    console.log(`\n💡 RECOMMANDATIONS:`);
    console.log('-'.repeat(50));
    
    if (summary.failedTests === 0) {
      console.log('🎉 EXCELLENT ! Tous les tests sont réussis.');
      console.log('✅ Le simulateur est prêt pour le déploiement.');
    } else if (summary.failedTests <= 2) {
      console.log('⚠️ Quelques tests ont échoué, mais c\'est acceptable.');
      console.log('🔧 Vérifiez les calculs et corrigez si nécessaire.');
    } else {
      console.log('❌ Plusieurs tests ont échoué.');
      console.log('🚨 Des corrections importantes sont nécessaires avant le déploiement.');
    }
  }

  colorText(text, color) {
    const colors = {
      red: '\x1b[31m',
      green: '\x1b[32m',
      yellow: '\x1b[33m',
      blue: '\x1b[34m',
      magenta: '\x1b[35m',
      cyan: '\x1b[36m',
      reset: '\x1b[0m'
    };
    
    return `${colors[color] || ''}${text}${colors.reset}`;
  }

  displayAllReports() {
    if (this.reports.length === 0) {
      console.log('❌ Aucun rapport de test trouvé.');
      console.log('💡 Exécutez d\'abord les tests avec:');
      console.log('   npm run test:manual');
      console.log('   npm run test:automated');
      return;
    }

    console.log('🔍 RÉSULTATS DES TESTS - SIMULATEUR RETRAITE PROGRESSIVE');
    console.log('='.repeat(60));
    
    this.reports.forEach(report => {
      this.displayReport(report);
    });

    // Rapport global
    this.displayGlobalSummary();
  }

  displayGlobalSummary() {
    console.log(`\n🌍 RÉSUMÉ GLOBAL DE TOUS LES TESTS`);
    console.log('='.repeat(50));
    
    let totalTests = 0;
    let totalPassed = 0;
    let totalFailed = 0;
    
    this.reports.forEach(report => {
      const { summary } = report.data;
      totalTests += summary.totalTests;
      totalPassed += summary.passedTests;
      totalFailed += summary.failedTests;
    });
    
    const globalSuccessRate = totalTests > 0 ? (totalPassed / totalTests * 100).toFixed(1) : 0;
    
    console.log(`📊 Statistiques globales:`);
    console.log(`   Total des tests: ${totalTests}`);
    console.log(`   Tests réussis: ${this.colorText(totalPassed, 'green')}`);
    console.log(`   Tests échoués: ${this.colorText(totalFailed, 'red')}`);
    console.log(`   Taux de réussite global: ${this.colorText(`${globalSuccessRate}%`, globalFailed === 0 ? 'green' : 'yellow')}`);
    
    if (totalFailed === 0) {
      console.log(`\n🎉 PARFAIT ! Tous les tests sont réussis.`);
      console.log(`✅ Le simulateur est prêt pour la production.`);
    } else {
      console.log(`\n⚠️ ${totalFailed} test(s) ont échoué sur ${totalTests}.`);
      console.log(`🔧 Vérifiez les détails ci-dessus pour les corrections.`);
    }
  }

  // Méthode pour afficher seulement les tests échoués
  displayFailedTests() {
    console.log('❌ TESTS ÉCHOUÉS');
    console.log('='.repeat(30));
    
    let hasFailedTests = false;
    
    this.reports.forEach(report => {
      const failedResults = report.data.results.filter(r => !r.passed);
      
      if (failedResults.length > 0) {
        hasFailedTests = true;
        console.log(`\n📋 ${report.type} - Tests échoués:`);
        failedResults.forEach(result => {
          console.log(`   ❌ ${result.name}`);
          if (result.error) {
            console.log(`      Erreur: ${result.error}`);
          }
        });
      }
    });
    
    if (!hasFailedTests) {
      console.log('🎉 Aucun test échoué ! Tous les tests sont réussis.');
    }
  }

  // Méthode pour afficher seulement les tests réussis
  displayPassedTests() {
    console.log('✅ TESTS RÉUSSIS');
    console.log('='.repeat(30));
    
    this.reports.forEach(report => {
      const passedResults = report.data.results.filter(r => r.passed);
      
      if (passedResults.length > 0) {
        console.log(`\n📋 ${report.type} - Tests réussis:`);
        passedResults.forEach(result => {
          console.log(`   ✅ ${result.name}`);
        });
      }
    });
  }
}

// Interface en ligne de commande
function main() {
  const viewer = new TestResultViewer();
  
  const args = process.argv.slice(2);
  
  if (args.includes('--failed') || args.includes('-f')) {
    viewer.displayFailedTests();
  } else if (args.includes('--passed') || args.includes('-p')) {
    viewer.displayPassedTests();
  } else {
    viewer.displayAllReports();
  }
}

// Exécuter si le script est appelé directement
if (require.main === module) {
  main();
}

module.exports = { TestResultViewer };
