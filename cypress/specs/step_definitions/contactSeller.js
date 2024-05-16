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

Given('I have won a bid', () => {
  // Этот шаг проверяет наличие выигранной ставки
  cy.get('.bids_table tbody tr').should('have.length.greaterThan', 0);
  cy.get('.bids_table tbody tr').each(($el) => {
    if ($el.hasClass('text-white') && $el.find('td').eq(2).text().trim() === 'Win') {
      cy.wrap($el).as('winningBid');
      return false; // Останавливаем перебор строк
    }
  });
});

When('I click on the "Contact Seller" button for the winning item', () => {
  cy.get('@winningBid').find('.bids_button_contact_seller').click();
});

Then('I should see contact details for the seller', () => {
  cy.get('.modal').should('be.visible');
  cy.get('.modal_text').should('contain', 'Username');
  cy.get('.modal_text').should('contain', 'Email');
});
