describe('Navigation', () => {
  it('navigate to categories page', () => {
    // Start from the index page
    cy.visit('/')

    // Find a link with an href attribute containing "about" and click it
    cy.get('a[href*="categories"]').click()

    // The new url should include "/about"
    cy.url().should('include', '/categories')

    // The new page should contain an h1 with "About page"
    cy.get('h1').contains('Categories')

    cy.get('h3').contains('Community Services')
    cy.get('h3').contains('Education & Training')
    cy.get('h3').contains('Environment')
    cy.get('h3').contains('Events Management')
    cy.get('h3').contains('Food & Beverage')
    cy.get('h3').contains('Health & Wellness')
    cy.get('h3').contains('Professional Services')
    cy.get('h3').contains('Retail & Fashion')
    cy.get('h3').contains('Volunteer Projects')

    cy.get('h3').contains('Community Services').click()

    cy.url().should('include', '/search?category=community-services')


  })
})

export {};