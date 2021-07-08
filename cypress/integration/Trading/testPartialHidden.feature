Feature: Test Creating a limit partial hidden order

  @focus

  Scenario: Create a limit partial hidden order

    Given I go to Trading page

    When I place a hidden limit order at the spread price

   And I place a market order in the opposite direction for half the amount

    Then The hidden limit order will get partially filled for half the amount