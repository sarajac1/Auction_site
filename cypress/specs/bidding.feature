Feature: Bidding
    Check that i can make a bid
  
  Scenario: bid
    Given I log in with username "usifer" and password "123abc"
    And that I am on "/item/1" page
    When I enter a "bidAmount" "625"
    And I click on the the "placeBidButton"
    Then "highestBid" updates to the inputted "625"

