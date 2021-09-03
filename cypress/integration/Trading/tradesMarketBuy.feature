Feature: Trades Market Buy

    @loginBitfinex
    Scenario: Trades Market Buy
        Given I am viewing the trading page
        When I select "Market" order
        And  I place an Exchange Market Buy order
        Then A row is added to the Trades table
        And It has a green background colour
        And It contains the trade amount
        And It contains the trade price
        And it contains the trade time
        And It contains a green up icon