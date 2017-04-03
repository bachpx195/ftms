Feature: Organization
  In order to update program for organization.
  As an admintrator.
  I want to update program for organization.

  Background:
    Given Username is "Username" has functions are controller is "programs", action is "update".
      And Organization name is: "Framgia"

  Scenario: Update program for organization
    Given Edit program name is "Ruby on rails" to "Git" for organization.

    When User click symbol sidebar then display edit and delete symbols.
      And User click to edit symbol. Screen display modal edit program form include textbox "Ruby on rails".
      And Insert program name is "Git" into program textbox.
      And User click button Save.

    Then I should redirect to program name is "Git" in show organization screen.
