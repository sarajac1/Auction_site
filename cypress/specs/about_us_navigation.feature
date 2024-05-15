Feature: Navigate to the "About Us" page as a guest

  Scenario: Guest user navigation to the "About Us" page
    Given I am on the front page and not logged in
    When I click on the "About Us" link in the navigation bar
    Then I should be on the "About Us" page