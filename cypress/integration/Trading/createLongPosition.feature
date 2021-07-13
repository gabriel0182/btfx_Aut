Feature: Test Creating a new Long position

  Background: Background name
  Given I go to Trading page

  Scenario: Create a new Long position
  When I select the Create a New Long Position option

    Then I verify the position was created

    Scenario: Cancelling a Long position
    Then I verify the position was cancelled