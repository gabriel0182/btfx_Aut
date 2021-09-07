Feature: Order Form, Reduce-Only option

    @loginBitfinex
    Scenario: Exchange tab reduce-only is not visible
        Given I am viewing the trading page
        When The selected order form tab is Exchange
        Then The Order Form does not contain the "REDUCE-ONLY" tickbox

    Scenario: Margin tab reduce-only is visible
        Given I am viewing the trading page
        When The selected order form tab is Margin
        Then The Order Form contains the "REDUCE-ONLY" tickbox