Feature: Test Creating a Scaled buy order from Exchange wallet

  @loginBitfinex
  Scenario: Create a Scaled buy order from Exchange wallet
    Given I go to Trading page
    When I type the order required info
    And I select to Exchange Submit
    Then I verify the Scaled buy order from Exchange wallet was created