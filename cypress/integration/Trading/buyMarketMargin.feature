Feature: Test Creating a Market buy order from exchange wallet

@loginBitfinex
 Scenario: Order form/Create Market buy Order
  Given I go to Trading page
  When I Select a currency
  And I place a Margin Market Order
  Then A long margin position is opened

@loginBitfinex
  Scenario: Positions Table / Close Position
  Given I go to Trading page
  When I Select a currency
  And I place a Margin Market Order
  Then A Buy Market order from Exchange wallet should be cancelled