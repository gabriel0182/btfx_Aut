Feature: Test position table validations

  Background: Go to trading page
  Given I am viewing the trading page

@loginBitfinex
  Scenario: Max/Min position values
    Given I am viewing the trading page
    When I select the Create a New Position option
    Then I verify the position Min-Max amount

  Scenario: Verify Position table sorting
    Then I verify the sorting shoud work