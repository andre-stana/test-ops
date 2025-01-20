describe('Creation Page Test', () => {
    before(() => {
    cy.visit('http://localhost:8081');

    cy.get('div.login-footer-link').click();

    cy.get('input[name="username"]').type('admin@admin.admin');
    cy.get('input[name="email"]').type('admin@admin.admin');
    cy.get('input[name="password"]').type('admin@admin.admin');
    cy.get('input[name="confirmPassword"]').type('admin@admin.admin');

    cy.get('button.registration-button').click();

    cy.url().should('include', '/overview');
    });

  it('Navigates to creation page and clicks reaction buttons', () => {
    cy.contains('span', 'Creation').click();
    cy.url().should('include', '/creation');

    cy.contains('button', 'Reactions').click();

    cy.contains('button', 'discord').click();

    cy.contains('li', 'new_message').click();
  });
});