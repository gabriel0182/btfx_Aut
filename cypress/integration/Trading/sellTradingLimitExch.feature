Feature: Test Creating a limit sell order from the Exchange wallet


Background: Login steps
Given I visit to Trading page
When I select a currency

@loginBitfinex
  Scenario: Order form/Create Limit sell Order
  Then A Sell Limit order from Exchange wallet should be created

@loginBitfinex
  Scenario: Orders Table / Cancel Orders
  Then Filter should work 
  Then A Sell Limit order from Exchange wallet should be cancelled