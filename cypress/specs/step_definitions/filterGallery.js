import { Given, When, Then } from "@badeball/cypress-cucumber-preprocessor";

/* No duplicate steps, this one already in 1_homePage.js
Given('I am on the front page', () => {});*/

/* No duplicate steps, this one already in 1_homePage.js
Then('I should see a gallery item', () => {});*/

When("I filter by Ends Soon", (a) => {
  cy.get(".filterBar").select("EndsSoon");
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

When("I filter by Newest", (a) => {
  cy.get(".filterBar").select("EndsSoon");
  cy.get(".filterBar").should("have.value", "EndsSoon");
  cy.wait(1000);
  cy.get(".filterBar").select("Newest");
  cy.wait(3000);
  cy.get(".filterBar").should("have.value", "Newest");
  cy.wait(5000);
});

Then("I should see all titles filtered from newest to oldest items", () => {
  cy.get(".gallery-enddate-day").then(($daysLeft) => {
    for (let i = 0; i < $daysLeft.length - 1; i++) {
      const currentDays = parseFloat($daysLeft.eq(i).text());
      const nextDays = parseFloat($daysLeft.eq(i + 1).text());

      cy.wrap(currentDays).should("be.gte", nextDays);
    }
  });
});

When("I filter by Lowest Price", (a) => {
  cy.get(".filterBar").select("LowestPrice");
  cy.get(".filterBar").should("have.value", "LowestPrice");
  cy.wait(5000);
});

Then("I should see all titles filtered from lowest price to highest", () => {
  cy.get(".gallery-price").then(($price) => {
    for (let i = 0; i < $price.length - 1; i++) {
      const currentPrice = parseFloat($price.eq(i).text());
      const nextPrice = parseFloat($price.eq(i + 1).text());

      cy.wrap(currentPrice).should("be.lte", nextPrice);
    }
  });
});

When("I filter by Highest Price", (a) => {
  cy.get(".filterBar").select("HighestPrice");
  cy.get(".filterBar").should("have.value", "HighestPrice");
  cy.wait(5000);
});

Then("I should see all titles filtered from highest price to lowest", () => {
  cy.get(".gallery-price").then(($price) => {
    for (let i = 0; i < $price.length - 1; i++) {
      const currentPrice = parseFloat($price.eq(i).text());
      const nextPrice = parseFloat($price.eq(i + 1).text());
      cy.wrap(currentPrice).should("be.gte", nextPrice);
    }
  });
});
