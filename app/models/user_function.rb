class UserFunction < ApplicationRecord
  belongs_to :user
  belongs_to :function
  belongs_to :roles, optional: true
end
