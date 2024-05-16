Feature: User filters gallery items by Lowest Price

      Scenario: User filters gallery items by price
      Given I am on the front page
      Then I should see a gallery item
      When I filter by "Lowest Price"
      Then I should see all titles filtered from lowest price to highest