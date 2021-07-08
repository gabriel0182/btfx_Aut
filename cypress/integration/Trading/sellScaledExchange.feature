Feature: Test Creating a Scaled sell order from Exchange wallet

  @focus

  Scenario: Create a Scaled sell order from Exchange wallet

    Given I go to Trading page

    When I type the order required info

   And I select to Exchange Submit

    Then I verify the Scaled sell order from Exchange wallet was created