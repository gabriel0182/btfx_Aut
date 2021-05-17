Feature: Test Trading Page page

  @focus

  Scenario: Trading Page Loads

    Given I go to Trading page

    When I Select a currency

    Then I verify the graph is shown

    Then I verify the Order from best bid / ask

    Then I verify the Order form max buy / sell

    Then I verify the alerts in order book table

    Then I verify the order book precision and aggregation

    Then I Verify Balance table is shown