Feature: Test Creating a Immediate or Cancel sell order from Exchange wallet

  @loginBitfinex

  Scenario: Create a Immediate or Cancel sell order from Exchange wallet
    Given I visit to Trading page
    When I type the order required info
   And I select to Exchange Sell
    Then I verify the Immediate or Cancel sell order from Exchange wallet was created