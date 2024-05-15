Feature: Login as Admin
  As an admin I want to see list of all Users, list of all Bids and could able to edit all listings. 

  Scenario: Login as Admin
    Given I am on log-in page
    When I have enter username, password
    When I click on login button, I should be logged-in as an Admin
    Then I should see "/listings" in nav bar

    
  
  