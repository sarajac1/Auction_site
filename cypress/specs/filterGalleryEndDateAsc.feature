Feature: User filters gallery items by Ends Soon

      Scenario: User filters gallery items by date
      Given I am on the front page
      Then I should see a gallery item
      When I filter by "Ends Soon"
      Then I should see all titles filtered from items that ends soon to newest