Feature: Test Creating a Market sell order from exchange wallet

Background: Login steps
Given I go to Trading page
  When I Select a currency

 Scenario: Order form/Create Market sell Order
   
    Then A sell Market order from Exchange wallet should be created