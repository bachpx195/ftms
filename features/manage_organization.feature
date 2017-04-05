Feature: Organization
  In order to manage organization.
  As an admintrator.
  I want to manage organization.

  Background:
    Given User logged in with email "admin@tms.com" and password "12345678"
      And User manage organization include create, update, delete.
      And In this organization, user manage program include create, update, delete.
      And User managed a organization with name "Framgia"
      And Organization has a program named as "Open education"

  Scenario: Create new organization
    Given User has role create organization.
      And Input organization name "FramgiaVN".

    When In the Organization screen. User click button Save.

    Then I should redirect to organization name "FramgiaVN" in show organization screen.

  Scenario: Create program in organization
    Given In this organization, user has role create program
      And Insert program name "Ruby on rails" for organization.

    When In the show organization screen, user click button Save.

    Then I should redirect to program name "Ruby on rails" in show organization screen

  Scenario: Update program in organization
    Given In this organization, user has role update program
      And Update program with name "Open education" to "Git" into organization.

    When User click button Save

    Then I should redirect to program with name "Git" in show organization screen

  Scenario: Delete program in organization
    Given User want to delete program name "Open education"
      And In this organization, user has role delete program

    When User click delete symbol.

    Then Program name "Open education" deleted and should redirect to show organization screen

  Scenario: Update Organization
    Given User can update organization
      And Edit organization with name "Framgia" to name "TMS"

    When In the Organization screen, user click to submit organization form

    Then I should redirect to organization name "TMS" in show organization screen

  Scenario: Deleting Organization
    Given User can delete organization
      And User want to delete orgnization with name "Framgia"

    When In the list organization screen. User click to delete symbol.

    Then Organization with name "Framgia" deleted and should redirect to list organization screen.
