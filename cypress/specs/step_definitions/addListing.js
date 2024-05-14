import { Given, When, Then } from "@badeball/cypress-cucumber-preprocessor";

Given('that I am on {string}', (pageUrl) => {
  cy.visit(pageUrl);
});

When('I click on {string}', (createListingButton) => {
  cy.get(`#${createListingButton}`).click();
});

Then('{string} page will be displayed', (pageUrl) => {
  cy.visit(pageUrl);
});