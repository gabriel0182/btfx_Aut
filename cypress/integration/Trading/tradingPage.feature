Feature: Test Trading Page page

  Background: Go to Ad form
  Given I go to Trading page
  When I Select a currency

  Scenario: Verify Order Book table
  Then I verify the alerts in order book table
  Then I verify the order book precision and aggregation