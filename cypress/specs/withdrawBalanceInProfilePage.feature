Feature: Withdraw balance in profile page
    Could able to withdraw balance
    
  Scenario: Login, view balance page, and withdraw balance
    Given I log in with username "usifer" and password "123abc"
    And that I am on "/profile" pageee
    And I store the initial balancee
    When I enter "500" into the "bid-input"
    Then I click on the "withdrawBalance" 
    Then the balance is reduced by "500"