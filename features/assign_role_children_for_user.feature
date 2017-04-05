Feature: Assign role for user
  In order to assign role children for user
  As an admitrator
  I want to assign role children for user

  Background:
    Given system has a user with email is "admin@gmail.com" and password is "12345678"
      And can assign role children for user
      And system existed Role with role name is "Trainer" and parrent name is "Admin" and has function with controller is "assign_program/standards", action is "destroy".

    When User signed in successfully

    Then User should redirect to home screen

  Scenario: Assign role for user
    Given user has a permission to assign role
      And user with email is "admin@gmail.com" Assign role with role_name is "Trainer" and parrent_name is "Admin" and has function with controller is "assign_program/standards", action is "destroy" for user with email is "trainee@tms.com"

    When User assigned successfully

    Then user with email is "trainee@tms.com" had function with controller is "assign_program/standards", action is "destroy"
      And user should redirect to "username" screen
