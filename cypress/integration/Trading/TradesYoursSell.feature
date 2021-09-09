Feature: Trades Yours Sell

    @loginBitfinex
    Scenario: Trades Yours Sell
        Given I am viewing the trading page
        When I switch to the Yours tab on the Trades component
        And I select "Market" order
        And  I place an Exchange Market Sell order
        Then A row is added to the Trades table
        And It has a "Red" background colour
        And It contains the trade amount
        And It contains the trade price
        And it contains the trade time
        And it contains a "Red" "Down" icon