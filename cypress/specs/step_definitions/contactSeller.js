import { Given, When, Then } from "@badeball/cypress-cucumber-preprocessor";

Given('I am logged in as user {string} with password {string}', (username, password) => {
  cy.visit('/login-page');
  cy.get('input[name="username"]').type(username);
  cy.get('input[name="password"]').type(password);
  cy.get('button[type="submit"]').click();
});

Given('I am on the bids page', () => {
  cy.visit('/bids'); // Убедитесь, что это правильный URL страницы ставок
});

When('I click on the "Contact Seller" button for the winning item', () => {
  cy.get('.contact_seller_cell .bids_button_contact_seller').first().click();
});

Then('I should see contact details for the seller', () => {
  cy.get('.modal').should('be.visible');
  cy.get('.modal_text').should('contain', 'Username');
  cy.get('.modal_text').should('contain', 'Email');
});
