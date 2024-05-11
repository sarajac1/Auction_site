Feature: Navigate the website via the navigation bar 

  Scenario: See the navigation bar 
    Given I am on the "/" page and am not logged in
    Then I should see navigation tabs to "About us" and "jobs"