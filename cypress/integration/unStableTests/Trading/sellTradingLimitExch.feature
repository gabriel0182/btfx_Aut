Feature: Test Creating a limit sell order from the Exchange wallet


Background: Login steps
Given I am viewing the trading page
When I select the ticker "BTC:USD"

@loginBitfinex
  Scenario: Order form/Create Limit sell Order
    Given I am viewing the trading page
    When I select the ticker "BTC:USD"
    Then A Sell Limit order from Exchange wallet should be created

  Scenario: Orders Table / Cancel Orders
    Then Filter should work
    Then A Sell Limit order from Exchange wallet should be cancelled