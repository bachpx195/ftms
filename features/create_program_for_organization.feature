Feature: Organization

Scenario: Create program for organization

Given Input program name: "Ruby on rails"

When In the show organization screen. User click button Save

Then I should redirect to program name "Ruby on rails" in show organization screen.
