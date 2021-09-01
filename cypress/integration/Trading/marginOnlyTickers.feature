Feature: Tickers enable/disable margin only

    @loginBitfinex
    Scenario: Tickers, Enable Margin Only
        Given I am viewing the trading page
        When I enable the margin filter on the Tickers component
        Then The tickers table displays only margin-enabled tickers

    Scenario: Tickers, Disable Margin Only
        When I disable the margin filter on the Tickers component
        Then The tickers table displays all tickers