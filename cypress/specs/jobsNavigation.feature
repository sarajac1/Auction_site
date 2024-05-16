Feature: Navigate to the "Jobs" page as a guest

  Scenario: Guest user navigation to the "Jobs" page
    Given I am on the front page as a guest
    When I click on the "Jobs" link in the navigation bar
    Then I should be on the "Jobs" page