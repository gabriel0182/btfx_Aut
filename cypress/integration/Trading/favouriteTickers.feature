Feature: Favourite tickers

    @loginBitfinex
    Scenario: Tickers, add BTCUSD as a favourite ticker
        Given I am viewing the trading page
        When I add BTCUSD as a favourite ticker
        Then The favourite icon, on the BTCUSD ticker row, is blue

    Scenario: Tickers, remove BTCUSD as a favourite ticker
        When I remove BTCUSD as a favourite ticker
        Then The favourite icon, on the BTCUSD ticker row, is not blue

    Scenario: Tickers, displays favourite tickers only
        When I add BTCUSD as a favourite ticker
        And  I click on the favourite icon within the Tickers component header
        Then The Ticker table displays favourite tickers only