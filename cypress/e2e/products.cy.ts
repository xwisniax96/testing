/// <reference types="cypress" />

describe('Test adding products to cart', () => {
  let successCount = 0
  let errorCount = 0
  let logs: string[] = []

  beforeEach(() => {
    cy.clearCookies()
    cy.clearLocalStorage()
  })

  it('adding all the products to cart, if possible', () => {
    cy.fixture('products.json').then((urls: string[]) => {
      urls.forEach((url: string, index: number) => {
        cy.visit(url)
        
        cy.get('body').then(($body) => {
          if ($body.find('button:contains("Do koszyka")').length > 0) {
            cy.contains('button', 'Do koszyka', { timeout: 10000 }).click()

            cy.get('a.btn.btn-lg.btn-primary[href="/koszyk"]', { timeout: 10000 })
              .should('exist')
              .then(() => {
                successCount++
                const log = `Added product: ${url}`
                logs.push(log)
                cy.log(log)
              })
          } else {
            errorCount++
            const log = `No button 'Add to cart' for: ${url}`
            logs.push(log)
            cy.log(log)
          }
        }).then(() => {
          if (index === urls.length - 1) {
            cy.then(() => {
              logs.push('\nProducts added: ' + successCount)
              logs.push('Products skipped: ' + errorCount)
              logs.push('All products checked: ' + urls.length)

              cy.writeFile('cypress/reports/koszyk_summary.txt', logs.join('\n'))
            })
          }
        })
      })
    })
  })
})
