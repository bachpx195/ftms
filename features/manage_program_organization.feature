Feature: Organization
  In order to manage program for organization.
  As an admintrator.
  I want to manage program for organization.

  Background:
    Given User logged in with email "admin@tms.com" and password "12345678".
      And Organization with name "Framgia"
      And In this organization, user manage program include create, update, delete

  Scenario: Create program for organization
    Given In this organization, user can create program.
      And Input program with name "Ruby on rails" for organization.

    When In the show organization screen. User click button Save.

    Then I should redirect to program name "Ruby on rails" in show organization screen.

  Scenario: Update program for organization
    Given In this organization, user can update program.
      And Edit program with name "Ruby on rails" to "Git" for organization.

    When User click button Save.
      And In organization user manage program include create, update, delete

    Then I should redirect to program with name "Git" in show organization screen.

  Scenario: Delete program for organization
    Given In this organization, user can delete program.
      And User want to delete program with name "Git".

    When User click to delete symbol.
      And In organization user manage program include create, update, delete

    Then Program name "Git" deleted and should redirect to show organization screen.
