Feature: Test Creating a Market buy order from exchange wallet

Background: Login steps
Given I go to Trading page
  When I Select a currency

 Scenario: Order form/Create Market buy Order
   
    Then A Buy Market order from Exchange wallet should be created

    Scenario: Orders Table / Cancel Orders
   
    Then A Buy Market order from Exchange wallet should be cancelled