Feature: Test Creating a new Short position

  Background: Login
  Given I go to Trading page

  Scenario: Create a new Short position
  When I select the Create a New Short Position option

    Then I verify the position was created

    Scenario: Cancelling a Short position
    Then I verify the position was cancelled