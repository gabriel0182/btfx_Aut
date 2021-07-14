Feature: Test balance quick transfer

@loginBitfinex
  Scenario: Test balance quick transfer
    Given I go to Trading page
    And Trading view is visible
    When I select the currency from the balance
    And I select Source and Destination for USD Transfer
    Then I transfer the amount and confirm the transaction