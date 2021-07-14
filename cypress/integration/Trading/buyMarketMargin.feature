Feature: Test Creating a Market buy order from exchange wallet

@loginBitfinex
 Scenario: Order form/Create Market buy Order
  Given I go to Trading page
  When I Select a currency
  And I select the market order
  Then A Buy Market order from Exchange wallet should be created

@loginBitfinex
  Scenario: Orders Table / Cancel Orders
  Given I go to Trading page
  When I Select a currency
  And I select the market order
  Then A Buy Market order from Exchange wallet should be cancelled