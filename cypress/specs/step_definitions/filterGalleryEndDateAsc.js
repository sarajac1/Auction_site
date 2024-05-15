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
    cy.get(".filterBar").should("have.value", "EndsSoon");
    cy.wait(5000);

    cy.get(".gallery-enddate-day").then(($daysLeft) => {
      for (let i = 0; i < $daysLeft.length - 1; i++) {
        const currentDays = parseFloat($daysLeft.eq(i).text());
        const nextDays = parseFloat($daysLeft.eq(i + 1).text());

        cy.wrap(currentDays).should("be.lte", nextDays);
      }
    });
  }
);
