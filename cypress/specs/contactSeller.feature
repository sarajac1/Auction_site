Feature: Contact Seller

  Background:
    Given I am logged in as user "mikedavis" with password "mike001"
    And I am on the bids page

  Scenario: Successfully contact the seller after winning a bid
    Given I have won a bid
    When I click on the "Contact Seller" button for the winning item
    Then I should see contact details for the seller
