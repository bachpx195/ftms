class Role < ApplicationRecord
  has_many :user_roles, dependent: :destroy
  has_many :users, through: :user_roles
  has_many :role_functions, dependent: :destroy
  has_many :functions, through: :role_functions

  accepts_nested_attributes_for :role_functions, allow_destroy: true
  scope :order_by_parent_id, ->{order parent_id: :ASC}
end
