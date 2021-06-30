Feature: Test Creating a Market sell order from Margin wallet

  @focus

  Scenario: Create a Market sell order from Margin wallet

    Given I go to Trading page

    When I type the order required info

   And I select to Margin Sell

    Then I verify the Market sell order from Margin wallet was created