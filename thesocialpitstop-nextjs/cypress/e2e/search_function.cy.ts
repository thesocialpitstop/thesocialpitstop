describe('search for an SOO', () => {
  it('searches for an SOO correctly', () => {
    // Start from the index page
    cy.visit('/search')

    cy.get('input').type('hello')

    cy.contains('button', 'SEARCH').click()

    cy.get('a').contains('hello')
    cy.get('div').contains('address123')


  })
})

export {};