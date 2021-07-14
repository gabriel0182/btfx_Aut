Feature: Test Creating a Limit (Order Book) sell order from Exchange wallet

  @loginBitfinex
  Scenario: Create a Limit (Order Book) sell order from Exchange wallet
    Given I go to Trading page
    When I type the order required info
    And I select and order from the book
    Then I verify the Limit Order Book sell order from Exchange wallet was created