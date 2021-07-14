Feature: Test Creating a stop sell order from Exchange wallet

  @loginBitfinex
  Scenario:Create a stop sell order
    Given I go to Trading page
    When I type the order required info
    And I select to Exchange sell
    Then I verify the stop order was created