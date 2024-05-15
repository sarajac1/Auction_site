Feature: User searches gallery items

      Scenario: User searches gallery items
      Given I am on the front page
      Then I should see a gallery item
      When I enter "cat" in search input
      Then I should find all titles containing "cat"