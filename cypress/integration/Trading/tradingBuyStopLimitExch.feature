Feature: Test Creating a stop limit buy order from Exchange wallet

  @loginBitfinex
  Scenario:Create a stop limit buy order from Exchange wallet
    Given I visit to Trading page
    When I type the order required info
    And I select to Exchange Buy from Exchange wallet
    Then I verify the stop limit order was created