import { Given, When, Then } from "@badeball/cypress-cucumber-preprocessor";

Given('I am logged in as {string} with password {string}', (username, password) => {
  cy.visit('/login-page'); // Убедитесь, что это URL страницы входа
  cy.get('input[name="username"]').type(username);
  cy.get('input[name="password"]').type(password);
  cy.get('button[type="submit"]').click();
});

Given('I am on the listings page', () => {
  cy.visit('/listings'); // Убедитесь, что это правильный URL
});

When('I click on the {string} button', (button) => {
  cy.contains('button', button).click();
});

When('I fill in the {string} with {string}', (field, value) => {
  cy.get(`input[name="${field}"]`).type(value);
});

When('I submit the listing form', () => {
  cy.get('form').submit();
});

Then('I should see the new listing with title {string} on the listings page', (title) => {
  cy.contains('.listing_table', title).should('be.visible');
});
