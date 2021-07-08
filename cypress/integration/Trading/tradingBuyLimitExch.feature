Feature: Test Creating a limit buy order from exchange wallet

  @focus

  Scenario:Create a limit buy order from exchange wallet

    Given I go to Trading page

    When I type the order required info

   And I select to Exchange Buy

    Then I verify the limit order was created