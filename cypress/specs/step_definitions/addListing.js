import { Given, When, Then } from "@badeball/cypress-cucumber-preprocessor";

Given('that I am on {string} page', (pageUrl) => {
  cy.visit(pageUrl);
});



Then('{string} page will be displayed', (pageURl) => {
  cy.visit(pageUrl);
});