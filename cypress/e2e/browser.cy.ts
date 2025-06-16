/// <reference types="cypress" />
import { browserSelectors } from '../support/selectors/browserSelectors';

describe('Search functionality', () => {
  beforeEach(() => {
    cy.viewport(1920, 1080);
    cy.visit('https://work.nana.com.pl/');
  });

  it('Search suggestions appear when typing "t-shirt"', () => {
    cy.get(browserSelectors.searchInput).type('t-shirt');
    cy.get(browserSelectors.searchSuggestion).should('have.length.at.least', 1);
  });

  it('Clicking a suggestion navigates to product page', () => {
    cy.get(browserSelectors.searchInput).type('t-shirt');
    cy.get(browserSelectors.searchSuggestion).first().click();
    cy.url().should('include', '/p/');
    cy.get(browserSelectors.productTitle).should('exist');
  });

  it('Pressing ENTER after typing "t-shirt" shows results page', () => {
    cy.get(browserSelectors.searchInput).type('t-shirt{enter}');
    cy.url().should('include', '/szukaj');
    cy.get(browserSelectors.searchResults).should('exist');
  });
});
