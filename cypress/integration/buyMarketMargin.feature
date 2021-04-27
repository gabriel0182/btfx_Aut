Feature: Test Creating a Market buy order from Margin wallet

  @focus

  Scenario: Create a Market buy order from Margin wallet

    Given I go to Trading page

    When I type the order required info

   And I select to Margin Buy

    Then I verify the Market buy order from Margin wallet was created