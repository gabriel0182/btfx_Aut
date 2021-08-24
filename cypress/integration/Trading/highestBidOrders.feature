Feature: Highest Bid

@loginBitfinex
Scenario: Limit highest bid
Given I am viewing the trading page
And I select "Limit" order
When I click the Set Price To Highest Bid button on the Order Form
Then The price field is populated with the best Bid price

Scenario: Stop highest bid
Given I select "Stop" order
When I click the Set Price To Highest Bid button on the Order Form
Then The price field is populated with the best Bid price

Scenario: Stop Limit highest bid
Given I select "Stop limit" order
When I click the Set Price To Highest Bid button on the Order Form
Then The price field is populated with the best Bid price

Scenario: Fill or kil highest bid
Given I select "Fill or kill" order
When I click the Set Price To Highest Bid button on the Order Form
Then The price field is populated with the best Bid price

Scenario: Immediate or Cancel highest bid
Given I select "Immediate or Cancel" order
When I click the Set Price To Highest Bid button on the Order Form
Then The price field is populated with the best Bid price
