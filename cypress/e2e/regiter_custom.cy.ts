describe('Test rejestracji', () => {
  it('zaznacza checkboxy regulaminu i newslettera', () => {
    cy.visit('https://nana.com.pl/rejestracja.html');
    cy.fillRegistrationCheckboxes();

    // Możesz tu dodać asercje, że są zaznaczone:
    cy.get('input[name="zgoda"]').should('be.checked');
    cy.get('input[name="nowosci"]').should('be.checked');
  });
});
