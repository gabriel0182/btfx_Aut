Feature: Pair filter tickers

    @loginBitfinex
    Scenario: Tickers, Pair filter
        Given I am viewing the trading page
        When I select USDt from the pair filter
        Then The tickers list only contains USDt pairs