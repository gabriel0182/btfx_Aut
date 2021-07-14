Feature: Test Creating a stop buy order from Exchange wallet

  @loginBitfinex
  Scenario:Create a stop buy order
    Given I go to Trading page
    When I type the order required info
    And I select to Exchange Buy
    Then I verify the stop order was created