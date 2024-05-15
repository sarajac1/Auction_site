import { Given, When, Then } from "@badeball/cypress-cucumber-preprocessor";

Given('I am on logIn page', () => {
  cy.visit('/login-page'); 
});

When('I admin credentials', () => {
  cy.get('input[name="username"]').type('admin'); 
  cy.get('input[name="password"]').type('admin'); 
});

When('I submit, expected to be loggedIn as an an Admin', () => {
  cy.get('button[type="submit"]').click()
});

Then('I should see {string} to view all users', (pageUrl) => {
  cy.visit(pageUrl)
});

