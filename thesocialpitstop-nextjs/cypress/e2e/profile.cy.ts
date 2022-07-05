describe('profile page', () => {
  it('goes to profile page correctly', () => {
    // Start from a profile page
    cy.visit('/profile/62a572f8161dcca7abf68365')

    cy.get('h1').contains('Education SOO')
    cy.get('h2').contains('We are Education SOO')
    cy.get('h1').contains('Education SOO')
    cy.get('h1').contains('Past CSR Activities')
    cy.get('h1').contains('Reviews')

    cy.contains('button', 'Leave a review')

  })
})

export {};