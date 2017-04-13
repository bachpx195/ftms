Fabricator(:user_role) do
  role {Fabricate :role}
  user {Fabricate :user}
end
