Feature: Test Creating a Trailing Stop sell order from Exchange wallet

  @loginBitfinex
  Scenario:Create a Trailing Stop sell order from Exchange wallet
    Given I am viewing the trading page
    When I type the order required info
    And I select to Exchange Sell
    Then I verify the Trailing Stop sell order from Exchange wallet was created