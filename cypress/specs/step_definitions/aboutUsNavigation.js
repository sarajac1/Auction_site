import { Given, When, Then } from "@badeball/cypress-cucumber-preprocessor";

Given('I am on the front page and not logged in', () => {
  cy.visit('/');
});

When('I click on the "About Us" link in the navigation bar', () => {
  cy.get('nav').contains('About Us').click();
});

// Flexibility in handling case-insensitive words 
Then(/^I should be on the "(About Us)" page$/, () => {
  cy.url().should('include', '/about-us');
  cy.contains('h1', 'About Us').should('be.visible');
});