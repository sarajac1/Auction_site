import { Given, When, Then } from "@badeball/cypress-cucumber-preprocessor";

Given('I am on page logIn', () => {
  cy.visit('/login-page'); 
});

When('I have enter username & password', () => {
  cy.get('input[name="username"]').type('sophiemiller'); 
  cy.get('input[name="password"]').type('sophie789'); 
});

When('I click on login button, I should be logged-in', () => {
  cy.get('button[type="submit"]').click();
});

Then('I should be able to click {string} in the navbar to see the profilepage', () => {
  cy.get('[href="/profile"]').click();
});