Feature: Trades Yours Sell

    @loginBitfinex
    Scenario: Trades Yours Sell
        Given I am viewing the trading page
        And I have an open BTCUSD position
        When I click on the amount value of the position
        Then The Order Form amount value will equal the position amount value