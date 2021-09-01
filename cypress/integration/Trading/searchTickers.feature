Feature: Search tickers

    @loginBitfinex
    Scenario: Tickers, Search BTC
        Given I am viewing the trading page
        When I search for tickers containing BTC
        Then The ticker list contains pairs containing BTC