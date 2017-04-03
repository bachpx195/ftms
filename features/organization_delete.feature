Feature: Organization
  In order to destroy a organization.
  As an admintrator
  I want to destroy a organization

  Background:
    Given user logged with email is "admin@gmail.com"
      And has functions are controller is "role", action is "destroy"

  Scenario: Deleting Organization
    Given User want to orgnization name is "Framgia"

    When In the list organization screen. User click to delete symbol
      And Screen display confirm form
      And user click OK

    Then Organization name "Framgia" deleted and should redirect to list organization screen
