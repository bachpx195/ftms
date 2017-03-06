json.user_detail do
  json.extract! @user, :name, :email, :trainer_id, :type
  json.avatar @user.avatar.url
end
