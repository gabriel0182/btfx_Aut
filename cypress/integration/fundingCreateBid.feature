Feature: Test the creation of funding Bids

  @focus

  Scenario: Create a funding Bid

    Given I go to funding page

    When I select a Ticker

    And I fill out all the required fields

    Then I verify the bid was created