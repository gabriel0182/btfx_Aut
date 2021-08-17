Feature: Test position table validations

  @loginBitfinex
  Scenario: Max/Min position values
    Given I visit to Trading page
    When I select the Create a New Position option
    Then I verify the position Min-Max amount

  Scenario: Verify Position table sorting
    Then I verify the sorting shoud work