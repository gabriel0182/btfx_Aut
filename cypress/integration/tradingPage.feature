Feature: Test Trading Page page

  @focus

  Scenario: Trading Page Loads

    Given I go to Trading page

    When I Select a currency

    Then I verify the graph is shown

    Then I Verify Balance table is shown