Feature: Organization
  In order to manage program for organization.
  As an admintrator.
  I want to manage program for organization.

  Background:
    Given User logged with email is "admin@tms.com".
      And User has functions are controller is "programs", action is "action"
      And Organization name is "Framgia"

  Scenario: Create program for organization
    Given Input program name is "Ruby on rails" for organization.

    When In the show organization screen. User click button Save.

    Then I should redirect to program name "Ruby on rails" in show organization screen.

  Scenario: Update program for organization
    Given Edit program name is "Ruby on rails" to "Git" for organization.

    When User click symbol sidebar then display edit and delete symbols.
      And User click to edit symbol. Screen display modal edit program form include textbox "Ruby on rails".
      And Insert program name is "Git" into program textbox.
      And User click button Save.

    Then I should redirect to program name is "Git" in show organization screen.

  Scenario: Delete program for organization
    Given User want to delete program name is "Git".

    When In the show organization screen.User click symbol sidebar then display edit and delete symbols.
      And User click to delete symbol. Screen display confirm form and user click OK.

    Then Program name "Git" deleted and should redirect to show organization screen.
