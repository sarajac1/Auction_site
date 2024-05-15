Feature: Add balance in profile page
    Could able to add balance
    
  Scenario: Login & View Profile page
    Given I am in login page
    When I have enter user credentials
    When I click login button, I should be logged-in
    Then I should see and click "profile" in the navbar to see the profilepage
  

  Scenario: Add balance in Profile page
    When I enter "500" to update balance
    When I click "addbalance" button
    Then current balance should update
