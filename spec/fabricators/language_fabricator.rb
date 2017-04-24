Fabricator(:language) do
  name "Ruby"
  description "This is a description"
  image {File.open(File.join(Rails.root, "app/assets/images/profile.png"))}
  deleted_at nil
end
