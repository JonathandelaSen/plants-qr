Feature: Delete a plant
  As a user
  I want to delete a plant

  Scenario: All existing plants
    Given there is the plant:
    """
    {
        "_id": "8c900b20-e04a-4777-9183-32faab6d2fb5",
        "name": "Plant1"
    }
    """
    When I send a DELETE request to "/plant/ef8ac118-8d7f-49cc-abec-78e0d05af80a" with body:
    """
    {
    }
    """
    Then the response status code should be 204
    And the response should be empty
