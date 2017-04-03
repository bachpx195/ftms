Feature: Organization
  In order to edit orgnization
  As an admitrator
  I want to edit orgnization

  Background:
    Given user with username = "Username"
      And has functions are controller is "assign_program/organizations", action is "update" 

  Scenario: Editing Organization
    Given Edit Organization with name is "Framgia" to name is "update oragnization"

    When In the Organization screen, user click to submit organization form
    
    Then I should redirect to organization name "update organization" in show organization screen.
