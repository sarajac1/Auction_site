Feature: Ability to see Bids

  Background:
    Given I am logged in on bids page as user "usifer" with password "123abc"

  Scenario: See all my bids
    When I access the "Your bids" section
    Then I expect to see all the bids I have made
