Feature: Test Trading trades table

  @loginBitfinex
  Scenario: Sorting Order History Table
    Given I am viewing the trading page
    When I select the ticker "BTC:USD"
    Then The sorting order History table should work

@loginBitfinex
   Scenario: Trading table Market
    Given I am viewing the trading page
    When I select the ticker "BTC:USD"
    Then The trading table Market should work

@loginBitfinex
    Scenario: Trading table Yours
    Given I am viewing the trading page
    When I select the ticker "BTC:USD"
    Then The trading table yours should work