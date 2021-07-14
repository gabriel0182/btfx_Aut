Feature: Test Creating a new Long position

  @loginBitfinex
  Scenario: Create a new Long position
    Given I go to Trading page
    When I select the Create a New Long Position option
    And I fill out all the required fields
    Then I verify the position was created