class Role < ApplicationRecord

  ATTRIBUTE_PARAMS = [:name, :parent_id,
    role_functions_attributes: [:id, :role_id, :function_id, :_destroy]]

  has_many :user_roles, dependent: :destroy
  has_many :users, through: :user_roles
  has_many :role_functions, dependent: :destroy
  has_many :functions, through: :role_functions

  accepts_nested_attributes_for :role_functions, allow_destroy: true,
    reject_if: lambda {|attributes| attributes[:function_id].blank?}

  validates :name, presence: true

  scope :order_by_parent_id, ->{order parent_id: :ASC}

end
