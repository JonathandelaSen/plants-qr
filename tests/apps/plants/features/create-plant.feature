Feature: post a plant
  As a user
  I want to save a plant

  Scenario: A valid non existing plant
    Given I send a PUT request to "/plants" with body:
    """
    {
      "id": "ef8ac118-8d7f-49cc-abec-78e0d05af80a",
      "name": "Plant1"
    }
    """
    Then the response status code should be 201
    And the response should be empty
