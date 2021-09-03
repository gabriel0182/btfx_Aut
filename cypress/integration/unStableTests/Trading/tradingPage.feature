Feature: Test Trading Page page

  @loginBitfinex
  Scenario: Verify Order Book table
    Given I am viewing the trading page
    When I select the ticker "BTC:USD"
    Then I verify the order book precision and aggregation