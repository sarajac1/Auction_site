Feature: Register New User Functionality
  As a new user i want to register.
 
  Scenario: Register User
    Given I am on the page login 
    When I click on "register"
    Then I should see "registerUser" as the title

  Scenario: New User credentials
    Given I have entered a username, password, email, address
    When I press the register button
    Then I should be redirected to the homepage with new user credentials
    
  Scenario: Logout from my account
    Given I am on my account page 
    When I click on "logout" button
    Then I should see the home page