Feature: Test Order Form Validations

   @loginBitfinex
   Scenario: Order form/Market order Validations
      Given I am viewing the trading page
      When I select the ticker "BTC:USD"
      Then I verify the Order from best bid / ask
      Then Market order Margin field should be shown
      Then Buy and  sell Market order required field message should be shown
      Then I verify the Order form max buy / sell
      Then I verify the Order form min buy / sell


