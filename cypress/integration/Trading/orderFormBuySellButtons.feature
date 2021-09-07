Feature: Order Form, Buy and Sell buttons

    @loginBitfinex
    Scenario: Exchange buttons
        Given I am viewing the trading page
        When The selected order form tab is Exchange
        Then The Order Form Buy button contains the text "Exchange Buy"
        And The Order Form Sell button contains the text "Exchange Sell"

    Scenario: Margin buttons
        Given I am viewing the trading page
        When The selected order form tab is Margin
        Then The Order Form Buy button contains the text "Margin Buy"
        And The Order Form Sell button contains the text "Margin Sell"