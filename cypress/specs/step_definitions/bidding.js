import { Given, When, Then } from "@badeball/cypress-cucumber-preprocessor";

let latestBid;
let newBid;

Given('that I am on {string} page', (pageUrl) => {
  cy.visit(pageUrl);
});

Given('I fetch the latest bid', () => {
  cy.get('#highestBid').invoke('text').then((bidText) => {
    latestBid = parseInt(bidText, 10);
    newBid = latestBid + 1;
    cy.wrap(newBid).as('newBidAmount');
  });
});

When('I enter the new bid amount', () => {
  cy.get('@newBidAmount').then((newBid) => {
    cy.get('#bid-input').clear().type(newBid);
  });
});

When('I click on the the {string}', (buttonId) => {
  cy.get(`#${buttonId} button`).click();
});

Then('{string} updates to the new bid amount', (elementId) => {
  cy.get('@newBidAmount').then((newBid) => {
    cy.get(`#${elementId}`).should(($element) => {
      const text = $element.text();
      expect(parseInt(text, 10)).to.equal(newBid);
  });
  });
});