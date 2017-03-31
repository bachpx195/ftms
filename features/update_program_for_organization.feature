Feature: Organization

Scenario: Update program for organization

Given Edit program name: "Ruby on rails" to "Git"

When User click symbol sidebar then display edit and delete symbols
And User click to edit symbol. Screen display modal edit program form 
  include textbox "Ruby on rails"
And Insert program name is "Git" into program textbox.
And User click button Save

Then I should redirect to program name: "Git" in show organization screen.
