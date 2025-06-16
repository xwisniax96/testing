/// <reference types="cypress" />
import $ from 'jquery'; // aby JQuery działało
import { expect } from 'chai'; // aby używać chai.expect

Cypress.on('uncaught:exception', () => false);

describe('Dynamic price check - brutto total matches quantity and pricing tier', () => {
  const quantity = 2;

  beforeEach(() => {
    cy.viewport(1920, 1080);
    cy.visit('https://nana.com.pl/k1565,branze-firmy-gadzety-dla-klubow-sportowych.html');
  });

  it('should correctly calculate brutto total based on pricing tier for 2 items', () => {
    cy.get('.product-a', { timeout: 10000 })
      .first()
      .find('a')
      .should('be.visible')
      .click();

    cy.get('h1').invoke('text').then((productTitleRaw: string) => {
      const productTitle = productTitleRaw.trim();

      cy.get('table.gradacja tr.price').then((rows: JQuery<HTMLElement>) => {
        let unitBruttoPrice: number | null = null;

        cy.log(`Znaleziono wierszy gradacji: ${rows.length}`);

        rows.each((_i, row) => {
          const $row = Cypress.$(row);
          const range = $row.find('td').eq(1).text().trim();    
          const bruttoText = $row.find('td').eq(5).text().trim(); 

          cy.log(`Parsuję gradację -> zakres: "${range}", brutto text: "${bruttoText}"`);

          const match = range.match(/^(\d+)(?:-(\d+)?)?$/);
          if (!match) return;

          const min = parseInt(match[1], 10);
          const max = match[2] ? parseInt(match[2], 10) : Infinity;

          if (quantity >= min && quantity <= max) {
            unitBruttoPrice = parseFloat(bruttoText.replace(',', '.'));
            cy.log(`  → dopasowano: ${min}-${max}, unitBruttoPrice = ${unitBruttoPrice}`);
            return false; 
          }
        });

        expect(unitBruttoPrice, 'unitBruttoPrice should be found').to.not.be.null;

        const expectedTotal = (unitBruttoPrice! * quantity)
          .toLocaleString('pl-PL', { minimumFractionDigits: 2, maximumFractionDigits: 2 });
        cy.log(`Oczekiwany total brutto (pl-PL): ${expectedTotal}`);

        
        cy.get('.pInputIlosc').clear().type(quantity.toString());
        cy.contains('button', 'Dodaj do koszyka').click();

        
        cy.get('a[href="koszyk.html"]').click();

        
        cy.get('#koszyk_do_skryptu td.kom')
          .contains(productTitle)
          .parents('tr')
          .within(() => {
            
            cy.get('td').each((el, idx) => {
              cy.log(`  kolumna ${idx}: "${el.text().trim()}"`);
            });

            cy.get('td').eq(5) 
              .invoke('text')
              .then((text: string) => {
                const actualTotal = text.trim();
                cy.log(`  rzeczywisty total brutto z koszyka: ${actualTotal}`);
                expect(actualTotal).to.equal(expectedTotal);
              });
          });
      });
    });
  });
});
