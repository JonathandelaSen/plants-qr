Feature: Obtain all the plants
  As a user
  I want to get all the plants

  Scenario: All existing courses
    Given there is the plant:
    """
    {
        "id": "8c900b20-e04a-4777-9183-32faab6d2fb5",
        "name": "Plant1"
    }
    """
    When I send a GET request to "/plants"
    Then the response status code should be 200
    And the response content should be:
    """
    [{
      "id": "8c900b20-e04a-4777-9183-32faab6d2fb5",
      "name": "Plant1"
    }]
    """
