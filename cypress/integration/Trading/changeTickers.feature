Feature: Change tickers

    @loginBitfinex
    Scenario: Tickers, Change Ticker
        Given I am viewing the trading page
        When I select the ticker "ETH:USD"
        Then The new URL includes "ETH:USD"