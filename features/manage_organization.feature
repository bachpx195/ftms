Feature: Organization
  In order to manage organization.
  As an admintrator.
  I want to manage organization.

  Background:
    Given User logged in with email "admin@tms.com" and password "12345678"
      And User manage organization include create, update, delete.
      And In this organization, user manage program include create, update, delete.

  Scenario: Create new organization
    Given User has role create organization.
      And Input organization name "Framgia".

    When In the Organization screen. User click button Save.

    Then I should redirect to organization name "Framgia" in show organization screen.

  Scenario: Create program in organization
    Given In this organization, user has role create program
      And Insert program name "Ruby on rails" for organization.

    When In the show organization screen, user click button Save.

    Then I should redirect to program name "Ruby on rails" in show organization screen

  Scenario: Update program in organization
    Given In this organization, user has role update program
      And Update program with name "Ruby on rails" to "Git" into organization.

    When User click button Save

    Then I should redirect to program with name "Git" in show organization screen

  Scenario: Delete program in organization
    Given User want to delete program name "Git"
      And In this organization, user has role delete program

    When User click delete symbol.

    Then Program name "Git" deleted and should redirect to show organization screen

  Scenario: Update Organization
    Given User can update organization
      And Edit organization with name "Framgia" to name "TMS"

    When In the Organization screen, user click to submit organization form

    Then I should redirect to organization name "TMS" in show organization screen

  Scenario: Create program in organization updated
    Given In this organization updated, user can create program
      And Insert program with name "Ruby on rails" into organization updated

    When In the show organization screen, user click button Save

    Then I should redirect to program with name "Ruby on rails" in show organization updated screen.

  Scenario: Update program in organization
    Given In this organization updated, user can update program
      And Update program with name "Ruby on rails" to "Git" of organization updated.

    When In the Organization screen. User click button Save

    Then I should redirect to program with name "Git" in show organization updated screen

  Scenario: Delete program in organization
    Given In this organization updated, user can delete program
      And User want to delete program with name "Git"

    When User click to delete symbol

    Then Program with name "Git" deleted and should redirect to show organization screen

  Scenario: Deleting Organization
    Given User can delete organization
      And User want to delete orgnization with name "TMS"

    When In the list organization screen. User click to delete symbol.

    Then Organization with name "TMS" deleted and should redirect to list organization screen.
