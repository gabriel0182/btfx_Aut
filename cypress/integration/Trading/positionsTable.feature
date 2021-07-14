Feature: Test position table validations

  Background: Login
  Given I go to Trading page

  Scenario: Max/Min position values
  When I select the Create a New Position option

    Then I verify the position Min-Max amount

    Scenario: Verify Position table sorting
    Then I verify the sorting shoud work