Feature: User Profile page view
  As a user, I want to see my profile. 

  Scenario: Login as Admin
    Given I am on page logIn
    When I have enter username & password
    When I click on login button, I should be logged-in
    Then I should be able to click "/profile" in the navbar to see the profilepage