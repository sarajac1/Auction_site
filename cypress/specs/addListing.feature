Feature: Add Listing
  Check that i can go to the add listing page

  Scenario: view add listing page 
    Given I log in with username "usifer" and password "123abc"
    And that I am on "/listings" 
    When I click on "createListingButton"
    Then "/AddListing" page will be displayed
