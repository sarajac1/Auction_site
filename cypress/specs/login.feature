Feature: Login Functionality

  As a registered user
  I want to login to my account
  So that I can access my user-specific resources

  Background:
    Given I am on the login page

  Scenario: Successful login with valid credentials
    Given I have entered a valid username and password
    When I press the login button
    Then I should be redirected to the homepage
