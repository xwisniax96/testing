/// <reference types="cypress" />


describe('SEO Tests', () => {
  
    beforeEach(() => {
      cy.viewport(1920, 1080);
      cy.visit('https://work.nana.com.pl/');
    });
  
    it('Page has a unique <title>', () => {
      cy.title().should('not.be.empty');
      cy.title().should('not.include', 'Nana |'); 
    });
  
    it('Page has a unique <meta name="description">', () => {
      cy.get('meta[name="description"]').should('have.attr', 'content').and('not.be.empty');
      cy.get('meta[name="description"]').should('not.have.attr', 'content', 'Nana');
    });
  
    it('Page has appropriate header structure (H1, H2, H3)', () => {
      cy.get('h1').should('exist').and('have.length', 1); 
      cy.get('h2').should('exist'); 
      cy.get('h3').should('exist'); 
    });
  
    it('No duplicate content on the page', () => {
      cy.get('body').then($body => {
        const text = $body.text();
        const textWords = text.split(' ').length;
        cy.log(`Total words on page: ${textWords}`);
        expect(textWords).to.be.greaterThan(500); 
      });
    });
  
    it('Page has a sitemap.xml file', () => {
      cy.request('https://work.nana.com.pl/sitemap.xml').its('status').should('eq', 200);
    });
  
    it('Page has a robots.txt file', () => {
      cy.request('https://work.nana.com.pl/robots.txt').its('status').should('eq', 200);
    });
  
  
  });
  