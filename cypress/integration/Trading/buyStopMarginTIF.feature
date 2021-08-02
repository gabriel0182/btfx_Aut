Feature: Test Creating a stop buy order with TIF from Margin wallet

  @loginBitfinex
  Scenario: Create a stop buy order with TIF from Margin wallet
    Given I visit to Trading page
    When I type the order required info
    And I select to Exchange Buy
    Then I verify the stop order with TIF from Margin wallet was created