Feature: Test provided funding

  @focus

  Scenario: Create an offer to turn it into a provided funding
    Given I go to the funding page
    When I select the ticker
    And I type the funding required info
    And I select the Offer button
    Then I verify the offer was processed as provided funding