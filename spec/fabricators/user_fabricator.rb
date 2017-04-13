Fabricator(:user) do
  name "Mai Tuấn Việt"
  email "test@example.com"
  password "12345678"
  avatar {File.open(File.join(Rails.root, "app/assets/images/profile.png"))}
end
