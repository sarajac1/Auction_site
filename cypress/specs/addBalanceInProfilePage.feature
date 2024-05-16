Feature: Add balance in profile page
    Could able to add balance
    
  Scenario: Login, view balance page, and add balance
    Given I log in with username "usifer" and password "123abc"
    And that I am on "/profile" pagee
    And I store the initial balance
    When I enter "500" in the "bid-input"
    Then I click on the "addbalance" button 
    Then the balance is updated by "500"