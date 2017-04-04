Feature: Role
  In order to manage Role
  As an admintrator.
  I want to manage role

  Background:
    Given user logged in with email is "admin@gmail.com" and password is "12345678"
      And User manage Role include create, edit, delete

  Scenario: Create new Role
    Given user can create Role
      And create role parent with name is "admin", has function with controller is "Roles", action is "create"
      And create children role with name is "trainer", has function with controller is "Roles", action is "create"

    When In the Role screen. User click button Save.

    Then new role created successfully I should redirect to "Role" screen

  Scenario: Edit Role
    Given user can edit Role
      And edit role with name is "admin", has function with controller is "Roles", action is "create" to role with name is "trainer", has function with controller is "Roles", action is "update"
      And children role with name is "trainer", has function with controller is "Roles", action is "create" to role with name is "trainee", has function with controller is "Roles", action is "show"

    When In the show Role screen. User click button update.

    Then Role updated successfully I should redirect to "Roles" screen.

  Scenario: Delete Role
    Given user can Delete Role
      And delete role with name is "trainer", has function with controller is "Roles", action is "update"
      And children role with name is "trainee", has function with controller is "Roles", action is "show"

    When User click button delete.

    Then Role with name is "trainer", has function with controller is "Roles", action is "update"
      And children role with name is "tranee", has function with controller is "Roles", action is "show" deleted
      And I should redirect to "Roles" screen.

