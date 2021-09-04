Feature: Order Form, market order placeholder text

@loginBitfinex
Scenario: Order form price input placeholder | Market order type
Given I am viewing the trading page
And The selected order form tab is Exchange
When I select the "Market" Order type
Then The order form Price input is disabled
And The order form Price input contains the text "MARKET"
