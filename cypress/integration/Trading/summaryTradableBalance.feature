Feature: Summary, tradable balance

@loginBitfinex
Scenario Outline: Summary tradable Balance | <currency>
Given I am viewing the trading page
And I have "USD" in the balance of my margin wallet
When I select the ticker "<currency>"
Then My Tradable Balance should be "<leverage>" x times my USD margin balance

Examples:
| currency   | leverage |
| BTC:USD    |   10.0   |
| ETH:USD    |   3.333  |
