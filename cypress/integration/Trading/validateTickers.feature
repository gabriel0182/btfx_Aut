Feature: Validate Tickers selector works

    Background: Login steps
        Given I visit to Trading page

    @loginBitfinex
    Scenario: Tickers, Pair filter
        Then The tickers list only contains USDt pairs
        Then The ticker list contains pairs containing BTC
        Then The URL changes
        Then The Large Ticker Low Volume amount should be less than the High Volume amount.
