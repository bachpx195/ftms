class Profile < ApplicationRecord
  acts_as_paranoid

  belongs_to :user
  belongs_to :trainee, class_name: User.name, foreign_key: :user_id
  belongs_to :university
  belongs_to :language
  belongs_to :trainee_type
  belongs_to :user_status
  belongs_to :stage
  belongs_to :organization
  belongs_to :program
end
