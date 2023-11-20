
describe('frontend', () => {
    beforeEach(() => cy.visit('/en'));

    it('should display github', () => {
         cy.contains('Github');
        // ().contains('Github');
    });
});
