Feature: Test Creating a Fill or Kill sell order from Exchange wallet

  @loginBitfinex
  Scenario: Create a Fill or Kill sell order from Exchange wallet
    Given I am viewing the trading page
    When I type the order required info
    And I select to Exchange Sell
    Then I verify the Fill or Kill sell order from Exchange wallet was created