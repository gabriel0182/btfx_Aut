Feature: Test Trading Page page

  Background: Go to Ad form
  Given I go to Trading page
  When I Select a currency

  Scenario: Trading Page Loads
  Then I verify the graph is shown

  Scenario: Max buy/sell
  Then I verify the Order form max buy / sell

  Scenario: Best bid/ask
  Then I verify the Order from best bid / ask

  Scenario: Alerts in order book table
  Then I verify the alerts in order book table

  Scenario: Book precision and aggregation
  Then I verify the order book precision and aggregation