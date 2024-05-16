import { Given, When, Then } from "@badeball/cypress-cucumber-preprocessor";

Given('I am on log-in page', () => {
  cy.visit('/login-page'); 
});

When('I have enter username, password', () => {
  cy.get('input[name="username"]').type('admin'); 
  cy.get('input[name="password"]').type('admin'); 
});

When('I click on login button, I should be logged-in as an Admin', () => {
  cy.get('button[type="submit"]').click()
});

Then ('I should see {string} in nav bar', (pageUrl) => {
  cy.visit(pageUrl)
});



