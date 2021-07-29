Feature: Test Creating a stop sell order from Exchange wallet

Background: Login steps
Given I go to Trading page
When I Select a currency

@loginBitfinex
  Scenario: Order form/Create Stop sell Order
  Then A Sell Stop order from Exchange wallet should be created

@loginBitfinex
  Scenario: Orders Table / Cancel Orders
  Then Filter should work 
  Then A Sell Stop order from Exchange wallet should be cancelled