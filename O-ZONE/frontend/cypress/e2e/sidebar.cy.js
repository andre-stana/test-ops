describe('Sidebar Test', () => {
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
  
    it('Tests all sidebar buttons', () => {
      const sidebarItems = [
        { text: "Overview", path: "/overview" },
        { text: "Creation", path: "/creation" },
        { text: "Historic", path: "/historic" },
        { text: "Connections", path: "/connections" },
        { text: "Settings", path: "/settings" },
      ];
  
    sidebarItems.forEach(item => {
      cy.contains('span', item.text).click();
      cy.url().should('include', item.path);
    });
  });
});
