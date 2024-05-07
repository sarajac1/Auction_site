import { Given, When, Then } from "@badeball/cypress-cucumber-preprocessor";

Given('I am on the {string} page', (url) => {
  cy.visit(url)
});

Then('I should see {string}', (url) => {
  cy.get('#GalleryPage')
});