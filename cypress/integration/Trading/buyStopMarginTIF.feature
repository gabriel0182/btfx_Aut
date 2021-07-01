Feature: Test Creating a stop buy order with TIF from Margin wallet

  @focus

  Scenario: Create a stop buy order with TIF from Margin wallet

    Given I go to Trading page

    When I type the order required info

   And I select to Exchange Buy

    Then I verify the stop order with TIF from Margin wallet was created