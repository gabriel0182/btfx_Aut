Feature: Test Creating a limit sell order from the Exchange wallet

  @loginBitfinex
  Scenario: Order form/Create Limit sell Order
    Given I am viewing the trading page
    When I select a currency
    Then A Sell Limit order from Exchange wallet should be created

  Scenario: Orders Table / Cancel Orders
    Then Filter should work
    Then A Sell Limit order from Exchange wallet should be cancelled