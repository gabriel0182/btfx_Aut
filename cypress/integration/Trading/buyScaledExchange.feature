Feature: Test Creating a Scaled buy order from Exchange wallet

  @loginBitfinex
  Scenario: Create a Scaled buy order from Exchange wallet
    Given I visit to Trading page
    When I type the order required info
    And I submit the Buy order
    Then The Exchange Scaled Buy orders are created