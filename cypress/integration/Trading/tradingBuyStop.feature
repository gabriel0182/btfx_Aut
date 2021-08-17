Feature: Test Creating a Stop buy order from exchange wallet

  @loginBitfinex
  Scenario: Order form/Create Stop buy Order
    Given I visit to Trading page
    When I select a currency
    Then A Buy Stop order from Exchange wallet should be created

  Scenario: Orders Table /Cancel Orders
    Then A Buy Stop order from Exchange wallet should be cancelled