json.user_profile do
  json.extract! @user.profile, :staff_code
  json.user @user
  json.organization @user.profile.organization
  json.program @user.profile.program
  json.organizations @supports.organizations
  json.programs @supports.programs
end
