import { Given, When, Then } from "@badeball/cypress-cucumber-preprocessor";

/* No duplicate steps, this one already in 1_homePage.js
Given('I am on the front page', () => {});*/

/* No duplicate steps, this one already in 1_homePage.js
Then('I should see a gallery item', () => {});*/

When("I filter by {string}", (a) => {
  cy.get(".filterBar").select(a);
});

Then(
  "I should see all titles filtered from items that ends soon to newest",
  () => {
    // TODO: implement step
  }
);
