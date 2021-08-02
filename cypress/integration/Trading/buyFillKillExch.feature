Feature: Test Creating a Fill or Kill buy order from Exchange wallet

  @loginBitfinex
  Scenario: Create a Fill or Kill buy order from Exchange wallet
    Given I visit to Trading page
    When I type the order required info
    And I select to Exchange Buy
    Then I verify the Fill or Kill buy order from Exchange wallet was created