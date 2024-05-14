Feature: Add Listing
  Check that i can add a listing

  Scenario: add listing
    Given I log in with username "usifer" and password "123abc"
    And that I am on "/AddListing" page
    Then "/AddListing" page will be displayed
