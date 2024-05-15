import { Given, When, Then } from "@badeball/cypress-cucumber-preprocessor";

/* No duplicate steps, this one already in 1_homePage.js
Given('I am on the front page', () => {});*/

/* No duplicate steps, this one already in 1_homePage.js
Then('I should see a gallery item', () => {});*/

When("I enter {string} in search input", (a) => {
  cy.intercept("GET", "/api/GetSearchedItems?search=", []).as("loadSearch");

  cy.get(".searchBar").type(a);
  //Doesnt search properly
});

Then("I should find all titles containing {string}", (a) => {
  cy.get(".gallery-title").each(($element) => {
    let element = $element.toLowerCase;
    let string = a.toLowerCase;
    cy.wrap(element).should("contain", string);
  });
});
