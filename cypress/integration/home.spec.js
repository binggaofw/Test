
describe('Cypress Home Page test' ,() => {
    beforeEach(' visit Home page ', () => {
        cy.visit('/');
    });
    it('loads successfully', () => {
        cy.visit('http://localhost:3000')
    })
    it('verify all components are present', ()=> {
        cy.get('#header')
        .should('be.visible')
        .within(() => {
            cy.get('h1')
                .should('contain.text','Tweet Saver')

        cy.get('#tweetSearch').invoke('attr', 'placeholder').should('contain', 'Search Twitter By KeyWords')

        cy.get( '#savedTweetHeader').should('contain', 'Saved Tweets')
    })
    cy.get( '#searchResult').should('be.visible')
    cy.get( '#savedTweetsContainer').should('be.visible')


    });

    it('drag and drop', () => {

        cy.get('#tweetSearch').type('Canada BC')
        cy.get('svg.MuiSvgIcon-root').eq(0).click()
        cy.get('#searchResult > :nth-child(1)').trigger('dragStart')
        cy.get('#savedTweetsContainer').trigger('dragover', {force: true})
        cy.get('#savedTweetsContainer').trigger('drop')
    })
});