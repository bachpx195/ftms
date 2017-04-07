Given(/^system has a user with email is "([^"]*)",password is "([^"]*)"$/) do |username, password|
  pending # Write code here that turns the phrase above into concrete actions
end

Given(/^user has a permission manage category include create, edit, delete category$/) do
  pending # Write code here that turns the phrase above into concrete actions
end

Given(/^system has a category with name is "([^"]*)", description is "([^"]*)", total question is "([^"]*)"$/) do |category_name, description, total_question|
  pending # Write code here that turns the phrase above into concrete actions
end

Given(/^In this category, having question with content is "([^"]*)", level is "([^"]*)", type is "([^"]*)", is_madatory is "([^"]*)"$/) do |question_content, level, type, is_madatory|
  pending # Write code here that turns the phrase above into concrete actions
end

Given(/^In this question, having answer A with content is "([^"]*)", is_correct is "([^"]*)"\.$/) do |answer_content, is_correct|
  pending # Write code here that turns the phrase above into concrete actions
end

Given(/^having answer B with content is "([^"]*)", is_correct is "([^"]*)"\.$/) do |answer_content, is_correct|
  pending # Write code here that turns the phrase above into concrete actions
end

Given(/^having answer C with content is "([^"]*)", is_correct is "([^"]*)"\.$/) do |answer_content, is_correct|
  pending # Write code here that turns the phrase above into concrete actions
end

When(/^user logged in system$/) do
  pending # Write code here that turns the phrase above into concrete actions
end

Then(/^user redirect to home screen\.$/) do
  pending # Write code here that turns the phrase above into concrete actions
end

Given(/^user has a permission to create Category$/) do
  pending # Write code here that turns the phrase above into concrete actions
end

Given(/^user input name is "([^"]*)", description is "([^"]*)"$/) do |category_name, category_description|
  pending # Write code here that turns the phrase above into concrete actions
end

When(/^user click button Save in the new Category screen$/) do
  pending # Write code here that turns the phrase above into concrete actions
end

Then(/^user should redirect to categories screen and category with name "([^"]*)" in list categories screen$/) do |category_name|
  pending # Write code here that turns the phrase above into concrete actions
end

Given(/^In category above, user has a permission to create question$/) do
  pending # Write code here that turns the phrase above into concrete actions
end

Given(/^user create a question with content is "([^"]*)",level is "([^"]*)", type is "([^"]*)", is_madatory is "([^"]*)"$/) do |question_content, level, type, is_madatory|
  pending # Write code here that turns the phrase above into concrete actions
end
When(/^user click button save in the new question screen$/) do
  pending # Write code here that turns the phrase above into concrete actions
end

Then(/^user should redirect to questions screen and category with name "([^"]*)" has total question is "([^"]*)"$/) do |category_name, total_question|
  pending # Write code here that turns the phrase above into concrete actions
end

Given(/^user has a permission to add new answer for question$/) do
  pending # Write code here that turns the phrase above into concrete actions
end

Given(/^user add a anwser D with content is "([^"]*)", is_correct is "([^"]*)"$/) do |answer_content, is_correct|
  pending # Write code here that turns the phrase above into concrete actions
end

When(/^user click button save in "([^"]*)" screen$/) do |answer_name|
  pending # Write code here that turns the phrase above into concrete actions
end

Given(/^user has a permission to edit category$/) do
  pending # Write code here that turns the phrase above into concrete actions
end

Given(/^user edit category with name is "([^"]*)", description is "([^"]*)", total question is "([^"]*)" to name is "([^"]*)", description is "([^"]*)", total question is "([^"]*)"$/) do |old_category_name, old_description, old_total_question, new_category_name, new_description, new_total_question|
  pending # Write code here that turns the phrase above into concrete actions
end

When(/^user click to submit category form$/) do
  pending # Write code here that turns the phrase above into concrete actions
end

Then(/^User should redirect to list Categories screen and name "([^"]*)" in Categories screen\.$/) do |category_name|
  pending # Write code here that turns the phrase above into concrete actions
end

Given(/^in caterory above, user has a permission to edit question$/) do
  pending # Write code here that turns the phrase above into concrete actions
end

Given(/^user edit question with content is "([^"]*)", level is "([^"]*)", type is "([^"]*)", is_madatory is "([^"]*)" to a question with content is "([^"]*)",level is "([^"]*)", type is "([^"]*)", is_madatory is "([^"]*)"\.$/) do |category_name, old_question_content, old_level, old_type, old_is_madatory, new_question_content, new_level, new_type, new_is_madatory|
  pending # Write code here that turns the phrase above into concrete actions
end

Then(/^user should redirect to "([^"]*)" screen and a question with content is "([^"]*)",level is "([^"]*)", type is "([^"]*)", is_madatory is "([^"]*)" updated\.$/) do |questions, new_question_content, new_level, new_type, new_is_madatory|
  pending # Write code here that turns the phrase above into concrete actions
end

Given(/^In question above, user has a permission to edit anwser$/) do
  pending # Write code here that turns the phrase above into concrete actions
end

Given(/^user edit anwser A with content is "([^"]*)", is_correct is "([^"]*)" to anwser A with content is "([^"]*)", is_correct is "([^"]*)"$/) do |category_name, question_name, old_content, old_is_correct, new_content, new_is_correct|
  pending # Write code here that turns the phrase above into concrete actions
end

When(/^user click button save in "([^"]*)" screen\.$/) do |answer|
  pending # Write code here that turns the phrase above into concrete actions
end

Given(/^user has a permission to delete category$/) do
  pending # Write code here that turns the phrase above into concrete actions
end

Given(/^user delete category with name is "([^"]*)", description is "([^"]*)", total question is "([^"]*)"$/) do |category_name, description, total_question|
  pending # Write code here that turns the phrase above into concrete actions
end

When(/^user click to delete symbol in the list categories screen$/) do
  pending # Write code here that turns the phrase above into concrete actions
end

Then(/^user should redirect to list categories screen and category with name is "([^"]*)", description is "([^"]*)", total question is "([^"]*)", question and answer of category removed$/) do |category_name, description, total_question|
  pending # Write code here that turns the phrase above into concrete actions
end

Given(/^user has a permission to delete question$/) do
  pending # Write code here that turns the phrase above into concrete actions
end

Given(/^^In category above, user delete question with content is "([^"]*)", level is "([^"]*)", type is "([^"]*)", is_madatory is "([^"]*)"$/) do |question_content, level, type, is_madatory|
  pending # Write code here that turns the phrase above into concrete actions
end

When(/^user click to delete symbol in questions screen$/) do
  pending # Write code here that turns the phrase above into concrete actions
end

Then(/^user should redirect to list questions screen and question with content is "([^"]*)", level is "([^"]*)", type is "([^"]*)", is_madatory is "([^"]*)" and answers of question removed\.$/) do |question_content, level, type, is_madatory|
  pending # Write code here that turns the phrase above into concrete actions
end

Given(/^user has a permission to remove answer for question$/) do
  pending # Write code here that turns the phrase above into concrete actions
end

Given(/^In question above, user delete answer C with content is "([^"]*)", is_correct is "([^"]*)"\.$/) do |arg1, arg2|
  pending # Write code here that turns the phrase above into concrete actions
end

When(/^user click to delete symbol in show "([^"]*)" screen\.$/) do |arg1|
  pending # Write code here that turns the phrase above into concrete actions
end

Then(/^user should redirect to show question screen, answer C with content is "([^"]*)", is_correct is "([^"]*)" removed\.$/) do |answer_content, is_correct|
  pending # Write code here that turns the phrase above into concrete actions
end
