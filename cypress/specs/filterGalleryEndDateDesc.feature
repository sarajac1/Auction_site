Feature: User filters gallery items by Newest

      Scenario: User filters gallery items by date
      Given I am on the front page
      Then I should see a gallery item
      When I filter by "Newest"
      Then I should see all titles filtered from newest to oldest items