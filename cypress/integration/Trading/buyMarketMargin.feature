Feature: Test Creating a Market buy order from exchange wallet

@loginBitfinex
 Scenario: Order form / Create Market buy Order
  Given I am viewing the trading page
  And I select a currency
  And I select a Market Order type
  When A long margin position is opened
  Then I receive a notification that the position has opened

  Scenario: Positions Table / Close Position
  When I click on a positions close button
  Then I receive a notification that the position has closed