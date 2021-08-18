Feature: Test Creating a stop limit sell order from Exchange wallet

  @loginBitfinex
  Scenario:Create a stop limit sell order from Exchange wallet
    Given I am viewing the trading page
    When I type the order required info
    And I select to Exchange sell from Exchange wallet
    Then I verify the stop limit order was created