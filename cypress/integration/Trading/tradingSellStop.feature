Feature: Test Creating a stop sell order from Exchange wallet

  @loginBitfinex
  Scenario: Order form/Create Stop sell Order
    Given I visit to Trading page
    When I select a currency
    Then A Sell Stop order from Exchange wallet should be created

  Scenario: Orders Table / Cancel Orders
    Then Filter should work
    Then A Sell Stop order from Exchange wallet should be cancelled