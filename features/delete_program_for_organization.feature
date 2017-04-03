Feature: Organization
  In order to destroy program for organization.
  As an admintrator.
  I want to destroy program for organization.

  Background:
    Given Username is "Username" has functions are controller is "programs", action is "destroy".
      And Organization name is: "Framgia"

  Scenario: Delete program for organization
    Given User want to delete program name is "Git".

    When In the show organization screen.User click symbol sidebar then display edit and delete symbols.
      And User click to delete symbol. Screen display confirm form and user click OK.

    Then Program name "Git" deleted and should redirect to show organization screen.
