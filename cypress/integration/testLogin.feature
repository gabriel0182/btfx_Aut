Feature: Test the Login

  @focus

  Scenario: user can login into the site

    Given I visit the homepage

    When I type my user and pass

    And Click on the login button

    Then I verify my user is logged on