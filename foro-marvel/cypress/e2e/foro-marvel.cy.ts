describe('suite name', () => {
  //Test
  it('verify title positive test', () => {
    //steps
    cy.visit('localhost:4200');
    cy.title().should('eq', 'Inicio');
  });

  it('verify title negative test', () => {
    //steps
    cy.visit('localhost:4200');
    cy.title().should('eq', 'inicio');
  });
});
