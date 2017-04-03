Feature: Role
  In order to create Role
  As an admintrator.
  I want to create role and children role.

  Background:
    Given user logged with email is "admin@gmail.com"
      And has functions are controller is "role", action is "create"

  Scenario: Create new Role
    Given user create role with name is "Role 1", has functions are controller is "role", action is "create"
      And create children role with name is "Role 2", has functions are controller is "role", action is "update"

    When In the Role screen. User click button Save.

    Then new role created successfully I should redirect to "list role" screen

  Scenario: Edit Role
    Given user edit role with name is "Role 1", has functions are controller is "role", action is "create" to role with name is "Role 3", has functions are controller is "role", action is "show"
      And children role with name is "Role 2", has functions are controller is "role", action is "update" to role with name is "Role 4", has functions are controller is "role", action is "delete"

    When In the show Role screen. User click button update.

    Then Role updated I should redirect to "Roles" screen.

  Scenario: Delete Role
    Given user delete role with name is "Role 1", has functions are controller is "role", action is "create"
      And children role with name is "Role 2", has functions are controller is "role", action is "update"

    When In the Roles screen, User click to delete symbol. Screen display confirm form and user click OK.

    Then Role with name is "Role 1", has functions are controller is "role", action is "create"
      And children role with name is "Role 2", has functions are controller is "role", action is "update" deleted
      And I should redirect to "list Roles" screen.

