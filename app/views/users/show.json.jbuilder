json.user_detail do
  json.extract! @user, :id, :name, :email, :trainer_id, :type, :avatar
end
