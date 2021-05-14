Feature: Test Trading trades table

  @focus

  Scenario: Test Trading trades table

    Given I go to Trading page

    When I Select a currency

    Then I verify the trading table Market

    Then I verify the trading table yours