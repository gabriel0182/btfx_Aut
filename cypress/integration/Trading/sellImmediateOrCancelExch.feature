Feature: Test Creating a Immediate or Cancel sell order from Exchange wallet

  @focus

  Scenario: Create a Immediate or Cancel sell order from Exchange wallet

    Given I go to Trading page

    When I type the order required info

   And I select to Exchange Sell

    Then I verify the Immediate or Cancel sell order from Exchange wallet was created