/**
 * Test Manuel Automatisé - Simulateur Retraite Progressive
 * 
 * Ce script guide l'utilisateur à travers les tests manuels
 * et collecte les résultats pour générer un rapport.
 */

const readline = require('readline');
const fs = require('fs');

// Interface pour les entrées utilisateur
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

// Questions pour les tests
const TEST_QUESTIONS = [
  {
    name: "Mode Simplifié - Cas Standard",
    data: { salaireBrut: 5000, tempsPartiel: 60 },
    expected: { revenuNetPartiel: 2340, pensionProgressive: 1694.5, revenuTotal: 4034 },
    questions: [
      "Salaire brut: 5000€, Temps partiel: 60%",
      "Quel est le 'Revenu Net Partiel' affiché ? (en € nets)",
      "Quelle est la 'Retraite progressive' affichée ? (en €)",
      "Quel est le 'Montant total' affiché ? (en € nets/mois)"
    ]
  },
  {
    name: "Mode Simplifié - Temps Partiel 50%",
    data: { salaireBrut: 4000, tempsPartiel: 50 },
    expected: { revenuNetPartiel: 1560, pensionProgressive: 1356.4, revenuTotal: 2916.4 },
    questions: [
      "Salaire brut: 4000€, Temps partiel: 50%",
      "Quel est le 'Revenu Net Partiel' affiché ? (en € nets)",
      "Quelle est la 'Retraite progressive' affichée ? (en €)",
      "Quel est le 'Montant total' affiché ? (en € nets/mois)"
    ]
  },
  {
    name: "Mode Simplifié - Avec Pension Fournie",
    data: { salaireBrut: 6000, tempsPartiel: 70, pensionEstimee: 2000 },
    expected: { revenuNetPartiel: 3276, pensionProgressive: 800, revenuTotal: 4076 },
    questions: [
      "Salaire brut: 6000€, Temps partiel: 70%, Pension estimée: 2000€",
      "Quel est le 'Revenu Net Partiel' affiché ? (en € nets)",
      "Quelle est la 'Retraite progressive' affichée ? (en €)",
      "Quel est le 'Montant total' affiché ? (en € nets/mois)"
    ]
  },
  {
    name: "Mode Avancé - Calcul M@rel",
    data: { salaireBrut: 5500, tempsPartiel: 60, salaireAnnuelMoyen: 66000, trimestresValides: 150, anneeNaissance: 1970 },
    expected: { revenuNetPartiel: 2574, pensionProgressive: 993.96, revenuTotal: 3567.96 },
    questions: [
      "Mode avancé: Salaire brut: 5500€, Temps partiel: 60%, Salaire annuel moyen: 66000€, Trimestres: 150, Année naissance: 1970",
      "Quel est le 'Revenu Net Partiel' affiché ? (en € nets)",
      "Quelle est la 'Retraite progressive' affichée ? (en €)",
      "Quel est le 'Montant total' affiché ? (en € nets/mois)"
    ]
  }
];

const SCENARIO_QUESTIONS = [
  {
    name: "Scénario 40%",
    expected: { revenuPartiel: 1560, pensionProgressive: 977.34, revenuTotal: 2537.34 },
    questions: [
      "Dans l'onglet Scénarios, vérifiez le scénario 40%",
      "Quel est le 'Revenu Partiel' affiché ? (en €)",
      "Quelle est la 'Retraite Progressive' affichée ? (en €)",
      "Quel est le 'Total' affiché ? (en €)"
    ]
  },
  {
    name: "Scénario 60%",
    expected: { revenuPartiel: 2340, pensionProgressive: 977.34, revenuTotal: 3317.34 },
    questions: [
      "Vérifiez le scénario 60%",
      "Quel est le 'Revenu Partiel' affiché ? (en €)",
      "Quelle est la 'Retraite Progressive' affichée ? (en €)",
      "Quel est le 'Total' affiché ? (en €)"
    ]
  },
  {
    name: "Scénario 80%",
    expected: { revenuPartiel: 2496, pensionProgressive: 781.87, revenuTotal: 3277.87 },
    questions: [
      "Vérifiez le scénario 80%",
      "Quel est le 'Revenu Partiel' affiché ? (en €)",
      "Quelle est la 'Retraite Progressive' affichée ? (en €)",
      "Quel est le 'Total' affiché ? (en €)"
    ]
  }
];

class ManualTester {
  constructor() {
    this.results = [];
    this.tolerance = 1; // Tolérance de ±1€
  }

  async askQuestion(question) {
    return new Promise((resolve) => {
      rl.question(question + ' ', (answer) => {
        resolve(answer.trim());
      });
    });
  }

  parseValue(input) {
    // Extraire les nombres de la réponse
    const numbers = input.match(/[\d,]+\.?\d*/g);
    if (numbers && numbers.length > 0) {
      return parseFloat(numbers[0].replace(',', '.'));
    }
    return null;
  }

  compareValues(actual, expected, tolerance = 1) {
    if (actual === null || actual === undefined) return false;
    return Math.abs(actual - expected) <= tolerance;
  }

  async runTest(testCase) {
    console.log(`\n🧪 Test: ${testCase.name}`);
    console.log('='.repeat(50));
    
    const testResult = {
      name: testCase.name,
      expected: testCase.expected,
      actual: {},
      passed: true,
      timestamp: new Date().toISOString()
    };

    try {
      // Poser les questions et collecter les réponses
      const answers = [];
      for (const question of testCase.questions) {
        const answer = await this.askQuestion(question);
        answers.push(answer);
      }

      // Extraire les valeurs numériques des réponses
      const values = answers.slice(1).map(answer => this.parseValue(answer));
      
      // Mapper les valeurs aux clés attendues
      const keys = Object.keys(testCase.expected);
      for (let i = 0; i < keys.length && i < values.length; i++) {
        testResult.actual[keys[i]] = values[i];
      }

      // Vérifier chaque valeur
      for (const key of keys) {
        const actual = testResult.actual[key];
        const expected = testCase.expected[key];
        const isCorrect = this.compareValues(actual, expected, this.tolerance);
        
        if (!isCorrect) {
          testResult.passed = false;
          console.log(`❌ ${key}: Attendu ${expected}€, Obtenu ${actual}€`);
        } else {
          console.log(`✅ ${key}: ${actual}€ (correct)`);
        }
      }

    } catch (error) {
      console.log(`❌ Erreur dans le test: ${error.message}`);
      testResult.passed = false;
      testResult.error = error.message;
    }

    this.results.push(testResult);
    return testResult;
  }

  async runAllTests() {
    console.log('🚀 Tests Manuels Automatisés - Simulateur Retraite Progressive');
    console.log('================================================================');
    console.log('\n📋 Instructions:');
    console.log('1. Assurez-vous que l\'application est démarrée (npm start)');
    console.log('2. Ouvrez http://localhost:3000 dans votre navigateur');
    console.log('3. Naviguez vers la page Simulateur');
    console.log('4. Répondez aux questions en saisissant les valeurs affichées');
    console.log('\n⚠️ Tolérance acceptée: ±1€ pour les arrondis');
    
    await this.askQuestion('\nAppuyez sur Entrée quand vous êtes prêt...');

    // Tests des calculs principaux
    console.log('\n📊 TESTS DES CALCULS PRINCIPAUX');
    console.log('===============================');
    
    for (const testCase of TEST_QUESTIONS) {
      await this.runTest(testCase);
    }

    // Tests des scénarios
    console.log('\n📈 TESTS DES SCÉNARIOS');
    console.log('======================');
    
    for (const testCase of SCENARIO_QUESTIONS) {
      await this.runTest(testCase);
    }

    // Tests d'interface
    console.log('\n🎨 TESTS D\'INTERFACE');
    console.log('====================');
    
    const interfaceTests = [
      {
        name: "Navigation entre onglets",
        question: "La navigation entre les onglets (Saisie, Résultats, Scénarios) fonctionne-t-elle ? (oui/non)"
      },
      {
        name: "Affichage responsive",
        question: "L'affichage est-il correct sur votre écran ? (oui/non)"
      },
      {
        name: "Couleurs des barres",
        question: "Les couleurs des barres sont-elles visibles (rouge, bleu, vert, gris) ? (oui/non)"
      },
      {
        name: "Sauvegarde des données",
        question: "Les données sont-elles conservées après rafraîchissement de la page ? (oui/non)"
      }
    ];

    for (const test of interfaceTests) {
      const answer = await this.askQuestion(test.question);
      const passed = answer.toLowerCase().includes('oui');
      
      this.results.push({
        name: test.name,
        expected: { passed: true },
        actual: { passed: passed },
        passed: passed,
        timestamp: new Date().toISOString()
      });
    }

    // Générer le rapport
    await this.generateReport();
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
    fs.writeFileSync('manual-test-report.json', JSON.stringify(report, null, 2));
    
    console.log('\n📊 RÉSUMÉ DES TESTS MANUELS');
    console.log('===========================');
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
    
    console.log('\n📄 Rapport détaillé sauvegardé dans: manual-test-report.json');
    
    rl.close();
  }
}

// Exécution des tests
async function main() {
  const tester = new ManualTester();
  await tester.runAllTests();
}

// Exécuter si le script est appelé directement
if (require.main === module) {
  main().catch(console.error);
}

module.exports = { ManualTester, TEST_QUESTIONS, SCENARIO_QUESTIONS };
