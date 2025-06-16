/// <reference types="cypress" />


describe('reg form', () => {
  const generateRandomString = (length) => {
    const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    let result = '';
    for (let i = 0; i < length; i++) {
      result += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    return result;
  };

  it('should register user with random data', () => {
    cy.visit('https://work.nana.com.pl/user/register')

    const firstName = generateRandomString(8);
    const lastName = generateRandomString(8);

    const email = `${generateRandomString(5)}@example.com`;

    const password = generateRandomString(12) + '!';

    cy.get('input[name="firstName"]').type(firstName);
    cy.get('input[name="lastName"]').type(lastName);
    cy.get('input[name="email"]').first().type(email);

    cy.get('input[id^="password"]').should('be.visible').filter(':visible').first()
    .type(password);

    cy.get('input[id^="password"]').should('be.visible').filter(':visible').eq(1)
    .type(password);
 

   /*
    cy.log('enter passwords and captchta');
    cy.wait(20000);

    cy.get('button[type="submit"]').click();
  
    cy.get('#content > :nth-child(1) > .alert-container > .alert')
      .should('be.visible')
      .and('contain', 'Twoje konto zostało założone');

    cy.url().should('eq', 'https://work.nana.com.pl/user/login');

    */
  });
});
