describe('Registration Test', () => {
  it('Registers a new user and logs in', () => {
    cy.visit('http://localhost:8081');

    cy.get('div.login-footer-link').click();

    cy.get('input[name="username"]').type('admin@admin.admin');
    cy.get('input[name="email"]').type('admin@admin.admin');
    cy.get('input[name="password"]').type('admin@admin.admin');
    cy.get('input[name="confirmPassword"]').type('admin@admin.admin');

    cy.get('button.registration-button').click();

    cy.url().should('include', '/overview');
  });
});