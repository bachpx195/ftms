Feature: Organization
  In order to create program for organization.
  As an admintrator.
  I want to create program for organization.

  Background:
    Given Username is "Username" has functions are controller is "programs", action is "create".
      And Organization name is: "Framgia"

  Scenario: Create program for organization
    Given Input program name is "Ruby on rails" for organization.

    When In the show organization screen. User click button Save.

    Then I should redirect to program name "Ruby on rails" in show organization screen.
