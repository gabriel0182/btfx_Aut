Feature: Test Creating a Limit (Order Book) buy order from Exchange wallet

  @focus

  Scenario: Create a Limit (Order Book) buy order from Exchange wallet

    Given I go to Trading page

    When I type the order required info

    And I select and order from the book

    Then I verify the Limit Order Book buy order from Exchange wallet was created