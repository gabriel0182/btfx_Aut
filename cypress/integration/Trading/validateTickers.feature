Feature: Validate Tickers selector works

    Background: Login steps
        Given I visit to Trading page

    @loginBitfinex
    Scenario: Tickers, Pair filter
        Then The tickers list only contains USDt pairs

    @loginBitfinex
    Scenario: Tickers, Search
        Then The ticker list contains pairs containing BTC

    @loginBitfinex
    Scenario: Tickers, Change Ticker
        Then The URL changes