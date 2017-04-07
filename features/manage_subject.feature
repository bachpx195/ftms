Feature: Subject
  In order to manage subject.
  As an admintrator.
  I want to manage subject.

  Background:
    Given system has a user with email is "admin@tms.com" and password is "12345678"
      And user has permission manage subject include create, edit, delete
      And system existed subject with name is "Ruby's Project 1"

    When user click button login in login screen

    Then user should redirect to home screen

  Scenario: Create new
    Given user has a permission to create Subject
      And user create subject with name is "Git Tutorial"

    When user click button Save in new subject screen

    Then user should redirect to subjects screen and subject with name "Git Tutorial" in list subjects screen.

  Scenario: Editing Subject
    Given user has a permission to edit Subject
      And edit Subject with name is "Ruby's Project 1" to name is "Ruby's Project 2"

    When user click to submit subject form

    Then user should redirect to Subjects screen and subject with name "Ruby's Project 2" in show Subjects screen.

  Scenario: Deleting Subject
    Given user has a permission to delete subject
    And user delete a subject with name is "Ruby's Project 2"

    When user click to delete symbol in subjects screen

    Then user should redirect to list subjects screen and subject with name is "Ruby's Project 2" removed
