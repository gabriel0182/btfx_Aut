Feature: Test Creating a Stop buy order from exchange wallet

@loginBitfinex
 Scenario: Order form/Create Stop buy Order
  Given I go to Trading page
  When I Select a currency
  Then A Buy Stop order from Exchange wallet should be created
  
@loginBitfinex
  Scenario: Orders Table /Cancel Orders
  Given I go to Trading page
  When I Select a currency
  Then A Buy Stop order from Exchange wallet should be cancelled