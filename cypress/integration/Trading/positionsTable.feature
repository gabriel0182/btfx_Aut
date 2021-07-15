Feature: Test position table validations

  Background: Go to trading page
  Given I go to Trading page

@loginBitfinex
  Scenario: Max/Min position values
  When I select the Create a New Position option

    Then I verify the position Min-Max amount
@loginBitfinex
    Scenario: Verify Position table sorting
    Then I verify the sorting shoud work