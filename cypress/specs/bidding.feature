Feature: Bidding
    Check that i can make a bid   
  
  Scenario: make a bid
    Given I log in with username "usifer" and password "123abc"
    And that I am on "/item/1" page
    Given I fetch the latest bid
    When I enter the new bid amount
    And I click on the the "placeBidButton"
    Then "highestBid" updates to the new bid amount

