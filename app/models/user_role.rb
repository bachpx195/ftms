class UserRole < ApplicationRecord
  belongs_to :role
  belongs_to :user

  scope :role_by_user, ->ids do
    where("user_id in (?)", ids).group(:role_id).pluck(:role_id)
  end
end
