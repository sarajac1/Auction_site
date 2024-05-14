import { Given, When, Then } from "@badeball/cypress-cucumber-preprocessor";

Given('I am logged in on listings page as user {string} with password {string}', (username, password) => {
  cy.visit('/login-page');
  cy.get('input[name="username"]').type(username);
  cy.get('input[name="password"]').type(password);
  cy.get('button[type="submit"]').click();
  cy.visit('/listings'); // Перенаправление на страницу объявлений после входа
});

When('I click on "Your listings" link', () => {
  cy.get('#your-listings').click();
});

Then('I should view all the listings I own', () => {
  cy.get('.listing_table').should('be.visible');
});
