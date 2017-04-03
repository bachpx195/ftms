Feature: Organization
  In order to create organization.
  As an admintrator.
  I want to create organization.

  Background:
    Given Username is "Username" has functions are controller is "organization", action is "create".

  Scenario: Create new organization
    Given Input organization name is "Test Organization".

    When In the Organization screen. User click button Save.

    Then I should redirect to show "Test Organization" screen.
