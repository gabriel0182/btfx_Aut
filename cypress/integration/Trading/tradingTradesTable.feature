Feature: Test Trading trades table

@loginBitfinex
  Scenario: Sorting Order History Table
    Given I go to Trading page
    When I Select a currency
    Then The sorting order History table should work

@loginBitfinex
   Scenario: Trading table Market
    Given I go to Trading page
    When I Select a currency
    Then The trading table Market should work

@loginBitfinex
    Scenario: Trading table Yours
    Given I go to Trading page
    When I Select a currency
    Then The trading table yours should work