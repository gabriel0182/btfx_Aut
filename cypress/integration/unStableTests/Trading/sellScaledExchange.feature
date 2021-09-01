Feature: Test Creating a Scaled sell order from Exchange wallet

  @loginBitfinex
  Scenario: Create a Scaled sell order from Exchange wallet
    Given I am viewing the trading page
    When I type the order required info
    And I select to Exchange Submit
    Then I verify the Scaled sell order from Exchange wallet was created