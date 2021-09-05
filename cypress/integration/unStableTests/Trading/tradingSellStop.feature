Feature: Test Creating a stop sell order from Exchange wallet

Background: Login steps
Given I am viewing the trading page
When I select the ticker "BTC:USD"

@loginBitfinex
  Scenario: Order form/Create Stop sell Order
    Given I am viewing the trading page
    When I select the ticker "BTC:USD"
    Then A Sell Stop order from Exchange wallet should be created

  Scenario: Orders Table / Cancel Orders
    Then Filter should work
    Then A Sell Stop order from Exchange wallet should be cancelled