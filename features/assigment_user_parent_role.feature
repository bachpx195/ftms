Feature: Role

Scenario: Assigment parent role for user

Given Role parent name: "Role" have functions: 
  controller_name: "controller_name", action: "action"
And sub role name: "sub Role" have parent name: "Role" have functions:
  controller_name: "controller_name", action: "action"
And Assigment parent role for username: "admin"

When In the Role screen. User click Save submit form

Then This username executed all functions of parent role: "action" and sub role: "action"
And I should redirect to "User role" screen
