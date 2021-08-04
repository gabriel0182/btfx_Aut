Feature: Test Creating a Market buy order from exchange wallet

@loginBitfinex
 Scenario: Order form / Create Market buy Order
  Given I visit to Trading page
  And I select a currency
  And I select a Market Order type
  When A long margin position is opened
  Then I receive a notification that the position has opened

@loginBitfinex
  Scenario: Positions Table / Close Position
  Given I visit to Trading page
  When I click on a positions close button
  Then I receive a notification that the position has closed