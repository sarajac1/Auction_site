import { Given, When, Then } from "@badeball/cypress-cucumber-preprocessor";

Given('I am logged in on bids page as user {string} with password {string}', (username, password) => {
  cy.visit('/login-page');
  cy.get('input[name="username"]').type(username);
  cy.get('input[name="password"]').type(password);
  cy.get('button[type="submit"]').click();
  cy.visit('/'); // Перенаправление на главную страницу после входа
});

When('I access the "Your bids" section', () => {
  cy.get('#your-bids').click();
});

Then('I expect to see all the bids I have made', () => {
  cy.get('.bids_table').should('be.visible');
});
