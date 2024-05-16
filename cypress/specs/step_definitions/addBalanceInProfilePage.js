  import { Given, When, Then } from "@badeball/cypress-cucumber-preprocessor";

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
  Then('the balance is updated by {string}', () => {
    cy.get('#currentBalance .profile_info_different_collor').invoke('text').then((balanceText) => {
      const balance = parseInt(balanceText, 10);
      expect(balance).to.be.greaterThan(0);
    });
});

