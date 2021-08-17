Feature: Test Trading trades table

   @loginBitfinex
  Scenario: Sorting Order History Table
    Given I visit to Trading page
    When I select a currency
    Then The sorting order History table should work


  Scenario: Trading table Market
    Then The trading table Market should work

  Scenario: Trading table Yours
    Then The trading table yours should work