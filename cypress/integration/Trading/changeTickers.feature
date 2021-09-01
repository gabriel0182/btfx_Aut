Feature: Change tickers

    @loginBitfinex
    Scenario: Tickers, Change Ticker
        Given I am viewing the trading page
        When I change the ticker to ETHUSD
        Then The URL changes
        And The Large Ticker Low Volume amount should be less than the High Volume amount