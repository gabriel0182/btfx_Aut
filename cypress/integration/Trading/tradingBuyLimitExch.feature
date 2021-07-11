Feature: Test Creating a limit buy order from exchange wallet

Background: Login steps
Given I go to Trading page
  When I Select a currency

 Scenario: Order form/Create Limit buy Order
   
    Then A Buy Limit order from Exchange wallet should be created
    Then A Buy Limit order green marker should be shown

    Scenario: Orders Table /Validate Filters and Cancel Orders
  
    Then Filter should work 
    Then A Buy Limit order from Exchange wallet should be cancelled

