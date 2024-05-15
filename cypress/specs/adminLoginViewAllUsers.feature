Feature: Login as Admin
  As an admin I want to see list of all Users, list of all Bids and could able to edit all listings. 

  Scenario: Login as Admin
    Given I am on logIn page
    When I admin credentials
    When I submit, expected to be loggedIn as an an Admin
    Then I should see "/users" to view all users 


  
  