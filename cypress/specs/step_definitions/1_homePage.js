import { Given, When, Then } from "@badeball/cypress-cucumber-preprocessor";

Given("I am on the front page", (a) => {
  cy.visit("/");
});

Then("I should see a gallery item", (a) => {
  cy.get(".gallery-image");
});
