import { Given, When, Then } from "@badeball/cypress-cucumber-preprocessor";


Given('that I am on "/item/1" page', () => {
  cy.visit('/item/1');
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