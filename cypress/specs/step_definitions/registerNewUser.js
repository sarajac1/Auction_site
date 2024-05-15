import { Given, When, Then } from "@badeball/cypress-cucumber-preprocessor";
 
Given('I am on the page login', () => {
  cy.visit('/login-page'); 
});
 
When('I click on {string}', (register) => {
  cy.get(`#${register}`).click();
});
 
Then('I should see {string} as the title', () => {
  cy.get('h2.register_user_text')
});
 
Given('I have entered a username, password, email, address', () => {
  cy.get('#username').type('test');
  cy.get('#password').type('test');
  cy.get('[name="newUserConfirmPassword"]').type('test');
  cy.get('[type="email"]').type('test@test');
  cy.get('[name="newUserAddress"]').type('test');
});
 
When('I press the register button', () => {
  cy.get('form.register_user_text > .rounded-button-small').click();
});
 
Then('I should be redirected to the homepage with new user credentials', () => {
  cy.get('#root');
});
 
Given('I am on my account page', () => {
  cy.get('#root'); 
});
 
When('I click on {string} button', (logout) => {
  cy.get(`#${logout}`).should('be.visible').click();
});
 
Then('I should see the home page', () => {
  cy.url().should('include', '/'); 
});