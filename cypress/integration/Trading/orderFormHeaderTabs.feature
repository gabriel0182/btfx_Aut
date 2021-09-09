Feature: Order Form, Header Tabs

    @loginBitfinex
    Scenario: Order form contains Exchange and Margin tab | BTC:USD
        Given I am viewing the trading page
        When I select the ticker "BTC:USD"
        Then The Order Form contains an Exchange tab
        And The Order Form contains a Margin tab

    Scenario: Order form contains only Exchange tab | XAUT:UST
        Given I am viewing the trading page
        When I select the ticker "XAUT:UST"
        Then The Order Form contains an Exchange tab
        And The Order Form does not contain a Margin tab