  import { Given, When, Then } from "@badeball/cypress-cucumber-preprocessor";

  let initialBalance;
  Given('that I am on {string} pagee', (pageUrl) => {
    cy.visit(pageUrl);
  });

  Given('that I am on {string}', (pageUrl) => {
    cy.visit(pageUrl);
  });

  When('I enter {string} in the {string}', (value, field) => {
    cy.get(`#${field}`).clear().type(value);
  });

  When('I click on the {string} button', (buttonId) => {
    cy.get(`#${buttonId}`).click();
  });

  Given('I store the initial balance', () => {
    cy.get('#currentBalance .profile_info_different_collor').invoke('text').then((balanceText) => {
      initialBalance = parseInt(balanceText, 10);
    });
  });

  Then('the balance is updated by {string}', (value) => {
    const expectedIncrease = parseInt(value, 10);
      cy.get('#currentBalance .profile_info_different_collor').invoke('text').then((balanceText) => {
        const newbalance = parseInt(balanceText, 10);
        const expectedNewBalance = initialBalance + expectedIncrease;
        expect(newbalance).to.be.equal(expectedNewBalance);
      });
});
