
describe('Cypress Home Page test' ,() => {
    beforeEach(' visit Home page ', () => {
        cy.visit('/');
    });

    it('verify all components are present', ()=> {
        cy.get('#searchText').should('have.length' ,1)
        cy.get('#tweetListCol').should('have.length', 1)
        cy.get('#savedTweetsCol').should('have.length', 1)
    });

    it('drag and drop', () => {
        cy.get('#tweetListCol > :nth-child(1)').trigger('dragStart')
        cy.get('#savedTweetsCol').trigger('dragover', {force: true})
        cy.get('#savedTweetsCol').trigger('drop')
    })
});