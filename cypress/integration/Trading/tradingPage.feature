Feature: Test Trading Page page

@loginBitfinex
  Scenario: Verify Order Book table
  Given I visit to Trading page
  When I select a currency
  Then I verify the alerts in order book table
  Then I verify the order book precision and aggregation