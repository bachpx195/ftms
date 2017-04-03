Feature: Organization

Scenario: Delete program for organization

Given User want to delete program name: "Git"
When In the show organization screen.User click symbol sidebar then display edit and delete symbols
And User click to delete symbol. Screen display confirm form and user click OK.

Then Program name "Git" deleted and should redirect to show organization screen.
