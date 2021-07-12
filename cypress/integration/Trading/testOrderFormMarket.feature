Feature: Test Order Form Validations


  Given I go to Trading page
  When I Select a currency

   Scenario: Order form/Marekt order Validations

   Given I go to Trading page
  When I Select a currency


   Then I verify the Order from best bid / ask
   Then Market order Margin field should be shown
   Then Buy and  sell Market order required field message should be shown
   Then I verify the Order form max buy / sell
   Then I verify the Order form min buy / sell


