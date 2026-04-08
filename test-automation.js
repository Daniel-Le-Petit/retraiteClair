/**
 * Test Automation Suite - Simulateur Retraite Progressive
 * 
 * Ce script automatise les tests du simulateur en utilisant Puppeteer
 * pour contrôler un navigateur et vérifier les calculs.
 */

const puppeteer = require('puppeteer');
const fs = require('fs');

// Configuration des tests
const TEST_CONFIG = {
  baseUrl: 'http://localhost:3000',
  timeout: 30000,
  headless: false, // Mettre à true pour les tests en arrière-plan
  viewport: { width: 1280, height: 720 }
};

// Cas de test définis
const TEST_CASES = [
  {
    name: "Mode Simplifié - Cas Standard",
    data: {
      salaireBrut: "5000",
      tempsPartiel: "60",
      debutRetraite: "2025-01-01"
    },
    expected: {
      revenuNetPartiel: 2340,
      pensionProgressive: 1694.5,
      revenuTotal: 4034
    },
    tolerance: 1
  },
  {
    name: "Mode Simplifié - Temps Partiel 50%",
    data: {
      salaireBrut: "4000",
      tempsPartiel: "50",
      debutRetraite: "2025-01-01"
    },
    expected: {
      revenuNetPartiel: 1560,
      pensionProgressive: 1356.4,
      revenuTotal: 2916.4
    },
    tolerance: 1
  },
  {
    name: "Mode Simplifié - Avec Pension Fournie",
    data: {
      salaireBrut: "6000",
      tempsPartiel: "70",
      debutRetraite: "2025-01-01",
      pensionEstimee: "2000"
    },
    expected: {
      revenuNetPartiel: 3276,
      pensionProgressive: 800,
      revenuTotal: 4076
    },
    tolerance: 1
  },
  {
    name: "Mode Avancé - Calcul M@rel",
    data: {
      salaireBrut: "5500",
      tempsPartiel: "60",
      debutRetraite: "2025-01-01",
      salaireAnnuelMoyen: "66000",
      trimestresValides: "150",
      anneeNaissance: "1970"
    },
    expected: {
      revenuNetPartiel: 2574,
      pensionProgressive: 993.96,
      revenuTotal: 3567.96
    },
    tolerance: 1
  }
];

// Scénarios de test
const SCENARIO_TESTS = [
  {
    name: "Scénario 40%",
    pourcentage: "40",
    expected: {
      salairePartiel: 1560,
      pensionProgressive: 977.34,
      revenuTotal: 2537.34
    },
    tolerance: 1
  },
  {
    name: "Scénario 60%",
    pourcentage: "60",
    expected: {
      salairePartiel: 2340,
      pensionProgressive: 977.34,
      revenuTotal: 3317.34
    },
    tolerance: 1
  },
  {
    name: "Scénario 80%",
    pourcentage: "80",
    expected: {
      salairePartiel: 2496,
      pensionProgressive: 781.87,
      revenuTotal: 3277.87
    },
    tolerance: 1
  }
];

class SimulatorTester {
  constructor() {
    this.browser = null;
    this.page = null;
    this.results = [];
  }

  async init() {
    console.log('🚀 Initialisation du navigateur...');
    this.browser = await puppeteer.launch({
      headless: TEST_CONFIG.headless,
      args: ['--no-sandbox', '--disable-setuid-sandbox']
    });
    
    this.page = await this.browser.newPage();
    await this.page.setViewport(TEST_CONFIG.viewport);
    await this.page.goto(TEST_CONFIG.baseUrl, { waitUntil: 'networkidle0' });
    
    console.log('✅ Navigateur initialisé');
  }

  async navigateToSimulator() {
    console.log('🧭 Navigation vers le simulateur...');
    
    // Attendre que la page se charge
    await this.page.waitForSelector('body');
    
    // Chercher le lien vers le simulateur
    const simulatorLink = await this.page.$('a[href*="simulateur"], a[href*="calculateur"]');
    if (simulatorLink) {
      await simulatorLink.click();
      await this.page.waitForNavigation();
    }
    
    // Attendre que le simulateur se charge
    await this.page.waitForSelector('.calculateur-avance-container, .simulator-navigation', { timeout: 10000 });
    
    console.log('✅ Simulateur chargé');
  }

  async fillFormData(testCase) {
    console.log(`📝 Saisie des données pour: ${testCase.name}`);
    
    // Aller dans l'onglet Saisie
    const saisieTab = await this.page.$('button[class*="simulator-nav-item"]:first-child');
    if (saisieTab) {
      await saisieTab.click();
      await this.page.waitForTimeout(500);
    }
    
    // Remplir le salaire brut
    if (testCase.data.salaireBrut) {
      await this.page.type('input[name="salaireBrut"], input[placeholder*="salaire"]', testCase.data.salaireBrut);
    }
    
    // Remplir le temps partiel
    if (testCase.data.tempsPartiel) {
      const tempsPartielInput = await this.page.$('input[type="range"], input[name="tempsPartiel"]');
      if (tempsPartielInput) {
        await tempsPartielInput.evaluate((el, value) => {
          el.value = value;
          el.dispatchEvent(new Event('input', { bubbles: true }));
        }, testCase.data.tempsPartiel);
      }
    }
    
    // Remplir la date de début de retraite
    if (testCase.data.debutRetraite) {
      await this.page.type('input[name="debutRetraite"], input[type="date"]', testCase.data.debutRetraite);
    }
    
    // Remplir la surcote/décote
    if (testCase.data.surcoteDecote) {
      await this.page.type('input[name="surcoteDecote"], input[placeholder*="surcote"]', testCase.data.surcoteDecote);
    }
    
    // Remplir la pension estimée si fournie
    if (testCase.data.pensionEstimee) {
      await this.page.type('input[name="pensionEstimee"], input[placeholder*="pension"]', testCase.data.pensionEstimee);
    }
    
    // Mode avancé si nécessaire
    if (testCase.data.salaireAnnuelMoyen) {
      const advancedModeToggle = await this.page.$('button[class*="advanced"], input[type="checkbox"]');
      if (advancedModeToggle) {
        await advancedModeToggle.click();
        await this.page.waitForTimeout(500);
        
        // Remplir les champs avancés
        if (testCase.data.salaireAnnuelMoyen) {
          await this.page.type('input[name="salaireAnnuelMoyen"]', testCase.data.salaireAnnuelMoyen);
        }
        if (testCase.data.trimestresValides) {
          await this.page.type('input[name="trimestresValides"]', testCase.data.trimestresValides);
        }
        if (testCase.data.anneeNaissance) {
          await this.page.type('input[name="anneeNaissance"]', testCase.data.anneeNaissance);
        }
      }
    }
    
    console.log('✅ Données saisies');
  }

  async getResults() {
    console.log('📊 Récupération des résultats...');
    
    // Aller dans l'onglet Résultats
    const resultatsTab = await this.page.$('button[class*="simulator-nav-item"]:nth-child(2)');
    if (resultatsTab) {
      await resultatsTab.click();
      await this.page.waitForTimeout(1000);
    }
    
    // Extraire les valeurs des résultats
    const results = {};
    
    try {
      // Salaire net
      const salaireNetElement = await this.page.$('.result-value, .result-card h4:contains("Salaire Net")');
      if (salaireNetElement) {
        const salaireNetText = await salaireNetElement.evaluate(el => el.textContent);
        results.salaireNet = parseFloat(salaireNetText.replace(/[^\d.,]/g, '').replace(',', '.'));
      }
      
      // Pension progressive
      const pensionElement = await this.page.$('.result-value, .result-card h4:contains("Retraite progressive")');
      if (pensionElement) {
        const pensionText = await pensionElement.evaluate(el => el.textContent);
        results.pensionProgressive = parseFloat(pensionText.replace(/[^\d.,]/g, '').replace(',', '.'));
      }
      
      // Revenu total
      const revenuTotalElement = await this.page.$('.result-value, .result-card h4:contains("Montant total")');
      if (revenuTotalElement) {
        const revenuTotalText = await revenuTotalElement.evaluate(el => el.textContent);
        results.revenuTotal = parseFloat(revenuTotalText.replace(/[^\d.,]/g, '').replace(',', '.'));
      }
      
    } catch (error) {
      console.log('⚠️ Erreur lors de l\'extraction des résultats:', error.message);
    }
    
    console.log('✅ Résultats extraits:', results);
    return results;
  }

  async testScenarios() {
    console.log('📈 Test des scénarios...');
    
    // Aller dans l'onglet Scénarios
    const scenariosTab = await this.page.$('button[class*="simulator-nav-item"]:nth-child(3)');
    if (scenariosTab) {
      await scenariosTab.click();
      await this.page.waitForTimeout(1000);
    }
    
    const scenarioResults = [];
    
    for (const scenario of SCENARIO_TESTS) {
      console.log(`🔍 Test du scénario ${scenario.name}...`);
      
      try {
        // Chercher la colonne du scénario
        const scenarioColumn = await this.page.$(`.scenario-column:has(.column-header h4:contains("${scenario.pourcentage}%"))`);
        if (scenarioColumn) {
          // Extraire les valeurs du scénario
          const salairePartielElement = await scenarioColumn.$('.chart-bar.revenu-partiel .bar-value');
          const pensionElement = await scenarioColumn.$('.chart-bar.retraite-progressive .bar-value');
          const totalElement = await scenarioColumn.$('.total-value');
          
          const results = {};
          if (salairePartielElement) {
            const text = await salairePartielElement.evaluate(el => el.textContent);
            results.salairePartiel = parseFloat(text.replace(/[^\d.,]/g, '').replace(',', '.'));
          }
          if (pensionElement) {
            const text = await pensionElement.evaluate(el => el.textContent);
            results.pensionProgressive = parseFloat(text.replace(/[^\d.,]/g, '').replace(',', '.'));
          }
          if (totalElement) {
            const text = await totalElement.evaluate(el => el.textContent);
            results.revenuTotal = parseFloat(text.replace(/[^\d.,]/g, '').replace(',', '.'));
          }
          
          scenarioResults.push({
            name: scenario.name,
            expected: scenario.expected,
            actual: results,
            passed: this.compareResults(results, scenario.expected, scenario.tolerance)
          });
        }
      } catch (error) {
        console.log(`❌ Erreur dans le scénario ${scenario.name}:`, error.message);
        scenarioResults.push({
          name: scenario.name,
          expected: scenario.expected,
          actual: {},
          passed: false,
          error: error.message
        });
      }
    }
    
    return scenarioResults;
  }

  compareResults(actual, expected, tolerance = 1) {
    const keys = Object.keys(expected);
    for (const key of keys) {
      if (actual[key] === undefined) return false;
      if (Math.abs(actual[key] - expected[key]) > tolerance) return false;
    }
    return true;
  }

  async runTest(testCase) {
    console.log(`\n🧪 Exécution du test: ${testCase.name}`);
    
    try {
      // Saisir les données
      await this.fillFormData(testCase);
      
      // Attendre que les calculs se mettent à jour
      await this.page.waitForTimeout(2000);
      
      // Récupérer les résultats
      const actualResults = await this.getResults();
      
      // Comparer avec les résultats attendus
      const passed = this.compareResults(actualResults, testCase.expected, testCase.tolerance);
      
      const result = {
        name: testCase.name,
        expected: testCase.expected,
        actual: actualResults,
        passed: passed,
        timestamp: new Date().toISOString()
      };
      
      this.results.push(result);
      
      console.log(passed ? '✅ Test réussi' : '❌ Test échoué');
      if (!passed) {
        console.log('📊 Résultats attendus:', testCase.expected);
        console.log('📊 Résultats obtenus:', actualResults);
      }
      
      return result;
      
    } catch (error) {
      console.log(`❌ Erreur dans le test ${testCase.name}:`, error.message);
      const result = {
        name: testCase.name,
        expected: testCase.expected,
        actual: {},
        passed: false,
        error: error.message,
        timestamp: new Date().toISOString()
      };
      this.results.push(result);
      return result;
    }
  }

  async runAllTests() {
    console.log('🚀 Démarrage des tests automatisés...');
    
    try {
      await this.init();
      await this.navigateToSimulator();
      
      // Tests des calculs principaux
      for (const testCase of TEST_CASES) {
        await this.runTest(testCase);
      }
      
      // Tests des scénarios
      const scenarioResults = await this.testScenarios();
      this.results.push(...scenarioResults);
      
      // Générer le rapport
      await this.generateReport();
      
    } catch (error) {
      console.log('❌ Erreur générale:', error.message);
    } finally {
      if (this.browser) {
        await this.browser.close();
      }
    }
  }

  async generateReport() {
    console.log('\n📋 Génération du rapport...');
    
    const passedTests = this.results.filter(r => r.passed).length;
    const totalTests = this.results.length;
    const successRate = (passedTests / totalTests * 100).toFixed(1);
    
    const report = {
      summary: {
        totalTests: totalTests,
        passedTests: passedTests,
        failedTests: totalTests - passedTests,
        successRate: `${successRate}%`,
        timestamp: new Date().toISOString()
      },
      results: this.results
    };
    
    // Sauvegarder le rapport
    fs.writeFileSync('test-report.json', JSON.stringify(report, null, 2));
    
    console.log('\n📊 RÉSUMÉ DES TESTS');
    console.log('==================');
    console.log(`Total des tests: ${totalTests}`);
    console.log(`Tests réussis: ${passedTests}`);
    console.log(`Tests échoués: ${totalTests - passedTests}`);
    console.log(`Taux de réussite: ${successRate}%`);
    
    if (passedTests === totalTests) {
      console.log('\n🎉 TOUS LES TESTS SONT RÉUSSIS !');
      console.log('✅ Le simulateur est prêt pour le déploiement');
    } else {
      console.log('\n⚠️ CERTAINS TESTS ONT ÉCHOUÉ');
      console.log('❌ Des corrections sont nécessaires avant le déploiement');
    }
    
    console.log('\n📄 Rapport détaillé sauvegardé dans: test-report.json');
  }
}

// Exécution des tests
async function main() {
  const tester = new SimulatorTester();
  await tester.runAllTests();
}

// Exécuter si le script est appelé directement
if (require.main === module) {
  main().catch(console.error);
}

module.exports = { SimulatorTester, TEST_CASES, SCENARIO_TESTS };
