Feature: Add alerts from order book

@loginBitfinex
Scenario: Add alert on order book
Given I visit to Trading page
When I click on the bell icon within an Order Book Table entry
Then I get an alert containing: Added new price alert BTC/USD at
And A bell icon is displayed within the Order Book Table entry