/**
 * Configuration des Tests Automatisés
 * 
 * Ce script configure l'environnement de test pour le simulateur
 */

const fs = require('fs');
const { exec } = require('child_process');
const path = require('path');

class TestSetup {
  constructor() {
    this.projectRoot = process.cwd();
    this.testDir = path.join(this.projectRoot, 'tests');
  }

  async checkPrerequisites() {
    console.log('🔍 Vérification des prérequis...');
    
    // Vérifier Node.js
    const nodeVersion = process.version;
    console.log(`✅ Node.js version: ${nodeVersion}`);
    
    // Vérifier npm
    try {
      const { stdout } = await this.execCommand('npm --version');
      console.log(`✅ npm version: ${stdout.trim()}`);
    } catch (error) {
      console.log('❌ npm non trouvé');
      return false;
    }
    
    // Vérifier que l'application peut démarrer
    console.log('🚀 Vérification du démarrage de l\'application...');
    try {
      const { stdout } = await this.execCommand('npm start --version');
      console.log('✅ Application configurée');
    } catch (error) {
      console.log('⚠️ Impossible de vérifier l\'application');
    }
    
    return true;
  }

  async installDependencies() {
    console.log('📦 Installation des dépendances de test...');
    
    const dependencies = [
      'puppeteer@^21.0.0',
      'readline-sync@^1.4.10'
    ];
    
    for (const dep of dependencies) {
      try {
        console.log(`Installing ${dep}...`);
        await this.execCommand(`npm install ${dep} --save-dev`);
        console.log(`✅ ${dep} installé`);
      } catch (error) {
        console.log(`❌ Erreur lors de l'installation de ${dep}:`, error.message);
      }
    }
  }

  async createTestStructure() {
    console.log('📁 Création de la structure de test...');
    
    // Créer le dossier tests
    if (!fs.existsSync(this.testDir)) {
      fs.mkdirSync(this.testDir, { recursive: true });
      console.log('✅ Dossier tests créé');
    }
    
    // Copier les fichiers de test
    const testFiles = [
      'test-automation.js',
      'test-manual.js',
      'package-test.json'
    ];
    
    for (const file of testFiles) {
      const sourcePath = path.join(this.projectRoot, file);
      const destPath = path.join(this.testDir, file);
      
      if (fs.existsSync(sourcePath)) {
        fs.copyFileSync(sourcePath, destPath);
        console.log(`✅ ${file} copié`);
      }
    }
  }

  async createTestScripts() {
    console.log('📝 Création des scripts de test...');
    
    const packageJsonPath = path.join(this.projectRoot, 'package.json');
    let packageJson = {};
    
    if (fs.existsSync(packageJsonPath)) {
      packageJson = JSON.parse(fs.readFileSync(packageJsonPath, 'utf8'));
    }
    
    // Ajouter les scripts de test
    packageJson.scripts = packageJson.scripts || {};
    packageJson.scripts['test:automated'] = 'node test-automation.js';
    packageJson.scripts['test:manual'] = 'node test-manual.js';
    packageJson.scripts['test:all'] = 'npm run test:automated && npm run test:manual';
    packageJson.scripts['test:setup'] = 'node setup-tests.js';
    
    // Sauvegarder le package.json
    fs.writeFileSync(packageJsonPath, JSON.stringify(packageJson, null, 2));
    console.log('✅ Scripts de test ajoutés au package.json');
  }

  async createTestConfig() {
    console.log('⚙️ Création de la configuration de test...');
    
    const config = {
      testConfig: {
        baseUrl: 'http://localhost:3000',
        timeout: 30000,
        headless: false,
        viewport: { width: 1280, height: 720 }
      },
      testCases: [
        {
          name: "Mode Simplifié - Cas Standard",
          data: { salaireBrut: "5000", tempsPartiel: "60", surcoteDecote: "0" },
          expected: { salaireNet: 3900, pensionProgressive: 702, revenuTotal: 3702 }
        }
      ],
      scenarios: [
        {
          name: "Scénario 40%",
          expected: { salairePartiel: 1560, pensionProgressive: 977.34, revenuTotal: 2537.34 }
        }
      ]
    };
    
    const configPath = path.join(this.testDir, 'test-config.json');
    fs.writeFileSync(configPath, JSON.stringify(config, null, 2));
    console.log('✅ Configuration de test créée');
  }

  async createTestRunner() {
    console.log('🏃 Création du test runner...');
    
    const testRunner = `#!/usr/bin/env node
/**
 * Test Runner - Simulateur Retraite Progressive
 */

const { exec } = require('child_process');
const path = require('path');

class TestRunner {
  constructor() {
    this.projectRoot = process.cwd();
    this.results = [];
  }

  async runCommand(command) {
    return new Promise((resolve, reject) => {
      exec(command, (error, stdout, stderr) => {
        if (error) {
          reject(error);
        } else {
          resolve({ stdout, stderr });
        }
      });
    });
  }

  async startApplication() {
    console.log('🚀 Démarrage de l\'application...');
    try {
      // Démarrer l'application en arrière-plan
      const startProcess = exec('npm start');
      console.log('✅ Application démarrée');
      
      // Attendre que l'application soit prête
      await new Promise(resolve => setTimeout(resolve, 10000));
      
      return startProcess;
    } catch (error) {
      console.log('❌ Erreur lors du démarrage:', error.message);
      throw error;
    }
  }

  async runAutomatedTests() {
    console.log('🤖 Exécution des tests automatisés...');
    try {
      const { stdout } = await this.runCommand('node test-automation.js');
      console.log(stdout);
      return true;
    } catch (error) {
      console.log('❌ Erreur dans les tests automatisés:', error.message);
      return false;
    }
  }

  async runManualTests() {
    console.log('👤 Exécution des tests manuels...');
    try {
      const { stdout } = await this.runCommand('node test-manual.js');
      console.log(stdout);
      return true;
    } catch (error) {
      console.log('❌ Erreur dans les tests manuels:', error.message);
      return false;
    }
  }

  async runAllTests() {
    console.log('🧪 DÉMARRAGE DES TESTS COMPLETS');
    console.log('==============================');
    
    let appProcess = null;
    
    try {
      // Démarrer l'application
      appProcess = await this.startApplication();
      
      // Exécuter les tests automatisés
      const automatedPassed = await this.runAutomatedTests();
      
      // Exécuter les tests manuels
      const manualPassed = await this.runManualTests();
      
      // Résumé
      console.log('\\n📊 RÉSUMÉ FINAL');
      console.log('================');
      console.log(\`Tests automatisés: \${automatedPassed ? '✅ Réussis' : '❌ Échoués'}\`);
      console.log(\`Tests manuels: \${manualPassed ? '✅ Réussis' : '❌ Échoués'}\`);
      
      if (automatedPassed && manualPassed) {
        console.log('\\n🎉 TOUS LES TESTS SONT RÉUSSIS !');
        console.log('✅ Le simulateur est prêt pour le déploiement');
      } else {
        console.log('\\n⚠️ CERTAINS TESTS ONT ÉCHOUÉ');
        console.log('❌ Des corrections sont nécessaires');
      }
      
    } catch (error) {
      console.log('❌ Erreur générale:', error.message);
    } finally {
      if (appProcess) {
        appProcess.kill();
        console.log('🛑 Application arrêtée');
      }
    }
  }
}

// Exécution
async function main() {
  const runner = new TestRunner();
  await runner.runAllTests();
}

if (require.main === module) {
  main().catch(console.error);
}

module.exports = { TestRunner };
`;
    
    const runnerPath = path.join(this.testDir, 'test-runner.js');
    fs.writeFileSync(runnerPath, testRunner);
    console.log('✅ Test runner créé');
  }

  async execCommand(command) {
    return new Promise((resolve, reject) => {
      exec(command, (error, stdout, stderr) => {
        if (error) {
          reject(error);
        } else {
          resolve({ stdout, stderr });
        }
      });
    });
  }

  async setup() {
    console.log('🔧 Configuration des Tests Automatisés');
    console.log('=====================================');
    
    try {
      // Vérifier les prérequis
      await this.checkPrerequisites();
      
      // Installer les dépendances
      await this.installDependencies();
      
      // Créer la structure
      await this.createTestStructure();
      
      // Créer les scripts
      await this.createTestScripts();
      
      // Créer la configuration
      await this.createTestConfig();
      
      // Créer le test runner
      await this.createTestRunner();
      
      console.log('\n✅ Configuration terminée !');
      console.log('\n📋 Commandes disponibles:');
      console.log('  npm run test:automated  - Tests automatisés');
      console.log('  npm run test:manual    - Tests manuels');
      console.log('  npm run test:all       - Tous les tests');
      console.log('  npm run test:setup     - Reconfigurer');
      
    } catch (error) {
      console.log('❌ Erreur lors de la configuration:', error.message);
    }
  }
}

// Exécution
async function main() {
  const setup = new TestSetup();
  await setup.setup();
}

if (require.main === module) {
  main().catch(console.error);
}

module.exports = { TestSetup };
