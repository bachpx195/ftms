Feature: Organization
  In order to edit orgnization
  As an admitrator
  I want to edit orgnization

  Background:
    Given user logged with email is "admin@gmail.com"
      And has functions are controller is "role", action is "create"

  Scenario: Editing Organization
    Given Edit Organization with name is "Framgia" to name is "update oragnization"

    When In the Organization screen, user click to submit organization form

    Then I should redirect to organization name "update organization" in show organization screen.
