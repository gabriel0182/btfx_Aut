Feature: Order form/Limit order Validations

   @loginBitfinex
   Scenario: Limit order min/max price perform properly
      Given I am viewing the trading page
      When I select a currency
      Then Limit order min-max price should work

   Scenario: Highest bid
      Then I verify the highest bid

   Scenario: Lowest Ask
      Then I verify the lowest ask

   Scenario: Order form max buy / sell
      Then I verify the Order form max buy / sell

   Scenario: Fields should be shown (Exchange)
      Then Limit order Exchange field should be shown

   Scenario: Fields should be shown (Margin)
      Then Limit order Margin field should be shown

   Scenario: Required field message
      Then Buy Limit order required field message should be shown


