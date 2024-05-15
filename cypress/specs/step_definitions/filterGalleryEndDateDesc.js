import { Given, When, Then } from "@badeball/cypress-cucumber-preprocessor";

/* No duplicate steps, this one already in 1_homePage.js
Given('I am on the front page', () => {});*/

/* No duplicate steps, this one already in 1_homePage.js
Then('I should see a gallery item', () => {});*/

/* No duplicate steps, this one already in filterGalleryEndDateAsc.js
When('I filter by {string}', (a) => {});*/

Then("I should see all titles filtered from newest to oldest items", () => {
  cy.get(".filterBar").select("EndsSoon");
  cy.get(".filterBar").should("have.value", "EndsSoon");
  cy.wait(1000);
  cy.get(".filterBar").select("Newest");
  cy.wait(3000);
  cy.get(".filterBar").should("have.value", "Newest");
  cy.wait(5000);

  // MAke sure its date related!
  cy.get(".gallery-enddate-day").then(($daysLeft) => {
    for (let i = 0; i < $daysLeft.length - 1; i++) {
      const currentDays = parseFloat($daysLeft.eq(i).text());
      const nextDays = parseFloat($daysLeft.eq(i + 1).text());

      cy.wrap(currentDays).should("be.gte", nextDays);
    }
  });

  // TODO: implement step
});
