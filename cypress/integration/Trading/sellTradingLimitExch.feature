Feature: Test Creating a limit sell order from the Exchange wallet

Background: Login steps
Given I go to Trading page
  When I Select a currency

  Scenario: Order form/Create Limit sell Order
    Then A Sell Limit order from Exchange wallet should be created

  Scenario: Orders Table / Cancel Orders
Then Filter should work 
  Then A Sell Limit order from Exchange wallet should be cancelled