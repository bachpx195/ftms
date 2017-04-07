Feature: Stages
  In order to manage stages.
  As an admintrator.
  I want to manage stages in the system.

  Background:
    Given system has a user with email is "admin@tms.com", password is "12345678"
      And user has permission manage Role include create, edit, delete
      And system existed stage with nane is "Intern"

    When user logged in successfully

    Then user redirect to home screen

  Scenario: Create new stage
    Given user has a permission to create stage
      And user input name is "VPG"

    When user click button Save in the new stage screen

    Then user should redirect to stages screen and stage with name "VPG" in list stages screen

  Scenario: Editing Stage
    Given user has a permission to edit stage
      And user edit stage with name is "Intern" to name is "New dev"

    When user click to submit Stage form

    Then User should redirect to list Stages screen and name "New dev" in show Stage screen.

  Scenario: Deleting Stage
    Given user has a permission to delete stage
      And user delete Stage name is "New dev"

    When User click to delete symbol in the list Stages screen

    Then should redirect to list Stages screen and stage with name is "New dev" removed
