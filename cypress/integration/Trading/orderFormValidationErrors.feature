Feature: Order form, validation errors

Scenario: Price And Amount must be a number
Given I am viewing the trading page
When I click the Exchange Buy button
Then The "Price USD must be a number" validation error is displayed
And The "Amount BTC must be a number" validation error is displayed

Given I am viewing the trading page
And The OCO Order form option is selected
When I click the Exchange Buy button
Then The "OCO Stop USD must be a number" validation error is displayed

Given I am viewing the trading page
And The TIF Order form option is selected
When I click the Exchange Buy button
Then The "TIF date is required" validation error is displayed

Given I am viewing the trading page
And The Stop order type is selected
When I click the Exchange Buy button
Then The "Stop price USD must be a number" validation error is displayed

Given I am viewing the trading page
And The Scaled order type is selected
When I click the Exchange Submit button
Then The "Order direction (buy/sell) not selected" validation error is displayed
And The "Price lower USD is required" validation error is displayed
And The "Price upper USD is required" validation error is displayed
And The "Order count is required" validation error is displayed