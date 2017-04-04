Given(/^User logged in with email "([^"]*)" and password "([^"]*)"$/) do |email, password|
  @user = User.create email: email, password: password, password_confirmation: password
  login_as @user, scope: :user
end

Given(/^User manage organization include create, update, delete\.$/) do
  functions = Function.create [{controller_name: "organizations", action: "create"},
    {controller_name: "organizations", action: "update"},
    {controller_name: "organizations", action: "destroy"},
    {controller_name: "organizations", action: "index"},
    {controller_name: "organizations", action: "show"}]
  @user.functions << functions
end

Given(/^In this organization, user manage program include create, update, delete\.$/) do
  functions = Function.create [{controller_name: "programs", action: "create"},
    {controller_name: "programs", action: "update"},
    {controller_name: "programs", action: "destroy"},
    {controller_name: "programs", action: "index"},
    {controller_name: "programs", action: "show"}]
  @user.functions << functions
end

Given(/^User managed a organization with name "([^"]*)"$/) do |organization|
  @organization = Organization.create name: organization, creator_id: @user.id
end

Given(/^Organization has a program named as "([^"]*)"$/) do |program|
  @program = @organization.programs.create name: program, creator_id: @user.id,
    program_type: 1
end

Given(/^User has role create organization\.$/) do
  @function = @user.functions.find_by controller_name: "organizations", action: "create"
end

Given(/^Input organization name "([^"]*)"\.$/) do |name|
  if @function
    @organization = Organization.new name: name, creator_id: @user.id
  end
end

When(/^In the Organization screen\. User click button Save\.$/) do
  @organization.save
end

Then(/^I should redirect to organization name "([^"]*)" in show organization screen\.$/) do |name|
  @organization = Organization.find_by name: name
  visit organization_path(@organization)
end

Given(/^In this organization, user has role create program$/) do
  @function = @user.functions.find_by controller_name: "programs", action: "create"
end

Given(/^Insert program name "([^"]*)" for organization\.$/) do |program|
  if @function && @organization.creator == @user
    @program = @organization.programs.new name: program, program_type: 1,
      creator_id: @user.id
  end
end

When(/^In the show organization screen, user click button Save\.$/) do
  @program.save
end

Then(/^I should redirect to program name "([^"]*)" in show organization screen$/) do |program|
  @program = Program.find_by name: program
  visit organization_program_path(@organization, @program)
end

Given(/^In this organization, user has role update program$/) do
  @function = @user.functions.find_by controller_name: "programs", action: "update"
end

Given(/^Update program with name "([^"]*)" to "([^"]*)" into organization\.$/) do |old_program, new_program|
  if @function && @program.organization == @organization && @organization.creator == @user
    @program = @organization.programs.create name: old_program, program_type: 1,
      creator_id: @user.id
    @program.name = new_program
  end
end

When(/^User click button Save$/) do
  @program.save
end

Then(/^I should redirect to program with name "([^"]*)" in show organization screen$/) do |new_program|
  @program = Program.find_by name: new_program
  visit organization_program_path(@organization, @program)
end

Given(/^User want to delete program name "([^"]*)"$/) do |program|
  @program = @organization.programs.create name: program, program_type: 1,
    creator_id: @user.id
end

Given(/^In this organization, user has role delete program$/) do
  @function = @user.functions.find_by controller_name: "programs", action: "destroy"
end

When(/^User click delete symbol\.$/) do
  if @function && @program.organization == @organization && @organization.creator == @user
    @program.destroy
  end
end

Then(/^Program name "([^"]*)" deleted and should redirect to show organization screen$/) do |program|
  visit organization_path(@organization)
  expect(page).not_to have_content(program)
end

Given(/^User can update organization$/) do
  @function = @user.functions.find_by controller_name: "organizations",
    action: "update"
end

Given(/^Edit organization with name "([^"]*)" to name "([^"]*)"$/) do |old_name, new_name|
  if @function && @organization.creator == @user
    @organization = Organization.find_by name: old_name
    @organization.name = new_name
  end
end

When(/^In the Organization screen, user click to submit organization form$/) do
  @organization.save
end

Then(/^I should redirect to organization name "([^"]*)" in show organization screen$/) do |new_name|
  @organization = Organization.find_by name: new_name
  visit organization_path(@organization)
end

Given(/^User can delete organization$/) do
  @function = @user.functions.find_by controller_name: "organizations",
    action: "destroy"
end

Given(/^User want to delete orgnization with name "([^"]*)"$/) do |name|
  @organization = Organization.find_by name: name
end

When(/^In the list organization screen\. User click to delete symbol\.$/) do
  if @function && @organization.creator == @user
    @organization.destroy
  end
end

Then(/^Organization with name "([^"]*)" deleted and should redirect to list organization screen\.$/) do |name|
  visit organizations_path
  expect(page).not_to have_content(name)
end
