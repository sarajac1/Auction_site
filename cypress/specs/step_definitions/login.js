import { Given, When, Then } from "@badeball/cypress-cucumber-preprocessor";

Given('I am on the login page', () => {
  cy.visit('/login-page'); 
});

Given('I have entered a valid username and password', () => {
  cy.get('input[name="username"]').type('usifer'); 
  cy.get('input[name="password"]').type('123abc'); 
});

When('I press the login button', () => {
  cy.get('button[type="submit"]').click();
});

Then('I should be redirected to the homepage', () => {
  cy.url().should('include', '/'); 
});


Given('I log in with username {string} and password {string}', (username, password) => {
  cy.visit('/login-page');
  cy.get('input[name="username"]').type(username);
  cy.get('input[name="password"]').type(password);
  cy.get('button[type="submit"]').click();
  cy.url().should('include', '/'); 
});