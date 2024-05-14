Feature: Create Listing

  Background:
    Given I am logged in as "mikedavis" with password "mike001"
    And I am on the listings page

  Scenario: User can create a listing successfully
    When I click on the "Create listing" button
    And I fill in the "title" with "CypressTest1"
    And I fill in the "startbid" with "100"
    And I fill in the "description" with "CypressTest2"
    And I fill in the "image" with "http://example.com/cypress-test-image.jpg"
    And I submit the listing form
    Then I should see the new listing with title "CypressTest1" on the listings page
