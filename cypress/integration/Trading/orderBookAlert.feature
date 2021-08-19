Feature: Alerts from order book

@loginBitfinex
Scenario: Add a Bid alert on order book
Given I visit to Trading page
When I click on the bell icon within an Order Book "bid" entry to add an alert
Then I get an alert containing: "Added new price alert BTC/USD at"
And A bell icon is displayed within the Order Book "bid" entry

Scenario: Remove a Bid alert on order book
When I click on the bell icon within an Order Book "bid" entry to del an alert
Then I get an alert containing: "Removed price alert BTC/USD at"
And The bell icon is hidden within the Order Book "bid" entry

Scenario: Add an Ask alert on order book
When I click on the bell icon within an Order Book "ask" entry to add an alert
Then I get an alert containing: "Added new price alert BTC/USD at"
And A bell icon is displayed within the Order Book "ask" entry

Scenario: Remove an Ask alert on order book
When I click on the bell icon within an Order Book "ask" entry to del an alert
Then I get an alert containing: "Removed price alert BTC/USD at"
And The bell icon is hidden within the Order Book "ask" entry
