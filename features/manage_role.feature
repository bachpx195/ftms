Feature: Role
  In order to manage Role
  As an admintrator.
  I want to manage role

  Background:
    Given system has a user with email is "admin@gmail.com" and password is "12345678".
      And user has permission manage Role include create, edit, delete
      And system existed Role with name is "admin", has function with controller is "Roles", action is "create"
      And system also existed functions with controller is "assign_program/standards, assign_program/standards, assign_program/standards" corresponding with action is "create, edit, destroy"

    When user logged in successfully.

    Then user should redirect to home screen.

  Scenario: Create new Role with name blank
    Given user has a permission to create Role
      And user create role with name is "", has function with controller is "Roles", action is "create"

    When user click button Save in the new role screen

    Then Display message "Role name can't blank"

  Scenario: Create new Role with name is valid and contain 1 characters
    Given user has a permission to create Role
      And user create role with name is "A", has function with controller is "assign_program/standards", action is "create"

    When user click button Save in the new role screen

    Then User should redirect to list roles screen and role with name is "A" in show roles screen

  Scenario: Create new Role with name is valid and contain 1-255 characters
    Given user has a permission to create Role
      And user create role with name is "admin", has function with controller is "assign_program/standards", action is "create"

    When user click button Save in the new role screen

    Then User should redirect to list roles screen and role with name is "admin" in show roles screen

  Scenario: Create new Role with name is valid and contain 255 characters
    Given user has a permission to create Role
      And user create role with name is "admin trainer admin trainer admin trainer admin trainer admin trainer admin trainer admin trainer admin trainer admin trainer admin trainer admin trainer admin trainer admin trainer admin trainer admin trainer admin trainer admin trainer admin trainer adm", has function with controller is "assign_program/standards", action is "create"

    When user click button Save in the new role screen

    Then User should redirect to list roles screen and role with name is "admin trainer admin trainer admin trainer admin trainer admin trainer admin trainer admin trainer admin trainer admin trainer admin trainer admin trainer admin trainer admin trainer admin trainer admin trainer admin trainer admin trainer admin trainer adm" in show roles screen

  Scenario: Create new Role with name is valid and contain >255 characters
    Given user has a permission to create Role
      And user create role with name is "admin trainer admin trainer admin trainer admin trainer admin trainer admin trainer admin trainer admin trainer admin trainer admin trainer admin trainer admin trainer admin trainer admin trainer admin trainer admin trainer admin trainer admin trainer admin admin", has function with controller is "assign_program/standards", action is "create"

    When user click button Save in the new role screen

    Then System display message "Role name is invalid"

  Scenario: Create new Role with name contain special characters
    Given user has a permission to create Role
      And user create role with name is "a@%dmin", has function with controller is "assign_program/standards", action is "create"

    When user click button Save in the new role screen

    Then User should redirect to list roles screen and role with name is "a@%dmin" in show roles screen

  Scenario: Create new Role with name contain html, java script tags
    Given user has a permission to create Role
      And user create role with name is "<script>alert('abc')</script>", has function with controller is "assign_program/standards", action is "create"

    When user click button Save in the new role screen

    Then User should redirect to list roles screen and role with name is "<script>alert('abc')" in show roles screen

  Scenario: Create new Role with name contain space at both the end
    Given user has a permission to create Role
      And user create role with name is " trainee ", has function with controller is "assign_program/standards", action is "create"

    When user click button Save in the new role screen

    Then User should redirect to list roles screen and role with name is "trainee" in show roles screen

  Scenario: Check filter when textbox filter is blank
    Given user has a permission to show all roles
      And system has 3 functions above
      And input filter is ""

    When input filter blank

    Then have not change in screen

  Scenario: Check filter when has result
    Given user has a permission to show all roles
      And system has 3 function above
      And input filter is "assign"

    When input data

    Then Display 3 records contain "assign"

  Scenario: Check filter when textbox filter Contain "*" character
    Given user has a permission to show all roles
      And input filter is "*"

    When input data

    Then display message is "No results found."

  Scenario: Check filter when textbox filter Contain "/" character
    Given user has a permission to show all roles
      And input filter is "/"

    When input data

    Then display message is "No results found."

  Scenario: Check filter when textbox filter Input "0" character
    Given user has a permission to show all roles
      And input filter is "0"

    When input data

    Then display message is "No results found."

  Scenario: check paginate when has <10 records
    Given user has a permission to show all roles
      And system has 3 functions above

    When roles screen opened

    Then System display 3 records on form and has dropdown for paginate

  Scenario: check paginate when has 10 records
    Given user has a permission to show all roles
      And system has 3 functions above
      And system existed functions with controller is "programs, static_pages, static_pages, static_pages, static_pages, programs, programs" corresponding with action is "create, create, edit, destroy, edit, destroy"

    When roles screen opened

    Then System display 10 functions on form and has dropdown for paginate

  Scenario: check paginate when has >10 records
    Given user has a permission to show all roles
      And system has 3 functions above
      And system existed functions with controller is "programs, static_pages, static_pages, static_pages, static_pages, programs, programs, roles" corresponding with action is "create, create, edit, destroy, edit, destroy, create"

    When roles screen opened
      And user click button next

    Then System display 1 record in form

  Scenario: Update role when name empty
    Given User can Edit subject
      And Edit role with with name is "admin", has function with controller is "Roles", action is "create"
      And Update to role with name is "trainee", has function with controller is "Roles", action is "show"

    When user click button Save in the edit role screen

    Then User redirect to roles screen and role with name is "admin" updated

  Scenario: Update role when name contain 1 character
    Given User can Edit subject
      And Edit role with with name is "admin", has function with controller is "Roles", action is "create"
      And Update to role with name is "a", has function with controller is "Roles", action is "show"

    When user click button Save in the edit role screen

    Then User redirect to roles screen and role with name is "a" updated

  Scenario: Update role when name contain 1-255 character
    Given User can Edit role
      And Edit role with with name is "admin", has function with controller is "Roles", action is "create"
      And Update to role with name is "trainer", has function with controller is "Roles", action is "show"

    When user click button Save in the edit role screen

    Then User redirect to roles screen and role with name is "trainer" updated

  Scenario: Update role when name contain 255 character
    Given User can Edit role
      And Edit role with with name is "admin", has function with controller is "Roles", action is "create"
      And Update to role with name is "trainer trainer trainer trainer trainer trainer  trainer trainer trainer  trainer trainer trainer  trainer trainer trainer  trainer trainer trainer  trainer trainer trainer  trainer trainer trainer  trainer trainer trainer  trainer trainer trainer trainer", has function with controller is "Roles", action is "show"

    When user click button Save in the edit role screen

    Then User redirect to roles screen and role with name is "trainer trainer trainer trainer trainer trainer  trainer trainer trainer  trainer trainer trainer  trainer trainer trainer  trainer trainer trainer  trainer trainer trainer  trainer trainer trainer  trainer trainer trainer  trainer trainer trainer trainer" updated

  Scenario: Update role when name contain >255 character
    Given User can Edit role
      And Edit role with with name is "admin", has function with controller is "Roles", action is "create"
      And Update to role with name is "trainer trainer trainer trainer trainer trainer  trainertrainer trainer trainer  trainer trainer trainer  trainer trainer trainer  trainer trainer trainer  trainer trainer trainer  trainer trainer trainer  trainer trainer trainer  trainer trainer trainer trainer", has function with controller is "Roles", action is "show"

    When user click button Save in the edit role screen

    Then System display message "Role name is invalid"

  Scenario: Update role when name contain special characters
    Given User can Edit role
      And Edit role with with name is "admin", has function with controller is "Roles", action is "create"
      And Update to role with name is "train#@er", has function with controller is "Roles", action is "show"

    When user click button Save in the edit role screen

    Then User redirect to roles screen and role with name is "train#@er" updated

  Scenario: Update role when name contain html, javascript tags
    Given User can Edit role
      And Edit role with with name is "admin", has function with controller is "Roles", action is "create"
      And Update to role with name is "<html>alert('abc')</html>", has function with controller is "Roles", action is "show"

    When user click button Save in the edit role screen

    Then User redirect to roles screen and role with name is "train#@er" updated

  Scenario: Update role when name contain space at both the end
    Given User can Edit role
      And Edit role with with name is "admin", has function with controller is "Roles", action is "create"
      And Update to role with name is " trainer ", has function with controller is "Roles", action is "show"

    When user click button Save in the edit role screen

    Then User redirect to roles screen and role with name is "trainer" updated

  Scenario: Delete Role
    Given user has a permission to delete Role
      And User delete role with name is "admin", has function with controller is "Roles", action is "create"

    When User click button delete.

    Then I should redirect to roles screen and role with name is "admin" has function with controller is "Roles", action is "create" removed.
