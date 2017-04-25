Fabricator(:course) do
  name "course"
  image {File.open(File.join(Rails.root, "app/assets/images/profile.png"))}
  description "This is a descirption"
end
