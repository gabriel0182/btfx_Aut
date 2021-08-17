Feature: Test Creating a new Short position

@loginBitfinex
  Scenario: Create a new Short position
  Given I visit to Trading page
  When I select the Create a New Short Position option
  Then I verify the position was created

  Scenario: Cancelling a Short position
  Then I verify the position was cancelled
