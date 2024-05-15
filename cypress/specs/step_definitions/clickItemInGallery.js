import { Given, When, Then } from "@badeball/cypress-cucumber-preprocessor";

/* No duplicate steps, this one already in 1_homePage.js
Given('I am on the front page', () => {});*/

/* No duplicate steps, this one already in 1_homePage.js
Then('I should see a gallery item', () => {});*/

When("I click on an item", () => {
  cy.get(
    '[href="/item/1"] > :nth-child(1) > .text-container > .gallery-title'
  ).click();
  // TODO: implement step
});

Then("I should get to the item page for that item", () => {
  cy.get(".item-blurb");
  // TODO: implement step
});
