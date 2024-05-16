  import { Given, When, Then } from "@badeball/cypress-cucumber-preprocessor";

  let initialBalance;
  Given('that I am on {string} pageee', (pageUrl) => {
    cy.visit(pageUrl);
  });

  Given('that I am on {string}', (pageUrl) => {
    cy.visit(pageUrl);
  });

  When('I enter {string} into the {string}', (value, field) => {
    cy.get(`#${field}`).clear().type(value);
  });

  When('I click on the {string}', (withdrawBalance) => {
    cy.get(`#${withdrawBalance}`).click();
  });

  Given('I store the initial balancee', () => {
    cy.get('#currentBalance .profile_info_different_collor').invoke('text').then((balanceText) => {
      initialBalance = parseInt(balanceText, 10);
    });
  });

  Then('the balance is reduced by {string}', (value) => {
    const expectedDecrease = parseInt(value, 10);
      cy.get('#currentBalance .profile_info_different_collor').invoke('text').then((balanceText) => {
        const newbalance = parseInt(balanceText, 10);
        const expectedNewBalance = initialBalance - expectedDecrease;
        expect(newbalance).to.be.equal(expectedNewBalance);
      });
});
