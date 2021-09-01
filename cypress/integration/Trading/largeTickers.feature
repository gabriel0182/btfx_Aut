Feature: Large Ticker, Low and High price

    @loginBitfinex
    Scenario: Large Ticker, Low and High price
        Given I am viewing the trading page
        Then The Large Ticker Low Volume amount should be less than the High Volume amount