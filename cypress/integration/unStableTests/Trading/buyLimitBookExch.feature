Feature: Test Creating a Limit (Order Book) buy order from Exchange wallet

@loginBitfinex
  Scenario: Create a Limit (Order Book) buy order from Exchange wallet
    Given I am viewing the trading page
    And I select a currency
    And I select the market order
    When I type the order required info
    And I select and order from the book
    Then I verify the Limit Order Book buy order from Exchange wallet was created