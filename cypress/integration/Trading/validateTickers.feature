Feature: Validate Tickers selector works


    @loginBitfinex
    Scenario: Tickers, Pair filter
        Given I visit to Trading page
        Then The tickers list only contains USDt pairs
        Then The ticker list contains pairs containing BTC

    Scenario: Tickers, Search
        Then The ticker list contains pairs containing BTC

    Scenario: Tickers, Change Ticker
        Then The URL changes
        Then The Large Ticker Low Volume amount should be less than the High Volume amount.

    Scenario: Tickers, Margin Only
        Then The tickers table displays only margin-enabled tickers
        Then The tickers table displays all tickers

    Scenario: Tickers, Favourites
        Then The favourite icon, on the BTCUSD ticker row, is blue
        Then The Ticker table displays favourite tickers only
        Then The favourite icon, on the BTCUSD ticker row, is not blue
