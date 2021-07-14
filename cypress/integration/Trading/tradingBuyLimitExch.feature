Feature: Test Creating a limit buy order from exchange wallet

@loginBitfinex
 Scenario: Order form/Create Limit buy Order
  Given I go to Trading page
  When I Select a currency
  Then A Buy Limit order from Exchange wallet should be created
  Then A Buy Limit order green marker should be shown
  
@loginBitfinex
  Scenario: Orders Table /Validate Filters and Cancel Orders
  Given I go to Trading page
  When I Select a currency
  Then Filter should work 
  Then A Buy Limit order from Exchange wallet should be cancelled

