Feature: Validate Tickers selector works


    @loginBitfinex
    Scenario: Tickers, Pair filter
        Given I am viewing the trading page
        When I select USDt from the pair filter
        Then The tickers list only contains USDt pairs

    Scenario: Tickers, Search BTC
        When I search for tickers containing BTC
        Then The ticker list contains pairs containing BTC

    Scenario: Tickers, Change Ticker
        And I change the ticker to ETHUSD
        Then The URL changes
        Then The Large Ticker Low Volume amount should be less than the High Volume amount.

    Scenario: Tickers, Enable Margin Only
        When I enable the margin filter on the Tickers component
        Then The tickers table displays only margin-enabled tickers

    Scenario: Tickers, Disable Margin Only
        When I disable the margin filter on the Tickers component
        Then The tickers table displays all tickers

    Scenario: Tickers, add BTCUSD as a favourite ticker
        When I add BTCUSD as a favourite ticker
        Then The favourite icon, on the BTCUSD ticker row, is blue

    Scenario: Tickers, remove BTCUSD as a favourite ticker
        When I remove BTCUSD as a favourite ticker
        Then The favourite icon, on the BTCUSD ticker row, is not blue

    Scenario: Tickers, displays favourite tickers only
        When I add BTCUSD as a favourite ticker
        And  I click on the favourite icon within the Tickers component header
        Then The Ticker table displays favourite tickers only