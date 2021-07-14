Feature: Test Order Form Validations   

@loginBitfinex
   Scenario: Order form/Limit order Validations
   Given I go to Trading page
   When I Select a currency
   Then Limit order min-max price should work
   Then I verify the Order from best bid / ask
   Then I verify the Order form max buy / sell
   Then Limit order Exchange field should be shown
   Then Limit order Margin field should be shown
   Then Buy Limit order required field message should be shown


