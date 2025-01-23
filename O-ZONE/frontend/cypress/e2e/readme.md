# Tests End-to-End avec Cypress

Ce projet utilise Cypress pour effectuer des tests end-to-end (E2E) afin de garantir la qualité et la fiabilité de l'application.

## Prérequis

- Node.js (version 12 ou supérieure)
- npm (version 6 ou supérieure)
- Cypress (installé via npm)

## Installation

1. Clonez le dépôt :
   ```bash
   git clone https://github.com/andre-stana/O-ZONE.git
   cd O-ZONE/o-zone_front/
   ```

2. Installez les dépendances :
   ```bash
   npm install
   ```

## Configuration

Assurez-vous que le fichier 

cypress.config.js

 est correctement configuré pour votre projet. Voici un exemple de configuration :

```javascript
// filepath: /O-ZONE/frontend/cypress.config.js
const { defineConfig } = require("cypress");

module.exports = defineConfig({
    projectId: 'k1zdor',
    e2e: {
        setupNodeEvents(on, config) {
            // implement node event listeners here
        },
        supportFile: false,
    },

    component: {
        devServer: {
            framework: "create-react-app",
            bundler: "webpack",
        },
    },
});
```

## Structure des Tests

Les tests sont organisés dans le dossier `cypress/e2e`. Voici un aperçu des fichiers de test :

- `login.cy.js` : Test de connexion
- `register.cy.js` : Test d'inscription
- `sidebar.cy.js` : Test des boutons de la barre latérale
- `chat.cy.js` : Test du bouton de chat
- `logout.cy.js` : Test de déconnexion

## Exécution des Tests

Pour exécuter les tests Cypress, utilisez l'une des commandes suivantes :

- Pour ouvrir l'interface graphique de Cypress :
  ```bash
  npx cypress open
  ```

- Pour exécuter les tests en mode headless :
  ```bash
  npx cypress run
  ```

## Exemple de Tests

### Test de Connexion

```javascript
// exemple
describe('Sign In Test', () => {
  it('Clicks on the Sign In button', () => {
    cy.visit('http://localhost:8081');
    cy.get('button.login-button').click();
  });
});
```

### Test de Déconnexion

```javascript
// exemple
describe('Logout Test', () => {
  before(() => {
    cy.visit('http://localhost:8081');
    cy.get('button.login-button').click();
  });

  it('Logs out successfully', () => {
    cy.get('.logout-button').click();
    cy.url().should('include', '/');
  });
});
```

## Contribution

Les contributions sont les bienvenues ! Veuillez soumettre une pull request ou ouvrir une issue pour discuter des changements que vous souhaitez apporter.

## Licence

Ce projet est sous licence MIT.

Voir le fichier [LICENSE](../../../LICENSE) pour plus de détails.