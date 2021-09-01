Feature: Test the Login

  @focus

  Scenario: user can login into the site
    Given I am viewing the trading page
    When I type my user, pass and login
    Then I verify my user is logged on