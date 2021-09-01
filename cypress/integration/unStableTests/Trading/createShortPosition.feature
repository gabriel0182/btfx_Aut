Feature: Test Creating a new Short position

  Background: Go to trading page
  Given I am viewing the trading page

@loginBitfinex
  Scenario: Create a new Short position
  When I select the Create a New Short Position option
  Then I verify the position was created

@loginBitfinex
  Scenario: Cancelling a Short position
  Then I verify the position was cancelled
