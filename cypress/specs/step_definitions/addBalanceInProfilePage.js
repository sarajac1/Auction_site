  import { Given, When, Then } from "@badeball/cypress-cucumber-preprocessor";

  Given('that I am on {string} pagee', (pageUrl) => {
    cy.visit(pageUrl);
  });

Given('that I am on {string}', (pageUrl) => {
  cy.visit(pageUrl);
});

When('I enter {string} in the {string}', (value, field) => {
  if (field === "bid-input") {
    cy.get(`#${field}`).clear().type(value);
  }
});

Then('I click on the {string} button the balance is updated', (buttonId) => {
  cy.get(`#${buttonId}`).click();
});

