Feature: Validate Tickers selector works

    Background: Login steps
        Given I visit to Trading page

    @loginBitfinex
    @logoutBitfinex
    Scenario: Tickers, Favourites
        Then The favourite icon, on the BTCUSD ticker row, is blue
        Then The Ticker table displays favourite tickers only
        Then The favourite icon, on the BTCUSD ticker row, is not blue


    @loginBitfinex
    @logoutBitfinex
    Scenario: Tickers, Pair filter
        Then The tickers list only contains USDt pairs
        Then The ticker list contains pairs containing BTC

    @loginBitfinex
    @logoutBitfinex
    Scenario: Tickers, Search
        Then The ticker list contains pairs containing BTC


    @loginBitfinex
    @logoutBitfinex
    Scenario: Tickers, Change Ticker
        Then The URL changes
        Then The Large Ticker Low Volume amount should be less than the High Volume amount.
