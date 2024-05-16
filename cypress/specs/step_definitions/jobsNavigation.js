import { Given, When, Then } from "@badeball/cypress-cucumber-preprocessor";

Given('I am on the front page as a guest', () => {
  cy.visit('/');
});

When('I click on the "Jobs" link in the navigation bar', () => {
  cy.get('nav').contains('Jobs').click();
});

// Flexibility in handling case-insensitive words 
Then(/^I should be on the "(Jobs)" page$/, () => {
  cy.url().should('include', '/jobs');
  cy.contains('h1', 'Job').should('be.visible');
});