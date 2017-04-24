Fabricator(:subject) do
  name "Ruby Tutorial Book"
  image {File.open(File.join(Rails.root, "app/assets/images/profile.png"))}
  description "This is a description"
  content "This is a content"
  deleted_at nil
  during_time 10
end
