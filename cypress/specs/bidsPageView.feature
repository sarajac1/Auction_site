Feature: Ability to see Bids

  Background:
    Given I am logged in on bids page as user "mikedavis" with password "mike001"

  Scenario: See all my bids
    When I access the "Your bids" section
    Then I expect to see all the bids I have made
