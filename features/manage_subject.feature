Feature: Subject
  In order to manage subject.
  As an admintrator.
  I want to manage subject.

  Background:
    Given User logged in successfully with email is "admin@tms.com" and password is "12345678"
      And User Manage subject include create, edit, delete subject
  Scenario: Create new
    Given user can create Subject
      And create subject with name is "Ruby's Project 1"

    When In the Subject screen. User click button Save.

    Then I should redirect to "Subject" screen.

  Scenario: Editing Subject
    Given user can edit Subject
      And edit Subject with name is "Ruby's Project 1" to name is "Ruby's Project 2"

    When In the Subject screen, user click to submit Subject form

    Then I should redirect to Subject name "Ruby's Project 2" in show Subject screen.

  Scenario: Deleting Subject
    Given User can delete Subject and delete Subject name is "Ruby's Project 2"

    When In the list Subject screen. User click to delete symbol

    Then Subject name "Ruby's Project 2" deleted and should redirect to list Subject screen
