Feature: Role
  In order to assigment role for user.
  As an admintrator.
  I want to assigment parent role for user.

  Scenario: Assigment parent role for user
    Given Role parent name is "Role" and has functions are controller is "roles", action is "action".
      And Sub role name is "subRole" has parent name is "Role" and has functions are controller is "roles", action is "action".
      And Assigment parent role for username is "username".

    When In the Role screen. User click Save submit form.

    Then This username executed all functions of parent role is "action" and sub role is "action".
      And I should redirect to "User role" screen.
