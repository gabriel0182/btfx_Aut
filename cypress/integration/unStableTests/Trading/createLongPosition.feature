Feature: Test Creating a new Long position

  Background: Visit trading page
  Given I am viewing the trading page

@loginBitfinex
  Scenario: Create a new Long position
  When I select the Create a New Long Position option
  Then I verify the position was created

@loginBitfinex
  Scenario: Cancelling a Long position
  Then I verify the position was cancelled
