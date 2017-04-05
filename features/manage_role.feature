Feature: Role
  In order to manage Role
  As an admintrator.
  I want to manage role

  Background:
    Given system has a user with email is "admin@gmail.com" and password is "12345678".
      And user has permisstion manage Role include create, edit, delete
      And system existed Role with name is "admin", has function with controller is "Roles", action is "create" and role children with name is "trainer", has function with controller is "Roles", action is "create"

    When user logged in successfully.

    Then user should redirect to home screen.

  Scenario: Create new Role
    Given user has a permisstion to create Role
      And user create role with name is "GL", has function with controller is "Roles", action is "create"
      And user create children role with name is "", has function with controller is "Roles", action is "create"

    When user click button Save in the new role screen

    Then new role created successfully and User should redirect to roles screen with role name "GL" in list role screen

  Scenario: Edit Role
    Given user has a permisstion to edit Role
      And user edit role with name is "admin", has function with controller is "Roles", action is "create" to role with name is "trainer", has function with controller is "Roles", action is "update"
      And user edit children role with name is "trainer", has function with controller is "Roles", action is "create" to role with name is "trainee", has function with controller is "Roles", action is "show"

    When In the show Role screen. User click button update.

    Then Role updated successfully I should redirect to roles screen.

  Scenario: Delete Role
    Given user has a permisstion to delete Role
      And User delete role with name is "trainer", has function with controller is "Roles", action is "update"

    When User click button delete.

    Then I should redirect to roles screen and Role with name is "trainer", has function with controller is "Roles", action is "update" and children role with name is "tranee", has function with controller is "Roles", action is "show" deleted
