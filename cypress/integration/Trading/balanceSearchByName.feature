Feature: Balance search

@loginBitfinex
Scenario: Search by Name
Given I am viewing the trading page
When I type "Bitcoin" into the Balances search input
Then The balances table only shows "BTC" balances