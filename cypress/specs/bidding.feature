Feature: Bidding
    Check that i can me a Bidding
    
  Background:
    Given that I am logged in
    And am on the item page.
    And I have enough balance
    And my bid is higher than the last highest bid
  
  Scenario: bid
    When I enter a bid amount
    And I click on the the Place bid button
    Then highest bid updates to the inputted bid
    And the balance 
    And the message appears under the input field that the bid is successful.

# I'll have to break these up into more scenarios. This is just an outline. 
# that is break it up for seeing the updated balance, seeing the message, seeing the highest big, as well as, which is not mentioned, if the bid is successfully made or not


