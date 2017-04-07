Feature: Categories
  In order to manage Categories, questions, answers
  As an admintrator.
  User want to create, edit, delete Category, question

  Background:
    Given system has a user with email is "admin@tms.com",password is "12345678"
      And user has a permission manage category include create, edit, delete category
      And system has a category with name is "Android", description is "Learn how to design and develop great Android apps", total question is "1"
      And In this category, having question with content is " Explain android activity life cycle?", level is "Hard", type is "3", is_madatory is "true"
      And In this question, having answer A with content is "None of the Above", is_correct is "true".
      And having answer B with content is "Skill", is_correct is "false".
      And having answer C with content is "A&B", is_correct is "false".

    When user logged in system

    Then user redirect to home screen.

  Scenario: Creating new Category
    Given user has a permission to create Category
      And user input name is "ruby", description is "Learn the basic building blocks of Ruby"

    When user click button Save in the new Category screen

    Then user should redirect to categories screen and category with name "ruby" in list categories screen

  Scenario: Creating new Question
    Given In category above, user has a permission to create question
      And user create a question with content is "How to kill an activity in Android?",level is "Hard", type is "3", is_madatory is "true"

    When user click button save in the new question screen

    Then user should redirect to questions screen and category with name "Android" has total question is "2"

  Scenario: Add new answer for question
    Given user has a permission to add new answer for question
      And user add a anwser D with content is "COUNT(*) returns the number of rows in the table.", is_correct is "false"

    When user click button save in "question" screen

    Then user should redirect to "question" screen

  Scenario: Editing Category
    Given user has a permission to edit category
      And user edit category with name is "Android", description is "Learn how to design and develop great Android apps", total question is "10" to name is "PHP", description is "Dig into one of the most prevalent programming languages", total question is "10"

    When user click to submit category form

    Then User should redirect to list Categories screen and name "PHP" in Categories screen.

  Scenario: Editing Question
    Given in caterory above, user has a permission to edit question
      And user edit question with content is " Explain android activity life cycle?", level is "Hard", type is "3", is_madatory is "true" to a question with content is "Explain android activity life cycle?",level is "Hard", type is "2", is_madatory is "true".

    When user click button save in "question" screen

    Then user should redirect to "question" screen and a question with content is "Explain android activity life cycle?",level is "Hard", type is "2", is_madatory is "true" updated.

  Scenario: Editing anwser
    Given In question above, user has a permission to edit anwser
      And user edit anwser A with content is "None of the Above", is_correct is "true" to anwser A with content is "onResume()", is_correct is "true"

    When user click button save in "question" screen.

  Scenario: Deleting category
    Given user has a permission to delete category
      And user delete category with name is "PHP", description is "Dig into one of the most prevalent programming languages", total question is "10"

    When user click to delete symbol in the list categories screen

    Then user should redirect to list categories screen and category with name is "PHP", description is "Dig into one of the most prevalent programming languages", total question is "1", question and answer of category removed

  Scenario: Deleting question
    Given user has a permission to delete question
      And In category above, user delete question with content is " Explain android activity life cycle?", level is "Hard", type is "3", is_madatory is "true"

    When user click to delete symbol in questions screen

    Then user should redirect to list questions screen and question with content is " Explain android activity life cycle?", level is "Hard", type is "3", is_madatory is "true" and answers of question removed.

  Scenario: remove answer for question
    Given user has a permission to remove answer for question
      And In question above, user delete answer C with content is "A&B", is_correct is "false".
    When user click to delete symbol in show "question" screen.

    Then user should redirect to show question screen, answer C with content is "A&B", is_correct is "false" removed.
