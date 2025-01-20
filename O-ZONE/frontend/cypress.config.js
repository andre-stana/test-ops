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