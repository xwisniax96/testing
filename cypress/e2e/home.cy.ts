/// <reference types="cypress" />


describe('Main page test', () => {
  beforeEach(() => {
    cy.viewport(1920, 1080)
    cy.visit('https://work.nana.com.pl/')
  })

  it('Checking if status is ready', () => {
    cy.url().should('eq', 'https://work.nana.com.pl/')
  })

  it('Contains title', () => {
    cy.title().should('not.be.empty')
  })

  it('Logo redirect to MP', () => {
    cy.visit('https://work.nana.com.pl/gadzety-reklamowe/torby-plecaki-worki/torby-1')

    cy.get('div.logo a')
      .should('have.attr', 'href', '/')
      .click()

    cy.url().should('eq', 'https://work.nana.com.pl/')
    cy.title().should('include', 'NANA')
  })

  it('Logo is visible', () => {
    cy.get('div.logo img[src="/static/images/logo.webp"]').should('be.visible')
  })

  it('Nav-menu exists', () => {
    cy.get('#main-menu > ul').should('exist')
  })

  it('Banner or slider is visible', () => {
    cy.get('section, .hero, .banner, .slider').first().should('be.visible')
  })

  it('Product list exists', () => {
    cy.get('section, .products, .product-list, .product-card').should('exist')
  })
  
  it('Katalog Produktów works', () => {
    cy.get('.category-btn-wrapper > .btn')
      .should('be.visible')
      .click()
  })

  it('Slider auto-plays from 0 to 5', () => {
    const totalSlides = 6;

    for (let i = 0; i < totalSlides; i++) {
      cy.get(`[data-index="${i}"]`, { timeout: 10000 })
        .should('have.class', 'active');

      if (i < totalSlides - 1) {
        cy.wait(6000);
      }
    }
  })
  
  it('Bestsellery menu item redirects correctly', () => {
    cy.get('#main-menu > ul > :nth-child(3) > a')
      .should('be.visible')
      .click()

    cy.url().should('include', '/bestsellery')
    cy.title().should('include', 'Bestsellery')
  })

})
