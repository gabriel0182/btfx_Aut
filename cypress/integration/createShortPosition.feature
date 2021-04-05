Feature: Test Creating a new position

  @focus

  Scenario: Create a new position

    Given I go to Trading page

    When I select the Create a New Position option

    And I fill out all the required fields

    Then I verify the position was created