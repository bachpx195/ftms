Feature: Organization
  In order to manage organization.
  As an admintrator.
  I want to manage organization.

  Background:
    Given User logged with email is "admin@tms.com"
      And User has functions are controller is "organizations", action is "action".

  Scenario: Create new organization
    Given Input organization name is "Test Organization".

    When In the Organization screen. User click button Save.

    Then I should redirect to show "Test Organization" screen.

  Scenario: Editing Organization
    Given Edit Organization with name is "Framgia" to name is "update oragnization"

    When In the Organization screen, user click to submit organization form

    Then I should redirect to organization name "update organization" in show organization screen.

  Scenario: Deleting Organization
    Given User want to delete orgnization name is "Framgia"

    When In the list organization screen. User click to delete symbol
      And Screen display confirm form
      And user click OK

    Then Organization name "Framgia" deleted and should redirect to list organization screen
