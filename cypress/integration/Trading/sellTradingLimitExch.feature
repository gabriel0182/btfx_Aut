Feature: Test Creating a limit sell order from the Exchange wallet

  @focus

  Scenario:Create a limit sell order from the Exchange wallet

    Given I go to Trading page

    When I type the order required info

   And I select to Exchange sell

    Then I verify the limit sell order was created