Feature: User filters gallery items

  Background:
      Given I am on the front page
      Then I should see a gallery item

      Scenario: User filters gallery items by oldest items
      When I filter by Ends Soon
      Then I should see all titles filtered from items that ends soon to newest

      Scenario: User filters gallery items by newest items
      When I filter by Newest
      Then I should see all titles filtered from newest to oldest items

      Scenario: User filters gallery items by lowest price
      When I filter by Lowest Price
      Then I should see all titles filtered from lowest price to highest

      
      Scenario: User filters gallery items by highest price
      When I filter by Highest Price
      Then I should see all titles filtered from highest price to lowest