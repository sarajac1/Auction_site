import { Given, When, Then } from "@badeball/cypress-cucumber-preprocessor";

Given('I am in login page', () => {
  cy.visit('/login-page'); 
});

When('I have enter user credentials', () => {
  cy.get('input[name="username"]').type('sophiemiller'); 
  cy.get('input[name="password"]').type('sophie789'); 
});

When('I click login button, I should be logged-in', () => {
  cy.get('button[type="submit"]').click();
});

Then('I should see and click {string} in the navbar to see the profilepage', () => {
  cy.get('[href="/profile"]').click();
});

When('I enter {string} to update balance', (balance) => {
  cy.get('#bid-input').type(balance);
});

When('I click {string} button', (addbalance) => {
  cy.get(`#${addbalance}`).click();
});

Then('current balance should update', () => {
  cy.get('#currentBalance > .profile_info_different_collor');
});








