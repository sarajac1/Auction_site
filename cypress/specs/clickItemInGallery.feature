Feature: Click item on gallery page

    Scenario: Click on item on gallery page
      Given I am on the front page
      Then I should see a gallery item
      When I click on an item
      Then I should get to the item page for that item