Feature: Assign role for user
  In order to assign role children for user
  As an admitrator
  I want to assign role children for user

  Scenario: Assign role for user
    Given A role with name is "Trainer" and parrent_name is "Admin" 
      And has functions are controller is "assign_program/standards", action is "destroy"
      And has fuctions are controller is "assign_program/organizations", action is "create" 
      And Assign role for user with username is "Username" 

    When In the Role screen, user click to submit role form
    
    Then user with username is "Username" has full functions with controller is "assign_program/standards", action is "destroy"
      And controller is "assign_program/organizations", action is "create"
      And I should redirect to "User role" screen
