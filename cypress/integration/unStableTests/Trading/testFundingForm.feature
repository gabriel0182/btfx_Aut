Feature: Test the funding form

  @focus

  Scenario: verify the funding form works
    Given I go to funding page
    When I select a Ticker
    And I verify the required fields
    Then I verify the funding form