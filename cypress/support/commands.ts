import { registrationSelectors } from './selectors';



Cypress.Commands.add('fillRegistrationCheckboxes', () => {
  // zaznacz checkbox "Akceptuję warunki regulaminu"
  cy.get('input[type="checkbox"][name="zgoda"]').check({ force: true });

  // zaznacz checkbox "Chcę otrzymywać powiadomienia o nowościach"
  cy.get('input[type="checkbox"][name="nowosci"]').check({ force: true });
});
