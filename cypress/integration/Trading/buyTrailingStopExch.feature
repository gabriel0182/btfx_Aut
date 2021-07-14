Feature: Test Creating a Trailing Stop buy order from Exchange wallet

  @loginBitfinex
  Scenario:Create a Trailing Stop buy order from Exchange wallet
    Given I go to Trading page
    When I type the order required info
    And I select to Exchange Buy
    Then I verify the Trailing Stop buy order from Exchange wallet was created