Feature: Test Creating a stop limit sell order from Exchange wallet

  @focus

  Scenario:Create a stop limit sell order from Exchange wallet

    Given I go to Trading page

    When I type the order required info

   And I select to Exchange sell from Exchange wallet

    Then I verify the stop limit order was created