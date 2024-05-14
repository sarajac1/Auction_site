Feature: able to see Listings

  Background:
    Given I am logged in on listings page as user "mikedavis" with password "mike001"

  Scenario: See the whole Listing Page
    When I click on "Your listings" link
    Then I should view all the listings I own
