Feature: Test Creating a Immediate or Cancel buy order from Exchange wallet

  @loginBitfinex
  Scenario: Create a Immediate or Cancel buy order from Exchange wallet
    Given I visit to Trading page
    When I type the order required info
    And I select to Exchange Buy
    Then I verify the Immediate or Cancel buy order from Exchange wallet was created