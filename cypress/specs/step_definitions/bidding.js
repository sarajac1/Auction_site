import { Given, When, Then } from "@badeball/cypress-cucumber-preprocessor";


Given('that I am on {string} page', (pageUrl) => {
  cy.visit(pageUrl);
});

When('I enter a {string} {string}', (field, value) => {
  if (field === "bidAmount") {
    cy.get('#bid-input').clear().type(value);
  }
});

When('I click on the the {string}', (buttonId) => {
  cy.get(`#${buttonId} button`).click();
});

Then('{string} updates to the inputted {string}', (elementId, expectedValue) => {
  cy.get(`#${elementId}`).should('have.text', `${expectedValue} Souls`);
});