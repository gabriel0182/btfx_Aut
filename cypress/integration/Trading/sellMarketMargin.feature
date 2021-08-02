Feature: Test Creating a Market sell order from exchange wallet

@loginBitfinex
 Scenario: Order form/Create Market sell Order
  Given I visit to Trading page
  When I select a currency
  And I select market order
  Then A sell Market order from Exchange wallet should be created
