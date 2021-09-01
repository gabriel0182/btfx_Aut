Feature: Test Creating a limit partial hidden order

  @loginBitfinex
  Scenario: Create a limit partial hidden order
    Given I am viewing the trading page
    When I place a hidden limit order at the spread price
    And I place a market order in the opposite direction for half the amount
    Then The hidden limit order will get partially filled for half the amount