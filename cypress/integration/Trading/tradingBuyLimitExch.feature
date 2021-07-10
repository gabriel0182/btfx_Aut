Feature: Test Creating a limit buy order from exchange wallet


  Given I go to Trading page
  When I Select a currency

   Scenario: Order form/Limit order Validations

   Given I go to Trading page
  When I Select a currency

   Then Limit order min-max price should work
   Then Limit order Exchange field should be shown
   Then Limit order Margin field should be shown
   Then Buy Limit order required field message should be shown

   Scenario: Order form/Create Limit buy Order
   Given I go to Trading page
  When I Select a currency
    Then A Buy Limit order from Exchange wallet should be created

    Scenario: OrderBook /Validate Markers
    Given I go to Trading page
  When I Select a currency
    Then A Buy Limit order green marker should be shown

    Scenario: Orders Table /Validate Filters and Cancel Orders
    Given I go to Trading page
  When I Select a currency
    Then Filter should work 
    Then A Buy Limit order from Exchange wallet should be cancelled

