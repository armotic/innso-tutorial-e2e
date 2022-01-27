Feature: ToDo
  Background:
    Given I'm visiting '/todo'

  Scenario: Displays two todo items by default
    Then I should have 2 items
    * first item should be 'Pay electric bill'
    * last item should be 'Walk the dog'

  Scenario: Can add new todo items
    When I add the item 'Feed the cat'
    Then I should have 3 items
    * last item should be 'Feed the cat'

  Scenario: Can check off an item as completed
    When I check the item 'Pay electric bill'
    Then the item 'Pay electric bill' should be completed
