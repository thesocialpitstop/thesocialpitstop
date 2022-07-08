import { NO_ITEM_MESSAGE } from '../../constants/errors';

describe('search for an SOO', () => {
  it('searches for an SOO correctly', () => {
    // Start from the index page
    cy.visit('/search')

    cy.get('input').type('justin SOO')

    cy.contains('button', 'SEARCH').click()

    cy.get('a').contains('hello')
    cy.get('div').contains('address123')
  })
})

describe('display no items messsage when given nonsense category', () => {
  it('is able to render page and show error message', () => {
    //Visit search page with nonsense category given
    cy.visit('/search?query=&category=ansjdnasjdnkas')

    cy.contains('div', NO_ITEM_MESSAGE)
  })

})

export {};