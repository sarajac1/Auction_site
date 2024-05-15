import { Given, When, Then } from "@badeball/cypress-cucumber-preprocessor";

/* No duplicate steps, this one already in 1_homePage.js
Given('I am on the front page', () => {});*/

/* No duplicate steps, this one already in 1_homePage.js
Then('I should see a gallery item', () => {});*/

/* No duplicate steps, this one already in filterGalleryEndDateAsc.js
When('I filter by {string}', (a) => {});*/

Then("I should see all titles filtered from highest price to lowest", () => {
  cy.get(".filterBar").should("have.value", "HighestPrice");
  cy.wait(5000);

  cy.get(".gallery-price").then(($price) => {
    for (let i = 0; i < $price.length - 1; i++) {
      const currentPrice = parseFloat($price.eq(i).text());
      const nextPrice = parseFloat($price.eq(i + 1).text());
      cy.wrap(currentPrice).should("be.gte", nextPrice);
    }
  });
});
