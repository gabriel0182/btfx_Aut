Feature: Test balance quick transfer

  @focus

  Scenario: Test balance quick transfer

    Given I go to Trading page

    When I select the currency from the balance

    And I select Source For USD Transfer

    And I select Destination For USD Transfer

    And I type the amount and confirm the transaction

    Then I verify the quick transfer was made