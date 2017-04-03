Feature: Organization

Scenario: Create new organization

Given Input organization name: "Test Organization"

When In the Organization screen. User click button Save.

Then I should redirect to show "Test Organization" screen
