Feature: Tutorial example
  # As an agent I want to be able to respond to a sms

  Scenario: An user can write an email
    Given a user visiting the action's page
    When he writes his email
    Then it should appear
