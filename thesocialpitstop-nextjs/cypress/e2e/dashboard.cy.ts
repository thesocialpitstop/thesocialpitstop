describe('settings', () => {
  it('dashboard and profile redirect to auth0 login page', () => {
    // Start from the index page
    cy.visit('/')

    // Find a link with an href attribute containing "about" and click it
    cy.get('a[href*="dashboard"]', { timeout: 30000 }).click()

    // The new url should include "/about"
    cy.url().should('include', 'the-social-pitstop.us.auth0.com')

  })
})

export {};