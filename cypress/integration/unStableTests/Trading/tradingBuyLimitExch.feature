Feature: Test Creating a limit buy order from exchange wallet

@loginBitfinex
 Scenario: Order form/Create Limit buy Order
  Given I am viewing the trading page
  When I select the ticker "BTC:USD"
  Then A Buy Limit order from Exchange wallet should be created
  Then A Buy Limit order green marker should be shown
  
  Scenario: Orders Table /Validate Filters and Cancel Orders
  Given I am viewing the trading page
  When I select the ticker "BTC:USD"
  Then Filter should work 
  Then A Buy Limit order from Exchange wallet should be cancelled

